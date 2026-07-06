/**
 * Beijing package variant registry.
 * Used by DestinationPreview to show the correct briefing based on
 * the client's booking (auto-detect from GDX) or their manual choice
 * (package selector buttons).
 *
 * matchKeywords rules:
 *   - A string item: matches if haystack contains that substring.
 *   - An array item: matches if haystack contains ALL substrings (AND logic).
 *   First package whose keyword matches wins — order matters.
 *
 * Haystack is built from: packageName, collective_package_name,
 * packageType, type_of_package, airlineName, duration, normalized duration, gdx.
 */

import { beijing6d5nPalBriefing }              from "./beijing-6d5n-pal.js";
import { beijingShanghaiPalBriefing }          from "./beijing-shanghai-pal.js";
import { beijingShanghaiCebuPacificBriefing }  from "./beijing-shanghai-cebu-pacific.js";
import { beijingShanghaiPrivateBriefing }      from "./beijing-shanghai-private.js";

export const BEIJING_PACKAGES = [
  {
    key: "6d5n-beijing-pal",
    shortLabel: "6D5N",
    description: "Beijing · PAL",
    briefing: beijing6d5nPalBriefing,
    // 6D5N Beijing-only via Philippine Airlines — match before the B+SH entries
    matchKeywords: [
      ["6d5n", "pal"],
      ["6d5n", "philippine airlines"],
      ["6d5n", "beijing"],
      "6d5n-bj-pal",
      "gdx-bj-6d5n",
    ],
  },
  {
    key: "bj-sh-pal",
    shortLabel: "6D5N",
    description: "B+Shanghai · PAL",
    briefing: beijingShanghaiPalBriefing,
    matchKeywords: [
      "shanghai pal",
      "pal shanghai",
      ["shanghai", "philippine airlines"],
      ["shanghai", "pal"],
    ],
  },
  {
    key: "bj-sh-cebu-pacific",
    shortLabel: "6D4N",
    description: "B+Shanghai · Cebu Pacific",
    briefing: beijingShanghaiCebuPacificBriefing,
    matchKeywords: [
      "shanghai cebu pacific",
      "cebu pacific shanghai",
      ["shanghai", "cebu pacific"],
      ["shanghai", "cebu"],
      "6d4n shanghai",
      "shanghai 6d4n",
      "shanghai ceb",
    ],
  },
  {
    key: "bj-sh-collective",
    shortLabel: "5D4N",
    description: "B+Shanghai · Private",
    briefing: beijingShanghaiPrivateBriefing,
    matchKeywords: [
      "mini kyoto",
      "shenzhen airlines shanghai",
      "shanghai shenzhen",
      "5d4n shanghai",
      "shanghai private",
      "beijing shanghai private",
      "beijing private",
      "shanghai collective",
      "shanghai mini kyoto",
    ],
  },
];

/**
 * Converts Fusioo duration string to shorthand, e.g. "6 Days & 5" → "6d5n".
 */
function normalizeDuration(dur) {
  if (!dur) return null;
  const m = String(dur).match(/(\d+)\s*d(?:ays?)?\s*[&,]\s*(\d+)/i);
  if (m) return `${m[1]}d${m[2]}n`;
  return null;
}

export function getBeijingPackageByBooking(booking) {
  if (!booking) return BEIJING_PACKAGES[0];

  const haystack = [
    booking.packageName,
    booking.collective_package_name,
    booking.packageType,
    booking.type_of_package,
    booking.airlineName,
    booking.duration,
    normalizeDuration(booking.duration),
    booking.gdx,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  for (const pkg of BEIJING_PACKAGES) {
    const matched = pkg.matchKeywords.some((keyword) => {
      if (Array.isArray(keyword)) return keyword.every((k) => haystack.includes(k));
      return haystack.includes(keyword);
    });
    if (matched) return pkg;
  }

  return BEIJING_PACKAGES[0];
}
