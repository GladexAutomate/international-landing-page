import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "../data/testimonials";

export default function Testimonials() {
  return (
    <section id="reviews" className="py-24 px-6 lg:px-10" style={{ backgroundColor: "#080808" }}>
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="font-body text-xs tracking-[0.4em] text-gladex-orange uppercase mb-4">
            ✦ Traveler Stories ✦
          </div>
          <h2
            className="font-condensed font-black text-white leading-none"
            style={{ fontSize: "clamp(40px, 6vw, 80px)", letterSpacing: "0.03em" }}
          >
            WHAT OUR
            <br />
            <span className="text-gladex-orange">TRAVELERS SAY</span>
          </h2>
        </motion.div>

        {/* Testimonial grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-panel rounded-sm p-7 flex flex-col gap-5 hover:border-gladex-orange/20 transition-colors duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gladex-orange fill-gladex-orange" />
                ))}
              </div>

              {/* Quote */}
              <p className="font-body text-white/90 text-sm leading-relaxed flex-1">
                "{t.text}"
              </p>

              {/* Destination tag */}
              <span
                className="font-body text-[9px] tracking-[0.25em] text-gladex-orange uppercase border border-gladex-orange/30 px-3 py-1 w-fit"
                style={{ fontFamily: "monospace" }}
              >
                {t.destination}
              </span>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-white/8">
                <div className="w-10 h-10 rounded-sm bg-gladex-orange/20 border border-gladex-orange/30 flex items-center justify-center">
                  <span className="font-condensed font-bold text-gladex-orange text-sm">
                    {t.avatar}
                  </span>
                </div>
                <div>
                  <div className="font-body text-white text-sm font-semibold">{t.name}</div>
                  <div className="font-body text-chrome text-xs">{t.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {[
            { value: "4.9/5", label: "Average Rating", sub: "Across all tours" },
            { value: "1,000+", label: "Happy Travelers", sub: "And counting" },
            { value: "26", label: "Destinations", sub: "International packages" },
            { value: "10+", label: "Years", sub: "Of trusted service" },
          ].map((metric) => (
            <div
              key={metric.label}
              className="glass-panel rounded-sm p-6 text-center"
            >
              <div className="font-condensed text-4xl font-black text-gladex-orange mb-1">
                {metric.value}
              </div>
              <div className="font-body text-white text-sm font-semibold mb-1">{metric.label}</div>
              <div className="font-body text-chrome text-xs">{metric.sub}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}