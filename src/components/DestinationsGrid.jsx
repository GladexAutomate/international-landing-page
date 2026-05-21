import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../lib/ThemeContext";
import { destinations } from "../data/destinations";

export default function DestinationsGrid() {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const bg = isDark ? "#0D0D0D" : "#F0F0F0";
  const headingColor = isDark ? "#FFFFFF" : "#1A1A1A";
  const subColor = "#FF8C00";

  return (
    <section id="destinations" className="py-12 px-4 lg:px-10" style={{ backgroundColor: bg }}>
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="font-body text-xs font-semibold tracking-[0.4em] uppercase mb-2" style={{ color: subColor }}>
            — INTERNATIONAL DESTINATIONS —
          </p>
          <h2
            className="font-condensed font-black text-3xl lg:text-5xl"
            style={{ color: headingColor, letterSpacing: "0.03em" }}
          >
            Where Do You Want To Go?
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {destinations.map((dest, i) => (
            <DestinationCard
              key={dest.id}
              dest={dest}
              index={i}
              isDark={isDark}
              onClick={() => navigate(`/destination/${dest.slug}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function DestinationCard({ dest, index, isDark, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      className="relative rounded-xl overflow-hidden cursor-pointer group"
      style={{ aspectRatio: "4/3" }}
      onClick={onClick}
    >
      {/* Image */}
      <img
        src={dest.cardImage || dest.heroImage}
        alt={dest.name}
        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2"
        style={{ transformOrigin: "center center" }}
        loading="lazy"
      />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300" />

      {/* Orange glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "linear-gradient(to top, rgba(255,140,0,0.25), transparent 60%)" }}
      />

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <div className="font-condensed font-bold text-white text-sm leading-tight tracking-wide">{dest.name}</div>

        {/* Watch Preview button */}
        <motion.div
          className="mt-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
        >
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-body text-xs font-bold shadow-lg hover:scale-105 transition-transform duration-200"
            style={{ backgroundColor: "rgba(255,255,255,0.95)", color: "#1A1A1A" }}
          >
            <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "#FF8C00" }}>
              <Play className="w-2 h-2 text-white ml-0.5" />
            </div>
            Watch Preview
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}