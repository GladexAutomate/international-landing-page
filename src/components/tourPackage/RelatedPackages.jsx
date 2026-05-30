import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";

const ORANGE = "#FF8C00";

export default function RelatedPackages({ destinations }) {
  const navigate = useNavigate();
  if (!destinations?.length) return null;

  return (
    <div className="mt-12">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1 h-6 rounded-full shrink-0" style={{ backgroundColor: ORANGE }} />
        <h2 className="text-xl font-black font-condensed tracking-wide text-gray-900">More Destinations</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {destinations.map((dest, i) => (
          <div
            key={i}
            onClick={() => navigate(`/tour-packages/${dest.slug}`)}
            className="rounded-xl overflow-hidden border cursor-pointer group hover:shadow-md transition-all"
            style={{ borderColor: "#E5E5E5" }}
          >
            <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <img
                src={dest.cardImage || dest.heroImage}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-2 left-2 right-2">
                <p className="text-white text-xs font-bold font-condensed leading-tight">{dest.name}</p>
              </div>
              {dest.promoLabel && (
                <div
                  className="absolute top-2 left-2 text-[9px] font-black px-1.5 py-0.5 rounded text-white"
                  style={{ backgroundColor: ORANGE }}
                >
                  {dest.promoLabel}
                </div>
              )}
            </div>
            <div className="p-2.5 bg-white">
              <div className="flex items-center gap-1 text-[10px] text-gray-400">
                <MapPin className="w-2.5 h-2.5" style={{ color: ORANGE }} />
                <span>{dest.country}</span>
              </div>
              <p className="text-[10px] font-semibold text-gray-500 mt-1">View Destination Guide →</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}