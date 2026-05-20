import { motion } from "framer-motion";
import { Star, ShieldCheck } from "lucide-react";
import { useTheme } from "../lib/ThemeContext";
import { testimonials } from "../data/testimonials";

export default function Testimonials() {
  const { isDark } = useTheme();

  const bg = isDark ? "#080808" : "#FFF5E9";
  const cardBg = isDark ? "rgba(255,255,255,0.04)" : "#FFFFFF";
  const cardBorder = isDark ? "rgba(255,255,255,0.08)" : "#F0DFC0";
  const headingColor = isDark ? "#FFFFFF" : "#1A1A1A";
  const textColor = isDark ? "rgba(255,255,255,0.8)" : "#3A3A3A";
  const mutedColor = isDark ? "#A0A0A0" : "#8B6914";
  const nameColor = isDark ? "#FFFFFF" : "#1A1A1A";
  const starColor = "#FF8C00";

  return (
    <section id="reviews" className="py-16 px-5 lg:px-10" style={{ backgroundColor: bg }}>
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="font-condensed font-black text-3xl lg:text-5xl tracking-wider"
            style={{ color: headingColor, letterSpacing: "0.08em" }}
          >
            TESTIMONIALS
          </h2>
        </motion.div>

        {/* Cards row — horizontal scroll on mobile */}
        <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="snap-start shrink-0 rounded-2xl p-5 flex flex-col gap-3"
              style={{
                width: "clamp(240px, 28vw, 320px)",
                backgroundColor: cardBg,
                border: `1px solid ${cardBorder}`,
                boxShadow: isDark ? "none" : "0 2px 16px rgba(0,0,0,0.06)",
              }}
            >
              {/* Stars + verified */}
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4" style={{ color: starColor, fill: starColor }} />
                  ))}
                  {Array.from({ length: 5 - t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4" style={{ color: isDark ? "#333" : "#E0C88A" }} />
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" style={{ color: "#4CAF50" }} />
                  <span className="font-body text-[9px] font-bold tracking-widest uppercase" style={{ color: "#4CAF50" }}>
                    Verified Traveler
                  </span>
                </div>
              </div>

              <div className="font-body text-[10px] font-bold tracking-widest uppercase" style={{ color: mutedColor }}>
                Verified Traveler
              </div>

              {/* Quote */}
              <p className="font-body text-sm leading-relaxed flex-1" style={{ color: textColor }}>
                {t.text}
              </p>

              {/* Author */}
              <div className="flex items-center gap-2.5 pt-2" style={{ borderTop: `1px solid ${cardBorder}` }}>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                  style={{ backgroundColor: isDark ? "#2A2A2A" : "#F5E8D0", color: "#FF8C00" }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="font-body text-sm font-semibold" style={{ color: nameColor }}>{t.name}</div>
                  <div className="font-body text-xs" style={{ color: mutedColor }}>Traveler</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Overall satisfaction bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 rounded-2xl flex items-center justify-center gap-4 py-5 px-8"
          style={{
            background: isDark
              ? "linear-gradient(135deg, rgba(255,140,0,0.15), rgba(255,107,0,0.08))"
              : "linear-gradient(135deg, #FF8C00, #E8A020)",
            border: isDark ? "1px solid rgba(255,140,0,0.3)" : "none",
          }}
        >
          <span
            className="font-condensed font-bold text-lg lg:text-2xl tracking-wider"
            style={{ color: isDark ? "#FF8C00" : "#FFFFFF" }}
          >
            Overall customer satisfaction
          </span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className="w-5 h-5"
                style={{
                  color: isDark ? "#FF8C00" : "#FFFFFF",
                  fill: isDark ? "#FF8C00" : "#FFFFFF",
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}