// @ts-nocheck
import { MapPin } from "lucide-react";
import DayGallery from "./DayGallery";
import { getBriefingDayImages } from "../../utils/briefingImages";

const ORANGE = "#FF9913";

function DayCard({ day, title, activities, tourOptions, galleryImages, theme, index }) {
  const { border, textPrimary, textSecondary } = theme;

  // Alternate: even = white card, odd = solid orange card
  const isOrange = index % 2 !== 0;
  const cardBg     = isOrange ? ORANGE : "#FFFFFF";
  const headerBg   = isOrange ? ORANGE : "#FFFFFF";
  const cardBorder = isOrange ? "rgba(255,255,255,0.2)" : border;
  const text1      = isOrange ? "#1A0800" : textPrimary;
  const text2      = isOrange ? "#3D1000" : textSecondary;
  const pinColor   = isOrange ? "#FFFFFF" : ORANGE;
  const badgeBg    = isOrange ? "#FFFFFF" : ORANGE;
  const badgeText  = isOrange ? ORANGE    : "#FFFFFF";
  const tourRowBg  = isOrange ? "rgba(255,255,255,0.18)" : "#F5F0EB";
  const dividerBorder = isOrange ? "rgba(255,255,255,0.25)" : border;

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ borderColor: cardBorder, backgroundColor: cardBg }}
    >
      {/* Day header */}
      <div
        className="flex items-center gap-4 px-5 py-5 border-b"
        style={{ borderColor: dividerBorder, backgroundColor: headerBg }}
      >
        <span
          className="font-condensed font-black text-base px-4 py-1.5 rounded-full shrink-0"
          style={{ backgroundColor: badgeBg, color: badgeText }}
        >
          Day {day}
        </span>
        <span
          className="font-condensed font-bold text-lg lg:text-xl tracking-wide"
          style={{ color: text1 }}
        >
          {title}
        </span>
      </div>

      {/* Activities + optional tours + gallery */}
      <div className="px-5 pb-6 pt-5">
        <ul className="space-y-3">
          {activities.map((activity, i) => (
            <li key={i} className="flex items-start gap-3">
              <MapPin className="w-4 h-4 mt-1 shrink-0" style={{ color: pinColor }} />
              <span
                className="font-body text-[17px] leading-relaxed"
                style={{ color: text2 }}
              >
                {activity}
              </span>
            </li>
          ))}
        </ul>

        {/* Optional tour choices */}
        {tourOptions?.length > 0 && (
          <div className="mt-4 pt-4 border-t" style={{ borderColor: dividerBorder }}>
            <p
              className="font-condensed font-bold text-xs uppercase tracking-widest mb-3"
              style={{ color: isOrange ? "#FFFFFF" : ORANGE }}
            >
              Optional Tours Available
            </p>
            <div className="space-y-2">
              {tourOptions.map((tour, i) => (
                <div
                  key={i}
                  className="rounded-xl border overflow-hidden flex gap-0"
                  style={{ borderColor: dividerBorder, backgroundColor: tourRowBg }}
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
                    <span className="font-body text-sm font-semibold leading-snug" style={{ color: text1 }}>
                      {tour.name}
                    </span>
                    {tour.note ? (
                      <p className="font-body text-xs leading-relaxed mt-0.5" style={{ color: text2 }}>
                        {tour.note}
                      </p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <DayGallery images={galleryImages} theme={theme} />
      </div>
    </div>
  );
}

export default function ItineraryTimeline({ itinerary = [], theme, slug }) {
  if (!itinerary.length) return null;

  return (
    <div className="space-y-3">
      {itinerary.map((item, i) => {
        const images =
          item.galleryImages?.length > 0
            ? item.galleryImages
            : getBriefingDayImages(slug, item.day);

        return (
          <DayCard
            key={i}
            index={i}
            day={item.day}
            title={item.title}
            activities={item.activities || []}
            tourOptions={item.tourOptions || []}
            galleryImages={images}
            theme={theme}
          />
        );
      })}
    </div>
  );
}
