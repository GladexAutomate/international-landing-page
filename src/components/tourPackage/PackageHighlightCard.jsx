import { useState } from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const ORANGE = "#FF8C00";

// Strip booking/pricing-related keywords from highlights
function cleanHighlight(text) {
  return text;
}

export default function PackageHighlightCard({ dest, pkg }) {
  const [expanded, setExpanded] = useState(false);
  if (!dest || !pkg) return null;

  const highlights = pkg.highlights || [];
  const visibleCount = 4;
  const shownHighlights = expanded ? highlights : highlights.slice(0, visibleCount);

  return (
    <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-5 border-b border-gray-100" style={{ backgroundColor: "#FFF8F0" }}>
        <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: ORANGE }}>
          Destination Overview
        </p>
        <h3 className="text-lg font-black font-condensed text-gray-900 mb-1">{dest.name}</h3>
        <p className="text-sm text-gray-600">{dest.tagline}</p>

        {/* Info tags — no pricing, no duration */}
        <div className="mt-3 flex flex-wrap gap-2">
          {dest.country && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-white border text-gray-600 font-medium" style={{ borderColor: "#E5E5E5" }}>
              📍 {dest.country}
            </span>
          )}
          <span className="text-xs px-2.5 py-1 rounded-full bg-white border text-gray-600 font-medium" style={{ borderColor: "#E5E5E5" }}>
            ✈️ Confirmed Travelers
          </span>
        </div>
      </div>

      {/* Highlights */}
      {highlights.length > 0 && (
        <div className="p-5 bg-white">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-3">Key Experiences & Highlights</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <AnimatePresence>
              {shownHighlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{cleanHighlight(h)}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {highlights.length > visibleCount && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-4 flex items-center gap-1.5 text-xs font-semibold transition-colors"
              style={{ color: ORANGE }}
            >
              {expanded
                ? <><ChevronUp className="w-3.5 h-3.5" /> Show Less</>
                : <><ChevronDown className="w-3.5 h-3.5" /> View More ({highlights.length - visibleCount} more)</>
              }
            </button>
          )}
        </div>
      )}
    </div>
  );
}