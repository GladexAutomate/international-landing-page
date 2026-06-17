import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ORANGE = "#FF9913";

// Rich review data with profile images
const defaultReviews = [
  {
    name: "Maria Santos",
    photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&q=80",
    rating: 5,
    text: "Very helpful destination guide! Everything I needed to know before my trip was here. The arrival instructions were especially clear.",
    date: "May 2025",
  },
  {
    name: "Renz Dela Cruz",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    rating: 5,
    text: "Excellent travel briefing. The cultural tips helped me prepare properly and avoid any awkward situations abroad.",
    date: "April 2025",
  },
  {
    name: "Liza Mendoza",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80",
    rating: 5,
    text: "Worth every detail! The packing list and weather guide saved me from overpacking. Will use Gladex again.",
    date: "March 2025",
  },
  {
    name: "Janine Reyes",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80",
    rating: 5,
    text: "The destination guide was so detailed. Nami Island tips were spot on — knew exactly what to expect!",
    date: "February 2025",
  },
  {
    name: "Carlo Macias",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
    rating: 5,
    text: "I loved how the guide covered emergency contacts and hotel check-in. Made everything stress-free.",
    date: "January 2025",
  },
  {
    name: "Grace Torres",
    photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&q=80",
    rating: 5,
    text: "First international trip and the briefing made me feel so confident. Food recommendations were amazing!",
    date: "December 2024",
  },
];

const CARDS_PER_PAGE = 3;

export default function ReviewsSection({ reviews = [] }) {
  const [page, setPage] = useState(0);

  const allReviews = reviews.length >= 3 ? reviews.map((r, i) => ({
    ...r,
    photo: defaultReviews[i % defaultReviews.length]?.photo,
    text: r.text || r.comment,
  })) : defaultReviews;

  const totalPages = Math.ceil(allReviews.length / CARDS_PER_PAGE);
  const visible = allReviews.slice(page * CARDS_PER_PAGE, page * CARDS_PER_PAGE + CARDS_PER_PAGE);

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
            <div key={i} className="p-4 rounded-2xl border border-gray-100 bg-gray-50 flex flex-col gap-3">
              {/* Stars */}
              <div className="flex items-center gap-0.5">
                {Array.from({ length: rev.rating || 5 }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Review text */}
              <p className="text-sm text-gray-700 leading-relaxed flex-1 italic">"{rev.text}"</p>

              {/* Reviewer */}
              <div className="flex items-center gap-2.5 pt-2 border-t border-gray-100">
                <img
                  src={rev.photo || `https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&q=80`}
                  alt={rev.name}
                  className="w-8 h-8 rounded-full object-cover shrink-0"
                />
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
              style={{
                width: i === page ? 20 : 6,
                height: 6,
                backgroundColor: i === page ? ORANGE : "#D0D0D0",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}