/**
 * Da Nang package variant registry.
 * Used by DestinationPreview to show the correct briefing based on
 * the client's booking (Way 1: GDX auto-select) or their manual choice
 * (Way 2: package selector buttons).
 */

import { danangBriefing }     from "./danang.js";
import { danang6d4nBriefing } from "./danang-6d4n.js";

export const DANANG_PACKAGES = [
  {
    key: "5d3n",
    shortLabel: "5D3N",
    description: "5 Days · 3 Nights",
    briefing: danangBriefing,
    matchKeywords: ["5d3n", "5d4n", "uov15b2", "gdx-uov"],
  },
  {
    key: "6d4n",
    shortLabel: "6D4N",
    description: "6 Days · 4 Nights",
    briefing: danang6d4nBriefing,
    matchKeywords: ["6d4n", "6d5n"],
  },
];

/**
 * Returns the Da Nang package variant that best matches the given booking.
 * Falls back to the first package (5D3N) if no match is found.
 */
export function getDanangPackageByBooking(booking) {
  if (!booking) return DANANG_PACKAGES[0];

  const haystack = [
    booking.packageCode,
    booking.type_of_package,
    booking.package_name,
    booking.tour_code,
    booking.gdx,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  for (const pkg of DANANG_PACKAGES) {
    if (pkg.matchKeywords.some((k) => haystack.includes(k))) return pkg;
  }

  return DANANG_PACKAGES[0];
}
