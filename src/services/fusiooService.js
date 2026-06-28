// @ts-nocheck
/**
 * FUSIOO SERVICE
 * ─────────────────────────────────────────────────────────────────────────────
 * Primary booking data source.
 *
 * Architecture (Supabase + Fusioo Hybrid):
 *   1. Supabase  → GDX number → record_id  (lightweight index lookup)
 *   2. Fusioo    → record_id  → full 68-field booking (authoritative source)
 *   3. Fusioo    → linked record IDs → destination, hotel, airline, tour names
 *
 * Confirmed working endpoints:
 *   GET /records/{recordId}            — fetch any record by its Fusioo ID
 *   (GET /apps/{id}/records is 404 — no list permission on Booking Transactions)
 *
 * Field mapping (verified from live API):
 *   Destination record  → data.destination  (e.g. "Hong Kong")
 *   Hotel record        → data.hotel        (e.g. "Rambler Oasis")
 *   Airline Details rec → data.airline[0]   (e.g. "Cebu Pacific")
 *   Tour Details rec    → data.tour_name    (e.g. "Hongkong City Tour")
 */

import { getRecord, isFusiooId } from "./fusiooClient.js";

// fetchRecord now delegates to the central client (which has its own cache)
async function fetchRecord(id) {
  if (!id || !isFusiooId(id)) return null;
  try {
    return await getRecord(id);
  } catch {
    return null;
  }
}

// ── Public resolvers ──────────────────────────────────────────────────────────

/**
 * Resolves a Destination App Link ID to its text name.
 * Field: data.destination  (e.g. "Hong Kong")
 *
 * @param {string} id  Fusioo record ID from bookings_6fbdd6b2.destination
 * @returns {Promise<string|null>}
 */
export async function resolveDestination(id) {
  const record = await fetchRecord(id);
  return record?.destination ?? null;
}

/**
 * Resolves a Hotel App Link ID to its hotel name.
 * Field: data.hotel  (e.g. "Rambler Oasis")
 *
 * @param {string} id  Fusioo record ID from bookings_6fbdd6b2.hotel_name
 * @returns {Promise<string|null>}
 */
export async function resolveHotel(id) {
  const record = await fetchRecord(id);
  return record?.hotel ?? null;
}

/**
 * Resolves an Airline App Link ID to its airline name.
 * Field: data.title  (e.g. "Philippine Airlines")
 *
 * @param {string} id  Fusioo record ID from bookings_6fbdd6b2.name_of_airline
 * @returns {Promise<string|null>}
 */
export async function resolveAirline(id) {
  const record = await fetchRecord(id);
  return record?.title ?? null;
}

/**
 * Enriches a full booking row from bookings_6fbdd6b2 by resolving all
 * three App Link fields concurrently and injecting the readable names.
 *
 * Adds to the booking object:
 *   booking.destinationName  ← resolved destination text
 *   booking.hotelName        ← resolved hotel text
 *   booking.airlineName      ← resolved airline text
 *
 * Fields that are not Fusioo IDs (already plain text) are passed through as-is.
 * Fields that fail to resolve remain null without throwing.
 *
 * @param {Record<string,any>} booking  Raw row from bookings_6fbdd6b2
 * @returns {Promise<Record<string,any>>}  Same object with three new fields
 */
export async function enrichBooking(booking) {
  if (!booking) return booking;

  const [destinationName, hotelName, airlineName] = await Promise.all([
    resolveDestination(booking.destination),
    resolveHotel(booking.hotel_name),
    resolveAirline(booking.name_of_airline),
  ]);

  // Only use the raw field as fallback if it's a human-readable string, not a Fusioo record ID
  const notRawId = (v) => (v && typeof v === "string" && !isFusiooId(v)) ? v : null;

  return {
    ...booking,
    destinationName: destinationName ?? notRawId(booking.destination)      ?? null,
    hotelName:       hotelName       ?? notRawId(booking.hotel_name)        ?? null,
    airlineName:     airlineName     ?? notRawId(booking.name_of_airline)   ?? null,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// PRIMARY BOOKING LOADER  —  Fusioo as authoritative source
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fetches the complete booking from Fusioo using the record_id stored in the
 * Supabase row, then concurrently resolves all linked records.
 *
 * Returns an enriched booking object with:
 *   destinationName   — human-readable destination (e.g. "Hong Kong")
 *   hotelName         — hotel name (e.g. "Rambler Oasis")
 *   airlineName       — airline name (e.g. "Cebu Pacific")
 *   pnr               — booking reference / PNR (e.g. "LLZZGA")
 *   flightDeparture   — departing flight details
 *   flightReturn      — returning flight details
 *   tourName          — tour name (e.g. "Hongkong City Tour")
 *   tourDate          — tour date
 *   tourDescription   — tour description
 *   transferInfo      — transfer information string
 *   amountPaid        — numeric amount paid
 *   remainingBalance  — numeric remaining balance
 *   refundAmount      — numeric refund if any
 *   arrivalDate       — normalised arrival date
 *   departureDate     — normalised departure date
 *
 * Falls back to enrichBooking(supabaseRow) if Fusioo is unreachable.
 *
 * @param {Record<string,any>} supabaseRow  Row from bookings_6fbdd6b2
 * @returns {Promise<Record<string,any>>}
 */
export async function getFullBookingFromFusioo(supabaseRow) {
  if (!supabaseRow) return null;

  if (!supabaseRow.record_id) {
    console.warn("[Fusioo] No record_id on Supabase row — falling back to enrichBooking.");
    return enrichBooking(supabaseRow);
  }

  console.log("[Fusioo] Fetching full booking → record_id:", supabaseRow.record_id);

  const fusiooRecord = await fetchRecord(supabaseRow.record_id);

  if (!fusiooRecord) {
    console.warn("[Fusioo] Record fetch failed — falling back to enrichBooking.");
    return enrichBooking(supabaseRow);
  }

  console.log("[Fusioo] Main booking record loaded. GDX:", fusiooRecord.gdx, "| Fields:", Object.keys(fusiooRecord).length);

  // ── Helper: safely extract the first Fusioo record ID from a field ──────────
  // Fields like destination, hotel_name, airline_details_1 may be:
  //   null | "iXXX..." (string) | ["iXXX..."] (array)
  const firstId = (field) => {
    if (!field) return null;
    const candidates = Array.isArray(field) ? field : [field];
    return candidates.find(isFusiooId) || null;
  };

  // ── Resolve all linked records concurrently ──────────────────────────────────
  const [destinationRec, hotelRec, airlineRec, tourRec, transferRec] = await Promise.all([
    fetchRecord(firstId(fusiooRecord.destination)),
    fetchRecord(firstId(fusiooRecord.hotel_name)),
    fetchRecord(firstId(fusiooRecord.airline_details_1)),
    fetchRecord(firstId(fusiooRecord.tour_details)),
    fetchRecord(firstId(fusiooRecord.transfer_details)),
  ]);

  // ── Airline: name + sub-fields ───────────────────────────────────────────────
  const rawAirline = airlineRec?.airline;
  const airlineName = Array.isArray(rawAirline) ? rawAirline[0] : (rawAirline || null);

  // ── Payment breakdown: "33399 - Amount Paid / 0 - Balance / 0 - Refund" ──────
  // Also handles plain number (e.g. 33399) in case Fusioo returns the raw amount
  const parsePayment = (raw) => {
    if (raw === null || raw === undefined) return { paid: null, balance: null, refund: null };
    if (typeof raw === "number") return { paid: raw, balance: null, refund: null };
    if (typeof raw !== "string") return { paid: null, balance: null, refund: null };
    const parts = raw.split("/").map((s) => s.trim());
    const num   = (s) => { const m = s?.match(/^[\d.]+/); return m ? parseFloat(m[0]) : null; };
    return { paid: num(parts[0]), balance: num(parts[1]), refund: num(parts[2]) };
  };
  const payment = parsePayment(fusiooRecord.total_amount_paid);

  // ── Transfer info: flatten the linked record into a readable string ───────────
  const transferInfo = transferRec
    ? Object.entries(transferRec)
        .filter(([k, v]) =>
          v &&
          typeof v !== "object" &&
          !isFusiooId(String(v)) &&
          !["id", "created", "last_modified", "created_by", "last_modified_by"].includes(k)
        )
        .map(([k, v]) => `${k.replace(/_/g, " ")}: ${v}`)
        .join(" | ") || null
    : null;

  return {
    // ── Base layers (Supabase → Fusioo overrides) ────────────────────────────
    ...supabaseRow,
    ...fusiooRecord,

    // ── Resolved destination & hotel ─────────────────────────────────────────
    // Prefer the resolved human-readable name; never fall back to a raw Fusioo ID
    destinationName:  destinationRec?.destination  || null,
    hotelName:        hotelRec?.hotel               || null,

    // ── Flight details (from airline_details_1 linked record) ────────────────
    airlineName:      airlineName,
    pnr:              airlineRec?.booking_reference_number_pnr || null,
    flightDeparture:  airlineRec?.departing_flight_details     || null,
    flightReturn:     airlineRec?.returning_flight_details     || null,
    flightCost:       airlineRec?.cost                        || null,

    // ── Tour details (from tour_details linked record) ────────────────────────
    tourName:         tourRec?.tour_name   || null,
    tourDate:         tourRec?.tour_date   || null,
    tourDescription:  tourRec?.description || null,
    // Note: Fusioo has a typo — the field is literally spelled "tour_requets"
    tourRequest:      tourRec?.tour_requets || null,

    // ── Hotel contact details ─────────────────────────────────────────────────
    hotelAddress: hotelRec?.address        || null,
    hotelPhone:   hotelRec?.contact_number || null,

    // ── Package information (from main booking record) ────────────────────────
    // Priority: collective name → package type → transaction type
    packageName: fusiooRecord?.collective_package_name
                 || fusiooRecord?.type_of_package
                 || fusiooRecord?.transaction_type
                 || null,
    packageType: fusiooRecord?.type_of_package          || null,
    packageCost: fusiooRecord?.total_package_price_srp  || null,

    // ── Transfer details ──────────────────────────────────────────────────────
    transferInfo,

    // ── Payment breakdown ─────────────────────────────────────────────────────
    amountPaid:       payment.paid,
    remainingBalance: payment.balance,
    refundAmount:     payment.refund,

    // ── Normalised dates (Fusioo uses 'arrival', not 'arrival_date') ──────────
    arrivalDate:   fusiooRecord.arrival       || supabaseRow.arrival_date  || null,
    departureDate: fusiooRecord.departure_date || supabaseRow.departure_date || null,

    // ── Sanitize fields that Fusioo returns as App Link ID arrays ─────────────
    // hotel_booking_details can be a linked record array — strip any raw IDs
    hotel_booking_details: (() => {
      const raw = fusiooRecord.hotel_booking_details;
      if (!raw) return null;
      if (Array.isArray(raw)) {
        const text = raw.filter((v) => typeof v === "string" && !isFusiooId(v)).join(", ");
        return text || null;
      }
      if (typeof raw === "string" && isFusiooId(raw)) return null;
      return raw;
    })(),
  };
}
