import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Play } from "lucide-react";

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToDestinations = () => {
    document.querySelector("#destinations")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden grain-overlay"
      style={{ backgroundColor: "#080808" }}
    >
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 scale-110"
        animate={{
          x: mousePos.x * 0.15,
          y: mousePos.y * 0.15,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
      >
        <img
          src="https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=2000&q=85"
          alt="Cinematic world travel"
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Deep gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/70 via-[#080808]/30 to-[#080808]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/60 via-transparent to-[#080808]/40" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-body text-xs font-medium tracking-[0.4em] text-gladex-orange uppercase mb-6"
        >
          ✦ Gladex International Travel ✦
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
          className="font-condensed leading-none mb-4"
          style={{ fontSize: "clamp(60px, 12vw, 140px)" }}
        >
          <span
            className="block font-black text-transparent"
            style={{
              WebkitTextStroke: "2px rgba(255,255,255,0.9)",
              letterSpacing: "0.08em",
            }}
          >
            EXPLORE
          </span>
          <span
            className="block font-black"
            style={{
              color: "#FF6B00",
              letterSpacing: "0.08em",
            }}
          >
            THE WORLD
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="font-body text-chrome text-lg lg:text-xl max-w-xl leading-relaxed mb-10"
        >
          26 cinematic destinations. Premium packages.
          <br />
          Your international journey begins here.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <button
            onClick={scrollToDestinations}
            className="font-condensed font-semibold tracking-widest uppercase text-sm px-8 py-4 bg-gladex-orange text-[#080808] rounded-sm hover:bg-orange-400 transition-all duration-300 min-h-[52px] animate-pulse-glow focus-ring"
          >
            Browse Destinations
          </button>
          <button
            onClick={() => document.querySelector("#media")?.scrollIntoView({ behavior: "smooth" })}
            className="font-condensed font-semibold tracking-widest uppercase text-sm px-8 py-4 glass-panel text-white rounded-sm hover:bg-white/10 transition-all duration-300 min-h-[52px] flex items-center gap-2 focus-ring"
          >
            <Play className="w-4 h-4 text-gladex-orange" />
            Watch Preview
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex items-center gap-10 mt-16"
        >
          {[
            { value: "26+", label: "Destinations" },
            { value: "1000+", label: "Happy Travelers" },
            { value: "10+", label: "Years Experience" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-condensed text-3xl font-black text-gladex-orange">{stat.value}</div>
              <div className="font-body text-xs text-chrome tracking-widest uppercase">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={scrollToDestinations}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-chrome hover:text-gladex-orange transition-colors focus-ring"
        aria-label="Scroll to destinations"
      >
        <span className="font-body text-xs tracking-[0.3em] uppercase">Scroll to Explore</span>
        <ChevronDown className="w-5 h-5 animate-scroll-bounce" />
      </motion.button>
    </section>
  );
}