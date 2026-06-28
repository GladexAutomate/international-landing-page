/**
 * READY_SLUGS — destinations with a complete, accurate briefing page.
 *
 * Any valid international booking whose resolved slug is NOT in this set
 * is sent to the "briefing pending" page instead.
 *
 * This is the single source of truth — imported by GdxSearchSection and
 * the bulk cache service so both always stay in sync.
 */
export const READY_SLUGS = new Set([
  "danang-vietnam",
  "hongkong",
  "singapore",
  "taipei",
  "beijing-shanghai-collective",
  "beijing-shanghai-pal",
  "beijing-shanghai-cebu-pacific",
  "hongkong-shenzhen-zhuhai",
  "hanoi-sapa-airasia",
]);
