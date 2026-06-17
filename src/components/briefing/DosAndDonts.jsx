// @ts-nocheck
import { Check, X } from "lucide-react";

const ORANGE = "#FF9913";
const GREEN = "#22C55E";
const RED = "#EF4444";

export default function DosAndDonts({ dos = [], donts = [], theme }) {
  const { bgCard, border, textPrimary, textSecondary, isDark } = theme;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* DO'S column — white card */}
      <div
        className="rounded-2xl border overflow-hidden"
        style={{ borderColor: "rgba(255,153,19,0.28)", backgroundColor: "#FFFFFF" }}
      >
        <div
          className="px-5 py-4 border-b flex items-center gap-2"
          style={{ borderColor: "rgba(255,153,19,0.28)", backgroundColor: "#FFFFFF" }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: GREEN }}
          >
            <Check className="w-4 h-4 text-white" strokeWidth={3} />
          </div>
          <h3 className="font-condensed font-black text-xl tracking-wide" style={{ color: textPrimary }}>
            DO'S
          </h3>
        </div>
        <ul className="px-5 py-4 space-y-3">
          {dos.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: GREEN }} strokeWidth={2.5} />
              <span className="font-body text-base leading-relaxed" style={{ color: textSecondary }}>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* DON'TS column — light orange card */}
      <div
        className="rounded-2xl border overflow-hidden"
        style={{ borderColor: "rgba(255,153,19,0.28)", backgroundColor: "#FFFFFF" }}
      >
        <div
          className="px-5 py-4 border-b flex items-center gap-2"
          style={{ borderColor: "rgba(255,153,19,0.28)", backgroundColor: "#FFFFFF" }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: RED }}
          >
            <X className="w-4 h-4 text-white" strokeWidth={3} />
          </div>
          <h3 className="font-condensed font-black text-xl tracking-wide" style={{ color: textPrimary }}>
            DON'TS
          </h3>
        </div>
        <ul className="px-5 py-4 space-y-3">
          {donts.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <X className="w-4 h-4 mt-0.5 shrink-0" style={{ color: RED }} strokeWidth={2.5} />
              <span className="font-body text-base leading-relaxed" style={{ color: textSecondary }}>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
