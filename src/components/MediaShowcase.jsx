import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Camera } from "lucide-react";
import { getDestinations } from "../data/destinations";
import VideoPreviewModal from "./VideoPreviewModal";

const mediaHighlights = getDestinations().slice(0, 6);

export default function MediaShowcase() {
  const [previewDestination, setPreviewDestination] = useState(null);

  return (
    <section id="media" className="py-24 px-6 lg:px-10" style={{ backgroundColor: "#080808" }}>
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
            ✦ Travel Media ✦
          </div>
          <h2
            className="font-condensed font-black text-white leading-none mb-4"
            style={{ fontSize: "clamp(40px, 6vw, 80px)", letterSpacing: "0.03em" }}
          >
            CINEMATIC
            <br />
            <span className="text-gladex-orange">SHOWCASE</span>
          </h2>
          <p className="font-body text-chrome text-lg max-w-xl leading-relaxed">
            Preview destination films for each package. Full cinematic videos coming soon — each destination will have its own travel documentary.
          </p>
        </motion.div>

        {/* Media grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {mediaHighlights.map((dest, index) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative rounded-sm overflow-hidden cursor-pointer group"
              style={{ aspectRatio: "16/9" }}
              onClick={() => setPreviewDestination(dest)}
            >
              <img
                src={dest.heroImage}
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 to-[#080808]/20" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                {dest.videoUrl ? (
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 rounded-full bg-gladex-orange flex items-center justify-center shadow-lg"
                  >
                    <Play className="w-7 h-7 text-[#080808] ml-1" fill="currentColor" />
                  </motion.div>
                ) : (
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="flex flex-col items-center gap-3"
                  >
                    <div className="w-16 h-16 rounded-full border-2 border-gladex-orange/50 flex items-center justify-center glass-panel">
                      <Camera className="w-6 h-6 text-gladex-orange" />
                    </div>
                    <span
                      className="font-body text-[9px] tracking-[0.25em] text-gladex-orange uppercase"
                      style={{ fontFamily: "monospace" }}
                    >
                      Video Coming Soon
                    </span>
                  </motion.div>
                )}
              </div>

              {/* Bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h4 className="font-condensed font-bold text-white text-lg tracking-wider">
                  {dest.name}
                </h4>
                <p className="font-body text-xs text-chrome">{dest.country}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Upload notice */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 glass-panel rounded-sm p-6 lg:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
        >
          <div>
            <div
              className="font-body text-[10px] tracking-[0.3em] text-gladex-orange uppercase mb-2"
              style={{ fontFamily: "monospace" }}
            >
              VIDEO SYSTEM STATUS
            </div>
            <h3 className="font-condensed font-bold text-white text-2xl mb-1">
              Destination Films In Production
            </h3>
            <p className="font-body text-chrome text-sm leading-relaxed max-w-xl">
              Our cinematic video team is capturing each destination. Videos will be automatically linked to their respective destination packages upon upload.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span
              className="w-2 h-2 rounded-full bg-gladex-orange animate-pulse"
              aria-hidden="true"
            />
            <span className="font-body text-sm text-chrome font-medium">26 videos queued</span>
          </div>
        </motion.div>
      </div>

      {previewDestination && (
        <VideoPreviewModal
          destination={previewDestination}
          onClose={() => setPreviewDestination(null)}
        />
      )}
    </section>
  );
}