// @ts-nocheck
import { MapPin } from "lucide-react";
import DayGallery from "./DayGallery";
import { getBriefingDayImages } from "../../utils/briefingImages";

const ORANGE = "#FF8C00";

function DayCard({ day, title, activities, galleryImages, theme }) {
  const { bgCard, bgAlt, border, textPrimary, textSecondary } = theme;

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ borderColor: border, backgroundColor: bgCard }}
    >
      {/* Day header */}
      <div
        className="flex items-center gap-3 px-5 py-4 border-b"
        style={{ borderColor: border, backgroundColor: bgAlt }}
      >
        <span
          className="font-condensed font-black text-sm px-3 py-1 rounded-full shrink-0"
          style={{ backgroundColor: ORANGE, color: "#fff" }}
        >
          Day {day}
        </span>
        <span
          className="font-condensed font-bold text-base lg:text-lg tracking-wide"
          style={{ color: textPrimary }}
        >
          {title}
        </span>
      </div>

      {/* Activities + gallery — always expanded */}
      <div className="px-5 pb-5 pt-4">
        <ul className="space-y-2.5">
          {activities.map((activity, i) => (
            <li key={i} className="flex items-start gap-3">
              <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: ORANGE }} />
              <span
                className="font-body text-sm leading-relaxed"
                style={{ color: textSecondary }}
              >
                {activity}
              </span>
            </li>
          ))}
        </ul>

        <DayGallery images={galleryImages} theme={theme} />
      </div>
    </div>
  );
}

/**
 * @param {object} props
 * @param {Array}  props.itinerary - array of { day, title, activities[], galleryImages? }
 * @param {object} props.theme
 * @param {string} props.slug - destination slug, e.g. "danang", "hongkong"
 *                              Used to auto-load images from public/images/briefings/<slug>/day<N>/
 *                              when galleryImages is absent or empty in the data file.
 */
export default function ItineraryTimeline({ itinerary = [], theme, slug }) {
  if (!itinerary.length) return null;

  return (
    <div className="space-y-3">
      {itinerary.map((item, i) => {
        // Prefer explicit paths from the data file; fall back to auto-discovered images
        const images =
          item.galleryImages?.length > 0
            ? item.galleryImages
            : getBriefingDayImages(slug, item.day);

        return (
          <DayCard
            key={i}
            day={item.day}
            title={item.title}
            activities={item.activities || []}
            galleryImages={images}
            theme={theme}
          />
        );
      })}
    </div>
  );
}
