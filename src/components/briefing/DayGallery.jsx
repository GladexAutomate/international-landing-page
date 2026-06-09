// @ts-nocheck
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Images } from "lucide-react";

const ORANGE = "#FF8C00";

// ─── LIGHTBOX ────────────────────────────────────────────────────────────────
function Lightbox({ images, startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const [zoomed, setZoomed] = useState(false);
  const [dir, setDir] = useState(0);
  const touchX = useRef(null);
  const total = images.length;
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Lock body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight") { setDir(1); setZoomed(false); setIndex((i) => (i + 1) % total); }
      else if (e.key === "ArrowLeft") { setDir(-1); setZoomed(false); setIndex((i) => (i - 1 + total) % total); }
      else if (e.key === "Escape") onCloseRef.current();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [total]);

  const nav = (delta) => {
    setDir(delta);
    setZoomed(false);
    setIndex((i) => (i + delta + total) % total);
  };

  // Touch swipe
  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) nav(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  const slideVariants = {
    enter: (d) => ({ x: d >= 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d >= 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-[9999] flex flex-col"
      style={{ backgroundColor: "rgba(0,0,0,0.96)" }}
    >
      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-4 py-3 shrink-0 relative">
        <button
          onClick={() => setZoomed((z) => !z)}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
          style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          aria-label={zoomed ? "Zoom out" : "Zoom in"}
        >
          {zoomed
            ? <ZoomOut className="w-4 h-4 text-white" />
            : <ZoomIn className="w-4 h-4 text-white" />
          }
        </button>

        <span className="absolute left-1/2 -translate-x-1/2 font-body text-sm text-white/60 pointer-events-none">
          {index + 1} / {total}
        </span>

        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
          style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          aria-label="Close"
        >
          <X className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* ── Image area ── */}
      <div
        className="flex-1 relative flex items-center justify-center overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Prev */}
        {total > 1 && (
          <button
            onClick={() => nav(-1)}
            className="absolute left-2 sm:left-4 z-10 w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 shrink-0"
            style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
        )}

        {/* Animated image */}
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={index}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex items-center justify-center w-full h-full px-14 sm:px-20"
          >
            <img
              src={images[index]}
              alt={`Photo ${index + 1} of ${total}`}
              className="max-w-full max-h-[80vh] object-contain rounded-xl select-none"
              style={{
                transform: zoomed ? "scale(2)" : "scale(1)",
                transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
                cursor: zoomed ? "zoom-out" : "zoom-in",
              }}
              onClick={() => setZoomed((z) => !z)}
              draggable={false}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/images/placeholder.svg";
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Next */}
        {total > 1 && (
          <button
            onClick={() => nav(1)}
            className="absolute right-2 sm:right-4 z-10 w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 shrink-0"
            style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        )}
      </div>

      {/* ── Dot indicators (only when ≤ 20 images) ── */}
      {total > 1 && total <= 20 && (
        <div className="flex items-center justify-center gap-1.5 py-4 shrink-0">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDir(i > index ? 1 : -1); setZoomed(false); setIndex(i); }}
              className="rounded-full transition-all duration-200"
              style={{
                width: i === index ? 20 : 6,
                height: 6,
                backgroundColor: i === index ? ORANGE : "rgba(255,255,255,0.28)",
              }}
              aria-label={`Go to photo ${i + 1}`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ─── THUMBNAIL GRID ───────────────────────────────────────────────────────────
export default function DayGallery({ images = [], theme }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const { border, textSecondary, isDark } = theme;

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="mt-5 pt-4 border-t" style={{ borderColor: border }}>
        {/* Label */}
        <p
          className="font-body text-[11px] font-medium uppercase tracking-widest mb-3 flex items-center gap-1.5"
          style={{ color: textSecondary }}
        >
          <Images className="w-3.5 h-3.5 shrink-0" />
          {images.length} Photo{images.length !== 1 ? "s" : ""}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
          {images.map((src, i) => (
            <motion.button
              key={i}
              onClick={() => setLightboxIndex(i)}
              className="aspect-square rounded-xl overflow-hidden relative border focus:outline-none"
              style={{
                borderColor: border,
                backgroundColor: isDark ? "#1A1A1A" : "#EFEFEF",
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
              aria-label={`Open photo ${i + 1}`}
            >
              <img
                src={src}
                alt={`Day photo ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/images/placeholder.svg";
                }}
              />
              {/* Subtle hover overlay */}
              <div className="absolute inset-0 bg-black/0 hover:bg-black/15 transition-colors pointer-events-none" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox portal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={images}
            startIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
