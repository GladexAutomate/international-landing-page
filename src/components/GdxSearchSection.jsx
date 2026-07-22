// @ts-nocheck
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, CheckCircle, XCircle, Loader, MapPin,
  AlertTriangle, ExternalLink, Clock, Download,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useTheme } from "../lib/ThemeContext";
import { getFullBookingFromFusioo } from "../services/fusiooService";
import { resolveDestinationSlug } from "../utils/destinationResolver";
import { getCachedGdx, setCachedGdx } from "../services/gdxCacheService";
import { READY_SLUGS } from "../config/readySlugs";
import { getVoucher } from "../services/voucherService";

const ORANGE              = "#FF9913";
const LOGO_URL            = "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/5ecc9b2cd_Untitled-design-75.png";
const GDX_PATTERN         = /^[0-9]+$/;
const DOMESTIC_PORTAL_URL = "https://domestic-landing-page.vercel.app/";
const REDIRECT_SECONDS    = 3;

// READY_SLUGS imported from src/config/readySlugs.js

// ── Status types ───────────────────────────────────────────────────────────────
const STATUS = {
  IDLE:               "idle",
  SEARCHING:          "searching",
  FOUND:              "found",
  CACHED:             "cached",
  READY:              "ready",
  NOT_FOUND:          "not_found",
  FORMAT_ERROR:       "format_error",
  LAST_NAME_MISMATCH: "last_name_mismatch",
  WRONG_PORTAL:       "wrong_portal",
  ERROR:              "error",
};

// ── Helpers ────────────────────────────────────────────────────────────────────

function extractLastName(fullName) {
  if (!fullName) return null;
  const n = String(fullName).trim();
  // "SMITH, JOHN" → "SMITH"
  if (n.includes(",")) return n.split(",")[0].trim().toUpperCase();
  // "JOHN SMITH" → "SMITH"
  const parts = n.split(/\s+/).filter(Boolean);
  return parts.length > 0 ? parts[parts.length - 1].toUpperCase() : null;
}

function isLastNameMatch(row, enteredLastName) {
  const entered = enteredLastName.trim().toUpperCase();
  if (!entered) return false;
  // Supabase column is "lead_name" (full name of lead passenger).
  // extractLastName takes the last word, handling both "First Last" and "Last, First" formats.
  const candidates = [
    extractLastName(row.lead_name),
  ].filter(Boolean).map((s) => String(s).trim().toUpperCase());
  // Fail secure: if no name data exists in the record, block access.
  if (candidates.length === 0) return false;
  return candidates.some((c) => c === entered);
}

// Philippine domestic destination keywords — any booking whose destination text
// contains one of these is classified as domestic and redirected immediately.
// Based on the international KEYWORD_MAP in destinationResolver.js: anything NOT
// in that map and matching a Philippine location is domestic.
const PHILIPPINE_DOMESTIC_KEYWORDS = [
  // Islands & beach resorts
  "boracay", "caticlan", "kalibo",
  "siargao", "surigao",
  "palawan", "el nido", "coron", "puerto princesa",
  "camiguin",
  // Visayas
  "cebu", "mactan", "lapu-lapu",
  "bohol", "panglao", "tagbilaran",
  "iloilo", "bacolod", "negros occidental", "negros oriental",
  "tacloban", "leyte", "samar",
  "dumaguete", "siquijor",
  // Mindanao
  "davao", "samal", "general santos", "gensan",
  "cagayan de oro", "bukidnon", "zamboanga", "cotabato",
  // Luzon
  "batangas", "nasugbu", "puerto galera", "mindoro",
  "la union", "san juan la union",
  "baguio", "benguet", "sagada", "banaue", "ifugao",
  "ilocos", "vigan", "laoag", "pagudpud",
  "subic", "olongapo", "clark", "angeles pampanga",
  "bicol", "naga city", "legazpi", "albay", "sorsogon",
  "tagaytay", "bataan",
  "zambales", "pangasinan",
];

function isDomesticBooking(booking) {
  if (!booking) return false;

  // ── Layer 1: "domestic" keyword in package type / name fields ────────────
  const hasDomesticKeyword = (val) =>
    typeof val === "string" && val.toLowerCase().includes("domestic");
  if (
    hasDomesticKeyword(booking.packageType)            ||
    hasDomesticKeyword(booking.type_of_package)        ||
    hasDomesticKeyword(booking.transaction_type)       ||
    hasDomesticKeyword(booking.packageName)            ||
    hasDomesticKeyword(booking.collective_package_name)
  ) return true;

  // ── Layer 2: domestic voucher presence (Supabase raw OR Fusioo enriched) ──
  // domestic_voucher (Supabase) = array of linked domestic-voucher record IDs.
  // domestic_voucher_ destination (Fusioo) = resolved destination text.
  // Either being present means the booking is domestic.
  const rawVoucher = booking.domestic_voucher;
  if (rawVoucher) {
    const hasRaw = Array.isArray(rawVoucher)
      ? rawVoucher.length > 0
      : String(rawVoucher).trim().length > 0;
    if (hasRaw) return true;
  }
  const voucherDest =
    booking["domestic_voucher_ destination"] ||
    booking["domestic_voucher_destination"];
  if (voucherDest && String(voucherDest).trim().length > 0) return true;

  // ── Layer 3: Philippine destination name check ────────────────────────────
  // Catches cases like "Boracay (via CATICLAN)" where no "domestic" keyword
  // appears in package type fields.
  const destText = [
    booking.destinationName,
    booking.tourName,
    booking.packageName,
    booking.collective_package_name,
    voucherDest,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return PHILIPPINE_DOMESTIC_KEYWORDS.some((kw) => destText.includes(kw));
}

// ── Background orbs ────────────────────────────────────────────────────────────
function BackgroundOrbs({ isDark }) {
  const orbs = [
    { size: 500, x: "10%", y: "15%", delay: 0,  duration: 18 },
    { size: 350, x: "75%", y: "60%", delay: 3,  duration: 22 },
    { size: 280, x: "55%", y: "5%",  delay: 6,  duration: 16 },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size, height: orb.size, left: orb.x, top: orb.y,
            background: isDark
              ? `radial-gradient(circle, rgba(255,153,19,0.07) 0%, transparent 70%)`
              : `radial-gradient(circle, rgba(255,153,19,0.10) 0%, transparent 70%)`,
            filter: "blur(40px)",
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: orb.duration, delay: orb.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// ── Wrong Portal Modal ─────────────────────────────────────────────────────────
function WrongPortalModal({ show }) {
  const [countdown, setCountdown] = useState(REDIRECT_SECONDS);

  useEffect(() => {
    if (!show) return;
    setCountdown(REDIRECT_SECONDS);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          window.location.href = DOMESTIC_PORTAL_URL;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [show]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(0,0,0,0.82)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <motion.div
        className="relative w-full max-w-sm rounded-3xl p-8 text-center"
        style={{
          backgroundColor: "#1A1A1A",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,153,19,0.15)",
        }}
        initial={{ opacity: 0, scale: 0.88, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Icon */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
          style={{
            backgroundColor: "rgba(255,153,19,0.12)",
            border: "1.5px solid rgba(255,153,19,0.3)",
          }}
        >
          <AlertTriangle size={30} style={{ color: ORANGE }} />
        </div>

        {/* Title */}
        <h2
          className="font-condensed font-black text-2xl mb-2"
          style={{ color: "#FFFFFF" }}
        >
          Wrong Portal Detected
        </h2>

        {/* Description */}
        <p
          className="font-body text-sm leading-relaxed mb-6"
          style={{ color: "#A0A0A0" }}
        >
          Your booking is for a{" "}
          <span style={{ color: ORANGE, fontWeight: 700 }}>Domestic Package</span>.
          {" "}Please use the Domestic Travel Portal to access your trip details.
        </p>

        {/* Countdown badge */}
        <div
          className="rounded-2xl px-5 py-3 mb-4"
          style={{
            backgroundColor: "rgba(255,153,19,0.08)",
            border: "1px solid rgba(255,153,19,0.2)",
          }}
        >
          <p className="font-body text-sm font-semibold" style={{ color: ORANGE }}>
            Redirecting in {countdown} second{countdown !== 1 ? "s" : ""}…
          </p>
        </div>

        {/* Progress bar */}
        <div
          className="w-full rounded-full overflow-hidden mb-5"
          style={{ height: 4, backgroundColor: "rgba(255,255,255,0.08)" }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: ORANGE }}
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: REDIRECT_SECONDS, ease: "linear" }}
          />
        </div>

        {/* Manual redirect */}
        <motion.a
          href={DOMESTIC_PORTAL_URL}
          className="inline-flex items-center justify-center gap-2 w-full font-body font-bold text-sm py-4 rounded-2xl"
          style={{ backgroundColor: ORANGE, color: "#000000", textDecoration: "none" }}
          whileHover={{ scale: 1.02, boxShadow: "0 0 24px rgba(255,153,19,0.45)" }}
          whileTap={{ scale: 0.97 }}
        >
          <ExternalLink size={16} />
          Go to Domestic Portal Now
        </motion.a>
      </motion.div>
    </div>
  );
}

// ── Status indicator ───────────────────────────────────────────────────────────
function StatusMessage({ status, gdxInput, isDark }) {
  const configs = {
    [STATUS.SEARCHING]: {
      icon:   <Loader className="w-5 h-5 animate-spin" style={{ color: ORANGE }} />,
      text:   "Searching for your booking…",
      color:  ORANGE,
      bg:     isDark ? "rgba(255,153,19,0.08)" : "rgba(255,153,19,0.07)",
      border: "rgba(255,153,19,0.3)",
    },
    [STATUS.FOUND]: {
      icon:   <Loader className="w-5 h-5 animate-spin" style={{ color: ORANGE }} />,
      text:   "Booking found! Loading your trip details…",
      color:  ORANGE,
      bg:     isDark ? "rgba(255,153,19,0.08)" : "rgba(255,153,19,0.07)",
      border: "rgba(255,153,19,0.3)",
    },
    [STATUS.CACHED]: {
      icon:   <CheckCircle className="w-5 h-5" style={{ color: "#22C55E" }} />,
      text:   "Booking loaded instantly! Click View My Trip below.",
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
      icon:   <Clock className="w-5 h-5" style={{ color: ORANGE }} />,
      text:   "We're still creating your booking in our system! Recent bookings can take a little while to appear — please double-check your GDX number, or try again in a few minutes.",
      color:  ORANGE,
      bg:     isDark ? "rgba(255,153,19,0.08)" : "rgba(255,153,19,0.07)",
      border: "rgba(255,153,19,0.3)",
    },
    [STATUS.FORMAT_ERROR]: {
      icon:   <XCircle className="w-5 h-5" style={{ color: "#EF4444" }} />,
      text:   "Last name should contain letters. Did you accidentally swap the two fields?",
      color:  "#EF4444",
      bg:     isDark ? "rgba(239,68,68,0.08)" : "#FFF5F5",
      border: isDark ? "rgba(127,29,29,0.6)" : "#FECACA",
    },
    [STATUS.LAST_NAME_MISMATCH]: {
      icon:   <XCircle className="w-5 h-5" style={{ color: "#EF4444" }} />,
      text:   "Booking not found. Please check your GDX number and Last Name, then try again.",
      color:  "#EF4444",
      bg:     isDark ? "rgba(239,68,68,0.08)" : "#FFF5F5",
      border: isDark ? "rgba(127,29,29,0.6)" : "#FECACA",
    },
    [STATUS.WRONG_PORTAL]: {
      icon:   <AlertTriangle className="w-5 h-5" style={{ color: ORANGE }} />,
      text:   "Wrong Portal Detected — redirecting to Domestic Travel Portal…",
      color:  ORANGE,
      bg:     isDark ? "rgba(255,153,19,0.08)" : "rgba(255,153,19,0.07)",
      border: "rgba(255,153,19,0.3)",
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

// ── Main component ─────────────────────────────────────────────────────────────
export default function GdxSearchSection() {
  const { isDark } = useTheme();
  const navigate   = useNavigate();
  const location   = useLocation();

  const [voucher,       setVoucher]       = useState(null);

  const [gdxInput,      setGdxInput]      = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get("gdx") ?? "";
  });
  const [lastNameInput, setLastNameInput] = useState("");
  const [status,        setStatus]        = useState(STATUS.IDLE);
  const [booking,       setBooking]       = useState(null);
  const [showWrongPortal, setShowWrongPortal] = useState(false);

  const bg         = isDark ? "#080808" : "#F0F0F0";
  const cardBg     = isDark ? "rgba(26,26,26,0.85)" : "rgba(255,255,255,0.85)";
  const cardBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const inputBg    = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)";
  const textPrimary   = isDark ? "#FFFFFF" : "#111111";
  const textSecondary = isDark ? "#A0A0A0" : "#555555";

  const isLoading = status === STATUS.SEARCHING || status === STATUS.FOUND;
  const isReady   = status === STATUS.READY || status === STATUS.CACHED;
  const canSearch = !isLoading && gdxInput.trim().length > 0 && lastNameInput.trim().length > 0;

  const gdxBorder      = gdxInput
    ? ORANGE : isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)";
  const lastNameBorder = lastNameInput
    ? ORANGE : isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)";

  useEffect(() => {
    if (!booking?.gdx) { setVoucher(null); return; }
    getVoucher(booking.gdx).then(setVoucher).catch(() => setVoucher(null));
  }, [booking]);

  const resetStatus = () => {
    if (status !== STATUS.IDLE) { setStatus(STATUS.IDLE); setBooking(null); }
  };

  const handleSearch = async () => {
    const query    = gdxInput.trim();
    const lastName = lastNameInput.trim();
    if (!query || !lastName) return;

    if (!GDX_PATTERN.test(query)) {
      setStatus(STATUS.NOT_FOUND);
      return;
    }
    if (!/[a-zA-Z]/.test(lastName)) {
      setStatus(STATUS.FORMAT_ERROR);
      return;
    }

    setStatus(STATUS.SEARCHING);
    setBooking(null);

    try {
      // ── 1. Cache check ────────────────────────────────────────────────────
      const cached = await getCachedGdx(query);
      if (cached) {
        if (!isLastNameMatch(cached.booking, lastName)) {
          setStatus(STATUS.LAST_NAME_MISMATCH);
          return;
        }
        // Re-validate on every cache hit: must still resolve to a known
        // international slug. Catches bookings cached before detection was in
        // place and any destination not in the international KEYWORD_MAP.
        const cachedSlug = resolveDestinationSlug(cached.booking);
        if (isDomesticBooking(cached.booking)) {
          setShowWrongPortal(true);
          setStatus(STATUS.WRONG_PORTAL);
          return;
        }
        if (!cachedSlug || !READY_SLUGS.has(cachedSlug)) {
          navigate("/briefing-pending", { state: { booking: cached.booking, gdx: query } });
          return;
        }
        setBooking(cached.booking);
        setStatus(STATUS.CACHED);
        return;
      }

      // ── 2. Supabase lookup ────────────────────────────────────────────────
      console.log("[GDX] Cache miss — querying Supabase:", query);
      const { data, error: supaError } = await supabase
        .from("fusioo_booking_transactions")
        .select("*")
        .eq("data->>gdx", query)
        .order("synced_at", { ascending: false })
        .limit(1);

      // Fusioo "select" fields (type_of_package, transaction_type, etc.) sync as
      // arrays — flatten them to strings so keyword-matching (isDomesticBooking,
      // resolveDestinationSlug) keeps working unchanged.
      const arrToStr = (v) => {
        if (!Array.isArray(v)) return v;
        return v
          .map((x) => (typeof x === "string" ? x : x?.value ?? null))
          .filter(Boolean)
          .join(" ");
      };

      let rawBooking;

      if (supaError || !data || data.length === 0) {
        // ── 3. Legacy table fallback — historical bookings ────────────────────
        // bookings_6fbdd6b2 is the Base44-synced table with ALL historical bookings,
        // including those created before the fusioo-webhook was configured.
        console.log("[GDX] Not in fusioo_booking_transactions — checking legacy table:", query);
        const { data: legacyRows, error: legacyError } = await supabase
          .from("bookings_6fbdd6b2")
          .select("*")
          .eq("gdx", query)
          .limit(1);

        if (legacyError || !legacyRows || legacyRows.length === 0) {
          setStatus(STATUS.NOT_FOUND);
          return;
        }

        const legRow    = legacyRows[0];
        const dataJson  = (legRow.data && typeof legRow.data === "object") ? legRow.data : {};
        rawBooking = {
          ...dataJson,
          ...legRow,
          record_id:               dataJson.id || null,
          gdx:                     query,
          lead_name:               legRow.lead_name     || dataJson.lead_name,
          type_of_package:         arrToStr(legRow.type_of_package         || dataJson.type_of_package),
          transaction_type:        arrToStr(legRow.transaction_type        || dataJson.transaction_type),
          collective_package_name: arrToStr(legRow.collective_package_name || dataJson.collective_package_name),
        };
      } else {
        const row = data[0].data;
        rawBooking = {
          ...row,
          record_id:               row.id,
          type_of_package:         arrToStr(row.type_of_package),
          transaction_type:        arrToStr(row.transaction_type),
          collective_package_name: arrToStr(row.collective_package_name),
        };
      }

      // ── 3. Last name validation (against raw Supabase row) ────────────────
      if (!isLastNameMatch(rawBooking, lastName)) {
        setStatus(STATUS.LAST_NAME_MISMATCH);
        return;
      }

      // ── 4. Early domestic check on raw row (avoids Fusioo call entirely) ─
      // If the Supabase row already carries a package type field, we redirect
      // immediately without ever fetching Fusioo data for domestic bookings.
      if (isDomesticBooking(rawBooking)) {
        setShowWrongPortal(true);
        setStatus(STATUS.WRONG_PORTAL);
        return;
      }

      setStatus(STATUS.FOUND);

      // ── 5. Fusioo enrichment (international bookings only reach this point) ─
      const fullBooking = await getFullBookingFromFusioo(rawBooking);
      console.log("[GDX] Full booking loaded:", {
        gdx:                     fullBooking?.gdx,
        destinationName:         fullBooking?.destinationName,
        packageName:             fullBooking?.packageName,
        type_of_package:         fullBooking?.type_of_package,
        transaction_type:        fullBooking?.transaction_type,
        collective_package_name: fullBooking?.collective_package_name,
        domestic_voucher_dest:   fullBooking?.["domestic_voucher_ destination"],
        tourName:                fullBooking?.tourName,
      });

      // ── 6. Authorize: booking MUST resolve to a known international slug ─────
      // resolveDestinationSlug returns a non-null value ONLY for destinations
      // in the KEYWORD_MAP (the authoritative international list). Anything that
      // doesn't match — Philippine domestic packages, unknown destinations, or
      // bookings where Fusioo returned no destination text — gets redirected.
      // isDomesticBooking is a fast-exit for obvious Philippine keyword matches;
      // the slug check is the hard gate that catches everything else.
      if (isDomesticBooking(fullBooking)) {
        setShowWrongPortal(true);
        setStatus(STATUS.WRONG_PORTAL);
        return;
      }
      const resolvedSlug = resolveDestinationSlug(fullBooking);
      if (!resolvedSlug || !READY_SLUGS.has(resolvedSlug)) {
        // Destination not yet recognized or briefing not ready.
        navigate("/briefing-pending", { state: { booking: fullBooking, gdx: query } });
        return;
      }

      // ── 7. International confirmed — cache and navigate ───────────────────
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
      {/* Wrong Portal Modal — renders on top of everything */}
      <WrongPortalModal show={showWrongPortal} />

      {/* Animated background orbs */}
      <BackgroundOrbs isDark={isDark} />

      {/* Content column */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <div className="w-full max-w-lg flex flex-col items-center">

          {/* Logo */}
          <motion.img
            src={LOGO_URL}
            alt="Gladex Tours"
            className="h-16 w-auto object-contain mb-10"
            style={{ filter: isDark ? "drop-shadow(0 0 20px rgba(255,153,19,0.4))" : "none" }}
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
            Enter your GDX Confirmation Number and Lead Passenger Last Name to access
            your personalized travel briefing, vouchers, reminders, and add-ons.
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
            {/* GDX Number input */}
            <div className="mb-4">
              <label
                className="block font-body text-xs font-bold tracking-[0.2em] uppercase mb-2"
                style={{ color: ORANGE }}
              >
                GDX Number
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={gdxInput}
                onChange={(e) => {
                  setGdxInput(e.target.value.replace(/[^0-9]/g, ""));
                  resetStatus();
                }}
                onKeyDown={(e) => e.key === "Enter" && canSearch && handleSearch()}
                placeholder="e.g. 12345678"
                maxLength={20}
                disabled={isLoading}
                aria-label="GDX booking number"
                className="w-full font-body font-semibold text-base px-5 py-4 rounded-2xl border focus:outline-none transition-all duration-200 disabled:opacity-50"
                style={{
                  backgroundColor: inputBg,
                  borderColor: gdxBorder,
                  color: textPrimary,
                  boxShadow: gdxInput ? `0 0 0 3px rgba(255,153,19,0.12)` : "none",
                }}
              />
              <p className="font-body text-xs mt-1.5 pl-1" style={{ color: textSecondary }}>
                Enter the number from your booking confirmation
              </p>
            </div>

            {/* Last Name input */}
            <div className="mb-4">
              <label
                className="block font-body text-xs font-bold tracking-[0.2em] uppercase mb-2"
                style={{ color: ORANGE }}
              >
                Last Name
              </label>
              <input
                type="text"
                value={lastNameInput}
                onChange={(e) => {
                  setLastNameInput(e.target.value);
                  resetStatus();
                }}
                onKeyDown={(e) => e.key === "Enter" && canSearch && handleSearch()}
                placeholder="Lead passenger last name"
                maxLength={60}
                disabled={isLoading}
                aria-label="Lead passenger last name"
                className="w-full font-body font-semibold text-base px-5 py-4 rounded-2xl border focus:outline-none transition-all duration-200 disabled:opacity-50"
                style={{
                  backgroundColor: inputBg,
                  borderColor: lastNameBorder,
                  color: textPrimary,
                  boxShadow: lastNameInput ? `0 0 0 3px rgba(255,153,19,0.12)` : "none",
                }}
              />
            </div>

            {/* Find My Trip button */}
            <motion.button
              onClick={handleSearch}
              disabled={!canSearch}
              aria-label="Find my booking"
              className="inline-flex items-center justify-center gap-2 font-body font-bold text-sm px-7 py-4 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full"
              style={{ backgroundColor: ORANGE, color: "#080808" }}
              whileHover={{ scale: 1.03, boxShadow: "0 0 24px rgba(255,153,19,0.45)" }}
              whileTap={{ scale: 0.97 }}
            >
              {isLoading ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              {isLoading ? "Loading…" : "Find My Trip"}
            </motion.button>

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

          {/* NOT_FOUND: assurance that briefing is being prepared */}
          <AnimatePresence>
            {status === STATUS.NOT_FOUND && (
              <motion.div
                className="w-full mt-4 rounded-2xl px-5 py-4"
                style={{
                  backgroundColor: isDark ? "rgba(255,153,19,0.07)" : "rgba(255,153,19,0.06)",
                  border: "1px solid rgba(255,153,19,0.25)",
                }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <p className="font-body text-sm leading-relaxed" style={{ color: textSecondary }}>
                  🎬{" "}
                  <span style={{ color: textPrimary, fontWeight: 600 }}>
                    Your travel briefing is being prepared!
                  </span>{" "}
                  If you recently completed your booking, your details may still be loading. Please try again shortly or reach out to your travel coordinator for assistance.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* View My Trip button — shows on READY or CACHED */}
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
                whileHover={{ scale: 1.02, boxShadow: "0 0 28px rgba(255,153,19,0.50)" }}
                whileTap={{ scale: 0.97 }}
              >
                <MapPin className="w-5 h-5" />
                View My Trip
              </motion.button>
            )}
          </AnimatePresence>

          {/* Voucher download — shows when admin has uploaded a voucher for this GDX */}
          <AnimatePresence>
            {isReady && voucher && (
              <motion.a
                href={voucher.voucher_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-3 inline-flex items-center justify-center gap-2 font-body font-bold text-sm py-3.5 rounded-2xl"
                style={{
                  backgroundColor: "transparent",
                  border: `1.5px solid ${ORANGE}`,
                  color: ORANGE,
                  textDecoration: "none",
                }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, delay: 0.08 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <Download className="w-4 h-4" />
                Download My Voucher
              </motion.a>
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
            Both fields are required. Your GDX number was provided in your booking confirmation from Gladex Tours.
          </motion.p>
        </div>
      </div>

      {/* Footer */}
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
