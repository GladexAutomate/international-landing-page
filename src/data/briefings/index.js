/**
 * Briefing data registry.
 * To add a new destination briefing:
 *   1. Create src/data/briefings/<slug>.js
 *   2. Import and add it to the BRIEFINGS map below.
 *   3. Add the slug to src/config/readySlugs.js so clients are routed here.
 */

import { danangBriefing }              from "./danang.js";
import { danang6d4nVietjetBriefing }     from "./danang-6d4n-vietjet.js";
import { danang5d3nVietjetBriefing }     from "./danang-5d3n-vietjet.js";
import { danang4d2nBambooBriefing }      from "./danang-4d2n-bamboo.js";
import { danang4d3nAirAsiaBriefing }     from "./danang-4d3n-airasia.js";
import { danang4d3nCebuPacificBriefing } from "./danang-4d3n-cebu-pacific.js";
import { danang5d3nBambooBriefing }      from "./danang-5d3n-bamboo.js";
import { danang6d4nVietjetStandardBriefing } from "./danang-6d4n-vietjet-standard.js";
import { hongkongBriefing }            from "./hongkong.js";
import { hongkongCebuPacificBriefing } from "./hongkong-cebu-pacific.js";
import { taipeiBriefing }              from "./taipei.js";
import { singaporeBriefing }           from "./singapore.js";
import { beijingShanghaiPrivateBriefing } from "./beijing-shanghai-private.js";
import { beijingShanghaiPalBriefing }          from "./beijing-shanghai-pal.js";
import { beijingShanghaiCebuPacificBriefing } from "./beijing-shanghai-cebu-pacific.js";
import { hongkongShenzhenZhuhaieBriefing }    from "./hongkong-shenzhen-zhuhai.js";
import { hanoiSapaAirAsiaBriefing }    from "./hanoi-sapa-airasia.js";
import { beijing6d5nPalBriefing }       from "./beijing-6d5n-pal.js";

const BRIEFINGS = {
  "danang-vietnam":          danangBriefing,
  "danang-6d4n-vietjet":      danang6d4nVietjetBriefing,
  "danang-5d3n-vietjet":      danang5d3nVietjetBriefing,
  "danang-4d2n-bamboo":       danang4d2nBambooBriefing,
  "danang-4d3n-airasia":      danang4d3nAirAsiaBriefing,
  "danang-4d3n-cebu-pacific":      danang4d3nCebuPacificBriefing,
  "danang-5d3n-bamboo":            danang5d3nBambooBriefing,
  "danang-6d4n-vietjet-standard":  danang6d4nVietjetStandardBriefing,
  "hongkong":                hongkongBriefing,
  "hongkong-cebu-pacific":   hongkongCebuPacificBriefing,
  "taipei":                  taipeiBriefing,
  "singapore":               singaporeBriefing,
  "beijing-shanghai-collective": beijingShanghaiPrivateBriefing,
  "beijing-shanghai-pal":             beijingShanghaiPalBriefing,
  "beijing-shanghai-cebu-pacific":    beijingShanghaiCebuPacificBriefing,
  "hongkong-shenzhen-zhuhai":         hongkongShenzhenZhuhaieBriefing,
  "hanoi-sapa-airasia":      hanoiSapaAirAsiaBriefing,
  "beijing-6d5n-pal":        beijing6d5nPalBriefing,
};

/**
 * Returns the briefing data for a given destination slug.
 * Returns null if no briefing has been created for that destination yet.
 */
export function getBriefingBySlug(slug) {
  return BRIEFINGS[slug] || null;
}
