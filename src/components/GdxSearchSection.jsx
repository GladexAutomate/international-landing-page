// @ts-nocheck
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CheckCircle, XCircle, Loader, MapPin } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useTheme } from "../lib/ThemeContext";
import { getFullBookingFromFusioo } from "../services/fusiooService";
import { resolveDestinationSlug } from "../utils/destinationResolver";
import { getCachedGdx, setCachedGdx } from "../services/gdxCacheService";

const ORANGE     = "#FF8C00";
const LOGO_URL   = "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/5ecc9b2cd_Untitled-design-75.png";
const GDX_PATTERN = /^[0-9]+$/;

// ── Status types ──────────────────────────────────────────────────────────────
const STATUS = {
  IDLE:       "idle",
  SEARCHING:  "searching",
  FOUND:      "found",    // Supabase confirmed — Fusioo loading
  CACHED:     "cached",   // Retrieved instantly from gdx_cache table
  READY:      "ready",    // Loaded — show View My Trip button
  NOT_FOUND:  "not_found",
  ERROR:      "error",
};

// ── Animated background orbs ──────────────────────────────────────────────────
function BackgroundOrbs({ isDark }) {
  const orbs = [
    { size: 500, x: "10%",  y: "15%",  delay: 0,   duration: 18 },
    { size: 350, x: "75%",  y: "60%",  delay: 3,   duration: 22 },
    { size: 280, x: "55%",  y: "5%",   delay: 6,   duration: 16 },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width:  orb.size,
            height: orb.size,
            left:   orb.x,
            top:    orb.y,
            background: isDark
              ? `radial-gradient(circle, rgba(255,140,0,0.07) 0%, transparent 70%)`
              : `radial-gradient(circle, rgba(255,140,0,0.10) 0%, transparent 70%)`,
            filter: "blur(40px)",
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: orb.duration, delay: orb.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// ── Status indicator ──────────────────────────────────────────────────────────
function StatusMessage({ status, gdxInput, isDark }) {
  const configs = {
    [STATUS.SEARCHING]: {
      icon:   <Loader className="w-5 h-5 animate-spin" style={{ color: ORANGE }} />,
      text:   "Searching for your booking…",
      color:  ORANGE,
      bg:     isDark ? "rgba(255,140,0,0.08)" : "rgba(255,140,0,0.07)",
      border: "rgba(255,140,0,0.3)",
    },
    [STATUS.FOUND]: {
      icon:   <Loader className="w-5 h-5 animate-spin" style={{ color: ORANGE }} />,
      text:   "Booking found! Loading your trip details…",
      color:  ORANGE,
      bg:     isDark ? "rgba(255,140,0,0.08)" : "rgba(255,140,0,0.07)",
      border: "rgba(255,140,0,0.3)",
    },
    [STATUS.CACHED]: {
      icon:   <CheckCircle className="w-5 h-5" style={{ color: "#22C55E" }} />,
      text:   "Booking loaded instantly from cache! Click View My Trip below.",
      color:  "#22C55E",
      bg:     isDark ? "rgba(34,197,94,0.08)" : "rgba(34,197,94,0.07)",
      border: "rgba(34,197,94,0.3)",
    },
    [STATUS.READY]: {
      icon:   <CheckCircle className="w-5 h-5" style={{ color: "#22C55E" }} />,
      text:   "Booking ready! Click View My Trip below to see your trip details.",
      color:  "#22C55E",
      bg:     isDark ? "rgba(34,197,94,0.08)" : "rgba(34,197,94,0.07)",
      border: "rgba(34,197,94,0.3)",
    },
    [STATUS.NOT_FOUND]: {
      icon:   <XCircle className="w-5 h-5" style={{ color: "#EF4444" }} />,
      text:   `No booking found for GDX ${gdxInput}. Please check your code and try again.`,
      color:  "#EF4444",
      bg:     isDark ? "rgba(239,68,68,0.08)" : "#FFF5F5",
      border: isDark ? "rgba(127,29,29,0.6)" : "#FECACA",
    },
    [STATUS.ERROR]: {
      icon:   <XCircle className="w-5 h-5" style={{ color: "#EF4444" }} />,
      text:   "Something went wrong. Please try again.",
      color:  "#EF4444",
      bg:     isDark ? "rgba(239,68,68,0.08)" : "#FFF5F5",
      border: isDark ? "rgba(127,29,29,0.6)" : "#FECACA",
    },
  };

  const cfg = configs[status];
  if (!cfg) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.25 }}
      className="flex items-start gap-3 px-5 py-4 rounded-2xl border mt-5 text-left"
      style={{ backgroundColor: cfg.bg, borderColor: cfg.border }}
    >
      <span className="shrink-0 mt-0.5">{cfg.icon}</span>
      <p className="font-body text-sm leading-relaxed" style={{ color: cfg.color }}>
        {cfg.text}
      </p>
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function GdxSearchSection() {
  const { isDark } = useTheme();
  const navigate   = useNavigate();

  const [gdxInput, setGdxInput] = useState("");
  const [status,   setStatus]   = useState(STATUS.IDLE);
  const [booking,  setBooking]  = useState(null);

  const bg          = isDark ? "#080808" : "#F0F0F0";
  const cardBg      = isDark ? "rgba(26,26,26,0.85)" : "rgba(255,255,255,0.85)";
  const cardBorder  = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const inputBg     = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)";
  const inputBorder = gdxInput
    ? ORANGE
    : isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)";
  const textPrimary   = isDark ? "#FFFFFF" : "#111111";
  const textSecondary = isDark ? "#A0A0A0" : "#555555";

  const isLoading  = status === STATUS.SEARCHING || status === STATUS.FOUND;
  const isReady    = status === STATUS.READY || status === STATUS.CACHED;

  const handleSearch = async () => {
    const query = gdxInput.trim();
    if (!query) return;

    if (!GDX_PATTERN.test(query)) {
      setStatus(STATUS.NOT_FOUND);
      return;
    }

    setStatus(STATUS.SEARCHING);
    setBooking(null);

    try {
      // ── 1. Check gdx_cache first ─────────────────────────────────────────
      const cached = await getCachedGdx(query);
      if (cached) {
        setBooking(cached.booking);
        setStatus(STATUS.CACHED);
        return;
      }

      // ── 2. Cache miss — read from bookings table ──────────────────────────
      console.log("[GDX] Cache miss — querying Supabase:", query);
      const { data, error: supaError } = await supabase
        .from("bookings_6fbdd6b2")
        .select("*")
        .eq("gdx", query);

      if (supaError || !data || data.length === 0) {
        setStatus(STATUS.NOT_FOUND);
        return;
      }

      // ── 3. Enrich with Fusioo ─────────────────────────────────────────────
      const rawBooking = data[0];
      setStatus(STATUS.FOUND); // Show "Loading your trip details…"

      const fullBooking = await getFullBookingFromFusioo(rawBooking);
      console.log("[GDX] Full booking loaded:", {
        gdx:             fullBooking?.gdx,
        destinationName: fullBooking?.destinationName,
        hotelName:       fullBooking?.hotelName,
        airlineName:     fullBooking?.airlineName,
        pnr:             fullBooking?.pnr,
        tourName:        fullBooking?.tourName,
        packageName:     fullBooking?.packageName,
        amountPaid:      fullBooking?.amountPaid,
      });

      // ── 4. Store in gdx_cache (fire-and-forget, won't slow the user down) ─
      const resolvedSlug = resolveDestinationSlug(fullBooking);
      setCachedGdx(query, fullBooking, resolvedSlug);

      setBooking(fullBooking);
      setStatus(STATUS.READY);

    } catch (err) {
      console.error("[GDX] Unexpected error:", err);
      setStatus(STATUS.ERROR);
    }
  };

  const handleViewMyTrip = () => {
    const slug = resolveDestinationSlug(booking);
    sessionStorage.setItem("gdx_booking", JSON.stringify(booking));
    navigate(`/destination/${slug || "_booking"}`, { state: { booking } });
  };


  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 transition-colors duration-500"
      style={{ backgroundColor: bg }}
    >
      {/* Animated background orbs */}
      <BackgroundOrbs isDark={isDark} />

      {/* Content column — search area + expanding panel */}
      <div className="relative z-10 w-full flex flex-col items-center">

        {/* ── Search area (always max-w-lg) ──────────────────────────────────── */}
        <div className="w-full max-w-lg flex flex-col items-center">

          {/* Logo */}
          <motion.img
            src={LOGO_URL}
            alt="Gladex Tours"
            className="h-16 w-auto object-contain mb-10"
            style={{ filter: isDark ? "drop-shadow(0 0 20px rgba(255,140,0,0.4))" : "none" }}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          />

          {/* Heading */}
          <motion.h1
            className="font-condensed font-black text-4xl lg:text-5xl text-center leading-tight mb-3"
            style={{ color: textPrimary, letterSpacing: "0.02em" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Your Trip Is{" "}
            <span style={{ color: ORANGE }}>Confirmed! 🧡</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="font-body text-sm lg:text-base text-center mb-10 max-w-sm leading-relaxed"
            style={{ color: textSecondary }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Enter your GDX Confirmation Number or Tour Voucher Number to access your personalized travel briefing, vouchers, reminders, optional tours, and add-ons.
          </motion.p>

          {/* Glass card */}
          <motion.div
            className="w-full rounded-3xl p-7 shadow-2xl"
            style={{
              backgroundColor: cardBg,
              border: `1px solid ${cardBorder}`,
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            {/* Input + Button */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  inputMode="numeric"
                  value={gdxInput}
                  onChange={(e) => {
                    setGdxInput(e.target.value.replace(/[^0-9]/g, ""));
                    if (status !== STATUS.IDLE) {
                      setStatus(STATUS.IDLE);
                      setBooking(null);
                    }
                  }}
                  onKeyDown={(e) => e.key === "Enter" && !isLoading && handleSearch()}
                  placeholder="Enter GDX Confirmation Number / Tour Voucher Number"
                  maxLength={20}
                  disabled={isLoading}
                  aria-label="GDX booking number"
                  className="w-full font-body font-semibold text-base px-5 py-4 rounded-2xl border focus:outline-none transition-all duration-200 disabled:opacity-50"
                  style={{
                    backgroundColor: inputBg,
                    borderColor: inputBorder,
                    color: textPrimary,
                    boxShadow: gdxInput ? `0 0 0 3px rgba(255,140,0,0.12)` : "none",
                  }}
                />
              </div>

              <motion.button
                onClick={handleSearch}
                disabled={isLoading || !gdxInput.trim()}
                aria-label="Find my briefing"
                className="inline-flex items-center justify-center gap-2 font-body font-bold text-sm px-7 py-4 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0 w-full sm:w-auto"
                style={{ backgroundColor: ORANGE, color: "#080808" }}
                whileHover={{ scale: 1.03, boxShadow: "0 0 24px rgba(255,140,0,0.45)" }}
                whileTap={{ scale: 0.97 }}
              >
                {isLoading ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
                {isLoading ? "Loading…" : "View My Trip"}
              </motion.button>
            </div>

            {/* Status feedback */}
            <AnimatePresence mode="wait">
              {status !== STATUS.IDLE && (
                <StatusMessage
                  key={status}
                  status={status}
                  gdxInput={gdxInput}
                  isDark={isDark}
                />
              )}
            </AnimatePresence>
          </motion.div>

          {/* View My Trip button — shows on READY (fresh) or CACHED (instant) */}
          <AnimatePresence>
            {isReady && (
              <motion.button
                className="w-full mt-4 inline-flex items-center justify-center gap-2 font-body font-bold text-base py-4 rounded-2xl"
                style={{ backgroundColor: ORANGE, color: "#080808" }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                onClick={handleViewMyTrip}
                whileHover={{ scale: 1.02, boxShadow: "0 0 28px rgba(255,140,0,0.50)" }}
                whileTap={{ scale: 0.97 }}
              >
                <MapPin className="w-5 h-5" />
                View My Trip
              </motion.button>
            )}
          </AnimatePresence>

          {/* Helper note */}
          <motion.p
            className="font-body text-xs text-center mt-6"
            style={{ color: textSecondary }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Your GDX number was provided in your booking confirmation from Gladex Tours.
          </motion.p>
        </div>


      </div>

      {/* Footer — flows below panel when visible */}
      <motion.p
        className="relative z-10 mt-12 font-body text-xs"
        style={{ color: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        © {new Date().getFullYear()} Gladex Travel & Tours
      </motion.p>
    </div>
  );
}
