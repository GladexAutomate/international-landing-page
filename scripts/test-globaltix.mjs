/**
 * Globaltix API Test Script
 * ─────────────────────────────────────────────────────────────────────────────
 * Tests authentication, getCategories(), and getCountries() against the
 * Globaltix staging API. Reads credentials from .env.local automatically.
 *
 * Usage:
 *   node scripts/test-globaltix.mjs
 */

import fs from "fs";

// ── Read .env.local ───────────────────────────────────────────────────────────
function loadEnvLocal(filename = ".env.local") {
  const env = {};
  try {
    const raw = fs.readFileSync(filename, "utf8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
      env[key] = val;
    }
  } catch (err) {
    console.error("[env] Could not read .env.local:", err.message);
  }
  return env;
}

const env = loadEnvLocal();

const BASE_URL = env.VITE_GLOBALTIX_BASE_URL ?? "https://stg-api.globaltix.com";
const AGENT    = env.VITE_GLOBALTIX_AGENT    ?? "";
const API_KEY  = env.VITE_GLOBALTIX_API_KEY  ?? "";
const USERNAME = env.VITE_GLOBALTIX_USERNAME ?? "";

// ── Validate env ──────────────────────────────────────────────────────────────
const missing = [
  !AGENT    && "VITE_GLOBALTIX_AGENT",
  !API_KEY  && "VITE_GLOBALTIX_API_KEY",
  !USERNAME && "VITE_GLOBALTIX_USERNAME",
].filter(Boolean);

if (missing.length) {
  console.error("❌ Missing required env variables:", missing.join(", "));
  console.error("   Add them to .env.local and re-run.");
  process.exit(1);
}

// ── Headers ───────────────────────────────────────────────────────────────────
function baseHeaders() {
  return {
    "Content-Type": "application/json",
    "x-api-agent":  AGENT,
    "x-api-key":    `${AGENT}/${API_KEY}`,
  };
}

// ── Authentication ────────────────────────────────────────────────────────────
async function authenticate() {
  console.log(`\n[1] Authenticating → ${BASE_URL}/api/auth/authorize`);
  console.log(`    username : ${USERNAME}`);
  console.log(`    x-api-agent : ${AGENT}`);
  console.log(`    x-api-key   : ${AGENT}/${API_KEY.slice(0, 4)}${"*".repeat(Math.max(0, API_KEY.length - 4))}`);

  const res = await fetch(`${BASE_URL}/api/auth/authorize`, {
    method:  "POST",
    headers: baseHeaders(),
    body:    JSON.stringify({ username: USERNAME }),
  });

  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = { raw: text }; }

  if (!res.ok) {
    console.error(`❌ Auth failed — HTTP ${res.status}`);
    console.error("   Response:", JSON.stringify(json, null, 2));
    throw new Error(`Auth HTTP ${res.status}`);
  }

  const data = json.data ?? json;

  if (!data.accessToken) {
    console.error("❌ Auth succeeded (HTTP 200) but no accessToken in response");
    console.error("   Response:", JSON.stringify(json, null, 2));
    throw new Error("Missing accessToken");
  }

  const ttl = data.expiration ?? 860;
  console.log(`✅ Auth OK`);
  console.log(`   Token type  : ${data.tokenType ?? "Bearer"}`);
  console.log(`   Expiration  : ${ttl}s (~${Math.round(ttl / 60)} min)`);
  console.log(`   Roles       : ${data.roles?.join(", ") ?? "—"}`);
  console.log(`   User        : ${data.user?.firstName} ${data.user?.lastName} (${data.user?.username})`);
  console.log(`   Reseller    : ${data.user?.reseller?.name} (id: ${data.user?.reseller?.id})`);
  console.log(`   Currency    : ${data.user?.currency?.code}`);

  return data.accessToken;
}

// ── Authenticated GET ─────────────────────────────────────────────────────────
async function apiGet(token, path) {
  const url = `${BASE_URL}${path}`;
  console.log(`\n→ GET ${url}`);

  const res = await fetch(url, {
    method:  "GET",
    headers: { ...baseHeaders(), Authorization: `Bearer ${token}` },
  });

  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = { raw: text }; }

  if (!res.ok) {
    console.error(`❌ HTTP ${res.status}`);
    console.error("   Response:", JSON.stringify(json, null, 2));
    return null;
  }

  return json;
}

// ── Pretty-print a paginated or array response ────────────────────────────────
function summarise(label, json) {
  if (!json) { console.log(`  ${label}: (no response)`); return; }

  const items = json.data ?? json;
  if (Array.isArray(items)) {
    console.log(`✅ ${label}: ${items.length} items returned`);
    if (items.length > 0) {
      console.log("   First 3:");
      items.slice(0, 3).forEach((item, i) => {
        const preview = typeof item === "object"
          ? Object.entries(item).slice(0, 4).map(([k, v]) => `${k}=${JSON.stringify(v)}`).join(", ")
          : String(item);
        console.log(`     [${i}] ${preview}`);
      });
    }
  } else {
    console.log(`✅ ${label}:`);
    console.log("  ", JSON.stringify(json, null, 2).split("\n").slice(0, 20).join("\n   "));
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────
console.log("╔══════════════════════════════════════════════════════════╗");
console.log("║  GLOBALTIX API TEST                                       ║");
console.log(`║  Base URL: ${BASE_URL.padEnd(44)}║`);
console.log("╚══════════════════════════════════════════════════════════╝");

let token;
try {
  token = await authenticate();
} catch (err) {
  console.error("\n❌ Authentication failed. Aborting.");
  process.exit(1);
}

// ── Test getProducts() ───────────────────────────────────────────────────────
console.log("\n[2] getProducts()  →  GET /api/product/list");
const productsRes = await apiGet(token, "/api/product/list");
summarise("Products", productsRes);

// Derive unique countries and categories from product list
const productItems = productsRes?.data ?? [];
const countries  = [...new Set(productItems.map(p => p.country).filter(Boolean))].sort();
const categories = [...new Set(productItems.map(p => p.category).filter(Boolean))].sort();
const cities     = [...new Set(productItems.map(p => p.city).filter(Boolean))].sort();
console.log(`   Countries  (from products): ${countries.join(", ") || "—"}`);
console.log(`   Categories (from products): ${categories.join(", ") || "—"}`);
console.log(`   Cities     (from products): ${cities.join(", ") || "—"}`);

// ── Test getAllCountriesWithCities() ─────────────────────────────────────────
console.log("\n[3] getAllCountriesWithCities()  →  GET /api/country/getAllCountries");
const countriesRes = await apiGet(token, "/api/country/getAllCountries");
if (countriesRes) {
  const countries = countriesRes.data ?? countriesRes;
  console.log(`✅ Countries: ${Array.isArray(countries) ? countries.length : "?"} countries returned`);
  // Print a sample — SG, HK, PH, TH
  const samples = ["Singapore", "Hong Kong", "Philippines", "Thailand"];
  for (const name of samples) {
    const c = Array.isArray(countries) && countries.find(x => x.name === name);
    if (c) {
      const cities = (c.cities ?? []).filter(ci => ci.name !== "All Cities").map(ci => ci.name);
      console.log(`   ${c.name} (${c.code}): ${cities.join(", ")}`);
    }
  }
} else {
  console.log("❌ Countries: (no response)");
}

// ── Summary ───────────────────────────────────────────────────────────────────
console.log("\n══════════════════════════════════════════════════════════");
const results = [
  ["Auth",                    !!token],
  ["Products",                !!productsRes],
  ["Countries + Cities",      !!countriesRes],
];
results.forEach(([label, ok]) => console.log(`  ${ok ? "✅" : "❌"}  ${label}`));
console.log("══════════════════════════════════════════════════════════");
