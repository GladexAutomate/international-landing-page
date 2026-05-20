import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Compass, MapPin, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function VideoPreviewModal({ destination, onClose }) {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  const handleExplore = () => {
    onClose();
    navigate(`/destination/${destination.slug}`);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-10"
        style={{ backgroundColor: "rgba(8,8,8,0.95)" }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative w-full max-w-4xl rounded-sm overflow-hidden"
          style={{ aspectRatio: "16/9" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Background image */}
          <img
            src={destination.heroImage}
            alt={destination.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/50 to-[#080808]/30" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 glass-panel p-2.5 rounded-sm text-white hover:bg-white/10 transition-colors focus-ring min-h-[48px] min-w-[48px] flex items-center justify-center"
            aria-label="Close preview"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Video placeholder — center */}
          {destination.videoUrl ? (
            <video
              src={destination.videoUrl}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {/* Animated cinematic placeholder */}
              <div className="relative mb-6">
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-24 h-24 rounded-full bg-gladex-orange/20 border border-gladex-orange/40 flex items-center justify-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                    className="w-16 h-16 rounded-full bg-gladex-orange/30 flex items-center justify-center"
                  >
                    <Camera className="w-8 h-8 text-gladex-orange" />
                  </motion.div>
                </motion.div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-t border-gladex-orange/60"
                />
              </div>
              <div
                className="font-body text-xs tracking-[0.4em] text-gladex-orange uppercase mb-2"
                style={{ fontFamily: "monospace" }}
              >
                VIDEO COMING SOON
              </div>
              <div className="font-body text-chrome text-sm text-center px-8">
                Cinematic destination video is being prepared. Check back soon.
              </div>
            </motion.div>
          )}

          {/* Bottom info */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-6 lg:p-8">
            <div className="flex items-center gap-1.5 mb-2">
              <MapPin className="w-3 h-3 text-gladex-orange" />
              <span className="font-body text-xs text-chrome tracking-wider uppercase">
                {destination.country}
              </span>
            </div>
            <h2 className="font-condensed font-black text-white mb-1" style={{ fontSize: "clamp(32px, 6vw, 56px)", letterSpacing: "0.04em" }}>
              {destination.name.toUpperCase()}
            </h2>
            <p className="font-body text-chrome text-sm mb-5">{destination.tagline}</p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="glass-panel px-4 py-2">
                <span className="font-body text-xs text-chrome">From </span>
                <span className="font-condensed text-xl font-bold text-gladex-orange">
                  ₱{destination.startingPrice.toLocaleString()}
                </span>
              </div>
              <button
                onClick={handleExplore}
                className="font-condensed font-semibold tracking-widest uppercase text-sm px-7 py-3 bg-gladex-orange text-[#080808] rounded-sm hover:bg-orange-400 transition-all duration-200 min-h-[48px] flex items-center gap-2 focus-ring"
              >
                <Compass className="w-4 h-4" />
                Explore Package
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}