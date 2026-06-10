/**
 * FUSIOO DOCUMENT SERVICE
 * ─────────────────────────────────────────────────────────────────────────────
 * Resolves Fusioo record IDs that appear in voucher / itinerary fields into
 * directly downloadable file URLs.
 *
 * Since we have not yet observed the exact attachment schema returned by
 * Fusioo voucher records, this service:
 *   1. Fetches the full record and logs it completely for inspection.
 *   2. Searches a broad set of known attachment field patterns.
 *   3. Returns the first valid https:// URL found, or null.
 *
 * Once the actual field names are known from the console logs, update
 * URL_FIELD_PATHS below to prioritise those fields.
 *
 * Endpoint:
 *   GET https://api.fusioo.com/v1/records/{recordId}
 *   Authorization: Bearer {VITE_FUSIOO_TOKEN}
 */

import { fusiooGet } from "./fusiooClient.js";

// ── Document-specific cache (separate from the main record cache) ─────────────
const cache = new Map();

// ── Field paths to search for a downloadable URL, in priority order ──────────
// These are the most common places Fusioo and connected apps store file URLs.
// Add more entries as the actual schema is discovered from the console logs.
const URL_FIELD_PATHS = [
  "file",
  "files",
  "attachment",
  "attachments",
  "document",
  "documents",
  "pdf",
  "pdf_url",
  "file_url",
  "download_url",
  "url",
  "generated_voucher",
  "voucher_pdf",
  "voucher_url",
  "itinerary_pdf",
  "itinerary_url",
  "itinerary_file",
  "travel_document",
  "travel_documents",
  "document_url",
];

// ── Checks whether a value is a valid https URL ───────────────────────────────
function isUrl(v) {
  return typeof v === "string" && (v.startsWith("http://") || v.startsWith("https://"));
}

// ── Recursively searches an object for any URL value ─────────────────────────
function extractUrlFromObject(obj, depth = 0) {
  if (!obj || depth > 4) return null;
  if (isUrl(obj)) return obj;
  if (Array.isArray(obj)) {
    for (const item of obj) {
      const found = extractUrlFromObject(item, depth + 1);
      if (found) return found;
    }
    return null;
  }
  if (typeof obj === "object") {
    // Check priority fields first
    for (const key of URL_FIELD_PATHS) {
      if (obj[key] !== undefined) {
        const found = extractUrlFromObject(obj[key], depth + 1);
        if (found) return found;
      }
    }
    // Then check all remaining fields
    for (const [key, val] of Object.entries(obj)) {
      if (!URL_FIELD_PATHS.includes(key) && isUrl(val)) return val;
    }
  }
  return null;
}

// ── Core fetcher ──────────────────────────────────────────────────────────────
async function fetchDocRecord(recordId) {
  if (!recordId) return null;
  if (cache.has(recordId)) {
    console.log(`[FUSIOO DOCUMENT LOOKUP] Cache hit for ${recordId}`);
    return cache.get(recordId);
  }

  console.log(`[FUSIOO DOCUMENT LOOKUP] Fetching record ${recordId}`);

  try {
    const json   = await fusiooGet(`/records/${recordId}`);
    const record = json?.data ?? null;

    // ── Full record dump ──────────────────────────────────────────────────────
    // Inspect these logs in DevTools to identify the exact attachment field.
    // Do NOT truncate — JSON.stringify gives the full nested structure.
    console.log("[FUSIOO DOCUMENT RECORD]", recordId, record);
    console.log(
      "[FUSIOO DOCUMENT RECORD FULL]",
      JSON.stringify(record, null, 2)
    );
    if (record) {
      console.log(
        "[FUSIOO DOCUMENT RECORD KEYS]",
        "Top-level fields:", Object.keys(record).join(", ")
      );
    }

    cache.set(recordId, record);
    return record;
  } catch (err) {
    console.error(`[FUSIOO DOCUMENT LOOKUP] fetchDocRecord(${recordId}) failed:`, err.message);
    cache.set(recordId, null);
    return null;
  }
}

// ── URL extractor ─────────────────────────────────────────────────────────────
function extractUrl(record) {
  if (!record) return null;

  // 1. Check priority field paths at the root level
  for (const key of URL_FIELD_PATHS) {
    if (record[key] !== undefined) {
      const url = extractUrlFromObject(record[key]);
      if (url) {
        console.log(`[FUSIOO DOCUMENT URL FOUND] Field "${key}" → ${url}`);
        return url;
      }
    }
  }

  // 2. Deep search — check all remaining root-level fields for any URL value
  for (const [key, val] of Object.entries(record)) {
    if (URL_FIELD_PATHS.includes(key)) continue;
    const url = extractUrlFromObject(val);
    if (url) {
      console.log(`[FUSIOO DOCUMENT URL FOUND] Field "${key}" → ${url}`);
      return url;
    }
  }

  console.log("[FUSIOO DOCUMENT URL FOUND] No downloadable URL found in record. Fields present:", Object.keys(record).join(", "));
  return null;
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Resolves a voucher record ID to a downloadable URL.
 *
 * @param {string} recordId  Fusioo record ID from booking.voucher / booking.initial_voucher
 * @returns {Promise<string|null>}  Direct download URL or null
 */
export async function resolveVoucher(recordId) {
  console.log("[VOUCHER RESOLVER START] Resolving record ID:", recordId);
  const record = await fetchDocRecord(recordId);
  const url = extractUrl(record);
  console.log("[VOUCHER RESOLVER RESULT]", url ?? "(no URL found)");
  return url;
}

/**
 * Resolves an itinerary record ID to a downloadable URL.
 *
 * @param {string} recordId  Fusioo record ID from booking.itinerary / booking.travel_itinerary
 * @returns {Promise<string|null>}  Direct download URL or null
 */
export async function resolveItinerary(recordId) {
  console.log("[ITINERARY RESOLVER START] Resolving record ID:", recordId);
  const record = await fetchDocRecord(recordId);
  const url = extractUrl(record);
  console.log("[ITINERARY RESOLVER RESULT]", url ?? "(no URL found)");
  return url;
}

/**
 * Inspects a list of candidate values (IDs or arrays of IDs) from a booking
 * field, picks the first Fusioo record ID, and resolves it.
 *
 * @param {Function} resolveFn  resolveVoucher or resolveItinerary
 * @param {...any}   candidates  raw field values from the booking row
 * @returns {Promise<string|null>}
 */
export async function resolveFirstId(resolveFn, ...candidates) {
  const FUSIOO_ID_RE = /^i[0-9a-f]{32}$/i;

  for (const candidate of candidates) {
    if (!candidate) continue;
    const items = Array.isArray(candidate) ? candidate : [candidate];
    for (const item of items) {
      if (typeof item === "string" && FUSIOO_ID_RE.test(item)) {
        return resolveFn(item);
      }
    }
  }
  return null;
}
