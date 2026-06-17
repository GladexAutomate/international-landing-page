// @ts-nocheck
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, X } from "lucide-react";
import BriefingSection from "./briefing/BriefingSection";
import { supabase } from "../lib/supabase";

const ORANGE = "#FF9913";

const AVATAR_PALETTE = [
  "#FF9913", "#7C3AED", "#059669", "#2563EB",
  "#DC2626", "#0891B2", "#D97706", "#9D174D",
];

function avatarColor(name) {
  if (!name) return AVATAR_PALETTE[0];
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return AVATAR_PALETTE[Math.abs(h) % AVATAR_PALETTE.length];
}

function initials(name) {
  if (!name) return "?";
  return name.trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

// ── Lightbox ──────────────────────────────────────────────────────────────────

function Lightbox({ images, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex);
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length]);

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.92)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl px-4 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-75"
          style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#fff" }}
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image */}
        <img
          src={images[current]}
          alt={`Photo ${current + 1}`}
          className="w-full max-h-[72vh] object-contain rounded-2xl"
          style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.6)" }}
        />

        {/* Prev / Next */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 ml-1 w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-75"
              style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#fff" }}
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 mr-1 w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-75"
              style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#fff" }}
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Counter + dot strip */}
        {images.length > 1 && (
          <div className="flex flex-col items-center gap-2 mt-3">
            <div className="flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="rounded-full transition-all duration-200"
                  style={{
                    width:           i === current ? 16 : 7,
                    height:          7,
                    backgroundColor: i === current ? ORANGE : "rgba(255,255,255,0.35)",
                  }}
                />
              ))}
            </div>
            <p className="font-body text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
              {current + 1} / {images.length}
            </p>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

// ── Avatar ────────────────────────────────────────────────────────────────────

function Avatar({ t }) {
  const [imgError, setImgError] = useState(false);
  const photoUrl  = t.photos?.[0] ?? t.photo;   // uploaded photo > hardcoded
  const useImage  = !!photoUrl && !imgError;
  const color     = avatarColor(t.name);
  const inits     = initials(t.name);

  if (useImage) {
    return (
      <img
        src={photoUrl}
        alt={t.name}
        className="w-12 h-12 rounded-full object-cover border-2 shrink-0"
        style={{ borderColor: ORANGE }}
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-condensed font-black text-white text-sm select-none"
      style={{ backgroundColor: color, border: `2px solid ${color}99` }}
    >
      {inits}
    </div>
  );
}

// ── TestimonialCard ───────────────────────────────────────────────────────────

function TestimonialCard({ t, theme }) {
  const { textPrimary, isDark } = theme;
  const isClient = !!t.isClient;
  const photos   = Array.isArray(t.photos) ? t.photos : [];
  const [lightboxIndex, setLightboxIndex] = useState(null);

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
      {/* ── Profile header ── */}
      <div className="flex items-start gap-3 mb-4">
        <Avatar t={t} />
        <div className="flex-1 min-w-0 pt-0.5">
          <p
            className="font-condensed font-bold text-lg leading-tight truncate"
            style={{ color: textPrimary }}
          >
            {t.name}
          </p>
          {(t.destination || t.date) && (
            <p className="font-body text-sm mt-0.5" style={{ color: ORANGE }}>
              {[t.destination, t.date].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
        {isClient && (
          <span
            className="shrink-0 self-start text-xs font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full"
            style={{ backgroundColor: ORANGE + "20", color: ORANGE }}
          >
            Your Review
          </span>
        )}
      </div>

      {/* ── Stars ── */}
      <div className="flex gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4 fill-current"
            style={{ color: i < t.rating ? ORANGE : isDark ? "#333" : "#E5E5E5" }}
          />
        ))}
      </div>

      {/* ── Quote ── */}
      <p
        className="font-body text-base leading-relaxed italic flex-1 mb-4"
        style={{ color: textPrimary }}
      >
        "{t.review}"
      </p>

      {/* ── Photo gallery ── */}
      {photos.length > 0 && (
        <>
          <p
            className="font-body text-xs font-bold uppercase tracking-[0.18em] mb-2"
            style={{ color: ORANGE }}
          >
            Photos
          </p>
          <div className="space-y-1.5 mb-1">
            {/* 1 photo — full width, natural height */}
            {photos.length === 1 && (
              <button
                onClick={() => setLightboxIndex(0)}
                className="w-full overflow-hidden rounded-xl transition-opacity hover:opacity-90 active:opacity-75 focus:outline-none"
                aria-label="View photo"
              >
                <img src={photos[0]} alt="Photo 1" className="w-full h-auto block rounded-xl" />
              </button>
            )}

            {/* 2 photos — side by side, natural height */}
            {photos.length === 2 && (
              <div className="grid grid-cols-2 gap-1.5">
                {photos.map((url, i) => (
                  <button
                    key={i}
                    onClick={() => setLightboxIndex(i)}
                    className="overflow-hidden rounded-xl transition-opacity hover:opacity-90 active:opacity-75 focus:outline-none"
                    aria-label={`View photo ${i + 1}`}
                  >
                    <img src={url} alt={`Photo ${i + 1}`} className="w-full h-auto block rounded-xl" />
                  </button>
                ))}
              </div>
            )}

            {/* 3 photos — first full width, then 2 side by side */}
            {photos.length >= 3 && (
              <>
                <button
                  onClick={() => setLightboxIndex(0)}
                  className="w-full overflow-hidden rounded-xl transition-opacity hover:opacity-90 active:opacity-75 focus:outline-none"
                  aria-label="View photo 1"
                >
                  <img src={photos[0]} alt="Photo 1" className="w-full h-auto block rounded-xl" />
                </button>
                <div className="grid grid-cols-2 gap-1.5">
                  {photos.slice(1).map((url, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setLightboxIndex(i + 1)}
                      className="overflow-hidden rounded-xl transition-opacity hover:opacity-90 active:opacity-75 focus:outline-none"
                      aria-label={`View photo ${i + 2}`}
                    >
                      <img src={url} alt={`Photo ${i + 2}`} className="w-full h-auto block rounded-xl" />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </>
      )}

      {/* Lightbox portal */}
      {lightboxIndex !== null && (
        <Lightbox
          images={photos}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}

// ── Hardcoded reviews ─────────────────────────────────────────────────────────

const HARDCODED = [
  {
    name:        "Maria Santos",
    destination: "Da Nang, Vietnam",
    slugKeywords: ["danang-vietnam", "vietnam-hanoi", "vietnam-phu-quoc"],
    rating: 5,
    review: "Gladex made our Vietnam trip absolutely seamless! The briefing page had everything we needed — no stress, no confusion. The itinerary was perfect from start to finish. 10/10!",
    photo: "/images/testimonials/maria-santos.jpg",
    date:  "May 2025",
  },
  {
    name:        "Jose Reyes",
    destination: "Hong Kong",
    slugKeywords: ["hongkong", "macau"],
    rating: 5,
    review: "The pre-trip briefing page was incredibly detailed. I loved seeing all the tour options and insurance in one place. Our family of 5 had zero confusion during the entire trip!",
    photo: "/images/testimonials/jose-reyes.jpg",
    date:  "March 2025",
  },
  {
    name:        "Ana Villanueva",
    destination: "Singapore",
    slugKeywords: ["singapore", "twin-city", "tri-city"],
    rating: 5,
    review: "Best travel experience ever! The team was so responsive and the itinerary was perfectly planned. We've already booked our Korea trip with Gladex for next year!",
    photo: "/images/testimonials/ana-villanueva.jpg",
    date:  "April 2025",
  },
  {
    name:        "Carlos Mendoza",
    destination: "Korea",
    slugKeywords: ["jeju-korea", "korea"],
    rating: 5,
    review: "Gladex handled every single detail. The digital briefing page was so professional — I felt completely prepared before the trip even started. Truly world-class service!",
    photo: "/images/testimonials/carlos-mendoza.jpg",
    date:  "February 2025",
  },
  {
    name:        "Lea Cruz",
    destination: "Bangkok, Thailand",
    slugKeywords: ["bangkok", "bangkok-pattaya", "indochina"],
    rating: 5,
    review: "From the moment we received the briefing link, everything was crystal clear. No stress, no confusion — just pure excitement. Gladex truly knows how to take care of their travelers!",
    photo: "/images/testimonials/lea-cruz.jpg",
    date:  "January 2025",
  },
  {
    name:        "Rafael Gomez",
    destination: "Bali, Indonesia",
    slugKeywords: ["bali", "bali-wisataku"],
    rating: 5,
    review: "The Bali briefing covered absolutely everything — visa on arrival, culture tips, currency, even the best restaurants. We felt like experts before we even landed!",
    photo: "/images/testimonials/rafael-gomez.jpg",
    date:  "March 2025",
  },
  {
    name:        "Grace Tan",
    destination: "Japan",
    slugKeywords: ["japan"],
    rating: 5,
    review: "Our Japan trip was flawlessly organized by Gladex. The IC card guide, temple etiquette tips, and day-by-day itinerary made everything so easy for our group of 8!",
    photo: "/images/testimonials/grace-tan.jpg",
    date:  "April 2025",
  },
  {
    name:        "Miguel Dela Cruz",
    destination: "Maldives",
    slugKeywords: ["maldives", "maldives-maafushi"],
    rating: 5,
    review: "Gladex's attention to detail is unmatched. From the speedboat transfer schedule to the snorkeling gear rental tips — everything was covered in the briefing. Truly 5-star service!",
    photo: "/images/testimonials/miguel-dela-cruz.jpg",
    date:  "May 2025",
  },
];

// ── Variants ──────────────────────────────────────────────────────────────────

const variants = {
  enter:  (dir) => ({ x: dir > 0 ?  48 : -48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   (dir) => ({ x: dir > 0 ? -48 :  48, opacity: 0 }),
};

// ── Main component ────────────────────────────────────────────────────────────

export default function BriefingTestimonials({ theme, clientReview, slug, gdxReference, reviewRefreshKey }) {
  const { border, textSecondary } = theme;
  const [active,      setActive]      = useState(0);
  const [dir,         setDir]         = useState(1);
  const [liveReviews, setLiveReviews] = useState([]);

  // Fetch 4★+ reviews for this destination from Supabase, excluding current client.
  // Re-runs when reviewRefreshKey changes so CRUD in RateMyService triggers a live refresh.
  useEffect(() => {
    if (!slug) return;
    supabase
      .from("reviews")
      .select("gdx_reference, reviewer_name, rating, comment, photos, created_at")
      .eq("destination", slug)
      .gte("rating", 4)
      .order("created_at", { ascending: false })
      .limit(30)
      .then(({ data }) => {
        if (!data?.length) { setLiveReviews([]); return; }
        const reviews = data
          .filter((r) => String(r.gdx_reference) !== String(gdxReference))
          .map((r) => ({
            name:     r.reviewer_name || "Gladex Traveler",
            rating:   r.rating,
            review:   r.comment || "Had a great experience with Gladex Tours!",
            photos:   Array.isArray(r.photos) ? r.photos : [],
            date:     null,
            isClient: false,
            isLive:   true,
          }));
        setLiveReviews(reviews);
      });
  }, [slug, gdxReference, reviewRefreshKey]);

  // Hardcoded placeholder reviews — destination-specific only, never cross-destination.
  // Only shown when no live Supabase reviews exist for this destination yet.
  const hardcodedForSlug = HARDCODED.filter((t) => {
    if (t.rating < 4) return false;
    if (!slug) return false;
    return t.slugKeywords?.includes(slug);
  });

  // Build final list: client's own → live reviews → hardcoded (if no live)
  const ALL = [
    ...(clientReview?.rating >= 4
      ? [{
          name:     "You",
          rating:   clientReview.rating,
          review:   clientReview.comment || "I rated my Gladex travel experience.",
          photos:   clientReview.photos || [],
          date:     "Just now",
          isClient: true,
        }]
      : []),
    ...liveReviews,
    ...(liveReviews.length === 0 ? hardcodedForSlug : []),
  ];
  const N = ALL.length;
  if (N === 0) return null;

  const prev = () => { setDir(-1); setActive((a) => (a - 1 + N) % N); };
  const next = () => { setDir(1);  setActive((a) => (a + 1) % N);     };

  const touchX    = useRef(null);
  const safeActive = active % N;
  const cards      = [0, 1, 2].map((offset) => ALL[(safeActive + offset) % N]);

  function onTouchStart(e) { touchX.current = e.touches[0].clientX; }
  function onTouchEnd(e) {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
    touchX.current = null;
  }

  return (
    <BriefingSection
      label="Traveler Reviews"
      title="Real Gladex Travel Experiences"
      theme={theme}
    >
      {/* Card area — swipeable on mobile */}
      <div className="overflow-hidden" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
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
