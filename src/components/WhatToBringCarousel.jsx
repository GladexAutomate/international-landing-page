// @ts-nocheck
import BriefingSection from "./briefing/BriefingSection";

export default function WhatToBringCarousel({ items = [], theme }) {
  const { textPrimary } = theme;

  if (!items.length) return null;

  return (
    <BriefingSection label="Packing Guide" title="What to Bring" theme={theme}>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="rounded-3xl overflow-hidden"
            style={{
              backgroundColor: "#FFFFFF",
              boxShadow: "0 2px 18px rgba(0,0,0,0.08)",
              border: "1px solid #F0EDE9",
            }}
          >
            {/* Big emoji fill */}
            <div
              className="flex items-center justify-center"
              style={{ backgroundColor: "#FFF8F0", height: 130 }}
            >
              <span style={{ fontSize: 64, lineHeight: 1 }}>{item.icon}</span>
            </div>
            {/* Label */}
            <div className="px-3 py-3">
              <p
                className="font-condensed font-bold text-sm text-center leading-snug"
                style={{ color: textPrimary }}
              >
                {item.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </BriefingSection>
  );
}
