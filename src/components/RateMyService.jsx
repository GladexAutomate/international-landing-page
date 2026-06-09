// @ts-nocheck
import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";
import BriefingSection from "./briefing/BriefingSection";

const ORANGE = "#FF8C00";

const QUESTIONS = [
  { id: "booking", label: "Was the booking process easy?" },
  { id: "communication", label: "Was our team responsive and helpful?" },
  { id: "satisfaction", label: "Are you satisfied with the service so far?" },
];

const STAR_LABELS = ["", "Poor", "Fair", "Good", "Great", "Excellent!"];

export default function RateMyService({ theme }) {
  const { bgCard, border, textPrimary, textSecondary, isDark } = theme;
  const [ratings, setRatings] = useState({});
  const [wouldRefer, setWouldRefer] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const allAnswered =
    QUESTIONS.every((q) => ratings[q.id]) && wouldRefer !== null;

  if (submitted) {
    return (
      <BriefingSection label="Your Feedback" title="Rate My Service" theme={theme}>
        <div className="text-center py-10">
          <p className="text-5xl mb-4">🙏</p>
          <h4
            className="font-condensed font-black text-2xl mb-2"
            style={{ color: textPrimary }}
          >
            Thank You for Your Feedback!
          </h4>
          <p
            className="font-body text-sm leading-relaxed mb-6 max-w-sm mx-auto"
            style={{ color: textSecondary }}
          >
            Your input helps us improve the experience for every traveler. We
            truly appreciate you taking the time.
          </p>
          <a
            href="https://www.facebook.com/gladextours/reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body font-bold text-sm px-6 py-3 rounded-xl transition-all hover:opacity-90"
            style={{ backgroundColor: ORANGE, color: "#080808" }}
          >
            <ExternalLink className="w-4 h-4" /> Leave a Public Review
          </a>
        </div>
      </BriefingSection>
    );
  }

  return (
    <BriefingSection label="Your Feedback" title="Rate My Service" theme={theme}>
      <p
        className="font-body text-sm leading-relaxed mb-5"
        style={{ color: textSecondary }}
      >
        How was your booking experience so far? Your honest feedback helps us make every trip better.
      </p>

      <div className="space-y-4">
        {/* Star rating questions */}
        {QUESTIONS.map((q) => (
          <div
            key={q.id}
            className="rounded-2xl border p-4"
            style={{ backgroundColor: bgCard, borderColor: border }}
          >
            <p
              className="font-body text-sm font-semibold mb-3"
              style={{ color: textPrimary }}
            >
              {q.label}
            </p>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() =>
                    setRatings((r) => ({ ...r, [q.id]: star }))
                  }
                  className="transition-transform active:scale-110 p-0.5"
                >
                  <Star
                    className="w-7 h-7 fill-current transition-colors"
                    style={{
                      color:
                        (ratings[q.id] || 0) >= star
                          ? ORANGE
                          : isDark
                          ? "#2E2E2E"
                          : "#E5E5E5",
                    }}
                  />
                </button>
              ))}
              {ratings[q.id] && (
                <span
                  className="font-body text-xs ml-2"
                  style={{ color: ORANGE }}
                >
                  {STAR_LABELS[ratings[q.id]]}
                </span>
              )}
            </div>
          </div>
        ))}

        {/* Recommend question */}
        <div
          className="rounded-2xl border p-4"
          style={{ backgroundColor: bgCard, borderColor: border }}
        >
          <p
            className="font-body text-sm font-semibold mb-3"
            style={{ color: textPrimary }}
          >
            Would you recommend Gladex to a friend?
          </p>
          <div className="flex flex-wrap gap-2">
            {["Yes, definitely!", "Already did! 🎉", "Maybe later"].map(
              (opt) => (
                <button
                  key={opt}
                  onClick={() => setWouldRefer(opt)}
                  className="font-body font-bold text-sm px-4 py-2 rounded-xl transition-all"
                  style={{
                    backgroundColor:
                      wouldRefer === opt
                        ? ORANGE
                        : isDark
                        ? "rgba(255,255,255,0.06)"
                        : "#F5F5F5",
                    color:
                      wouldRefer === opt ? "#080808" : textSecondary,
                    border:
                      wouldRefer === opt
                        ? "none"
                        : `1px solid ${border}`,
                  }}
                >
                  {opt}
                </button>
              )
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <motion.button
            onClick={() => allAnswered && setSubmitted(true)}
            whileTap={allAnswered ? { scale: 0.97 } : {}}
            className="flex-1 font-condensed font-black text-lg py-3.5 rounded-xl transition-all"
            style={{
              backgroundColor: allAnswered
                ? ORANGE
                : isDark
                ? "#2A2A2A"
                : "#E5E5E5",
              color: allAnswered ? "#080808" : textSecondary,
              cursor: allAnswered ? "pointer" : "not-allowed",
            }}
          >
            Submit Feedback
          </motion.button>
          <a
            href="https://www.facebook.com/gladextours/reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body font-bold text-sm px-5 py-3.5 rounded-xl border flex items-center gap-2 justify-center transition-all hover:opacity-80"
            style={{ borderColor: ORANGE, color: ORANGE }}
          >
            <ExternalLink className="w-4 h-4" /> Leave a Review
          </a>
        </div>
      </div>
    </BriefingSection>
  );
}
