/**
 * Briefing data registry.
 * To add a new destination briefing:
 *   1. Create src/data/briefings/<slug>.js
 *   2. Import and add it to the BRIEFINGS map below.
 *   3. The slug must match the destination slug in destinations.js.
 */

import { danangBriefing } from "./danang.js";
import { hongkongBriefing } from "./hongkong.js";

const BRIEFINGS = {
  "danang-vietnam": danangBriefing,
  "hongkong":       hongkongBriefing,
  // "korea":       koreaBriefing,
  // "japan":       japanBriefing,
  // "singapore":   singaporeBriefing,
  // "bangkok":     bangkokBriefing,
};

/**
 * Returns the briefing data for a given destination slug.
 * Returns null if no briefing has been created for that destination yet.
 */
export function getBriefingBySlug(slug) {
  return BRIEFINGS[slug] || null;
}
