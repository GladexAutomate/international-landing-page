// @ts-nocheck
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, UserCircle } from "lucide-react";
import BriefingSection from "./briefing/BriefingSection";

const ORANGE = "#FF8C00";

const HARDCODED = [
  {
    name: "Maria Santos",
    destination: "Da Nang, Vietnam",
    slugKeywords: ["da-nang", "vietnam-hanoi", "vietnam-phu-quoc"],
    rating: 5,
    review: "Gladex made our Vietnam trip absolutely seamless! The briefing page had everything we needed — no stress, no confusion. The itinerary was perfect from start to finish. 10/10!",
    photo: "/images/testimonials/maria-santos.jpg",
    date: "May 2025",
  },
  {
    name: "Jose Reyes",
    destination: "Hong Kong",
    slugKeywords: ["hong-kong", "macau"],
    rating: 5,
    review: "The pre-trip briefing page was incredibly detailed. I loved seeing all the tour options and insurance in one place. Our family of 5 had zero confusion during the entire trip!",
    photo: "/images/testimonials/jose-reyes.jpg",
    date: "March 2025",
  },
  {
    name: "Ana Villanueva",
    destination: "Singapore",
    slugKeywords: ["singapore", "twin-city", "tri-city"],
    rating: 5,
    review: "Best travel experience ever! The team was so responsive and the itinerary was perfectly planned. We've already booked our Korea trip with Gladex for next year!",
    photo: "/images/testimonials/ana-villanueva.jpg",
    date: "April 2025",
  },
  {
    name: "Carlos Mendoza",
    destination: "Korea",
    slugKeywords: ["jeju-korea", "korea"],
    rating: 5,
    review: "Gladex handled every single detail. The digital briefing page was so professional — I felt completely prepared before the trip even started. Truly world-class service!",
    photo: "/images/testimonials/carlos-mendoza.jpg",
    date: "February 2025",
  },
  {
    name: "Lea Cruz",
    destination: "Bangkok, Thailand",
    slugKeywords: ["bangkok", "bangkok-pattaya", "indochina"],
    rating: 5,
    review: "From the moment we received the briefing link, everything was crystal clear. No stress, no confusion — just pure excitement. Gladex truly knows how to take care of their travelers!",
    photo: "/images/testimonials/lea-cruz.jpg",
    date: "January 2025",
  },
  {
    name: "Rafael Gomez",
    destination: "Bali, Indonesia",
    slugKeywords: ["bali", "bali-wisataku"],
    rating: 5,
    review: "The Bali briefing covered absolutely everything — visa on arrival, culture tips, currency, even the best restaurants. We felt like experts before we even landed!",
    photo: "/images/testimonials/rafael-gomez.jpg",
    date: "March 2025",
  },
  {
    name: "Grace Tan",
    destination: "Japan",
    slugKeywords: ["japan"],
    rating: 5,
    review: "Our Japan trip was flawlessly organized by Gladex. The IC card guide, temple etiquette tips, and day-by-day itinerary made everything so easy for our group of 8!",
    photo: "/images/testimonials/grace-tan.jpg",
    date: "April 2025",
  },
  {
    name: "Miguel Dela Cruz",
    destination: "Maldives",
    slugKeywords: ["maldives", "maldives-maafushi"],
    rating: 5,
    review: "Gladex's attention to detail is unmatched. From the speedboat transfer schedule to the snorkeling gear rental tips — everything was covered in the briefing. Truly 5-star service!",
    photo: "/images/testimonials/miguel-dela-cruz.jpg",
    date: "May 2025",
  },
];

// Single card — handles both regular and client reviews
function TestimonialCard({ t, theme }) {
  const { textPrimary, isDark } = theme;
  const isClient = !!t.isClient;

  return (
    <div
      className="rounded-2xl border-2 p-5 sm:p-6 flex flex-col h-full"
      style={{
        backgroundColor: isClient
          ? isDark ? "#1a1208" : "#FFF8EE"
          : isDark ? "#191919" : "#FFFBF7",
        borderColor: isClient ? ORANGE + "99" : ORANGE + "35",
      }}
    >
      {/* Your Review badge */}
      {isClient && (
        <span
          className="self-start text-[10px] font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full mb-3"
          style={{ backgroundColor: ORANGE + "20", color: ORANGE }}
        >
          Your Review
        </span>
      )}

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
        className="font-body text-base leading-relaxed italic flex-1 mb-4"
        style={{ color: textPrimary }}
      >
        "{t.review}"
      </p>

      {/* Reviewer */}
      <div className="flex items-center gap-3">
        {isClient ? (
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2"
            style={{ borderColor: ORANGE, backgroundColor: ORANGE + "20" }}
          >
            <UserCircle className="w-6 h-6" style={{ color: ORANGE }} />
          </div>
        ) : (
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
        )}
        <div>
          <p className="font-condensed font-bold text-sm" style={{ color: textPrimary }}>
            {t.name}
          </p>
          <p className="font-body text-xs" style={{ color: ORANGE }}>
            {[t.destination, t.date].filter(Boolean).join(" · ")}
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

export default function BriefingTestimonials({ theme, clientReview, slug }) {
  const { border, textSecondary } = theme;
  const [active, setActive] = useState(0);
  const [dir,    setDir]    = useState(1);

  // Filter hardcoded testimonials: destination match + 3★ minimum
  const filtered = HARDCODED.filter((t) => {
    if (t.rating < 3) return false;
    if (!slug) return true;
    // If this testimonial has no slugKeywords, it shows for all destinations
    if (!t.slugKeywords?.length) return true;
    return t.slugKeywords.includes(slug);
  });

  // Fall back to all 3★+ testimonials if none match the current destination
  const displayHardcoded = filtered.length > 0
    ? filtered
    : HARDCODED.filter((t) => t.rating >= 3);

  // Build the display list — client's own review (3★+) always first
  const ALL = [
    ...(clientReview?.rating >= 3
      ? [{
          name: "You",
          destination: "",
          rating: clientReview.rating,
          review: clientReview.comment || "I rated my Gladex travel experience.",
          photo: null,
          date: "Just now",
          isClient: true,
        }]
      : []),
    ...displayHardcoded,
  ];
  const N = ALL.length;

  const prev = () => { setDir(-1); setActive((a) => (a - 1 + N) % N); };
  const next = () => { setDir(1);  setActive((a) => (a + 1) % N);     };

  // Touch swipe support for mobile
  const touchX = useRef(null);
  function onTouchStart(e) { touchX.current = e.touches[0].clientX; }
  function onTouchEnd(e) {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
    touchX.current = null;
  }

  // Keep active index in range when N changes (e.g. client review added)
  const safeActive = active % N;
  const cards = [0, 1, 2].map((offset) => ALL[(safeActive + offset) % N]);

  return (
    <BriefingSection
      label="Traveler Reviews"
      title="Real Gladex Travel Experiences 🧡"
      theme={theme}
    >
      {/* Card area — touch swipe enabled on mobile */}
      <div
        className="overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={safeActive}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <TestimonialCard t={cards[0]} theme={theme} />
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

      {/* Navigation */}
      <div className="flex items-center justify-between mt-5">
        <div className="flex gap-1.5 items-center">
          {ALL.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDir(i > safeActive ? 1 : -1); setActive(i); }}
              className="rounded-full transition-all duration-300"
              style={{
                width:           i === safeActive ? 20 : 8,
                height:          8,
                backgroundColor: i === safeActive ? ORANGE : theme.isDark ? "#444" : "#DDD",
              }}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-xl border flex items-center justify-center transition-all hover:opacity-70"
            style={{ borderColor: border, color: textSecondary }}
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:opacity-80"
            style={{ backgroundColor: ORANGE, color: "#080808" }}
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </BriefingSection>
  );
}
