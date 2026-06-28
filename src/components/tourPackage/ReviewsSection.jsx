// @ts-nocheck
import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getPublicReviews } from "../../services/reviewsService";

const ORANGE = "#FF9913";

const CARDS_PER_PAGE = 3;

const AVATAR_COLORS = [
  "#FF9913", "#E67E22", "#27AE60", "#2980B9", "#8E44AD", "#C0392B",
];

function InitialsAvatar({ name, index }) {
  const n = name?.trim();
  let initials = "?";
  if (n && n !== "Verified Traveler") {
    const parts = n.replace(",", "").trim().split(/\s+/);
    initials = parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : parts[0].slice(0, 2).toUpperCase();
  }
  const bg = AVATAR_COLORS[index % AVATAR_COLORS.length];
  return (
    <span
      className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-condensed font-black text-xs text-white"
      style={{ backgroundColor: bg }}
    >
      {initials}
    </span>
  );
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-PH", { year: "numeric", month: "long" });
}

// "DELA CRUZ, MARIA" → "Maria D." for public display (privacy-friendly)
function displayName(lead_name) {
  if (!lead_name?.trim()) return "Verified Traveler";
  const n = lead_name.trim();
  if (n.includes(",")) {
    const [last, first] = n.split(",").map(s => s.trim());
    const firstName = first.split(" ")[0];
    const cap = w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    return `${cap(firstName)} ${last[0]}.`;
  }
  const parts = n.split(/\s+/);
  if (parts.length === 1) return n.charAt(0) + n.slice(1).toLowerCase();
  const cap = w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
  return `${cap(parts[0])} ${parts[parts.length - 1][0]}.`;
}

export default function ReviewsSection({ destinationName = null }) {
  const [reviews, setReviews] = useState(null); // null = loading
  const [page, setPage]       = useState(0);

  useEffect(() => {
    async function load() {
      try {
        let data = await getPublicReviews(destinationName);
        // If no destination-specific reviews yet, show all public ones as social proof
        if (!data.length && destinationName) {
          data = await getPublicReviews(null);
        }
        setReviews(data);
      } catch {
        setReviews([]);
      }
    }
    load();
  }, [destinationName]);

  if (reviews === null) return null; // silent loading — no layout shift
  if (reviews.length === 0) return null; // no reviews yet — hide section entirely

  const allCards = reviews.map((r, i) => ({
    name:   displayName(r.lead_name),
    rating: r.rating ?? 5,
    text:   r.review_text?.trim() || null,
    date:   formatDate(r.created_at),
    index:  i,
  }));

  const totalPages = Math.ceil(allCards.length / CARDS_PER_PAGE);
  const visible    = allCards.slice(page * CARDS_PER_PAGE, page * CARDS_PER_PAGE + CARDS_PER_PAGE);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 rounded-full shrink-0" style={{ backgroundColor: ORANGE }} />
          <h2 className="text-xl font-black font-condensed tracking-wide text-gray-900">What Travelers Say</h2>
        </div>
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className="w-8 h-8 rounded-full border flex items-center justify-center transition-all disabled:opacity-30 hover:bg-gray-50"
              style={{ borderColor: ORANGE, color: ORANGE }}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs text-gray-400 font-medium">{page + 1} / {totalPages}</span>
            <button
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all disabled:opacity-30 text-white"
              style={{ backgroundColor: ORANGE }}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {visible.map((rev, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl flex flex-col gap-3"
              style={{ backgroundColor: "#fff", border: "1px solid rgba(255,153,19,0.15)", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
            >
              <div className="flex items-center gap-0.5">
                {Array.from({ length: Math.max(0, rev.rating) }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              {rev.text ? (
                <p className="text-sm text-gray-700 leading-relaxed flex-1 italic">"{rev.text}"</p>
              ) : (
                <p className="text-sm text-gray-400 leading-relaxed flex-1 italic">No review text provided.</p>
              )}
              <div className="flex items-center gap-2.5 pt-2 border-t border-gray-100">
                <InitialsAvatar name={rev.name} index={rev.index} />
                <div>
                  <p className="text-xs font-bold text-gray-800">{rev.name}</p>
                  <p className="text-[10px] text-gray-400">{rev.date}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Dot indicators */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 mt-4">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className="rounded-full transition-all"
              style={{ width: i === page ? 20 : 6, height: 6, backgroundColor: i === page ? ORANGE : "#D0D0D0" }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
