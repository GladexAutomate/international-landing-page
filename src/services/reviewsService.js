// @ts-nocheck
import { supabase } from "@/lib/supabase";

const TABLE = "reviews";

// Fusioo "select" fields sometimes sync as a stringified array, e.g. '["Kams Valenzuela"]'.
// Unwrap that to plain text; leave already-plain strings untouched.
function unwrapAgentName(raw) {
  if (!raw) return raw;
  const s = String(raw).trim();
  if (s.startsWith("[") && s.endsWith("]")) {
    try {
      const parsed = JSON.parse(s);
      if (Array.isArray(parsed)) return parsed.filter(Boolean).join(", ") || s;
    } catch {
      // not valid JSON — fall through to raw string
    }
  }
  return s;
}

export async function getReviews() {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  const reviews = (data ?? []).map(r => ({ ...r, agent_name: unwrapAgentName(r.agent_name) }));

  // Enrich: batch-fetch lead_name from bookings for any review that has a GDX but no name
  const needsName = reviews.filter(r => r.gdx_reference && !r.lead_name?.trim());
  if (needsName.length > 0) {
    const gdxList = [...new Set(needsName.map(r => String(r.gdx_reference)))];
    const { data: rows } = await supabase
      .from("fusioo_booking_transactions")
      .select("data")
      .in("data->>gdx", gdxList);
    if (rows?.length) {
      const nameMap = new Map(rows.map(row => [String(row.data.gdx), row.data.lead_name]));
      return reviews.map(r =>
        !r.lead_name?.trim() && r.gdx_reference
          ? { ...r, lead_name: nameMap.get(String(r.gdx_reference)) ?? r.lead_name }
          : r
      );
    }
  }
  return reviews;
}

// Public display: rating >= 4, approved, and not hidden. Optionally filtered by destination name.
export async function getPublicReviews(destinationName = null) {
  let query = supabase
    .from(TABLE)
    .select("*")
    .gte("rating", 4)
    .eq("is_hidden", false)
    .eq("needs_approval", false)
    .order("created_at", { ascending: false });
  if (destinationName) {
    query = query.eq("destination", destinationName);
  }
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).map(r => ({ ...r, agent_name: unwrapAgentName(r.agent_name) }));
}

// Look up a traveler's name from the bookings index table by GDX number.
export async function lookupLeadNameByGdx(gdx) {
  if (!gdx) return null;
  const { data } = await supabase
    .from("fusioo_booking_transactions")
    .select("data")
    .eq("data->>gdx", String(gdx).trim())
    .maybeSingle();
  return data?.data?.lead_name ?? null;
}

export async function addReview(review) {
  const { data, error } = await supabase
    .from(TABLE)
    .insert([review])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function setReviewVisibility(id, { isHidden, needsApproval }) {
  const patch = {};
  if (isHidden !== undefined) patch.is_hidden = isHidden;
  if (needsApproval !== undefined) patch.needs_approval = needsApproval;
  const { data, error } = await supabase
    .from(TABLE)
    .update(patch)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteReview(id) {
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw error;
}

export async function getReviewStats() {
  const reviews = await getReviews();
  const byAgent = {};
  reviews.forEach((r) => {
    const agent = r.agent_name?.trim() || "Unassigned";
    if (!byAgent[agent]) byAgent[agent] = { reviews: [], totalRating: 0, count: 0 };
    byAgent[agent].reviews.push(r);
    if (r.rating) { byAgent[agent].totalRating += r.rating; byAgent[agent].count++; }
  });
  return {
    total: reviews.length,
    byAgent: Object.entries(byAgent)
      .map(([name, v]) => ({
        name,
        total: v.reviews.length,
        avgRating: v.count ? (v.totalRating / v.count).toFixed(1) : null,
        reviews: v.reviews,
      }))
      .sort((a, b) => b.total - a.total),
  };
}
