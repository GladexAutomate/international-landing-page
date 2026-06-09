// @ts-nocheck
import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { supabase } from "../lib/supabase";
import BriefingSection from "./briefing/BriefingSection";

const ORANGE = "#FF8C00";

export default function RateMyService({ theme, gdxReference }) {
  const { bgCard, border, textPrimary, textSecondary, isDark } = theme;

  const [loading,        setLoading]        = useState(true);
  const [existingReview, setExistingReview] = useState(null); // { rating, comment } | null
  const [hovered,        setHovered]        = useState(0);
  const [selected,       setSelected]       = useState(0);
  const [comment,        setComment]        = useState("");
  const [submitting,     setSubmitting]     = useState(false);
  const [error,          setError]          = useState(null);

  // Fetch existing review whenever the GDX reference changes
  useEffect(() => {
    if (!gdxReference) { setLoading(false); return; }

    setLoading(true);
    setExistingReview(null);
    setSelected(0);
    setComment("");
    setError(null);

    supabase
      .from("reviews")
      .select("rating, comment")
      .eq("gdx_reference", gdxReference)
      .maybeSingle()
      .then(({ data, error: fetchError }) => {
        if (!fetchError && data) setExistingReview(data);
        setLoading(false);
      });
  }, [gdxReference]);

  async function handleSubmit() {
    if (!selected || !gdxReference || submitting) return;
    setSubmitting(true);
    setError(null);

    const { error: insertError } = await supabase.from("reviews").insert({
      gdx_reference: gdxReference,
      rating:        selected,
      comment:       comment.trim() || null,
    });

    if (insertError) {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
      return;
    }

    setExistingReview({ rating: selected, comment: comment.trim() || null });
    setSubmitting(false);
  }

  if (!gdxReference) return null;

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

      {/* ── Submitted / existing review ── */}
      {!loading && existingReview && (
        <div
          className="rounded-2xl border p-6 space-y-3"
          style={{ backgroundColor: bgCard, borderColor: border }}
        >
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

          <div>
            <p className="font-condensed font-bold text-base" style={{ color: textPrimary }}>
              Thank you for your feedback! 🧡
            </p>
            <p className="font-body text-sm" style={{ color: ORANGE }}>
              We hope you have an amazing trip.
            </p>
          </div>

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
        </div>
      )}

      {/* ── Review form ── */}
      {!loading && !existingReview && (
        <div className="space-y-5">

          <div>
            <p className="font-body text-sm mb-3" style={{ color: textSecondary }}>
              How would you rate your experience with Gladex Tours?
            </p>
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

          <div>
            <p
              className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] mb-2"
              style={{ color: textSecondary }}
            >
              Comments{" "}
              <span className="normal-case tracking-normal font-normal text-xs">
                (optional)
              </span>
            </p>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us about your experience…"
              rows={3}
              className="w-full rounded-xl border px-4 py-3 font-body text-sm resize-none focus:outline-none transition-colors"
              style={{
                backgroundColor: bgCard,
                borderColor:     border,
                color:           textPrimary,
              }}
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
            {submitting ? "Submitting…" : "Submit Review"}
          </button>

        </div>
      )}

    </BriefingSection>
  );
}
