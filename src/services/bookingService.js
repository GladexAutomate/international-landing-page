// @ts-nocheck
import { getProductOptions } from "../api/globaltixService";
import { mapGlobtixOptionsToBookingOptions } from "../api/globaltixMapper";

/**
 * Fetches and maps ProductOptions for a Globaltix product.
 *
 * Returns [] on any error so TourBookingModal can show a graceful fallback
 * rather than crashing. Errors are logged to console only.
 *
 * Availability integration is NOT wired here — that is a future phase gated on
 * Globaltix confirming the correct /api/event parameter names.
 *
 * @param {string|number} productId  - Globaltix numeric product ID (tour.sourceId)
 * @returns {Promise<import("../types/addons").TourBookingOption[]>}
 */
export async function getBookingOptionsForProduct(productId) {
  try {
    const res  = await getProductOptions(productId, false);
    const data = res?.data;
    if (!Array.isArray(data) || data.length === 0) return [];
    return mapGlobtixOptionsToBookingOptions(data);
  } catch (err) {
    console.error("[bookingService] Failed to load options for product", productId, err);
    return [];
  }
}
