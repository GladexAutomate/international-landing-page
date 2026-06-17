// @ts-nocheck
import BriefingSection from "./briefing/BriefingSection";

// ─── IMAGE PATHS ──────────────────────────────────────────────────────────────
// All images live in the /public/images/packing/ folder.
// Replace any file with your own photo (same filename) and it auto-loads.
// Folder structure:
//   public/images/packing/documents/passport.jpg
//   public/images/packing/documents/travel-voucher.jpg
//   public/images/packing/documents/flight-ticket.jpg
//   public/images/packing/documents/insurance-card.jpg
//   public/images/packing/documents/valid-id.jpg
//   public/images/packing/essentials/cash.jpg
//   public/images/packing/essentials/credit-card.jpg
//   public/images/packing/essentials/powerbank.jpg
//   public/images/packing/essentials/charger.jpg
//   public/images/packing/essentials/medicines.jpg
//   public/images/packing/destination/beachwear.jpg
//   public/images/packing/destination/slippers.jpg
//   public/images/packing/destination/sunscreen.jpg
//   public/images/packing/destination/waterproof-bag.jpg
//   public/images/packing/destination/jacket.jpg
//   public/images/packing/destination/travel-adapter.jpg

const CATEGORIES = [
  {
    key: "documents",
    label: "Documents",
    icon: "📋",
    items: [
      { name: "Passport",       desc: "Valid for 6+ months beyond travel date",  img: "/images/packing/documents/passport.jpg" },
      { name: "Travel Voucher", desc: "Print and save a digital copy",           img: "/images/packing/documents/travel-voucher.jpg" },
      { name: "Flight Ticket",  desc: "Printed or saved on your phone",          img: "/images/packing/documents/flight-ticket.jpg" },
      { name: "Insurance Card", desc: "Keep emergency contacts inside",          img: "/images/packing/documents/insurance-card.jpg" },
      { name: "Valid ID",       desc: "Government issued photo ID",              img: "/images/packing/documents/valid-id.jpg" },
    ],
  },
  {
    key: "essentials",
    label: "Essentials",
    icon: "🎒",
    items: [
      { name: "Cash",         desc: "Budget for daily expenses, food & shopping", img: "/images/packing/essentials/cash.jpg" },
      { name: "Credit Card",  desc: "Visa/Mastercard widely accepted",            img: "/images/packing/essentials/credit-card.jpg" },
      { name: "Powerbank",    desc: "10,000mAh minimum recommended",              img: "/images/packing/essentials/powerbank.jpg" },
      { name: "Charger",      desc: "Phone, camera & all device chargers",        img: "/images/packing/essentials/charger.jpg" },
      { name: "Medicines",    desc: "Paracetamol, antidiarrheal, motion sickness",img: "/images/packing/essentials/medicines.jpg" },
    ],
  },
  {
    key: "destination",
    label: "Destination Specific",
    icon: "🌴",
    items: [
      { name: "Beachwear",      desc: "Swimsuit, boardshorts & cover-up",            img: "/images/packing/destination/beachwear.jpg" },
      { name: "Slippers",       desc: "Easy to slip on for beach & temples",          img: "/images/packing/destination/slippers.jpg" },
      { name: "Sunscreen",      desc: "SPF 50+ strongly recommended",                 img: "/images/packing/destination/sunscreen.jpg" },
      { name: "Waterproof Bag", desc: "Protect valuables near water",                 img: "/images/packing/destination/waterproof-bag.jpg" },
      { name: "Jacket",         desc: "For air-conditioned venues & cool evenings",   img: "/images/packing/destination/jacket.jpg" },
      { name: "Travel Adapter", desc: "Check your destination's plug type",           img: "/images/packing/destination/travel-adapter.jpg" },
    ],
  },
];

function handleImgError(e) {
  e.currentTarget.onerror = null;
  e.currentTarget.src = "/images/placeholder.svg";
}

export default function WhatToBringCarousel({ items = [], theme }) {
  const { border, textPrimary, textSecondary } = theme;

  return (
    <BriefingSection label="Packing Guide" title="What to Bring" theme={theme}>
      <div className="space-y-8">
        {CATEGORIES.map((cat) => (
          <div key={cat.key}>
            {/* Category header */}
            <p className="font-condensed font-bold text-sm uppercase tracking-widest mb-3 flex items-center gap-2"
              style={{ color: textSecondary }}>
              <span>{cat.icon}</span> {cat.label}
            </p>

            {/* Item cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {cat.items.map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden flex flex-col"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #F0EDE9",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                  }}
                >
                  {/* Photo — no orange frame */}
                  <div style={{ height: 110, overflow: "hidden" }}>
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                      onError={handleImgError}
                    />
                  </div>

                  {/* Text */}
                  <div className="px-2.5 py-2 flex-1">
                    <p className="font-condensed font-bold text-sm leading-tight mb-0.5"
                      style={{ color: textPrimary }}>
                      {item.name}
                    </p>
                    <p className="font-body text-[11px] leading-snug"
                      style={{ color: textSecondary }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Destination-specific items from briefing (if any) */}
        {items.length > 0 && (
          <div className="pt-5 border-t" style={{ borderColor: border }}>
            <p className="font-body text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: textSecondary }}>
              Your Trip Requirements
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {items.map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl px-4 py-3 flex items-center gap-3"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #F0EDE9",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                  }}
                >
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <p className="font-body text-sm leading-snug" style={{ color: textPrimary }}>
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </BriefingSection>
  );
}
