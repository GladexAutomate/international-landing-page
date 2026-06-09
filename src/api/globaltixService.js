// @ts-nocheck
/**
 * GLOBALTIX RESELLER API SERVICE
 * ─────────────────────────────────────────────────────────────────────────────
 * Centralised service for all Globaltix API interactions.
 *
 * Authentication strategy:
 *   POST /api/auth/authorize  → Bearer access token  (expiry: ~860 s)
 *   Token is cached in module-level memory and auto-refreshed 60 s before
 *   expiry so callers never need to think about auth.
 *
 * Environment variables required (see .env.local):
 *   VITE_GLOBALTIX_BASE_URL   — API base URL  (default: staging)
 *   VITE_GLOBALTIX_AGENT      — x-api-agent value
 *   VITE_GLOBALTIX_API_KEY    — API key (combined with agent in x-api-key header)
 *   VITE_GLOBALTIX_USERNAME   — Reseller login username
 *
 * Usage:
 *   import { getCategories, getCountries, getCities } from "@/api/globaltixService";
 *   const categories = await getCategories();
 */

// ── Config ────────────────────────────────────────────────────────────────────
const BASE_URL = import.meta.env.VITE_GLOBALTIX_BASE_URL ?? "https://stg-api.globaltix.com";
const AGENT    = import.meta.env.VITE_GLOBALTIX_AGENT;
const API_KEY  = import.meta.env.VITE_GLOBALTIX_API_KEY;
const USERNAME = import.meta.env.VITE_GLOBALTIX_USERNAME?.trim();

// ── In-memory token store ─────────────────────────────────────────────────────
// Persists across calls within the same browser session; cleared on page reload.
const _token = {
  accessToken:  null,
  refreshToken: null,
  expiresAt:    0,      // Unix ms — 0 means never authenticated
};

// ── Static headers required by every Globaltix request ───────────────────────
function _baseHeaders() {
  if (!AGENT || !API_KEY) {
    console.warn("[Globaltix] Missing VITE_GLOBALTIX_AGENT or VITE_GLOBALTIX_API_KEY");
  }
  return {
    "Content-Type": "application/json",
    "x-api-agent":  AGENT  ?? "",
    "x-api-key":    `${AGENT ?? ""}/${API_KEY ?? ""}`,
  };
}

// ── Authentication ────────────────────────────────────────────────────────────
async function _authenticate() {
  console.log("[Globaltix] Authenticating with username:", USERNAME);

  const res = await fetch(`${BASE_URL}/api/auth/authorize`, {
    method:  "POST",
    headers: _baseHeaders(),
    body:    JSON.stringify({ username: USERNAME }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`[Globaltix] Auth failed — HTTP ${res.status}: ${body}`);
  }

  const json = await res.json();
  const data = json.data ?? json;

  if (!data.accessToken) {
    console.error("[Globaltix] Auth response:", json);
    throw new Error("[Globaltix] Auth response did not include an accessToken");
  }

  // Refresh 60 s before actual expiry to avoid racing clock skew
  const ttlSeconds = (data.expiration ?? 860) - 60;
  _token.accessToken  = data.accessToken;
  _token.refreshToken = data.refreshToken ?? null;
  _token.expiresAt    = Date.now() + ttlSeconds * 1000;

  console.log(
    `[Globaltix] Authenticated. Roles: ${data.roles?.join(", ") ?? "—"}. ` +
    `Token valid for ~${ttlSeconds}s. ` +
    `Reseller: ${data.user?.reseller?.name ?? "—"} | Currency: ${data.user?.currency?.code ?? "—"}`
  );

  return _token.accessToken;
}

// ── Token getter — re-authenticates automatically when expired ────────────────
async function _getToken() {
  if (!_token.accessToken || Date.now() >= _token.expiresAt) {
    await _authenticate();
  }
  return _token.accessToken;
}

// ── Generic authenticated GET ─────────────────────────────────────────────────
// retried = true prevents infinite loops on persistent 401 responses
async function _get(path, params, retried = false) {
  const token = await _getToken();

  let url = `${BASE_URL}${path}`;
  if (params && Object.keys(params).length > 0) {
    const qs = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v !== null && v !== undefined)
    ).toString();
    if (qs) url += `?${qs}`;
  }

  console.log(`[Globaltix] GET ${url}`);

  const res = await fetch(url, {
    method:  "GET",
    headers: { ..._baseHeaders(), Authorization: `Bearer ${token}` },
  });

  // 401 — token may have been invalidated server-side; refresh once
  if (res.status === 401 && !retried) {
    console.warn(`[Globaltix] 401 on ${path} — forcing token refresh and retrying`);
    _token.expiresAt = 0;
    return _get(path, params, true);
  }

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`[Globaltix] GET ${path} — HTTP ${res.status}: ${body}`);
  }

  const json = await res.json();
  console.log(`[Globaltix] GET ${path} — OK (${Array.isArray(json?.data) ? json.data.length + " items" : typeof json})`);
  return json;
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Returns full detail for a single product (description, inclusions, operating hours, etc.).
 * Use this to enrich a product from the list endpoint before displaying a full tour card.
 *
 * @param {number|string} productId
 * @returns {Promise<Object>}
 */
export async function getProductInfo(productId) {
  return _get("/api/product/info", { id: productId });
}

/**
 * Returns ticket types and pricing tiers for a product.
 * Required before checkout — provides the bookingOptions (Adult, Child, Senior, etc.)
 * with their per-unit prices.
 *
 * isDynamicPrice: pass false unless you know the product uses dynamic pricing.
 * The field is not present in the product list/info response; default to false.
 *
 * @param {number|string} productId
 * @param {boolean} [isDynamicPrice=false]
 * @returns {Promise<Object>}
 */
export async function getProductOptions(productId, isDynamicPrice = false) {
  return _get("/api/product/options", { id: productId, isDynamicPrice });
}

/**
 * Returns all products in this reseller's Globaltix catalogue.
 * Each product includes country, city, and category as plain strings.
 *
 * countryCode filter narrows within the reseller's pre-assigned catalogue;
 * it does NOT unlock products outside the reseller account.
 * Filter client-side after fetching for destination-based filtering.
 *
 * @param {Record<string,string|number>} [filters]  e.g. { countryCode: "SG" }
 * @returns {Promise<{ data: Array, size: number, success: boolean }>}
 */
export async function getProducts(filters = {}) {
  return _get("/api/product/list", filters);
}

/**
 * Returns all countries with their embedded city lists.
 * Endpoint: GET /api/country/getAllCountries
 * Each country object includes id, code, name, mobilePrefix, currency,
 * and a cities[] array ({ id, name, countryId, timezoneOffset, isCapital }).
 *
 * Use this as the authoritative source for exact city name strings — the
 * city.name values here match the `city` field returned by /api/product/list.
 *
 * @returns {Promise<Array>}
 */
export async function getAllCountriesWithCities() {
  const res = await _get("/api/country/getAllCountries");
  return res?.data ?? res ?? [];
}

/**
 * Returns a flat list of all city objects across all countries.
 * Derived from getAllCountriesWithCities() — no separate API call needed.
 *
 * @returns {Promise<Array<{ id: number, name: string, countryId: number, timezoneOffset: number, isCapital: boolean }>>}
 */
export async function getCities() {
  const countries = await getAllCountriesWithCities();
  return countries.flatMap((c) => c.cities ?? []);
}

/**
 * Returns all country names available in the Globaltix catalogue.
 * Derived from getAllCountriesWithCities().
 *
 * @returns {Promise<string[]>} Sorted array of country name strings
 */
export async function getCountries() {
  const countries = await getAllCountriesWithCities();
  return countries.map((c) => c.name).filter(Boolean).sort();
}

/**
 * Returns all Globaltix merchant categories (Activities, Attraction, Tours, etc.).
 * Uses the dedicated endpoint instead of deriving from the product list.
 *
 * @returns {Promise<Array<{ id: number, name: string }>>}
 */
export async function getCategories() {
  const res = await _get("/api/merchantCategory/getAllCategories");
  return res?.data ?? [];
}

/**
 * Force a fresh authentication, regardless of whether the current token
 * is still valid. Useful for debugging or after a credentials rotation.
 */
export async function forceReAuthenticate() {
  _token.expiresAt = 0;
  return _authenticate();
}
