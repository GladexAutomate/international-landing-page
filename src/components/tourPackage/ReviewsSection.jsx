import { Star } from "lucide-react";
import { motion } from "framer-motion";

const ORANGE = "#FF8C00";

export default function ReviewsSection({ reviews = [] }) {
  if (!reviews.length) return null;

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1 h-6 rounded-full shrink-0" style={{ backgroundColor: ORANGE }} />
        <h2 className="text-xl font-black font-condensed tracking-wide text-gray-900">What Travelers Say</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {reviews.map((rev, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="p-4 rounded-2xl border border-gray-100 bg-gray-50"
          >
            <div className="flex items-center gap-0.5 mb-2">
              {Array.from({ length: rev.rating }).map((_, j) => (
                <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-sm text-gray-700 leading-relaxed mb-3 italic">"{rev.text}"</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: ORANGE }}
                >
                  {rev.name[0]}
                </div>
                <span className="text-xs font-semibold text-gray-700">{rev.name}</span>
              </div>
              <span className="text-xs text-gray-400">{rev.date}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}