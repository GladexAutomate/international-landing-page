import { motion } from "framer-motion";
import { useTheme } from "../lib/ThemeContext";

const panels = [
  {
    img: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&q=85",
    label: "THAILAND",
  },
  {
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=85",
    label: "BALI",
  },
  {
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=85",
    label: "DUBAI",
  },
  {
    img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=85",
    label: "JAPAN",
  },
  {
    img: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=85",
    label: "SINGAPORE",
  },
];

export default function HeroSection() {
  const { isDark } = useTheme();

  const scrollToDestinations = () => {
    document
      .querySelector("#destinations")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "100vh", minHeight: 500 }}
    >
      {/* Panels */}
      <div className="absolute inset-0 flex">
        {panels.map((panel, i) => (
          <motion.div
            key={panel.label}
            className="relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1, duration: 0.9 }}
            style={{
              flex: 1,
              transition: "flex 0.5s cubic-bezier(0.4,0,0.2,1)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.flex = "1.8")}
            onMouseLeave={(e) => (e.currentTarget.style.flex = "1")}
          >
            <img
              src={panel.img}
              alt={panel.label}
              className="w-full h-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />

            <div className="absolute bottom-6 left-0 right-0 text-center">
              <span className="font-body text-[9px] font-semibold tracking-[0.25em] text-white/60 uppercase">
                {panel.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

{/* Logo - Upper Left */}
<motion.a
  href="https://voyage-view-go.base44.app"
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3, duration: 0.7 }}
  whileHover={{
    scale: 1.06,
    y: -2,
  }}
  className="absolute top-6 left-6 z-20 cursor-pointer"
  title="Back to Main Page"
>
  <img
    src="https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/5ecc9b2cd_Untitled-design-75.png"
    alt="Gladex Travel and Tours Corp."
    className="h-14 w-auto object-contain transition-all duration-300"
    style={{
      filter: "drop-shadow(0 0 16px rgba(255,140,0,0.5))",
    }}
  />
</motion.a>

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="font-condensed font-black text-white leading-none mb-4"
          style={{
            fontSize: "clamp(52px, 9vw, 120px)",
            letterSpacing: "0.06em",
            textShadow: "0 2px 40px rgba(0,0,0,0.7)",
          }}
        >
          EXPLORE THE WORLD
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="font-body text-white/75 text-sm lg:text-base max-w-lg"
          style={{
            letterSpacing: "0.15em",
            lineHeight: 1.7,
          }}
        >
          DISCOVER PREMIUM INTERNATIONAL DESTINATIONS
          <br />
        </motion.p>

        {/* Navigation Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 flex items-center gap-4"
        >
          <div className="h-px w-12 bg-white/30" />

          <span className="font-body text-[10px] tracking-[0.4em] text-white/50 uppercase">
            International
          </span>

          <div className="h-px w-12 bg-white/30" />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        onClick={scrollToDestinations}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 focus:outline-none"
        aria-label="Scroll down"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1 h-2.5 rounded-full bg-white/60"
          />
        </div>

        <span className="font-body text-[9px] tracking-[0.35em] text-white/50 uppercase">
          Scroll
        </span>
      </motion.button>
    </section>
  );
}