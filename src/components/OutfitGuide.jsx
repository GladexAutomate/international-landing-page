// @ts-nocheck
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BriefingSection from "./briefing/BriefingSection";

const ORANGE = "#FF9913";

// Generate image paths: /images/outfits/{category}/{variant}/1.jpg … N.jpg
function imgs(cat, variant, n = 5) {
  return Array.from({ length: n }, (_, i) =>
    `/images/outfits/${cat}/${variant}/${i + 1}.jpg`
  );
}

const CATEGORIES = [
  {
    key: "airport",
    label: "Airport Outfit",
    icon: "✈️",
    tip: "Comfortable layers — easy to remove for security checks. Prioritize comfort for long flights and layovers.",
    variants: [
      { label: "Female", imgs: imgs("airport", "female") },
      { label: "Male",   imgs: imgs("airport", "male") },
      { label: "Couple", imgs: imgs("airport", "couple") },
      { label: "Family", imgs: imgs("airport", "family") },
      { label: "Kids",   imgs: imgs("airport", "kids") },
      { label: "Senior", imgs: imgs("airport", "senior") },
    ],
  },
  {
    key: "tour",
    label: "Tour Outfit",
    icon: "🏙️",
    tip: "Light, breathable fabrics are key. You'll cover 3–5 km daily — good walking shoes are non-negotiable.",
    variants: [
      { label: "Female", imgs: imgs("tour", "female") },
      { label: "Male",   imgs: imgs("tour", "male") },
      { label: "Couple", imgs: imgs("tour", "couple") },
      { label: "Family", imgs: imgs("tour", "family") },
      { label: "Kids",   imgs: imgs("tour", "kids") },
    ],
  },
  {
    key: "dinner",
    label: "Dinner Outfit",
    icon: "🍽️",
    tip: "Smart casual for restaurants — most require closed shoes. Dress up for rooftop and riverside dinner spots.",
    variants: [
      { label: "Female", imgs: imgs("dinner", "female") },
      { label: "Male",   imgs: imgs("dinner", "male") },
      { label: "Couple", imgs: imgs("dinner", "couple") },
      { label: "Family", imgs: imgs("dinner", "family") },
      { label: "Senior", imgs: imgs("dinner", "senior") },
    ],
  },
  {
    key: "beach",
    label: "Beach Outfit",
    icon: "🏖️",
    tip: "Swimwear + cover-up + sandals + SPF 50. Mỹ Khê Beach and Lang Co are stunning for sunrise walks.",
    variants: [
      { label: "Female", imgs: imgs("beach", "female") },
      { label: "Male",   imgs: imgs("beach", "male") },
      { label: "Couple", imgs: imgs("beach", "couple") },
      { label: "Family", imgs: imgs("beach", "family") },
      { label: "Kids",   imgs: imgs("beach", "kids") },
    ],
  },
  {
    key: "photo-spots",
    label: "Photo Spot Outfit",
    icon: "📸",
    tip: "Bright colors and patterns stand out! Avoid all-black for the Golden Bridge and Hội An lantern shots.",
    variants: [
      { label: "Female", imgs: imgs("photo-spots", "female") },
      { label: "Male",   imgs: imgs("photo-spots", "male") },
      { label: "Couple", imgs: imgs("photo-spots", "couple") },
      { label: "Family", imgs: imgs("photo-spots", "family") },
    ],
  },
];

function handleImgError(e) {
  e.currentTarget.onerror = null;
  e.currentTarget.src = "/images/placeholder.svg";
}

// ── Category card with inner image mini-carousel ────────────────────────────
function OutfitCategoryCard({ category, theme }) {
  const { bgCard, border, textSecondary, isDark } = theme;

  const [variantIdx, setVariantIdx] = useState(0);
  const [imgIdx,     setImgIdx]     = useState(0);
  const [direction,  setDirection]  = useState(1); // 1 = forward, -1 = backward
  const innerTouchX = useRef(null);

  const variant   = category.variants[variantIdx];
  const photoList = variant.imgs;
  const total     = photoList.length;

  function selectVariant(i) {
    setDirection(0);   // cross-fade, no slide
    setVariantIdx(i);
    setImgIdx(0);
  }

  function goImg(delta) {
    const next = imgIdx + delta;
    if (next < 0 || next >= total) return;
    setDirection(delta);
    setImgIdx(next);
  }

  function onInnerTouchStart(e) {
    e.stopPropagation();
    innerTouchX.current = e.touches[0].clientX;
  }
  function onInnerTouchEnd(e) {
    e.stopPropagation();
    if (innerTouchX.current === null) return;
    const dx = e.changedTouches[0].clientX - innerTouchX.current;
    if (Math.abs(dx) > 30) goImg(dx < 0 ? 1 : -1);
    innerTouchX.current = null;
  }

  return (
    <div
      className="rounded-2xl overflow-hidden border select-none"
      style={{ backgroundColor: bgCard, borderColor: border }}
    >
      {/* ── Image mini-carousel ─────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden h-[28rem] sm:h-[36rem] cursor-grab active:cursor-grabbing"
        style={{ backgroundColor: isDark ? "#111" : "#E8E8E8" }}
        onTouchStart={onInnerTouchStart}
        onTouchEnd={onInnerTouchEnd}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={`${category.key}-${variantIdx}-${imgIdx}`}
            src={photoList[imgIdx]}
            alt={`${category.label} — ${variant.label} ${imgIdx + 1}`}
            className="absolute inset-0 w-full h-full object-contain"
            loading="lazy"
            onError={handleImgError}
            initial={{ opacity: 0, x: direction * 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -28 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          />
        </AnimatePresence>

        {/* Gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.06) 52%, transparent 100%)",
          }}
        />

        {/* Photo counter badge — top left */}
        {total > 1 && (
          <div
            className="absolute top-3 left-3 font-body font-bold text-[11px] px-2.5 py-1 rounded-full"
            style={{
              backgroundColor: "rgba(0,0,0,0.48)",
              color: "#FFF",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
            }}
          >
            {imgIdx + 1} / {total}
          </div>
        )}

        {/* Variant badge — top right */}
        <div
          className="absolute top-3 right-3 font-body font-bold text-[11px] px-2.5 py-1 rounded-full"
          style={{ backgroundColor: ORANGE, color: "#080808" }}
        >
          {variant.label}
        </div>

        {/* Desktop image prev/next arrows */}
        {imgIdx > 0 && (
          <button
            onClick={() => goImg(-1)}
            className="hidden sm:flex absolute left-2.5 top-1/3 -translate-y-1/2 w-8 h-8 rounded-full items-center justify-center transition-all hover:scale-110 z-10"
            style={{
              backgroundColor: "rgba(0,0,0,0.48)",
              color: "#FFF",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
            }}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
        {imgIdx < total - 1 && (
          <button
            onClick={() => goImg(1)}
            className="hidden sm:flex absolute right-2.5 top-1/3 -translate-y-1/2 w-8 h-8 rounded-full items-center justify-center transition-all hover:scale-110 z-10"
            style={{
              backgroundColor: "rgba(0,0,0,0.48)",
              color: "#FFF",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
            }}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}

        {/* Bottom overlay ─────────────────────────────────────── */}
        <div className="absolute inset-x-0 bottom-0 p-4 space-y-2.5">
          {/* Image dot strip */}
          {total > 1 && (
            <div className="flex gap-1 justify-center">
              {photoList.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > imgIdx ? 1 : -1); setImgIdx(i); }}
                  className="rounded-full transition-all duration-250"
                  style={{
                    width: i === imgIdx ? 18 : 5,
                    height: 5,
                    backgroundColor:
                      i === imgIdx ? "#FFF" : "rgba(255,255,255,0.38)",
                  }}
                />
              ))}
            </div>
          )}

          {/* Category name */}
          <div className="flex items-center gap-2">
            <p className="font-condensed font-black text-white text-2xl leading-none drop-shadow-lg">
              {category.label}
            </p>
          </div>

          {/* Variant pills */}
          <div className="flex flex-wrap gap-1.5">
            {category.variants.map((v, i) => (
              <button
                key={i}
                onClick={() => selectVariant(i)}
                className="font-body font-bold text-[11px] px-3 py-1.5 rounded-full transition-all"
                style={{
                  backgroundColor:
                    i === variantIdx ? ORANGE : "rgba(255,255,255,0.16)",
                  color: i === variantIdx ? "#080808" : "#FFF",
                  border:
                    i === variantIdx
                      ? "none"
                      : "1px solid rgba(255,255,255,0.30)",
                  backdropFilter: "blur(6px)",
                  WebkitBackdropFilter: "blur(6px)",
                }}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tip */}
      <div className="px-4 py-3">
        <p
          className="font-body text-xs leading-relaxed"
          style={{ color: textSecondary }}
        >
          {category.tip}
        </p>
      </div>
    </div>
  );
}

// ── Outer category carousel ─────────────────────────────────────────────────
export default function OutfitGuide({ theme }) {
  const { textPrimary, textSecondary, isDark } = theme;
  const total = CATEGORIES.length;

  const [catIdx, setCatIdx] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(() =>
    typeof window !== "undefined" ? (window.innerWidth >= 640 ? 2 : 1) : 1
  );
  const outerTouchX = useRef(null);

  // Keep cardsPerView in sync on resize
  useEffect(() => {
    const update = () => {
      const cpv = window.innerWidth >= 640 ? 2 : 1;
      setCardsPerView(cpv);
      setCatIdx((i) => Math.min(i, total - cpv));
    };
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [total]);

  const maxIdx = total - cardsPerView;

  const prevCat = () => setCatIdx((i) => Math.max(0, i - 1));
  const nextCat = () => setCatIdx((i) => Math.min(maxIdx, i + 1));

  function onOuterTouchStart(e) {
    outerTouchX.current = e.touches[0].clientX;
  }
  function onOuterTouchEnd(e) {
    if (outerTouchX.current === null) return;
    const dx = e.changedTouches[0].clientX - outerTouchX.current;
    if (Math.abs(dx) > 40) dx < 0 ? nextCat() : prevCat();
    outerTouchX.current = null;
  }

  // translateX as % of the flex track's own width:
  // track width = (total / cardsPerView) × container, so 1 card = 100/total % of track
  const translatePct = catIdx * (100 / total);

  return (
    <BriefingSection label="Style Guide" title="Outfit Inspiration" theme={theme}>
      <p
        className="font-body text-sm leading-relaxed mb-6"
        style={{ color: textSecondary }}
      >
        Plan your looks before you fly — browse outfit ideas for every moment of your trip.
        Tap a variant (Female, Male, Couple…) then swipe through the photos.
      </p>

      <div className="relative">
        {/* Outer carousel viewport — touch on this only triggers if inner didn't stop propagation */}
        <div
          className="overflow-hidden"
          onTouchStart={onOuterTouchStart}
          onTouchEnd={onOuterTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              width: `${(total / cardsPerView) * 100}%`,
              transform: `translateX(-${translatePct}%)`,
            }}
          >
            {CATEGORIES.map((cat, i) => (
              <div
                key={cat.key}
                style={{
                  width: `${100 / total}%`,
                  paddingLeft: i === 0 ? 0 : 8,
                  paddingRight: i === total - 1 ? 0 : 8,
                }}
              >
                <OutfitCategoryCard category={cat} theme={theme} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: left category arrow */}
        {catIdx > 0 && (
          <button
            onClick={prevCat}
            className="hidden sm:flex absolute -left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full items-center justify-center shadow-xl transition-all hover:scale-110 active:scale-95 z-10 border"
            style={{
              backgroundColor: isDark ? "#222" : "#FFF",
              color: textPrimary,
              borderColor: isDark ? "#333" : "#E5E5E5",
            }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Desktop: right category arrow */}
        {catIdx < maxIdx && (
          <button
            onClick={nextCat}
            className="hidden sm:flex absolute -right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full items-center justify-center shadow-xl transition-all hover:scale-110 active:scale-95 z-10"
            style={{ backgroundColor: ORANGE, color: "#080808" }}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Mobile arrows + category dots */}
      <div className="flex items-center justify-center gap-4 mt-5">
        <button
          onClick={prevCat}
          disabled={catIdx === 0}
          className="sm:hidden w-10 h-10 rounded-full border flex items-center justify-center transition-all disabled:opacity-30"
          style={{ borderColor: isDark ? "#333" : "#E5E5E5", color: textSecondary }}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex gap-2 items-center">
          {Array.from({ length: maxIdx + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCatIdx(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === catIdx ? 24 : 8,
                height: 8,
                backgroundColor: i === catIdx ? ORANGE : (isDark ? "#444" : "#DDD"),
              }}
            />
          ))}
        </div>

        <button
          onClick={nextCat}
          disabled={catIdx === maxIdx}
          className="sm:hidden w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-30"
          style={{
            backgroundColor:
              catIdx === maxIdx ? (isDark ? "#2A2A2A" : "#E5E5E5") : ORANGE,
            color: catIdx === maxIdx ? textSecondary : "#080808",
          }}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <p
        className="sm:hidden font-body text-[10px] text-center mt-1"
        style={{ color: isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)" }}
      >
        ← swipe image to browse · use arrows below to change category →
      </p>
    </BriefingSection>
  );
}
