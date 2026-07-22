// @ts-nocheck
/**
 * VOUCHER SERVICE
 * ─────────────────────────────────────────────────────────────────────────────
 * Manages travel voucher files uploaded by admin per GDX booking.
 *
 * Table: vouchers
 *   id            UUID PRIMARY KEY
 *   gdx           TEXT               -- not unique: a booking can have >1 voucher
 *   file_name     TEXT               -- original filename
 *   file_url      TEXT NOT NULL      -- public download URL
 *   storage_path  TEXT               -- path inside the "vouchers" bucket
 *   file_type     TEXT
 *   file_size     BIGINT
 *   uploaded_by   TEXT
 *   created_at    TIMESTAMPTZ
 *
 * This admin UI keeps a "one active voucher per GDX" convention (Replace =
 * delete old row(s) + insert new one) even though the table itself allows
 * multiple rows per gdx.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { supabase } from "@/lib/supabase";

const BUCKET = "vouchers";
const TABLE  = "vouchers";

/**
 * Upload a file for a GDX booking and save the public URL to the DB.
 * Replaces any existing voucher(s) for the same GDX.
 */
export async function uploadVoucher(gdx, file, uploadedBy = null) {
  const storagePath = `${gdx}/${Date.now()}-${file.name}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, file, { upsert: true, contentType: file.type });

  if (uploadError) throw uploadError;

  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);

  // Enforce "one active voucher per GDX" — remove old row(s) first.
  await deleteVoucher(gdx);

  const { error: dbError } = await supabase
    .from(TABLE)
    .insert({
      gdx:          String(gdx),
      file_name:    file.name,
      file_url:     urlData.publicUrl,
      storage_path: storagePath,
      file_type:    file.type || null,
      file_size:    file.size ?? null,
      uploaded_by:  uploadedBy,
    });

  if (dbError) throw dbError;
  return urlData.publicUrl;
}

/**
 * Get the most recent voucher for a single GDX.
 * Returns { voucher_url, file_name } or null.
 */
export async function getVoucher(gdx) {
  if (!gdx) return null;
  const { data, error } = await supabase
    .from(TABLE)
    .select("file_url, file_name")
    .eq("gdx", String(gdx))
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error || !data) return null;
  return { voucher_url: data.file_url, file_name: data.file_name };
}

/**
 * Get all uploaded vouchers, one entry per GDX (the most recent), newest first.
 */
export async function getAllVouchers() {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw error;

  // Collapse to the latest row per gdx (ascending order → later entries overwrite earlier ones).
  const byGdx = new Map();
  for (const row of data ?? []) {
    byGdx.set(String(row.gdx), {
      gdx:         String(row.gdx),
      voucher_url: row.file_url,
      file_name:   row.file_name,
      created_at:  row.created_at,
    });
  }
  return [...byGdx.values()].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

/**
 * Delete all voucher row(s) for a GDX from both Storage and the DB.
 */
export async function deleteVoucher(gdx) {
  const { data: rows } = await supabase
    .from(TABLE)
    .select("storage_path")
    .eq("gdx", String(gdx));

  await supabase.from(TABLE).delete().eq("gdx", String(gdx));

  const paths = (rows ?? []).map(r => r.storage_path).filter(Boolean);
  if (paths.length) {
    await supabase.storage.from(BUCKET).remove(paths);
  }
}
