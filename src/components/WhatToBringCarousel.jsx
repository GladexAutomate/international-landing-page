// @ts-nocheck
import BriefingSection from "./briefing/BriefingSection";

const ORANGE = "#FF9913";

export default function WhatToBringCarousel({ items = [], theme }) {
  const { textPrimary } = theme;

  if (!items.length) return null;

  return (
    <BriefingSection label="Packing Guide" title="What to Bring" theme={theme}>
      <div className="flex flex-col gap-2">
        {items.map((item, i) => (
          <div
            key={i}
            className="px-4 py-3"
            style={{
              borderLeft: `3px solid ${ORANGE}`,
              borderTop: "1px solid #F0E8DC",
              borderRight: "1px solid #F0E8DC",
              borderBottom: "1px solid #F0E8DC",
              borderRadius: "0 10px 10px 0",
              backgroundColor: "#FFFBF7",
            }}
          >
            <p className="font-body text-sm leading-snug" style={{ color: textPrimary }}>
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </BriefingSection>
  );
}
