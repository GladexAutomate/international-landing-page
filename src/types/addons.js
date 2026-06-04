/**
 * ADD-ONS MODULE — TYPE DEFINITIONS
 *
 * These JSDoc typedefs are the single source of truth for the
 * Optional Tours · Travel Insurance · Cart · Checkout data models.
 *
 * All mock data, all UI components, and all future API integrations
 * must conform to these shapes. Changing an integration should require
 * only replacing the data source, not modifying component code.
 *
 * Future integrations:
 *   Tours       → Globaltix API · LakbayHub API
 *   Insurance   → Starr Insurance API
 *   Checkout    → Xendit Payment Gateway
 */

// ─────────────────────────────────────────────────────────────────────────────
// TOUR
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @typedef {"globaltix"|"lakbayhub"|"gladex_manual"} TourSource
 */

/**
 * One price tier (adult / child / senior).
 * Maps to Globaltix's "pricingOptions" array.
 *
 * @typedef {Object} TourBookingOption
 * @property {string}  id        - "adult" | "child" | "senior"
 * @property {string}  label     - "Adult (18+)"
 * @property {number}  price     - PHP
 * @property {number}  [minAge]
 * @property {number}  [maxAge]
 */

/**
 * An available booking slot.
 * sessionId is what Globaltix requires in the booking payload to hold a slot.
 *
 * @typedef {Object} TourAvailabilitySlot
 * @property {string}  date       - "2026-08-15"
 * @property {string}  [time]     - "09:00"
 * @property {number}  spotsLeft
 * @property {string}  sessionId  - Globaltix session/timeslot reference
 */

/**
 * Full tour record.
 *
 * @typedef {Object} Tour
 * @property {string}           id                  - local ID
 * @property {string}           name
 * @property {TourSource}       source
 * @property {string}           [sourceId]           - Globaltix productId / LakbayHub listingId
 * @property {string}           [sourceProductCode]  - Globaltix productCode for booking payload
 * @property {string}           [sourceCategoryId]
 * @property {string}           description
 * @property {{ url: string; isPrimary: boolean }[]} images
 * @property {string}           duration             - "Half Day (4 hrs)"
 * @property {number}           [durationMinutes]    - 240
 * @property {string}           [meetingPoint]
 * @property {string}           [category]
 * @property {string[]}         [tags]
 * @property {number}           price                - base adult price, PHP
 * @property {"PHP"}            currency
 * @property {TourBookingOption[]} bookingOptions
 * @property {string[]}         inclusions
 * @property {string[]}         [exclusions]
 * @property {string[]}         [importantNotes]
 * @property {string}           [cancellationPolicy]
 * @property {boolean}          requiresBookingDate
 * @property {TourAvailabilitySlot[]} [availability]
 * @property {number}           [minParticipants]
 * @property {number}           [maxParticipants]
 * @property {number}           [minAge]
 */

// ─────────────────────────────────────────────────────────────────────────────
// INSURANCE PLAN
// ─────────────────────────────────────────────────────────────────────────────

/**
 * One structured coverage line item (from Starr API response).
 *
 * @typedef {Object} CoverageLimit
 * @property {string} type         - "Medical" | "Baggage" | "Trip Cancellation"
 * @property {number} limitAmount  - PHP value
 * @property {string} description
 */

/**
 * Full insurance plan record.
 *
 * @typedef {Object} InsurancePlan
 * @property {string}          id              - "basic" | "standard" | "premium"
 * @property {"basic"|"standard"|"premium"} tier
 * @property {string}          name
 * @property {"starr"|"gladex_manual"} provider
 * @property {string}          [planCode]      - Starr plan code, e.g. "STR-TI-PH-001"
 * @property {string}          [productId]     - Starr product identifier
 * @property {string}          [quoteEndpoint] - Starr API URL for live quotes
 * @property {string}          [enrollEndpoint]- Starr API URL to enroll a policy
 * @property {number}          price           - PHP per person
 * @property {"PHP"}           currency
 * @property {number}          [pricePerDay]
 * @property {number}          [maxDurationDays]
 * @property {boolean}         recommended
 * @property {string[]}        coverage        - human-readable list for UI
 * @property {CoverageLimit[]} [coverageLimits]- structured limits from Starr API
 * @property {{ min: number; max: number }} [ageLimit]
 * @property {string}          [documentUrl]   - policy wording PDF
 * @property {string}          [termsUrl]
 */

// ─────────────────────────────────────────────────────────────────────────────
// CART
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Cart line item — tour.
 * providerBookingRef is the Globaltix "hold" reference
 * that must be confirmed or released after payment.
 *
 * @typedef {Object} CartTourItem
 * @property {"tour"}      type
 * @property {string}      cartItemId       - uuid, unique per cart row
 * @property {Tour}        tour
 * @property {string}      [bookingDate]    - "2026-08-15"
 * @property {string}      [bookingTime]    - "09:00"
 * @property {string}      [sessionId]      - chosen TourAvailabilitySlot.sessionId
 * @property {{ adults: number; children: number; infants: number }} participants
 * @property {number}      unitPrice        - price snapshot at add-to-cart time
 * @property {number}      total
 * @property {string}      [providerBookingRef]  - Globaltix temp hold ref
 * @property {"pending"|"confirmed"|"expired"} [providerStatus]
 */

/**
 * Cart line item — insurance.
 * quoteRef is the Starr quote reference (time-limited).
 *
 * @typedef {Object} CartInsuranceItem
 * @property {"insurance"} type
 * @property {string}      cartItemId
 * @property {InsurancePlan} plan
 * @property {number}      participantCount
 * @property {number}      unitPrice        - per person snapshot
 * @property {number}      total
 * @property {string}      [quoteRef]       - Starr quote reference
 * @property {string}      [quoteExpiry]    - ISO 8601; UI should warn near expiry
 */

/**
 * The shopping cart.
 *
 * @typedef {Object} Cart
 * @property {string}           cartId
 * @property {string}           destinationSlug
 * @property {string}           [gdxReference]   - GDX booking code from the search
 * @property {CartTourItem[]}   tours
 * @property {CartInsuranceItem|null} insurance
 * @property {number}           subtotal
 * @property {number}           discountAmount
 * @property {string}           [promoCode]
 * @property {number}           total
 * @property {"PHP"}            currency
 * @property {string}           createdAt        - ISO 8601
 * @property {string}           [expiresAt]      - ISO 8601
 */

// ─────────────────────────────────────────────────────────────────────────────
// CHECKOUT ORDER
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @typedef {"draft"|"pending_payment"|"paid"|"failed"|"refunded"|"cancelled"} OrderStatus
 * @typedef {"gcash"|"maya"|"credit_card"|"bank_transfer"} PaymentMethod
 * @typedef {"pending"|"confirmed"|"failed"} FulfillmentStatus
 */

/**
 * @typedef {Object} CustomerDetails
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {string} [nationality]
 * @property {string} [birthDate]   - ISO 8601; required by Starr for age verification
 */

/**
 * One line item in the order (one per cart item).
 *
 * @typedef {Object} OrderLineItem
 * @property {string}            lineItemId
 * @property {"tour"|"insurance"} type
 * @property {string}            name
 * @property {string}            [description]
 * @property {number}            quantity
 * @property {number}            unitPrice
 * @property {number}            total
 * @property {string}            cartItemId   - cross-reference to cart item
 * @property {string}            [sourceId]   - Globaltix productId or Starr planCode
 * @property {string}            [source]     - "globaltix" | "lakbayhub" | "starr"
 */

/**
 * Xendit-specific payment record.
 * Populated when the Xendit integration goes live.
 *
 * @typedef {Object} XenditPaymentRecord
 * @property {string}  [invoiceId]       - Xendit invoice ID
 * @property {string}  [paymentIntentId] - Xendit payment intent ID
 * @property {string}  [checkoutUrl]     - Xendit hosted payment page; redirect customer here
 * @property {string}  externalId        - our orderId, sent to Xendit as externalId
 * @property {string}  [webhookToken]    - Xendit callback verification token
 * @property {string}  status            - Xendit raw status string
 * @property {string}  [paidAt]          - ISO 8601
 * @property {number}  [paidAmount]
 */

/**
 * One fulfillment record per line item.
 * Created after payment is confirmed; updated by provider API response.
 *
 * @typedef {Object} FulfillmentRecord
 * @property {string}            fulfillmentId
 * @property {string}            lineItemId
 * @property {"tour"|"insurance"} type
 * @property {FulfillmentStatus} status
 * @property {string}            [providerRef]       - Globaltix booking ref / Starr policy number
 * @property {string}            [confirmationDoc]   - ticket or policy PDF URL from provider
 * @property {string}            attemptedAt         - ISO 8601
 * @property {string}            [confirmedAt]
 * @property {string}            [failureReason]
 */

/**
 * The full checkout order.
 *
 * @typedef {Object} CheckoutOrder
 * @property {string}          orderId            - uuid; also used as Xendit externalId
 * @property {string}          cartId
 * @property {string}          [gdxReference]
 * @property {string}          destinationSlug
 * @property {CustomerDetails} customer
 * @property {OrderLineItem[]} lineItems
 * @property {number}          subtotal
 * @property {number}          discount
 * @property {number}          total
 * @property {"PHP"}           currency
 * @property {PaymentMethod}   paymentMethod
 * @property {"unpaid"|"pending"|"paid"|"failed"} paymentStatus
 * @property {XenditPaymentRecord} [xendit]
 * @property {OrderStatus}     orderStatus
 * @property {"pending"|"processing"|"completed"|"partial"|"failed"} fulfillmentStatus
 * @property {FulfillmentRecord[]} fulfillments
 * @property {string}          createdAt          - ISO 8601
 * @property {string}          updatedAt
 * @property {string}          [paidAt]
 * @property {string}          [fulfilledAt]
 */

export {};
