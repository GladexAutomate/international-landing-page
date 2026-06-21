/**
 * Hong Kong package variant registry.
 * Used by DestinationPreview to show the correct briefing based on
 * the client's booking (auto-select) or their manual choice (package selector buttons).
 *
 * matchKeywords rules:
 *   - A string item: matches if haystack contains that substring.
 *   - An array item: matches if haystack contains ALL substrings in the array (AND logic).
 *   First package whose keyword matches wins — order matters.
 *
 * The haystack is built from: packageName (collective_package_name),
 * packageType (type_of_package), and collective_package_name directly.
 */

import { hongkongCebuPacificBriefing } from "./hongkong-cebu-pacific.js";

// Only airline/private packages live here.
// The SAR/charter package is the base briefing on the hongkong slug (no selector).
export const HONGKONG_PACKAGES = [
  {
    key: "4d3n-macau-cp",
    shortLabel: "4D3N",
    description: "HK + Macau · Cebu Pacific",
    briefing: hongkongCebuPacificBriefing,
    matchKeywords: [
      "macau",
      "hkmac",
      "hk macau",
      "hongkong macau",
      ["hongkong", "cebu pacific"],
      ["hong kong", "cebu pacific"],
      "5j-hk",
    ],
  },
];

/**
 * Returns the Hong Kong package that best matches the given booking.
 * Falls back to the standard HK SAR package if no match is found.
 *
 * Supports two keyword types:
 *   - string: haystack must contain this substring
 *   - string[]: haystack must contain ALL substrings (AND logic)
 */
/**
 * Converts Fusioo duration string to shorthand, e.g. "5 Days & 4" → "5d4n".
 */
function normalizeDuration(dur) {
  if (!dur) return null;
  const m = String(dur).match(/(\d+)\s*d(?:ays?)?\s*[&,]\s*(\d+)/i);
  if (m) return `${m[1]}d${m[2]}n`;
  return null;
}

export function getHongkongPackageByBooking(booking) {
  if (!booking) return HONGKONG_PACKAGES[0];

  const haystack = [
    booking.packageName,             // enriched from collective_package_name
    booking.collective_package_name, // raw Fusioo field
    booking.packageType,             // enriched from type_of_package
    booking.type_of_package,         // raw Fusioo field
    booking.airlineName,             // resolved airline (e.g. "Cebu Pacific")
    booking.duration,                // Fusioo duration field (e.g. "5 Days & 4")
    normalizeDuration(booking.duration), // normalized shorthand (e.g. "5d4n")
    booking.gdx,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  for (const pkg of HONGKONG_PACKAGES) {
    const matched = pkg.matchKeywords.some((keyword) => {
      if (Array.isArray(keyword)) return keyword.every((k) => haystack.includes(k));
      return haystack.includes(keyword);
    });
    if (matched) return pkg;
  }

  return HONGKONG_PACKAGES[0]; // fallback: first airline package
}
