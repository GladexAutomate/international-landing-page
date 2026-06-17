import { Check, MapPin, Clock, Users, Info } from "lucide-react";

const ORANGE = "#FF9913";

export default function DestinationInfoCard({ pkg, destination, meta }) {
  return (
    <div
      className="rounded-2xl border shadow-lg p-5 sticky top-24 space-y-4"
      style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E5E5" }}
    >
      {/* Destination Info */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Destination Guide</p>
        <h3 className="text-lg font-black font-condensed text-gray-900">{destination?.name}</h3>
        <p className="text-xs text-gray-500 mt-0.5">{destination?.country}</p>
      </div>

      {/* Quick Info */}
      <div className="space-y-2 pt-2 border-t" style={{ borderColor: "#F0F0F0" }}>
        {pkg?.duration && (
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Clock className="w-3.5 h-3.5 shrink-0" style={{ color: ORANGE }} />
            <span>{pkg.duration}</span>
          </div>
        )}
        {meta?.departingFrom && (
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: ORANGE }} />
            <span>Departing from {meta.departingFrom}</span>
          </div>
        )}
        {pkg?.travelDates?.length > 0 && (
          <div className="flex items-start gap-2 text-xs text-gray-600">
            <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: ORANGE }} />
            <span>Travel dates: {pkg.travelDates[0]}{pkg.travelDates.length > 1 ? ` + ${pkg.travelDates.length - 1} more` : ""}</span>
          </div>
        )}
        {destination?.packageType && (
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Users className="w-3.5 h-3.5 shrink-0" style={{ color: ORANGE }} />
            <span>{destination.packageType}</span>
          </div>
        )}
      </div>

      {/* What's Covered */}
      {pkg?.inclusions?.length > 0 && (
        <div className="pt-3 border-t" style={{ borderColor: "#F0F0F0" }}>
          <p className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">What's covered</p>
          <ul className="space-y-1.5">
            {pkg.inclusions.slice(0, 6).map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-xs">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tags */}
      {meta?.tags?.length > 0 && (
        <div className="pt-3 border-t flex flex-wrap gap-1.5" style={{ borderColor: "#F0F0F0" }}>
          {meta.tags.map((tag, i) => (
            <span
              key={i}
              className="text-[10px] px-2 py-1 rounded-full border font-medium text-gray-500"
              style={{ borderColor: "#E0E0E0" }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Package code */}
      {pkg?.code && (
        <p className="text-[10px] text-gray-400 pt-1 border-t" style={{ borderColor: "#F0F0F0" }}>
          Reference: {pkg.code}
        </p>
      )}
    </div>
  );
}