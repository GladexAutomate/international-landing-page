// @ts-nocheck
import { supabase } from "@/lib/supabase";

const TABLE = "reviews";

export async function getReviews() {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  const reviews = data ?? [];

  // Enrich: batch-fetch lead_name from bookings for any review that has GDX but no name
  const needsName = reviews.filter(r => r.gdx && !r.lead_name?.trim());
  if (needsName.length > 0) {
    const gdxList = [...new Set(needsName.map(r => String(r.gdx)))];
    const { data: names } = await supabase
      .from("bookings_6fbdd6b2")
      .select("gdx, lead_name")
      .in("gdx", gdxList);
    if (names?.length) {
      const nameMap = new Map(names.map(n => [String(n.gdx), n.lead_name]));
      return reviews.map(r =>
        !r.lead_name?.trim() && r.gdx
          ? { ...r, lead_name: nameMap.get(String(r.gdx)) ?? r.lead_name }
          : r
      );
    }
  }
  return reviews;
}

// Public display: rating >= 4 only. Optionally filtered by destination name.
export async function getPublicReviews(destinationName = null) {
  let query = supabase
    .from(TABLE)
    .select("*")
    .gte("rating", 4)
    .order("created_at", { ascending: false });
  if (destinationName) {
    query = query.eq("destination", destinationName);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

// Look up a traveler's name from the bookings index table by GDX number.
export async function lookupLeadNameByGdx(gdx) {
  if (!gdx) return null;
  const { data } = await supabase
    .from("bookings_6fbdd6b2")
    .select("lead_name")
    .eq("gdx", String(gdx).trim())
    .maybeSingle();
  return data?.lead_name ?? null;
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
