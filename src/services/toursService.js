// @ts-nocheck
/**
 * TOURS SERVICE
 * ─────────────────────────────────────────────────────────────────────────────
 * Fetches live Globaltix tour products for a destination and maps them to
 * the Tour model (src/types/addons.js).
 *
 * Flow:
 *   1. GET /api/product/list — full reseller catalogue (module-level cached, 10 min TTL)
 *   2. Filter by destination → city mapping
 *   3. GET /api/product/info?id= — enrich each match in parallel
 *   4. Map each result to Tour model via globaltixMapper
 */

import { getProducts, getProductInfo } from "../api/globaltixService";
import { mapGlobtixProductToTour }     from "../api/globaltixMapper";

// ── Catalogue cache ───────────────────────────────────────────────────────────
// getProducts() fetches all reseller products in one call. Cache the result
// for 10 minutes so navigating between destination slugs reuses the same data.
let _catalogue       = null;
let _catalogueFetched = 0;
const CACHE_TTL_MS   = 10 * 60 * 1000;

async function _getCatalogue() {
  if (_catalogue && Date.now() - _catalogueFetched < CACHE_TTL_MS) return _catalogue;
  const res    = await getProducts();
  _catalogue   = res?.data ?? [];
  _catalogueFetched = Date.now();
  return _catalogue;
}

// ── Destination slug → Globaltix city names ───────────────────────────────────
// City strings are the EXACT values returned by GET /api/country/getAllCountries
// and matched against the `city` field in GET /api/product/list.
// Verified against live API on 2026-06-06.
const DESTINATION_CITIES = {
  // ── South-East Asia ──────────────────────────────────────────────────────
  "singapore":              ["Singapore"],
  "bali":                   ["Bali"],
  "bali-wisataku":          ["Bali"],
  "bangkok":                ["Bangkok"],
  "bangkok-pattaya":        ["Bangkok", "Pattaya Beach"],   // "Pattaya Beach" not "Pattaya"
  "chiangmai":              ["Chiang Mai"],
  "phuket":                 ["Phuket"],
  "danang-vietnam":         ["Da Nang", "Hoi An"],
  "vietnam-hanoi":          ["Hanoi"],
  "vietnam-phu-quoc":       ["Phu Quoc City"],              // "Phu Quoc City" not "Phu Quoc"
  "kuala-lumpur":           ["Kuala Lumpur"],
  "malaysia-kota-kinabalu": ["Kota Kinabalu"],
  "cambodia":               ["Siem Reap"],
  "indochina":              ["Ho Chi Minh", "Ho Chi Minh City", "Phnom Penh"],
  // ── East Asia ────────────────────────────────────────────────────────────
  "hongkong":               ["Hong kong"],                  // "Hong kong" not "Hong Kong"
  "macau":                  ["Macau"],
  "korea":                  ["Seoul"],
  "jeju-korea":             ["Jeju"],
  "japan":                  ["Tokyo", "Osaka", "Kyoto"],
  "taipei":                 ["Taipei"],
  "beijing-shanghai":       ["Beijing", "Shanghai"],
  // ── Middle East / Pacific ─────────────────────────────────────────────────
  "dubai":                  ["Dubai"],
  "maldives":               ["Maldives"],
  "maldives-maafushi":      ["Maldives"],
  "new-zealand":            ["Auckland", "Queenstown"],
  // ── Multi-city packages ───────────────────────────────────────────────────
  "tri-city":               ["Singapore", "Bali", "Bangkok"],
  "twin-city":              ["Singapore", "Bangkok"],
  // ── Philippines domestic ──────────────────────────────────────────────────
  "palawan":                ["Palawan"],
  "boracay":                ["Boracay"],
  "manila":                 ["Manila"],
};

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Returns live Globaltix tour products for the given destination slug.
 * Enriches each product with /api/product/info for description and inclusions.
 * Falls back to an empty array on any error so the UI always renders cleanly.
 *
 * @param {string} slug  e.g. "hongkong", "bali", "danang-vietnam"
 * @returns {Promise<import("../types/addons").Tour[]>}
 */
export async function getToursForDestination(slug) {
  try {
    const cities = DESTINATION_CITIES[slug];
    if (!cities || cities.length === 0) return [];

    // 1. Fetch (or return cached) product catalogue for this reseller
    const all = await _getCatalogue();

    // 2. Filter to products whose city is in the destination city list (case-insensitive)
    const citiesLower = cities.map((c) => c.toLowerCase());
    const matching = all.filter((p) => citiesLower.includes(p.city?.toLowerCase()));
    if (matching.length === 0) return [];

    // 3. Enrich each match with full product info in parallel
    const enriched = await Promise.all(
      matching.map(async (product) => {
        try {
          const infoRes = await getProductInfo(product.id);
          return infoRes?.data ?? infoRes ?? product;
        } catch {
          return product;  // graceful fallback to list-level data
        }
      })
    );

    // 4. Map to Tour model
    return enriched.map(mapGlobtixProductToTour);

  } catch (err) {
    console.error("[ToursService] getToursForDestination failed for slug:", slug, err);
    return [];
  }
}
