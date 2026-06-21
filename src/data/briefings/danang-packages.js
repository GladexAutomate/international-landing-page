/**
 * Da Nang package variant registry.
 * Used by DestinationPreview to show the correct briefing based on
 * the client's booking (Way 1: GDX auto-select) or their manual choice
 * (Way 2: package selector buttons).
 *
 * matchKeywords rules:
 *   - A string item: matches if haystack contains that substring.
 *   - An array item: matches if haystack contains ALL substrings in the array (AND logic).
 *   First package whose keyword matches wins — order matters.
 *
 * The haystack is built from: packageName (collective_package_name),
 * packageType (type_of_package), and collective_package_name directly.
 */

import { danang6d4nVietjetBriefing }         from "./danang-6d4n-vietjet.js";
import { danang5d3nVietjetBriefing }         from "./danang-5d3n-vietjet.js";
import { danang4d2nBambooBriefing }          from "./danang-4d2n-bamboo.js";
import { danang4d3nAirAsiaBriefing }         from "./danang-4d3n-airasia.js";
import { danang4d3nCebuPacificBriefing }     from "./danang-4d3n-cebu-pacific.js";
import { danang5d3nBambooBriefing }          from "./danang-5d3n-bamboo.js";
import { danang6d4nVietjetStandardBriefing } from "./danang-6d4n-vietjet-standard.js";

export const DANANG_PACKAGES = [
  {
    key: "6d4n-vietjet",
    shortLabel: "6D4N",
    description: "VietJet · Ba Na Hills Overnight",
    briefing: danang6d4nVietjetBriefing,
    // Must contain BOTH duration+vietjet AND overnight/bana indicator
    matchKeywords: [
      ["6d4n", "vietjet", "overnight"],
      ["6d4n", "vietjet", "bana"],
      ["6d4n", "vj", "overnight"],
      "6d4n-vj-bnh",
      "6d4n-vj-overnight",
    ],
  },
  {
    key: "5d3n-vietjet",
    shortLabel: "5D3N",
    description: "VietJet · Ba Na Hills Overnight",
    briefing: danang5d3nVietjetBriefing,
    matchKeywords: [
      ["5d3n", "vietjet", "overnight"],
      ["5d3n", "vietjet", "bana"],
      ["5d3n", "vj", "overnight"],
      "5d3n-vj-bnh",
      "5d3n-vj-overnight",
    ],
  },
  {
    key: "4d2n-bamboo",
    shortLabel: "4D2N",
    description: "Bamboo Airways",
    briefing: danang4d2nBambooBriefing,
    // Only 4D2N package exists, so matching "4d2n" alone is safe
    matchKeywords: [
      "4d2n",
      ["bamboo", "4d2n"],
      "gdx-danqh-4d2n",
    ],
  },
  {
    key: "4d3n-airasia",
    shortLabel: "4D3N",
    description: "AirAsia",
    briefing: danang4d3nAirAsiaBriefing,
    matchKeywords: [
      "airasia",
      "air asia",
      ["4d3n", "airasia"],
      "gdx-danaa",
    ],
  },
  {
    key: "4d3n-cebu-pacific",
    shortLabel: "4D3N",
    description: "Cebu Pacific",
    briefing: danang4d3nCebuPacificBriefing,
    // Use "cebu pacific" phrase since "cebu" alone could match HK+Macau via Cebu Pacific
    matchKeywords: [
      "cebu pacific",
      ["4d3n", "cebu"],
      "gdx-dan5j",
    ],
  },
  {
    key: "5d3n-bamboo",
    shortLabel: "5D3N",
    description: "Bamboo Airways",
    briefing: danang5d3nBambooBriefing,
    matchKeywords: [
      ["5d3n", "bamboo"],
      "5d3n-qh",
      "gdx-danqh-5d3n",
    ],
  },
  {
    key: "6d4n-vietjet-std",
    shortLabel: "6D4N",
    description: "VietJet",
    briefing: danang6d4nVietjetStandardBriefing,
    // Catches 6D4N VietJet that are NOT overnight (overnight entries come first above)
    matchKeywords: [
      ["6d4n", "vietjet"],
      ["6d4n", "vj"],
      "gdx-danvj-6d4n",
    ],
  },
];

/**
 * Converts Fusioo duration string to shorthand, e.g. "4 Days & 3" → "4d3n".
 * Handles formats like "4 Days & 3", "4 Days & 3 Nights", "4D3N".
 */
function normalizeDuration(dur) {
  if (!dur) return null;
  const m = String(dur).match(/(\d+)\s*d(?:ays?)?\s*[&,]\s*(\d+)/i);
  if (m) return `${m[1]}d${m[2]}n`;
  return null;
}

export function getDanangPackageByBooking(booking) {
  if (!booking) return DANANG_PACKAGES[0];

  const haystack = [
    booking.packageName,             // enriched from collective_package_name
    booking.collective_package_name, // raw Fusioo field
    booking.packageType,             // enriched from type_of_package
    booking.type_of_package,         // raw Fusioo field
    booking.airlineName,             // resolved airline (e.g. "VietJet Air", "Bamboo Airways")
    booking.duration,                // Fusioo duration field (e.g. "5 Days & 3")
    normalizeDuration(booking.duration), // normalized to shorthand (e.g. "5d3n")
    booking.gdx,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  for (const pkg of DANANG_PACKAGES) {
    const matched = pkg.matchKeywords.some((keyword) => {
      if (Array.isArray(keyword)) return keyword.every((k) => haystack.includes(k));
      return haystack.includes(keyword);
    });
    if (matched) return pkg;
  }

  return DANANG_PACKAGES[0];
}
