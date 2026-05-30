import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";

const ORANGE = "#FF8C00";

export default function RelatedPackages({ destinations = [] }) {
  const navigate = useNavigate();

  if (!destinations.length) return null;

  return (
    <div className="mt-12 mb-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1 h-6 rounded-full" style={{ backgroundColor: ORANGE }} />
        <h2 className="text-xl font-black font-condensed tracking-wide text-gray-900">
          You might also like...
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {destinations.map((dest, i) => (
          <div
            key={i}
            onClick={() => navigate(`/tour-packages/${dest.slug}`)}
            className="rounded-xl border overflow-hidden cursor-pointer group hover:shadow-md transition-all"
            style={{ borderColor: "#E5E5E5" }}
          >
            <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <img
                src={dest.cardImage || dest.heroImage}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {dest.promoLabel && (
                <span
                  className="absolute top-2 left-2 text-[9px] font-bold text-white px-2 py-0.5 rounded-sm"
                  style={{ backgroundColor: ORANGE }}
                >
                  {dest.promoLabel}
                </span>
              )}
            </div>
            <div className="p-3">
              <p className="text-[10px] text-gray-400 mb-0.5">{dest.country} · {dest.packageType}</p>
              <p className="text-xs font-bold text-gray-900 line-clamp-2 leading-snug mb-1">{dest.name}</p>
              <p className="text-xs text-gray-400 mb-1.5">Book now for available dates · {dest.packageType}</p>
              <div className="flex items-center gap-1 text-[11px] mb-1">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span className="font-bold text-gray-700">4.8</span>
                <span className="text-gray-400">• 10K+ booked</span>
              </div>
              <p className="text-xs font-black" style={{ color: ORANGE }}>
                ₱ {dest.startingPrice?.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}