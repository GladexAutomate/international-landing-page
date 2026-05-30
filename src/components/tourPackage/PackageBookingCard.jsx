import { useState } from "react";
import { Check, X, AlertTriangle, ExternalLink } from "lucide-react";

const ORANGE = "#FF8C00";

export default function PackageBookingCard({ pkg, destination }) {
  const [tourType, setTourType] = useState("Join-in tour");
  const [selectedCategory, setSelectedCategory] = useState(0);

  const category = pkg?.hotelCategories?.[selectedCategory];
  const lowestRate = category
    ? Math.min(...Object.values(category.rates).filter((v) => typeof v === "number"))
    : destination?.startingPrice;

  return (
    <div
      className="rounded-2xl border shadow-lg p-5 sticky top-24 space-y-4"
      style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E5E5" }}
    >
      {/* Price */}
      <div>
        <p className="text-xs text-gray-500 mb-0.5">Starting from</p>
        <p className="text-3xl font-black" style={{ color: ORANGE }}>
          ₱ {lowestRate?.toLocaleString()}
        </p>
        <p className="text-xs text-gray-400">per person · Twin sharing</p>
      </div>

      {/* Hotel Category Selector */}
      {pkg?.hotelCategories?.length > 1 && (
        <div>
          <p className="text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Hotel Category</p>
          <div className="space-y-1.5">
            {pkg.hotelCategories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setSelectedCategory(i)}
                className="w-full text-left px-3 py-2 rounded-lg border text-xs font-medium transition-all"
                style={{
                  borderColor: i === selectedCategory ? ORANGE : "#E5E5E5",
                  backgroundColor: i === selectedCategory ? "rgba(255,140,0,0.06)" : "#FAFAFA",
                  color: i === selectedCategory ? ORANGE : "#555",
                }}
              >
                {cat.category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tour Type */}
      <div>
        <p className="text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Tour type</p>
        <div className="flex gap-2">
          {["Join-in tour", "Private tour"].map((t) => (
            <button
              key={t}
              onClick={() => setTourType(t)}
              className="flex-1 py-2 rounded-lg border text-xs font-semibold transition-all"
              style={{
                borderColor: tourType === t ? ORANGE : "#E5E5E5",
                backgroundColor: tourType === t ? "rgba(255,140,0,0.08)" : "transparent",
                color: tourType === t ? ORANGE : "#555",
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-1">
        <a
          href="https://m.me/771470123003758?ref=2438158"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 rounded-xl text-white text-sm font-bold text-center block transition-opacity hover:opacity-90"
          style={{ backgroundColor: ORANGE }}
        >
          Book Now
        </a>
        <a
          href="https://m.me/771470123003758?ref=2438158"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 rounded-xl border text-sm font-bold text-center block transition-all hover:opacity-80"
          style={{ borderColor: ORANGE, color: ORANGE }}
        >
          Inquire via Messenger
        </a>
      </div>

      {/* Inclusions Summary */}
      {pkg?.inclusions?.length > 0 && (
        <div className="pt-3 border-t" style={{ borderColor: "#F0F0F0" }}>
          <p className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">What's included</p>
          <ul className="space-y-1.5">
            {pkg.inclusions.slice(0, 5).map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-xs">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
          {pkg.exclusions?.length > 0 && (
            <ul className="space-y-1.5 mt-2">
              {pkg.exclusions.slice(0, 3).map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs">
                  <X className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                  <span className="text-gray-400 line-through">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Package code */}
      {pkg?.code && (
        <p className="text-[10px] text-gray-400 pt-1 border-t" style={{ borderColor: "#F0F0F0" }}>
          Package code: {pkg.code}
        </p>
      )}
    </div>
  );
}