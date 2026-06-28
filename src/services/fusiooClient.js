/**
 * FUSIOO CLIENT  —  Central API Layer
 * ─────────────────────────────────────────────────────────────────────────────
 * Framework : React 18 + Vite 6  (SPA — no server)
 *
 * SECURITY ARCHITECTURE
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *   VITE_FUSIOO_TOKEN      → Access token. Used here in the browser.
 *                             It is a JWE (encrypted JWT) — opaque to
 *                             anyone who reads the source. Safe for
 *                             read-only operations on a public briefing page.
 *
 *   FUSIOO_CLIENT_ID       → Stored in .env.local WITHOUT the VITE_ prefix.
 *                             Vite never bundles it. For future use in a
 *                             Supabase Edge Function that refreshes the token.
 *
 *   FUSIOO_CLIENT_SECRET   → Same — NO VITE_ prefix. Never touches the browser.
 *                             Must only be used inside Supabase Edge Functions.
 *
 * WHY THE TOKEN IS IN THE BROWSER
 * ─────────────────────────────────────────────────────────────────────────────
 * This project is a pure Vite SPA. There is no Node/Express server to proxy
 * requests. For read-only lookups (destination names, hotel names, document
 * URLs) from a page that confirmed paying customers visit, this is acceptable.
 *
 * For any write operations or admin-level access, use a Supabase Edge Function
 * instead of calling Fusioo directly from the browser.
 *
 * ENDPOINTS USED
 * ─────────────────────────────────────────────────────────────────────────────
 *   GET  /apps                    → list all Fusioo apps
 *   GET  /apps/{appId}            → get app schema + field definitions
 *   GET  /apps/{appId}/records    → list records in an app
 *   GET  /records/{recordId}      → fetch a single record by ID
 *
 * HOW TO FIND YOUR APP IDs AND RECORD IDs IN FUSIOO
 * ─────────────────────────────────────────────────────────────────────────────
 *   1. Log in to Fusioo → open any App
 *   2. The App ID is in the browser URL:  fusioo.com/apps/{APP_ID}/...
 *   3. Click any record — the Record ID is in the URL:  .../records/{RECORD_ID}
 *   4. Or call:  GET /apps  →  each item in the response has an "id" field
 *   5. App IDs start with "i" followed by 32 hex characters
 */

// ── Read credentials from environment variables ───────────────────────────────
// VITE_ prefix = accessible in browser  (token is safe here — it's a JWE)
// No prefix    = only in .env.local, never bundled by Vite
const BASE_URL = import.meta.env.VITE_FUSIOO_BASE_URL || "https://api.fusioo.com/v1";
const TOKEN    = import.meta.env.VITE_FUSIOO_TOKEN    || "";

// ── Validate at startup ───────────────────────────────────────────────────────
if (!TOKEN) {
  console.error(
    "[FusiooClient] VITE_FUSIOO_TOKEN is not set in .env.local. " +
    "Fusioo API calls will fail."
  );
}

// ── In-memory cache — prevents duplicate requests within the same browser tab ─
const _cache = new Map();

// ─────────────────────────────────────────────────────────────────────────────
// CORE REQUEST FUNCTION
// All API calls go through here. Handles every error case.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Makes an authenticated GET request to the Fusioo API.
 *
 * @param {string} path      API path, e.g. "/apps" or "/records/i123abc..."
 * @param {object} params    Optional URL query parameters as a plain object
 * @returns {Promise<any>}   Parsed JSON response body
 * @throws {FusiooError}     On HTTP error or network failure
 */
export async function fusiooGet(path, params = {}) {
  // Build URL with optional query string
  const url = new URL(`${BASE_URL}${path}`);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
  });

  let resp;
  try {
    resp = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });
  } catch (networkErr) {
    // Network failure — no internet, DNS error, Fusioo is down
    throw new FusiooError("NETWORK_ERROR", "Could not reach Fusioo API. Check your internet connection.", networkErr);
  }

  // Parse the response body regardless of status code
  let body;
  try {
    body = await resp.json();
  } catch {
    body = null;
  }

  // Handle HTTP error codes
  if (!resp.ok) {
    const message = body?.message || body?.error || `HTTP ${resp.status}`;
    switch (resp.status) {
      case 401:
        throw new FusiooError("UNAUTHORIZED", "Access token is invalid or expired. Update VITE_FUSIOO_TOKEN in .env.local.", body);
      case 403:
        throw new FusiooError("FORBIDDEN", "Your token does not have permission to access this resource.", body);
      case 404:
        throw new FusiooError("NOT_FOUND", `Resource not found: ${path}`, body);
      case 429:
        throw new FusiooError("RATE_LIMITED", "Too many requests to Fusioo. Wait a moment and retry.", body);
      case 500:
      case 502:
      case 503:
        throw new FusiooError("SERVER_ERROR", "Fusioo server error. Try again shortly.", body);
      default:
        throw new FusiooError("API_ERROR", message, body);
    }
  }

  return body;
}

// ─────────────────────────────────────────────────────────────────────────────
// CUSTOM ERROR CLASS
// Lets callers distinguish Fusioo errors from other JavaScript errors.
// ─────────────────────────────────────────────────────────────────────────────

export class FusiooError extends Error {
  /**
   * @param {string} code     Machine-readable error code
   * @param {string} message  Human-readable description
   * @param {any}    detail   Raw API response for debugging
   */
  constructor(code, message, detail = null) {
    super(message);
    this.name    = "FusiooError";
    this.code    = code;
    this.detail  = detail;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// CONNECTION TEST
// Call this once when your app starts or from a debug button to verify
// that the token is valid and Fusioo is reachable.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Tests the Fusioo API connection.
 *
 * Returns an object describing the result so you can show it in the UI
 * or log it to the console.
 *
 * Usage example:
 *   const result = await testFusiooConnection();
 *   console.log(result.status);   // "connected" | "unauthorized" | "error"
 *   console.log(result.message);  // human-readable description
 *   console.log(result.appCount); // number of apps your token can access
 *
 * @returns {Promise<{ status: string, message: string, appCount: number|null }>}
 */
export async function testFusiooConnection() {
  console.log("[FusiooClient] Testing connection…");

  if (!TOKEN) {
    return {
      status: "misconfigured",
      message: "VITE_FUSIOO_TOKEN is missing from .env.local",
      appCount: null,
    };
  }

  try {
    const response = await fusiooGet("/apps");
    const apps     = response?.data || [];

    console.log("[FusiooClient] ✅ Connection successful.");
    console.log(`[FusiooClient] Accessible apps: ${apps.length}`);

    return {
      status:   "connected",
      message:  `Connected to Fusioo. ${apps.length} app(s) accessible.`,
      appCount: apps.length,
      apps:     apps.map((a) => ({ id: a.id, name: a.name })),
    };
  } catch (err) {
    if (err instanceof FusiooError) {
      console.error("[FusiooClient] ❌ Connection failed:", err.code, err.message);
      return {
        status:  "failed",
        message: err.message,
        code:    err.code,
        appCount: null,
      };
    }
    console.error("[FusiooClient] ❌ Unexpected error:", err);
    return {
      status:  "error",
      message: "An unexpected error occurred. See the browser console.",
      appCount: null,
    };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// APP OPERATIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns the list of all Fusioo apps your token can access.
 *
 * Each app has:  { id, name, fields[], single_record_name }
 *
 * @returns {Promise<Array>}
 */
export async function listApps() {
  const resp = await fusiooGet("/apps");
  return resp?.data ?? [];
}

/**
 * Returns the full schema of a single Fusioo app, including all field
 * definitions. Useful for discovering column names.
 *
 * @param {string} appId  e.g. "i037d30cf902f409f81339ce75c1fa930"
 * @returns {Promise<object>}  The app object with a fields[] array
 */
export async function getAppSchema(appId) {
  const resp = await fusiooGet(`/apps/${appId}`);
  return resp?.data ?? null;
}

// ─────────────────────────────────────────────────────────────────────────────
// RECORD OPERATIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fetches a single record by its Fusioo record ID.
 *
 * Uses in-memory cache — repeated calls for the same ID are instant.
 * Retries up to 3 times on 429 with staggered backoff to handle rate limits
 * from concurrent linked-record fetches.
 *
 * @param {string} recordId  e.g. "i563dc5a6d467470496d28a0d9f062a52"
 * @returns {Promise<object|null>}  The record data, or null if not found
 */
export async function getRecord(recordId) {
  if (!recordId) return null;

  // Return from cache if already fetched in this browser session
  if (_cache.has(recordId)) return _cache.get(recordId);

  const MAX_ATTEMPTS = 3;
  let lastErr;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const resp   = await fusiooGet(`/records/${recordId}`);
      const record = resp?.data ?? null;
      _cache.set(recordId, record);
      return record;
    } catch (err) {
      if (err instanceof FusiooError && err.code === "NOT_FOUND") {
        _cache.set(recordId, null); // cache the miss so we don't retry
        return null;
      }
      if (err instanceof FusiooError && err.code === "RATE_LIMITED" && attempt < MAX_ATTEMPTS) {
        // Stagger retries with jitter so concurrent fetches don't all retry together
        const delay = 1200 * attempt + Math.floor(Math.random() * 600);
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }
      lastErr = err;
      break;
    }
  }

  throw lastErr;
}

/**
 * Lists records from a specific Fusioo app.
 *
 * @param {string} appId      The app to query
 * @param {object} options    Optional: { per_page, page, sort, filter }
 * @returns {Promise<Array>}  Array of record objects
 */
export async function listRecords(appId, options = {}) {
  const params = {};
  if (options.per_page) params.per_page = options.per_page;
  if (options.page)     params.page     = options.page;
  if (options.sort)     params.sort     = options.sort;

  const resp    = await fusiooGet(`/apps/${appId}/records`, params);
  const records = resp?.data ?? resp?.records ?? [];
  return records;
}

/**
 * Searches records in a Fusioo app by a text query.
 *
 * Note: Fusioo's search matches across all text fields in the app.
 * For field-specific filtering, use listRecords() with a filter parameter.
 *
 * @param {string} appId   The app to search
 * @param {string} query   The search text
 * @param {number} limit   Max results to return (default 10)
 * @returns {Promise<Array>}
 */
export async function searchRecords(appId, query, limit = 10) {
  const resp    = await fusiooGet(`/apps/${appId}/records`, { search: query, per_page: limit });
  const records = resp?.data ?? resp?.records ?? [];
  return records;
}

// ─────────────────────────────────────────────────────────────────────────────
// UTILITY
// ─────────────────────────────────────────────────────────────────────────────

/** Returns true if a string looks like a Fusioo record ID ("i" + 32 hex chars) */
export const isFusiooId = (v) =>
  typeof v === "string" && /^i[0-9a-f]{32}$/i.test(v);

/** Clears the in-memory record cache (useful in tests or after updates) */
export function clearCache() {
  _cache.clear();
}
