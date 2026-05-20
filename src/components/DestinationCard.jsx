import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, Compass, MapPin } from "lucide-react";

export default function DestinationCard({ destination, onPreview, index }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate(`/destination/${destination.slug}`);
  };

  const handlePreview = (e) => {
    e.stopPropagation();
    onPreview(destination);
  };

  const promoColorMap = {
    "BEST SELLER": "border-gladex-orange text-gladex-orange",
    "FREE CITY TOUR": "border-white/40 text-white",
    "VISA FREE": "border-green-400 text-green-400",
    "2 PACKAGES": "border-blue-400 text-blue-400",
    "2026 SPECIAL": "border-gladex-orange text-gladex-orange",
    POPULAR: "border-white/40 text-chrome",
    PARADISE: "border-teal-400 text-teal-400",
    EXCLUSIVE: "border-purple-400 text-purple-400",
    NEW: "border-gladex-orange text-gladex-orange",
    GETAWAY: "border-white/40 text-chrome",
    LUXURY: "border-yellow-400 text-yellow-400",
    NATURE: "border-green-400 text-green-400",
    EPIC: "border-gladex-orange text-gladex-orange",
    "MUST SEE": "border-gladex-orange text-gladex-orange",
    "ISLAND ESCAPE": "border-teal-400 text-teal-400",
    TRENDING: "border-pink-400 text-pink-400",
    BEACH: "border-teal-400 text-teal-400",
    CULTURAL: "border-yellow-400 text-yellow-400",
    ISLAND: "border-teal-400 text-teal-400",
    "CITY BREAK": "border-blue-400 text-blue-400",
    "MULTI-CITY": "border-purple-400 text-purple-400",
    "GRAND TOUR": "border-gladex-orange text-gladex-orange",
    HERITAGE: "border-yellow-400 text-yellow-400",
    "CASINO CITY": "border-yellow-400 text-yellow-400",
  };

  const promoClass = promoColorMap[destination.promoLabel] || "border-white/30 text-chrome";

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
      className="relative rounded-sm overflow-hidden cursor-pointer group"
      style={{ aspectRatio: "4/5" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleExplore}
      aria-labelledby={`dest-name-${destination.id}`}
      aria-describedby={`dest-tagline-${destination.id}`}
    >
      {/* Image */}
      <div className="absolute inset-0">
        <img
          src={destination.cardImage}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/20 to-transparent" />
        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-[#080808]/50 backdrop-blur-sm"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Promo label */}
      <div className="absolute top-4 left-4 z-10">
        <span
          className={`font-body text-[10px] font-semibold tracking-[0.2em] uppercase border px-2.5 py-1 ${promoClass}`}
          style={{ fontFamily: "monospace" }}
        >
          {destination.promoLabel}
        </span>
      </div>

      {/* Price tag */}
      <div className="absolute top-4 right-4 z-10">
        <div className="glass-panel px-3 py-1.5 text-right">
          <div className="font-body text-[9px] text-chrome tracking-wider uppercase">From</div>
          <div className="font-condensed text-lg font-bold text-gladex-orange leading-none">
            ₱{destination.startingPrice.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-5">
        {/* Location */}
        <div className="flex items-center gap-1.5 mb-2">
          <MapPin className="w-3 h-3 text-gladex-orange" />
          <span className="font-body text-xs text-chrome tracking-wider uppercase">
            {destination.country}
          </span>
        </div>

        {/* Name */}
        <h3
          id={`dest-name-${destination.id}`}
          className="font-condensed font-black text-white leading-none mb-1"
          style={{ fontSize: "clamp(26px, 4vw, 36px)", letterSpacing: "0.03em" }}
        >
          {destination.name}
        </h3>

        {/* Tagline */}
        <p
          id={`dest-tagline-${destination.id}`}
          className="font-body text-chrome text-xs leading-relaxed mb-4"
        >
          {destination.tagline}
        </p>

        {/* Action buttons — slide up on hover */}
        <motion.div
          className="flex gap-2"
          animate={{ y: hovered ? 0 : 20, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={handleExplore}
            className="flex-1 font-condensed font-semibold tracking-widest uppercase text-xs px-4 py-3 bg-gladex-orange text-[#080808] rounded-sm hover:bg-orange-400 transition-colors duration-200 flex items-center justify-center gap-2 min-h-[48px] focus-ring"
          >
            <Compass className="w-4 h-4" />
            Explore
          </button>
          <button
            onClick={handlePreview}
            className="font-condensed font-semibold tracking-widest uppercase text-xs px-4 py-3 glass-panel text-white rounded-sm hover:bg-white/10 transition-colors duration-200 flex items-center justify-center gap-2 min-h-[48px] focus-ring"
          >
            <Play className="w-4 h-4 text-gladex-orange" />
            Preview
          </button>
        </motion.div>
      </div>
    </motion.article>
  );
}