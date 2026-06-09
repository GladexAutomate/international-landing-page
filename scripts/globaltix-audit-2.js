// GLOBALTIX AUDIT — PHASE 2
// Deep dive on ProductOptions structure + availability endpoint resolution

const BASE_URL = "https://stg-api.globaltix.com";
const AGENT    = "r013193";
const API_KEY  = "9de5f8541a3538476f9e2ca633934c7bde835583bb66ef6bd8c10e40f3b2e1ec";
const USERNAME = "r013193-api@globaltix.com";

function baseHeaders() {
  return {
    "Content-Type": "application/json",
    "x-api-agent": AGENT,
    "x-api-key":   `${AGENT}/${API_KEY}`,
  };
}
async function authenticate() {
  const res  = await fetch(`${BASE_URL}/api/auth/authorize`, {
    method: "POST", headers: baseHeaders(), body: JSON.stringify({ username: USERNAME }),
  });
  const json = await res.json();
  const data = json.data ?? json;
  if (!data.accessToken) throw new Error("Auth: " + JSON.stringify(json));
  return data.accessToken;
}
async function get(path, params, token) {
  let url = `${BASE_URL}${path}`;
  if (params && Object.keys(params).length) {
    const qs = new URLSearchParams(Object.entries(params).filter(([, v]) => v != null)).toString();
    if (qs) url += "?" + qs;
  }
  const res  = await fetch(url, { headers: { ...baseHeaders(), Authorization: `Bearer ${token}` } });
  const text = await res.text();
  let body;
  try { body = JSON.parse(text); } catch { body = text.slice(0, 300); }
  return { status: res.status, url, body };
}
function dump(label, obj) {
  console.log(`\n── ${label} ──`);
  console.log(JSON.stringify(obj, null, 2));
}
function section(title) {
  console.log("\n" + "═".repeat(70));
  console.log(`  ${title}`);
  console.log("═".repeat(70));
}

async function run() {
  const token = await authenticate();
  console.log("[AUTH] OK");

  // ── A. All 16 products — id + name + isOpenDated ─────────────────────────────
  section("A — ALL 16 PRODUCTS (id, name, isOpenDated)");
  const listRes  = await get("/api/product/list", {}, token);
  const products = listRes.body?.data ?? [];
  products.forEach((p, i) => {
    console.log(`  [${String(i).padStart(2)}] id=${p.id} | openDated=${p.isOpenDated} | "${p.name.slice(0, 60)}"`);
  });

  // ── B. ProductOptions for ALL 16 products ──────────────────────────────────────
  section("B — ProductOptions for ALL 16 products");
  const optResults = [];
  for (const p of products) {
    const r = await get("/api/product/options", { id: p.id, isDynamicPrice: false }, token);
    const count = Array.isArray(r.body?.data) ? r.body.data.length : "ERR";
    const ok    = r.body?.success === true && count !== "ERR";
    optResults.push({ id: p.id, name: p.name.slice(0, 50), ok, count, body: r.body });
    console.log(`  ${ok ? "✓" : "✗"} id=${p.id} | options=${count} | "${p.name.slice(0, 50)}"`);
  }

  // Find first product with working options
  const workingOpt = optResults.find(r => r.ok && r.count > 0);
  if (!workingOpt) {
    console.log("\n⚠  No product returned usable options. Cannot continue availability tests.");
    return;
  }
  console.log(`\n→ Best product for availability tests: id=${workingOpt.id} "${workingOpt.name}"`);

  // ── C. Deep-map the ProductOptions structure ────────────────────────────────────
  section("C — ProductOptions FULL STRUCTURE (working product)");
  dump("Full response", workingOpt.body);

  // Extract optionIDs and ticketTypeIDs
  const options = workingOpt.body.data ?? [];
  console.log("\n── FIELD MAP ──");
  options.forEach((opt, i) => {
    console.log(`\nOption[${i}]:`);
    console.log(`  option.id           = ${opt.id}            ← optionID for availability`);
    console.log(`  option.name         = "${opt.name}"`);
    console.log(`  option.isDynamicPricing = ${opt.isDynamicPricing}`);
    console.log(`  option.isCapacity   = ${opt.isCapacity}    ← true = has limited slots`);
    console.log(`  option.timeSlot     = ${JSON.stringify(opt.timeSlot)}`);
    console.log(`  option.visitDate    = ${JSON.stringify(opt.visitDate)}`);
    const tt = opt.ticketType ?? [];
    tt.forEach((t, j) => {
      console.log(`  ticketType[${j}]:`);
      console.log(`    .id              = ${t.id}           ← ticketTypeID for availability`);
      console.log(`    .name            = "${t.name}"`);
      console.log(`    .sku             = "${t.sku}"`);
      console.log(`    .originalPrice   = ${t.originalPrice}`);
      console.log(`    .nettPrice       = ${t.nettPrice}`);
      console.log(`    .minPurchaseQty  = ${t.minPurchaseQty}`);
      console.log(`    .maxPurchaseQty  = ${t.maxPurchaseQty}`);
      console.log(`    .ageFrom         = ${t.ageFrom}`);
      console.log(`    .ageTo           = ${t.ageTo}`);
    });
  });

  // First ticketTypeID for availability calls
  const firstOption    = options[0];
  const firstTicketType = (firstOption?.ticketType ?? [])[0];
  const optionId       = firstOption?.id;
  const ticketTypeId   = firstTicketType?.id;
  console.log(`\n→ Will use optionId=${optionId}, ticketTypeID=${ticketTypeId} for availability calls`);

  // ── D. Availability — targeted calls with REAL IDs ─────────────────────────────
  section("D — AVAILABILITY with real ticketTypeID + optionID");
  const dFrom = "2026-07-01";
  const dTo   = "2026-07-31";

  const paramSets = [
    { label: "dateFrom+dateTo+ticketTypeID",               params: { dateFrom: dFrom, dateTo: dTo, ticketTypeID: ticketTypeId } },
    { label: "dateFrom+dateTo+ticketTypeID+optionID",       params: { dateFrom: dFrom, dateTo: dTo, ticketTypeID: ticketTypeId, optionID: optionId } },
    { label: "dateFrom+dateTo+ticketTypeId (camelCase)",    params: { dateFrom: dFrom, dateTo: dTo, ticketTypeId: ticketTypeId, optionId: optionId } },
    { label: "with id=productId added",                     params: { dateFrom: dFrom, dateTo: dTo, ticketTypeID: ticketTypeId, optionID: optionId, id: workingOpt.id } },
    { label: "with productId param",                        params: { dateFrom: dFrom, dateTo: dTo, ticketTypeID: ticketTypeId, optionID: optionId, productId: workingOpt.id } },
  ];

  const endpointsToTry = ["/api/availability", "/api/schedule", "/api/timeslot"];

  for (const ep of endpointsToTry) {
    for (const { label, params } of paramSets) {
      const r = await get(ep, params, token);
      const isHtml   = typeof r.body === "string" && r.body.includes("<html");
      const isError  = r.body?.error || r.body?.success === false;
      const status   = r.status;
      if (!isHtml) {
        const tag = (!isError && status === 200) ? "✓ SUCCESS" : `✗ ${status}`;
        console.log(`\n${tag} — ${ep} [${label}]`);
        console.log(`  URL: ${r.url}`);
        if (!isError && status === 200) {
          dump("RESPONSE", r.body);
        } else {
          console.log(`  Error: ${JSON.stringify(r.body?.error || r.body)?.slice(0, 200)}`);
        }
      } else {
        console.log(`  403/HTML — ${ep} [${label}]`);
      }
    }
  }

  // ── E. /api/event deep probe ────────────────────────────────────────────────────
  section("E — /api/event DEEP PROBE");
  // The first pass got error.event.time.blank — try adding various time params
  const eventParamSets = [
    { label: "with eventTime",                  params: { dateFrom: dFrom, dateTo: dTo, ticketTypeID: ticketTypeId, eventTime: "09:00" } },
    { label: "with time",                       params: { dateFrom: dFrom, dateTo: dTo, ticketTypeID: ticketTypeId, time: "09:00" } },
    { label: "with timeslot",                   params: { dateFrom: dFrom, dateTo: dTo, ticketTypeID: ticketTypeId, timeslot: "09:00" } },
    { label: "with timeSlot",                   params: { dateFrom: dFrom, dateTo: dTo, ticketTypeID: ticketTypeId, timeSlot: "09:00" } },
    { label: "optionID+eventTime",              params: { dateFrom: dFrom, dateTo: dTo, ticketTypeID: ticketTypeId, optionID: optionId, eventTime: "09:00" } },
    { label: "product id only",                 params: { id: workingOpt.id, dateFrom: dFrom, dateTo: dTo } },
    { label: "ticketTypeID+optionID no dates",  params: { ticketTypeID: ticketTypeId, optionID: optionId } },
    { label: "single date no time",             params: { date: dFrom, ticketTypeID: ticketTypeId, optionID: optionId } },
    { label: "startDate+endDate",               params: { startDate: dFrom, endDate: dTo, ticketTypeID: ticketTypeId } },
  ];

  for (const { label, params } of eventParamSets) {
    const r = await get("/api/event", params, token);
    const isError = r.body?.error || r.body?.success === false;
    const tag = (!isError && r.status === 200) ? "✓ SUCCESS" : `✗ ${r.status}`;
    console.log(`\n${tag} — /api/event [${label}]`);
    console.log(`  URL: ${r.url}`);
    if (!isError && r.status === 200) {
      dump("RESPONSE", r.body);
    } else {
      console.log(`  Error: ${JSON.stringify(r.body?.error || r.body)?.slice(0, 200)}`);
    }
  }

  // ── F. ProductInfo — check timeSlot and isOpenDated fields ────────────────────
  section("F — ProductInfo for working product (timeSlot / schedule fields)");
  const infoRes = await get("/api/product/info", { id: workingOpt.id }, token);
  const info    = infoRes.body?.data ?? infoRes.body;
  if (info) {
    const scheduleFields = ["timeSlot", "timeslot", "schedule", "availability",
      "isOpenDated", "advanceBooking", "operatingHours", "startDate", "endDate",
      "visitDate", "dateRange", "bookingWindow"];
    console.log("\nSchedule/time-related fields in ProductInfo:");
    scheduleFields.forEach(f => {
      if (info[f] !== undefined) console.log(`  "${f}": ${JSON.stringify(info[f])}`);
    });
    dump("Full ProductInfo", info);
  }

  console.log("\n" + "═".repeat(70));
  console.log("  AUDIT PHASE 2 COMPLETE");
  console.log("═".repeat(70) + "\n");
}

run().catch(err => { console.error("ERROR:", err); process.exit(1); });
