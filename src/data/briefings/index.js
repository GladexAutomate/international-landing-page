/**
 * Briefing data registry.
 * To add a new destination briefing:
 *   1. Create src/data/briefings/<slug>.js
 *   2. Import and add it to the BRIEFINGS map below.
 *   3. The slug must match the destination slug in destinations.js.
 */

import { danangBriefing }              from "./danang.js";
import { danang6d4nVietjetBriefing }     from "./danang-6d4n-vietjet.js";
import { danang5d3nVietjetBriefing }     from "./danang-5d3n-vietjet.js";
import { danang4d2nBambooBriefing }      from "./danang-4d2n-bamboo.js";
import { danang4d3nAirAsiaBriefing }     from "./danang-4d3n-airasia.js";
import { danang4d3nCebuPacificBriefing } from "./danang-4d3n-cebu-pacific.js";
import { danang5d3nBambooBriefing }      from "./danang-5d3n-bamboo.js";
import { danang6d4nVietjetStandardBriefing } from "./danang-6d4n-vietjet-standard.js";
import { koreaBriefing }               from "./korea.js";
import { hongkongBriefing }            from "./hongkong.js";
import { hongkongCebuPacificBriefing } from "./hongkong-cebu-pacific.js";
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
import { beijingShanghaiBriefing }        from "./beijing-shanghai.js";
import { beijingShanghaiPrivateBriefing } from "./beijing-shanghai-private.js";
import { beijingShanghaiPalBriefing }          from "./beijing-shanghai-pal.js";
import { beijingShanghaiCebuPacificBriefing } from "./beijing-shanghai-cebu-pacific.js";
import { hongkongShenzhenZhuhaieBriefing }    from "./hongkong-shenzhen-zhuhai.js";
import { newZealandBriefing }          from "./new-zealand.js";
import { bangkokPattayaBriefing }      from "./bangkok-pattaya.js";
import { indochinaBriefing }           from "./indochina.js";
import { triCityBriefing }             from "./tri-city.js";
import { twinCityBriefing }            from "./twin-city.js";

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
  "hongkong-cebu-pacific":  hongkongCebuPacificBriefing,
  "korea":                   koreaBriefing,
  "japan":                   japanBriefing,
  "japan-test":              japanBriefing,
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
  "beijing-shanghai":         beijingShanghaiBriefing,
  "beijing-shanghai-private": beijingShanghaiPrivateBriefing,
  "beijing-shanghai-pal":             beijingShanghaiPalBriefing,
  "beijing-shanghai-cebu-pacific":    beijingShanghaiCebuPacificBriefing,
  "hongkong-shenzhen-zhuhai":         hongkongShenzhenZhuhaieBriefing,
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
