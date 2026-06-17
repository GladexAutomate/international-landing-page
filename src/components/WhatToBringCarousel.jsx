// @ts-nocheck
import { useState } from "react";
import BriefingSection from "./briefing/BriefingSection";

// Emoji → Unsplash photo mapping for common travel packing items
const EMOJI_IMG = {
  "👟": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
  "👠": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
  "🥿": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
  "👕": "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&q=80",
  "👗": "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&q=80",
  "👔": "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&q=80",
  "🧥": "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80",
  "🧣": "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80",
  "🧤": "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80",
  "🌂": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
  "☂️": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
  "🧴": "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&q=80",
  "🪲": "https://images.unsplash.com/photo-1563841930606-67e2bce48b78?w=400&q=80",
  "💊": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80",
  "🌡️": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80",
  "💵": "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=400&q=80",
  "💴": "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=400&q=80",
  "💶": "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=400&q=80",
  "💳": "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=400&q=80",
  "🔌": "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80",
  "🔋": "https://images.unsplash.com/photo-1609252926050-3e6e0e8a14e4?w=400&q=80",
  "💡": "https://images.unsplash.com/photo-1609252926050-3e6e0e8a14e4?w=400&q=80",
  "📄": "https://images.unsplash.com/photo-1568667256549-094345857637?w=400&q=80",
  "🖨️": "https://images.unsplash.com/photo-1568667256549-094345857637?w=400&q=80",
  "🛂": "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=80",
  "📱": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80",
  "📸": "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&q=80",
  "📷": "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&q=80",
  "🎒": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80",
  "💧": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80",
  "🕶️": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80",
  "🩺": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80",
  "🧷": "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&q=80",
  "🌞": "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&q=80",
  "☀️": "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&q=80",
};

function ItemCard({ item, textPrimary }) {
  const imgSrc = EMOJI_IMG[item.icon];
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div
      className="rounded-3xl overflow-hidden flex flex-col"
      style={{
        backgroundColor: "#FFFFFF",
        boxShadow: "0 2px 18px rgba(0,0,0,0.08)",
        border: "1px solid #F0EDE9",
      }}
    >
      {/* Image area */}
      <div
        className="relative overflow-hidden flex items-center justify-center"
        style={{ height: 130, backgroundColor: "#FFF8F0" }}
      >
        {imgSrc && !imgFailed ? (
          <img
            src={imgSrc}
            alt={item.label}
            className="w-full h-full object-cover"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span style={{ fontSize: 56, lineHeight: 1 }}>{item.icon}</span>
        )}
      </div>
      {/* Label */}
      <div className="px-3 py-3 flex-1 flex items-center justify-center">
        <p
          className="font-condensed font-bold text-xs text-center leading-snug"
          style={{ color: textPrimary }}
        >
          {item.label}
        </p>
      </div>
    </div>
  );
}

export default function WhatToBringCarousel({ items = [], theme }) {
  const { textPrimary } = theme;

  if (!items.length) return null;

  return (
    <BriefingSection label="Packing Guide" title="What to Bring" theme={theme}>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {items.map((item, i) => (
          <ItemCard key={i} item={item} textPrimary={textPrimary} />
        ))}
      </div>
    </BriefingSection>
  );
}
