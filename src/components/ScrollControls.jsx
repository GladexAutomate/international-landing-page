// @ts-nocheck
import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ORANGE = "#FF8C00";

const btnStyle = {
  width: 44,
  height: 44,
  borderRadius: 12,
  backgroundColor: "rgba(255,140,0,0.93)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  color: "#000",
  border: "1.5px solid rgba(255,255,255,0.25)",
  boxShadow: "0 4px 18px rgba(255,140,0,0.38), 0 2px 5px rgba(0,0,0,0.22)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  padding: 0,
  outline: "none",
};

export default function ScrollControls() {
  const [state, setState] = useState({ scrollY: 0, pageH: 0, vpH: 0 });
  const rafRef = useRef(null);

  const update = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      setState({
        scrollY: window.scrollY,
        pageH: document.documentElement.scrollHeight,
        vpH: window.innerHeight,
      });
      rafRef.current = null;
    });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [update]);

  const { scrollY, pageH, vpH } = state;
  const isLongPage = pageH > vpH + 200;
  const showUp = isLongPage && scrollY > 80;
  const showDown = isLongPage && scrollY + vpH < pageH - 80;

  if (!showUp && !showDown) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 20,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        pointerEvents: "none",
      }}
    >
      <AnimatePresence>
        {showUp && (
          <motion.button
            key="up"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ ...btnStyle, pointerEvents: "auto" }}
            initial={{ opacity: 0, scale: 0.75, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.75, y: 6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
          >
            <ChevronUp size={20} strokeWidth={2.5} />
          </motion.button>
        )}
        {showDown && (
          <motion.button
            key="down"
            onClick={() =>
              window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" })
            }
            style={{ ...btnStyle, pointerEvents: "auto" }}
            initial={{ opacity: 0, scale: 0.75, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.75, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to bottom"
          >
            <ChevronDown size={20} strokeWidth={2.5} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
