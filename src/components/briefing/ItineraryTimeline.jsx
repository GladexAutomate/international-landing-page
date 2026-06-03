// @ts-nocheck
import { useState } from "react";
import { ChevronDown, ChevronUp, MapPin } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const ORANGE = "#FF8C00";

function DayCard({ day, title, activities, theme, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  const { bgCard, bgAlt, border, textPrimary, textSecondary, isDark } = theme;

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ borderColor: border, backgroundColor: bgCard }}
    >
      {/* Day header — clickable */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors"
        style={{ backgroundColor: open ? (isDark ? "#1E1E00" : "#FFF8F0") : bgCard }}
      >
        <div className="flex items-center gap-3">
          {/* Day badge */}
          <span
            className="font-condensed font-black text-sm px-3 py-1 rounded-full shrink-0"
            style={{ backgroundColor: ORANGE, color: "#fff" }}
          >
            Day {day}
          </span>
          <span
            className="font-condensed font-bold text-base lg:text-lg tracking-wide"
            style={{ color: textPrimary }}
          >
            {title}
          </span>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 shrink-0" style={{ color: ORANGE }} />
        ) : (
          <ChevronDown className="w-4 h-4 shrink-0" style={{ color: textSecondary }} />
        )}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div
              className="px-5 pb-5 pt-2 border-t"
              style={{ borderColor: border, backgroundColor: bgAlt }}
            >
              <ul className="space-y-2.5 mt-1">
                {activities.map((activity, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="flex items-center justify-center mt-0.5 shrink-0">
                      <MapPin
                        className="w-3.5 h-3.5"
                        style={{ color: ORANGE }}
                      />
                    </div>
                    <span
                      className="font-body text-sm leading-relaxed"
                      style={{ color: textSecondary }}
                    >
                      {activity}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ItineraryTimeline({ itinerary = [], theme }) {
  if (!itinerary.length) return null;

  return (
    <div className="space-y-3">
      {itinerary.map((item, i) => (
        <DayCard
          key={i}
          day={item.day}
          title={item.title}
          activities={item.activities || []}
          theme={theme}
          defaultOpen={i === 0}
        />
      ))}
    </div>
  );
}
