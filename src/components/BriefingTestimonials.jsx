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

const N = TESTIMONIALS.length; // 5

// Single card used by both desktop and mobile
function TestimonialCard({ t, theme }) {
  const { bgCard, border, textPrimary, textSecondary, isDark } = theme;
  return (
    <div
      className="rounded-2xl border-2 p-5 sm:p-6 flex flex-col h-full"
      style={{
        backgroundColor: isDark ? "#191919" : "#FFFBF7",
        borderColor: ORANGE + "35",
      }}
    >
      {/* Stars */}
      <div className="flex gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="w-3.5 h-3.5 fill-current"
            style={{ color: i < t.rating ? ORANGE : isDark ? "#333" : "#E5E5E5" }}
          />
        ))}
      </div>

      {/* Quote */}
      <p
        className="font-body text-sm leading-relaxed italic flex-1 mb-4"
        style={{ color: textPrimary }}
      >
        "{t.review}"
      </p>

      {/* Reviewer */}
      <div className="flex items-center gap-3">
        <img
          src={t.photo}
          alt={t.name}
          className="w-10 h-10 rounded-full object-cover border-2 shrink-0"
          style={{ borderColor: ORANGE }}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/images/placeholder.svg";
          }}
        />
        <div>
          <p className="font-condensed font-bold text-sm" style={{ color: textPrimary }}>
            {t.name}
          </p>
          <p className="font-body text-xs" style={{ color: ORANGE }}>
            {t.destination} · {t.date}
          </p>
        </div>
      </div>
    </div>
  );
}

const variants = {
  enter:  (dir) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   (dir) => ({ x: dir > 0 ? -48 : 48, opacity: 0 }),
};

export default function BriefingTestimonials({ theme }) {
  const { border, textSecondary } = theme;
  const [active, setActive] = useState(0);
  const [dir,    setDir]    = useState(1);

  const prev = () => { setDir(-1); setActive((a) => (a - 1 + N) % N); };
  const next = () => { setDir(1);  setActive((a) => (a + 1) % N);     };

  // Visible testimonials: active card + next 2 (wrapping) for desktop
  const cards = [0, 1, 2].map((offset) => TESTIMONIALS[(active + offset) % N]);

  return (
    <BriefingSection
      label="Traveler Reviews"
      title="Real Gladex Travel Experiences 🧡"
      theme={theme}
    >
      {/* Card area — animated as a group */}
      <div className="overflow-hidden">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={active}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            {/* Desktop: 3 columns  |  Mobile: 1 column (only first card) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Always show first card on mobile and desktop */}
              <TestimonialCard t={cards[0]} theme={theme} />

              {/* 2nd and 3rd cards — hidden on mobile */}
              <div className="hidden md:block">
                <TestimonialCard t={cards[1]} theme={theme} />
              </div>
              <div className="hidden md:block">
                <TestimonialCard t={cards[2]} theme={theme} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation row */}
      <div className="flex items-center justify-between mt-5">
        {/* Dot indicators — one per testimonial (position 0-4) */}
        <div className="flex gap-1.5 items-center">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDir(i > active ? 1 : -1); setActive(i); }}
              className="rounded-full transition-all duration-300"
              style={{
                width:           i === active ? 20 : 8,
                height:          8,
                backgroundColor: i === active ? ORANGE : theme.isDark ? "#444" : "#DDD",
              }}
            />
          ))}
        </div>

        {/* Prev / Next buttons */}
        <div className="flex gap-2">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-xl border flex items-center justify-center transition-all hover:opacity-70"
            style={{ borderColor: border, color: textSecondary }}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:opacity-80"
            style={{ backgroundColor: ORANGE, color: "#080808" }}
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </BriefingSection>
  );
}
