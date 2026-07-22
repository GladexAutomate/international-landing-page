// @ts-nocheck
import { supabase } from "@/lib/supabase";

const BUCKET = "vouchers";
const TABLE  = "vouchers";

async function _deleteByGdx(gdx) {
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

export async function uploadVoucher({ gdx, file, uploadedBy = null }) {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const storagePath = `${gdx}/${Date.now()}-${safeName}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, file, { upsert: true, contentType: file.type });
  if (uploadError) throw new Error(uploadError.message);

  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);

  // Fetch old rows BEFORE inserting so we know exactly what to delete after.
  const { data: oldRows } = await supabase
    .from(TABLE)
    .select("id, storage_path")
    .eq("gdx", String(gdx));
  const oldIds   = (oldRows ?? []).map(r => r.id).filter(Boolean);
  const oldPaths = (oldRows ?? []).map(r => r.storage_path).filter(Boolean);

  // Insert new row first — so a DB failure here leaves old voucher intact.
  const { error: dbError } = await supabase.from(TABLE).insert({
    gdx:          String(gdx),
    file_name:    file.name,
    file_url:     urlData.publicUrl,
    storage_path: storagePath,
    file_type:    file.type || null,
    file_size:    file.size ?? null,
    uploaded_by:  uploadedBy,
  });
  if (dbError) throw new Error(dbError.message);

  // New row confirmed — now safely remove old rows and old storage files.
  if (oldIds.length) {
    await supabase.from(TABLE).delete().in("id", oldIds);
  }
  if (oldPaths.length) {
    await supabase.storage.from(BUCKET).remove(oldPaths);
  }

  return { publicUrl: urlData.publicUrl, path: storagePath };
}

export async function getVouchers(gdx) {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("gdx", String(gdx))
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data || [];
}

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

export async function deleteVoucher(id, storagePath) {
  if (!supabase) throw new Error("Supabase not configured.");
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw new Error(error.message);
  if (storagePath) {
    await supabase.storage.from(BUCKET).remove([storagePath]);
  }
}

export async function getAllVouchers() {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw error;

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

export async function hasVoucher(gdx) {
  if (!supabase || !gdx) return false;
  const { data } = await supabase
    .from(TABLE)
    .select("id")
    .eq("gdx", String(gdx))
    .limit(1)
    .maybeSingle();
  return !!data;
}
