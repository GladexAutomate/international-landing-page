// @ts-nocheck
import { useState, useEffect } from "react";
import { Star, Pencil, X } from "lucide-react";
import { supabase } from "../lib/supabase";
import BriefingSection from "./briefing/BriefingSection";

const ORANGE = "#FF8C00";

export default function RateMyService({ theme, gdxReference }) {
  const { bgCard, border, textPrimary, textSecondary, isDark } = theme;

  const [loading,        setLoading]        = useState(true);
  const [existingReview, setExistingReview] = useState(null); // { rating, comment }
  const [isEditing,      setIsEditing]      = useState(false);
  const [hovered,        setHovered]        = useState(0);
  const [selected,       setSelected]       = useState(0);
  const [comment,        setComment]        = useState("");
  const [submitting,     setSubmitting]     = useState(false);
  const [error,          setError]          = useState(null);

  // Fetch existing review on load / GDX change
  useEffect(() => {
    if (!gdxReference) { setLoading(false); return; }

    setLoading(true);
    setExistingReview(null);
    setIsEditing(false);
    setSelected(0);
    setComment("");
    setError(null);

    supabase
      .from("reviews")
      .select("rating, comment")
      .eq("gdx_reference", gdxReference)
      .maybeSingle()
      .then(({ data, error: fetchError }) => {
        if (fetchError) {
          console.error("[RateMyService] fetch error:", fetchError.code, fetchError.message);
        }
        if (!fetchError && data) setExistingReview(data);
        setLoading(false);
      });
  }, [gdxReference]);

  // Enter edit mode — pre-fill form with existing values
  function handleEdit() {
    setSelected(existingReview.rating);
    setComment(existingReview.comment || "");
    setError(null);
    setIsEditing(true);
  }

  // Cancel edit — go back to view mode
  function handleCancel() {
    setIsEditing(false);
    setSelected(0);
    setComment("");
    setError(null);
  }

  // Submit new review or update existing — always upserts by gdx_reference
  async function handleSubmit() {
    if (!selected || !gdxReference || submitting) return;
    setSubmitting(true);
    setError(null);

    const { error: upsertError } = await supabase
      .from("reviews")
      .upsert(
        { gdx_reference: gdxReference, rating: selected, comment: comment.trim() || null },
        { onConflict: "gdx_reference" }
      );

    if (upsertError) {
      console.error("[RateMyService] upsert error:", upsertError.code, upsertError.message);
      const msg =
        upsertError.code === "PGRST205" || upsertError.message?.includes("reviews")
          ? "Review table is not set up yet. Please contact Gladex support."
          : "Something went wrong. Please try again.";
      setError(msg);
      setSubmitting(false);
      return;
    }

    const saved = { rating: selected, comment: comment.trim() || null };
    setExistingReview(saved);
    setIsEditing(false);
    setSelected(0);
    setComment("");
    setSubmitting(false);
  }

  if (!gdxReference) return null;

  const showForm = !existingReview || isEditing;

  return (
    <BriefingSection label="Your Experience" title="Review Our Service" theme={theme}>

      {/* ── Loading ── */}
      {loading && (
        <div className="flex items-center justify-center py-10">
          <div
            className="w-6 h-6 border-2 rounded-full animate-spin"
            style={{ borderColor: ORANGE, borderTopColor: "transparent" }}
          />
        </div>
      )}

      {/* ── Existing review (view mode) ── */}
      {!loading && existingReview && !isEditing && (
        <div
          className="rounded-2xl border p-6 space-y-3"
          style={{ backgroundColor: bgCard, borderColor: border }}
        >
          {/* Stars */}
          <div className="flex gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="w-6 h-6"
                style={{
                  fill:        i < existingReview.rating ? ORANGE : "none",
                  color:       i < existingReview.rating ? ORANGE : isDark ? "#555" : "#CCC",
                  strokeWidth: 1.5,
                }}
              />
            ))}
          </div>

          {/* Thank you */}
          <div>
            <p className="font-condensed font-bold text-base" style={{ color: textPrimary }}>
              Thank you for your feedback! 🧡
            </p>
            <p className="font-body text-sm" style={{ color: ORANGE }}>
              We hope you have an amazing trip.
            </p>
          </div>

          {/* Comment */}
          {existingReview.comment && (
            <p
              className="font-body text-sm leading-relaxed italic px-4 py-3 rounded-xl"
              style={{
                backgroundColor: isDark ? "rgba(255,140,0,0.07)" : "rgba(255,140,0,0.05)",
                color: textSecondary,
              }}
            >
              "{existingReview.comment}"
            </p>
          )}

          {/* Edit button */}
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 font-body text-xs font-semibold px-4 py-2 rounded-xl border transition-all hover:opacity-80 mt-1"
            style={{ borderColor: border, color: textSecondary }}
          >
            <Pencil className="w-3.5 h-3.5" />
            Edit Review
          </button>
        </div>
      )}

      {/* ── Review form (new or edit) ── */}
      {!loading && showForm && (
        <div className="space-y-5">

          {/* Edit mode header */}
          {isEditing && (
            <div className="flex items-center justify-between">
              <p className="font-body text-sm font-semibold" style={{ color: textSecondary }}>
                Update your review
              </p>
              <button
                onClick={handleCancel}
                className="flex items-center gap-1 font-body text-xs px-3 py-1.5 rounded-lg border transition-all hover:opacity-70"
                style={{ borderColor: border, color: textSecondary }}
              >
                <X className="w-3 h-3" /> Cancel
              </button>
            </div>
          )}

          {/* Star selector */}
          <div>
            {!isEditing && (
              <p className="font-body text-sm mb-3" style={{ color: textSecondary }}>
                How would you rate your experience with Gladex Tours?
              </p>
            )}
            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, i) => {
                const filled = i < (hovered || selected);
                return (
                  <button
                    key={i}
                    onClick={() => setSelected(i + 1)}
                    onMouseEnter={() => setHovered(i + 1)}
                    onMouseLeave={() => setHovered(0)}
                    className="transition-transform hover:scale-110 focus:outline-none"
                    aria-label={`Rate ${i + 1} star${i === 0 ? "" : "s"}`}
                  >
                    <Star
                      className="w-8 h-8"
                      style={{
                        fill:        filled ? ORANGE : "none",
                        color:       filled ? ORANGE : isDark ? "#555" : "#CCC",
                        strokeWidth: 1.5,
                        transition:  "all 0.12s ease",
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Comment */}
          <div>
            <p
              className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] mb-2"
              style={{ color: textSecondary }}
            >
              Comments{" "}
              <span className="normal-case tracking-normal font-normal text-xs">(optional)</span>
            </p>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us about your experience…"
              rows={3}
              className="w-full rounded-xl border px-4 py-3 font-body text-sm resize-none focus:outline-none transition-colors"
              style={{ backgroundColor: bgCard, borderColor: border, color: textPrimary }}
            />
          </div>

          {error && (
            <p className="font-body text-sm" style={{ color: "#EF4444" }}>
              {error}
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={!selected || submitting}
            className="w-full py-3 rounded-xl font-condensed font-bold text-base tracking-wide transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: ORANGE, color: "#080808" }}
          >
            {submitting
              ? isEditing ? "Updating…" : "Submitting…"
              : isEditing ? "Update Review" : "Submit Review"}
          </button>

        </div>
      )}

    </BriefingSection>
  );
}
