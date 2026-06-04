/**
 * ADD-ONS MODULE — Unified Exports & Helper Functions
 *
 * This is the single entry point for all add-ons data and utilities.
 * Import from here rather than from individual files:
 *
 *   import { getToursByDestination, getInsurancePlans, createCart, calculateCartTotal }
 *     from "../data/addons";
 *
 * Future API integrations only need to change the underlying implementation
 * in mockTours.js or mockInsurance.js — this file's exports stay stable.
 */

export { getToursByDestination } from "./mockTours.js";
export { getInsurancePlans }     from "./mockInsurance.js";

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
 * Wraps a Tour in a CartTourItem with default participants (1 adult).
 *
 * @param {import("../../types/addons").Tour} tour
 * @returns {import("../../types/addons").CartTourItem}
 */
export function createCartTourItem(tour) {
  return {
    type:        "tour",
    cartItemId:  generateId(),
    tour,
    bookingDate:  null,
    bookingTime:  null,
    sessionId:    null,
    participants: { adults: 1, children: 0, infants: 0 },
    unitPrice:    tour.price,        // price snapshot at add-to-cart time
    total:        tour.price * 1,    // unitPrice × adults
    providerBookingRef:  null,       // TODO: Globaltix hold reference
    providerStatus:      "pending",
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
      name:        item.tour.name,
      description: item.tour.description,
      quantity:    item.participants.adults,
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
// PAYMENT METHODS (stable list — Xendit supports all four)
// ─────────────────────────────────────────────────────────────────────────────

// TODO: Xendit Checkout Integration
// Xendit payment method identifiers:
//   GCash       → "GCASH"
//   Maya        → "PAYMAYA"
//   Credit Card → "CREDIT_CARD" (via Xendit payment intent)
//   Bank Transfer → "BANK_TRANSFER" (OTC or online banking)

/** @type {{ id: string; label: string; emoji: string; xenditMethod: string }[]} */
export const PAYMENT_METHODS = [
  { id: "gcash",  label: "GCash",               emoji: "📱", xenditMethod: "GCASH" },
  { id: "maya",   label: "Maya",                emoji: "💜", xenditMethod: "PAYMAYA" },
  { id: "card",   label: "Credit / Debit Card", emoji: "💳", xenditMethod: "CREDIT_CARD" },
  { id: "bank",   label: "Bank Transfer",        emoji: "🏦", xenditMethod: "BANK_TRANSFER" },
];
