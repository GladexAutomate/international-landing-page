// @ts-nocheck
/**
 * Auto-discovered destination guide images.
 * Powered by the briefingImagesPlugin Vite plugin (scripts/vite-plugin-briefing-images.js).
 *
 * Usage:
 *   getDestinationImage("danang-vietnam", "places", "Golden Bridge (Cầu Vàng)")
 *   // → "/images/destinations/danang/places/golden-bridge.jpg"  (if file exists)
 *   // → null  (if no matching image found — show placeholder/icon instead)
 *
 * Folder convention:
 *   "places"      → public/images/destinations/<folder>/places/
 *   "food"        → public/images/destinations/<folder>/food/
 *   "photo-spots" → public/images/destinations/<folder>/photo-spots/
 *
 * Naming convention for images:
 *   Slugify the item name and use it as the filename.
 *   "Golden Bridge (Cầu Vàng)" → golden-bridge.jpg
 *   "Hội An Ancient Town"       → hoi-an.jpg  OR  hoi-an-ancient-town.jpg  (both match)
 *   "Fresh Seafood"             → seafood.jpg  OR  fresh-seafood.jpg  (both match)
 */
import { destinationImages } from "virtual:briefing-images";

// Maps URL slugs to their image folder names when the two differ.
// Slugs that ARE the folder name (e.g. "hongkong") need no entry here.
const SLUG_TO_FOLDER = {
  "danang-vietnam":   "danang",
  "danang-private":   "danang",
  "hongkong-private": "hongkong",
};

/**
 * Converts an item display name to a filename-compatible slug.
 * Strips parentheticals, removes diacritics, lowercases, hyphenates.
 */
function slugify(str) {
  return (str || "")
    .replace(/\(.*?\)/g, "")           // strip "(Cầu Vàng)" etc.
    .replace(/[đĐ]/g, "d")             // Vietnamese Đ is not decomposed by NFD
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")   // strip combining accent marks
    .replace(/[^\w\s-]/g, " ")         // punctuation/symbols → space
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Finds the first image in `images` whose basename (without extension)
 * matches the slugified form of `itemName`.
 *
 * Matching priority:
 *   1. Exact match:         file "golden-bridge"   === slug "golden-bridge"
 *   2. File is a prefix:    slug "hoi-an-ancient-town" starts with file "hoi-an-"
 *   3. File is a suffix:    slug "fresh-seafood"   ends with "-seafood"
 *   4. File is a superset:  file "golden-bridge-photo" starts with slug "golden-bridge-"
 */
function findImageByName(images, itemName) {
  const slug = slugify(itemName);
  if (!slug || !images || !images.length) return null;

  for (const imgPath of images) {
    const file = imgPath.replace(/\.[^/.]+$/, "").split("/").pop();
    if (file === slug)               return imgPath; // 1. exact
    if (slug.startsWith(file + "-")) return imgPath; // 2. file is a leading prefix
    if (slug.endsWith("-" + file))   return imgPath; // 3. file is a trailing suffix
    if (file.startsWith(slug + "-")) return imgPath; // 4. file is a longer form
  }

  return null;
}

/**
 * Returns the auto-discovered image path for a destination guide item,
 * or null when no matching image is found in the scanned folder.
 *
 * @param {string} slug      - destination URL slug (e.g. "danang-vietnam")
 * @param {string} section   - sub-folder: "places" | "food" | "photo-spots"
 * @param {string} itemName  - item display name (e.g. "Golden Bridge (Cầu Vàng)")
 * @returns {string|null}
 */
export function getDestinationImage(slug, section, itemName) {
  const folder = SLUG_TO_FOLDER[slug] ?? slug;
  const images = (destinationImages && destinationImages[folder] && destinationImages[folder][section]) || [];
  return findImageByName(images, itemName);
}

/**
 * Returns all scanned image paths for a given destination + section.
 *
 * @param {string} slug
 * @param {string} section
 * @returns {string[]}
 */
export function getDestinationSectionImages(slug, section) {
  const folder = SLUG_TO_FOLDER[slug] ?? slug;
  return (destinationImages && destinationImages[folder] && destinationImages[folder][section]) || [];
}
