import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../lib/ThemeContext";

export default function ThemeToggle() {
  const { isDark, setIsDark } = useTheme();

  return (
    <div className="fixed top-5 right-6 z-50 flex items-center gap-2">
      <span
        className="font-body text-xs font-semibold tracking-widest uppercase"
        style={{ color: isDark ? "#A0A0A0" : "#8B6914" }}
      >
        {isDark ? "DARK MODE" : "LIGHT MODE"}
      </span>
      <button
        onClick={() => setIsDark(!isDark)}
        aria-label="Toggle theme"
        className="relative w-12 h-6 rounded-full transition-all duration-300 focus:outline-none"
        style={{
          backgroundColor: isDark ? "#FF6B00" : "#E8A020",
          boxShadow: isDark ? "0 0 12px rgba(255,107,0,0.5)" : "0 2px 8px rgba(232,160,32,0.4)",
        }}
      >
        <motion.div
          animate={{ x: isDark ? 24 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-1 w-4 h-4 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#fff" }}
        >
          {isDark ? (
            <Moon className="w-2.5 h-2.5" style={{ color: "#FF6B00" }} />
          ) : (
            <Sun className="w-2.5 h-2.5" style={{ color: "#E8A020" }} />
          )}
        </motion.div>
      </button>
    </div>
  );
}