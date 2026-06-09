// Static rendering analysis — simulates BookingDetailsPanel output
"use strict";

const FUSIOO_ID_RE = /^i[0-9a-f]{32}$/i;

function fmtValue(val) {
  if (val === null || val === undefined || val === "") return null;
  if (typeof val === "boolean") return val ? "Yes" : "No";
  if (typeof val === "number") return String(val);
  if (typeof val === "string") return val.trim() || null;
  if (Array.isArray(val)) { const c = val.filter(Boolean).join(", "); return c || null; }
  return String(val);
}

function fmtCurrency(amount) {
  if (amount === null || amount === undefined || amount === "") return null;
  const n = typeof amount === "string" ? parseFloat(String(amount).replace(/,/g, "")) : Number(amount);
  if (isNaN(n)) return String(amount);
  return "PHP " + n.toLocaleString("en-PH");
}

function fmtDate(raw) {
  if (!raw) return null;
  const d = new Date(raw);
  if (isNaN(d.getTime())) return String(raw);
  return d.toLocaleDateString("en-PH", { year: "numeric", month: "short", day: "numeric" });
}

function stripHtml(html) {
  if (!html || typeof html !== "string") return null;
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() || null;
}

// Mock booking — simulates enriched output from getFullBookingFromFusioo for GDX 7664 (Hong Kong)
// Values confirmed from live Fusioo API in previous session
const mockBooking = {
  gdx: "7664",
  status: "Completed",
  date_created: "2024-06-01",
  payment_type: "Full Payment",
  mop_used_by_customer: "Bank Transfer",
  lead_name: "Juan dela Cruz",
  name_of_guests: "Juan dela Cruz, Maria dela Cruz",
  no_of_person: 2,
  email_1: "juan@example.com",
  mobile_1: "09171234567",
  facebook_name: "Juan dela Cruz",
  destinationName: "Hong Kong",
  travel_date: "2024-06-24",
  arrivalDate: "2024-06-24",
  departureDate: "2024-06-28",
  duration: "5 Days 4 Nights",
  customer_type: "International",
  hotelName: "Rambler Oasis",
  hotelAddress: null,
  hotelPhone: null,
  room_type: null,
  hotel_booking_details: null,
  airlineName: "Cebu Pacific",
  pnr: "LLZZGA",
  flightDeparture: "MNL-HKG 6J 12A 0600",
  flightReturn: "HKG-MNL 6J 12B 1800",
  flightCost: 12000,
  tourName: "Hongkong City Tour",
  tourDate: "2024-06-25",
  tourDescription: null,
  tourRequest: "<p>DISNEYLAND</p>",
  tour_operator: "SMB Operator",
  packageName: "Hotel, Transfer & Tour",
  packageType: null,
  packageCost: 33399,
  total_land_arrangement_cost: 21399,
  total_cost: 33399,
  amountPaid: 33399,
  remainingBalance: 0,
  refundAmount: 0,
  total_visa_cost: 0,
  name_of_agent_1: "Gladex Tours",
  agent_name: null,
  created_by: null,
  // Raw Fusioo IDs that appear after ...fusiooRecord spread — must NOT leak to UI
  destination: ["i563dc5a6d467470496d28a0d9f062a52"],
  hotel_name: ["if3ebdb4e9144483580617ae231341bef"],
  airline_details_1: ["ia1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6"],
  tour_details: ["i892d65b093e84de29130b0b3b2688a8b"],
};

// Mock booking 2 — simulates a tour-heavy booking (GDX 9805, Japan)
const mockBooking2 = {
  gdx: "9805",
  status: "Completed",
  date_created: "2024-10-01",
  payment_type: "Installment",
  mop_used_by_customer: "GCash",
  lead_name: "Maria Santos",
  name_of_guests: "Maria Santos",
  no_of_person: 1,
  email_1: "maria@example.com",
  mobile_1: "09181234567",
  facebook_name: null,
  destinationName: "Japan",
  travel_date: "2024-11-15",
  arrivalDate: "2024-11-15",
  departureDate: "2024-11-22",
  duration: "8 Days 7 Nights",
  customer_type: "International",
  hotelName: "Hotel Monterey Tokyo",
  hotelAddress: null,
  hotelPhone: null,
  room_type: "Deluxe",
  hotel_booking_details: "2 pax, breakfast included",
  airlineName: "Philippine Airlines",
  pnr: "ABCXYZ",
  flightDeparture: "MNL-NRT PR 432 08:00",
  flightReturn: "NRT-MNL PR 433 22:00",
  flightCost: 18000,
  tourName: "SMB OR SASHA OPERATOR",
  tourDate: "2024-11-20",
  tourDescription: null,
  tourRequest: "<p>MT FUJI</p>",
  tour_operator: "Sasha Operator",
  packageName: "Hotel & Tour",
  packageType: null,
  packageCost: 55000,
  total_land_arrangement_cost: 37000,
  total_cost: 55000,
  amountPaid: 30000,
  remainingBalance: 25000,
  refundAmount: 0,
  total_visa_cost: 5000,
  name_of_agent_1: "Gladex Tours",
  agent_name: null,
  created_by: null,
};

function analyzeBooking(booking, label) {
  const tourDesc = fmtValue(booking.tourDescription) || stripHtml(booking.tourRequest);
  const pkgType  = booking.packageType !== booking.packageName ? fmtValue(booking.packageType) : null;
  const agentName = fmtValue(booking.name_of_agent_1) || fmtValue(booking.agent_name);

  const sections = [
    { title: "Booking Summary", fields: [
      { label: "GDX Number",   value: fmtValue(booking.gdx) },
      { label: "Status",       value: fmtValue(booking.status) },
      { label: "Date Created", value: fmtDate(booking.date_created) },
      { label: "Payment Type", value: fmtValue(booking.payment_type) },
      { label: "Payment Mode", value: fmtValue(booking.mop_used_by_customer) },
    ]},
    { title: "Traveler Information", fields: [
      { label: "Lead Traveler",  value: fmtValue(booking.lead_name) },
      { label: "Guests",         value: fmtValue(booking.name_of_guests) },
      { label: "No. of Persons", value: fmtValue(booking.no_of_person) },
      { label: "Email",          value: fmtValue(booking.email_1) },
      { label: "Mobile",         value: fmtValue(booking.mobile_1) },
      { label: "Facebook",       value: fmtValue(booking.facebook_name) },
    ]},
    { title: "Travel Information", fields: [
      { label: "Destination",   value: fmtValue(booking.destinationName) },
      { label: "Travel Date",   value: fmtDate(booking.travel_date) },
      { label: "Arrival",       value: fmtDate(booking.arrivalDate) },
      { label: "Departure",     value: fmtDate(booking.departureDate) },
      { label: "Duration",      value: fmtValue(booking.duration) },
      { label: "Customer Type", value: fmtValue(booking.customer_type) },
    ]},
    { title: "Hotel Information", fields: [
      { label: "Hotel Name",    value: fmtValue(booking.hotelName) },
      { label: "Address",       value: fmtValue(booking.hotelAddress) },
      { label: "Contact",       value: fmtValue(booking.hotelPhone) },
      { label: "Room Type",     value: fmtValue(booking.room_type) },
      { label: "Booking Notes", value: fmtValue(booking.hotel_booking_details) },
    ]},
    { title: "Flight Information", fields: [
      { label: "Airline",     value: fmtValue(booking.airlineName) },
      { label: "PNR",         value: fmtValue(booking.pnr) },
      { label: "Departing",   value: fmtValue(booking.flightDeparture) },
      { label: "Returning",   value: fmtValue(booking.flightReturn) },
      { label: "Flight Cost", value: fmtCurrency(booking.flightCost) },
    ]},
    { title: "Tour Information", fields: [
      { label: "Tour Name",     value: fmtValue(booking.tourName) },
      { label: "Tour Date",     value: fmtDate(booking.tourDate) },
      { label: "Description",   value: tourDesc },
      { label: "Tour Operator", value: fmtValue(booking.tour_operator) },
    ]},
    { title: "Package Information", fields: [
      { label: "Package Name", value: fmtValue(booking.packageName) },
      { label: "Package Type", value: pkgType },
      { label: "Package Cost", value: fmtCurrency(booking.packageCost) },
      { label: "Land Cost",    value: fmtCurrency(booking.total_land_arrangement_cost) },
      { label: "Total Cost",   value: fmtCurrency(booking.total_cost) },
    ]},
    { title: "Payment Information", fields: [
      { label: "Amount Paid",       value: fmtCurrency(booking.amountPaid) },
      { label: "Remaining Balance", value: fmtCurrency(booking.remainingBalance) },
      { label: "Refund Amount",     value: fmtCurrency(booking.refundAmount) },
      { label: "Visa Cost",         value: fmtCurrency(booking.total_visa_cost) },
    ]},
    { title: "Agent Information", fields: [
      { label: "Agent",      value: agentName },
      { label: "Created By", value: fmtValue(booking.created_by) },
    ]},
  ];

  // Trip Highlights
  let travelDate = null;
  if (booking.arrivalDate && booking.departureDate) {
    travelDate = fmtDate(booking.arrivalDate) + " - " + fmtDate(booking.departureDate);
  } else if (booking.travel_date) {
    travelDate = fmtDate(booking.travel_date);
  }
  const highlights = [
    { label: "Destination", value: fmtValue(booking.destinationName) },
    { label: "Travel Date", value: travelDate },
    { label: "Hotel",       value: fmtValue(booking.hotelName) },
    { label: "Airline",     value: fmtValue(booking.airlineName) },
  ].filter(h => h.value);

  const idLeaks = [];
  const emptySections = [];

  console.log("\n" + "=".repeat(60));
  console.log("  " + label);
  console.log("=".repeat(60));

  // Trip Highlights
  console.log("\n  TRIP HIGHLIGHTS:");
  if (highlights.length === 0) {
    console.log("    ⚠ No highlights (all null)");
  } else {
    highlights.forEach(h => console.log("    " + h.label.padEnd(14) + h.value));
  }

  // Sections
  console.log("\n  SECTIONS:");
  for (const section of sections) {
    const visible = section.fields.filter(f => f.value !== null && f.value !== undefined && f.value !== "");
    if (visible.length === 0) {
      emptySections.push(section.title);
      console.log("    ⚠ EMPTY: " + section.title);
      continue;
    }
    console.log("\n    [" + section.title + "]");
    for (const f of visible) {
      const v = String(f.value);
      if (FUSIOO_ID_RE.test(v)) {
        idLeaks.push(section.title + "." + f.label + " = " + v);
        console.log("    ❌ " + f.label.padEnd(20) + v + "  ← RAW FUSIOO ID LEAK!");
      } else {
        console.log("       " + f.label.padEnd(20) + v);
      }
    }
    // Check for raw IDs in array fields (destination, hotel_name, etc.)
    for (const f of section.fields) {
      if (Array.isArray(f.value)) {
        f.value.forEach(item => {
          if (typeof item === "string" && FUSIOO_ID_RE.test(item)) {
            idLeaks.push(section.title + "." + f.label + "[] contains ID: " + item);
          }
        });
      }
    }
  }

  console.log("\n  SUMMARY:");
  console.log("    Sections with data : " + (sections.length - emptySections.length) + " / " + sections.length);
  console.log("    Empty sections     : " + (emptySections.length === 0 ? "none" : emptySections.join(", ")));
  console.log("    Raw ID leaks       : " + (idLeaks.length === 0 ? "none" : idLeaks.join("; ")));

  return { emptySections, idLeaks };
}

const r1 = analyzeBooking(mockBooking,  "GDX 7664 — HONG KONG (Full Payment, Hotel+Tour, All fields)");
const r2 = analyzeBooking(mockBooking2, "GDX 9805 — JAPAN (Installment, Tour with HTML description, Visa cost)");

console.log("\n" + "=".repeat(60));
console.log("  COMBINED REPORT");
console.log("=".repeat(60));

const totalLeaks = [...r1.idLeaks, ...r2.idLeaks];
const totalEmpty = [...r1.emptySections, ...r2.emptySections];

console.log("  Raw ID leaks   : " + (totalLeaks.length === 0 ? "✓ NONE" : "❌ " + totalLeaks.length));
console.log("  Empty sections : " + (totalEmpty.length === 0 ? "✓ NONE" : "⚠ " + totalEmpty.length));
console.log("");
console.log("  Known null fields (expected, from live API):");
console.log("    hotelAddress, hotelPhone — null in Fusioo for tested hotels");
console.log("    room_type               — not populated for these bookings");
console.log("    hotel_booking_details   — sometimes populated (GDX 9805 has it)");
console.log("    tourDescription         — null; tourRequest HTML fallback used");
console.log("    packageType             — hidden when same as packageName");
console.log("    created_by              — internal field, usually null");
console.log("    facebook_name           — GDX 9805 is null (optional field)");
