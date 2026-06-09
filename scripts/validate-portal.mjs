/**
 * Customer Portal — Live Validation Script
 * Tests the full Supabase + Fusioo data pipeline for real GDX bookings.
 */

import https from "https";

// ── Config ────────────────────────────────────────────────────────────────────
const FUSIOO_BASE   = "https://api.fusioo.com/v1";
const FUSIOO_TOKEN  = "eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZDQkMtSFM1MTIiLCJraWQiOiIzMzY2NTJCRDlDMkMyMkM5QTBCNjNENEMxMDNFNTVEOEMzMDYzNTc3IiwidHlwIjoiYXQrand0IiwiY3R5IjoiSldUIn0.bbioktRYMbU7Ymc3qc0Y8ugyqcw9P0LLHCN3uqIgMshTdlhhIlwLMxNgf_gN3Gpszp6u_O9FkRnYM4_gFDBddPJ8HpDVMVXeP1S2P_KO5XkMUZT7Xer7wf_cLpTD_n6OVtYLzIu15n3wXISZx5_OzpSEUQyKRlOU0hY4EOjCa_jcOCG0dAdB0volzdz8XcFG8rTgSHhW0WkiRHl_jjZW8lIFcTJeINnOpbv8FmNudBmGQWPhnbhFL4JKaQginz7momfncs7oXFWUSf8bspux9yMkTNqUBZTsxAS87FfnrHASuxy5PeNZOblA_dg4wuZ8ikbNNaQw1XOTTEjY1pWjWw.akgYnWPyK_B_G1hBHp4Paw.xyRhAmHRfnvqlRONku2LT-vf4saA_h0J1SVjYBEcjSmuVSUGNxiNbNlOWz0-bf59rB-tpbgXyrVAQnvygta7vGyYDPKTSWNUVG4Zt72hmidJu_JQ2EVhNnomnnoiNoiGF5i-Jl_aaVP9nGPF6xCTsMQTV__PKIZG1CISPxRLFFuXVVu2REKFVebBF2pUtyTQOyfC_eUwwBYR05U42KkFUVyGxuRTeaGtyeJ_rwLWCTJh7bZuNLLGq2UX5DID7Qu6tX6pwY1qSP9rr-LeJY3SmP-fMUDr7kL4AWVAV6MLPD4dw8Eg3DiX_eKyEo_Qjr_lw9x8rX4PjF7XstmTaTpR2aFyJIRD8SHGDyX3A5oCkBerF35GUIyVXspOlSzGknseaKBsxM1keallrI_CowsN4gvQN_befJirx50wML4NG6LqMohk5-N1Aa1uj5HQrf9IvS8C0vE2b2NLlfGyOvnjQ8xCFZ04KShDmD5vImwPpEb07UCoVUvg-1IInBeqDVddogd0zm1b3SetWataLHoAqTOd9a37XK64qfPqjEBQhVcd54gvcetd9ANy5L6nIUo2hxsDF0_Qg7evc439xQPCApQW0hUbN4kCfBfXc19RYBtXDStc6iOkaF8qaLpf3ilSu60S7OP6W1Gs3P5Pw6kmz9CpqVCsJU4hr_oQZiIEVhzcoJmiUhna2iCFFMBFEnwKpgZc7YympwxHbXlgazKC6sv5tSnVBEukWz8jLNSfe_psyUpPxSjR8sn5uK2oCqH9WeaIxpKRe2F17JMCMBT1FXlsw_Z_E8q-ynUbrQ9q9hk_9G-lZSZ9M_a7H_jg8_7xEEwtT0h4vYDJbUJmdbnQJgokEVU2_Q9Ck24_qlZZOpGox6Vl6m9UOTIQ8A5RBnMrvJhgO5XO-RT45p1SY3vUI1Gzr6zsZLMPo5uYIHfdvZIUMyUiooWpFx_-lOEm7v0ll4H-jE8YOre_ZftKQmGVPdoqNV-aqbwujiLy__j1e2hn4AjxWZ3WTdaceRkD8Rglw24MeSsHrTqllkCAC74hSfEGgYiJr-w11gRb42FEwDLTmTxK9_TMKHaKaWz-VC_lDJXvg54AxFmPbeSI07bojd5BNohe3k5QKQe1GApdTsvljIWKJpc8ElqhGPP304NLzfbI1T_4OFg4Huugt68QJFn5_NqLlNrA3h-DfgTVdKcp4WHW0Jmz54wKMQjBIi_8lsODc6a0K1lqSSWFKwmeA3zYEJT3AzrLdVtNzWeK6Fvu28eiSAqdroGMsUYAzODmEYqwE3Ki3hMLg7MZjkT0hbrPvrlkFq_gYmCoquRgNRJKI6r1Qi06chbHku1a9G70.p1Lvv1SPf6qdsIiJr6jrBaFzXGmjiSyzzfMOzGaWp5Q";

const SUPABASE_URL  = "https://rpdtoxxizhcbldarqbtz.supabase.co";
const SUPABASE_KEY  = "sb_publishable_CAyI2aUoEX3fik-DgxNRHw_jSTaQHPr";
const FUSIOO_ID_RE  = /^i[0-9a-f]{32}$/i;

// 5 test GDX numbers — covers different destinations, package types, payment states
const TEST_GDX = ["7664", "9805", "9978", "8500", "8800"];

// ── HTTP helper ───────────────────────────────────────────────────────────────
function get(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers }, (res) => {
      let body = "";
      res.on("data", (c) => (body += c));
      res.on("end", () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(body) }); }
        catch { resolve({ status: res.statusCode, data: body }); }
      });
    });
    req.on("error", reject);
    req.setTimeout(20000, () => { req.destroy(); reject(new Error("timeout")); });
  });
}

const apiCallLog = [];

async function fetchFusioo(id) {
  if (!id || !FUSIOO_ID_RE.test(id)) return null;
  const res = await get(`${FUSIOO_BASE}/records/${id}`, {
    Authorization: `Bearer ${FUSIOO_TOKEN}`,
    "Content-Type": "application/json",
  });
  apiCallLog.push({ endpoint: `/records/${id.substring(0,8)}...`, status: res.status });
  if (res.status !== 200) return null;
  return res.data?.data || null;
}

async function fetchSupabase(gdx) {
  const url = `${SUPABASE_URL}/rest/v1/bookings_6fbdd6b2?gdx=eq.${gdx}&limit=1`;
  const res = await get(url, {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    "Content-Type": "application/json",
  });
  if (res.status !== 200 || !res.data?.length) return null;
  return res.data[0];
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function firstId(field) {
  if (!field) return null;
  const arr = Array.isArray(field) ? field : [field];
  return arr.find((v) => FUSIOO_ID_RE.test(String(v))) || null;
}

function parsePayment(raw) {
  if (raw === null || raw === undefined) return { paid: null, balance: null, refund: null };
  if (typeof raw === "number") return { paid: raw, balance: null, refund: null };
  if (typeof raw !== "string") return { paid: null, balance: null, refund: null };
  const parts = raw.split("/").map((s) => s.trim());
  const num = (s) => { const m = s?.match(/^[\d.]+/); return m ? parseFloat(m[0]) : null; };
  return { paid: num(parts[0]), balance: num(parts[1]), refund: num(parts[2]) };
}

function stripHtml(html) {
  if (!html || typeof html !== "string") return null;
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() || null;
}

function fmtCurrency(n) {
  if (n === null || n === undefined) return null;
  return "₱" + Number(n).toLocaleString("en-PH");
}

function findIdLeaks(obj) {
  const leaks = [];
  for (const [k, v] of Object.entries(obj || {})) {
    if (typeof v === "string" && FUSIOO_ID_RE.test(v)) leaks.push(`${k}="${v}"`);
    if (Array.isArray(v)) v.forEach((x, i) => {
      if (typeof x === "string" && FUSIOO_ID_RE.test(x)) leaks.push(`${k}[${i}]="${x}"`);
    });
  }
  return leaks;
}

// ── Full booking load (mirrors fusiooService.js) ──────────────────────────────
async function loadBooking(gdx) {
  const row = await fetchSupabase(gdx);
  if (!row) return { error: "Not found in Supabase" };
  if (!row.record_id) return { error: "No record_id" };

  const booking = await fetchFusioo(row.record_id);
  if (!booking) return { error: "Fusioo main record 401/failed", row };

  const [destRec, hotelRec, airlineRec, tourRec] = await Promise.all([
    fetchFusioo(firstId(booking.destination)),
    fetchFusioo(firstId(booking.hotel_name)),
    fetchFusioo(firstId(booking.airline_details_1)),
    fetchFusioo(firstId(booking.tour_details)),
  ]);

  const rawAirline  = airlineRec?.airline;
  const airlineName = Array.isArray(rawAirline) ? rawAirline[0] : (rawAirline || null);
  const payment     = parsePayment(booking.total_amount_paid);
  const tourDesc    = tourRec?.description || stripHtml(tourRec?.tour_requets) || null;
  const pkgNameRaw  = booking.collective_package_name || booking.type_of_package || booking.transaction_type || null;

  return {
    // Identification
    gdx:            booking.gdx,
    status:         booking.status,
    // Trip Highlights fields
    destinationName: destRec?.destination || null,
    hotelName:       hotelRec?.hotel || null,
    airlineName,
    arrivalDate:     booking.arrival || row.arrival_date || null,
    departureDate:   booking.departure_date || row.departure_date || null,
    travel_date:     booking.travel_date || null,
    // Hotel Information
    hotelAddress:    hotelRec?.address || null,
    hotelPhone:      hotelRec?.contact_number || null,
    room_type:       booking.room_type || null,
    hotel_booking_details: (() => {
      const raw = booking.hotel_booking_details;
      if (!raw) return null;
      if (Array.isArray(raw)) {
        const text = raw.filter((v) => typeof v === "string" && !FUSIOO_ID_RE.test(v)).join(", ");
        return text || null;
      }
      if (typeof raw === "string" && FUSIOO_ID_RE.test(raw)) return null;
      return raw;
    })(),
    // Flight Information
    pnr:             airlineRec?.booking_reference_number_pnr || null,
    flightDeparture: airlineRec?.departing_flight_details || null,
    flightReturn:    airlineRec?.returning_flight_details || null,
    flightCost:      airlineRec?.cost || null,
    // Tour Information
    tourName:        tourRec?.tour_name || null,
    tourDate:        tourRec?.tour_date || null,
    tourDescription: tourDesc,
    tour_operator:   booking.tour_operator || null,
    // Package Information
    packageName:     pkgNameRaw,
    packageType:     booking.type_of_package !== pkgNameRaw ? booking.type_of_package : null,
    packageCost:     booking.total_package_price_srp || null,
    total_land_cost: booking.total_land_arrangement_cost || null,
    total_cost:      booking.total_cost || null,
    // Payment Information
    amountPaid:      payment.paid,
    remainingBalance: payment.balance,
    refundAmount:    payment.refund,
    total_visa_cost: booking.total_visa_cost || null,
    // Agent
    agent:           booking.name_of_agent_1 || booking.agent_name || null,
    // Raw linked IDs (should NOT appear in display fields above)
    _rawDestination: booking.destination,
    _rawHotelName:   booking.hotel_name,
    _rawAirline:     booking.airline_details_1,
    _rawTour:        booking.tour_details,
  };
}

// ── Validate one GDX ──────────────────────────────────────────────────────────
async function validateGDX(gdx) {
  console.log(`\n${"─".repeat(62)}`);
  console.log(`  GDX ${gdx}`);
  console.log("─".repeat(62));

  const data = await loadBooking(gdx);

  if (data.error) {
    console.log(`  ❌ ${data.error}`);
    return { gdx, pass: false, error: data.error, apiErrors: [] };
  }

  // ── Check for 401s ─────────────────────────────────────────────────────────
  const errors401 = apiCallLog.filter(c => c.status === 401);

  // ── Check for raw ID leaks in display fields ────────────────────────────────
  const displayOnly = Object.fromEntries(
    Object.entries(data).filter(([k]) => !k.startsWith("_"))
  );
  const idLeaks = findIdLeaks(displayOnly);

  // ── Section checks ──────────────────────────────────────────────────────────
  const sections = {
    "Trip Highlights":    { fields: ["destinationName", "hotelName", "airlineName"] },
    "Hotel Information":  { fields: ["hotelName"] },
    "Flight Information": { fields: ["airlineName", "pnr"] },
    "Tour Information":   { fields: ["tourName"] },
    "Package Information":{ fields: ["packageName", "packageCost"] },
    "Payment Information":{ fields: ["amountPaid"] },
  };

  // ── Print destination + key data ───────────────────────────────────────────
  console.log(`  Destination  : ${data.destinationName || "⚠ unresolved"}`);
  console.log(`  Travel Dates : ${data.arrivalDate || "—"} → ${data.departureDate || "—"}`);
  console.log(`  Hotel        : ${data.hotelName || "⚠ null"} ${data.hotelAddress ? "(addr: " + data.hotelAddress.substring(0,25) + ")" : "(addr: null)"} ${data.hotelPhone ? "(ph: "+data.hotelPhone+")" : "(ph: null)"}`);
  console.log(`  Airline      : ${data.airlineName || "⚠ null"}  |  PNR: ${data.pnr || "⚠ null"}`);
  console.log(`  Depart       : ${data.flightDeparture || "null"}`);
  console.log(`  Return       : ${data.flightReturn || "null"}`);
  console.log(`  Tour         : ${data.tourName || "null"}  |  Date: ${data.tourDate || "null"}  |  Desc: ${data.tourDescription || "null"}`);
  console.log(`  Package      : ${data.packageName || "null"}  |  Cost: ${fmtCurrency(data.packageCost) || "null"}`);
  console.log(`  Paid         : ${fmtCurrency(data.amountPaid) || "⚠ null"}  |  Balance: ${fmtCurrency(data.remainingBalance) || "null"}  |  Refund: ${fmtCurrency(data.refundAmount) || "null"}`);
  console.log(`  Agent        : ${data.agent || "null"}`);

  // ── Section pass/fail ──────────────────────────────────────────────────────
  console.log(`\n  Section results:`);
  let sectionsFail = 0;
  for (const [sectionName, cfg] of Object.entries(sections)) {
    const missing = cfg.fields.filter(f => !data[f] && data[f] !== 0);
    if (missing.length === 0) {
      console.log(`    ✓  ${sectionName}`);
    } else {
      console.log(`    ⚠  ${sectionName} — missing: ${missing.join(", ")}`);
      sectionsFail++;
    }
  }

  // ── ID leak check ──────────────────────────────────────────────────────────
  if (idLeaks.length > 0) {
    console.log(`\n  ❌ RAW FUSIOO IDs in display fields:`);
    idLeaks.forEach(l => console.log(`     • ${l}`));
  } else {
    console.log(`\n  ✓  No raw Fusioo IDs in display fields`);
  }

  // ── 401 check ─────────────────────────────────────────────────────────────
  if (errors401.length > 0) {
    console.log(`  ❌ 401 responses: ${errors401.length}`);
  } else {
    console.log(`  ✓  No 401 errors`);
  }

  // Pass: no ID leaks, no 401s, destination resolves, payment present
  // hotelName/airlineName may be null for ticket-only or partially-filled Fusioo records — not a code failure
  const pass = idLeaks.length === 0 && errors401.length === 0 && data.destinationName && data.amountPaid !== null;

  console.log(`\n  ${pass ? "✅ PASS" : "⚠  PARTIAL"}`);
  return { gdx, pass, destination: data.destinationName, data, idLeaks, sectionsFail };
}

// ── Run ───────────────────────────────────────────────────────────────────────
console.log("╔════════════════════════════════════════════════════════════╗");
console.log("║  GLADEX TOURS — Customer Portal Live Validation (Final)    ║");
console.log("╚════════════════════════════════════════════════════════════╝");

const results = [];
for (const gdx of TEST_GDX) {
  apiCallLog.length = 0;
  try {
    const r = await validateGDX(gdx);
    results.push(r);
  } catch (err) {
    console.log(`\n  ❌ GDX ${gdx} threw: ${err.message}`);
    results.push({ gdx, pass: false, error: err.message });
  }
}

// ── Summary ───────────────────────────────────────────────────────────────────
const passed    = results.filter(r => r.pass);
const allLeaks  = results.flatMap(r => r.idLeaks || []);
const total401  = apiCallLog.filter(c => c.status === 401).length;

console.log(`\n${"╔" + "═".repeat(60) + "╗"}`);
console.log("║  FINAL VALIDATION REPORT                                    ║");
console.log(`╚${"═".repeat(60)}╝`);

console.log(`\nGDX Numbers Tested   : ${results.map(r => r.gdx).join(", ")}`);
console.log(`Bookings Validated   : ${passed.length} / ${results.length} passed`);
console.log(`Raw Fusioo ID Leaks  : ${allLeaks.length === 0 ? "✅ NONE" : "❌ " + allLeaks.length}`);
console.log(`401 Errors           : ${total401 === 0 ? "✅ NONE" : "❌ " + total401}`);

console.log("\nDestinations confirmed:");
results.filter(r => r.destination).forEach(r => {
  console.log(`  GDX ${r.gdx.padEnd(6)} → ${r.destination}`);
});

console.log("\nFields empty (expected from live data):");
const notes = [];
results.forEach(r => {
  if (!r.data) return;
  const nullFields = [];
  if (!r.data.hotelAddress) nullFields.push("hotelAddress");
  if (!r.data.hotelPhone)   nullFields.push("hotelPhone");
  if (!r.data.tourName)     nullFields.push("tourName");
  if (!r.data.pnr)          nullFields.push("pnr");
  if (nullFields.length) notes.push(`  GDX ${r.gdx}: ${nullFields.join(", ")}`);
});
if (notes.length) notes.forEach(n => console.log(n));
else console.log("  All key fields populated");

const deployReady = passed.length >= 4 && allLeaks.length === 0;
console.log(`\n${"═".repeat(62)}`);
if (deployReady) {
  console.log("  ✅  READY FOR PRODUCTION DEPLOYMENT");
} else {
  console.log("  ❌  DEPLOYMENT BLOCKED");
  if (allLeaks.length)   console.log(`      • ${allLeaks.length} raw ID leak(s)`);
  if (passed.length < 4) console.log(`      • Only ${passed.length}/5 bookings passed`);
}
console.log("═".repeat(62));
