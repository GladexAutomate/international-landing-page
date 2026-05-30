import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ORANGE = "#FF8C00";

function Lightbox({ images, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex);

  const prev = useCallback(() => setCurrent(i => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent(i => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next, onClose]);

  // Touch swipe support
  useEffect(() => {
    let startX = null;
    const touchStart = (e) => { startX = e.touches[0].clientX; };
    const touchEnd = (e) => {
      if (startX === null) return;
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); }
      startX = null;
    };
    window.addEventListener("touchstart", touchStart);
    window.addEventListener("touchend", touchEnd);
    return () => {
      window.removeEventListener("touchstart", touchStart);
      window.removeEventListener("touchend", touchEnd);
    };
  }, [prev, next]);

  const img = images[current];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
      >
        <X className="w-5 h-5 text-white" />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-4 py-1 rounded-full bg-white/10 text-white text-xs font-medium">
        {current + 1} / {images.length}
      </div>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        className="absolute left-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.2 }}
          className="max-w-4xl w-full mx-16 flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={img.url}
            alt={img.caption}
            className="w-full max-h-[65vh] object-cover rounded-2xl shadow-2xl"
          />
          {img.caption && (
            <div className="mt-4 px-4 py-2.5 rounded-xl bg-white/10 max-w-xl text-center">
              <p className="text-white/90 text-sm leading-relaxed">{img.caption}</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        className="absolute right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
            className="w-2 h-2 rounded-full transition-all"
            style={{ backgroundColor: i === current ? ORANGE : "rgba(255,255,255,0.4)", transform: i === current ? "scale(1.3)" : "scale(1)" }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function PhotoGalleryBlock({ title, images = [] }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  if (!images.length) return null;

  return (
    <div>
      {title && (
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-6 rounded-full shrink-0" style={{ backgroundColor: ORANGE }} />
          <h2 className="text-xl font-black font-condensed tracking-wide text-gray-900">{title}</h2>
        </div>
      )}

      {/* Grid layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 lg:gap-3">
        {images.map((img, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02 }}
            onClick={() => setLightboxIndex(i)}
            className={`relative overflow-hidden rounded-xl cursor-pointer border border-gray-100 shadow-sm group ${i === 0 ? "col-span-2 sm:col-span-2 lg:col-span-2 row-span-1" : ""}`}
            style={{ aspectRatio: i === 0 ? "16/9" : "4/3" }}
          >
            <img
              src={img.url}
              alt={img.caption}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-white text-xs leading-snug line-clamp-2">{img.caption}</p>
            </div>
            {/* Play / zoom indicator */}
            <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-xs">⤢</span>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={images}
            startIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}