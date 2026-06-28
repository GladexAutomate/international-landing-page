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
      const { data: rawRow } = await supabase
        .from("bookings_6fbdd6b2")
        .select("last_modified")
        .eq("gdx", String(gdx))
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
 * Returns all fresh entries from gdx_cache in display-ready format.
 * This is the primary data source for the admin page — it always has data
 * after any bulk fetch because gdx_cache is written first.
 */
export async function getAllCachedEntries() {
  // Attempt 1: all display columns (requires SQL migration)
  let { data, error } = await supabase
    .from(TABLE)
    .select("gdx, slug, lead_name, destination_name, package_name, cached_at");

  // Attempt 2: without destination/package columns
  if (error) {
    ({ data, error } = await supabase
      .from(TABLE)
      .select("gdx, slug, lead_name, cached_at"));
  }

  // Attempt 3: absolute minimum — guaranteed original columns only
  if (error) {
    ({ data, error } = await supabase
      .from(TABLE)
      .select("gdx, slug, cached_at"));
  }

  if (error) throw error;

  const now = Date.now();
  let rows = (data ?? [])
    .filter((e) => now - new Date(e.cached_at).getTime() < TTL_MS)
    .map((e) => ({
      gdx:              e.gdx,
      lead_name:        e.lead_name        ?? null,
      destination_name: e.destination_name ?? null,
      slug:             e.slug             ?? null,
      package_name:     e.package_name     ?? null,
    }));

  // If lead_name is missing (SQL migration not run), pull from bookings_6fbdd6b2
  // which always has the passenger name — no schema change needed.
  if (rows.length > 0 && rows.every((r) => r.lead_name === null)) {
    const { data: names } = await supabase
      .from("bookings_6fbdd6b2")
      .select("gdx, lead_name");
    if (names?.length) {
      const nameMap = new Map(names.map((n) => [String(n.gdx), n.lead_name]));
      rows = rows.map((r) => ({
        ...r,
        lead_name: nameMap.get(String(r.gdx)) ?? null,
      }));
    }
  }

  return rows;
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
  // Never select enriched_data — too large for bulk reads (causes 400).
  // Use the lightweight display columns instead.
  let { data: cacheRows, error: cacheErr } = await supabase
    .from(TABLE)
    .select("gdx, slug, lead_name, destination_name, package_name, cached_at");

  if (cacheErr) {
    ({ data: cacheRows, error: cacheErr } = await supabase
      .from(TABLE)
      .select("gdx, slug, lead_name, cached_at"));
  }

  if (cacheErr) {
    ({ data: cacheRows, error: cacheErr } = await supabase
      .from(TABLE)
      .select("gdx, slug, cached_at"));
  }

  if (cacheErr) throw cacheErr;

  // bookingRows is supplementary (total count) — non-fatal if it fails
  const { data: bookingRows } = await supabase
    .from("bookings_6fbdd6b2")
    .select("gdx");

  const now = Date.now();
  const bySlug = {};
  let freshCount = 0;

  (cacheRows ?? []).forEach((e) => {
    const age = now - new Date(e.cached_at).getTime();
    if (age < TTL_MS) freshCount++;
    const key = e.slug || "unresolved";
    bySlug[key] = (bySlug[key] ?? 0) + 1;
  });

  return {
    totalBookings: bookingRows?.length  ?? 0,
    totalCached:   cacheRows?.length    ?? 0,
    freshCached:   freshCount,
    staleCached:   (cacheRows?.length ?? 0) - freshCount,
    uncached:      (bookingRows?.length ?? 0) - (cacheRows?.length ?? 0),
    bySlug,
    entries: (cacheRows ?? []).map((e) => ({
      gdx:             e.gdx,
      slug:            e.slug,
      leadName:        e.lead_name,
      packageName:     e.package_name     || e.slug || "—",
      destinationName: e.destination_name || e.slug || "—",
      cachedAt:        e.cached_at,
      fresh:           now - new Date(e.cached_at).getTime() < TTL_MS,
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
export async function bulkCacheAllBookings(onProgress, readySlugs = new Set(), onEntry = null) {
  const log = (msg) => { console.log(msg); onProgress?.(msg); };

  log("🔍 Fetching international bookings from Supabase + master list...");

  const [
    { data: allBookings, error: bookErr },
    { data: cacheEntries, error: cacheErr },
    masterGdxSet,
  ] = await Promise.all([
    supabase
      .from("bookings_6fbdd6b2")
      .select("gdx, record_id, lead_name, destination, transaction_type, last_modified, date_created")
      .not("destination", "is", null),   // domestic bookings use domestic_voucher_destination, not this field
    supabase
      .from(TABLE)
      .select("gdx, cached_at"),
    getMasterListGdxSet(),
  ]);

  if (bookErr) throw bookErr;
  if (cacheErr) throw cacheErr;

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
  const toProcess = internationalBookings.filter((b) => {
    const cachedAt = cacheMap.get(String(b.gdx));
    if (!cachedAt) return true;
    if (now - cachedAt.getTime() > TTL_MS) return true;
    if (b.last_modified && new Date(b.last_modified) > cachedAt) return true;
    return false;
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
      await new Promise((r) => setTimeout(r, 800));
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
