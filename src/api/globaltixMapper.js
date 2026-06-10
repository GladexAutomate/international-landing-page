// @ts-nocheck
/**
 * GLOBALTIX → TOUR MODEL MAPPER
 * Maps a Globaltix product object (from /api/product/info or /api/product/list)
 * to the Tour typedef in src/types/addons.js.
 */

// ── Image CDN ─────────────────────────────────────────────────────────────────
// Globaltix returns a UUID in product.image. CDN bucket is env-specific.
// stg-gtImage = staging, live-gtImage = production.
const IS_STAGING = (import.meta.env.VITE_GLOBALTIX_BASE_URL ?? "").includes("stg");
const IMG_BUCKET = IS_STAGING ? "stg-gtImage" : "live-gtImage";
const IMG_CDN    = "https://product-image.globaltix.com";

export function globaltixImageUrl(uuid) {
  if (!uuid) return null;
  return `${IMG_CDN}/${IMG_BUCKET}/${uuid}`;
}

// Fallback images used when CDN image fails to load (onError in component)
export const FALLBACK_IMAGES = {
  "Tours":          "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=600&q=80",
  "Attraction":     "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80",
  "Transportation": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80",
};
const DEFAULT_FALLBACK = "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=600&q=80";

// ── Helpers ───────────────────────────────────────────────────────────────────

function extractValues(arr) {
  if (!Array.isArray(arr)) return [];
  return arr
    .filter((item) => item?.isActive !== false && item?.value)
    .map((item) => item.value);
}

function parseTags(keywords) {
  if (!keywords || typeof keywords !== "string") return [];
  return keywords.split(/[&,]/).map((t) => t.trim().toLowerCase()).filter(Boolean);
}

// ── ProductOptions mapper ─────────────────────────────────────────────────────

/**
 * Maps a raw Globaltix ProductOptions API response to TourBookingOption[].
 *
 * Globaltix returns a two-level structure:
 *   data[i]               = Option  (option.id  → optionID for availability)
 *   data[i].ticketType[j] = Ticket  (ticketType.id → ticketTypeID for availability)
 *
 * Called from bookingService.js when TourBookingModal opens — NOT during catalogue loading.
 *
 * @param {Array} optionsData  - the `data` array from GET /api/product/options
 * @returns {import("../types/addons").TourBookingOption[]}
 */
export function mapGlobtixOptionsToBookingOptions(optionsData) {
  if (!Array.isArray(optionsData)) return [];
  const result = [];
  for (const opt of optionsData) {
    for (const tt of (opt.ticketType ?? [])) {
      result.push({
        id:                `${opt.id}-${tt.id}`,
        optionId:          opt.id,
        optionName:        opt.name,
        ticketTypeId:      tt.id,
        ticketTypeName:    tt.name,
        sku:               tt.sku,
        price:             tt.originalPrice,
        nettPrice:         tt.nettPrice,
        minPurchaseQty:    tt.minPurchaseQty ?? 1,
        maxPurchaseQty:    tt.maxPurchaseQty ?? null,
        ageFrom:           tt.ageFrom ?? null,
        ageTo:             tt.ageTo ?? null,
        isCancellable:     opt.isCancellable ?? false,
        cancellationNotes: Array.isArray(opt.cancellationNotes) ? opt.cancellationNotes : [],
        inclusions:        Array.isArray(opt.inclusions) ? opt.inclusions : [],
        termsAndConditions: opt.termsAndConditions || null,
        visitDateRequired:  opt.visitDate?.required ?? false,
      });
    }
  }
  return result;
}

// ── Main export ───────────────────────────────────────────────────────────────

/**
 * Maps one Globaltix product to the Tour model.
 * Works with both the summary (product/list) and full (product/info) response shapes.
 *
 * bookingOptions is intentionally empty — loaded lazily via
 * bookingService.getBookingOptionsForProduct() when TourBookingModal opens.
 *
 * @param {Object} product
 * @returns {import("../types/addons").Tour}
 */
export function mapGlobtixProductToTour(product) {
  const category  = product.category || "Tours";
  const price     = product.originalPrice || product.fromPrice || 0;
  const cdnUrl    = globaltixImageUrl(product.image);
  const fallback  = FALLBACK_IMAGES[category] || DEFAULT_FALLBACK;

  return {
    id:                   `globaltix-${product.id}`,
    name:                 product.name,
    source:               "globaltix",
    sourceId:             String(product.id),
    sourceProductCode:    String(product.id),
    sourceCategoryId:     category.toLowerCase().replace(/\s+/g, "-"),
    description:          product.description || "",
    images:               [{ url: cdnUrl || fallback, fallbackUrl: fallback, isPrimary: true }],
    duration:             "",
    durationMinutes:      0,
    meetingPoint:         product.city || "",
    category,
    tags:                 parseTags(product.keywords),
    price,
    currency:             "PHP",
    bookingOptions:       [],
    inclusions:           extractValues(product.inclusions),
    exclusions:           extractValues(product.exclusions),
    requiresBookingDate:  !product.isOpenDated,
    availability:         [],
    minParticipants:      1,
    isCancellable:        product.isCancellable  ?? false,
    isInstantConfirmation: product.isInstantConfirmation ?? false,
  };
}
