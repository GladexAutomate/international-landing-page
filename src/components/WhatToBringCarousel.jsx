// @ts-nocheck
import BriefingSection from "./briefing/BriefingSection";

const ORANGE = "#FF9913";

const CATEGORIES = [
  {
    key: "documents",
    label: "Documents",
    icon: "📋",
    items: [
      { name: "Passport", desc: "Valid for 6+ months beyond travel date", img: "/images/packing/documents/passport.jpg" },
      { name: "Travel Voucher", desc: "Print and save a digital copy", img: "/images/packing/documents/travel-voucher.jpg" },
      { name: "Flight Ticket", desc: "Printed or saved on your phone", img: "/images/packing/documents/flight-ticket.jpg" },
      { name: "Insurance Card", desc: "Keep emergency contacts inside", img: "/images/packing/documents/insurance-card.jpg" },
      { name: "Valid ID", desc: "Government issued photo ID", img: "/images/packing/documents/valid-id.jpg" },
    ],
  },
  {
    key: "essentials",
    label: "Essentials",
    icon: "🎒",
    items: [
      { name: "Cash", desc: "Budget for daily expenses, food & shopping", img: "/images/packing/essentials/cash.jpg" },
      { name: "Credit Card", desc: "Visa/Mastercard widely accepted", img: "/images/packing/essentials/credit-card.jpg" },
      { name: "Powerbank", desc: "10,000mAh minimum recommended", img: "/images/packing/essentials/powerbank.jpg" },
      { name: "Charger", desc: "Phone, camera & all device chargers", img: "/images/packing/essentials/charger.jpg" },
      { name: "Medicines", desc: "Paracetamol, antidiarrheal, motion sickness", img: "/images/packing/essentials/medicines.jpg" },
    ],
  },
  {
    key: "destination",
    label: "Destination Specific",
    icon: "🌴",
    items: [
      { name: "Beachwear", desc: "Swimsuit, boardshorts & cover-up", img: "/images/packing/destination/beachwear.jpg" },
      { name: "Slippers", desc: "Easy to slip on for beach & temples", img: "/images/packing/destination/slippers.jpg" },
      { name: "Sunscreen", desc: "SPF 50+ strongly recommended", img: "/images/packing/destination/sunscreen.jpg" },
      { name: "Waterproof Bag", desc: "Protect valuables near water", img: "/images/packing/destination/waterproof-bag.jpg" },
      { name: "Jacket", desc: "For air-conditioned venues & cool evenings", img: "/images/packing/destination/jacket.jpg" },
      { name: "Travel Adapter", desc: "Check your destination's plug type", img: "/images/packing/destination/travel-adapter.jpg" },
    ],
  },
];

function handleImgError(e) {
  e.currentTarget.onerror = null;
  e.currentTarget.src = "/images/placeholder.svg";
}

export default function WhatToBringCarousel({ items = [], theme }) {
  const { bgCard, border, textPrimary, textSecondary, isDark } = theme;

  return (
    <BriefingSection label="Packing Guide" title="What to Bring" theme={theme}>
      {/* All categories displayed vertically */}
      <div className="space-y-8">
        {CATEGORIES.map((cat) => (
          <div key={cat.key}>
            <p
              className="font-condensed font-bold text-sm uppercase tracking-widest mb-3 flex items-center gap-2"
              style={{ color: textSecondary }}
            >
              <span>{cat.icon}</span> {cat.label}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {cat.items.map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden border flex flex-col"
                  style={{ backgroundColor: "#FFFFFF", borderColor: border }}
                >
                  {/* Orange image frame — TeenCare style */}
                  <div
                    style={{ backgroundColor: "#FF9913", padding: 7 }}
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full object-cover rounded-xl transition-transform duration-300 hover:scale-105"
                      style={{ aspectRatio: "4/3", display: "block" }}
                      loading="lazy"
                      onError={handleImgError}
                    />
                  </div>
                  <div className="px-2.5 py-2 flex-1">
                    <p className="font-condensed font-bold text-sm leading-tight mb-0.5" style={{ color: textPrimary }}>
                      {item.name}
                    </p>
                    <p className="font-body text-[11px] leading-snug" style={{ color: textSecondary }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Destination-specific items from briefing data */}
      {items.length > 0 && (
        <div className="mt-6 pt-5 border-t" style={{ borderColor: border }}>
          <p className="font-body text-xs font-bold uppercase tracking-widest mb-3" style={{ color: textSecondary }}>
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
                  backgroundColor: isDark ? "rgba(255,153,19,0.04)" : "#FFFBF7",
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
