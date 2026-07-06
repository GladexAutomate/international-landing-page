// @ts-nocheck
/**
 * VOUCHER SERVICE
 * ─────────────────────────────────────────────────────────────────────────────
 * Manages travel voucher files uploaded by admin per GDX booking.
 *
 * Table: gdx_vouchers
 *   gdx           TEXT PRIMARY KEY
 *   lead_name     TEXT
 *   voucher_url   TEXT NOT NULL       -- public download URL
 *   file_name     TEXT               -- original filename (e.g. "voucher-9384.pdf")
 *   storage_path  TEXT               -- path inside the "vouchers" bucket
 *   uploaded_at   TIMESTAMPTZ
 *
 * ── Run once in Supabase → SQL Editor ──────────────────────────────────────
 *   CREATE TABLE gdx_vouchers (
 *     gdx          TEXT PRIMARY KEY,
 *     lead_name    TEXT,
 *     voucher_url  TEXT NOT NULL,
 *     file_name    TEXT,
 *     storage_path TEXT,
 *     uploaded_at  TIMESTAMPTZ DEFAULT NOW()
 *   );
 *   ALTER TABLE gdx_vouchers ENABLE ROW LEVEL SECURITY;
 *   CREATE POLICY "Public read"  ON gdx_vouchers FOR SELECT USING (true);
 *   CREATE POLICY "Anon insert"  ON gdx_vouchers FOR INSERT WITH CHECK (true);
 *   CREATE POLICY "Anon update"  ON gdx_vouchers FOR UPDATE USING (true);
 *   CREATE POLICY "Anon delete"  ON gdx_vouchers FOR DELETE  USING (true);
 *
 * Storage bucket: create "vouchers" bucket in Supabase Storage with Public access ON.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { supabase } from "@/lib/supabase";

const BUCKET = "vouchers";
const TABLE  = "gdx_vouchers";

/**
 * Upload a file for a GDX booking and save the public URL to the DB.
 * Overwrites any existing voucher for the same GDX (upsert).
 */
export async function uploadVoucher(gdx, leadName, file) {
  const ext         = file.name.split(".").pop().toLowerCase();
  const storagePath = `${gdx}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, file, { upsert: true, contentType: file.type });

  if (uploadError) throw uploadError;

  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);

  const { error: dbError } = await supabase
    .from(TABLE)
    .upsert(
      {
        gdx:          String(gdx),
        lead_name:    leadName ?? null,
        voucher_url:  urlData.publicUrl,
        file_name:    file.name,
        storage_path: storagePath,
        uploaded_at:  new Date().toISOString(),
      },
      { onConflict: "gdx" }
    );

  if (dbError) throw dbError;
  return urlData.publicUrl;
}

/**
 * Get voucher info for a single GDX.
 * Returns { voucher_url, file_name } or null.
 */
export async function getVoucher(gdx) {
  if (!gdx) return null;
  const { data, error } = await supabase
    .from(TABLE)
    .select("voucher_url, file_name")
    .eq("gdx", String(gdx))
    .maybeSingle();
  if (error || !data) return null;
  return data;
}

/**
 * Get all uploaded vouchers, newest first.
 */
export async function getAllVouchers() {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("uploaded_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

/**
 * Delete a voucher from both Storage and the DB.
 */
export async function deleteVoucher(gdx) {
  const { data: row } = await supabase
    .from(TABLE)
    .select("storage_path")
    .eq("gdx", String(gdx))
    .maybeSingle();

  await supabase.from(TABLE).delete().eq("gdx", String(gdx));

  if (row?.storage_path) {
    await supabase.storage.from(BUCKET).remove([row.storage_path]);
  }
}
