// @ts-nocheck
import { useState } from "react";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const ORANGE = "#FF8C00";

function TravelerTypeCard({ type, icon, requirements, note, theme }) {
  const [open, setOpen] = useState(false);
  const { bgCard, bgAlt, border, textPrimary, textSecondary, isDark } = theme;

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ borderColor: border, backgroundColor: bgCard }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors gap-4"
        style={{ backgroundColor: open ? (isDark ? "#1A1500" : "#FFF8F0") : bgCard }}
      >
        <div className="flex items-center gap-3">
          <span className="text-xl shrink-0">{icon}</span>
          <span
            className="font-condensed font-bold text-base lg:text-lg tracking-wide"
            style={{ color: textPrimary }}
          >
            {type}
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
              className="px-5 pb-5 pt-3 border-t space-y-4"
              style={{ borderColor: border, backgroundColor: bgAlt }}
            >
              {/* Requirements list */}
              <div>
                <p
                  className="font-body text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ color: ORANGE }}
                >
                  Required Documents
                </p>
                <ul className="space-y-2">
                  {requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check
                        className="w-4 h-4 mt-0.5 shrink-0"
                        style={{ color: ORANGE }}
                      />
                      <span
                        className="font-body text-sm leading-relaxed"
                        style={{ color: textSecondary }}
                      >
                        {req}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Advisory note */}
              {note && (
                <div
                  className="px-4 py-3 rounded-xl border-l-4 text-sm font-body leading-relaxed"
                  style={{
                    borderLeftColor: ORANGE,
                    backgroundColor: isDark ? "#1E1200" : "#FFFAF0",
                    color: textSecondary,
                  }}
                >
                  <span
                    className="font-semibold text-xs uppercase tracking-wide block mb-1"
                    style={{ color: ORANGE }}
                  >
                    Advisory
                  </span>
                  {note}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ImmigrationAdvisory({ advisory = [], theme }) {
  if (!advisory.length) return null;

  return (
    <div className="space-y-3">
      {advisory.map((item, i) => (
        <TravelerTypeCard
          key={i}
          type={item.type}
          icon={item.icon}
          requirements={item.requirements}
          note={item.note}
          theme={theme}
        />
      ))}
    </div>
  );
}
