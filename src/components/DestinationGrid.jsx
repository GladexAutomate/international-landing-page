// @ts-nocheck
import { useState } from "react";
import { motion } from "framer-motion";
import DestinationCard from "./DestinationCard";
import VideoPreviewModal from "./VideoPreviewModal";
import { getDestinations } from "../data/destinations";

export default function DestinationGrid() {
  const [previewDestination, setPreviewDestination] = useState(null);
  const [filter, setFilter] = useState("ALL");

  const regions = ["ALL", "Asia", "Southeast Asia", "Pacific", "Middle East"];

  const regionMap = {
    "Southeast Asia": ["Thailand", "Vietnam", "Indonesia", "Singapore", "Malaysia", "Cambodia", "Multi-Country"],
    Asia: ["South Korea", "Japan", "Taiwan", "China", "Hong Kong SAR", "Macau SAR"],
    Pacific: ["New Zealand", "Maldives"],
    "Middle East": ["UAE"],
  };

  const allDestinations = getDestinations();
  const filteredDestinations =
    filter === "ALL"
      ? allDestinations
      : allDestinations.filter((d) =>
          (regionMap[filter] || []).includes(d.country)
        );

  return (
    <section id="destinations" className="py-24 px-6 lg:px-10" style={{ backgroundColor: "#080808" }}>
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="font-body text-xs tracking-[0.4em] text-gladex-orange uppercase mb-4">
            ✦ The Collection ✦
          </div>
          <h2
            className="font-condensed font-black text-white leading-none mb-4"
            style={{ fontSize: "clamp(48px, 8vw, 96px)", letterSpacing: "0.03em" }}
          >
            26 WORLD
            <br />
            <span className="text-gladex-orange">DESTINATIONS</span>
          </h2>
          <p className="font-body text-chrome text-lg max-w-xl leading-relaxed">
            Every destination is a curated cinematic experience. Browse our full international collection and find your next chapter.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-3 mb-12">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setFilter(region)}
              className={`font-body text-xs font-semibold tracking-widest uppercase px-5 py-2.5 rounded-sm border transition-all duration-200 min-h-[40px] focus-ring ${
                filter === region
                  ? "bg-gladex-orange text-[#080808] border-gladex-orange"
                  : "border-white/20 text-chrome hover:border-gladex-orange hover:text-white"
              }`}
            >
              {region}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2 text-chrome font-body text-sm">
            <span className="text-gladex-orange font-semibold">{filteredDestinations.length}</span>
            <span>destinations</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredDestinations.map((destination, index) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              index={index}
              onPreview={setPreviewDestination}
            />
          ))}
        </div>
      </div>

      {/* Video Preview Modal */}
      {previewDestination && (
        <VideoPreviewModal
          destination={previewDestination}
          onClose={() => setPreviewDestination(null)}
        />
      )}
    </section>
  );
}