import { motion } from "framer-motion";
import { useTheme } from "../lib/ThemeContext";

const panels = [
  {
    img: "https://images.unsplash.com/photo-1517154421773-0855edd2b2d5?w=600&q=85",
    label: "SOUTH KOREA",
  },
  {
    img: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=85",
    label: "SINGAPORE",
  },
  {
    img: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&q=85",
    label: "THAILAND",
  },
  {
    img: "https://images.unsplash.com/photo-1506970845246-18f21d533b20?w=600&q=85",
    label: "HONG KONG",
  },
  {
    img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=85",
    label: "VIETNAM",
  },
];

export default function HeroSection() {
  const { isDark } = useTheme();

  const scrollToDestinations = () => {
    document.querySelector("#destinations")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full overflow-hidden" style={{ height: "55vw", minHeight: 320, maxHeight: 600 }}>
      {/* 5-panel cinematic strip */}
      <div className="absolute inset-0 flex">
        {panels.map((panel, i) => (
          <motion.div
            key={panel.label}
            className="relative flex-1 overflow-hidden"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.12, duration: 0.9, ease: "easeOut" }}
            whileHover={{ flex: 1.5 }}
            style={{ transition: "flex 0.5s cubic-bezier(0.4,0,0.2,1)" }}
          >
            <img
              src={panel.img}
              alt={panel.label}
              className="w-full h-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
            {/* dark gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
            {/* label */}
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <span
                className="font-body text-[9px] font-semibold tracking-[0.2em] text-white/70 uppercase"
              >
                {panel.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Centered overlay content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mb-6"
        >
          {/* REPLACE WITH ACTUAL GLADEX LOGO PNG */}
          <img
            src="https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/logo_placeholder.png"
            alt="Gladex International"
            className="h-10 w-auto object-contain"
            style={{ filter: "drop-shadow(0 0 12px rgba(255,140,0,0.6))" }}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          {/* Fallback text logo */}
          <div
            className="hidden items-center gap-2"
            style={{ display: "none" }}
          >
            <span
              className="font-condensed text-2xl font-black tracking-widest"
              style={{ color: "#FF8C00", textShadow: "0 0 20px rgba(255,140,0,0.5)" }}
            >
              GLADEX
            </span>
            <span className="font-condensed text-xs font-semibold tracking-[0.3em] text-white/80 uppercase">
              International
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-condensed font-black text-white leading-none mb-3"
          style={{
            fontSize: "clamp(40px, 8vw, 100px)",
            letterSpacing: "0.06em",
            textShadow: "0 2px 30px rgba(0,0,0,0.6)",
          }}
        >
          EXPLORE THE WORLD
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="font-body text-white/80 text-sm lg:text-base tracking-widest uppercase"
          style={{ letterSpacing: "0.25em" }}
        >
          Cinematic tagline — The best in the world
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={scrollToDestinations}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 focus:outline-none"
        aria-label="Scroll down"
      >
        <span className="font-body text-[10px] tracking-[0.3em] text-white/70 uppercase">Scroll</span>
        {/* Mouse scroll icon */}
        <div
          className="w-5 h-8 rounded-full border border-white/50 flex items-start justify-center pt-1.5"
          style={{ position: "relative" }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-0.5 h-2 rounded-full bg-white/70"
          />
        </div>
      </motion.button>
    </section>
  );
}