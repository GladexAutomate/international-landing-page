// @ts-nocheck
// DEMO MODE ONLY — Replace with real gateway integration later
// This modal simulates a payment gateway flow for stakeholder visualization.
// No actual payment is processed. Remove this file when wiring up a real gateway.

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, XCircle } from "lucide-react";

const ORANGE = "#FF9913";

function generateDemoRef() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "DEMO-";
  for (let i = 0; i < 8; i++) {
    s += chars[Math.floor(Math.random() * chars.length)];
    if (i === 3) s += "-";
  }
  return s;
}

/**
 * DEMO MODE ONLY
 * Simulates a payment gateway modal for stakeholder demonstrations.
 *
 * @param {Object}   props
 * @param {Object}   props.method      - selected PaymentMethod from PAYMENT_METHODS
 * @param {number}   props.total       - cart total in PHP
 * @param {Object}   props.theme       - ThemeContext theme object
 * @param {Function} props.onSuccess   - (demoRef: string) => void
 * @param {Function} props.onCancel    - () => void
 */
export default function DemoPaymentModal({ method, total, theme, onSuccess, onCancel }) {
  const { border, textPrimary, textSecondary, isDark } = theme;

  // Stable demo ref — generated once per modal open
  const [demoRef] = useState(() => generateDemoRef());
  const [simState, setSimState] = useState("idle"); // "idle" | "processing" | "failed"

  const handleSimulateSuccess = () => {
    setSimState("processing");
    // Small deliberate delay to make the "processing" feel realistic for demo purposes
    setTimeout(() => onSuccess(demoRef), 1400);
  };

  const handleSimulateFailed = () => {
    setSimState("failed");
  };

  const canInteract = simState !== "processing";

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0,0,0,0.82)", backdropFilter: "blur(6px)" }}
        onClick={canInteract ? onCancel : undefined}
      />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, y: 56 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 56 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative w-full sm:max-w-sm flex flex-col rounded-t-3xl sm:rounded-3xl overflow-hidden"
        style={{
          backgroundColor: isDark ? "#161616" : "#FFFFFF",
          maxHeight: "90vh",
          boxShadow: isDark
            ? "0 -8px 60px rgba(0,0,0,0.7)"
            : "0 -4px 40px rgba(0,0,0,0.14)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 pt-5 pb-4 border-b flex items-start justify-between" style={{ borderColor: border }}>
          <div>
            <p className="font-body text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: ORANGE }}>
              Demo Mode Only
            </p>
            <h2 className="font-condensed font-black text-xl" style={{ color: textPrimary }}>
              Payment Gateway
            </h2>
          </div>
          {canInteract && (
            <button
              onClick={onCancel}
              className="w-9 h-9 rounded-xl flex items-center justify-center border transition-all hover:opacity-70"
              style={{ borderColor: border, color: textPrimary }}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Body */}
        <div className="px-5 py-5 flex-1 overflow-y-auto">
          <div className="space-y-5">

            {/* Provider card */}
            <div
              className="rounded-2xl border p-5 text-center"
              style={{ borderColor: border, backgroundColor: isDark ? "#1E1E1E" : "#F8F8F8" }}
            >
              <p className="text-5xl mb-3">{method.emoji}</p>
              <p className="font-condensed font-black text-2xl" style={{ color: textPrimary }}>
                {method.label}
              </p>
              <p className="font-body text-xs mt-1 leading-relaxed" style={{ color: textSecondary }}>
                {method.description}
              </p>
            </div>

            {/* Amount + Reference */}
            <div
              className="rounded-xl border overflow-hidden"
              style={{ borderColor: border }}
            >
              <div className="px-4 py-3 flex justify-between items-center border-b" style={{ borderColor: border }}>
                <span className="font-body text-sm" style={{ color: textSecondary }}>Amount Due</span>
                <span className="font-condensed font-black text-2xl" style={{ color: ORANGE }}>
                  ₱{total.toLocaleString()}
                </span>
              </div>
              <div className="px-4 py-3 flex justify-between items-center">
                <span className="font-body text-sm" style={{ color: textSecondary }}>Demo Reference</span>
                <span className="font-body text-sm font-bold tracking-wider" style={{ color: textPrimary }}>
                  {demoRef}
                </span>
              </div>
            </div>

            {/* Failed state notice */}
            <AnimatePresence>
              {simState === "failed" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div
                    className="flex items-start gap-3 rounded-xl border p-4"
                    style={{ borderColor: "#EF4444", backgroundColor: isDark ? "rgba(239,68,68,0.08)" : "#FFF5F5" }}
                  >
                    <XCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#EF4444" }} />
                    <p className="font-body text-sm leading-relaxed" style={{ color: isDark ? "#FCA5A5" : "#B91C1C" }}>
                      Payment failed (simulated). No charge was made. Try again or select a different provider.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Processing state */}
            <AnimatePresence>
              {simState === "processing" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-3 py-3"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 rounded-full shrink-0"
                    style={{ borderColor: `${ORANGE}30`, borderTopColor: ORANGE }}
                  />
                  <p className="font-body text-sm" style={{ color: textSecondary }}>Processing payment…</p>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

        {/* Footer */}
        {simState !== "processing" && (
          <div className="px-5 pb-6 pt-2 space-y-2.5">
            <button
              onClick={handleSimulateSuccess}
              className="w-full font-condensed font-black text-lg py-3.5 rounded-xl transition-all active:scale-[0.98]"
              style={{ backgroundColor: "#22C55E", color: "#FFFFFF" }}
            >
              Simulate Success
            </button>
            <button
              onClick={handleSimulateFailed}
              className="w-full font-condensed font-black text-lg py-3.5 rounded-xl border-2 transition-all active:scale-[0.98]"
              style={{
                borderColor: "#EF4444",
                color: "#EF4444",
                backgroundColor: simState === "failed"
                  ? (isDark ? "rgba(239,68,68,0.08)" : "#FFF5F5")
                  : "transparent",
              }}
            >
              Simulate Failed
            </button>
            <button
              onClick={onCancel}
              className="w-full font-body font-semibold text-sm py-2 transition-all active:opacity-70"
              style={{ color: textSecondary }}
            >
              Cancel
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
