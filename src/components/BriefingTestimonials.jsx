// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import BriefingSection from "./briefing/BriefingSection";

const ORANGE = "#FF8C00";

const TESTIMONIALS = [
  {
    name: "Maria Santos",
    destination: "Da Nang, Vietnam",
    rating: 5,
    review:
      "Gladex made our Vietnam trip absolutely seamless! The briefing page had everything we needed — no stress, no confusion. The itinerary was perfect from start to finish. 10/10!",
    photo: "/images/testimonials/maria-santos.jpg",
    date: "May 2025",
  },
  {
    name: "Jose Reyes",
    destination: "Hong Kong",
    rating: 5,
    review:
      "The pre-trip briefing page was incredibly detailed. I loved seeing all the tour options and insurance in one place. Our family of 5 had zero confusion during the entire trip!",
    photo: "/images/testimonials/jose-reyes.jpg",
    date: "March 2025",
  },
  {
    name: "Ana Villanueva",
    destination: "Singapore",
    rating: 5,
    review:
      "Best travel experience ever! The team was so responsive and the itinerary was perfectly planned. We've already booked our Korea trip with Gladex for next year!",
    photo: "/images/testimonials/ana-villanueva.jpg",
    date: "April 2025",
  },
  {
    name: "Carlos Mendoza",
    destination: "Korea",
    rating: 5,
    review:
      "Gladex handled every single detail. The digital briefing page was so professional — I felt completely prepared before the trip even started. Truly world-class service!",
    photo: "/images/testimonials/carlos-mendoza.jpg",
    date: "February 2025",
  },
  {
    name: "Lea Cruz",
    destination: "Bangkok, Thailand",
    rating: 5,
    review:
      "From the moment we received the briefing link, everything was crystal clear. No stress, no confusion — just pure excitement. Gladex truly knows how to take care of their travelers!",
    photo: "/images/testimonials/lea-cruz.jpg",
    date: "January 2025",
  },
];

export default function BriefingTestimonials({ theme }) {
  const { bgCard, border, textPrimary, textSecondary, isDark } = theme;
  const [active, setActive] = useState(0);

  const prev = () =>
    setActive((a) => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () =>
    setActive((a) => (a + 1) % TESTIMONIALS.length);

  const t = TESTIMONIALS[active];

  return (
    <BriefingSection
      label="Traveler Reviews"
      title="Real Gladex Travel Experiences 🧡"
      theme={theme}
    >
      {/* Main testimonial card */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.28 }}
            className="rounded-2xl border-2 p-6 sm:p-8"
            style={{
              backgroundColor: isDark ? "#191919" : "#FFFBF7",
              borderColor: ORANGE + "35",
            }}
          >
            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-current"
                  style={{
                    color: i < t.rating ? ORANGE : isDark ? "#333" : "#E5E5E5",
                  }}
                />
              ))}
            </div>

            {/* Quote */}
            <p
              className="font-body text-base sm:text-lg leading-relaxed mb-6 italic"
              style={{ color: textPrimary }}
            >
              "{t.review}"
            </p>

            {/* Reviewer */}
            <div className="flex items-center gap-4">
              <img
                src={t.photo}
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover border-2 shrink-0"
                style={{ borderColor: ORANGE }}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/images/placeholder.svg";
                }}
              />
              <div>
                <p
                  className="font-condensed font-bold text-base"
                  style={{ color: textPrimary }}
                >
                  {t.name}
                </p>
                <p className="font-body text-xs" style={{ color: ORANGE }}>
                  {t.destination} · {t.date}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-5">
          {/* Dot indicators */}
          <div className="flex gap-1.5 items-center">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === active ? 20 : 8,
                  height: 8,
                  backgroundColor:
                    i === active ? ORANGE : isDark ? "#444" : "#DDD",
                }}
              />
            ))}
          </div>

          {/* Arrow buttons */}
          <div className="flex gap-2">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-xl border flex items-center justify-center transition-all hover:opacity-70"
              style={{ borderColor: border, color: textSecondary }}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:opacity-80"
              style={{ backgroundColor: ORANGE, color: "#080808" }}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </BriefingSection>
  );
}
