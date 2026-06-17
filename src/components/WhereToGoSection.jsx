import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useTheme } from "../lib/ThemeContext";

const internationalSlides = [
  {
    title: "ASIA'S WONDERS",
    images: [
      { src: "https://images.unsplash.com/photo-1517154421773-0855edd2b2d5?w=300&q=80", label: "SOUTH KOREA" },
      { src: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=300&q=80", label: "SINGAPORE" },
      { src: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=300&q=80", label: "THAILAND" },
      { src: "https://images.unsplash.com/photo-1506970845246-18f21d533b20?w=300&q=80", label: "HONG KONG" },
      { src: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=300&q=80", label: "VIETNAM" },
    ],
  },
];

const subCardsInternational = [
  { title: "SEOUL SECRETS", img: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=400&q=80" },
  { title: "SINGAPORE CHIC", img: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&q=80" },
  { title: "THAI SERENITY", img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400&q=80" },
  { title: "HK NIGHTS", img: "https://images.unsplash.com/photo-1506970845246-18f21d533b20?w=400&q=80" },
  { title: "VIETNAM'S COASTLINE", img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=80" },
];

const domesticSlides = [
  {
    title: "PHILIPPINE ESCAPES",
    images: [
      { src: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=300&q=80", label: "BORACAY" },
      { src: "https://images.unsplash.com/photo-1559628129-67cf63b72248?w=300&q=80", label: "EL NIDO" },
      { src: "https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?w=300&q=80", label: "CEBU" },
      { src: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=300&q=80", label: "BOHOL" },
    ],
  },
];

const subCardsDomestic = [
  { title: "BORACAY SUNSETS", img: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400&q=80" },
  { title: "EL NIDO HIDDEN GEMS", img: "https://images.unsplash.com/photo-1559628129-67cf63b72248?w=400&q=80" },
  { title: "CEBU MARINE LIFE", img: "https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?w=400&q=80" },
  { title: "BOHOL ADVENTURES", img: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=400&q=80" },
];

function CategoryCard({ slide, subCards, label, comingSoon, onExplore, isDark }) {
  const [idx, setIdx] = useState(0);

  const bg = isDark
    ? "rgba(18,18,18,0.95)"
    : "rgba(255,255,255,0.95)";

  const labelColor = isDark ? "#A0A0A0" : "#8B6914";
  const titleColor = isDark ? "#FFFFFF" : "#1A1A1A";
  const subCardText = "#FFFFFF";

  return (
    <div className="flex-1 min-w-0">
      {/* Category label */}
      <div
        className="font-condensed font-black text-2xl mb-3 tracking-wider"
        style={{ color: titleColor }}
      >
        {label}
      </div>

      {/* Main carousel card */}
      <div
        className="relative rounded-xl overflow-hidden mb-3 cursor-pointer group"
        style={{ aspectRatio: "16/9", background: "#111" }}
        onClick={onExplore}
      >
        {/* Image grid */}
        <div className="absolute inset-0 flex">
          {slide.images.map((img, i) => (
            <div key={i} className="flex-1 relative overflow-hidden">
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute bottom-2 left-0 right-0 text-center">
                <span className="font-body text-[8px] font-semibold tracking-widest text-white/80 uppercase">
                  {img.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Coming soon badge */}
        {comingSoon && (
          <div
            className="absolute top-3 right-3 z-20 font-condensed font-bold text-xs tracking-widest uppercase px-3 py-1 rounded-sm"
            style={{ background: "#8B6914", color: "#fff" }}
          >
            COMING SOON
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Bottom title */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="font-condensed font-black text-white text-2xl lg:text-3xl tracking-wider drop-shadow">
            {slide.title}
          </div>
        </div>

        {/* Explore arrow */}
        {!comingSoon && (
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
        )}

        {/* Carousel nav */}
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 flex items-center justify-center hover:bg-black/60 transition-colors"
          onClick={(e) => { e.stopPropagation(); setIdx(Math.max(0, idx - 1)); }}
          aria-label="Previous"
        >
          <ChevronLeft className="w-4 h-4 text-white" />
        </button>
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 flex items-center justify-center hover:bg-black/60 transition-colors"
          onClick={(e) => { e.stopPropagation(); setIdx(Math.min(slide.images.length - 1, idx + 1)); }}
          aria-label="Next"
        >
          <ChevronRight className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex gap-1.5 mb-4">
        {[0, 1, 2, 3].map((d) => (
          <div
            key={d}
            className="rounded-full transition-all duration-300"
            style={{
              width: d === idx ? 20 : 8,
              height: 8,
              backgroundColor: d === idx ? "#FF9913" : isDark ? "#444" : "#D4A86A",
            }}
          />
        ))}
      </div>

      {/* Sub-cards grid */}
      <div className="grid grid-cols-2 gap-2">
        {subCards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="relative rounded-lg overflow-hidden cursor-pointer group"
            style={{ aspectRatio: "4/3" }}
            onClick={onExplore}
          >
            <img
              src={card.img}
              alt={card.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <div
                className="font-condensed font-black text-sm tracking-wider leading-tight"
                style={{ color: subCardText }}
              >
                {card.title}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function WhereToGoSection() {
  const { isDark } = useTheme();

  const bg = isDark ? "#0D0D0D" : "#FFF5E9";
  const headingColor = isDark ? "#FFFFFF" : "#1A1A1A";
  const subColor = isDark ? "#A0A0A0" : "#8B6914";

  const handleInternationalExplore = () => {
    // REPLACE WITH ACTUAL INTERNATIONAL PAGE URL
    window.open("#", "_blank", "noopener,noreferrer");
  };

  return (
    <section id="destinations" className="py-14 px-5 lg:px-10" style={{ backgroundColor: bg }}>
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2
            className="font-condensed font-black text-3xl lg:text-5xl mb-1"
            style={{ color: headingColor, letterSpacing: "0.03em" }}
          >
            Where Do You Want To Go
          </h2>
          <p
            className="font-body text-xs tracking-[0.3em] uppercase"
            style={{ color: subColor }}
          >
            Luxury Travel Catalog
          </p>
        </div>

        {/* Two category cards */}
        <div className="flex flex-col lg:flex-row gap-8">
          <CategoryCard
            slide={internationalSlides[0]}
            subCards={subCardsInternational}
            label="INTERNATIONAL"
            comingSoon={false}
            onExplore={handleInternationalExplore}
            isDark={isDark}
          />
          <CategoryCard
            slide={domesticSlides[0]}
            subCards={subCardsDomestic}
            label="DOMESTIC"
            comingSoon={true}
            onExplore={() => {}}
            isDark={isDark}
          />
        </div>
      </div>
    </section>
  );
}