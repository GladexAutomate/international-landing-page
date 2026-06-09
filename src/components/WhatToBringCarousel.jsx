// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BriefingSection from "./briefing/BriefingSection";

const ORANGE = "#FF8C00";

const CATEGORIES = [
  {
    key: "documents",
    label: "Documents",
    icon: "📋",
    items: [
      {
        name: "Passport",
        desc: "Valid for 6+ months beyond travel date",
        img: "/images/packing/documents/passport.jpg",
      },
      {
        name: "Travel Voucher",
        desc: "Print and save a digital copy",
        img: "/images/packing/documents/travel-voucher.jpg",
      },
      {
        name: "Flight Ticket",
        desc: "Printed or saved on your phone",
        img: "/images/packing/documents/flight-ticket.jpg",
      },
      {
        name: "Insurance Card",
        desc: "Keep emergency contacts inside",
        img: "/images/packing/documents/insurance-card.jpg",
      },
      {
        name: "Valid ID",
        desc: "Government issued photo ID",
        img: "/images/packing/documents/valid-id.jpg",
      },
    ],
  },
  {
    key: "essentials",
    label: "Essentials",
    icon: "🎒",
    items: [
      {
        name: "Cash",
        desc: "Budget for daily expenses, food & shopping",
        img: "/images/packing/essentials/cash.jpg",
      },
      {
        name: "Credit Card",
        desc: "Visa/Mastercard widely accepted",
        img: "/images/packing/essentials/credit-card.jpg",
      },
      {
        name: "Powerbank",
        desc: "10,000mAh minimum recommended",
        img: "/images/packing/essentials/powerbank.jpg",
      },
      {
        name: "Charger",
        desc: "Phone, camera & all device chargers",
        img: "/images/packing/essentials/charger.jpg",
      },
      {
        name: "Medicines",
        desc: "Paracetamol, antidiarrheal, motion sickness",
        img: "/images/packing/essentials/medicines.jpg",
      },
    ],
  },
  {
    key: "destination",
    label: "Destination Specific",
    icon: "🌴",
    items: [
      {
        name: "Beachwear",
        desc: "Swimsuit, boardshorts & cover-up",
        img: "/images/packing/destination/beachwear.jpg",
      },
      {
        name: "Slippers",
        desc: "Easy to slip on for beach & temples",
        img: "/images/packing/destination/slippers.jpg",
      },
      {
        name: "Sunscreen",
        desc: "SPF 50+ strongly recommended",
        img: "/images/packing/destination/sunscreen.jpg",
      },
      {
        name: "Waterproof Bag",
        desc: "Protect valuables near water",
        img: "/images/packing/destination/waterproof-bag.jpg",
      },
      {
        name: "Jacket",
        desc: "For air-conditioned venues & cool evenings",
        img: "/images/packing/destination/jacket.jpg",
      },
      {
        name: "Travel Adapter",
        desc: "Check your destination's plug type",
        img: "/images/packing/destination/travel-adapter.jpg",
      },
    ],
  },
];

function handleImgError(e) {
  e.currentTarget.onerror = null;
  e.currentTarget.src = "/images/placeholder.svg";
}

export default function WhatToBringCarousel({ items = [], theme }) {
  const { bgCard, border, textPrimary, textSecondary, isDark } = theme;
  const [activeTab, setActiveTab] = useState(0);

  return (
    <BriefingSection label="Packing Guide" title="What to Bring" theme={theme}>
      {/* Category Tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {CATEGORIES.map((cat, i) => (
          <button
            key={cat.key}
            onClick={() => setActiveTab(i)}
            className="flex items-center gap-1.5 whitespace-nowrap font-body font-bold text-sm px-4 py-2 rounded-xl transition-all shrink-0"
            style={{
              backgroundColor: activeTab === i ? ORANGE : (isDark ? "rgba(255,255,255,0.06)" : "#F5F5F5"),
              color: activeTab === i ? "#080808" : textSecondary,
              border: activeTab === i ? "none" : `1px solid ${border}`,
            }}
          >
            <span>{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Swipe Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.22 }}
        >
          {/* Mobile: horizontal scroll · Desktop: grid */}
          <div className="flex gap-3 overflow-x-auto pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 sm:overflow-visible lg:grid-cols-5 snap-x snap-mandatory sm:snap-none">
            {CATEGORIES[activeTab].items.map((item, i) => (
              <div
                key={i}
                className="flex-shrink-0 snap-start sm:flex-shrink sm:w-auto w-40 rounded-2xl overflow-hidden border flex flex-col"
                style={{ backgroundColor: bgCard, borderColor: border }}
              >
                {/* Image */}
                <div
                  className="aspect-[4/3] overflow-hidden"
                  style={{ backgroundColor: isDark ? "#1E1E1E" : "#F0F0F0" }}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                    onError={handleImgError}
                  />
                </div>
                {/* Label */}
                <div className="px-2.5 py-2 flex-1">
                  <p
                    className="font-condensed font-bold text-sm leading-tight mb-0.5"
                    style={{ color: textPrimary }}
                  >
                    {item.name}
                  </p>
                  <p
                    className="font-body text-[11px] leading-snug"
                    style={{ color: textSecondary }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll hint on mobile */}
          <p
            className="font-body text-[11px] text-center mt-2 sm:hidden"
            style={{ color: isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)" }}
          >
            ← swipe to see more →
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Destination-specific items from briefing data */}
      {items.length > 0 && (
        <div className="mt-5 pt-4 border-t" style={{ borderColor: border }}>
          <p
            className="font-body text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: textSecondary }}
          >
            Your Trip Requirements
          </p>
          <div className="flex flex-col gap-2">
            {items.map((item, i) => (
              <div
                key={i}
                className="px-4 py-3"
                style={{
                  borderLeft: `3px solid ${ORANGE}`,
                  borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "#F0E8DC"}`,
                  borderRight: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "#F0E8DC"}`,
                  borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "#F0E8DC"}`,
                  borderRadius: "0 10px 10px 0",
                  backgroundColor: isDark ? "rgba(255,140,0,0.04)" : "#FFFBF7",
                }}
              >
                <p className="font-body text-sm leading-snug" style={{ color: textPrimary }}>
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </BriefingSection>
  );
}
