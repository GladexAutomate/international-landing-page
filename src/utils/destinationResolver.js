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
//
// ORDERING RULES:
//   • More-specific slugs MUST come before broader ones that share a keyword.
//     e.g. "bangkok-pattaya" before "bangkok" — otherwise "Bangkok Pattaya"
//          would match "bangkok" first and route to the wrong page.
//   • Same rule for bali-wisataku before bali, maldives-maafushi before maldives,
//     jeju-korea before korea.
const KEYWORD_MAP = [
  // ── Vietnam ────────────────────────────────────────────────────────────────
  { slug: "danang-vietnam",         keywords: ["da nang", "danang", "da-nang", "hoi an", "vietnam central"] },
  { slug: "vietnam-hanoi",          keywords: ["hanoi", "ha noi"] },
  { slug: "vietnam-phu-quoc",       keywords: ["phu quoc", "phuquoc", "phú quốc"] },

  // ── China / Hong Kong / Macau ───────────────────────────────────────────────
  { slug: "hongkong",               keywords: ["hong kong", "hongkong", "hk ", "h.k.", "hong-kong"] },
  { slug: "macau",                  keywords: ["macau", "macao"] },
  { slug: "beijing-shanghai",       keywords: ["beijing", "shanghai", "china tour", "beijing shanghai"] },

  // ── Korea ──────────────────────────────────────────────────────────────────
  { slug: "jeju-korea",             keywords: ["jeju"] },            // specific first
  { slug: "korea",                  keywords: ["korea", "seoul", "nami island", "k-pop", "south korea"] },

  // ── Japan ──────────────────────────────────────────────────────────────────
  { slug: "japan",                  keywords: ["japan", "osaka", "tokyo", "nara", "kyoto"] },

  // ── Thailand — specific combos before plain Bangkok ────────────────────────
  { slug: "bangkok-pattaya",        keywords: ["pattaya", "bangkok pattaya", "bangkok & pattaya", "bkk pattaya", "bangkok+pattaya"] },
  { slug: "chiangmai",              keywords: ["chiang mai", "chiangmai", "chiang-mai"] },
  { slug: "phuket",                 keywords: ["phuket"] },
  { slug: "bangkok",                keywords: ["bangkok", "bkk"] }, // broad — must come after bangkok-pattaya & chiangmai

  // ── Southeast Asia ─────────────────────────────────────────────────────────
  { slug: "singapore",              keywords: ["singapore"] },
  { slug: "bali-wisataku",          keywords: ["bali wisataku", "wisataku"] }, // specific first
  { slug: "bali",                   keywords: ["bali"] },
  { slug: "malaysia-kota-kinabalu", keywords: ["kota kinabalu", "kinabalu", "sabah", "kota kina"] },
  { slug: "kuala-lumpur",           keywords: ["kuala lumpur", " kl ", "malaysia kl", "kl tour", "k.l."] },
  { slug: "cambodia",               keywords: ["cambodia", "siem reap", "angkor"] },
  { slug: "indochina",              keywords: ["indochina"] },

  // ── Middle East ────────────────────────────────────────────────────────────
  { slug: "dubai",                  keywords: ["dubai", "uae"] },

  // ── Oceania ────────────────────────────────────────────────────────────────
  { slug: "new-zealand",            keywords: ["new zealand", "auckland", "nz "] },

  // ── Indian Ocean ───────────────────────────────────────────────────────────
  { slug: "maldives-maafushi",      keywords: ["maafushi"] },        // specific first
  { slug: "maldives",               keywords: ["maldives"] },

  // ── Taiwan ─────────────────────────────────────────────────────────────────
  { slug: "taipei",                 keywords: ["taipei", "taiwan"] },

  // ── Multi-destination packages ─────────────────────────────────────────────
  { slug: "tri-city",               keywords: ["tri city", "tri-city", "3 city", "tricity"] },
  { slug: "twin-city",              keywords: ["twin city", "twin-city", "2 city", "twincity"] },
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

  // ── Strategy 0: resolved destinationName from Fusioo (most reliable) ─────
  // getFullBookingFromFusioo sets this to the human-readable text, e.g. "Hong Kong"
  const fromDestName = matchKeywords(booking.destinationName);
  if (fromDestName) {
    console.log("[GDX Resolver] Matched via destinationName:", booking.destinationName, "→", fromDestName);
    return fromDestName;
  }

  // ── Strategy 1: direct Fusioo ID lookup ──────────────────────────────────
  // Works when booking.destination is a plain string ID (not an array)
  const destId = Array.isArray(booking.destination)
    ? booking.destination[0]
    : booking.destination;
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

  // ── Strategy 5: tourName from resolved Fusioo tour record ────────────────
  const fromTourName = matchKeywords(booking.tourName);
  if (fromTourName) {
    console.log("[GDX Resolver] Matched via tourName:", booking.tourName, "→", fromTourName);
    return fromTourName;
  }

  // ── Strategy 6: raw tour_details text (legacy Supabase field) ────────────
  const fromTour = matchKeywords(
    typeof booking.tour_details === "string" ? booking.tour_details : null
  );
  if (fromTour) {
    console.log("[GDX Resolver] Matched via tour_details:", fromTour);
    return fromTour;
  }

  console.warn("[GDX Resolver] Could not resolve destination for booking:", booking.gdx);
  return null;
}
