// @ts-nocheck
import { useState, useEffect } from "react";
import { Check } from "lucide-react";

const ORANGE = "#FF8C00";

export default function TravelChecklist({ items = [], storageKey, theme }) {
  const { bgCard, bgAlt, border, textPrimary, textSecondary, isDark } = theme;

  // Load initial state from localStorage
  const [checked, setChecked] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Persist to localStorage whenever checked state changes
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(checked));
    } catch {
      // localStorage unavailable (e.g. private browsing) — silently ignore
    }
  }, [checked, storageKey]);

  const completedCount = items.filter((item) => checked[item.id]).length;
  const totalCount = items.length;
  const allDone = completedCount === totalCount;

  function toggle(id) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function resetAll() {
    setChecked({});
  }

  return (
    <div>
      {/* Progress header */}
      <div
        className="flex items-center justify-between px-5 py-4 rounded-2xl mb-4 border"
        style={{
          backgroundColor: allDone
            ? isDark ? "#0D2010" : "#F0FFF4"
            : isDark ? "#1A1200" : "#FFF8F0",
          borderColor: allDone ? "#22C55E" : ORANGE,
        }}
      >
        <div>
          <p
            className="font-condensed font-black text-lg"
            style={{ color: allDone ? "#22C55E" : ORANGE }}
          >
            {allDone ? "✅ All Done! You're Ready to Travel." : `${completedCount} of ${totalCount} completed`}
          </p>
          {!allDone && (
            <p className="font-body text-xs mt-0.5" style={{ color: textSecondary }}>
              Tap each item to mark it as done. Progress is saved automatically.
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

      {/* Progress bar */}
      <div
        className="w-full h-2 rounded-full mb-5 overflow-hidden"
        style={{ backgroundColor: isDark ? "#2A2A2A" : "#E5E5E5" }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${(completedCount / totalCount) * 100}%`,
            backgroundColor: allDone ? "#22C55E" : ORANGE,
          }}
        />
      </div>

      {/* Checklist items */}
      <div className="space-y-2">
        {items.map((item) => {
          const isChecked = !!checked[item.id];
          return (
            <button
              key={item.id}
              onClick={() => toggle(item.id)}
              className="w-full flex items-start gap-3 px-4 py-3.5 rounded-xl border text-left transition-all"
              style={{
                backgroundColor: isChecked
                  ? isDark ? "#0D1F10" : "#F0FFF4"
                  : bgCard,
                borderColor: isChecked ? "#22C55E" : border,
              }}
            >
              {/* Checkbox indicator */}
              <div
                className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border-2 transition-all"
                style={{
                  backgroundColor: isChecked ? "#22C55E" : "transparent",
                  borderColor: isChecked ? "#22C55E" : (isDark ? "#555" : "#CCC"),
                }}
              >
                {isChecked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
              </div>
              <span
                className="font-body text-sm leading-relaxed"
                style={{
                  color: isChecked ? (isDark ? "#86EFAC" : "#15803D") : textPrimary,
                  textDecoration: isChecked ? "line-through" : "none",
                  opacity: isChecked ? 0.75 : 1,
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
