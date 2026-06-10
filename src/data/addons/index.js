/**
 * ADD-ONS MODULE — Unified Exports & Helper Functions
 *
 * This is the single entry point for all add-ons data and utilities.
 * Import from here rather than from individual files:
 *
 *   import { getInsurancePlans, createCart, calculateCartTotal } from "../data/addons";
 *
 * Tour data is now served live via src/services/toursService.js (Globaltix API).
 */

export { getInsurancePlans } from "./mockInsurance.js";

// ─────────────────────────────────────────────────────────────────────────────
// ID GENERATOR
// ─────────────────────────────────────────────────────────────────────────────

/** @returns {string} */
export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// CART FACTORY
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Creates a fresh, empty Cart with all required fields populated.
 *
 * @param {string} destinationSlug
 * @param {string} [gdxReference]  - GDX code from the GDX search above
 * @returns {import("../../types/addons").Cart}
 */
export function createCart(destinationSlug, gdxReference) {
  return {
    cartId:          generateId(),
    destinationSlug,
    gdxReference:    gdxReference || null,
    tours:           [],
    insurance:       null,
    subtotal:        0,
    discountAmount:  0,
    promoCode:       null,
    total:           0,
    currency:        "PHP",
    createdAt:       new Date().toISOString(),
    expiresAt:       null,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// CART ITEM FACTORIES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Creates a CartTourItem from a confirmed booking modal selection.
 *
 * @param {import("../../types/addons").Tour}              tour
 * @param {import("../../types/addons").TourBookingOption} selectedOption
 * @param {number}  qty         - participant count (>= option.minPurchaseQty)
 * @param {string}  [bookingDate] - "YYYY-MM-DD"; required when tour.requiresBookingDate
 * @returns {import("../../types/addons").CartTourItem}
 */
export function createCartTourItem(tour, selectedOption, qty, bookingDate) {
  const unitPrice = selectedOption?.price ?? tour.price;
  const count     = qty ?? 1;
  return {
    type:           "tour",
    cartItemId:     generateId(),
    tour,
    selectedOption: selectedOption ?? null,
    qty:            count,
    bookingDate:    bookingDate  || null,
    bookingTime:    null,
    sessionId:      null,
    unitPrice,
    total:          unitPrice * count,
    providerBookingRef: null,
    providerStatus:     "pending",
  };
}

/**
 * Wraps an InsurancePlan in a CartInsuranceItem for 1 participant.
 *
 * @param {import("../../types/addons").InsurancePlan} plan
 * @param {number} [participantCount]
 * @returns {import("../../types/addons").CartInsuranceItem}
 */
export function createCartInsuranceItem(plan, participantCount = 1) {
  return {
    type:             "insurance",
    cartItemId:       generateId(),
    plan,
    participantCount,
    unitPrice:        plan.price,
    total:            plan.price * participantCount,
    quoteRef:         null,    // TODO: Starr quote reference
    quoteExpiry:      null,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// CART CALCULATOR
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Recomputes subtotal, discountAmount, and total from current cart items.
 * Returns only the fields that change — merge with existing cart state.
 *
 * @param {import("../../types/addons").CartTourItem[]} tours
 * @param {import("../../types/addons").CartInsuranceItem|null} insurance
 * @param {number} [discountAmount]
 * @returns {{ subtotal: number; discountAmount: number; total: number }}
 */
export function calculateCartTotal(tours, insurance, discountAmount = 0) {
  const tourTotal      = tours.reduce((sum, item) => sum + item.total, 0);
  const insuranceTotal = insurance ? insurance.total : 0;
  const subtotal       = tourTotal + insuranceTotal;
  const total          = Math.max(0, subtotal - discountAmount);
  return { subtotal, discountAmount, total };
}

// ─────────────────────────────────────────────────────────────────────────────
// ORDER FACTORY
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Creates a CheckoutOrder from a completed cart and customer details.
 * This is the object that will be sent to Xendit and stored in the database.
 *
 * TODO: Xendit Checkout Integration
 *   After calling createOrder(), pass the result to:
 *   POST https://api.xendit.co/v2/invoices
 *   with the orderId as externalId.
 *
 * @param {import("../../types/addons").Cart} cart
 * @param {{ name: string; email: string; phone: string }} customer
 * @param {import("../../types/addons").PaymentMethod} paymentMethod
 * @returns {import("../../types/addons").CheckoutOrder}
 */
export function createOrder(cart, customer, paymentMethod) {
  const orderId = generateId();
  const now     = new Date().toISOString();

  /** @type {import("../../types/addons").OrderLineItem[]} */
  const lineItems = [
    ...cart.tours.map((item) => ({
      lineItemId:  generateId(),
      type:        "tour",
      name:        item.selectedOption
        ? `${item.tour.name} — ${item.selectedOption.optionName}`
        : item.tour.name,
      description: item.tour.description,
      quantity:    item.qty ?? 1,
      unitPrice:   item.unitPrice,
      total:       item.total,
      cartItemId:  item.cartItemId,
      sourceId:    item.tour.sourceId   || null,
      source:      item.tour.source     || null,
    })),
    ...(cart.insurance ? [{
      lineItemId:  generateId(),
      type:        "insurance",
      name:        cart.insurance.plan.name,
      description: `Travel insurance for ${cart.insurance.participantCount} traveller(s)`,
      quantity:    cart.insurance.participantCount,
      unitPrice:   cart.insurance.unitPrice,
      total:       cart.insurance.total,
      cartItemId:  cart.insurance.cartItemId,
      sourceId:    cart.insurance.plan.planCode || null,
      source:      cart.insurance.plan.provider || null,
    }] : []),
  ];

  return {
    orderId,
    cartId:           cart.cartId,
    gdxReference:     cart.gdxReference || null,
    destinationSlug:  cart.destinationSlug,
    customer,
    lineItems,
    subtotal:         cart.subtotal,
    discount:         cart.discountAmount,
    total:            cart.total,
    currency:         "PHP",
    paymentMethod,
    paymentStatus:    "unpaid",
    xendit:           {
      // TODO: Xendit Checkout Integration — populated after API call
      externalId: orderId,
      status:     "PENDING",
      invoiceId:       null,
      paymentIntentId: null,
      checkoutUrl:     null,
      webhookToken:    null,
      paidAt:          null,
      paidAmount:      null,
    },
    orderStatus:       "pending_payment",
    fulfillmentStatus: "pending",
    fulfillments:      lineItems.map((li) => ({
      fulfillmentId:   generateId(),
      lineItemId:      li.lineItemId,
      type:            li.type,
      status:          "pending",
      providerRef:     null,      // TODO: Globaltix booking ref / Starr policy number
      confirmationDoc: null,
      attemptedAt:     now,
      confirmedAt:     null,
      failureReason:   null,
    })),
    createdAt:   now,
    updatedAt:   now,
    paidAt:      null,
    fulfilledAt: null,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// PAYMENT METHODS — provider-agnostic gateway list
// ─────────────────────────────────────────────────────────────────────────────
// DEMO MODE ONLY — No real gateway is connected.
// Replace with real gateway integration later:
//   BUX:      https://bux.ph/developers
//   PayMongo: https://developers.paymongo.com
//   Xendit:   https://developers.xendit.co

/**
 * @typedef {{ id: string; label: string; emoji: string; description: string; provider: string }} PaymentMethod
 */

/** @type {PaymentMethod[]} */
export const PAYMENT_METHODS = [
  {
    id:          "bux",
    label:       "BUX",
    emoji:       "🏦",
    description: "BUX Wallet · QR Ph · Online Banking",
    provider:    "BUX",
    // Replace with real BUX gateway integration later
  },
  {
    id:          "paymongo",
    label:       "PayMongo",
    emoji:       "💳",
    description: "GCash · Maya · Credit Card · Bank Transfer",
    provider:    "PayMongo",
    // Replace with real PayMongo gateway integration later
  },
  {
    id:          "xendit",
    label:       "Xendit",
    emoji:       "🏧",
    description: "GCash · Maya · Credit Card",
    provider:    "Xendit",
    // Replace with real Xendit gateway integration later
  },
];
