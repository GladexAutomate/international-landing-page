/**
 * DESTINATION RESOLVER
 * ─────────────────────────────────────────────────────────────────────────────
 * Maps booking data returned from bookings_6fbdd6b2 to a destination slug
 * that matches the existing routes in App.jsx ( /destination/:slug ).
 *
 * Strategy (tried in order):
 *  1. Direct Fusioo ID lookup  (FUSIOO_ID_MAP — populate after schema audit)
 *  2. domestic_voucher_ destination text field  (keyword match)
 *  3. data.destination.value text  (Fusioo embedded display value)
 *  4. type_of_package text  (keyword match)
 *  5. Returns null → caller should show "destination not found" state
 */

// ─── 1. FUSIOO ID → SLUG MAP ─────────────────────────────────────────────────
// Populate these entries once the schema audit identifies the actual IDs.
// Key   = value stored in bookings_6fbdd6b2.destination (the Fusioo record ID)
// Value = destination slug used in /destination/:slug route
const FUSIOO_ID_MAP = {
  // Examples — fill in after running the schema audit:
  // "i563dc5a6d467470496d28a0d9f062a52": "danang-vietnam",
  // "iXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX": "hongkong",
};

// ─── 2. KEYWORD → SLUG MAP ───────────────────────────────────────────────────
// Used for text-based fields (domestic_voucher_ destination, data.destination.value).
// Each entry: { slug, keywords[] }  —  keywords are checked case-insensitively.
const KEYWORD_MAP = [
  { slug: "danang-vietnam",         keywords: ["da nang", "danang", "da-nang", "hoi an", "vietnam central"] },
  { slug: "hongkong",               keywords: ["hong kong", "hongkong", "hk ", "h.k."] },
  { slug: "korea",                  keywords: ["korea", "seoul", "nami island", "k-pop"] },
  { slug: "jeju-korea",             keywords: ["jeju"] },
  { slug: "japan",                  keywords: ["japan", "osaka", "tokyo", "nara", "kyoto"] },
  { slug: "bangkok",                keywords: ["bangkok free", "bangkok f&e", "bangkok fne"] },
  { slug: "bangkok-pattaya",        keywords: ["pattaya", "bangkok pattaya"] },
  { slug: "singapore",              keywords: ["singapore"] },
  { slug: "bali-wisataku",          keywords: ["bali wisataku", "wisataku"] },
  { slug: "bali",                   keywords: ["bali"] },
  { slug: "beijing-shanghai",       keywords: ["beijing", "shanghai", "china"] },
  { slug: "chiangmai",              keywords: ["chiang mai", "chiangmai"] },
  { slug: "dubai",                  keywords: ["dubai", "uae"] },
  { slug: "malaysia-kota-kinabalu", keywords: ["kota kinabalu", "kinabalu", "sabah"] },
  { slug: "maldives-maafushi",      keywords: ["maafushi"] },
  { slug: "maldives",               keywords: ["maldives"] },
  { slug: "macau",                  keywords: ["macau", "macao"] },
  { slug: "new-zealand",            keywords: ["new zealand"] },
  { slug: "taipei",                 keywords: ["taipei", "taiwan"] },
  { slug: "phuket",                 keywords: ["phuket"] },
  { slug: "vietnam-hanoi",          keywords: ["hanoi"] },
  { slug: "vietnam-phu-quoc",       keywords: ["phu quoc", "phuquoc"] },
  { slug: "kuala-lumpur",           keywords: ["kuala lumpur", " kl ", "malaysia kl", "kl tour"] },
  { slug: "tri-city",               keywords: ["tri city", "tri-city", "3 city"] },
  { slug: "twin-city",              keywords: ["twin city", "twin-city", "2 city"] },
  { slug: "indochina",              keywords: ["indochina"] },
  { slug: "cambodia",               keywords: ["cambodia", "siem reap", "angkor"] },
];

/** @param {string} text */
function matchKeywords(text) {
  if (!text || typeof text !== "string") return null;
  const lower = ` ${text.toLowerCase()} `;
  for (const entry of KEYWORD_MAP) {
    for (const kw of entry.keywords) {
      if (lower.includes(kw.toLowerCase())) return entry.slug;
    }
  }
  return null;
}

/**
 * Resolves a booking record from bookings_6fbdd6b2 to a destination slug.
 *
 * @param {Record<string, any>} booking  — full row from bookings_6fbdd6b2
 * @returns {string|null}  destination slug (e.g. "danang-vietnam") or null
 */
export function resolveDestinationSlug(booking) {
  if (!booking) return null;

  // ── Strategy 1: direct Fusioo ID lookup ──────────────────────────────────
  const destId = booking.destination;
  if (destId && FUSIOO_ID_MAP[destId]) {
    console.log("[GDX Resolver] Matched via FUSIOO_ID_MAP:", FUSIOO_ID_MAP[destId]);
    return FUSIOO_ID_MAP[destId];
  }

  // ── Strategy 2: domestic_voucher_ destination text field ─────────────────
  // Note: Fusioo column name has a trailing space — access via bracket notation
  const voucherDest = booking["domestic_voucher_ destination"] || booking["domestic_voucher_destination"];
  const fromVoucher = matchKeywords(voucherDest);
  if (fromVoucher) {
    console.log("[GDX Resolver] Matched via domestic_voucher_ destination:", fromVoucher);
    return fromVoucher;
  }

  // ── Strategy 3: data.destination embedded display value ──────────────────
  // Fusioo relationship fields are sometimes stored as { id, value } in the data column
  const rawData = booking.data;
  if (rawData) {
    const embeddedDest =
      (typeof rawData.destination === "object" && rawData.destination?.value) ||
      (Array.isArray(rawData.destination) && rawData.destination[0]?.value) ||
      (typeof rawData.destination === "string" && rawData.destination);

    const fromData = matchKeywords(embeddedDest);
    if (fromData) {
      console.log("[GDX Resolver] Matched via data.destination.value:", fromData);
      return fromData;
    }
  }

  // ── Strategy 4: type_of_package text field ────────────────────────────────
  const fromPackage = matchKeywords(booking.type_of_package);
  if (fromPackage) {
    console.log("[GDX Resolver] Matched via type_of_package:", fromPackage);
    return fromPackage;
  }

  // ── Strategy 5: tour_details text field ──────────────────────────────────
  const fromTour = matchKeywords(booking.tour_details);
  if (fromTour) {
    console.log("[GDX Resolver] Matched via tour_details:", fromTour);
    return fromTour;
  }

  console.warn("[GDX Resolver] Could not resolve destination for booking:", booking.gdx);
  return null;
}
