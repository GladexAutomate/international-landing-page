// @ts-nocheck
import { useState, useEffect } from "react";
import { Check } from "lucide-react";

const ORANGE = "#FF9913";

export default function TravelChecklist({ items = [], storageKey, theme }) {
  const { bgCard, border, textPrimary, textSecondary, isDark } = theme;

  const [checked, setChecked] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(checked));
    } catch {}
  }, [checked, storageKey]);

  const completedCount = items.filter((item) => checked[item.id]).length;
  const totalCount = items.length;
  const allDone = completedCount === totalCount && totalCount > 0;

  function toggle(id) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function resetAll() {
    setChecked({});
  }

  return (
    <div>
      {/* ── Progress header ─────────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-5 py-4 rounded-2xl mb-4 border"
        style={{
          backgroundColor: allDone
            ? isDark ? "#0D2010" : "#FFFFFF"
            : isDark ? "#1A1200" : "#FFFFFF",
          borderColor: allDone ? "#22C55E" : ORANGE,
        }}
      >
        <div>
          <p
            className="font-condensed font-black text-lg"
            style={{ color: allDone ? "#22C55E" : ORANGE }}
          >
            {allDone
              ? "✅ All set! You're ready to travel."
              : `${completedCount} of ${totalCount} confirmed`}
          </p>
          {!allDone && (
            <p className="font-body text-xs mt-0.5" style={{ color: textSecondary }}>
              Tap each item to mark as ready. Progress saves automatically.
            </p>
          )}
        </div>
        {completedCount > 0 && (
          <button
            onClick={resetAll}
            className="font-body text-xs px-3 py-1.5 rounded-lg border transition-opacity hover:opacity-70 shrink-0 ml-4"
            style={{ borderColor: border, color: textSecondary }}
          >
            Reset
          </button>
        )}
      </div>

      {/* ── Progress bar ────────────────────────────────────────────────── */}
      <div
        className="w-full h-1.5 rounded-full mb-5 overflow-hidden"
        style={{ backgroundColor: isDark ? "#2A2A2A" : "#E5E5E5" }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: totalCount > 0 ? `${(completedCount / totalCount) * 100}%` : "0%",
            backgroundColor: allDone ? "#22C55E" : ORANGE,
          }}
        />
      </div>

      {/* ── Checklist rows ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {items.map((item) => {
          const isChecked = !!checked[item.id];
          return (
            <button
              key={item.id}
              onClick={() => toggle(item.id)}
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left transition-all active:scale-[0.98] hover:opacity-90"
              style={{
                backgroundColor: isChecked
                  ? isDark ? "#0A1E0D" : "#FFFFFF"
                  : bgCard,
                borderColor: isChecked ? "#22C55E" : border,
              }}
            >
              {/* Checkbox circle */}
              <div
                className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200"
                style={{
                  backgroundColor: isChecked ? "#22C55E" : "transparent",
                  borderColor: isChecked ? "#22C55E" : isDark ? "#555" : "#CCC",
                }}
              >
                {isChecked && (
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                )}
              </div>

              {/* Label */}
              <p
                className="font-body text-sm leading-snug"
                style={{
                  color: isChecked ? "#22C55E" : textPrimary,
                  opacity: isChecked ? 0.72 : 1,
                }}
              >
                {item.label}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
