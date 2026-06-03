// @ts-nocheck
import { Check, X } from "lucide-react";

const ORANGE = "#FF8C00";
const GREEN = "#22C55E";
const RED = "#EF4444";

export default function DosAndDonts({ dos = [], donts = [], theme }) {
  const { bgCard, border, textPrimary, textSecondary, isDark } = theme;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* DO'S column */}
      <div
        className="rounded-2xl border overflow-hidden"
        style={{ borderColor: isDark ? "#14532D" : "#BBF7D0", backgroundColor: isDark ? "#0D1F10" : "#F0FFF4" }}
      >
        <div
          className="px-5 py-4 border-b flex items-center gap-2"
          style={{ borderColor: isDark ? "#14532D" : "#BBF7D0" }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: GREEN }}
          >
            <Check className="w-4 h-4 text-white" strokeWidth={3} />
          </div>
          <h3
            className="font-condensed font-black text-xl tracking-wide"
            style={{ color: isDark ? "#86EFAC" : "#15803D" }}
          >
            DO'S
          </h3>
        </div>
        <ul className="px-5 py-4 space-y-3">
          {dos.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <Check
                className="w-4 h-4 mt-0.5 shrink-0"
                style={{ color: GREEN }}
                strokeWidth={2.5}
              />
              <span
                className="font-body text-sm leading-relaxed"
                style={{ color: isDark ? "#86EFAC" : "#166534" }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* DON'TS column */}
      <div
        className="rounded-2xl border overflow-hidden"
        style={{ borderColor: isDark ? "#7F1D1D" : "#FECACA", backgroundColor: isDark ? "#1C0808" : "#FFF5F5" }}
      >
        <div
          className="px-5 py-4 border-b flex items-center gap-2"
          style={{ borderColor: isDark ? "#7F1D1D" : "#FECACA" }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: RED }}
          >
            <X className="w-4 h-4 text-white" strokeWidth={3} />
          </div>
          <h3
            className="font-condensed font-black text-xl tracking-wide"
            style={{ color: isDark ? "#FCA5A5" : "#B91C1C" }}
          >
            DON'TS
          </h3>
        </div>
        <ul className="px-5 py-4 space-y-3">
          {donts.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <X
                className="w-4 h-4 mt-0.5 shrink-0"
                style={{ color: RED }}
                strokeWidth={2.5}
              />
              <span
                className="font-body text-sm leading-relaxed"
                style={{ color: isDark ? "#FCA5A5" : "#991B1B" }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
