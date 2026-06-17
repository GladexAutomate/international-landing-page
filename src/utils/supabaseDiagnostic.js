/**
 * SUPABASE DIAGNOSTIC UTILITY — READ ONLY
 * ─────────────────────────────────────────────────────────────────────────────
 * Tests whether the configured Supabase credentials can access candidate tables.
 * No data is written. No records are created. No schema is modified.
 *
 * HOW TO RUN
 * ─────────────────────────────────────────────────────────────────────────────
 * Option A — from anywhere in the app (e.g. DestinationPreview.jsx):
 *   import { runSupabaseDiagnostic } from "@/utils/supabaseDiagnostic";
 *   runSupabaseDiagnostic();
 *
 * Option B — from the browser console (after the app loads):
 *   window.__gdxDiagnostic()
 *
 * DELETE THIS FILE before deploying to production.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { supabase } from "@/lib/supabase";

const CANDIDATE_TABLES = [
  "bookings",
  "booking",
  "reservations",
  "reservation",
  "customers",
  "travelers",
  "passengers",
  "users",
];

export async function runSupabaseDiagnostic() {
  console.group(
    "%c[GDX SUPABASE DIAGNOSTIC] Starting read-only table scan…",
    "color: #FF9913; font-weight: bold; font-size: 13px;"
  );

  console.log(
    "%c⚠️  READ-ONLY — no writes, no creates, no schema changes",
    "color: #22C55E; font-weight: bold;"
  );
  console.log(
    "Supabase URL:",
    import.meta.env.VITE_SUPABASE_URL || "(not set)"
  );
  console.log("---");

  const results = [];

  for (const tableName of CANDIDATE_TABLES) {
    try {
      console.log(`[GDX] Testing table: "${tableName}" …`);

      const { data, error } = await supabase
        .from(tableName)
        .select("*")
        .limit(1);

      if (error) {
        const isNotFound =
          error.code === "42P01" ||
          error.message?.toLowerCase().includes("does not exist") ||
          error.message?.toLowerCase().includes("not found") ||
          error.code === "PGRST116";

        const status = isNotFound ? "NOT FOUND" : "ACCESS ERROR";
        const color = isNotFound ? "#A0A0A0" : "#EF4444";

        console.log(
          `%c  ✗  ${tableName.padEnd(16)} ${status}`,
          `color: ${color};`
        );
        console.log(`     Code: ${error.code || "—"}  |  Message: ${error.message}`);

        results.push({ table: tableName, accessible: false, status, error: error.message, code: error.code });
      } else {
        const rowCount = Array.isArray(data) ? data.length : 0;
        console.log(
          `%c  ✓  ${tableName.padEnd(16)} ACCESSIBLE  (${rowCount} row${rowCount !== 1 ? "s" : ""} returned)`,
          "color: #22C55E; font-weight: bold;"
        );
        if (rowCount > 0) {
          console.log("     Sample columns:", Object.keys(data[0]).join(", "));
          console.log("     Sample row:", data[0]);
        }

        results.push({ table: tableName, accessible: true, status: "ACCESSIBLE", rowCount, sample: data[0] || null });
      }
    } catch (err) {
      console.log(
        `%c  ✗  ${tableName.padEnd(16)} EXCEPTION`,
        "color: #EF4444; font-weight: bold;"
      );
      console.error("     Unexpected error:", err);
      results.push({ table: tableName, accessible: false, status: "EXCEPTION", error: err.message });
    }

    console.log("---");
  }

  // ── SUMMARY ──────────────────────────────────────────────────────────────────
  const accessible = results.filter((r) => r.accessible);
  const blocked    = results.filter((r) => !r.accessible);

  console.log("%c[GDX DIAGNOSTIC SUMMARY]", "color: #FF9913; font-weight: bold; font-size: 13px;");
  console.log(`  Accessible tables : ${accessible.length}`);
  console.log(`  Inaccessible      : ${blocked.length}`);

  if (accessible.length > 0) {
    console.log(
      `%c  ✓ Accessible: ${accessible.map((r) => r.table).join(", ")}`,
      "color: #22C55E; font-weight: bold;"
    );
  } else {
    console.log(
      "%c  ✗ No candidate tables were accessible.",
      "color: #EF4444; font-weight: bold;"
    );
    console.log("  Possible reasons:");
    console.log("  → Tables do not exist in this Supabase project");
    console.log("  → Row Level Security (RLS) is blocking anon access");
    console.log("  → Anon key does not have SELECT permission on these tables");
    console.log("  → Wrong Supabase project URL in VITE_SUPABASE_URL");
  }

  console.groupEnd();

  return results;
}

// Attach to window so it can be called directly from the browser DevTools console
if (typeof window !== "undefined") {
  window.__gdxDiagnostic = runSupabaseDiagnostic;
  console.log(
    "%c[GDX] Supabase diagnostic ready — run window.__gdxDiagnostic() in the console",
    "color: #FF9913;"
  );
}
