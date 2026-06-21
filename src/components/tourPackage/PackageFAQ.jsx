import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const ORANGE = "#FF9913";

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b last:border-b-0" style={{ borderColor: "#F0F0F0" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3.5 text-left gap-4"
      >
        <span className="text-sm font-medium text-gray-800">{q}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 shrink-0 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 shrink-0 text-gray-400" />
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="text-sm text-gray-500 pb-4 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PackageFAQ({ faqs = [] }) {
  if (!faqs.length) return null;

  return (
    <div className="mt-10">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-6 rounded-full" style={{ backgroundColor: ORANGE }} />
        <h2 className="text-xl font-black font-condensed tracking-wide text-gray-900">FAQs</h2>
      </div>

      <div className="border rounded-xl overflow-hidden" style={{ borderColor: "#E5E5E5" }}>
        {faqs.map((faq, i) => (
          <div key={i} className="px-5">
            <FAQItem q={faq.q} a={faq.a} />
          </div>
        ))}
      </div>

      <a
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-4 px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all hover:opacity-80"
        style={{ borderColor: "#D0D0D0", color: "#555" }}
      >
        Help Center
      </a>
    </div>
  );
}
