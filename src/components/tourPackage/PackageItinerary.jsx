import { motion } from "framer-motion";

const ORANGE = "#FF8C00";

export default function PackageItinerary({ itinerary = [] }) {
  if (!itinerary.length) return null;

  return (
    <div className="mt-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 rounded-full" style={{ backgroundColor: ORANGE }} />
        <h2 className="text-xl font-black font-condensed tracking-wide text-gray-900">
          Day-by-Day Itinerary
        </h2>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div
          className="absolute left-5 top-2 bottom-2 w-0.5"
          style={{ backgroundColor: ORANGE, opacity: 0.2 }}
        />

        <div className="space-y-4">
          {itinerary.map((day, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex gap-4"
            >
              {/* Day bubble */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-condensed font-black text-sm text-white z-10"
                style={{ backgroundColor: ORANGE }}
              >
                D{day.day}
              </div>

              {/* Content */}
              <div className="flex-1 rounded-xl border border-gray-100 bg-gray-50 p-4 shadow-sm">
                <p className="font-bold text-sm text-gray-900 mb-2">
                  DAY {day.day} — {day.title}
                </p>
                <ul className="space-y-1">
                  {day.activities.map((a, j) => (
                    <li key={j} className="flex items-start gap-1.5 text-xs text-gray-600">
                      <span className="mt-0.5 shrink-0" style={{ color: ORANGE }}>›</span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}