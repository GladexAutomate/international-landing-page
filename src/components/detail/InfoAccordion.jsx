import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function InfoAccordion({ sections }) {
  const [open, setOpen] = useState(null);

  return (
    <div className="space-y-2">
      {sections.map((section, i) => (
        <div
          key={i}
          className="border border-white/10 rounded-sm overflow-hidden hover:border-white/20 transition-colors"
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between p-4 text-left focus-ring group"
            aria-expanded={open === i}
          >
            <span className="font-body text-white text-sm font-semibold group-hover:text-gladex-orange transition-colors">
              {section.title}
            </span>
            <motion.div
              animate={{ rotate: open === i ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="shrink-0"
            >
              <ChevronDown className="w-4 h-4 text-chrome" />
            </motion.div>
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0 border-t border-white/8">
                  {typeof section.content === "string" ? (
                    <p className="font-body text-chrome text-sm leading-relaxed">
                      {section.content}
                    </p>
                  ) : (
                    section.content
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}