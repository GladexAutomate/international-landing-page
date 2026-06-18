// @ts-nocheck
import { MapPin } from "lucide-react";
import DayGallery from "./DayGallery";
import { getBriefingDayImages } from "../../utils/briefingImages";

const ORANGE = "#FF9913";

function DayCard({ day, title, activities, tourOptions, galleryImages, theme }) {
  const { border, textPrimary, textSecondary } = theme;

  return (
    <div
      className="rounded-2xl overflow-hidden border"
      style={{ borderColor: "rgba(255,153,19,0.2)", backgroundColor: "#FFFFFF", boxShadow: "0 2px 12px rgba(255,153,19,0.07)" }}
    >
      {/* Day header */}
      <div
        className="flex items-center gap-3 px-5 py-4 border-b"
        style={{ borderColor: "rgba(255,153,19,0.15)", backgroundColor: "#FFFAF4" }}
      >
        <span
          className="font-condensed font-black text-sm px-4 py-1.5 rounded-full shrink-0"
          style={{ backgroundColor: ORANGE, color: "#FFFFFF" }}
        >
          Day {day}
        </span>
        <span className="font-condensed font-bold text-lg leading-tight" style={{ color: textPrimary }}>
          {title}
        </span>
      </div>

      {/* Activities */}
      <div className="px-5 pt-4 pb-5">
        <ul className="space-y-2.5">
          {activities.map((activity, i) => (
            <li key={i} className="flex items-start gap-3">
              <div
                className="w-2 h-2 rounded-full shrink-0 mt-2"
                style={{ backgroundColor: ORANGE }}
              />
              <span className="font-body text-sm leading-relaxed" style={{ color: textSecondary }}>
                {activity}
              </span>
            </li>
          ))}
        </ul>

        {/* Optional tour choices */}
        {tourOptions?.length > 0 && (
          <div className="mt-4 pt-4 border-t" style={{ borderColor: "rgba(255,153,19,0.15)" }}>
            <p className="font-condensed font-bold text-xs uppercase tracking-widest mb-3" style={{ color: ORANGE }}>
              Optional Tours Available
            </p>
            <div className="space-y-2">
              {tourOptions.map((tour, i) => (
                <div
                  key={i}
                  className="rounded-xl border overflow-hidden flex gap-0"
                  style={{ borderColor: "rgba(255,153,19,0.2)", backgroundColor: "#FFF5E8" }}
                >
                  {tour.img && (
                    <div className="shrink-0 w-20 h-20">
                      <img
                        src={tour.img}
                        alt={tour.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => { e.currentTarget.parentElement.style.display = "none"; }}
                      />
                    </div>
                  )}
                  <div className="px-3 py-2.5 flex flex-col justify-center">
                    <span className="font-body text-sm font-semibold leading-snug" style={{ color: textPrimary }}>
                      {tour.name}
                    </span>
                    {tour.note && (
                      <p className="font-body text-xs leading-relaxed mt-0.5" style={{ color: textSecondary }}>
                        {tour.note}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {galleryImages?.length > 0 && (
          <div className="mt-4">
            <p className="font-condensed font-bold text-xs uppercase tracking-widest mb-2" style={{ color: ORANGE }}>
              Highlights
            </p>
            <DayGallery images={galleryImages} theme={theme} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function ItineraryTimeline({ itinerary = [], theme, slug }) {
  if (!itinerary.length) return null;

  return (
    <div className="relative">
      {/* Airplane decoration */}
      <div className="absolute -top-4 right-0 pointer-events-none opacity-80 hidden sm:block">
        <svg viewBox="0 0 100 90" className="w-28 h-24">
          <g fill={ORANGE} opacity="0.9">
            <path d="M50 10 L68 34 L88 30 L84 40 L68 43 L60 74 L55 74 L58 43 L35 48 L30 60 L25 60 L28 40 L10 36 L10 30 L32 34 Z" />
            <path d="M40 77 L60 77 L57 84 L43 84 Z" />
          </g>
          {/* Flight path */}
          <path d="M15 80 Q55 30 90 50" stroke={ORANGE} strokeWidth="1.5" strokeDasharray="5 4" fill="none" opacity="0.3" />
        </svg>
      </div>

      {/* Timeline */}
      <div className="relative pl-8 sm:pl-10 space-y-4">
        {/* Vertical line */}
        <div
          className="absolute left-3 sm:left-4 top-6 bottom-6 w-0.5 rounded-full"
          style={{ backgroundColor: "rgba(255,153,19,0.35)" }}
        />
        {itinerary.map((item, i) => {
          const images =
            item.galleryImages?.length > 0
              ? item.galleryImages
              : getBriefingDayImages(slug, item.day);

          return (
            <div key={i} className="relative">
              {/* Timeline dot */}
              <div
                className="absolute -left-5 sm:-left-6 top-5 w-4 h-4 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: ORANGE }}
              />
              <DayCard
                day={item.day}
                title={item.title}
                activities={item.activities || []}
                tourOptions={item.tourOptions || []}
                galleryImages={images}
                theme={theme}
              />
            </div>
          );
        })}
      </div>

      {/* Safe travels banner */}
      <div className="mt-8 flex justify-center">
        <div
          className="px-8 py-3.5 rounded-full font-condensed font-black text-sm tracking-wide text-white shadow-lg"
          style={{
            background: "linear-gradient(90deg, #FF9913 0%, #e07800 100%)",
            boxShadow: "0 4px 20px rgba(255,153,19,0.35)"
          }}
        >
          ✈&nbsp; Safe travels and enjoy your trip! &nbsp;♥
        </div>
      </div>
    </div>
  );
}
