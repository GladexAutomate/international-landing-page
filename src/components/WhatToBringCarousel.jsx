// @ts-nocheck
import BriefingSection from "./briefing/BriefingSection";

export default function WhatToBringCarousel({ items = [], theme }) {
  const { textPrimary, textSecondary } = theme;

  if (!items.length) return null;

  return (
    <BriefingSection label="Packing Guide" title="What to Bring" theme={theme}>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center rounded-3xl py-5 px-3 gap-2"
            style={{
              backgroundColor: "#FFFFFF",
              boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
              border: "1px solid #F2EEE9",
            }}
          >
            <span className="text-3xl leading-none">{item.icon}</span>
            <p
              className="font-condensed font-bold text-xs leading-tight"
              style={{ color: textPrimary }}
            >
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </BriefingSection>
  );
}
