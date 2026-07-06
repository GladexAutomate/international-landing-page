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
  // ── International (resolve to READY_SLUGS) ──────────────────────────────────
  "i563dc5a6d467470496d28a0d9f062a52": "hongkong",           // Hong Kong
  "i2275fb23823144ca8eeaa95a50741968": "beijing",            // Shanghai, China
  "i7d544023422e4f4baf30d2dbe7bfac56": "beijing",            // Beijing, China
  "i8a5a12c6eb95442584686b5888a362eb": "beijing",            // China (generic)
  "icfaa00526aa8488db46974508645aada": "beijing",            // Beijing + Shanghai
  "ice6368bb3dad4b0591f8a1d50085d9d6": "danang-vietnam",     // Da Nang, Vietnam
  "ide1eb009d1d54d79a2353c9cf4f12841": "singapore",          // Singapore
  "if4f72d7ffde3489c9174e3f64c16c694": "taipei",             // Taipei, Taiwan
  "i7fcd28d6b1a64033bd5fbc90f55b2fe8": "vietnam-hanoi",      // Hanoi, Vietnam
  // ── International (not yet in READY_SLUGS) ──────────────────────────────────
  "ie9eb5d4727a44c3c939cd7077d7991f6": "bangkok",            // Bangkok, Thailand
  "ie9f73a9029334eaaab329d8b1c2e3ceb": null,                 // Ho Chi Minh (no slug yet)
  "ic82be40b623a44d8bd7c8a32b4fd7902": "new-zealand",        // New Zealand
  "i873d5ac486154db7a22dfb57775f7878": "japan",              // Japan
  "i1645e108d52045d98fb84032c8be59d2": null,                 // Kazakhstan (no slug)
  "i01415d1730824e6fa3f01e116549b2b7": null,                 // Pakistan (no slug)
  // ── Domestic Philippines ─────────────────────────────────────────────────────
  "i06973524aa974848a37007b3a1ceb0db": null,                 // Manila
  "i389b88123aa34be1937d64d4df6eca42": null,                 // Ilocos
  "i4e87aba541a94b98b8fead98d0c809a8": null,                 // Boracay via CATICLAN
  "i63798db52a7f44f187ef6f9828c3a57a": null,                 // Bohol
  "i67f5adf04bfc41d78c3102ed8226d317": null,                 // Boracay via KALIBO
  "i900e3e3215704c05b629832e1b624a2c": null,                 // El Nido
  "ia234508bd6d24726adb9e82a1337c85e": null,                 // Cebu
  "ib027fb1de5de4c39b5ecc4e1905e65c2": null,                 // Tacloban
  "ib515f233f6d8407796c3e21c2557d5ae": null,                 // Puerto Princesa
  "ie2040a0a36634bd88e89df6d5fb63f90": null,                 // Coron
  "ifd846ca66a964189ae2a32bc4c17bba7": null,                 // Cauayan
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
  { slug: "danang-vietnam",         keywords: ["danang private", "da nang private", "private danang", "da nang", "danang", "da-nang", "hoi an", "vietnam central"] },
  { slug: "vietnam-hanoi",          keywords: ["hanoi", "ha noi"] },
  { slug: "vietnam-phu-quoc",       keywords: ["phu quoc", "phuquoc", "phú quốc"] },

  // ── China / Hong Kong / Macau ───────────────────────────────────────────────
  { slug: "hongkong-shenzhen-zhuhai", keywords: ["hk shenzhen zhuhai", "hongkong shenzhen zhuhai", "hong kong shenzhen zhuhai", "shenzhen zhuhai", "4d3n shenzhen", "cebu pacific shenzhen", "hk szx zhuhai"] },
  { slug: "hongkong",               keywords: ["hongkong private", "hong kong private", "private hongkong", "hong kong", "hongkong", "hk ", "h.k.", "hong-kong"] },
  { slug: "macau",                  keywords: ["macau", "macao"] },
  // All Beijing / Shanghai packages resolve to "beijing" — the landing page
  // auto-detects the specific variant (6D5N BJ PAL, B+SH PAL, Cebu Pacific, Private)
  // from the booking's GDX/package/airline fields via getBeijingPackageByBooking().
  { slug: "beijing", keywords: [
    "6d5n beijing", "beijing 6d5n", "beijing pal", "pal beijing",
    "beijing philippine airlines", "philippine airlines beijing",
    "shanghai pal", "pal shanghai", "philippine airlines shanghai", "shanghai philippine airlines",
    "shanghai cebu pacific", "cebu pacific shanghai", "6d4n shanghai", "shanghai 6d4n", "shanghai ceb",
    "shanghai mini kyoto", "mini kyoto", "shenzhen airlines shanghai", "shanghai shenzhen",
    "5d4n shanghai", "shanghai private", "beijing shanghai private", "beijing private", "shanghai collective",
    "beijing", "shanghai", "china tour", "beijing shanghai",
    " china",
  ]},

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
  if (destId && destId in FUSIOO_ID_MAP) {
    const mapped = FUSIOO_ID_MAP[destId];
    if (mapped) console.log("[GDX Resolver] Matched via FUSIOO_ID_MAP:", mapped);
    return mapped; // null for known domestic/unslug'd destinations
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
