/**
 * Briefing data registry.
 * To add a new destination briefing:
 *   1. Create src/data/briefings/<slug>.js
 *   2. Import and add it to the BRIEFINGS map below.
 *   3. The slug must match the destination slug in destinations.js.
 */

import { danangBriefing }              from "./danang.js";
import { koreaBriefing }               from "./korea.js";
import { hongkongBriefing }            from "./hongkong.js";
import { japanBriefing }               from "./japan.js";
import { jejuKoreaBriefing }           from "./jeju-korea.js";
import { taipeiBriefing }              from "./taipei.js";
import { singaporeBriefing }           from "./singapore.js";
import { bangkokBriefing }             from "./bangkok.js";
import { dubaiBriefing }               from "./dubai.js";
import { macauBriefing }               from "./macau.js";
import { kualaLumpurBriefing }         from "./kuala-lumpur.js";
import { phuketBriefing }              from "./phuket.js";
import { baliBriefing }                from "./bali.js";
import { baliWisaktuBriefing }         from "./bali-wisataku.js";
import { maldivesBriefing }            from "./maldives.js";
import { maldivesMaafushiBriefing }    from "./maldives-maafushi.js";
import { vietnamPhuQuocBriefing }      from "./vietnam-phu-quoc.js";
import { malaysiaKotaKinabaluBriefing } from "./malaysia-kota-kinabalu.js";
import { vietnamHanoiBriefing }        from "./vietnam-hanoi.js";
import { chiangmaiBriefing }           from "./chiangmai.js";
import { cambodiaBriefing }            from "./cambodia.js";
import { beijingShanghaiBriefing }     from "./beijing-shanghai.js";
import { newZealandBriefing }          from "./new-zealand.js";
import { bangkokPattayaBriefing }      from "./bangkok-pattaya.js";
import { indochinaBriefing }           from "./indochina.js";
import { triCityBriefing }             from "./tri-city.js";
import { twinCityBriefing }            from "./twin-city.js";

const BRIEFINGS = {
  "danang-vietnam":          danangBriefing,
  "hongkong":                hongkongBriefing,
  "korea":                   koreaBriefing,
  "japan":                   japanBriefing,
  "jeju-korea":              jejuKoreaBriefing,
  "taipei":                  taipeiBriefing,
  "singapore":               singaporeBriefing,
  "bangkok":                 bangkokBriefing,
  "dubai":                   dubaiBriefing,
  "macau":                   macauBriefing,
  "kuala-lumpur":            kualaLumpurBriefing,
  "phuket":                  phuketBriefing,
  "bali":                    baliBriefing,
  "bali-wisataku":           baliWisaktuBriefing,
  "maldives":                maldivesBriefing,
  "maldives-maafushi":       maldivesMaafushiBriefing,
  "vietnam-phu-quoc":        vietnamPhuQuocBriefing,
  "malaysia-kota-kinabalu":  malaysiaKotaKinabaluBriefing,
  "vietnam-hanoi":           vietnamHanoiBriefing,
  "chiangmai":               chiangmaiBriefing,
  "cambodia":                cambodiaBriefing,
  "beijing-shanghai":        beijingShanghaiBriefing,
  "new-zealand":             newZealandBriefing,
  "bangkok-pattaya":         bangkokPattayaBriefing,
  "indochina":               indochinaBriefing,
  "tri-city":                triCityBriefing,
  "twin-city":               twinCityBriefing,
};

/**
 * Returns the briefing data for a given destination slug.
 * Returns null if no briefing has been created for that destination yet.
 */
export function getBriefingBySlug(slug) {
  return BRIEFINGS[slug] || null;
}
