import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const featured = [
  {
    slug: "korea",
    label: "FEATURED EXPERIENCE",
    title: "Nami Island & Seoul",
    country: "South Korea",
    description: "From ancient palaces to neon-drenched districts — Korea's capital is a cinematic universe waiting to be explored.",
    image: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=1400&q=85",
    price: "₱37,999",
    tag: "6D4N PACKAGE",
    wide: true,
  },
  {
    slug: "maldives",
    label: "LUXURY ESCAPE",
    title: "Maldives",
    country: "Maldives",
    description: "Overwater villas above turquoise infinity — the ultimate retreat.",
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=900&q=85",
    price: "₱62,999",
    tag: "ISLAND LUXURY",
    wide: false,
  },
  {
    slug: "japan",
    label: "MOST SOUGHT AFTER",
    title: "Japan",
    country: "Japan",
    description: "Cherry blossoms, neon towers, and thousand-year-old traditions in perfect coexistence.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=900&q=85",
    price: "₱59,999",
    tag: "MUST SEE",
    wide: false,
  },
];

export default function FeaturedExperiences() {
  const navigate = useNavigate();

  return (
    <section id="experiences" className="py-24 px-6 lg:px-10" style={{ backgroundColor: "#080808" }}>
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-6"
        >
          <div>
            <div className="font-body text-xs tracking-[0.4em] text-gladex-orange uppercase mb-4">
              ✦ Editor's Picks ✦
            </div>
            <h2
              className="font-condensed font-black text-white leading-none"
              style={{ fontSize: "clamp(40px, 6vw, 80px)", letterSpacing: "0.03em" }}
            >
              FEATURED
              <br />
              <span className="text-gladex-orange">EXPERIENCES</span>
            </h2>
          </div>
          <p className="font-body text-chrome max-w-sm leading-relaxed text-lg">
            Handpicked destinations selected by our travel experts for an unrivaled international experience.
          </p>
        </motion.div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Wide featured card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 relative rounded-sm overflow-hidden cursor-pointer group"
            style={{ aspectRatio: "16/9" }}
            onClick={() => navigate(`/destination/${featured[0].slug}`)}
          >
            <img
              src={featured[0].image}
              alt={featured[0].title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="font-body text-[10px] tracking-[0.3em] text-gladex-orange uppercase mb-2" style={{ fontFamily: "monospace" }}>
                {featured[0].label} — {featured[0].tag}
              </div>
              <h3 className="font-condensed font-black text-white mb-2" style={{ fontSize: "48px", letterSpacing: "0.03em" }}>
                {featured[0].title}
              </h3>
              <p className="font-body text-chrome text-sm leading-relaxed mb-4 max-w-sm">
                {featured[0].description}
              </p>
              <div className="flex items-center gap-4">
                <span className="font-condensed text-2xl font-bold text-gladex-orange">{featured[0].price}</span>
                <span className="font-body text-xs text-chrome">per person</span>
              </div>
            </div>
          </motion.div>

          {/* Two stacked cards */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {featured.slice(1).map((item, i) => (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="relative rounded-sm overflow-hidden cursor-pointer group flex-1"
                style={{ minHeight: "240px" }}
                onClick={() => navigate(`/destination/${item.slug}`)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="font-body text-[9px] tracking-[0.25em] text-gladex-orange uppercase mb-1" style={{ fontFamily: "monospace" }}>
                    {item.tag}
                  </div>
                  <h3 className="font-condensed font-black text-white mb-1" style={{ fontSize: "32px", letterSpacing: "0.03em" }}>
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="font-condensed text-xl font-bold text-gladex-orange">{item.price}</span>
                    <span className="font-body text-xs text-chrome">/ person</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}