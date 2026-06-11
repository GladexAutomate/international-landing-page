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
 *   slug           TEXT
 *   cached_at      TIMESTAMPTZ DEFAULT NOW()
 *
 * SQL to create (run once in Supabase → SQL Editor):
 *   See supabase/migrations/gdx_cache.sql
 */

import { supabase } from "@/lib/supabase";

const TABLE     = "gdx_cache";
const TTL_MS    = 24 * 60 * 60 * 1000; // 24 hours — refresh once a day

/**
 * Returns the cached enriched booking for the given GDX number.
 * Returns null if not found or entry is older than TTL.
 *
 * @param {string} gdx
 * @returns {Promise<{ booking: object, slug: string|null }|null>}
 */
export async function getCachedGdx(gdx) {
  try {
    const { data, error } = await supabase
      .from(TABLE)
      .select("enriched_data, slug, cached_at")
      .eq("gdx", String(gdx))
      .maybeSingle();

    if (error || !data) return null;

    const ageMs = Date.now() - new Date(data.cached_at).getTime();
    if (ageMs > TTL_MS) {
      console.log("[GDX Cache] Stale entry for", gdx, "— will re-fetch");
      return null;
    }

    console.log("[GDX Cache] HIT for", gdx, "— skipping Supabase + Fusioo");
    return { booking: data.enriched_data, slug: data.slug };
  } catch (err) {
    // Never block the main flow if cache read fails
    console.warn("[GDX Cache] Read error (non-fatal):", err?.message);
    return null;
  }
}

/**
 * Upserts the enriched booking into the cache table.
 * Runs fire-and-forget — does NOT await, so it never slows the user down.
 *
 * @param {string}      gdx
 * @param {object}      booking  - fully-enriched booking object
 * @param {string|null} slug     - resolved destination slug
 */
export function setCachedGdx(gdx, booking, slug) {
  supabase
    .from(TABLE)
    .upsert(
      {
        gdx:           String(gdx),
        enriched_data: booking,
        slug:          slug || null,
        cached_at:     new Date().toISOString(),
      },
      { onConflict: "gdx" }
    )
    .then(({ error }) => {
      if (error) {
        console.warn("[GDX Cache] Write error (non-fatal):", error.message);
      } else {
        console.log("[GDX Cache] Stored enriched booking for GDX", gdx);
      }
    });
}

/**
 * Manually removes a single entry from the cache.
 * Call this if a booking is updated and you want to force a re-fetch.
 *
 * @param {string} gdx
 */
export async function invalidateCachedGdx(gdx) {
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq("gdx", String(gdx));

  if (error) console.warn("[GDX Cache] Invalidate error:", error.message);
  else       console.log("[GDX Cache] Invalidated GDX", gdx);
}
