// @ts-nocheck
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const ORANGE = "#FF8C00";

function FAQItem({ q, a, theme }) {
  const [open, setOpen] = useState(false);
  const { bgCard, border, textPrimary, textSecondary, isDark } = theme;

  return (
    <div
      className="border-b last:border-b-0"
      style={{ borderColor: border }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between py-4 text-left gap-4"
      >
        <span
          className="font-body text-sm font-semibold leading-snug"
          style={{ color: textPrimary }}
        >
          {q}
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4 shrink-0 mt-0.5" style={{ color: ORANGE }} />
        ) : (
          <ChevronDown className="w-4 h-4 shrink-0 mt-0.5" style={{ color: textSecondary }} />
        )}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p
              className="font-body text-sm leading-relaxed pb-4"
              style={{ color: textSecondary }}
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function BriefingFAQ({ faqs = [], theme }) {
  if (!faqs.length) return null;
  const { bgCard, border } = theme;

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ borderColor: border, backgroundColor: bgCard }}
    >
      {faqs.map((faq, i) => (
        <div key={i} className="px-5">
          <FAQItem q={faq.q} a={faq.a} theme={theme} />
        </div>
      ))}
    </div>
  );
}
