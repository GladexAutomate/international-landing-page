/**
 * FUSIOO API AUDIT SCRIPT
 * ─────────────────────────────────────────────────────────────────────────────
 * Run:  node scripts/fusioo-audit.mjs
 *
 * PURPOSE
 * Authenticates against the Fusioo API, lists all accessible apps, and
 * searches for the two sample booking reference IDs to identify which
 * Fusioo app holds destination and hotel records.
 *
 * FILL IN YOUR CREDENTIALS BELOW
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ── CREDENTIALS — fill these in ──────────────────────────────────────────────
const FUSIOO_CLIENT_ID     = "";   // ← paste client_id
const FUSIOO_CLIENT_SECRET = "";   // ← paste client_secret
const FUSIOO_ACCESS_TOKEN  = "";   // ← paste existing access_token (if any)
const FUSIOO_BASE_URL      = "https://www.fusioo.com/api/v1"; // ← adjust if different

// ── TARGET IDs to resolve ─────────────────────────────────────────────────────
const TARGET_DESTINATION_ID = "ide1eb009d1d54d79a2353c9cf4f12841";
const TARGET_HOTEL_ID       = "i2cc354725b444e9f81b700a293e48035";

// ─────────────────────────────────────────────────────────────────────────────

let token = FUSIOO_ACCESS_TOKEN;

// ── HTTP helper ───────────────────────────────────────────────────────────────
async function api(path, options = {}) {
  const url  = `${FUSIOO_BASE_URL}${path}`;
  const resp = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const text = await resp.text();
  let json;
  try { json = JSON.parse(text); } catch { json = { raw: text }; }

  if (!resp.ok) {
    throw Object.assign(new Error(`HTTP ${resp.status} on ${path}`), { status: resp.status, body: json });
  }
  return json;
}

// ── Step 1: Authenticate ──────────────────────────────────────────────────────
async function authenticate() {
  if (token) {
    console.log("✅  Using provided access token — skipping OAuth flow.");
    return token;
  }

  if (!FUSIOO_CLIENT_ID || !FUSIOO_CLIENT_SECRET) {
    throw new Error("No credentials provided. Fill in FUSIOO_CLIENT_ID and FUSIOO_CLIENT_SECRET (or FUSIOO_ACCESS_TOKEN).");
  }

  console.log("🔐  Authenticating via client_credentials grant…");
  const resp = await fetch(`${FUSIOO_BASE_URL}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type:    "client_credentials",
      client_id:     FUSIOO_CLIENT_ID,
      client_secret: FUSIOO_CLIENT_SECRET,
    }),
  });

  const data = await resp.json();

  if (!resp.ok || !data.access_token) {
    console.error("❌  Auth failed:", JSON.stringify(data, null, 2));
    throw new Error("Authentication failed");
  }

  token = data.access_token;
  console.log("✅  Authenticated. Token expires in:", data.expires_in, "seconds");
  return token;
}

// ── Step 2: List all apps ─────────────────────────────────────────────────────
async function listApps() {
  console.log("\n📋  Fetching list of accessible Fusioo apps…");
  const data = await api("/apps");
  const apps = data.data || data.apps || data || [];

  console.log(`\n   Found ${Array.isArray(apps) ? apps.length : "?"} apps:\n`);

  const list = Array.isArray(apps) ? apps : [];
  list.forEach((app, i) => {
    const id   = app.id   || app.app_id  || "?";
    const name = app.name || app.title   || app.label || "unnamed";
    console.log(`   ${String(i + 1).padStart(3)}.  ${name.padEnd(40)}  id: ${id}`);
  });

  return list;
}

// ── Step 3: Fetch records from a single app by ID ────────────────────────────
async function fetchRecord(appId, recordId) {
  try {
    const data = await api(`/apps/${appId}/records/${recordId}`);
    return data;
  } catch (err) {
    if (err.status === 404) return null;
    throw err;
  }
}

// ── Step 4: Search an app for a string (broad ilike search) ──────────────────
async function searchApp(appId, query) {
  try {
    const data = await api(`/apps/${appId}/records?search=${encodeURIComponent(query)}&limit=5`);
    return data.data || data.records || data || [];
  } catch {
    return [];
  }
}

// ── Step 5: Try to retrieve record by ID across all apps ─────────────────────
async function findRecordAcrossApps(apps, targetId, label) {
  console.log(`\n🔍  Searching for ${label} ID: ${targetId}`);
  const strippedId = targetId.startsWith("i") ? targetId.slice(1) : targetId;

  for (const app of apps) {
    const appId   = app.id || app.app_id;
    const appName = app.name || app.title || appId;

    // Direct fetch by record ID
    const record = await fetchRecord(appId, targetId);
    if (record) {
      console.log(`\n   ✅  FOUND in app: "${appName}" (id: ${appId})`);
      console.log("   Record:", JSON.stringify(record, null, 4));
      return { app, record };
    }

    // Try without the leading "i" (some Fusioo record IDs are stored without prefix)
    if (strippedId !== targetId) {
      const record2 = await fetchRecord(appId, strippedId);
      if (record2) {
        console.log(`\n   ✅  FOUND (no prefix) in app: "${appName}" (id: ${appId})`);
        console.log("   Record:", JSON.stringify(record2, null, 4));
        return { app, record: record2 };
      }
    }
  }

  console.log(`   ⚠️   Not found via direct ID lookup across ${apps.length} apps.`);
  return null;
}

// ── Step 6: Search apps by name keywords ──────────────────────────────────────
async function findRelevantApps(apps) {
  const keywords = {
    destination: ["destination", "tour", "package", "travel", "place", "location"],
    hotel:       ["hotel", "accommodation", "property", "room", "resort"],
    airline:     ["airline", "flight", "air", "carrier"],
  };

  const matches = { destination: [], hotel: [], airline: [], other: [] };

  for (const app of apps) {
    const name = (app.name || app.title || "").toLowerCase();
    let matched = false;
    for (const [cat, kws] of Object.entries(keywords)) {
      if (kws.some((kw) => name.includes(kw))) {
        matches[cat].push(app);
        matched = true;
        break;
      }
    }
    if (!matched) matches.other.push(app);
  }

  console.log("\n📂  Apps categorised by name:");
  for (const [cat, list] of Object.entries(matches)) {
    if (list.length > 0) {
      console.log(`\n   ${cat.toUpperCase()}:`);
      list.forEach((a) => console.log(`      - ${a.name || a.title || a.id}  (id: ${a.id || a.app_id})`));
    }
  }

  return matches;
}

// ── Step 7: Sample first few records from an app to understand its schema ─────
async function sampleApp(appId, appName) {
  console.log(`\n   📄  Sampling schema from "${appName}"…`);
  try {
    const data = await api(`/apps/${appId}/records?limit=1`);
    const records = data.data || data.records || [];
    if (records.length > 0) {
      console.log(`      Columns: ${Object.keys(records[0]).join(", ")}`);
      console.log(`      Sample row:`, JSON.stringify(records[0], null, 8));
    } else {
      console.log("      (empty app — no records)");
    }
  } catch (err) {
    console.log(`      ⚠️   Could not sample: ${err.message}`);
  }
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log("═".repeat(60));
  console.log("  FUSIOO API AUDIT");
  console.log("  Base URL:", FUSIOO_BASE_URL);
  console.log("═".repeat(60));

  // 1. Auth
  await authenticate();

  // 2. List apps
  let apps;
  try {
    apps = await listApps();
  } catch (err) {
    console.error("\n❌  Failed to list apps:", err.message, "\n   Body:", err.body);
    console.log("\n   Possible causes:");
    console.log("   • Token expired — provide a fresh access_token");
    console.log("   • Base URL is wrong — check FUSIOO_BASE_URL");
    console.log("   • API user lacks 'Read Apps' permission in Fusioo");
    process.exit(1);
  }

  if (apps.length === 0) {
    console.log("\n⚠️   No apps returned. Check API user permissions in Fusioo.");
    process.exit(0);
  }

  // 3. Categorise apps
  const categorised = await findRelevantApps(apps);

  // 4. Sample schemas from destination/hotel apps
  for (const app of [...categorised.destination, ...categorised.hotel].slice(0, 3)) {
    await sampleApp(app.id || app.app_id, app.name || app.title);
  }

  // 5. Find target records
  console.log("\n" + "─".repeat(60));
  console.log("  SEARCHING FOR TARGET IDs");
  console.log("─".repeat(60));

  const destResult  = await findRecordAcrossApps(apps, TARGET_DESTINATION_ID, "DESTINATION");
  const hotelResult = await findRecordAcrossApps(apps, TARGET_HOTEL_ID,       "HOTEL");

  // 6. Summary
  console.log("\n" + "═".repeat(60));
  console.log("  SUMMARY");
  console.log("═".repeat(60));

  if (destResult) {
    const { app, record } = destResult;
    const name = record.name || record.title || record.label || record.destination_name || "(check record above)";
    console.log(`\n  DESTINATION:`);
    console.log(`    App:    ${app.name || app.title || app.id}`);
    console.log(`    App ID: ${app.id  || app.app_id}`);
    console.log(`    Name:   ${name}`);
    console.log(`\n  Fetch query for destination name:`);
    console.log(`    GET ${FUSIOO_BASE_URL}/apps/${app.id || app.app_id}/records/${TARGET_DESTINATION_ID}`);
  } else {
    console.log(`\n  DESTINATION: ❌  ID "${TARGET_DESTINATION_ID}" not found in any accessible app.`);
  }

  if (hotelResult) {
    const { app, record } = hotelResult;
    const name = record.name || record.title || record.label || record.hotel_name || "(check record above)";
    console.log(`\n  HOTEL:`);
    console.log(`    App:    ${app.name || app.title || app.id}`);
    console.log(`    App ID: ${app.id  || app.app_id}`);
    console.log(`    Name:   ${name}`);
    console.log(`\n  Fetch query for hotel name:`);
    console.log(`    GET ${FUSIOO_BASE_URL}/apps/${app.id || app.app_id}/records/${TARGET_HOTEL_ID}`);
  } else {
    console.log(`\n  HOTEL: ❌  ID "${TARGET_HOTEL_ID}" not found in any accessible app.`);
  }

  if (!destResult && !hotelResult) {
    console.log(`\n  ── WHY IDs MAY NOT BE FOUND ────────────────────────────`);
    console.log(`  1. The API user has no 'Read Records' permission on the relevant Fusioo app.`);
    console.log(`  2. The IDs belong to a Fusioo app that is not shared with this API user.`);
    console.log(`  3. The Base URL or auth token is incorrect.`);
    console.log(`  4. Fusioo stores these as relationship values, not standalone records.`);
    console.log(`     → In that case, the human-readable name is embedded inside the webhook`);
    console.log(`       payload (data column in bookings_6fbdd6b2) as data.destination.value.`);
    console.log(`\n  RECOMMENDED NEXT STEP:`);
    console.log(`  Run the supabase schema audit and check the 'data' JSONB column:`);
    console.log(`    SELECT data->'destination' FROM bookings_6fbdd6b2 LIMIT 5;`);
    console.log(`    SELECT data->'hotel_name'  FROM bookings_6fbdd6b2 LIMIT 5;`);
  }

  // 7. JS implementation examples
  console.log(`\n\n${"═".repeat(60)}`);
  console.log(`  JAVASCRIPT IMPLEMENTATION EXAMPLES`);
  console.log(`  (for the React + Supabase project)`);
  console.log(`${"═".repeat(60)}\n`);

  const destAppId  = destResult  ? (destResult.app.id  || destResult.app.app_id)  : "DESTINATION_APP_ID";
  const hotelAppId = hotelResult ? (hotelResult.app.id || hotelResult.app.app_id) : "HOTEL_APP_ID";
  const tokenVal   = "YOUR_FUSIOO_ACCESS_TOKEN";

  console.log(`// ── Fetch destination name from Fusioo ──────────────────────
async function getDestinationName(fusiooId) {
  const resp = await fetch(
    \`${FUSIOO_BASE_URL}/apps/${destAppId}/records/\${fusiooId}\`,
    { headers: { Authorization: \`Bearer ${tokenVal}\` } }
  );
  const record = await resp.json();
  return record.name || record.title || record.destination_name || null;
}

// ── Fetch hotel name from Fusioo ─────────────────────────────────
async function getHotelName(fusiooId) {
  const resp = await fetch(
    \`${FUSIOO_BASE_URL}/apps/${hotelAppId}/records/\${fusiooId}\`,
    { headers: { Authorization: \`Bearer ${tokenVal}\` } }
  );
  const record = await resp.json();
  return record.name || record.title || record.hotel_name || null;
}

// ── Resolve a full booking record into readable names ────────────
async function resolveBookingNames(booking) {
  const [destination, hotel] = await Promise.all([
    getDestinationName(booking.destination),
    getHotelName(booking.hotel_name),
  ]);
  return { ...booking, destination_display: destination, hotel_display: hotel };
}

// ── Usage (inside GdxSearchSection.jsx after Supabase query) ─────
const { data } = await supabase
  .from("bookings_6fbdd6b2")
  .select("*")
  .eq("gdx", query)
  .single();

const enriched = await resolveBookingNames(data);
// enriched.destination_display → "Da Nang, Vietnam"
// enriched.hotel_display       → "Golden Bay Hotel"
`);

  console.log(`\n${"═".repeat(60)}`);
  console.log(`  AUDIT COMPLETE`);
  console.log(`${"═".repeat(60)}\n`);
}

main().catch((err) => {
  console.error("\n❌  FATAL ERROR:", err.message);
  if (err.body) console.error("   Response:", JSON.stringify(err.body, null, 2));
  process.exit(1);
});
