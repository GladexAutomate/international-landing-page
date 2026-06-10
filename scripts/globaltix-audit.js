// GLOBALTIX API VERIFICATION AUDIT
// Calls the real staging API and documents actual response shapes.
// Run: node scripts/globaltix-audit.js

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
    method:  "POST",
    headers: baseHeaders(),
    body:    JSON.stringify({ username: USERNAME }),
  });
  const json = await res.json();
  const data = json.data ?? json;
  if (!data.accessToken) throw new Error("Auth failed: " + JSON.stringify(json));
  console.log(`[AUTH] OK — reseller: ${data.user?.reseller?.name}, currency: ${data.user?.currency?.code}`);
  return data.accessToken;
}

async function get(path, params, token) {
  let url = `${BASE_URL}${path}`;
  if (params && Object.keys(params).length) {
    const qs = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v != null)
    ).toString();
    if (qs) url += "?" + qs;
  }
  const res = await fetch(url, {
    headers: { ...baseHeaders(), Authorization: `Bearer ${token}` },
  });
  const text = await res.text();
  try   { return { status: res.status, url, body: JSON.parse(text) }; }
  catch { return { status: res.status, url, body: text }; }
}

function section(title) {
  console.log("\n" + "═".repeat(70));
  console.log(`  ${title}`);
  console.log("═".repeat(70));
}

function dump(label, obj) {
  console.log(`\n── ${label} ──`);
  console.log(JSON.stringify(obj, null, 2));
}

async function run() {
  // ── 1. Authenticate ──────────────────────────────────────────────────────────
  section("STEP 1 — AUTHENTICATE");
  const token = await authenticate();

  // ── 2. Product List — grab first few product IDs ──────────────────────────────
  section("STEP 2 — PRODUCT LIST (sample)");
  const listRes = await get("/api/product/list", {}, token);
  const products = listRes.body?.data ?? [];
  console.log(`Status: ${listRes.status} | Total products: ${products.length}`);

  // Print first 3 products (id + name + city only)
  products.slice(0, 3).forEach((p, i) => {
    console.log(`  [${i}] id=${p.id} | name="${p.name}" | city="${p.city}" | isOpenDated=${p.isOpenDated}`);
  });

  if (!products.length) { console.error("No products — cannot continue"); return; }

  // Use first product for deeper tests
  const p0 = products[0];
  const p1 = products[1] ?? p0;
  console.log(`\n→ Using product[0]: id=${p0.id} "${p0.name}"`);

  // ── 3. ProductOptions — primary audit target ──────────────────────────────────
  section("STEP 3 — PRODUCT OPTIONS");
  const optRes = await get("/api/product/options", { id: p0.id, isDynamicPrice: false }, token);
  console.log(`URL:    ${optRes.url}`);
  console.log(`Status: ${optRes.status}`);
  dump("FULL RAW RESPONSE", optRes.body);

  // Also try with isDynamicPrice=true if first failed
  if (optRes.body?.error || !optRes.body?.data) {
    console.log("\n→ isDynamicPrice=false returned error. Trying isDynamicPrice=true...");
    const optRes2 = await get("/api/product/options", { id: p0.id, isDynamicPrice: true }, token);
    dump("ProductOptions (isDynamicPrice=true)", optRes2.body);
  }

  // Try a second product
  if (p1.id !== p0.id) {
    console.log(`\n→ Trying second product: id=${p1.id} "${p1.name}"`);
    const optRes3 = await get("/api/product/options", { id: p1.id, isDynamicPrice: false }, token);
    console.log(`Status: ${optRes3.status}`);
    dump("ProductOptions for product[1]", optRes3.body);
  }

  // ── 4. Availability endpoint discovery ───────────────────────────────────────
  section("STEP 4 — AVAILABILITY ENDPOINT DISCOVERY");

  const today  = new Date();
  const plus60 = new Date(today.getTime() + 60 * 24 * 60 * 60 * 1000);
  const fmt    = d => d.toISOString().split("T")[0];
  const dFrom  = fmt(today);
  const dTo    = fmt(plus60);

  // Get a ticketTypeID from the options response if we have one
  const optData   = optRes.body?.data;
  const firstOpt  = Array.isArray(optData) ? optData[0] : null;
  const firstTicketTypeId = firstOpt?.ticketTypeId ?? firstOpt?.ticketTypeID ?? firstOpt?.id ?? 1;
  console.log(`\nUsing ticketTypeID candidate: ${firstTicketTypeId} (from ProductOptions: ${!!firstOpt})`);
  console.log(`Date range: ${dFrom} to ${dTo}`);

  // Try every plausible endpoint path
  const candidatePaths = [
    "/api/availability",
    "/api/schedule",
    "/api/schedule/availability",
    "/api/product/availability",
    "/api/event",
    "/api/event/availability",
    "/api/product/schedule",
    "/api/product/timeslot",
    "/api/timeslot",
    "/api/availability/schedule",
  ];

  const params = {
    dateFrom:     dFrom,
    dateTo:       dTo,
    ticketTypeID: firstTicketTypeId,
    id:           p0.id,
    productId:    p0.id,
  };

  for (const path of candidatePaths) {
    const r = await get(path, params, token);
    const isError = typeof r.body === "string" || r.body?.error || r.status >= 400;
    const tag = isError ? "✗" : "✓";
    console.log(`  ${tag} ${r.status} — ${r.url}`);
    if (!isError) {
      dump(`SUCCESS — ${path}`, r.body);
    } else if (r.status !== 404 && r.status !== 405) {
      // Print non-404 errors (may contain useful hints)
      console.log(`    Error body: ${JSON.stringify(r.body).slice(0, 200)}`);
    }
  }

  // ── 5. Try availability with just dateFrom/dateTo/ticketTypeID (no productId) ─
  section("STEP 5 — AVAILABILITY (minimal params)");
  const minParams = { dateFrom: dFrom, dateTo: dTo, ticketTypeID: firstTicketTypeId };
  for (const path of ["/api/availability", "/api/schedule", "/api/event"]) {
    const r = await get(path, minParams, token);
    console.log(`  ${r.status} — ${r.url}`);
    if (r.body && !r.body?.error && r.status < 400) {
      dump(`Response — ${path} (minimal)`, r.body);
    }
  }

  // ── 6. Raw ProductOptions field inventory ─────────────────────────────────────
  section("STEP 6 — PRODUCT OPTIONS FIELD INVENTORY");
  if (firstOpt) {
    console.log("All field names present in first option object:");
    Object.keys(firstOpt).forEach(k => {
      console.log(`  "${k}" : ${JSON.stringify(firstOpt[k])?.slice(0, 80)}`);
    });
  } else {
    console.log("No option data available to inventory.");
    console.log("Raw options body:", JSON.stringify(optData, null, 2)?.slice(0, 500));
  }

  console.log("\n" + "═".repeat(70));
  console.log("  AUDIT COMPLETE");
  console.log("═".repeat(70) + "\n");
}

run().catch(err => { console.error("AUDIT ERROR:", err); process.exit(1); });
