import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle } from "lucide-react";

export default function PackageCard({ pkg, isActive, onSelect }) {
  return (
    <div
      className={`rounded-sm overflow-hidden border cursor-pointer transition-all duration-300 ${
        isActive
          ? "border-gladex-orange"
          : "border-white/10 hover:border-white/30"
      }`}
      onClick={onSelect}
    >
      <div className="p-5 glass-panel">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div
              className="font-body text-[9px] tracking-[0.25em] text-gladex-orange uppercase mb-1"
              style={{ fontFamily: "monospace" }}
            >
              {pkg.code}
            </div>
            <h3 className="font-condensed font-bold text-white text-xl leading-tight">
              {pkg.name}
            </h3>
            <p className="font-body text-chrome text-xs mt-1">{pkg.duration}</p>
          </div>
          <div className="text-right shrink-0">
            <div className="font-body text-[10px] text-chrome mb-0.5">From</div>
            <div className="font-condensed text-2xl font-black text-gladex-orange leading-none">
              ₱{pkg.rates.adult.toLocaleString()}
            </div>
            <div className="font-body text-[10px] text-chrome">/ person</div>
          </div>
        </div>
        <div
          className={`mt-2 text-[10px] font-semibold tracking-wider transition-colors ${
            isActive ? "text-gladex-orange" : "text-chrome"
          }`}
        >
          {isActive ? "▲ Selected" : "▼ View Details"}
        </div>
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <div className="p-5 border-t border-white/10 bg-white/2 space-y-5">
              {/* Rates */}
              <div>
                <div className="font-body text-[10px] tracking-[0.25em] text-gladex-orange uppercase mb-3" style={{ fontFamily: "monospace" }}>
                  Package Rates
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { label: "Adult Rate", value: pkg.rates.adult },
                    { label: "Single Supplement", value: pkg.rates.singleSupplement },
                    pkg.rates.childNoBed && { label: "Child No Bed", value: pkg.rates.childNoBed },
                  ].filter(Boolean).map((rate) => (
                    <div key={rate.label} className="flex items-center justify-between glass-panel rounded-sm px-4 py-3">
                      <span className="font-body text-chrome text-xs">{rate.label}</span>
                      <span className="font-condensed font-bold text-white text-lg">
                        ₱{rate.value.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
                {pkg.rates.downpayment && (
                  <div className="mt-2 flex items-center justify-between border border-gladex-orange/40 rounded-sm px-4 py-3 bg-gladex-orange/5">
                    <span className="font-body text-gladex-orange text-xs font-semibold">Downpayment Required</span>
                    <span className="font-condensed font-black text-gladex-orange text-xl">
                      ₱{pkg.rates.downpayment.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              {/* Travel dates */}
              {pkg.travelDates && pkg.travelDates.length > 0 && (
                <div>
                  <div className="font-body text-[10px] tracking-[0.25em] text-gladex-orange uppercase mb-3" style={{ fontFamily: "monospace" }}>
                    Travel Dates
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {pkg.travelDates.map((date, i) => (
                      <span key={i} className="font-body text-xs text-white glass-panel px-3 py-1.5 rounded-sm border border-white/10">
                        {date}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Highlights */}
              {pkg.highlights && (
                <div>
                  <div className="font-body text-[10px] tracking-[0.25em] text-gladex-orange uppercase mb-3" style={{ fontFamily: "monospace" }}>
                    Main Highlights
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {pkg.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-gladex-orange mt-0.5 shrink-0" />
                        <span className="font-body text-white/80 text-xs">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Inclusions */}
              {pkg.inclusions && (
                <div>
                  <div className="font-body text-[10px] tracking-[0.25em] text-gladex-orange uppercase mb-3" style={{ fontFamily: "monospace" }}>
                    Package Inclusions
                  </div>
                  <div className="space-y-1.5">
                    {pkg.inclusions.map((inc, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-gladex-orange mt-0.5">✓</span>
                        <span className="font-body text-white/80 text-xs">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Optional Tours */}
              {pkg.optionalTours && (
                <div>
                  <div className="font-body text-[10px] tracking-[0.25em] text-gladex-orange uppercase mb-3" style={{ fontFamily: "monospace" }}>
                    Optional Tours
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {pkg.optionalTours.map((t, i) => (
                      <span key={i} className="font-body text-xs text-chrome border border-white/10 px-3 py-1 rounded-sm">+ {t}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}