/**
 * MOCK INSURANCE PLANS — Starr Insurance Schema
 *
 * All fields conform to the InsurancePlan typedef in src/types/addons.js.
 * When the Starr Insurance API goes live, replace each mock record with
 * the mapped API response using the same field names.
 *
 * TODO: Starr Insurance API Integration
 *   - GET /api/products → returns available plan codes
 *   - POST /api/quotes  → returns live premium for given trip duration + pax count
 *   - POST /api/enroll  → issues a policy; returns policyNumber + documentUrl
 *
 *   Mapping:
 *     planCode     ← Starr plan code
 *     productId    ← Starr product ID
 *     price        ← Starr premium per person (from /api/quotes response)
 *     documentUrl  ← Starr policy document URL (from /api/enroll response)
 */

/** @type {import("../../types/addons").InsurancePlan[]} */
const INSURANCE_PLANS = [
  {
    id: "basic",
    tier: "basic",
    name: "Basic Travel Insurance",

    // TODO: Starr Insurance API Integration
    provider: "gladex_manual",
    planCode: "STR-TI-PH-BASIC-001",   // Starr plan code — replace with live value
    productId: "STR-PROD-7841",         // Starr product ID — replace with live value
    quoteEndpoint: null,                // POST https://api.starrcompanies.com/quotes
    enrollEndpoint: null,               // POST https://api.starrcompanies.com/policies

    price: 399,
    currency: "PHP",
    pricePerDay: null,
    maxDurationDays: 30,

    recommended: false,
    coverage: [
      "Medical emergencies up to ₱500,000",
      "Personal accident coverage",
      "24/7 emergency assistance hotline",
    ],
    coverageLimits: [
      { type: "Medical",           limitAmount: 500000,  description: "Emergency medical & hospitalisation" },
      { type: "Personal Accident", limitAmount: 250000,  description: "Accidental death & permanent disability" },
      { type: "Baggage Loss",      limitAmount: 5000,    description: "Lost or stolen checked baggage" },
    ],
    ageLimit: { min: 0, max: 70 },
    documentUrl: null,  // populated after Starr enrollment
    termsUrl: "https://www.starrcompanies.com/terms/travel-basic",
  },

  {
    id: "standard",
    tier: "standard",
    name: "Standard Travel Insurance",

    // TODO: Starr Insurance API Integration
    provider: "gladex_manual",
    planCode: "STR-TI-PH-STD-002",
    productId: "STR-PROD-7842",
    quoteEndpoint: null,
    enrollEndpoint: null,

    price: 699,
    currency: "PHP",
    pricePerDay: null,
    maxDurationDays: 60,

    recommended: true,
    coverage: [
      "Medical emergencies up to ₱2,000,000",
      "Trip cancellation & interruption",
      "Baggage loss up to ₱20,000",
      "Flight delay compensation",
      "24/7 emergency assistance hotline",
    ],
    coverageLimits: [
      { type: "Medical",              limitAmount: 2000000, description: "Emergency medical & hospitalisation" },
      { type: "Trip Cancellation",    limitAmount: 100000,  description: "Non-refundable trip costs" },
      { type: "Trip Interruption",    limitAmount: 80000,   description: "Unused portion + return transport" },
      { type: "Baggage Loss",         limitAmount: 20000,   description: "Lost or stolen baggage" },
      { type: "Baggage Delay",        limitAmount: 5000,    description: "Essential purchases after 6+ hr delay" },
      { type: "Flight Delay",         limitAmount: 5000,    description: "Meals & accommodation after 6+ hr delay" },
      { type: "Personal Accident",    limitAmount: 500000,  description: "Accidental death & permanent disability" },
    ],
    ageLimit: { min: 0, max: 75 },
    documentUrl: null,
    termsUrl: "https://www.starrcompanies.com/terms/travel-standard",
  },

  {
    id: "premium",
    tier: "premium",
    name: "Premium Travel Insurance",

    // TODO: Starr Insurance API Integration
    provider: "gladex_manual",
    planCode: "STR-TI-PH-PREM-003",
    productId: "STR-PROD-7843",
    quoteEndpoint: null,
    enrollEndpoint: null,

    price: 999,
    currency: "PHP",
    pricePerDay: null,
    maxDurationDays: 90,

    recommended: false,
    coverage: [
      "Medical emergencies up to ₱5,000,000",
      "Trip cancellation for any reason",
      "Baggage loss up to ₱50,000",
      "Adventure sports coverage",
      "Flight delay & missed connection",
      "Cancel for any reason clause",
      "24/7 VIP emergency assistance",
    ],
    coverageLimits: [
      { type: "Medical",              limitAmount: 5000000, description: "Emergency medical & hospitalisation" },
      { type: "Trip Cancellation",    limitAmount: 250000,  description: "Cancel for any reason — up to 75% refund" },
      { type: "Trip Interruption",    limitAmount: 200000,  description: "Unused portion + business-class return" },
      { type: "Baggage Loss",         limitAmount: 50000,   description: "Lost or stolen baggage" },
      { type: "Baggage Delay",        limitAmount: 10000,   description: "Essential purchases after 4+ hr delay" },
      { type: "Flight Delay",         limitAmount: 10000,   description: "Meals & accommodation after 4+ hr delay" },
      { type: "Missed Connection",    limitAmount: 20000,   description: "Rebooking costs for missed connections" },
      { type: "Adventure Sports",     limitAmount: 1000000, description: "Injuries from covered adventure activities" },
      { type: "Personal Accident",    limitAmount: 2000000, description: "Accidental death & permanent disability" },
    ],
    ageLimit: { min: 0, max: 80 },
    documentUrl: null,
    termsUrl: "https://www.starrcompanies.com/terms/travel-premium",
  },
];

/**
 * Returns all available insurance plans.
 *
 * TODO: Starr Insurance API Integration
 *   Replace this function body with a live call:
 *   const response = await fetch("https://api.starrcompanies.com/products", {
 *     headers: { Authorization: `Bearer ${STARR_API_KEY}` }
 *   });
 *   return response.json().map(mapStarrPlanToInsurancePlan);
 *
 * @returns {import("../../types/addons").InsurancePlan[]}
 */
export function getInsurancePlans() {
  return INSURANCE_PLANS;
}
