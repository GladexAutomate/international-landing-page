/**
 * SUPABASE SCHEMA AUDIT
 * ─────────────────────────────────────────────────────────────────────────────
 * Discovers all accessible tables and attempts to resolve Fusioo reference IDs
 * into human-readable destination and hotel names.
 *
 * READ-ONLY. No writes. No inserts. No deletes.
 *
 * HOW TO RUN
 * ─────────────────────────────────────────────────────────────────────────────
 * In any component (e.g. DestinationPreview.jsx) add temporarily:
 *   import { runSchemaAudit } from "@/utils/supabaseSchemaAudit";
 *   if (import.meta.env.DEV) runSchemaAudit();
 *
 * Or from the browser console after page loads:
 *   window.__schemaAudit()
 *
 * DELETE BEFORE PRODUCTION DEPLOY.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { supabase } from "@/lib/supabase";

// ─── TARGET IDs TO RESOLVE ────────────────────────────────────────────────────
const TARGET_DESTINATION_ID = "i563dc5a6d467470496d28a0d9f062a52";
const TARGET_HOTEL_ID       = "if3ebdb4e9144483580617ae231341bef";
const SAMPLE_GDX            = "7664";

// ─── CANDIDATE TABLE NAMES ───────────────────────────────────────────────────
// Fusioo syncs data to Supabase tables. These are common naming patterns.
const CANDIDATE_TABLES = [
  // Destination-related
  "destinations",
  "destination",
  "destination_master",
  "destination_details",
  "destination_lookup",
  "tours",
  "tour_destinations",
  "packages",
  "package_destinations",
  "travel_destinations",

  // Hotel-related
  "hotels",
  "hotel",
  "hotel_master",
  "hotel_details",
  "hotel_lookup",
  "accommodations",
  "accommodation",
  "properties",

  // Fusioo sync patterns
  "fusioo_destinations",
  "fusioo_hotels",
  "fusioo_packages",
  "fusioo_records",
  "fusioo_sync",
  "fusioo_data",

  // Lookup / reference tables
  "lookup",
  "lookups",
  "reference",
  "references",
  "master_data",
  "masters",
  "categories",

  // Booking-adjacent tables
  "bookings",
  "booking",
  "reservations",
  "reservation",
  "po_main",          // ← already confirmed as the main bookings table
  "orders",
  "customers",
  "clients",
  "travelers",

  // Generic tables that may hold synced Fusioo apps
  "apps",
  "records",
  "items",
  "entities",
  "data",
  "products",
];

// ─── COLUMN NAMES THAT MIGHT STORE IDs ───────────────────────────────────────
const ID_COLUMNS = ["id", "record_id", "fusioo_id", "external_id", "source_id"];

// ─── NAME COLUMNS THAT MIGHT STORE READABLE NAMES ────────────────────────────
const NAME_COLUMNS = [
  "name", "title", "label", "display_name", "destination_name",
  "hotel_name", "property_name", "short_name", "full_name",
];

export async function runSchemaAudit() {
  console.group(
    "%c[SCHEMA AUDIT] Starting full database discovery…",
    "color: #FF9913; font-weight: bold; font-size: 14px;"
  );

  console.log("%c🎯 Target IDs to resolve:", "font-weight: bold;");
  console.log("  Destination ID:", TARGET_DESTINATION_ID);
  console.log("  Hotel ID:      ", TARGET_HOTEL_ID);
  console.log("  Sample GDX:    ", SAMPLE_GDX);
  console.log("─".repeat(60));

  // ── STEP 1: Discover which tables exist ──────────────────────────────────
  console.group("%c[STEP 1] Table discovery", "color: #22C55E; font-weight: bold;");
  const foundTables = [];

  for (const tableName of CANDIDATE_TABLES) {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select("*")
        .limit(1);

      if (!error && data !== null) {
        const cols = data.length > 0 ? Object.keys(data[0]) : [];
        foundTables.push({ name: tableName, sampleRow: data[0] || null, columns: cols });
        console.log(`  ✅ ${tableName.padEnd(30)} EXISTS  | Columns: ${cols.join(", ") || "(empty table)"}`);
      } else {
        const isNotFound =
          error?.code === "42P01" ||
          error?.message?.includes("does not exist") ||
          error?.code === "PGRST116";
        if (!isNotFound) {
          // Exists but access denied or other error
          console.log(`  ⚠️  ${tableName.padEnd(30)} ACCESS DENIED | ${error?.message}`);
          foundTables.push({ name: tableName, sampleRow: null, columns: [], accessDenied: true });
        }
        // else: table truly does not exist — skip silently
      }
    } catch (err) {
      // Silent — table doesn't exist
    }
  }

  console.log("─".repeat(60));
  console.log(`Tables discovered: ${foundTables.length}`);
  console.groupEnd();

  // ── STEP 2: Search for target IDs in all found tables ───────────────────
  console.group("%c[STEP 2] Searching for target IDs in discovered tables", "color: #22C55E; font-weight: bold;");
  const idMatches = [];

  for (const table of foundTables.filter((t) => !t.accessDenied)) {
    for (const col of ID_COLUMNS) {
      if (!table.columns.includes(col)) continue;

      // Search for destination ID
      try {
        const { data: destData, error: destErr } = await supabase
          .from(table.name)
          .select("*")
          .eq(col, TARGET_DESTINATION_ID)
          .limit(1);

        if (!destErr && destData?.length > 0) {
          console.log(
            `%c  🎯 DESTINATION ID FOUND in ${table.name}.${col}!`,
            "color: #22C55E; font-weight: bold; font-size: 13px;"
          );
          console.log("  Row:", destData[0]);
          idMatches.push({ table: table.name, col, type: "destination", row: destData[0] });
        }
      } catch (_) {}

      // Search for hotel ID
      try {
        const { data: hotelData, error: hotelErr } = await supabase
          .from(table.name)
          .select("*")
          .eq(col, TARGET_HOTEL_ID)
          .limit(1);

        if (!hotelErr && hotelData?.length > 0) {
          console.log(
            `%c  🎯 HOTEL ID FOUND in ${table.name}.${col}!`,
            "color: #22C55E; font-weight: bold; font-size: 13px;"
          );
          console.log("  Row:", hotelData[0]);
          idMatches.push({ table: table.name, col, type: "hotel", row: hotelData[0] });
        }
      } catch (_) {}
    }
  }

  if (idMatches.length === 0) {
    console.warn("  ⚠️  Neither target ID was found in any accessible table.");
  }
  console.groupEnd();

  // ── STEP 3: Inspect the bookings_6fbdd6b2 `data` JSON column ────────────
  console.group(
    "%c[STEP 3] Inspecting bookings_6fbdd6b2 raw `data` column for GDX " + SAMPLE_GDX,
    "color: #22C55E; font-weight: bold;"
  );

  const { data: bookingRow, error: bookingErr } = await supabase
    .from("bookings_6fbdd6b2")
    .select("gdx, destination, hotel_name, data")
    .eq("gdx", SAMPLE_GDX)
    .limit(1)
    .single();

  if (bookingErr) {
    console.error("  ❌ Could not fetch booking row:", bookingErr.message);
  } else if (bookingRow) {
    console.log("  Raw destination column:", bookingRow.destination);
    console.log("  Raw hotel_name column: ", bookingRow.hotel_name);
    console.log("  Inspecting data JSON column for readable names…");

    const raw = bookingRow.data;
    if (raw) {
      // Check if destination or hotel_name inside data is an object with a value
      const destInData  = raw?.destination;
      const hotelInData = raw?.hotel_name;

      console.log("  data.destination:", JSON.stringify(destInData, null, 2));
      console.log("  data.hotel_name: ", JSON.stringify(hotelInData, null, 2));

      // Try to find any key in data that contains a readable destination or hotel string
      const allKeys = Object.keys(raw);
      const potentialNames = allKeys.filter((k) =>
        ["destination", "hotel", "accommodation", "property", "package", "tour"]
          .some((kw) => k.toLowerCase().includes(kw))
      );
      console.log("  Potentially relevant keys in data:", potentialNames);
      potentialNames.forEach((k) => {
        console.log(`  data["${k}"]:`, JSON.stringify(raw[k], null, 2));
      });
    } else {
      console.log("  data column is null or empty.");
    }
  }
  console.groupEnd();

  // ── STEP 4: Check po_main table separately (confirmed exists) ────────────
  console.group("%c[STEP 4] Inspecting po_main for the same GDX", "color: #22C55E; font-weight: bold;");

  const { data: poRow, error: poErr } = await supabase
    .from("po_main")
    .select("gdx, destination, hotel_name, data")
    .eq("gdx", SAMPLE_GDX)
    .limit(1)
    .single();

  if (poErr) {
    console.warn("  po_main query failed:", poErr.message);
  } else if (poRow) {
    console.log("  po_main.destination:", poRow.destination);
    console.log("  po_main.hotel_name: ", poRow.hotel_name);
    if (poRow.data) {
      const destVal  = poRow.data?.destination;
      const hotelVal = poRow.data?.hotel_name;
      console.log("  po_main data.destination:", JSON.stringify(destVal, null, 2));
      console.log("  po_main data.hotel_name: ", JSON.stringify(hotelVal, null, 2));
    }
  }
  console.groupEnd();

  // ── STEP 5: Try to find IDs via ilike across text columns ────────────────
  console.group(
    "%c[STEP 5] Searching all tables for the ID string via ilike",
    "color: #22C55E; font-weight: bold;"
  );

  for (const table of foundTables.filter((t) => !t.accessDenied)) {
    for (const col of table.columns) {
      try {
        const { data: ilikeData } = await supabase
          .from(table.name)
          .select(`${col}`)
          .ilike(col, `%${TARGET_DESTINATION_ID}%`)
          .limit(1);

        if (ilikeData?.length > 0) {
          console.log(
            `%c  🎯 DESTINATION ID substring found in ${table.name}.${col}`,
            "color: #22C55E; font-weight: bold;"
          );
          console.log("  Value:", ilikeData[0][col]);
        }
      } catch (_) {}
    }
  }
  console.groupEnd();

  // ── SUMMARY ──────────────────────────────────────────────────────────────
  console.group("%c[SUMMARY]", "color: #FF9913; font-weight: bold; font-size: 14px;");
  console.log("Tables accessible to anon key:", foundTables.filter((t) => !t.accessDenied).map((t) => t.name));
  console.log("Tables access denied:         ", foundTables.filter((t) => t.accessDenied).map((t) => t.name));
  console.log("ID matches found:             ", idMatches.length);
  if (idMatches.length > 0) {
    console.log("Match details:", idMatches);
  } else {
    console.log("%c⚠️  IDs NOT RESOLVABLE from current Supabase tables.", "color: #EF4444; font-weight: bold;");
    console.log("Options:");
    console.log("  1. IDs exist in a Fusioo App that has NOT been synced to Supabase");
    console.log("  2. IDs are embedded in the data JSON column in a nested format");
    console.log("  3. Names must be fetched directly from the Fusioo API");
  }
  console.groupEnd();

  console.groupEnd(); // Root group

  return { foundTables, idMatches };
}

// Attach to window for DevTools console access
if (typeof window !== "undefined") {
  window.__schemaAudit = runSchemaAudit;
  console.log(
    "%c[SCHEMA AUDIT] Ready — run window.__schemaAudit() in the console",
    "color: #FF9913;"
  );
}
