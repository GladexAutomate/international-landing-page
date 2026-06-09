// @ts-nocheck
/**
 * Auto-generated image paths from public/images/briefings/<folder>/day<N>/
 * Powered by the briefingImagesPlugin Vite plugin (scripts/vite-plugin-briefing-images.js).
 *
 * Usage:
 *   getBriefingDayImages("danang-vietnam", 1)
 *   // → ["/images/briefings/danang/day1/photo1.jpg", ...]
 */
import { briefingImages } from "virtual:briefing-images";

/**
 * Maps destination slugs (from the URL / briefing registry) to the folder
 * name used under public/images/briefings/.
 *
 * Only add an entry here when the slug differs from the folder name.
 * If they match (e.g. slug "hongkong" and folder "hongkong") no entry is needed.
 */
const SLUG_TO_FOLDER = {
  "danang-vietnam":         "danang",
  "hongkong":               "hongkong",
  "jeju-korea":             "jeju-korea",
  "bali-wisataku":          "bali-wisataku",
  "maldives-maafushi":      "maldives-maafushi",
  "vietnam-phu-quoc":       "vietnam-phu-quoc",
  "malaysia-kota-kinabalu": "malaysia-kota-kinabalu",
  "vietnam-hanoi":          "vietnam-hanoi",
  "kuala-lumpur":           "kuala-lumpur",
  "bangkok-pattaya":        "bangkok-pattaya",
  "beijing-shanghai":       "beijing-shanghai",
  "new-zealand":            "new-zealand",
  "tri-city":               "tri-city",
  "twin-city":              "twin-city",
};

/**
 * Returns all image URL paths for a given destination slug and day number.
 * Resolves the slug to a folder name via SLUG_TO_FOLDER, then falls back
 * to using the slug directly if no mapping exists.
 *
 * @param {string} slug - destination slug from the URL / briefing registry
 * @param {number} day  - the day number (1, 2, 3, …)
 * @returns {string[]}
 */
export function getBriefingDayImages(slug, day) {
  if (!slug || !day) return [];
  const folder = SLUG_TO_FOLDER[slug] ?? slug;
  return briefingImages[folder]?.[day] ?? [];
}
