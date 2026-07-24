// @ts-nocheck
/**
 * GDX Enriched Booking Cache
 *
 * Stores the fully-enriched booking (Supabase raw + Fusioo data) in a
 * dedicated Supabase table so repeat lookups skip both the raw-bookings
 * table and the Fusioo API entirely.
 *
 * Table: gdx_cache
 *   gdx            TEXT  PRIMARY KEY
 *   enriched_data  JSONB NOT NULL
 *   slug           TEXT               -- resolved destination slug (null = unresolved)
 *   lead_name      TEXT               -- full lead passenger name from booking
 *   cached_at      TIMESTAMPTZ DEFAULT NOW()
 *
 * ── ADD lead_name column (run once in Supabase → SQL Editor) ─────────────────
 *   ALTER TABLE gdx_cache ADD COLUMN IF NOT EXISTS lead_name TEXT;
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Cache strategy:
 *   - TTL: 30 days
 *   - Smart invalidation: if booking.last_modified > cached_at → re-fetch
 *   - ALL bookings are cached (not just READY_SLUGS) so routing is instant
 *     even for destinations whose briefings aren't ready yet.
 */

import { supabase } from "@/lib/supabase";
import { getFullBookingFromFusioo } from "./fusiooService.js";
import { resolveDestinationSlug } from "../utils/destinationResolver.js";

const TABLE        = "gdx_cache";
const MASTER_TABLE = "gdx_master_list";
const TTL_MS       = 30 * 24 * 60 * 60 * 1000; // 30 days

// ─────────────────────────────────────────────────────────────────────────────
// READ
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns the cached enriched booking for the given GDX number.
 * Returns null if not found, older than 30 days, or booking was updated
 * in Fusioo after the cache was written.
 */
export async function getCachedGdx(gdx) {
  try {
    const { data, error } = await supabase
      .from(TABLE)
      .select("enriched_data, slug, lead_name, cached_at")
      .eq("gdx", String(gdx))
      .maybeSingle();

    if (error || !data) return null;

    const cachedAt = new Date(data.cached_at);
    const ageMs    = Date.now() - cachedAt.getTime();

    if (ageMs > TTL_MS) {
      console.log("[GDX Cache] Stale (>30d) for", gdx, "— will re-fetch");
      return null;
    }

    // Smart check: if the Supabase booking row has a last_modified newer than
    // the cache entry, re-fetch to pick up booking updates.
    try {
      const gdxForms = [String(gdx), `GDX-${gdx}`, `gdx-${gdx}`, `GDX${gdx}`, `gdx${gdx}`];
      const { data: rawRow } = await supabase
        .from("fusioo_booking_transactions")
        .select("last_modified:data->>last_modified")
        .in("data->>gdx", gdxForms)
        .maybeSingle();

      if (rawRow?.last_modified && new Date(rawRow.last_modified) > cachedAt) {
        console.log("[GDX Cache] Booking updated after cache for", gdx, "— will re-fetch");
        return null;
      }
    } catch {
      // Non-fatal — continue with cached data if the check itself fails
    }

    console.log("[GDX Cache] HIT for", gdx, "— skipping Supabase + Fusioo");
    return { booking: data.enriched_data, slug: data.slug, leadName: data.lead_name };
  } catch (err) {
    console.warn("[GDX Cache] Read error (non-fatal):", err?.message);
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// WRITE
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fire-and-forget cache write — never slows the user down.
 * Extracts lead_name from the booking object automatically.
 */
export function setCachedGdx(gdx, booking, slug) {
  _upsertCache(gdx, booking, slug).then(({ error }) => {
    if (error) console.warn("[GDX Cache] Write error (non-fatal):", error.message);
    else       console.log("[GDX Cache] Stored enriched booking for GDX", gdx);
  });
}

/**
 * Awaitable cache write — used by bulk cache to confirm storage.
 */
export async function setCachedGdxAsync(gdx, booking, slug) {
  const { error } = await _upsertCache(gdx, booking, slug);
  if (error) throw new Error(`Cache write failed for GDX ${gdx}: ${error.message}`);
}

async function _upsertCache(gdx, booking, slug) {
  const payload = {
    gdx:              String(gdx),
    enriched_data:    booking,
    slug:             slug || null,
    lead_name:        booking?.lead_name       ?? null,
    destination_name: booking?.destinationName ?? null,
    package_name:     booking?.collective_package_name
                      || booking?.type_of_package
                      || booking?.transaction_type
                      || null,
    cached_at:        new Date().toISOString(),
  };

  const result = await supabase
    .from(TABLE)
    .upsert(payload, { onConflict: "gdx" });

  // If new columns don't exist yet, retry without them — cache still works,
  // just without the fast display columns until the migration is run.
  if (result.error?.message && /destination_name|package_name|lead_name/.test(result.error.message)) {
    const { lead_name, destination_name, package_name, ...base } = payload;
    return supabase.from(TABLE).upsert(base, { onConflict: "gdx" });
  }

  return result;
}

// ─────────────────────────────────────────────────────────────────────────────
// INVALIDATE
// ─────────────────────────────────────────────────────────────────────────────

export async function invalidateCachedGdx(gdx) {
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq("gdx", String(gdx));

  if (error) console.warn("[GDX Cache] Invalidate error:", error.message);
  else       console.log("[GDX Cache] Invalidated GDX", gdx);
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN DISPLAY  —  reads directly from gdx_cache for the admin table
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns all cached entries from gdx_cache in display-ready format.
 *
 * @param {string[]|null} slugFilter  Optional: only return entries whose slug is
 *                                    in this list (e.g. Array.from(READY_SLUGS)).
 *                                    Pass null to return all entries with a slug.
 */
export async function getAllCachedEntries(slugFilter = null) {
  const buildQuery = (cols) => {
    let q = supabase.from(TABLE).select(cols).order("cached_at", { ascending: false });
    if (slugFilter && slugFilter.length > 0) {
      q = q.in("slug", slugFilter);
    } else {
      q = q.not("slug", "is", null);
    }
    return q;
  };

  // Primary query — lead_name column exists after SQL migration
  let { data, error } = await buildQuery("gdx, slug, lead_name, cached_at");

  // Fallback — absolute minimum if lead_name column not yet added
  if (error) {
    ({ data, error } = await buildQuery("gdx, slug, cached_at"));
  }

  if (error) throw error;

  let rows = (data ?? [])
    .map((e) => ({
      gdx:       e.gdx,
      lead_name: e.lead_name ?? null,
      slug:      e.slug      ?? null,
      cached_at: e.cached_at ?? null,
    }));

  // Fill in lead_name from bookings_6fbdd6b2 for any entry that's missing it.
  const missingGdxs = rows.filter((r) => r.lead_name === null).map((r) => String(r.gdx));
  if (missingGdxs.length > 0) {
    // If many are missing, fetch the whole table (faster than a huge IN clause).
    const nameQuery = missingGdxs.length > 200
      ? supabase.from("bookings_6fbdd6b2").select("gdx, lead_name")
      : supabase.from("bookings_6fbdd6b2").select("gdx, lead_name").in("gdx", missingGdxs);
    const { data: names } = await nameQuery;
    if (names?.length) {
      const nameMap = new Map();
      for (const n of names) {
        const k = String(n.gdx);
        if (!nameMap.has(k) && n.lead_name) nameMap.set(k, n.lead_name);
      }
      rows = rows.map((r) =>
        r.lead_name === null
          ? { ...r, lead_name: nameMap.get(String(r.gdx)) ?? null }
          : r
      );
    }
  }

  return rows;
}

/**
 * Returns the most recently BOOKED international clients (sorted by GDX desc).
 * Extracts lead_name directly from the enriched_data JSONB — no migration needed.
 */
export async function getRecentInternationalBookings(limit = 50) {
  const INTL_SLUGS = [
    "danang-vietnam", "hongkong", "singapore", "taipei",
    "beijing-shanghai-collective", "beijing-shanghai-pal", "beijing-shanghai-cebu-pacific",
    "hongkong-shenzhen-zhuhai", "hanoi-sapa-airasia", "beijing-shanghai",
    "hongkong-cebu-pacific", "danang-6d4n-vietjet", "danang-5d3n-vietjet",
    "danang-4d2n-bamboo", "danang-4d3n-airasia", "danang-4d3n-cebu-pacific",
    "danang-5d3n-bamboo", "danang-6d4n-vietjet-standard",
    "beijing-6d5n-pal", "beijing",
  ];

  const { data, error } = await supabase
    .from(TABLE)
    .select("gdx, slug, cached_at, enriched_data->>lead_name")
    .in("slug", INTL_SLUGS)
    .order("gdx", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []).map((e) => ({
    gdx:       e.gdx,
    slug:      e.slug,
    lead_name: e.lead_name ?? null,
    cached_at: e.cached_at,
  }));
}

// ─────────────────────────────────────────────────────────────────────────────
// BOOKING INTELLIGENCE  —  aggregated stats from enriched_data
// ─────────────────────────────────────────────────────────────────────────────

const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

/**
 * Computes per-slug booking intelligence from two sources:
 *
 *  Source A — enriched_data JSONB (travel dates from Fusioo):
 *    Tries departureDate, departure_date, arrivalDate, arrival, tourDate
 *    → tells us WHEN clients actually travel
 *
 *  Source B — bookings_6fbdd6b2.date_created (booking creation date):
 *    Available for every booking in Supabase
 *    → tells us WHEN clients make the purchase / WHEN demand peaks
 *
 * Returns a Map keyed by slug with:
 *   count              — total bookings in cache
 *   travelPeak         — top travel months from Fusioo dates (or null)
 *   bookingPeak        — top booking-creation months from date_created
 *   hasLiveTravelDates — true if ≥3 bookings had parseable travel dates
 *   hasLiveBookingDates— always true if slug has ≥3 bookings (date_created is reliable)
 */
export async function getBlockingIntelStats() {
  const CURRENT_YEAR = new Date().getFullYear();

  function tryParseDate(dateStr) {
    if (!dateStr) return null;
    try {
      const d = new Date(dateStr);
      if (!isNaN(d.getTime()) && d.getFullYear() > 2020) return d;
    } catch {}
    return null;
  }

  function emptyEntry() {
    return {
      count: 0,
      travelMonths:  new Array(12).fill(0),
      bookingMonths: new Array(12).fill(0),
      travelDateCount:  0,
      bookingDateCount: 0,
    };
  }

  // Title-case "danang-vietnam" → "Danang Vietnam" when destinationName unavailable
  function slugToDisplay(slug) {
    return slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  }

  // ── Single query: gdx_cache has everything we need ────────────────────────────
  // enriched_data = full Fusioo record merged with Supabase row (getFullBookingFromFusioo).
  // Booking date sources (tried in order of reliability):
  //   enriched_data->>created       — Fusioo system field (always present on Fusioo records)
  //   enriched_data->>date_created  — Supabase sync field (may be null if not synced)
  //   enriched_data->>last_modified — Fusioo last-modified (not ideal but always present)
  const { data: cacheRows, error: cacheErr } = await supabase
    .from(TABLE)
    .select(
      "gdx, slug, " +
      "enriched_data->>destinationName, " +
      "enriched_data->>created, " +
      "enriched_data->>date_created, " +
      "enriched_data->>last_modified, " +
      "enriched_data->>departureDate, " +
      "enriched_data->>departure_date, " +
      "enriched_data->>arrivalDate, " +
      "enriched_data->>arrival"
    );

  if (cacheErr) throw cacheErr;

  const byDest   = new Map();
  const bySlug   = new Map();
  const monthBuckets     = Array.from({ length: 12 }, () => new Map()); // current-year only
  const allYearBuckets   = Array.from({ length: 12 }, () => new Map()); // all-time (for matrix)

  for (const row of cacheRows ?? []) {
    // ── Resolve display name — skip if neither field is available ──────────────
    const destName = row.destinationName || (row.slug ? slugToDisplay(row.slug) : null);
    if (!destName) continue;

    const destKey  = destName.toLowerCase().trim();
    // Try Fusioo system 'created' first — it's always present on enriched records.
    // Fall back to 'date_created' (Supabase sync) then 'last_modified' (Fusioo).
    const bookDate  = tryParseDate(row.created || row.date_created || row.last_modified);
    const bookMonth = bookDate ? bookDate.getMonth() : null;
    const bookYear  = bookDate ? bookDate.getFullYear() : null;
    const travelDate = tryParseDate(
      row.departureDate || row.departure_date || row.arrivalDate || row.arrival
    );
    const travelMonth = travelDate ? travelDate.getMonth() : null;

    // ── Per-destination stats (all-time, for matrix counts + book rush) ────────
    if (!byDest.has(destKey)) byDest.set(destKey, emptyEntry());
    const de = byDest.get(destKey);
    de.count++;
    if (bookMonth !== null) { de.bookingMonths[bookMonth]++; de.bookingDateCount++; }

    // ── Per-slug stats (all-time, for travel peak) ─────────────────────────────
    if (row.slug) {
      if (!bySlug.has(row.slug)) bySlug.set(row.slug, emptyEntry());
      const se = bySlug.get(row.slug);
      se.count++;
      if (travelMonth !== null) { se.travelMonths[travelMonth]++; se.travelDateCount++; }
      if (bookMonth  !== null)  { se.bookingMonths[bookMonth]++;  se.bookingDateCount++;  }
    }

    // ── Monthly report buckets ─────────────────────────────────────────────────
    // Current-year bucket (shown in monthly report)
    if (bookMonth !== null && bookYear === CURRENT_YEAR) {
      monthBuckets[bookMonth].set(destName, (monthBuckets[bookMonth].get(destName) || 0) + 1);
    }
    // All-time bucket (used for matrix book rush peak months)
    if (bookMonth !== null) {
      allYearBuckets[bookMonth].set(destName, (allYearBuckets[bookMonth].get(destName) || 0) + 1);
    }
  }

  // ── Sort monthly buckets → arrays ─────────────────────────────────────────────
  const byMonth = monthBuckets.map(bucket =>
    Array.from(bucket.entries())
      .map(([dest, count]) => ({ dest, count }))
      .sort((a, b) => b.count - a.count)
  );

  // ── Convert month count arrays → readable strings ─────────────────────────────
  const MIN_DATA = 3;

  function topMonths(arr) {
    return arr
      .map((count, idx) => ({ idx, count }))
      .filter(m => m.count > 0)
      .sort((a, b) => b.count - a.count)
      .slice(0, 3)
      .sort((a, b) => a.idx - b.idx)
      .map(m => MONTH_NAMES[m.idx])
      .join(", ") || null;
  }

  for (const [, e] of bySlug) {
    e.travelPeak          = e.travelDateCount  >= MIN_DATA ? topMonths(e.travelMonths)  : null;
    e.bookingPeak         = e.bookingDateCount >= MIN_DATA ? topMonths(e.bookingMonths) : null;
    e.hasLiveTravelDates  = e.travelPeak  !== null;
    e.hasLiveBookingDates = e.bookingPeak !== null;
  }

  for (const [, e] of byDest) {
    e.bookingPeak         = e.bookingDateCount >= MIN_DATA ? topMonths(e.bookingMonths) : null;
    e.hasLiveBookingDates = e.bookingPeak !== null;
  }

  return { bySlug, byDest, byMonth };
}

// ─────────────────────────────────────────────────────────────────────────────
// MASTER LIST  —  permanent reference table
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns all entries from the permanent master list.
 */
export async function getMasterList() {
  const { data, error } = await supabase
    .from(MASTER_TABLE)
    .select("gdx, lead_name, destination_name, slug, package_name, is_ready, first_listed_at, updated_at")
    .order("slug", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

/**
 * Returns the set of GDX numbers already in the master list.
 */
async function getMasterListGdxSet() {
  const { data, error } = await supabase
    .from(MASTER_TABLE)
    .select("gdx");
  if (error) return new Set(); // table may not exist yet — treat as empty
  return new Set((data ?? []).map(r => String(r.gdx)));
}

/**
 * Upserts a single booking into the master list.
 * Called during bulk cache for each resolved booking.
 */
async function upsertMasterListEntry(gdx, booking, slug, isReady) {
  const entry = {
    gdx:              String(gdx),
    lead_name:        booking?.lead_name        ?? null,
    destination_name: booking?.destinationName  ?? null,
    slug:             slug                      ?? null,
    package_name:     booking?.collective_package_name
                      || booking?.type_of_package
                      || booking?.transaction_type
                      || null,
    is_ready:         isReady,
    updated_at:       new Date().toISOString(),
  };

  const { error } = await supabase
    .from(MASTER_TABLE)
    .upsert(entry, { onConflict: "gdx", ignoreDuplicates: false });

  if (error) console.warn("[Master List] Upsert error for GDX", gdx, ":", error.message);
}

// ─────────────────────────────────────────────────────────────────────────────
// STATS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns a summary of the current cache state.
 */
export async function getCacheStats() {
  let { data: cacheRows, error: cacheErr } = await supabase
    .from(TABLE)
    .select("gdx, slug, lead_name, destination_name, package_name, cached_at");

  if (cacheErr) {
    ({ data: cacheRows, error: cacheErr } = await supabase
      .from(TABLE)
      .select("gdx, slug, destination_name, package_name, cached_at"));
  }

  if (cacheErr) throw cacheErr;

  // bookingRows is supplementary (total count) — non-fatal if it fails
  const { data: bookingRows } = await supabase
    .from("bookings_6fbdd6b2")
    .select("gdx");

  const bySlug = {};

  (cacheRows ?? []).forEach((e) => {
    const key = e.slug || "unresolved";
    bySlug[key] = (bySlug[key] ?? 0) + 1;
  });

  return {
    totalBookings: bookingRows?.length  ?? 0,
    totalCached:   cacheRows?.length    ?? 0,
    freshCached:   cacheRows?.length    ?? 0,
    staleCached:   0,
    uncached:      (bookingRows?.length ?? 0) - (cacheRows?.length ?? 0),
    bySlug,
    entries: (cacheRows ?? []).map((e) => ({
      gdx:             e.gdx,
      slug:            e.slug,
      leadName:        e.lead_name,
      packageName:     e.package_name     || e.slug || "—",
      destinationName: e.destination_name || e.slug || "—",
      cachedAt:        e.cached_at,
      fresh:           true,
    })),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// BULK PRE-POPULATE
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Bulk-caches ALL bookings from bookings_6fbdd6b2.
 *
 * ALL bookings are stored — not just READY_SLUGS — so that routing is always
 * instant from the cache. The slug determines which page is shown:
 *   • slug in READY_SLUGS → destination briefing page
 *   • slug not in READY_SLUGS or null → briefing-pending page
 *
 * Only re-processes a booking if:
 *   a. Never cached, OR
 *   b. Cache is older than 30 days, OR
 *   c. Booking was updated in Fusioo after the cache was written
 *
 * @param {(msg: string) => void} onProgress   progress callback
 * @returns {Promise<{ success, skipped, failed }>}
 */
export async function bulkCacheAllBookings(onProgress, readySlugs = new Set(), onEntry = null, cutoffDate = null) {
  const log = (msg) => { console.log(msg); onProgress?.(msg); };
  if (cutoffDate) log(`📅 Fetching bookings from ${cutoffDate.toLocaleDateString("en-PH")} onwards...`);

  log("🔍 Fetching international bookings from Supabase + master list...");

  const [
    { data: rawRows, error: bookErr },
    { data: cacheEntries, error: cacheErr },
    masterGdxSet,
  ] = await Promise.all([
    supabase
      .from("fusioo_booking_transactions")
      .select("id, data")
      .not("data->destination", "is", null),   // domestic bookings use domestic_voucher_destination, not this field
    supabase
      .from(TABLE)
      .select("gdx, cached_at"),
    getMasterListGdxSet(),
  ]);

  if (bookErr) throw bookErr;
  if (cacheErr) throw cacheErr;

  // Flatten the JSONB `data` column to the flat shape the rest of this function expects.
  const arrToStr = (v) =>
    Array.isArray(v) ? v.filter((x) => typeof x === "string").join(" ") : v;
  const allBookings = (rawRows ?? []).map((row) => ({
    gdx:              row.data.gdx,
    record_id:        row.id || row.data.id,
    lead_name:        row.data.lead_name,
    destination:      row.data.destination,
    transaction_type: arrToStr(row.data.transaction_type),
    last_modified:    row.data.last_modified,
    date_created:     row.data.date_created,
  }));

  // Secondary client-side guard: skip any row explicitly tagged as domestic/local
  const DOMESTIC_TERMS = ["domestic", "local voucher", "local package", "provincial"];
  const internationalBookings = (allBookings ?? []).filter((b) => {
    if (!b.transaction_type) return true; // no tag → assume international
    const tt = b.transaction_type.toLowerCase();
    return !DOMESTIC_TERMS.some((t) => tt.includes(t));
  });

  const cacheMap = new Map(
    (cacheEntries ?? []).map((e) => [String(e.gdx), new Date(e.cached_at)])
  );
  const now = Date.now();

  // Which bookings need (re)caching from Fusioo?
  // Only process bookings within the selected date window (cutoffDate).
  // Already-cached but updated in Fusioo are always re-fetched regardless of date.
  const toProcess = internationalBookings.filter((b) => {
    const cachedAt    = cacheMap.get(String(b.gdx));
    const bookingDate = b.date_created ? new Date(b.date_created) : null;
    const inWindow    = !cutoffDate || !bookingDate || bookingDate >= cutoffDate;

    if (b.last_modified && cachedAt && new Date(b.last_modified) > cachedAt) return true; // updated → always re-fetch
    if (!cachedAt) return inWindow;  // never cached → only if within window
    return false;                    // already cached and unchanged → skip
  });

  const alreadyCached = internationalBookings.length - toProcess.length;

  log(
    `🌏 ${internationalBookings.length} international | ` +
    `${alreadyCached} already cached | ` +
    `${masterGdxSet.size} in master list | ` +
    `${toProcess.length} to fetch from Fusioo`
  );

  if (toProcess.length === 0) {
    log(`✅ All ${internationalBookings.length} international bookings are cached and up to date.`);
    return { success: [], newToList: [], skipped: [], failed: [] };
  }

  const results = { success: [], newToList: [], skipped: [], failed: [] };

  for (let i = 0; i < toProcess.length; i++) {
    const row = toProcess[i];
    const isNew = !masterGdxSet.has(String(row.gdx));
    log(`[${i + 1}/${toProcess.length}] GDX ${row.gdx} — ${row.lead_name ?? "unknown"}${isNew ? " 🆕" : ""}...`);

    try {
      const fullBooking = await getFullBookingFromFusioo(row);

      if (!fullBooking) {
        results.failed.push({ gdx: row.gdx, leadName: row.lead_name, reason: "Fusioo returned null" });
        log(`  ❌ GDX ${row.gdx} — Fusioo returned null`);
        continue;
      }

      if (!fullBooking.lead_name && row.lead_name) {
        fullBooking.lead_name = row.lead_name;
      }

      const slug    = resolveDestinationSlug(fullBooking);
      const isReady = slug ? readySlugs.has(slug) : false;

      // 1. Store in gdx_cache (always)
      await setCachedGdxAsync(String(row.gdx), fullBooking, slug);

      // 2. Upsert into permanent master list
      await upsertMasterListEntry(row.gdx, fullBooking, slug, isReady);

      const entry = {
        gdx:             row.gdx,
        slug:            slug ?? null,
        destinationName: fullBooking.destinationName,
        packageName:     fullBooking.collective_package_name
                         || fullBooking.type_of_package
                         || fullBooking.transaction_type
                         || "—",
        leadName:        row.lead_name,
        isNew,
        isReady,
      };

      if (slug) {
        results.success.push(entry);
        if (isNew) results.newToList.push(entry);
        log(`  ✅ GDX ${row.gdx} → ${fullBooking.destinationName ?? slug} | ${entry.packageName} | ${row.lead_name ?? "—"}${isNew ? " [NEW]" : ""}`);
      } else {
        results.skipped.push(entry);
        log(`  ⏭️  GDX ${row.gdx} — unresolved destination | ${row.lead_name ?? "—"}`);
      }

      // Fire immediately so the UI can add this entry to the live list
      onEntry?.({
        gdx:              String(row.gdx),
        lead_name:        fullBooking.lead_name ?? row.lead_name ?? null,
        destination_name: fullBooking.destinationName ?? null,
        slug:             slug ?? null,
        package_name:     fullBooking.collective_package_name
                          || fullBooking.type_of_package
                          || fullBooking.transaction_type
                          || null,
        is_ready:         isReady,
        isNew,
      });
    } catch (err) {
      results.failed.push({ gdx: row.gdx, leadName: row.lead_name, reason: err.message });
      log(`  ❌ GDX ${row.gdx} — ${err.message}`);
    }

    if (i < toProcess.length - 1) {
      await new Promise((r) => setTimeout(r, 2000));
    }
  }

  log(
    `\n🏁 Done! ✅ ${results.success.length} resolved | ` +
    `🆕 ${results.newToList.length} new to list | ` +
    `⏭️  ${results.skipped.length} unresolved | ` +
    `❌ ${results.failed.length} failed`
  );

  return results;
}
