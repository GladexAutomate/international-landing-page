// @ts-nocheck
import { useParams, useNavigate, useLocation, Navigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play, MapPin, Check, X, AlertTriangle, ExternalLink, Phone, Globe, Wifi, CreditCard, Plus, Trash2, Download, FileText, User, CalendarDays, Hotel, Plane, Users, Tag, BadgeCheck, Mail, DollarSign, Briefcase, UserCheck, Car, MoreHorizontal, ChevronLeft, ChevronRight, Maximize2, Volume2, VolumeX } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { getDestinationBySlug } from "../data/destinations";
import { getBriefingBySlug } from "../data/briefings/index.js";
import { DANANG_PACKAGES, getDanangPackageByBooking } from "../data/briefings/danang-packages.js";
import { HONGKONG_PACKAGES, getHongkongPackageByBooking } from "../data/briefings/hongkong-packages.js";
import { BEIJING_PACKAGES, getBeijingPackageByBooking } from "../data/briefings/beijing-packages.js";
import { ThemeProvider, useTheme } from "../lib/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";
import ScrollControls from "../components/ScrollControls";
import { resolveVoucher, resolveItinerary, resolveFirstId } from "../services/fusiooDocumentService";
import { getVoucher } from "../services/voucherService";
import { generateVoucherPDF } from "../utils/generateVoucherPDF";
import {
  getInsurancePlans,
  createCart,
  createCartTourItem,
  createCartInsuranceItem,
  calculateCartTotal,
  createOrder,
  PAYMENT_METHODS,
} from "../data/addons/index.js";
import { getToursForDestination } from "../services/toursService";
import { getToursByDestination } from "../data/addons/mockTours";
import TourBookingModal from "../components/TourBookingModal";
import DemoPaymentModal from "../components/DemoPaymentModal";
import OrderSuccessScreen from "../components/OrderSuccessScreen";

// Briefing-specific components
import BriefingSection from "../components/briefing/BriefingSection";
import ImmigrationAdvisory from "../components/briefing/ImmigrationAdvisory";
import TravelChecklist from "../components/briefing/TravelChecklist";
import DosAndDonts from "../components/briefing/DosAndDonts";
import BriefingFAQ from "../components/briefing/BriefingFAQ";
import NeedAssistance from "../components/briefing/NeedAssistance";
import WhatToBringCarousel from "../components/WhatToBringCarousel";
import OutfitGuide from "../components/OutfitGuide";
import BriefingTestimonials from "../components/BriefingTestimonials";
import RateMyService from "../components/RateMyService";
import ReferralSection from "../components/ReferralSection";
import { getDestinationImage } from "../utils/destinationImages";
import { getMediaForSlug } from "../data/mediaConfig";
import { READY_SLUGS } from "../config/readySlugs";

// ─── PAGE-LEVEL ERROR BOUNDARY ────────────────────────────────────────────────
// Catches any uncaught render error and shows a recoverable fallback instead
// of a blank/black screen.
class PageErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(err, info) { console.error("[PageErrorBoundary]", err, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#111", padding: "2rem", textAlign: "center" }}>
          <p style={{ color: "#FF9913", fontWeight: 700, fontSize: "1.25rem", marginBottom: "0.5rem" }}>Something went wrong loading this page.</p>
          <p style={{ color: "#888", fontSize: "0.875rem", marginBottom: "1.5rem" }}>Please refresh the page or go back and try again.</p>
          <button onClick={() => window.location.reload()} style={{ backgroundColor: "#FF9913", color: "#000", padding: "0.75rem 1.5rem", borderRadius: "0.75rem", fontWeight: 700, border: "none", cursor: "pointer", fontSize: "0.9rem" }}>
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ─── SECTION-LEVEL ERROR BOUNDARY ────────────────────────────────────────────
// Wraps individual briefing sections — if one section fails, it renders nothing
// for that section and the rest of the page continues to load.
class SectionErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(err, info) { console.error("[SectionErrorBoundary] Section failed to render:", err, info?.componentStack); }
  render() {
    if (this.state.hasError) return null;
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.04, margin: "0px 0px -40px 0px" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {this.props.children}
      </motion.div>
    );
  }
}

const LOGO_URL = "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/5ecc9b2cd_Untitled-design-75.png";
const ORANGE = "#FF9913";
const CARD_BG = "#FFECD8";

// ─── TRAVEL CARD BACKGROUND DECORATION ──────────────────────────────────────
function TravelCardBg({ variant = "city" }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" style={{ zIndex: 0 }}>

      {/* Airplane + dashed loop — top left */}
      <svg style={{ position:"absolute", top:14, left:18, width:150, height:130 }} viewBox="0 0 150 130">
        <path d="M105 28 Q78 90 44 76 Q10 62 22 34 Q34 6 76 12 Q110 16 105 28"
          stroke={ORANGE} strokeWidth="1.5" strokeDasharray="5 4" fill="none" opacity="0.45"/>
        <g transform="translate(90,5) rotate(-12)" fill={ORANGE}>
          <path d="M22 6 L33 15 L46 13 L44 20 L33 21 L30 36 L27 36 L29 21 L17 24 L15 30 L12 30 L14 20 L5 17 L5 14 L15 17 Z"/>
          <rect x="13" y="37" width="11" height="3" rx="0.5"/>
        </g>
      </svg>

      {/* Cloud 1 */}
      <svg style={{ position:"absolute", top:22, right:"16%", width:120, height:60 }} viewBox="0 0 120 60">
        <g fill={ORANGE} opacity="0.12">
          <circle cx="24" cy="36" r="20"/>
          <circle cx="48" cy="26" r="24"/>
          <circle cx="75" cy="33" r="18"/>
          <rect x="10" y="33" width="82" height="22"/>
        </g>
      </svg>

      {/* Cloud 2 — smaller */}
      <svg style={{ position:"absolute", top:62, right:"34%", width:80, height:40 }} viewBox="0 0 80 40">
        <g fill={ORANGE} opacity="0.09">
          <circle cx="16" cy="28" r="14"/>
          <circle cx="34" cy="20" r="18"/>
          <circle cx="54" cy="26" r="13"/>
          <rect x="7" y="25" width="60" height="14"/>
        </g>
      </svg>

      {/* Bottom wave */}
      <svg style={{ position:"absolute", bottom:0, left:0, width:"100%", height:90 }} viewBox="0 0 1440 90" preserveAspectRatio="none">
        <path d="M0,50 C240,8 480,85 720,50 C960,15 1200,72 1440,50 L1440,90 L0,90 Z" fill={ORANGE} fillOpacity="0.1"/>
        <path d="M0,62 C360,28 720,90 1080,58 C1260,42 1380,68 1440,62 L1440,90 L0,90 Z" fill={ORANGE} fillOpacity="0.07"/>
      </svg>

      {/* City skyline + Ferris wheel — bottom left */}
      {variant === "city" && (
        <svg style={{ position:"absolute", bottom:0, left:0, width:260, height:190 }} viewBox="0 0 260 190">
          <g fill={ORANGE} opacity="0.18">
            <rect x="4" y="95" width="11" height="95"/>
            <rect x="17" y="72" width="17" height="118"/>
            <rect x="36" y="84" width="11" height="106"/>
            <rect x="49" y="55" width="24" height="135"/>
            <rect x="75" y="72" width="13" height="118"/>
            <rect x="90" y="80" width="9" height="110"/>
            <rect x="101" y="63" width="15" height="127"/>
            {/* Ferris wheel */}
            <circle cx="188" cy="112" r="58" fill="none" stroke={ORANGE} strokeWidth="3"/>
            <circle cx="188" cy="112" r="9"/>
            <line x1="188" y1="54" x2="188" y2="170" stroke={ORANGE} strokeWidth="2"/>
            <line x1="130" y1="112" x2="246" y2="112" stroke={ORANGE} strokeWidth="2"/>
            <line x1="147" y1="71" x2="229" y2="153" stroke={ORANGE} strokeWidth="2"/>
            <line x1="147" y1="153" x2="229" y2="71" stroke={ORANGE} strokeWidth="2"/>
            <rect x="181" y="48" width="14" height="10" rx="2"/>
            <rect x="181" y="164" width="14" height="10" rx="2"/>
            <rect x="124" y="107" width="14" height="10" rx="2"/>
            <rect x="238" y="107" width="14" height="10" rx="2"/>
            <line x1="168" y1="170" x2="158" y2="190" stroke={ORANGE} strokeWidth="3"/>
            <line x1="208" y1="170" x2="218" y2="190" stroke={ORANGE} strokeWidth="3"/>
          </g>
          <path d="M0,182 Q65,170 130,182 Q195,194 260,182 L260,190 L0,190 Z" fill={ORANGE} fillOpacity="0.28"/>
        </svg>
      )}

      {/* Luggage + Passport — bottom right */}
      {variant === "luggage" && (
        <svg style={{ position:"absolute", bottom:0, right:0, width:240, height:200 }} viewBox="0 0 240 200">
          <g opacity="0.22">
            {/* Suitcase */}
            <rect x="105" y="78" width="92" height="110" rx="9" fill={ORANGE}/>
            <rect x="128" y="64" width="46" height="17" rx="5" fill="#e07800"/>
            <rect x="140" y="55" width="22" height="11" rx="3" fill="#e07800"/>
            <rect x="105" y="120" width="92" height="5" fill="rgba(255,255,255,0.3)"/>
            <rect x="132" y="88" width="30" height="24" rx="3" fill="rgba(255,255,255,0.22)"/>
            <circle cx="118" cy="192" r="8" fill="#b86a00"/>
            <circle cx="185" cy="192" r="8" fill="#b86a00"/>
            {/* Passport */}
            <rect x="28" y="122" width="68" height="86" rx="5" fill="#1B3D7A"/>
            <rect x="35" y="129" width="54" height="72" rx="3" fill="#2255aa"/>
            <circle cx="62" cy="156" r="13" fill="none" stroke="#E8C846" strokeWidth="1.5"/>
            <circle cx="62" cy="156" r="7" fill="none" stroke="#E8C846" strokeWidth="1"/>
            <rect x="40" y="174" width="44" height="3" rx="1.5" fill="rgba(255,255,255,0.4)"/>
            <rect x="40" y="181" width="32" height="3" rx="1.5" fill="rgba(255,255,255,0.25)"/>
            {/* Coins */}
            <ellipse cx="18" cy="186" rx="15" ry="5" fill="#DAA520"/>
            <rect x="3" y="175" width="30" height="11" fill="#DAA520"/>
            <ellipse cx="18" cy="175" rx="15" ry="5" fill="#FFC200"/>
            <ellipse cx="18" cy="164" rx="15" ry="5" fill="#FFD700"/>
          </g>
          <path d="M0,190 Q120,178 240,190 L240,200 L0,200 Z" fill={ORANGE} fillOpacity="0.28"/>
        </svg>
      )}

    </div>
  );
}

// Converts any supported video URL to an embeddable iframe src.
// enablejsapi=1  → allows postMessage play/pause control
// controls=0     → hides ALL YouTube UI (logo, progress bar, Watch on YouTube)
// disablekb=1    → disables keyboard shortcuts on the player
const YT_PARAMS = "enablejsapi=1&controls=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&cc_load_policy=0&disablekb=1";
function toVideoEmbedUrl(url) {
  if (!url) return "";
  const short = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (short) return `https://www.youtube.com/embed/${short[1]}?${YT_PARAMS}`;
  const watch = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
  if (watch) return `https://www.youtube.com/embed/${watch[1]}?${YT_PARAMS}`;
  return url;
}

// ─── BRIEFING VIDEO PLAYER ───────────────────────────────────────────────────
// Normal mode: portrait player in the page.
// Full-view mode: React fixed overlay — guaranteed centered, black background.
function BriefingVideo({ videoUrl, name }) {
  const iframeRef   = useRef(null);  // normal player
  const fsIframeRef = useRef(null);  // fullscreen overlay player
  const [playing,   setPlaying]   = useState(false);
  const [fsPlaying, setFsPlaying] = useState(true);  // FS autoplays
  const [isFS,      setIsFS]      = useState(false);
  const [muted,     setMuted]     = useState(false);
  const [fsMuted,   setFsMuted]   = useState(false);

  // Reset normal play button when video ends
  useEffect(() => {
    function onMsg(e) {
      try {
        const d = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        if (d.event === "onStateChange" && d.info === 0) {
          setPlaying(false);
          setFsPlaying(false);
        }
      } catch {}
    }
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  // Close FS on Escape key + lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isFS ? "hidden" : "";
    function onKey(e) { if (e.key === "Escape") closeFS(); }
    if (isFS) window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isFS]);

  function togglePlay() {
    const next = !playing;
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: next ? "playVideo" : "pauseVideo", args: [] }), "*"
    );
    setPlaying(next);
  }

  function toggleFsPlay(e) {
    e.stopPropagation();
    const next = !fsPlaying;
    fsIframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: next ? "playVideo" : "pauseVideo", args: [] }), "*"
    );
    setFsPlaying(next);
  }

  function toggleMute(e) {
    e.stopPropagation();
    const next = !muted;
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: next ? "mute" : "unMute", args: [] }), "*"
    );
    setMuted(next);
  }

  function toggleFsMute(e) {
    e.stopPropagation();
    const next = !fsMuted;
    fsIframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: next ? "mute" : "unMute", args: [] }), "*"
    );
    setFsMuted(next);
  }

  function openFS() {
    // Pause the normal player before opening overlay
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: "pauseVideo", args: [] }), "*"
    );
    setPlaying(false);
    setFsPlaying(true);
    setIsFS(true);
  }

  function closeFS() {
    setIsFS(false);
    setFsPlaying(true);  // reset for next open
  }

  // Full-view embed autoplays with audio (user just tapped — browser allows it)
  const fsEmbedUrl = toVideoEmbedUrl(videoUrl)
    ? toVideoEmbedUrl(videoUrl) + "&autoplay=1"
    : "";

  const playBtnStyle = {
    backgroundColor: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    border: "2px solid rgba(255,255,255,0.3)",
  };

  return (
    <>
      {/* ── Normal portrait player ──────────────────────────────────────── */}
      <div
        className="relative rounded-3xl overflow-hidden shadow-2xl w-full"
        style={{ maxWidth: 460, border: "1px solid rgba(0,0,0,0.12)" }}
      >
        {/* 9:16 portrait */}
        <div className="relative w-full" style={{ paddingBottom: "177.78%" }}>
          <iframe
            ref={iframeRef}
            src={toVideoEmbedUrl(videoUrl)}
            title={`${name} Travel Briefing Video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            style={{ border: "none", backgroundColor: "#000" }}
          />
          <div className="absolute inset-0 z-10 cursor-pointer" onClick={togglePlay} />
          {!playing && (
            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
              <div className="w-24 h-24 rounded-full flex items-center justify-center shadow-2xl" style={playBtnStyle}>
                <Play className="w-10 h-10 text-white ml-1" />
              </div>
            </div>
          )}
        </div>

        {/* Travel Briefing badge */}
        <div className="absolute top-3 left-3 pointer-events-none z-30">
          <div className="px-3 py-1.5 rounded-full text-[10px] font-bold tracking-[0.25em] uppercase backdrop-blur-md border"
            style={{ background: "rgba(0,0,0,0.55)", borderColor: "rgba(255,255,255,0.18)", color: "#fff" }}>
            Travel Briefing
          </div>
        </div>

        {/* Mute/unmute button — bottom-left */}
        <button
          onClick={toggleMute}
          className="absolute bottom-3 left-3 z-40 w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", border: "1.5px solid rgba(255,255,255,0.28)", color: "#fff" }}
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Full-view open button — bottom-right */}
        <button
          onClick={openFS}
          className="absolute bottom-3 right-3 z-40 w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", border: "1.5px solid rgba(255,255,255,0.28)", color: "#fff" }}
          aria-label="Full view"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* ── Full-view overlay — rendered into document.body via portal so it ──
           escapes every stacking context (framer-motion, sticky header, etc.) */}
      {isFS && createPortal(
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{ backgroundColor: "#000", zIndex: 999999 }}
        >
          {/* Portrait video box — 9:16, centered horizontally on any screen */}
          <div
            className="relative"
            style={{ height: "100vh", width: "calc(100vh * 9 / 16)", maxWidth: "100vw" }}
          >
            <iframe
              ref={fsIframeRef}
              src={fsEmbedUrl}
              title={`${name} Travel Briefing Video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              style={{ border: "none", backgroundColor: "#000" }}
            />
            {/* Overlay — blocks YouTube clicks; toggles play/pause */}
            <div className="absolute inset-0 cursor-pointer" style={{ zIndex: 10 }} onClick={toggleFsPlay} />
            {/* Play button when FS video is paused */}
            {!fsPlaying && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 20 }}>
                <div className="w-28 h-28 rounded-full flex items-center justify-center shadow-2xl" style={playBtnStyle}>
                  <Play className="w-12 h-12 text-white ml-1" />
                </div>
              </div>
            )}

            {/* Mute/unmute button — bottom-left of the video, always on top */}
            <button
              onClick={toggleFsMute}
              className="absolute flex items-center justify-center transition-all hover:scale-110 active:scale-95"
              style={{
                bottom: 20,
                left: 16,
                zIndex: 30,
                backgroundColor: "rgba(0,0,0,0.72)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "2px solid rgba(255,255,255,0.4)",
                borderRadius: 12,
                color: "#fff",
                width: 44,
                height: 44,
              }}
              aria-label={fsMuted ? "Unmute" : "Mute"}
            >
              {fsMuted ? <VolumeX style={{ width: 20, height: 20 }} /> : <Volume2 style={{ width: 20, height: 20 }} />}
            </button>

            {/* Close / Exit Full View button — top-right of the video, always on top */}
            <button
              onClick={closeFS}
              className="absolute flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
              style={{
                top: 16,
                right: 16,
                zIndex: 30,
                backgroundColor: "rgba(0,0,0,0.72)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "2px solid rgba(255,255,255,0.4)",
                borderRadius: 999,
                color: "#fff",
                padding: "10px 18px 10px 14px",
                fontSize: 13,
                fontWeight: 700,
                fontFamily: "var(--font-condensed)",
                letterSpacing: "0.08em",
              }}
              aria-label="Exit full view"
            >
              <X style={{ width: 16, height: 16 }} />
              EXIT FULL VIEW
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

// ─── SECTION DIVIDER ─────────────────────────────────────────────────────────
function SectionDivider({ theme }) {
  return (
    <div
      className="h-px w-full"
      style={{ backgroundColor: theme.border }}
    />
  );
}

// ─── CONTACT PANEL — important numbers, shown at top of briefing ─────────────
function ContactPanel({ briefing, booking, theme }) {
  const { textPrimary, textSecondary, bgCard, border, isDark } = theme;

  // Gladex hotline from assistanceContacts
  const gladexHotline = (() => {
    const ac = briefing?.assistanceContacts;
    if (!Array.isArray(ac)) return null;
    for (const c of ac) {
      if (c.phone) return c.phone;
      if (c.whatsapp) return c.whatsapp;
      if (c.value) return c.value;
    }
    return null;
  })();

  // Travel consultant from booking
  const consultantName = (() => {
    if (!booking) return null;
    const raw = booking.name_of_agent_1 || booking.name_of_agent || booking.agent_name;
    return raw && typeof raw === "string" ? raw.trim() : null;
  })();

  // Hotel contact from booking or briefing
  const hotelContact = (() => {
    if (booking?.hotelPhone) return String(booking.hotelPhone).trim();
    const hotels = briefing?.hotelInformation?.hotels;
    if (Array.isArray(hotels) && hotels[0]) {
      const h = hotels[0];
      return h.phone || h.contact || null;
    }
    return null;
  })();

  // Transfer & emergency contacts from briefing.emergencyContacts
  const { transferContact, emergencyNumber } = (() => {
    const ec = briefing?.emergencyContacts;
    if (!Array.isArray(ec)) return { transferContact: null, emergencyNumber: null };
    let transfer = null, emergency = null;
    for (const group of ec) {
      for (const c of (group.contacts || [])) {
        const lbl = (c.label || "").toLowerCase();
        if (!transfer && (lbl.includes("transfer") || lbl.includes("driver") || lbl.includes("ground") || lbl.includes("transport"))) {
          transfer = c.value;
        }
        if (!emergency && (lbl.includes("ambulance") || lbl.includes("emergency hotline") || (lbl.includes("police") && !lbl.includes("immigration")))) {
          emergency = c.value;
        }
      }
    }
    return { transferContact: transfer, emergencyNumber: emergency };
  })();

  const contactItems = [
    gladexHotline   ? { Icon: Phone,         label: "Gladex Hotline",   value: gladexHotline }   : null,
    consultantName  ? { Icon: User,           label: "Travel Consultant", value: consultantName }  : null,
    transferContact ? { Icon: Car,            label: "Transfer Provider", value: transferContact } : null,
    hotelContact    ? { Icon: Hotel,          label: "Hotel Contact",     value: hotelContact }    : null,
    emergencyNumber ? { Icon: AlertTriangle,  label: "Emergency",         value: emergencyNumber } : null,
  ].filter(Boolean);

  if (contactItems.length === 0) return null;

  const isPhone = (v) => /^\+?[\d\s\-\(\)]{6,}$/.test(String(v));

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ borderColor: ORANGE + "50", backgroundColor: bgCard }}
    >
      {/* Header */}
      <div
        className="px-5 py-3 border-b"
        style={{ borderColor: border, backgroundColor: isDark ? "#1A0A00" : "#FFF8F0" }}
      >
        <p className="font-condensed font-black text-sm tracking-widest uppercase" style={{ color: ORANGE }}>
          Important Contact Numbers
        </p>
        <p className="font-body text-xs mt-0.5" style={{ color: textSecondary }}>
          Save these before you travel
        </p>
      </div>

      {/* Contact grid — gap-px creates hairline separators */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-px" style={{ backgroundColor: border }}>
        {contactItems.map((c, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-4 py-3.5"
            style={{ backgroundColor: bgCard }}
          >
            <c.Icon className="w-4 h-4 shrink-0" style={{ color: ORANGE }} />
            <div className="min-w-0">
              <p
                className="font-body text-xs font-bold uppercase tracking-widest mb-0.5"
                style={{ color: textSecondary }}
              >
                {c.label}
              </p>
              {isPhone(c.value) ? (
                <a
                  href={`tel:${String(c.value).replace(/\D/g, "")}`}
                  className="font-condensed font-black text-sm hover:opacity-75 block truncate transition-opacity"
                  style={{ color: textPrimary }}
                >
                  {c.value}
                </a>
              ) : (
                <p className="font-condensed font-black text-sm truncate" style={{ color: textPrimary }}>
                  {c.value}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 1. WELCOME SECTION ──────────────────────────────────────────────────────
function WelcomeSection({ briefing, pkg, theme, heroImage }) {
  const { textPrimary, textSecondary } = theme;
  const { welcomeMessage } = briefing;

  const title = (welcomeMessage && typeof welcomeMessage === "object" && welcomeMessage.title)
    ? welcomeMessage.title
    : "Official Travel Briefing";
  const body = (welcomeMessage && typeof welcomeMessage === "object" && Array.isArray(welcomeMessage.body))
    ? welcomeMessage.body
    : typeof welcomeMessage === "string"
      ? [welcomeMessage]
      : [];

  // welcomeImage in briefing data takes priority → then default illustration
  const imgSrc = briefing?.welcomeImage || "/images/welcome-hk.png";

  return (
    <div
      className="rounded-3xl overflow-hidden shadow-sm"
      style={{ backgroundColor: "#FFFBF4", border: "1px solid rgba(255,153,19,0.15)" }}
    >
      <div className="flex flex-col md:flex-row" style={{ minHeight: 300 }}>

        {/* ── Left: text ── */}
        <div className="flex-1 p-8 lg:p-10 flex flex-col justify-center" style={{ minWidth: 0 }}>
          <p className="font-body text-xs font-bold tracking-[0.35em] uppercase mb-3" style={{ color: ORANGE }}>
            Official Briefing
          </p>
          <h2
            className="font-condensed font-black leading-tight mb-3"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: textPrimary }}
          >
            {title}
          </h2>
          {(welcomeMessage?.subtitle || pkg?.name) && (
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span
                className="font-condensed font-bold text-xs px-4 py-1.5 rounded-full tracking-widest uppercase"
                style={{ backgroundColor: ORANGE, color: "#fff" }}
              >
                {welcomeMessage?.subtitle || pkg.name}
              </span>
              {(welcomeMessage?.duration || pkg?.duration) && (
                <span
                  className="font-condensed font-bold text-xs px-4 py-1.5 rounded-full tracking-wider"
                  style={{ backgroundColor: "#F0E8DC", color: textSecondary }}
                >
                  {welcomeMessage?.duration || pkg.duration}
                </span>
              )}
            </div>
          )}
          <div className="space-y-3">
            {body.map((para, i) => (
              <p key={i} className="font-body text-sm leading-relaxed" style={{ color: i === 0 ? textPrimary : textSecondary }}>
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* ── Right: destination illustration ── */}
        <div
          className="hidden md:block shrink-0 relative overflow-hidden"
          style={{ flex: "0 0 48%", backgroundColor: "#FFFBF4" }}
        >
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={title}
              className="absolute inset-0 w-full h-full"
              style={{ objectFit: "contain", objectPosition: "right bottom", padding: "4px 0 0 0" }}
              onError={(e) => { e.currentTarget.parentElement.style.display = "none"; }}
            />
          ) : (
            /* Fallback SVG when no image set */
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: "linear-gradient(160deg, #FFF0D6 0%, #FFE4B3 100%)" }}>
              <svg viewBox="0 0 80 80" className="w-28 h-28 opacity-60" style={{ transform: "rotate(-15deg)" }}>
                <g fill={ORANGE}>
                  <path d="M40 8 L55 28 L72 24 L68 32 L55 34 L48 60 L44 60 L46 34 L28 38 L24 48 L20 48 L22 32 L8 28 L8 24 L26 28 Z"/>
                  <path d="M32 62 L48 62 L46 68 L34 68 Z"/>
                </g>
              </svg>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// ─── 2 & 3. INCLUSIONS + EXCLUSIONS ─────────────────────────────────────────
function InclusionsSection({ pkg, briefing, theme }) {
  if (!pkg) return null;

  const inclusions = briefing?.briefingInclusions || pkg.inclusions || [];
  const exclusions = briefing?.briefingExclusions || pkg.exclusions || [];

  const PlaneWatermark = ({ style }) => (
    <svg viewBox="0 0 80 80" fill="none" style={style} aria-hidden="true">
      <path d="M40 8 L55 28 L72 24 L68 32 L55 34 L48 60 L44 60 L46 34 L28 38 L24 48 L20 48 L22 32 L8 28 L8 24 L26 28 Z" fill={ORANGE}/>
      <path d="M32 62 L48 62 L46 68 L34 68 Z" fill={ORANGE}/>
    </svg>
  );

  return (
    <div
      className="relative rounded-3xl overflow-visible"
      style={{
        background: "linear-gradient(135deg, #FFF8EF 0%, #FFF3E2 100%)",
        boxShadow: "0 8px 40px rgba(255,153,19,0.12)",
      }}
    >
      {/* Airplane watermarks */}
      <PlaneWatermark style={{ position: "absolute", top: 12, left: 12, width: 48, opacity: 0.1, transform: "rotate(-20deg)" }} />
      <PlaneWatermark style={{ position: "absolute", top: 12, right: 12, width: 48, opacity: 0.1, transform: "rotate(160deg)" }} />
      <PlaneWatermark style={{ position: "absolute", bottom: 12, left: "25%", width: 36, opacity: 0.08, transform: "rotate(10deg)" }} />
      <PlaneWatermark style={{ position: "absolute", bottom: 12, right: "25%", width: 36, opacity: 0.08, transform: "rotate(-160deg)" }} />

      {/* Dashed flight path */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.06, borderRadius: "1.5rem", overflow: "hidden" }}>
        <path d="M0 80 Q200 20 600 60" stroke={ORANGE} strokeWidth="2" strokeDasharray="8 5" fill="none"/>
      </svg>

      <div className="grid grid-cols-1 md:grid-cols-2">

        {/* ── LEFT: INCLUSIONS ── */}
        <div
          className="relative border-b md:border-b-0 md:border-r overflow-visible"
          style={{ borderColor: "rgba(255,153,19,0.15)" }}
        >
          {/* Luggage image — bottom-left, blended into card */}
          <div
            className="hidden sm:block absolute pointer-events-none"
            style={{
              bottom: 0, left: 0, width: 130,
              mixBlendMode: "multiply",
            }}
          >
            <img
              src="/images/inclusions-luggage.png"
              alt=""
              className="w-full h-auto object-contain object-bottom"
              onError={(e) => { e.currentTarget.parentElement.style.display = "none"; }}
            />
          </div>

          {/* Content — padded to clear the image */}
          <div className="relative p-6 sm:p-8 sm:pl-40" style={{ zIndex: 1 }}>
            <p className="font-body text-xs font-bold tracking-[0.32em] uppercase mb-1" style={{ color: ORANGE }}>
              What's Covered
            </p>
            <h3 className="font-condensed font-black text-2xl sm:text-3xl mb-4" style={{ color: "#111" }}>
              Package Inclusions
            </h3>
            <ul className="space-y-2.5">
              {inclusions.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: "#22C55E" }}
                  >
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  <span className="font-body text-sm leading-relaxed" style={{ color: "#222" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── RIGHT: EXCLUSIONS ── */}
        <div className="relative overflow-visible">
          {/* Passport image — bottom-right, blended into card */}
          <div
            className="hidden sm:block absolute pointer-events-none"
            style={{
              bottom: 0, right: 0, width: 130,
              mixBlendMode: "multiply",
            }}
          >
            <img
              src="/images/exclusions-passport.png"
              alt=""
              className="w-full h-auto object-contain object-bottom"
              onError={(e) => { e.currentTarget.parentElement.style.display = "none"; }}
            />
          </div>

          {/* Content — padded to clear the image */}
          <div className="relative p-6 sm:p-8 sm:pr-40" style={{ zIndex: 1 }}>
            <p className="font-body text-xs font-bold tracking-[0.32em] uppercase mb-1" style={{ color: "#EF4444" }}>
              Not Covered
            </p>
            <h3 className="font-condensed font-black text-2xl sm:text-3xl mb-4" style={{ color: "#111" }}>
              Package Exclusions
            </h3>
            <ul className="space-y-2.5">
              {exclusions.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: "#EF4444" }}
                  >
                    <X className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  <span className="font-body text-sm leading-relaxed" style={{ color: "#222" }}>{item}</span>
                </li>
              ))}
            </ul>
            {(pkg.fuelSurcharge || pkg.insuranceNote) && (
              <div className="mt-4 pt-4 border-t space-y-1" style={{ borderColor: "rgba(255,153,19,0.2)" }}>
                {pkg.fuelSurcharge && (
                  <p className="font-body text-xs leading-relaxed" style={{ color: "#7A3800" }}>⚠️ {pkg.fuelSurcharge}</p>
                )}
                {pkg.insuranceNote && (
                  <p className="font-body text-xs leading-relaxed" style={{ color: "#7A3800" }}>🛡️ {pkg.insuranceNote}</p>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── 5. TRAVEL INFORMATION CENTER ────────────────────────────────────────────
function TravelInfoCenter({ briefing, theme }) {
  const { bgCard, border, textSecondary } = theme;
  const { travelInformation } = briefing;
  if (!travelInformation) return null;

  // Normalize: support both {beforeDeparture, uponArrival} object and legacy flat-array format
  let beforeItems, afterItems;
  if (Array.isArray(travelInformation)) {
    beforeItems = travelInformation.map((item) =>
      typeof item === "string" ? item
      : (item.label && item.value) ? `${item.label}: ${item.value}`
      : typeof item === "object" ? Object.values(item).filter(Boolean).join(": ")
      : String(item)
    );
    afterItems = [];
  } else {
    beforeItems = travelInformation.beforeDeparture || [];
    afterItems  = travelInformation.uponArrival     || [];
  }
  const duringItems = (!Array.isArray(travelInformation) && travelInformation.duringStay) ? travelInformation.duringStay : [];

  if (!beforeItems.length && !afterItems.length && !duringItems.length) return null;

  const ItemList = ({ items }) => (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 px-4 py-3 rounded-xl border"
          style={{ backgroundColor: "#FFFFFF", borderColor: border }}>
          <span className="font-condensed font-black text-sm shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white"
            style={{ backgroundColor: ORANGE }}>
            {i + 1}
          </span>
          <span className="font-body text-base leading-relaxed" style={{ color: textSecondary }}>{item}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <BriefingSection label="Travel Information Center" title="Before & After Your Flight" theme={theme}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {beforeItems.length > 0 && (
          <div>
            <p className="font-condensed font-bold text-base uppercase tracking-widest mb-3"
              style={{ color: ORANGE }}>
              Before Departure
            </p>
            <ItemList items={beforeItems} />
          </div>
        )}
        {afterItems.length > 0 && (
          <div>
            <p className="font-condensed font-bold text-base uppercase tracking-widest mb-3"
              style={{ color: ORANGE }}>
              Upon Arrival
            </p>
            <ItemList items={afterItems} />
          </div>
        )}
        {duringItems.length > 0 && (
          <div className="sm:col-span-2">
            <p className="font-condensed font-bold text-base uppercase tracking-widest mb-3"
              style={{ color: ORANGE }}>
              During Your Stay
            </p>
            <ItemList items={duringItems} />
          </div>
        )}
      </div>
    </BriefingSection>
  );
}

// ─── 6. ARRIVAL INSTRUCTIONS ─────────────────────────────────────────────────
function ArrivalSection({ briefing, theme }) {
  const { bgCard, bgAlt, border, textPrimary, textSecondary, isDark } = theme;
  const { arrivalInstructions } = briefing;
  if (!arrivalInstructions?.length) return null;

  return (
    <BriefingSection label="Step by Step" title="Arrival Instructions" theme={theme}>
      <div className="space-y-4">
        {arrivalInstructions.map((block, i) => {
          // Normalize: support both {icon, step, details:[]} and legacy {step, text} formats
          const blockTitle = typeof block === "string" ? block
            : (typeof block.step === "string" ? block.step : `Step ${i + 1}`);
          const blockIcon  = (typeof block === "object" && block.icon) ? block.icon : "✈️";
          const details    = Array.isArray(block?.details) ? block.details
            : typeof block?.text === "string" ? [block.text]
            : typeof block === "string" ? []
            : [];

          const stepBg = "#FFFFFF";
          return (
            <div
              key={i}
              className="rounded-2xl border overflow-hidden"
              style={{ borderColor: border, backgroundColor: stepBg }}
            >
              <div
                className="flex items-center gap-3 px-5 py-3.5 border-b"
                style={{ borderColor: border, backgroundColor: stepBg }}
              >
                <span className="text-xl">{blockIcon}</span>
                <h4 className="font-condensed font-bold text-base tracking-wide" style={{ color: textPrimary }}>
                  {blockTitle}
                </h4>
              </div>
              {details.length > 0 && (
                <ul className="px-5 py-4 space-y-2.5">
                  {details.map((detail, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <span
                        className="font-condensed font-black text-xs shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white mt-0.5"
                        style={{ backgroundColor: ORANGE }}
                      >
                        {j + 1}
                      </span>
                      <span className="font-body text-base leading-relaxed" style={{ color: textSecondary }}>
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </BriefingSection>
  );
}

// ─── 7. TRANSFER INSTRUCTIONS ────────────────────────────────────────────────
function TransferSection({ briefing, theme }) {
  const { bgCard, border, textPrimary, textSecondary } = theme;
  const { transferInstructions } = briefing;
  if (!transferInstructions?.length) return null;

  return (
    <BriefingSection label="Getting to Your Hotel" title="Transfer Instructions" theme={theme}>
      <div
        className="rounded-2xl border overflow-hidden"
        style={{ borderColor: border, backgroundColor: bgCard }}
      >
        <ul className="px-5 py-4 space-y-3">
          {transferInstructions.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ORANGE }} />
              <span className="font-body text-base leading-relaxed" style={{ color: textSecondary }}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </BriefingSection>
  );
}

// ─── 8. HOTEL CHECK-IN INFORMATION ───────────────────────────────────────────
function HotelSection({ briefing, theme }) {
  const { bgCard, bgAlt, border, textPrimary, textSecondary, isDark } = theme;
  const { hotelInformation } = briefing;
  if (!hotelInformation) return null;

  return (
    <BriefingSection label="Accommodation" title="Hotel Check-In Information" theme={theme}>
      <div className="space-y-4">
        {/* Check-in / Check-out times */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            className="rounded-2xl border px-5 py-4"
            style={{ borderColor: border, backgroundColor: isDark ? "#0D1A0D" : "#F0FFF4" }}
          >
            <p className="font-body text-xs font-medium uppercase tracking-widest mb-1" style={{ color: "#22C55E" }}>
              Check-In
            </p>
            <p className="font-body text-base leading-relaxed" style={{ color: textPrimary }}>
              {hotelInformation.checkIn}
            </p>
          </div>
          <div
            className="rounded-2xl border px-5 py-4"
            style={{ borderColor: border, backgroundColor: isDark ? "#1C0808" : "#FFF5F5" }}
          >
            <p className="font-body text-xs font-medium uppercase tracking-widest mb-1" style={{ color: "#EF4444" }}>
              Check-Out
            </p>
            <p className="font-body text-base leading-relaxed" style={{ color: textPrimary }}>
              {hotelInformation.checkOut}
            </p>
          </div>
        </div>

        {/* Hotel options */}
        {hotelInformation.hotels?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {hotelInformation.hotels.map((hotel, i) => (
              <div
                key={i}
                className="rounded-xl border px-4 py-3"
                style={{ borderColor: border, backgroundColor: bgCard }}
              >
                <p className="font-body text-xs font-bold uppercase tracking-wide mb-0.5" style={{ color: ORANGE }}>
                  {hotel.category}
                </p>
                <p className="font-body text-sm" style={{ color: textPrimary }}>
                  {hotel.name}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Hotel policies */}
        {hotelInformation.policies?.length > 0 && (
          <div
            className="rounded-2xl border overflow-hidden"
            style={{ borderColor: border, backgroundColor: bgCard }}
          >
            <div
              className="px-5 py-3 border-b"
              style={{ borderColor: border, backgroundColor: isDark ? "#1A1A1A" : "#FAFAFA" }}
            >
              <p className="font-condensed font-bold text-sm tracking-wide" style={{ color: textPrimary }}>
                Hotel Policies
              </p>
            </div>
            <ul className="px-5 py-4 space-y-2.5">
              {hotelInformation.policies.map((policy, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-sm shrink-0 mt-0.5">•</span>
                  <span className="font-body text-base leading-relaxed" style={{ color: textSecondary }}>
                    {policy}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </BriefingSection>
  );
}

// ─── 9. TOUR REMINDERS ───────────────────────────────────────────────────────
function RemindersSection({ briefing, theme }) {
  const { bgCard, border, textSecondary } = theme;
  const { reminders } = briefing;
  if (!reminders?.length) return null;

  return (
    <BriefingSection label="Before Each Tour Day" title="Tour Reminders" theme={theme}>
      <div className="space-y-3">
        {reminders.map((item, i) => {
          const text  = typeof item === "string" ? item : (item.text || "");
          const icon  = typeof item === "object" ? item.icon : null;
          return (
            <div
              key={i}
              className="flex items-start gap-4 px-5 py-4 rounded-2xl border"
              style={{ backgroundColor: "#FFFFFF", borderColor: border }}
            >
              <span
                className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5 text-sm"
                style={icon ? { fontSize: 18 } : { backgroundColor: ORANGE, color: "#fff", fontFamily: "var(--font-condensed)", fontWeight: 900 }}
              >
                {icon || (i + 1)}
              </span>
              <span className="font-body text-base leading-relaxed" style={{ color: textSecondary }}>
                {text}
              </span>
            </div>
          );
        })}
      </div>
    </BriefingSection>
  );
}

// ─── 10b. CONNECTING FLIGHT NOTE ─────────────────────────────────────────────
function ConnectingFlightSection({ briefing, theme }) {
  const { textPrimary, textSecondary, border, isDark } = theme;
  const note = briefing?.connectingFlightNote;
  if (!note) return null;
  return (
    <BriefingSection label="Flight Reminder" title={note.title || "Connecting Flight Reminder"} theme={theme}>
      <div className="space-y-3">
        {[note.arrival, note.departure].filter(Boolean).map((leg, i) => (
          <div key={i} className="rounded-2xl border overflow-hidden" style={{ borderColor: border }}>
            <div
              className="flex items-center gap-3 px-5 py-3"
              style={{ backgroundColor: i === 0 ? ORANGE : isDark ? "#1a1208" : "#FFF3E0" }}
            >
              <span className="text-lg">{i === 0 ? "🛬" : "🛫"}</span>
              <p className="font-condensed font-black text-sm tracking-wide" style={{ color: i === 0 ? "#fff" : ORANGE }}>
                {leg.label}
              </p>
            </div>
            <div className="px-5 py-4" style={{ backgroundColor: isDark ? "#111" : "#FFFBF7" }}>
              <p className="font-body text-sm leading-relaxed" style={{ color: textSecondary }}>{leg.details}</p>
            </div>
          </div>
        ))}
      </div>
    </BriefingSection>
  );
}

// ─── 11. SHOPPING ADVISORY ───────────────────────────────────────────────────
function ShoppingAdvisorySection({ briefing, pkg, theme }) {
  const { bgCard, border, textPrimary, textSecondary, isDark } = theme;
  const advisory = briefing?.shoppingAdvisory;
  if (!advisory) return null;

  // Legacy format: flat array of tip strings
  if (Array.isArray(advisory)) {
    if (!advisory.length) return null;
    return (
      <BriefingSection label="Shopping Tips" title="Shopping Advisory" theme={theme}>
        <div className="rounded-2xl border overflow-hidden" style={{ borderColor: border, backgroundColor: bgCard }}>
          <ul className="px-5 py-4 space-y-3">
            {advisory.map((tip, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="font-body text-sm shrink-0 mt-0.5" style={{ color: ORANGE }}>•</span>
                <span className="font-body text-base leading-relaxed" style={{ color: textSecondary }}>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </BriefingSection>
    );
  }

  return (
    <BriefingSection label="Please Read Carefully" title={advisory.title} theme={theme}>
      <div
        className="rounded-2xl border-2 overflow-hidden"
        style={{ borderColor: "#EF4444", backgroundColor: isDark ? "#1C0808" : "#FFF5F5" }}
      >
        {/* Warning header */}
        <div
          className="flex items-center gap-3 px-5 py-4 border-b"
          style={{ borderColor: isDark ? "#7F1D1D" : "#FECACA", backgroundColor: isDark ? "#2D0A0A" : "#FEE2E2" }}
        >
          <AlertTriangle className="w-5 h-5 shrink-0" style={{ color: "#EF4444" }} />
          <p className="font-condensed font-black text-base tracking-widest uppercase" style={{ color: "#EF4444" }}>
            {advisory.warningLabel}
          </p>
        </div>

        <div className="px-5 py-5 space-y-4">
          <p className="font-body text-base leading-relaxed" style={{ color: isDark ? "#FCA5A5" : "#991B1B" }}>
            {advisory.body}
          </p>

          <ul className="space-y-2.5">
            {(advisory.rules || []).map((rule, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="font-body text-sm shrink-0 mt-0.5" style={{ color: "#EF4444" }}>•</span>
                <span className="font-body text-base leading-relaxed" style={{ color: isDark ? "#FCA5A5" : "#991B1B" }}>
                  {rule}
                </span>
              </li>
            ))}
          </ul>

          {advisory.penaltyNote && (
            <div
              className="px-4 py-3 rounded-xl border-l-4 font-body text-xs leading-relaxed"
              style={{
                borderLeftColor: "#EF4444",
                backgroundColor: isDark ? "#2D0A0A" : "#FEE2E2",
                color: isDark ? "#FCA5A5" : "#B91C1C",
              }}
            >
              {advisory.penaltyNote}
            </div>
          )}
        </div>
      </div>
    </BriefingSection>
  );
}

// ─── 12. REQUIREMENTS ────────────────────────────────────────────────────────
function RequirementsSection({ pkg, theme }) {
  const { bgCard, border, textPrimary, textSecondary, isDark } = theme;
  if (!pkg?.requirements?.length) return null;

  return (
    <BriefingSection label="Documents Needed" title="Requirements" theme={theme}>
      <div className="space-y-3">
        <div
          className="rounded-2xl border overflow-hidden"
          style={{ borderColor: border, backgroundColor: bgCard }}
        >
          <ul className="px-5 py-4 space-y-3">
            {pkg.requirements.map((req, i) => (
              <li key={i} className="flex items-start gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-condensed font-black text-xs text-white"
                  style={{ backgroundColor: ORANGE }}
                >
                  {i + 1}
                </div>
                <span className="font-body text-base leading-relaxed" style={{ color: textPrimary }}>
                  {req}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Useful links */}
        {pkg.links?.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {pkg.links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border font-body text-xs font-semibold transition-all hover:opacity-80"
                style={{ borderColor: ORANGE, color: ORANGE, backgroundColor: isDark ? "#1A0A00" : "#FFF5EB" }}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                {link.label}
              </a>
            ))}
          </div>
        )}

        {/* Visa info */}
        {pkg.visaInfo && (
          <div
            className="px-5 py-4 rounded-2xl border"
            style={{ borderColor: border, backgroundColor: "#FFFFFF" }}
          >
            <p className="font-body text-xs font-bold uppercase tracking-widest mb-2" style={{ color: ORANGE }}>
              Visa Information
            </p>
            <p className="font-body text-base leading-relaxed" style={{ color: textSecondary }}>
              {pkg.visaInfo}
            </p>
          </div>
        )}
      </div>
    </BriefingSection>
  );
}

// ─── 15. CONNECTIVITY GUIDE ──────────────────────────────────────────────────
function ConnectivitySection({ briefing, theme }) {
  const { bgCard, bgAlt, border, textPrimary, textSecondary, isDark } = theme;
  const guide = briefing?.connectivityGuide;
  if (!guide) return null;

  // Normalize: support both {options:[]} and legacy {simOptions:[]} formats
  const options = guide.options || (guide.simOptions || []).map((sim) => ({
    icon: "📶",
    title: sim.provider || sim.name || "SIM Option",
    description: [sim.type, sim.data && `Data: ${sim.data}`, sim.validity && `Valid: ${sim.validity}`]
      .filter(Boolean).join(" — "),
    cost: sim.price || sim.cost,
    providers: sim.notes ? [{ name: "Note", note: sim.notes }] : undefined,
    recommended: sim.recommended || false,
  }));

  const introText = guide.intro || guide.overview || null;

  return (
    <BriefingSection label="Stay Connected" title="Connectivity Guide" theme={theme}>
      <div className="space-y-4">
        {introText && (
          <p className="font-body text-base leading-relaxed" style={{ color: textSecondary }}>
            {introText}
          </p>
        )}

        {options.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {options.map((opt, i) => (
            <div
              key={i}
              className="rounded-2xl border overflow-hidden"
              style={{
                borderColor: opt.recommended ? ORANGE : border,
                backgroundColor: "#FFFFFF",
              }}
            >
              {opt.recommended && (
                <div
                  className="px-4 py-1.5 text-center font-condensed font-bold text-xs tracking-widest uppercase text-white"
                  style={{ backgroundColor: ORANGE }}
                >
                  Recommended
                </div>
              )}
              <div className="px-4 py-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{opt.icon}</span>
                  <h4 className="font-condensed font-bold text-sm tracking-wide" style={{ color: textPrimary }}>
                    {opt.title}
                  </h4>
                </div>
                <p className="font-body text-xs leading-relaxed mb-3" style={{ color: textSecondary }}>
                  {opt.description}
                </p>
                {opt.providers && (
                  <ul className="space-y-1 mb-2">
                    {opt.providers.map((p, j) => (
                      <li key={j} className="font-body text-xs flex items-start gap-1.5" style={{ color: textSecondary }}>
                        <span style={{ color: ORANGE }}>›</span>
                        <span><strong style={{ color: textPrimary }}>{p.name}</strong> — {p.note}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {opt.steps && (
                  <ul className="space-y-1 mb-2">
                    {opt.steps.map((s, j) => (
                      <li key={j} className="font-body text-xs" style={{ color: textSecondary }}>
                        {j + 1}. {s}
                      </li>
                    ))}
                  </ul>
                )}
                {opt.cost && (
                  <p
                    className="font-body text-xs font-semibold mt-2"
                    style={{ color: ORANGE }}
                  >
                    {opt.cost}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        )}

        {guide.tips?.length > 0 && (
          <div
            className="rounded-xl px-4 py-3 border space-y-1"
            style={{ borderColor: border, backgroundColor: isDark ? "#1A1A1A" : "#FAFAFA" }}
          >
            <p className="font-body text-xs font-bold uppercase tracking-wide mb-2" style={{ color: ORANGE }}>
              Quick Tips
            </p>
            {guide.tips.map((tip, i) => (
              <p key={i} className="font-body text-xs leading-relaxed flex items-start gap-1.5" style={{ color: textSecondary }}>
                <span style={{ color: ORANGE }}>›</span> {tip}
              </p>
            ))}
          </div>
        )}

        {/* Legacy wifi / recommendations fields */}
        {(guide.wifi || guide.recommendations) && (
          <div
            className="rounded-xl px-4 py-3 border space-y-2"
            style={{ borderColor: border, backgroundColor: isDark ? "#1A1A1A" : "#FAFAFA" }}
          >
            {guide.wifi && (
              <p className="font-body text-xs leading-relaxed flex items-start gap-1.5" style={{ color: textSecondary }}>
                <span style={{ color: ORANGE }}>›</span> <strong style={{ color: textPrimary }}>Free WiFi:</strong> {guide.wifi}
              </p>
            )}
            {guide.recommendations && (
              <p className="font-body text-xs leading-relaxed flex items-start gap-1.5" style={{ color: textSecondary }}>
                <span style={{ color: ORANGE }}>›</span> {guide.recommendations}
              </p>
            )}
          </div>
        )}
      </div>
    </BriefingSection>
  );
}

// ─── 16. CURRENCY GUIDE ──────────────────────────────────────────────────────
function CurrencySection({ briefing, theme }) {
  const { bgCard, border, textPrimary, textSecondary, isDark } = theme;
  const guide = briefing?.currencyGuide;
  if (!guide) return null;

  return (
    <BriefingSection label="Money Matters" title="Currency Guide" theme={theme}>
      <div className="space-y-4">
        {/* Currency summary card */}
        <div
          className="rounded-2xl border px-5 py-4 space-y-2"
          style={{ borderColor: ORANGE, backgroundColor: isDark ? "#1A0A00" : "#FFF8F0" }}
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-condensed font-black text-2xl" style={{ color: ORANGE }}>
              {guide.symbol} {guide.currency}
            </span>
          </div>
          <p className="font-body text-sm" style={{ color: textSecondary }}>{guide.exchangeRate}</p>
          {guide.usdNote && (
            <p className="font-body text-xs leading-relaxed" style={{ color: textSecondary }}>{guide.usdNote}</p>
          )}
          {guide.recommendedCash && (
            <p className="font-body text-xs font-semibold" style={{ color: ORANGE }}>
              💡 {guide.recommendedCash}
            </p>
          )}
        </div>

        {/* Where to exchange */}
        {guide.whereToExchange?.length > 0 && (
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: border, backgroundColor: bgCard }}>
            <div className="px-5 py-3 border-b" style={{ borderColor: border, backgroundColor: isDark ? "#1A1A1A" : "#FAFAFA" }}>
              <p className="font-condensed font-bold text-sm tracking-wide" style={{ color: textPrimary }}>
                Where to Exchange Money
              </p>
            </div>
            <ul className="px-5 py-4 space-y-3">
              {guide.whereToExchange.map((place, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CreditCard className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ORANGE }} />
                  <div>
                    <span className="font-body text-sm font-semibold block" style={{ color: textPrimary }}>{place.place}</span>
                    <span className="font-body text-xs" style={{ color: textSecondary }}>{place.note}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Rough price guide */}
        {guide.roughPrices?.length > 0 && (
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: border, backgroundColor: bgCard }}>
            <div className="px-5 py-3 border-b" style={{ borderColor: border, backgroundColor: isDark ? "#1A1A1A" : "#FAFAFA" }}>
              <p className="font-condensed font-bold text-sm tracking-wide" style={{ color: textPrimary }}>
                Rough Price Guide
              </p>
            </div>
            <div className="px-5 py-4 space-y-2">
              {guide.roughPrices.map((price, i) => (
                <div key={i} className="flex items-start justify-between gap-4">
                  <span className="font-body text-sm" style={{ color: textSecondary }}>{price.item}</span>
                  <span className="font-body text-xs font-semibold shrink-0" style={{ color: ORANGE }}>{price.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tips */}
        {guide.tips?.length > 0 && (
          <div
            className="rounded-xl px-4 py-3 border space-y-1"
            style={{ borderColor: border, backgroundColor: isDark ? "#1A1A1A" : "#FAFAFA" }}
          >
            <p className="font-body text-xs font-bold uppercase tracking-wide mb-2" style={{ color: ORANGE }}>
              Money Tips
            </p>
            {guide.tips.map((tip, i) => (
              <p key={i} className="font-body text-xs leading-relaxed flex items-start gap-1.5" style={{ color: textSecondary }}>
                <span style={{ color: ORANGE }}>›</span> {tip}
              </p>
            ))}
          </div>
        )}
      </div>
    </BriefingSection>
  );
}

// ─── PHOTO SLIDER (used in Destination Guide Photo Spots tab) ────────────────
function PhotoSlider({ items, theme }) {
  const { textPrimary, textSecondary, isDark } = theme;
  const [index, setIndex] = useState(0);
  const total = items.length;
  const touchStartX = useRef(null);

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  function onTouchStart(e) { touchStartX.current = e.touches[0].clientX; }
  function onTouchEnd(e) {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
    touchStartX.current = null;
  }

  const item = items[index];
  return (
    <div>
      <div
        className="relative rounded-2xl overflow-hidden select-none"
        style={{ aspectRatio: "4/3" }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={item.img}
            alt={item.name}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.38 }}
            loading="lazy"
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholder.svg"; }}
          />
        </AnimatePresence>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

        {/* Text overlay */}
        <div className="absolute inset-x-0 bottom-0 px-5 pb-5 pointer-events-none">
          <p className="font-condensed font-black text-white text-2xl sm:text-3xl leading-tight drop-shadow-lg">
            {item.name}
          </p>
          <p className="font-body text-sm text-white/85 mt-1 leading-snug drop-shadow">
            {item.desc}
          </p>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          style={{ backgroundColor: "rgba(0,0,0,0.50)", backdropFilter: "blur(4px)" }}
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          style={{ backgroundColor: "rgba(0,0,0,0.50)", backdropFilter: "blur(4px)" }}
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>

        {/* Counter badge */}
        <div
          className="absolute top-3 right-3 font-body text-xs font-bold px-3 py-1 rounded-full"
          style={{ backgroundColor: "rgba(0,0,0,0.55)", color: "#FFF", backdropFilter: "blur(4px)" }}
        >
          {index + 1} / {total}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex gap-2 justify-center mt-4">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === index ? 24 : 8,
              height: 8,
              backgroundColor: i === index ? ORANGE : (isDark ? "#444" : "#DDD"),
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── 17. DESTINATION GUIDE ───────────────────────────────────────────────────
function GuideCard({ item, index, textPrimary, textSecondary, fallbackEmoji }) {
  const imageLeft = index % 2 === 0;
  const [imgFailed, setImgFailed] = React.useState(false);

  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl p-4"
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid rgba(255,153,19,0.28)",
        boxShadow: "0 3px 18px rgba(0,0,0,0.09), 0 1px 4px rgba(0,0,0,0.05)",
      }}
    >
      {/* Image — always on top on mobile; alternates left/right on sm+ */}
      <div
        className={`rounded-2xl shrink-0 w-full h-44 sm:w-[136px] sm:h-[136px] ${!imageLeft ? "sm:order-last" : ""}`}
        style={{ backgroundColor: "#FF9913", padding: 10, boxSizing: "border-box" }}
      >
        {item.img && !imgFailed ? (
          <img
            src={item.img}
            alt={item.name}
            className="w-full h-full object-cover rounded-xl"
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div
            className="w-full h-full rounded-xl flex items-center justify-center text-4xl"
            style={{ backgroundColor: "rgba(255,255,255,0.25)" }}
          >
            {item.icon || fallbackEmoji}
          </div>
        )}
      </div>

      {/* Text */}
      <div className={`flex-1 min-w-0 ${!imageLeft ? "sm:order-first" : ""}`}>
        <p className="font-condensed font-black text-xl leading-snug mb-2" style={{ color: textPrimary }}>
          {item.name}
        </p>
        <p className="font-body text-sm leading-relaxed" style={{ color: textSecondary }}>
          {item.desc || item.description || ""}
        </p>
      </div>
    </div>
  );
}

function DestinationGuideSection({ briefing, slug, theme }) {
  const { bgCard, border, textPrimary, textSecondary, isDark } = theme;
  const guide = briefing?.destinationGuide;
  const currencyGuide = briefing?.currencyGuide;
  if (!guide) return null;

  const highlights = (guide.highlights || []).map((h) => ({
    icon: h.icon,
    name: h.name,
    desc: h.description,
    img: getDestinationImage(slug, "places", h.name) ?? h.img ?? null,
  }));

  const foods = (guide.bestFood || []).map((item) => ({
    ...item,
    img: getDestinationImage(slug, "food", item.name) ?? item.img ?? null,
  }));

  const photoSpots = (guide.photoSpots || []).map((item) => ({
    ...item,
    img: getDestinationImage(slug, "photo-spots", item.name) ?? item.img ?? null,
  }));

  const SubHeading = ({ label }) => (
    <p className="font-condensed font-bold text-sm uppercase tracking-widest mb-3 pt-1"
      style={{ color: ORANGE }}>
      {label}
    </p>
  );

  const TipList = ({ items }) => (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-3 px-4 py-3.5 rounded-2xl border"
          style={{ backgroundColor: bgCard, borderColor: border }}>
          <p className="font-body text-base leading-relaxed" style={{ color: textSecondary }}>
            {item.tip || item.text || (typeof item === "string" ? item : "")}
          </p>
        </div>
      ))}
    </div>
  );

  return (
    <BriefingSection label="Know Your Destination" title="Destination Guide" theme={theme}>
      {guide.intro && (
        <p className="font-body text-base leading-relaxed mb-6" style={{ color: textSecondary }}>
          {guide.intro}
        </p>
      )}

      <div className="space-y-10">
        {/* Best Places — alternating side-image cards */}
        {highlights.length > 0 && (
          <div>
            <SubHeading label="Best Places to Visit" />
            <div className="space-y-3">
              {highlights.map((item, i) => (
                <GuideCard key={i} item={item} index={i} textPrimary={textPrimary} textSecondary={textSecondary} fallbackEmoji="📍" />
              ))}
            </div>
          </div>
        )}

        {/* Best Food — alternating side-image cards */}
        {foods.length > 0 && (
          <div>
            <SubHeading label="Best Food & Dining" />
            <div className="space-y-3">
              {foods.map((item, i) => (
                <GuideCard key={i} item={item} index={i} textPrimary={textPrimary} textSecondary={textSecondary} fallbackEmoji="🍽️" />
              ))}
            </div>
          </div>
        )}

        {/* Photo Spots — alternating side-image cards */}
        {photoSpots.length > 0 && (
          <div>
            <SubHeading label="Best Photo Spots" />
            <div className="space-y-3">
              {photoSpots.map((item, i) => (
                <GuideCard key={i} item={item} index={i} textPrimary={textPrimary} textSecondary={textSecondary} fallbackEmoji="📸" />
              ))}
            </div>
          </div>
        )}

        {/* Local Tips */}
        {(guide.localTips || []).length > 0 && (
          <div>
            <SubHeading label="Local Tips" />
            <TipList items={guide.localTips} />
          </div>
        )}

        {/* Safety Tips */}
        {(guide.safetyTips || []).length > 0 && (
          <div>
            <SubHeading label="Safety Tips" />
            <TipList items={guide.safetyTips} />
          </div>
        )}

        {/* Weather & Practical Info */}
        {(guide.practicalInfo || []).length > 0 && (
          <div>
            <SubHeading label="Weather & Practical Info" />
            <div className="space-y-3">
              {(guide.practicalInfo || []).map((info, i) => (
                <div key={i} className="px-4 py-3.5 rounded-2xl border"
                  style={{ backgroundColor: bgCard, borderColor: border }}>
                  <p className="font-condensed font-bold text-sm mb-1" style={{ color: textPrimary }}>{info.label}</p>
                  <p className="font-body text-base leading-relaxed" style={{ color: textSecondary }}>{info.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Currency Guide */}
        {currencyGuide && (
          <div>
            <SubHeading label="Currency Guide" />
            <div className="space-y-3">
              <div className="px-5 py-4 rounded-2xl border" style={{ backgroundColor: bgCard, borderColor: border }}>
                <p className="font-condensed font-black text-lg mb-1" style={{ color: textPrimary }}>
                  {currencyGuide.currency} ({currencyGuide.symbol})
                </p>
                <p className="font-body text-base leading-relaxed" style={{ color: textSecondary }}>
                  {currencyGuide.exchangeRate}
                </p>
              </div>
              {currencyGuide.roughPrices?.length > 0 && (
                <div className="rounded-2xl border overflow-hidden" style={{ borderColor: border, backgroundColor: bgCard }}>
                  <div className="px-5 py-3 border-b" style={{ borderColor: border, backgroundColor: isDark ? "#1A1A1A" : "#FAFAFA" }}>
                    <p className="font-condensed font-bold text-sm" style={{ color: textPrimary }}>Price Reference</p>
                  </div>
                  <div>
                    {currencyGuide.roughPrices.map((rp, i) => (
                      <div key={i} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 sm:gap-4 px-4 sm:px-5 py-3.5 border-b last:border-0"
                        style={{ borderColor: border }}>
                        <p className="font-body text-sm leading-relaxed" style={{ color: textSecondary }}>{rp.item}</p>
                        <p className="font-body text-sm font-bold text-right sm:shrink-0 sm:ml-2" style={{ color: ORANGE }}>{rp.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {currencyGuide.tips?.length > 0 && (
                <div className="space-y-2">
                  {currencyGuide.tips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-2 px-4 py-3 rounded-xl border"
                      style={{ backgroundColor: bgCard, borderColor: border }}>
                      <span className="font-bold mt-0.5 shrink-0" style={{ color: ORANGE }}>✓</span>
                      <p className="font-body text-sm leading-relaxed" style={{ color: textSecondary }}>{tip}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </BriefingSection>
  );
}

// ─── 18. EMERGENCY CONTACTS ──────────────────────────────────────────────────
function EmergencyContactsSection({ briefing, theme }) {
  const contacts = briefing?.emergencyContacts;
  if (!contacts?.length) return null;

  const getCategoryIcon = (cat = "") => {
    const c = cat.toLowerCase();
    if (c.includes("transfer") || c.includes("driver") || c.includes("transport") || c.includes("ground")) return Car;
    if (c.includes("emergency") || c.includes("ambulance") || c.includes("police")) return AlertTriangle;
    if (c.includes("hotel") || c.includes("lodging") || c.includes("accommodation")) return Hotel;
    if (c.includes("airport")) return Plane;
    if (c.includes("operator") || c.includes("operations") || c.includes("24/7")) return Users;
    if (c.includes("philippine") || c.includes("contact center") || c.includes("center")) return Globe;
    return Phone;
  };

  const isPhone = (v) => v && /^\+?[\d\s\-\(\)]{6,}$/.test(String(v));

  // Last group shown full-width if odd count
  const mainGroups = contacts.length > 2 ? contacts.slice(0, -1) : contacts;
  const lastGroup = contacts.length > 2 && contacts.length % 2 !== 0 ? contacts[contacts.length - 1] : null;

  const ContactCard = ({ group, fullWidth = false }) => {
    const Icon = getCategoryIcon(group.category);
    return (
      <div
        className={`rounded-2xl overflow-hidden border border-orange-100${fullWidth ? " col-span-2" : ""}`}
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <div className="flex items-center gap-3 px-4 py-3" style={{ backgroundColor: "#FFF5E6" }}>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: "rgba(255,153,19,0.18)" }}
          >
            <Icon className="w-4 h-4" style={{ color: ORANGE }} />
          </div>
          <p className="font-condensed font-black text-xs tracking-[0.2em] uppercase" style={{ color: ORANGE }}>
            {group.category}
          </p>
        </div>
        <ul className="px-4 py-3 space-y-2">
          {(group.contacts || []).map((c, j) => (
            <li key={j} className="flex items-center justify-between gap-2 py-1 border-b border-orange-50 last:border-0">
              <span className="font-body text-sm min-w-0 flex-1" style={{ color: "#555" }}>{c.label}</span>
              {c.url ? (
                <a href={c.url} target="_blank" rel="noopener noreferrer"
                  className="font-condensed font-black text-sm shrink-0 text-right hover:opacity-75 transition-opacity" style={{ color: ORANGE }}>
                  {c.value}
                </a>
              ) : isPhone(c.value) ? (
                <a href={`tel:${String(c.value).replace(/\D/g, "")}`}
                  className="font-condensed font-black text-sm shrink-0 text-right hover:opacity-75 transition-opacity" style={{ color: ORANGE }}>
                  {c.value}
                </a>
              ) : c.value ? (
                <span className="font-condensed font-black text-sm shrink-0 text-right" style={{ color: ORANGE }}>{c.value}</span>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="rounded-3xl overflow-hidden shadow-xl">
      {/* Orange gradient header */}
      <div
        className="py-5 px-6 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #FFB347 0%, #FF9913 50%, #e07800 100%)" }}
      >
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "20px 20px"
        }} />
        <p className="relative font-condensed font-black text-lg sm:text-xl tracking-[0.3em] uppercase text-white">
          Important Contact Numbers
        </p>
        <p className="relative font-body text-sm mt-1" style={{ color: "rgba(255,255,255,0.85)" }}>
          Save these for a worry-free travel
        </p>
      </div>

      {/* Cards */}
      <div className="p-4 sm:p-5" style={{ backgroundColor: "#FFF8EE" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {mainGroups.map((group, i) => <ContactCard key={i} group={group} />)}
          {lastGroup && <ContactCard group={lastGroup} fullWidth />}
        </div>
      </div>
    </div>
  );
}

// ─── IMPORTANT NOTICES (from pkg.importantNotices) ───────────────────────────
function ImportantNoticesSection({ pkg, theme }) {
  const { border, textSecondary, isDark } = theme;
  if (!pkg?.importantNotices?.length) return null;

  return (
    <BriefingSection label="Read Before Travel" title="Important Notices" theme={theme}>
      <div
        className="rounded-2xl border-l-4 px-5 py-4 space-y-2.5"
        style={{
          borderLeftColor: ORANGE,
          borderTop: `1px solid ${border}`,
          borderRight: `1px solid ${border}`,
          borderBottom: `1px solid ${border}`,
          backgroundColor: isDark ? "#1A0E00" : "#FFFAF0",
        }}
      >
        {pkg.importantNotices.map((notice, i) => (
          <p key={i} className="font-body text-base leading-relaxed flex items-start gap-2" style={{ color: textSecondary }}>
            <span style={{ color: ORANGE }}>›</span>
            {notice}
          </p>
        ))}
      </div>
    </BriefingSection>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// ADD-ONS MODULE — Optional Tours · Travel Insurance · Cart · Checkout
// Data sourced from src/data/addons/ — see that directory for API TODO markers.
// ════════════════════════════════════════════════════════════════════════════════

// ─── OPTIONAL TOURS SECTION ───────────────────────────────────────────────────
// Data: src/services/toursService.js → getToursForDestination(slug) → Globaltix API
// TODO: LakbayHub API Integration — merge LakbayHub results into toursService.js
function OptionalToursSection({ tours, cartTourIds, onAdd, theme }) {
  const { bgCard, border, textPrimary, textSecondary, isDark } = theme;
  if (!tours || tours.length === 0) return null;

  const primaryImage = (tour) => {
    const img = tour.images?.find((i) => i.isPrimary);
    return img ? { url: img.url, fallback: img.fallbackUrl || null } : null;
  };

  return (
    <BriefingSection label="Add to Your Trip" title="Optional Tours & Activities" theme={theme}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {tours.map((tour) => {
          const inCart = cartTourIds.includes(tour.id);
          const img = primaryImage(tour);
          return (
            <div
              key={tour.id}
              className="rounded-2xl border-2 overflow-hidden flex flex-col transition-all duration-200"
              style={{
                backgroundColor: bgCard,
                borderColor: inCart ? ORANGE : border,
                boxShadow: inCart ? `0 4px 20px ${ORANGE}25` : "none",
              }}
            >
              {/* Tour image — 4:3 ratio for larger visual impact */}
              <div
                className="relative aspect-[4/3] overflow-hidden flex items-center justify-center"
                style={{ backgroundColor: isDark ? "#1A1A1A" : "#F0F0F0" }}
              >
                {img ? (
                  <img
                    src={img.url}
                    alt={tour.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                    onError={img.fallback ? (e) => { e.currentTarget.src = img.fallback; e.currentTarget.onerror = null; } : undefined}
                  />
                ) : (
                  <span className="text-6xl">🗺️</span>
                )}

                {/* Duration badge top-right */}
                {tour.duration && (
                  <span
                    className="absolute top-2 right-2 font-body text-[11px] font-bold px-2.5 py-1 rounded-lg"
                    style={{ backgroundColor: "rgba(0,0,0,0.65)", color: "#fff" }}
                  >
                    ⏱ {tour.duration}
                  </span>
                )}

                {/* Price badge bottom-right */}
                <div
                  className="absolute bottom-0 right-0 px-3.5 py-2 rounded-tl-xl"
                  style={{ backgroundColor: ORANGE }}
                >
                  <span className="font-condensed font-black text-lg text-white">
                    {tour.currency === "JPY" ? "¥" : tour.currency === "USD" ? "$" : "₱"}
                    {tour.price.toLocaleString()}
                  </span>
                  <span className="font-body text-[10px] text-white ml-1 opacity-80">
                    {tour.currency && tour.currency !== "PHP" ? tour.currency : "/adult"}
                  </span>
                </div>

                {/* Added-to-cart indicator */}
                {inCart && (
                  <div
                    className="absolute top-2 left-2 inline-flex items-center gap-1 font-body text-[11px] font-bold px-2.5 py-1 rounded-lg"
                    style={{ backgroundColor: "#22C55E", color: "#fff" }}
                  >
                    <Check className="w-3 h-3" strokeWidth={3} /> Added
                  </div>
                )}
              </div>

              {/* Card body */}
              <div className="p-4 flex flex-col flex-1">
                {tour.category && (
                  <p className="font-body text-xs font-bold uppercase tracking-widest mb-1" style={{ color: ORANGE }}>
                    {tour.category}
                  </p>
                )}
                <h4 className="font-condensed font-black text-xl leading-tight mb-2" style={{ color: textPrimary }}>
                  {tour.name}
                </h4>

                {/* Availability + meeting point */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span
                    className="inline-flex items-center gap-1 font-body text-[11px] font-bold px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: isDark ? "rgba(34,197,94,0.12)" : "#F0FFF4", color: "#22C55E", border: "1px solid rgba(34,197,94,0.3)" }}
                  >
                    📅 Available Daily
                  </span>
                  {tour.meetingPoint && (
                    <span className="font-body text-xs flex items-center gap-1 truncate" style={{ color: textSecondary }}>
                      <MapPin className="w-3 h-3 shrink-0" style={{ color: ORANGE }} />
                      {tour.meetingPoint}
                    </span>
                  )}
                </div>

                {/* Description (2 lines max) */}
                {tour.description && (
                  <p
                    className="font-body text-base leading-relaxed mb-3"
                    style={{ color: textSecondary, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                  >
                    {tour.description}
                  </p>
                )}

                {/* Inclusions */}
                {tour.inclusions?.length > 0 && (
                  <ul className="space-y-1 mb-4 flex-1">
                    {tour.inclusions.slice(0, 3).map((inc, i) => (
                      <li key={i} className="flex items-center gap-1.5 font-body text-xs" style={{ color: textSecondary }}>
                        <Check className="w-3 h-3 shrink-0" style={{ color: "#22C55E" }} strokeWidth={2.5} />
                        {inc}
                      </li>
                    ))}
                    {tour.inclusions.length > 3 && (
                      <li className="font-body text-xs" style={{ color: textSecondary }}>
                        +{tour.inclusions.length - 3} more included
                      </li>
                    )}
                  </ul>
                )}

                {/* CTA — full width, prominent */}
                <button
                  onClick={() => onAdd(tour)}
                  disabled={inCart}
                  className="w-full font-condensed font-black text-base py-3.5 rounded-xl mt-auto transition-all active:scale-[0.98] disabled:cursor-default"
                  style={{
                    backgroundColor: inCart ? "transparent" : ORANGE,
                    color: inCart ? "#22C55E" : "#080808",
                    border: inCart ? "1.5px solid #22C55E" : "none",
                  }}
                >
                  {inCart ? (
                    <span className="flex items-center justify-center gap-1.5">
                      <Check className="w-4 h-4" strokeWidth={2.5} /> Added to Trip
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-1.5">
                      <Plus className="w-4 h-4" /> Add To Trip
                    </span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </BriefingSection>
  );
}

// ─── TRAVEL INSURANCE SECTION ─────────────────────────────────────────────────
// Data: src/data/addons/mockInsurance.js → getInsurancePlans()
// TODO: Starr Insurance API Integration — replace mock data in mockInsurance.js
function TravelInsuranceSection({ plans, selectedInsurance, onSelect, theme }) {
  const { bgCard, border, textPrimary, textSecondary, isDark } = theme;

  const TIER_STYLE = {
    basic:   { accent: "#6B7280", ctaText: "#FFFFFF" },
    standard:{ accent: ORANGE,    ctaText: "#080808" },
    premium: { accent: "#8B5CF6", ctaText: "#FFFFFF" },
  };

  return (
    <BriefingSection label="Travel Protection" title="Travel Insurance" theme={theme}>

      {/* Header banner */}
      <div
        className="rounded-2xl px-5 py-4 mb-6 flex items-start gap-4"
        style={{ backgroundColor: isDark ? "rgba(255,153,19,0.08)" : "#FFF8F0", border: `1.5px solid ${ORANGE}30` }}
      >
        <span className="text-3xl shrink-0 mt-0.5">🛡️</span>
        <div>
          <h4 className="font-condensed font-black text-lg leading-tight mb-1" style={{ color: textPrimary }}>
            Protect Your Trip Before You Go
          </h4>
          <p className="font-body text-base leading-relaxed" style={{ color: textSecondary }}>
            Travel insurance covers unexpected medical emergencies, trip cancellations, and lost baggage —
            a small cost for total peace of mind.
          </p>
        </div>
      </div>

      {/* Premium pricing cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        {plans.map((plan) => {
          const selected = selectedInsurance?.id === plan.id;
          const ts = TIER_STYLE[plan.tier] || TIER_STYLE.basic;
          const coverageItems = plan.coverageLimits?.length > 0
            ? plan.coverageLimits.slice(0, 4).map((l) => `${l.type}: up to ₱${l.limitAmount.toLocaleString()}`)
            : (plan.coverage || []);

          return (
            <div
              key={plan.id}
              className="rounded-2xl border-2 overflow-hidden flex flex-col cursor-pointer transition-all duration-200"
              style={{
                backgroundColor: selected
                  ? (isDark ? (plan.tier === "premium" ? "#130A20" : "#1A0A00") : (plan.tier === "premium" ? "#FAF5FF" : "#FFF8F0"))
                  : bgCard,
                borderColor: selected ? ts.accent : (plan.recommended ? `${ORANGE}60` : border),
                boxShadow: selected ? `0 4px 24px ${ts.accent}28` : "none",
              }}
              onClick={() => onSelect(plan)}
            >
              {/* Plan header */}
              <div className="px-4 pt-5 pb-3 border-b" style={{ borderColor: selected ? `${ts.accent}25` : border }}>
                {plan.recommended && (
                  <div
                    className="inline-flex items-center gap-1 font-body text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full mb-2"
                    style={{ backgroundColor: ORANGE, color: "#080808" }}
                  >
                    ⭐ Recommended
                  </div>
                )}
                <p
                  className="font-body text-xs font-bold uppercase tracking-widest mb-1"
                  style={{ color: ts.accent }}
                >
                  {plan.tier?.toUpperCase() || "PLAN"}
                </p>
                <h4 className="font-condensed font-black text-lg leading-tight" style={{ color: textPrimary }}>
                  {plan.name}
                </h4>
              </div>

              {/* Price */}
              <div className="px-4 py-3 border-b" style={{ borderColor: selected ? `${ts.accent}25` : border }}>
                <div className="flex items-baseline gap-1">
                  <span className="font-condensed font-black text-3xl" style={{ color: ts.accent }}>
                    ₱{plan.price.toLocaleString()}
                  </span>
                  <span className="font-body text-sm" style={{ color: textSecondary }}>/person</span>
                </div>
              </div>

              {/* Coverage */}
              <div className="px-4 py-4 flex-1">
                <ul className="space-y-2">
                  {coverageItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 font-body text-xs" style={{ color: textSecondary }}>
                      <Check className="w-3 h-3 mt-0.5 shrink-0" style={{ color: ts.accent }} strokeWidth={2.5} />
                      {item}
                    </li>
                  ))}
                </ul>
                {plan.documentUrl && (
                  <a
                    href={plan.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 font-body text-xs font-semibold mt-3 hover:opacity-75 transition-opacity"
                    style={{ color: ts.accent }}
                  >
                    <ExternalLink className="w-3 h-3" /> Policy Document
                  </a>
                )}
              </div>

              {/* CTA button */}
              <div className="px-4 pb-4">
                <button
                  onClick={(e) => { e.stopPropagation(); onSelect(plan); }}
                  className="w-full font-condensed font-black text-base py-3 rounded-xl transition-all active:scale-[0.98]"
                  style={{
                    backgroundColor: selected ? "transparent" : ts.accent,
                    color: selected ? ts.accent : ts.ctaText,
                    border: selected ? `1.5px solid ${ts.accent}` : "none",
                  }}
                >
                  {selected ? "✓ Selected" : "Add Insurance"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Why Travel Insurance Matters */}
      <div
        className="rounded-2xl border overflow-hidden"
        style={{
          backgroundColor: isDark ? "rgba(139,92,246,0.05)" : "#FAFAFF",
          borderColor: isDark ? "rgba(139,92,246,0.25)" : "#C4B5FD",
        }}
      >
        <div
          className="px-5 py-4 border-b flex items-center gap-3"
          style={{
            borderColor: isDark ? "rgba(139,92,246,0.2)" : "#DDD6FE",
            backgroundColor: isDark ? "rgba(139,92,246,0.08)" : "#EDE9FE",
          }}
        >
          <span className="text-2xl">🛡️</span>
          <p className="font-condensed font-black text-lg" style={{ color: isDark ? "#C4B5FD" : "#5B21B6" }}>
            Why Travel Insurance Matters
          </p>
        </div>
        <div className="px-5 py-4">
          <p className="font-body text-base leading-relaxed mb-4" style={{ color: textSecondary }}>
            Travel insurance is optional but highly recommended. It protects you from unexpected costs that could ruin your entire trip:
          </p>
          <ul className="space-y-2.5">
            {[
              { icon: "🏥", label: "Medical Emergencies", desc: "Hospital bills abroad can reach ₱100,000+. Insurance covers treatment, hospitalization & emergency evacuation." },
              { icon: "✈️", label: "Trip Delays", desc: "Flight cancellations and delays can strand you with extra hotel and meal expenses — covered under most plans." },
              { icon: "🧳", label: "Lost Baggage", desc: "Airlines lose bags more often than you think. Get reimbursed for essentials while your luggage is located." },
              { icon: "🔄", label: "Flight Interruptions", desc: "Missed connections or forced rerouting costs can be significant. Travel insurance has you covered." },
              { icon: "⚡", label: "Unexpected Incidents", desc: "Accidents, theft, or sudden illness can happen to anyone. Travel with confidence knowing you're protected." },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-base shrink-0 mt-0.5">{item.icon}</span>
                <div>
                  <span className="font-body text-sm font-bold" style={{ color: textPrimary }}>{item.label} — </span>
                  <span className="font-body text-sm" style={{ color: textSecondary }}>{item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </BriefingSection>
  );
}

// ─── CART SUMMARY SECTION ─────────────────────────────────────────────────────
function CartSummarySection({ cart, total, onRemoveTour, onRemoveInsurance, theme }) {
  const { bgCard, border, textPrimary, textSecondary, isDark } = theme;
  const isEmpty = cart.tours.length === 0 && !cart.insurance;

  return (
    <BriefingSection label="Your Selection" title="Cart Summary" theme={theme}>
      <div className="rounded-2xl border-2 overflow-hidden" style={{ borderColor: isEmpty ? border : ORANGE, backgroundColor: bgCard }}>
        {isEmpty ? (
          <div className="py-14 text-center">
            <p className="text-5xl mb-4">🛒</p>
            <p className="font-condensed font-black text-2xl mb-1" style={{ color: textPrimary }}>Your cart is empty</p>
            <p className="font-body text-sm" style={{ color: textSecondary }}>
              Add optional tours or travel insurance above to get started.
            </p>
          </div>
        ) : (
          <>
            {/* Tour items */}
            {cart.tours.length > 0 && (
              <div className="px-5 pt-5">
                <p
                  className="font-body text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ color: textSecondary }}
                >
                  Optional Tours ({cart.tours.length})
                </p>
                {cart.tours.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="flex items-center justify-between gap-4 py-3.5 border-b last:border-b-0"
                    style={{ borderColor: border }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-xl shrink-0">🗺️</span>
                      <div className="min-w-0">
                        <p className="font-body text-sm font-semibold truncate" style={{ color: textPrimary }}>
                          {item.tour.name}
                        </p>
                        <p className="font-body text-xs" style={{ color: textSecondary }}>
                          {item.selectedOption?.optionName
                            ? `${item.selectedOption.optionName} · ${item.qty} pax`
                            : `${item.tour.duration || "Tour"} · ${item.qty ?? 1} pax`}
                          {item.bookingDate && ` · ${new Date(item.bookingDate + "T00:00:00").toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" })}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-body text-sm font-bold" style={{ color: ORANGE }}>
                        ₱{item.total.toLocaleString()}
                      </span>
                      <button
                        onClick={() => onRemoveTour(item.cartItemId)}
                        aria-label={`Remove ${item.tour.name}`}
                        className="p-1.5 rounded-lg hover:opacity-70 transition-opacity"
                        style={{ color: "#EF4444" }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Insurance item */}
            {cart.insurance && (
              <div className="px-5 pt-4">
                <p
                  className="font-body text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ color: textSecondary }}
                >
                  Travel Insurance
                </p>
                <div
                  className="flex items-center justify-between gap-4 py-3.5 border-b"
                  style={{ borderColor: border }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl shrink-0">🛡️</span>
                    <p className="font-body text-sm font-semibold" style={{ color: textPrimary }}>
                      {cart.insurance.plan?.name || cart.insurance.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-body text-sm font-bold" style={{ color: ORANGE }}>
                      ₱{cart.insurance.total?.toLocaleString() || cart.insurance.price?.toLocaleString()}
                    </span>
                    <button
                      onClick={onRemoveInsurance}
                      aria-label="Remove insurance"
                      className="p-1.5 rounded-lg hover:opacity-70 transition-opacity"
                      style={{ color: "#EF4444" }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Running total */}
            <div
              className="px-5 py-4 flex items-center justify-between"
              style={{ backgroundColor: isDark ? "#1A0A00" : "#FFF8F0" }}
            >
              <p className="font-condensed font-black text-lg" style={{ color: textPrimary }}>
                Total Add-Ons
              </p>
              <p className="font-condensed font-black text-2xl" style={{ color: ORANGE }}>
                ₱{total.toLocaleString()}
              </p>
            </div>
          </>
        )}
      </div>
    </BriefingSection>
  );
}

// ─── CHECKOUT SECTION ─────────────────────────────────────────────────────────
// Data: src/data/addons/index.js → createOrder(), PAYMENT_METHODS
//
// DEMO MODE ONLY — This section simulates a complete checkout flow for
// stakeholder visualization. No real payment gateway is called.
// Replace with real gateway integration later (PayMongo / Xendit / BUX).
function CheckoutSection({ cart, total, theme }) {
  const { bgCard, border, textPrimary, textSecondary, isDark } = theme;
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [customer, setCustomer]             = useState({ name: "", email: "", phone: "" });

  // DEMO MODE ONLY — demo modal + success state
  const [demoModalOpen, setDemoModalOpen]   = useState(false);
  const [pendingOrder,  setPendingOrder]    = useState(null);
  const [orderSuccess,  setOrderSuccess]    = useState(null); // { order, demoRef }

  const isEmpty     = cart.tours.length === 0 && !cart.insurance;
  const hasCustomer = customer.name.trim() && customer.email.trim() && customer.phone.trim();
  const canProceed  = !isEmpty && selectedMethod !== null && hasCustomer;

  const selectedMethodObj = PAYMENT_METHODS.find((m) => m.id === selectedMethod);

  // DEMO MODE ONLY — Replace with real gateway integration later
  // Real integration steps:
  //   1. POST order to Supabase orders table
  //   2. Call gateway API (PayMongo / Xendit / BUX) with orderId as external reference
  //   3. Redirect user to gateway-provided checkout URL
  const handleProceedToPayment = () => {
    const order = createOrder(cart, customer, selectedMethod);
    setPendingOrder(order);
    setDemoModalOpen(true);
  };

  // Show success screen once demo payment is confirmed
  if (orderSuccess) {
    return (
      <BriefingSection label="Order Confirmed" title="Add-ons Confirmed" theme={theme}>
        <OrderSuccessScreen
          order={orderSuccess.order}
          demoRef={orderSuccess.demoRef}
          paymentMethod={selectedMethodObj}
          theme={theme}
        />
      </BriefingSection>
    );
  }

  return (
    <BriefingSection label="Complete Your Order" title="Checkout" theme={theme}>
      <div className="space-y-5">

        {/* Customer details */}
        <div className="rounded-xl border overflow-hidden" style={{ borderColor: border, backgroundColor: bgCard }}>
          <div className="px-4 py-3 border-b" style={{ borderColor: border, backgroundColor: isDark ? "#1A1A1A" : "#FAFAFA" }}>
            <p className="font-condensed font-bold text-sm tracking-wide" style={{ color: textPrimary }}>Your Details</p>
          </div>
          <div className="px-4 py-4 space-y-3">
            {[
              { key: "name",  label: "Full Name",     type: "text",  placeholder: "Maria Santos" },
              { key: "email", label: "Email Address", type: "email", placeholder: "maria@example.com" },
              { key: "phone", label: "Phone Number",  type: "tel",   placeholder: "09171234567" },
            ].map((f) => (
              <div key={f.key}>
                <label className="font-body text-xs font-semibold block mb-1" style={{ color: textSecondary }}>{f.label}</label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  value={customer[f.key]}
                  onChange={(e) => setCustomer((prev) => ({ ...prev, [f.key]: e.target.value }))}
                  className="w-full font-body text-sm px-3 py-2.5 rounded-lg border focus:outline-none transition-all"
                  style={{ backgroundColor: isDark ? "#111" : "#F8F8F8", borderColor: border, color: textPrimary }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Payment gateway selector — DEMO MODE ONLY */}
        <div>
          <p className="font-body text-sm font-semibold mb-3" style={{ color: textSecondary }}>
            Select Payment Gateway
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PAYMENT_METHODS.map((method) => {
              const selected = selectedMethod === method.id;
              return (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(selected ? null : method.id)}
                  className="flex flex-col items-center gap-2 py-4 px-3 rounded-xl border-2 font-body transition-all active:scale-95"
                  style={{
                    backgroundColor: selected ? (isDark ? "#1A0A00" : "#FFF8F0") : bgCard,
                    borderColor: selected ? ORANGE : border,
                    color: selected ? ORANGE : textSecondary,
                  }}
                >
                  <span className="text-3xl">{method.emoji}</span>
                  <span className="font-semibold text-sm">{method.label}</span>
                  <span
                    className="font-body text-[10px] font-normal leading-tight text-center"
                    style={{ color: selected ? `${ORANGE}AA` : textSecondary }}
                  >
                    {method.description}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="font-body text-[10px] mt-2 text-center" style={{ color: textSecondary }}>
            Your payment details are encrypted and processed securely.
          </p>
        </div>

        {/* Order summary card */}
        <div
          className="rounded-2xl border overflow-hidden"
          style={{ borderColor: border, backgroundColor: bgCard }}
        >
          <div
            className="px-5 py-3.5 border-b"
            style={{ borderColor: border, backgroundColor: isDark ? "#1A1A1A" : "#FAFAFA" }}
          >
            <p className="font-condensed font-bold text-sm tracking-wide" style={{ color: textPrimary }}>
              Order Summary
            </p>
          </div>

          <div className="px-5 py-4">
            {isEmpty ? (
              <p className="font-body text-sm text-center py-3" style={{ color: textSecondary }}>
                No items selected
              </p>
            ) : (
              <div className="space-y-2.5">
                {cart.tours.map((t) => (
                  <div key={t.cartItemId} className="flex justify-between gap-4 font-body text-sm" style={{ color: textSecondary }}>
                    <span className="truncate">{t.tour.name}</span>
                    <span className="shrink-0">₱{t.total.toLocaleString()}</span>
                  </div>
                ))}
                {cart.insurance && (
                  <div className="flex justify-between gap-4 font-body text-sm" style={{ color: textSecondary }}>
                    <span>{cart.insurance.plan?.name}</span>
                    <span className="shrink-0">₱{cart.insurance.total.toLocaleString()}</span>
                  </div>
                )}
                <div
                  className="flex justify-between gap-4 pt-3 border-t font-condensed font-black text-xl"
                  style={{ borderColor: border, color: textPrimary }}
                >
                  <span>Total</span>
                  <span style={{ color: ORANGE }}>₱{total.toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Proceed to Payment — opens DemoPaymentModal */}
        <button
          disabled={!canProceed}
          className="w-full font-condensed font-black text-xl py-4 rounded-xl transition-all active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ backgroundColor: ORANGE, color: "#080808" }}
          onClick={handleProceedToPayment}
        >
          {isEmpty
            ? "Add Items to Continue"
            : !selectedMethod
              ? "Select a Payment Gateway"
              : !hasCustomer
                ? "Fill In Your Details"
                : `Proceed To Checkout  •  ₱${total.toLocaleString()}`}
        </button>

        {!isEmpty && !selectedMethod && (
          <p className="font-body text-xs text-center" style={{ color: textSecondary }}>
            Please select a payment gateway above to continue.
          </p>
        )}
      </div>

      {/* DEMO MODE ONLY — DemoPaymentModal */}
      <AnimatePresence>
        {demoModalOpen && selectedMethodObj && (
          <DemoPaymentModal
            method={selectedMethodObj}
            total={total}
            theme={theme}
            onSuccess={(demoRef) => {
              setDemoModalOpen(false);
              setOrderSuccess({ order: pendingOrder, demoRef });
            }}
            onCancel={() => setDemoModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </BriefingSection>
  );
}

// ─── MAIN PAGE CONTENT ────────────────────────────────────────────────────────
function PreviewContent() {
  const { slug }   = useParams();
  const navigate   = useNavigate();
  const location   = useLocation();
  const { isDark: _globalIsDark } = useTheme();
  // Briefing page is always light mode — premium modern look for clients
  const isDark = false;
  const dest        = getDestinationBySlug(slug);
  const baseBriefing = getBriefingBySlug(slug);

  // Scroll to top whenever the slug changes (mobile browser may preserve prior scroll)
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [slug]);

  // Guard: /destination/ routes are client-facing — block unready slugs.
  // /preview/ routes bypass this check so admins can preview drafts.
  const isAdminPreview = location.pathname.startsWith("/preview/");
  if (!isAdminPreview && !READY_SLUGS.has(slug)) {
    return <Navigate to="/briefing-pending" replace />;
  }

  // ── Read enriched booking passed from GDX search (or sessionStorage fallback) ─
  const booking = location.state?.booking ?? (() => {
    try { return JSON.parse(sessionStorage.getItem("gdx_booking")); } catch { return null; }
  })();
  console.log("[BOOKING RECEIVED]", booking);

  // ── Fusioo document resolution state ─────────────────────────────────────
  // status: "idle" | "loading" | "url" | "unavailable"
  const [voucherDoc,      setVoucherDoc]      = useState({ status: "idle", url: null });
  const [itineraryDoc,    setItineraryDoc]    = useState({ status: "idle", url: null });
  const [bookingExpanded, setBookingExpanded] = useState(true);

  useEffect(() => {
    if (!booking?.gdx) return;
    // Check our own Supabase vouchers table first (admin-uploaded files take priority)
    getVoucher(booking.gdx).then(v => {
      if (v?.voucher_url) setVoucherDoc({ status: "url", url: v.voucher_url });
    }).catch(() => {});
  }, [booking?.gdx]);

  useEffect(() => {
    if (!booking) return;

    const FUSIOO_ID_RE = /^i[0-9a-f]{32}$/i;
    const isFusiooId   = (v) => typeof v === "string" && FUSIOO_ID_RE.test(v.trim());

    /**
     * Normalises any document field value into a flat array of Fusioo record ID strings.
     *
     * Handles all four storage formats that Supabase / Fusioo webhooks may produce:
     *   1. null / undefined                              → []
     *   2. plain string ID   "id906c67b..."             → ["id906c67b..."]
     *   3. JSON-string array '["id906...", "i..."]'     → ["id906...", "i..."]
     *   4. actual JS array   ["id906...", "i..."]        → ["id906...", "i..."]
     */
    const normalizeToIds = (val) => {
      if (!val) return [];

      // ── String: plain ID or JSON-encoded array ────────────────────────────
      if (typeof val === "string") {
        const s = val.trim();
        // Looks like a JSON array or object → try to parse it
        if (s.startsWith("[") || s.startsWith("{")) {
          try {
            const parsed = JSON.parse(s);
            return normalizeToIds(parsed);          // recurse on the parsed value
          } catch {
            // Not valid JSON; fall through and treat as a plain string
          }
        }
        return [s];                                 // plain string value
      }

      // ── Array: recursively normalize each element ─────────────────────────
      if (Array.isArray(val)) {
        return val.flatMap(normalizeToIds);
      }

      // ── Object: might be a Fusioo record stub { id, value } ──────────────
      if (typeof val === "object") {
        // If the object has an "id" key that looks like a Fusioo ID, use it
        if (isFusiooId(val.id)) return [val.id];
        // Otherwise recurse over all values
        return Object.values(val).flatMap(normalizeToIds)
          .filter((v) => typeof v === "string");
      }

      return [];
    };

    /**
     * Extracts a direct download URL from a Fusioo file-attachment field value.
     * Fusioo "File" fields return objects like:
     *   { filename: "voucher.pdf", url: "https://...", size: 12345 }
     *   or an array of such objects, or a JSON string of the same.
     *
     * Returns the first https:// URL found, or null.
     */
    const extractAttachmentUrl = (val) => {
      if (!val) return null;

      // JSON string → parse first
      if (typeof val === "string") {
        const s = val.trim();
        if (s.startsWith("http")) return s;                // already a plain URL
        if (s.startsWith("[") || s.startsWith("{")) {
          try { return extractAttachmentUrl(JSON.parse(s)); } catch {}
        }
        return null;
      }

      // Array → first item that yields a URL
      if (Array.isArray(val)) {
        for (const item of val) {
          const u = extractAttachmentUrl(item);
          if (u) return u;
        }
        return null;
      }

      // Object → look for common URL keys, then any https:// value
      if (typeof val === "object") {
        const URL_KEYS = ["url", "file_url", "download_url", "pdf_url", "uri", "href", "link"];
        for (const k of URL_KEYS) {
          if (typeof val[k] === "string" && val[k].startsWith("https://")) return val[k];
        }
        // Fallback: any string value that starts with https://
        for (const v of Object.values(val)) {
          if (typeof v === "string" && v.startsWith("https://")) return v;
        }
      }

      return null;
    };

    // ── Log raw field values + their types ───────────────────────────────────
    console.group("[DOCUMENT AUDIT] Raw booking document fields — GDX", booking.gdx);
    console.log("booking.voucher          :", booking.voucher);
    console.log("booking.initial_voucher  :", booking.initial_voucher);
    console.log("booking.automated_voucher:", booking.automated_voucher);
    console.log("booking.itinerary        :", booking.itinerary);
    console.log("booking.travel_itinerary :", booking.travel_itinerary);
    console.log("booking.itinerary_file   :", booking.itinerary_file);
    console.groupEnd();

    // ── Strategy 1: direct file-attachment URL ────────────────────────────────
    // Fusioo "File" fields already contain the download URL inside the attachment
    // object — no extra API call needed.
    const directVoucherUrl =
      extractAttachmentUrl(booking.voucher) ||
      extractAttachmentUrl(booking.initial_voucher) ||
      extractAttachmentUrl(booking.automated_voucher);

    const directItineraryUrl =
      extractAttachmentUrl(booking.itinerary) ||
      extractAttachmentUrl(booking.travel_itinerary) ||
      extractAttachmentUrl(booking.itinerary_file);

    if (directVoucherUrl) {
      console.log("[DOCUMENT AUDIT] Voucher: direct attachment URL →", directVoucherUrl);
      setVoucherDoc({ status: "url", url: directVoucherUrl });
    }
    if (directItineraryUrl) {
      console.log("[DOCUMENT AUDIT] Itinerary: direct attachment URL →", directItineraryUrl);
      setItineraryDoc({ status: "url", url: directItineraryUrl });
    }

    // ── Strategy 2: Fusioo App Link record ID → fetch record → extract URL ────
    // Used when the voucher field is a linked record (not a direct attachment).
    const voucherIds = [
      ...normalizeToIds(booking.voucher),
      ...normalizeToIds(booking.initial_voucher),
      ...normalizeToIds(booking.automated_voucher),
    ].filter(isFusiooId);

    const itineraryIds = [
      ...normalizeToIds(booking.itinerary),
      ...normalizeToIds(booking.travel_itinerary),
      ...normalizeToIds(booking.itinerary_file),
    ].filter(isFusiooId);

    console.log("[DOCUMENT AUDIT] Voucher record IDs   :", voucherIds);
    console.log("[DOCUMENT AUDIT] Itinerary record IDs :", itineraryIds);

    if (!directVoucherUrl && voucherIds.length > 0) {
      // Don't overwrite a Supabase-uploaded voucher already set
      setVoucherDoc(prev => prev.status === "url" ? prev : { status: "loading", url: null });
      resolveVoucher(voucherIds[0])
        .then((url) => setVoucherDoc(prev => prev.status === "url" ? prev : { status: url ? "url" : "unavailable", url }))
        .catch(() => setVoucherDoc(prev => prev.status === "url" ? prev : { status: "unavailable", url: null }));
    } else if (!directVoucherUrl) {
      console.log("[DOCUMENT AUDIT] No voucher URL or record ID found — fallback PDF will be used.");
    }

    if (!directItineraryUrl && itineraryIds.length > 0) {
      setItineraryDoc({ status: "loading", url: null });
      resolveItinerary(itineraryIds[0])
        .then((url) => setItineraryDoc({ status: url ? "url" : "unavailable", url }))
        .catch(() => setItineraryDoc({ status: "unavailable", url: null }));
    }
  }, [booking?.gdx]); // re-run only if the GDX number changes

  // Use the first package for briefing content (most destinations have one)
  const pkg = dest?.packages?.[0] || null;

  // ── Preview mode — ?preview=<package-key> loads a package without a GDX ──
  const searchParams     = new URLSearchParams(location.search);
  const previewKey       = searchParams.get("preview") || null;
  const isPreviewMode    = !!previewKey;

  // ── Da Nang multi-package variant logic ──────────────────────────────────
  // isDanangPrivate = the new private page that shows all airline package buttons
  // danang-vietnam  = original charter page, no selector, uses baseBriefing
  const isDanangPrivate = slug === "danang-private";
  const [selectedDanangKey, setSelectedDanangKey] = useState(
    () => isDanangPrivate && previewKey ? previewKey : null
  );
  const autoDetectedDanangPkg = isDanangPrivate ? getDanangPackageByBooking(booking) : null;
  const activeDanangPkg = isDanangPrivate
    ? (selectedDanangKey
        ? DANANG_PACKAGES.find((p) => p.key === selectedDanangKey) ?? autoDetectedDanangPkg
        : autoDetectedDanangPkg)
    : null;

  // ── Hong Kong multi-package variant logic ─────────────────────────────────
  // isHongkongPrivate = the private page that shows all airline package buttons
  // hongkong slug = SAR/charter page with no selector
  const isHongkongPrivate = slug === "hongkong-private";
  const [selectedHongkongKey, setSelectedHongkongKey] = useState(
    () => isHongkongPrivate && previewKey ? previewKey : null
  );
  const autoDetectedHongkongPkg = isHongkongPrivate ? getHongkongPackageByBooking(booking) : null;
  const activeHongkongPkg = isHongkongPrivate
    ? (selectedHongkongKey
        ? HONGKONG_PACKAGES.find((p) => p.key === selectedHongkongKey) ?? autoDetectedHongkongPkg
        : autoDetectedHongkongPkg)
    : null;

  // ── Beijing multi-package variant logic ───────────────────────────────────
  // All Beijing packages share the "beijing" slug — package is auto-detected
  // from GDX booking data or manually selected by the client.
  const isBeijing = slug === "beijing";
  const [selectedBeijingKey, setSelectedBeijingKey] = useState(
    () => isBeijing && previewKey ? previewKey : null
  );
  const autoDetectedBeijingPkg = isBeijing ? getBeijingPackageByBooking(booking) : null;
  const activeBeijingPkg = isBeijing
    ? (selectedBeijingKey
        ? BEIJING_PACKAGES.find((p) => p.key === selectedBeijingKey) ?? autoDetectedBeijingPkg
        : autoDetectedBeijingPkg)
    : null;

  const briefing = activeDanangPkg
    ? activeDanangPkg.briefing
    : activeHongkongPkg
      ? activeHongkongPkg.briefing
      : activeBeijingPkg
        ? activeBeijingPkg.briefing
        : baseBriefing;

  // Theme for white sections — neutral background with dark text
  const theme = {
    isDark: false,
    bg: "#FFFFFF",
    bgCard: "#FFFFFF",
    bgAlt: "#F5F0EB",
    border: "rgba(255,153,19,0.28)",
    textPrimary: "#1A0800",
    textSecondary: "#6B3A00",
    accent: "#FF9913",
  };

  // Theme for solid-orange (#FF9913) sections — white cards on orange bg
  const orangeTheme = {
    isDark: false,
    bg: "#FF9913",
    bgCard: "#FFFFFF",
    bgAlt: "#FFFFFF",
    border: "rgba(0,0,0,0.08)",
    textPrimary: "#1A0800",
    textSecondary: "#3D1000",
    accent: "#FFFFFF",
  };

  // Destination hero image for section photo accents
  const destHeroImage = getMediaForSlug(slug)?.heroImage ?? null;

  const { bg, bgCard, bgAlt, border, textPrimary, textSecondary, navBg, navBorder } = {
    ...theme,
    navBg: "#FFFFFF",
    navBorder: "rgba(255,153,19,0.28)",
  };

  // ── Globaltix optional tours ─────────────────────────────────────────────
  const [globaltixTours, setGlobaltixTours]   = useState([]);
  const [toursLoading,   setToursLoading]     = useState(true);

  useEffect(() => {
    let cancelled = false;
    setToursLoading(true);
    getToursForDestination(slug)
      .then((tours) => {
        if (cancelled) return;
        if (tours.length > 0) {
          setGlobaltixTours(tours);
        } else {
          // DEMO MODE ONLY — fall back to mock tours when Globaltix returns nothing.
          // International destinations return 0 on staging because our reseller account
          // only has Philippine products. Replace this fallback once Globaltix configures
          // the account with international inventory.
          setGlobaltixTours(getToursByDestination(slug));
        }
        setToursLoading(false);
      })
      .catch(() => {
        if (!cancelled) {
          // On error also fall back to mock data so the demo still works
          setGlobaltixTours(getToursByDestination(slug));
          setToursLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, [slug]);

  // ── Cart state (full Cart model — src/types/addons.js) ───────────────────
  const [cart, setCart] = useState(() => createCart(slug));

  // Booking modal state — null = closed, tour object = open
  const [bookingModalTour, setBookingModalTour] = useState(null);

  // Client's own submitted review — passed to Testimonials so it appears as first card
  const [clientReview,      setClientReview]      = useState(null);
  // Bumped on every review CRUD so BriefingTestimonials re-fetches live reviews
  const [reviewRefreshKey,  setReviewRefreshKey]  = useState(0);

  function handleReviewSaved(record) {
    setClientReview(record);
    setReviewRefreshKey((k) => k + 1);
  }

  // Recompute totals whenever tours or insurance change
  const _updateTotals = (tours, insurance) => {
    const totals = calculateCartTotal(tours, insurance);
    return totals;
  };

  const addTourToCart = (tour, selectedOption, qty, bookingDate) =>
    setCart((prev) => {
      if (prev.tours.find((t) => t.tour?.id === tour.id)) return prev;
      const item  = createCartTourItem(tour, selectedOption, qty, bookingDate);
      const tours = [...prev.tours, item];
      return { ...prev, tours, ..._updateTotals(tours, prev.insurance) };
    });

  const handleBookingConfirm = (tour, selectedOption, qty, bookingDate) => {
    addTourToCart(tour, selectedOption, qty, bookingDate);
    setBookingModalTour(null);
  };

  const removeTourFromCart = (cartItemId) =>
    setCart((prev) => {
      const tours = prev.tours.filter((t) => t.cartItemId !== cartItemId);
      return { ...prev, tours, ..._updateTotals(tours, prev.insurance) };
    });

  const selectInsurance = (plan) =>
    setCart((prev) => {
      const insurance = prev.insurance?.id === plan.id
        ? null
        : createCartInsuranceItem(plan, 1);
      return { ...prev, insurance, ..._updateTotals(prev.tours, insurance) };
    });

  const removeInsurance = () =>
    setCart((prev) => ({ ...prev, insurance: null, ..._updateTotals(prev.tours, null) }));

  const cartTotal = cart.total;

  // Hard error only when there is no booking either — a customer with a booking
  // should always reach their booking dashboard even if the destination slug is unknown.
  if (!dest && !booking) {
    return (
      <div className="min-h-screen flex items-center justify-center transition-colors duration-300" style={{ backgroundColor: isDark ? "#111111" : "#F5F5F5" }}>
        <div className="text-center px-4">
          <p className="font-condensed text-2xl font-bold mb-4" style={{ color: isDark ? "#A0A0A0" : "#555555" }}>Destination not found</p>
          <button onClick={() => navigate("/")} className="font-body text-sm underline" style={{ color: ORANGE }}>
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Section spacing constant
  const sectionGap = "py-10 lg:py-12";

  // Ordered section definitions — filter to visible, then alternate DARK/ORANGE by index
  const briefingSectionDefs = briefing ? [
    { key: "welcome", show: true, bgVariant: "city",
      render: (t) => <WelcomeSection briefing={briefing} pkg={pkg} theme={t} heroImage={dest?.heroImage} /> },
    { key: "inclusions", show: true, bgVariant: null,
      render: (t) => <InclusionsSection pkg={pkg} briefing={briefing} theme={t} /> },
    { key: "tours", show: !!(dest?.enableAddOns && globaltixTours.length > 0), bgVariant: "city",
      render: (t) => (
        <OptionalToursSection
          tours={globaltixTours}
          cartTourIds={cart.tours.map((item) => item.tour?.id)}
          onAdd={(tour) => setBookingModalTour(tour)}
          theme={t}
        />
      ),
    },
    { key: "travel-info", show: true, bgVariant: null,
      render: (t) => <TravelInfoCenter briefing={briefing} theme={t} /> },
    { key: "arrival", show: true, bgVariant: "luggage",
      render: (t) => <ArrivalSection briefing={briefing} theme={t} /> },
    { key: "transfer", show: true, bgVariant: null,
      render: (t) => <TransferSection briefing={briefing} theme={t} /> },
    { key: "hotel", show: true, bgVariant: "luggage",
      render: (t) => <HotelSection briefing={briefing} theme={t} /> },
    { key: "reminders", show: true, bgVariant: null,
      render: (t) => <RemindersSection briefing={briefing} theme={t} /> },
    { key: "dos-donts", show: !!briefing.dosAndDonts, bgVariant: "city",
      render: (t) => (
        <BriefingSection label="Behavior Guidelines" title="Important Do's & Don'ts" theme={t}>
          <DosAndDonts dos={briefing.dosAndDonts.dos} donts={briefing.dosAndDonts.donts} theme={t} />
        </BriefingSection>
      ),
    },
    { key: "immigration", show: !!(briefing.immigrationAdvisory?.length > 0), bgVariant: null,
      render: (t) => (
        <BriefingSection label="Philippine Immigration" title="Immigration Advisory" theme={t}>
          <div className="mb-4">
            <p className="font-body text-base leading-relaxed" style={{ color: t.textSecondary }}>
              Tap your traveler type below to see the documents required at Philippine immigration upon departure. Bring originals and photocopies of all documents.
            </p>
          </div>
          <ImmigrationAdvisory advisory={briefing.immigrationAdvisory} theme={t} />
        </BriefingSection>
      ),
    },
    { key: "connecting-flight", show: true, bgVariant: "city",
      render: (t) => <ConnectingFlightSection briefing={briefing} theme={t} /> },
    { key: "shopping", show: true, bgVariant: null,
      render: (t) => <ShoppingAdvisorySection briefing={briefing} pkg={pkg} theme={t} /> },
    { key: "requirements", show: true, bgVariant: "city",
      render: (t) => <RequirementsSection pkg={pkg} theme={t} /> },
    { key: "important-notices", show: !!(pkg?.importantNotices?.length > 0), bgVariant: "city",
      render: (t) => <ImportantNoticesSection pkg={pkg} theme={t} /> },
    { key: "checklist", show: !!(briefing.checklist?.length > 0), bgVariant: null,
      render: (t) => (
        <BriefingSection label="Pre-Departure" title="Travel Readiness Checklist" theme={t}>
          <TravelChecklist items={briefing.checklist} storageKey={`gladex-checklist-${slug}`} theme={t} />
        </BriefingSection>
      ),
    },
    { key: "what-to-bring", show: true, bgVariant: "luggage",
      render: (t) => <WhatToBringCarousel items={briefing.whatToBring || []} theme={t} /> },
    { key: "outfit", show: true, bgVariant: null,
      render: (t) => <OutfitGuide theme={t} /> },
    { key: "destination-guide", show: true, bgVariant: "city",
      render: (t) => <DestinationGuideSection briefing={briefing} slug={slug} theme={t} /> },
    { key: "connectivity", show: true, bgVariant: null,
      render: (t) => <ConnectivitySection briefing={briefing} theme={t} /> },
    { key: "faq", show: !!(briefing.faqs?.length > 0), bgVariant: "city",
      render: (t) => (
        <BriefingSection label="Common Questions" title="Frequently Asked Questions" theme={t}>
          <BriefingFAQ faqs={briefing.faqs} theme={t} />
        </BriefingSection>
      ),
    },
    { key: "assistance", show: !!briefing.assistanceContacts, bgVariant: null,
      render: (t) => (
        <BriefingSection label="Contact Us" title="Need Assistance?" theme={t}>
          <NeedAssistance contacts={briefing.assistanceContacts} theme={t} />
        </BriefingSection>
      ),
    },
    { key: "testimonials", show: true, bgVariant: "luggage",
      render: (t) => (
        <BriefingTestimonials theme={t} clientReview={clientReview} slug={slug} gdxReference={booking?.gdx} reviewRefreshKey={reviewRefreshKey} />
      ),
    },
    { key: "rate", show: !!(booking?.gdx), bgVariant: null,
      render: (t) => (
        <RateMyService theme={t} gdxReference={booking.gdx} destination={slug} reviewerName={booking.lead_name} onReviewSaved={handleReviewSaved} />
      ),
    },
    { key: "referral", show: true, bgVariant: "city",
      render: (t) => <ReferralSection theme={t} /> },
  ] : [];
  const visibleBriefingSections = briefingSectionDefs.filter((s) => s.show);

  return (
    <div className="briefing-page min-h-screen transition-colors duration-300" style={{ backgroundColor: bg }}>

      {/* ── NAVBAR ── */}
      <div
        className="sticky top-0 z-40 border-b px-5 lg:px-10 h-16 flex items-center justify-between shadow-sm transition-colors duration-300"
        style={{ backgroundColor: navBg, borderColor: navBorder }}
      >
        <img
          src={LOGO_URL}
          alt="Gladex"
          className="h-14 w-auto object-contain cursor-pointer transition-all duration-300 hover:scale-105"
          style={{ filter: "drop-shadow(0 0 16px rgba(255,153,19,0.5))" }}
          onClick={() => navigate("/")}
        />
      </div>

      {/* ── PREVIEW MODE BANNER ── */}
      {isPreviewMode && (
        <div
          className="flex items-center justify-center gap-3 py-2.5 px-4 text-sm font-bold tracking-wide"
          style={{ backgroundColor: "#1a0800", color: "#FF9913", borderBottom: "2px solid #FF9913" }}
        >
          <span>👁</span>
          <span>PREVIEW MODE</span>
          <span style={{ color: "#fff", fontWeight: 400 }}>—</span>
          <span>
            {activeDanangPkg?.description
              || activeHongkongPkg?.description
              || previewKey}
          </span>
          <span style={{ color: "rgba(255,153,19,0.55)", fontWeight: 400, fontSize: "0.75rem" }}>
            · No GDX required
          </span>
        </div>
      )}

      {/* ── HERO ── */}
      {dest && (
        <div
          className="relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #FF9913 0%, #FF6600 55%, #CC5500 100%)" }}
        >
          {/* Dot grid */}
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

          {/* CSS for horizontal fly animation */}
          <style>{`
            @keyframes gladex-fly-across {
              0%   { transform: translateX(-160px); opacity: 0; }
              6%   { opacity: 0.65; }
              88%  { opacity: 0.65; }
              100% { transform: translateX(calc(100vw + 160px)); opacity: 0; }
            }
            @keyframes gladex-fly-across-2 {
              0%   { transform: translateX(-160px); opacity: 0; }
              6%   { opacity: 0.35; }
              88%  { opacity: 0.35; }
              100% { transform: translateX(calc(100vw + 160px)); opacity: 0; }
            }
          `}</style>

          {/* Airplane silhouette — static large bg */}
          <motion.div
            className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none hidden md:block"
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          >
            <svg viewBox="0 0 300 260" style={{ width: 260, height: 210, opacity: 0.18 }} fill="white">
              <path d="M290,115 L192,115 L150,8 L128,8 L150,115 L52,115 L30,84 L6,84 L18,145 L6,206 L30,206 L52,175 L150,175 L128,282 L150,282 L192,175 L290,175 C290,175 316,145 290,115 Z"/>
            </svg>
          </motion.div>

          {/* Plane 1 — horizontal scroll, top lane */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "22%",
              left: 0,
              zIndex: 4,
              animation: "gladex-fly-across 11s linear 1s infinite",
            }}
          >
            <svg viewBox="0 0 300 260" style={{ width: 52, height: 44, fill: "white" }}>
              <path d="M290,115 L192,115 L150,8 L128,8 L150,115 L52,115 L30,84 L6,84 L18,145 L6,206 L30,206 L52,175 L150,175 L128,282 L150,282 L192,175 L290,175 C290,175 316,145 290,115 Z"/>
            </svg>
          </div>

          {/* Plane 2 — horizontal scroll, lower lane, delayed + smaller */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "58%",
              left: 0,
              zIndex: 4,
              animation: "gladex-fly-across-2 14s linear 5.5s infinite",
            }}
          >
            <svg viewBox="0 0 300 260" style={{ width: 36, height: 30, fill: "white" }}>
              <path d="M290,115 L192,115 L150,8 L128,8 L150,115 L52,115 L30,84 L6,84 L18,145 L6,206 L30,206 L52,175 L150,175 L128,282 L150,282 L192,175 L290,175 C290,175 316,145 290,115 Z"/>
            </svg>
          </div>

          {/* Plane 3 — circular loop animation */}
          <motion.div
            className="absolute pointer-events-none hidden sm:block"
            style={{ top: "18%", right: "22%", zIndex: 4 }}
            animate={{
              x:      [0,  32,  0, -32,   0],
              y:      [0, -16, -28, -16,   0],
              rotate: [0,  12,   0, -12,   0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.25, 0.5, 0.75, 1],
            }}
          >
            {/* Dashed ellipse trail */}
            <svg viewBox="0 0 100 70" style={{ position: "absolute", top: -20, left: -34, width: 100, height: 70, pointerEvents: "none", opacity: 0.3 }}>
              <ellipse cx="50" cy="35" rx="42" ry="22" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="5 4" />
            </svg>
            <svg viewBox="0 0 300 260" style={{ width: 38, height: 32, fill: "white", opacity: 0.6 }}>
              <path d="M290,115 L192,115 L150,8 L128,8 L150,115 L52,115 L30,84 L6,84 L18,145 L6,206 L30,206 L52,175 L150,175 L128,282 L150,282 L192,175 L290,175 C290,175 316,145 290,115 Z"/>
            </svg>
          </motion.div>

          {/* City skyline silhouette */}
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ opacity: 0.13 }}>
            <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className="w-full" style={{ height: 60 }}>
              <path fill="white" d="M0,90 V65 H40 V45 H70 V20 H95 V5 H115 V0 H135 V5 H155 V20 H175 V45 H195 V30 H215 V8 H235 V30 H255 V45 H275 V55 H295 V38 H315 V18 H335 V38 H355 V55 H375 V42 H400 V28 H420 V42 H440 V55 H460 V65 H480 V52 H500 V38 H520 V52 H540 V65 H560 V58 H580 V48 H605 V58 H625 V70 H645 V58 H665 V48 H685 V60 H705 V72 H725 V60 H745 V52 H765 V65 H785 V75 H805 V62 H825 V50 H845 V62 H865 V72 H885 V62 H905 V72 H930 V80 H950 V68 H970 V58 H990 V68 H1010 V78 H1030 V65 H1055 V72 H1075 V80 H1095 V68 H1115 V78 H1140 V84 H1160 V74 H1180 V80 H1205 V86 H1225 V76 H1250 V82 H1270 V88 H1290 V78 H1315 V84 H1340 V88 H1365 V82 H1390 V88 H1415 V90 H1440 V90 Z"/>
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 md:py-24">
            <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <p className="font-body text-xs font-bold tracking-[0.35em] uppercase mb-4" style={{ color: "rgba(255,255,255,0.7)" }}>
                Destination Briefing Guide
              </p>
              <h1 className="font-condensed font-black text-white leading-none mb-5" style={{ fontSize: "clamp(2.8rem, 8vw, 5.5rem)" }}>
                {dest.name}
              </h1>
            </motion.div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          VIEW MY TRIP BUTTON + TRAVELER DASHBOARD (collapsible)
          ══════════════════════════════════════════════════════════════════════ */}

      {/* Traveler Dashboard — shown automatically when booking is loaded */}
      <AnimatePresence>
        {booking && bookingExpanded && (
          <motion.div
            key="traveler-dashboard"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
      {booking && (() => {
        // ══════════════════════════════════════════════════════════════════════
        // HELPERS
        // ══════════════════════════════════════════════════════════════════════
        const isFusiooId = (v) => typeof v === "string" && /^i[0-9a-f]{32}$/i.test(v);

        // Strip HTML tags from a string
        const stripHtml = (v) => typeof v === "string" ? v.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() : v;

        // Format any value to a readable string, or return null to hide it
        const fmtValue = (v) => {
          if (v === null || v === undefined || v === "") return null;
          // Array: flatten, clean each item, join
          if (Array.isArray(v)) {
            const items = v.map(fmtValue).filter(Boolean);
            return items.length ? items.join(", ") : null;
          }
          // Object: probably a Fusioo nested record stub
          if (typeof v === "object") return null;
          const s = stripHtml(String(v)).trim();
          if (!s || isFusiooId(s)) return null;
          return s;
        };

        // Format ISO date → "June 4, 2026"
        const fmtDate = (v) => {
          if (!v) return null;
          const raw = fmtValue(v);
          if (!raw) return null;
          try {
            const d = new Date(raw);
            if (!isNaN(d) && raw.includes("-")) return d.toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" });
          } catch {}
          return raw;
        };

        // Format currency → ₱12,345.00
        const fmtCurrency = (v) => {
          const raw = fmtValue(v);
          if (!raw) return null;
          const n = parseFloat(String(raw).replace(/,/g, ""));
          if (isNaN(n)) return raw;
          return `₱${n.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        };

        // ── Status / payment logic ─────────────────────────────────────────────
        const paymentRaw   = fmtValue(booking.formula_1) || fmtValue(booking.payment_type);
        const paymentLabel = paymentRaw || null;
        const paymentColor = paymentRaw?.toLowerCase().includes("full")    ? "#22C55E"
                           : paymentRaw?.toLowerCase().includes("partial") ? ORANGE
                           : paymentRaw?.toLowerCase().includes("pend")    ? "#EF4444"
                           : textSecondary;
        const paymentBg    = paymentRaw?.toLowerCase().includes("full")    ? (isDark ? "rgba(34,197,94,0.12)"  : "#F0FFF4")
                           : paymentRaw?.toLowerCase().includes("partial") ? (isDark ? "rgba(255,153,19,0.12)"  : "#FFF8F0")
                           : paymentRaw?.toLowerCase().includes("pend")    ? (isDark ? "rgba(239,68,68,0.12)"  : "#FFF5F5")
                           : (isDark ? "rgba(255,255,255,0.05)" : "#F5F5F5");
        const statusLabel  = fmtValue(booking.status) || "Confirmed";
        const statusColor  = statusLabel?.toLowerCase().includes("process") || statusLabel?.toLowerCase().includes("confirm")
          ? "#22C55E" : ORANGE;

        // ══════════════════════════════════════════════════════════════════════
        // SECTION DEFINITIONS
        // Each section has: title, icon, fields[]
        // Fields with null values are automatically hidden.
        // ══════════════════════════════════════════════════════════════════════
        const sections = [
          // ── 1. Booking Summary ──────────────────────────────────────────────
          {
            title: "Booking Summary",
            icon: <BadgeCheck className="w-4 h-4" />,
            fields: [
              { label: "GDX Number",       value: fmtValue(booking.gdx) },
              { label: "Status",           value: fmtValue(booking.status) },
              { label: "Payment Status",   value: paymentLabel },
              { label: "Transaction Type", value: fmtValue(booking.transaction_type) },
              { label: "Booking Date",     value: fmtDate(booking.date_created) || fmtDate(booking.created) },
              { label: "Last Modified",    value: fmtDate(booking.last_modified) },
            ],
          },

          // ── 2. Traveler Information ─────────────────────────────────────────
          {
            title: "Traveler Information",
            icon: <User className="w-4 h-4" />,
            fields: [
              { label: "Lead Guest",   value: fmtValue(booking.lead_name) || fmtValue(booking.facebook_name) },
              { label: "Total Guests", value: fmtValue(booking.total_number_of_guests) || fmtValue(booking.no_of_person) },
              { label: "Guest Names",  value: fmtValue(booking.name_of_guests) },
              { label: "Email",        value: fmtValue(booking.email_1) },
              { label: "Mobile",       value: fmtValue(booking.mobile_1) },
            ],
          },

          // ── 3. Travel Information ───────────────────────────────────────────
          {
            title: "Travel Information",
            icon: <MapPin className="w-4 h-4" />,
            fields: [
              { label: "Destination",    value: fmtValue(booking.destinationName) || fmtValue(booking.destination) },
              { label: "Travel Date",    value: fmtDate(booking.travel_date) },
              { label: "Arrival Date",   value: fmtDate(booking.arrivalDate) || fmtDate(booking.arrival_date) },
              { label: "Departure Date", value: fmtDate(booking.departureDate) || fmtDate(booking.departure_date) },
              { label: "Duration",       value: fmtValue(booking.duration) },
            ],
          },

          // ── 4. Accommodation ────────────────────────────────────────────────
          {
            title: "Accommodation",
            icon: <Briefcase className="w-4 h-4" />,
            fields: [
              { label: "Hotel",              value: fmtValue(booking.hotelName) || fmtValue(booking.hotel_name) },
              { label: "Room Type",          value: fmtValue(booking.room_type) },
              { label: "Check-in",           value: fmtDate(booking.check_in) || fmtDate(booking.checkin) },
              { label: "Check-out",          value: fmtDate(booking.check_out) || fmtDate(booking.checkout) },
              { label: "Nights",             value: fmtValue(booking.number_of_nights) },
              { label: "Confirmation No.",   value: fmtValue(booking.hotel_confirmation) || fmtValue(booking.hotel_booking_details) },
            ],
          },

          // ── 5. Flight Information ───────────────────────────────────────────
          {
            title: "Flight Information",
            icon: <Plane className="w-4 h-4" />,
            fields: [
              { label: "Airline",           value: fmtValue(booking.airlineName) || fmtValue(booking.name_of_airline) },
              { label: "PNR / Booking Ref", value: fmtValue(booking.pnr) },
              { label: "Departing Flight",  value: fmtValue(booking.flightDeparture) },
              { label: "Return Flight",     value: fmtValue(booking.flightReturn) },
            ],
          },

          // ── 6. Tour Information ─────────────────────────────────────────────
          {
            title: "Tour Information",
            icon: <MapPin className="w-4 h-4" />,
            fields: [
              { label: "Tour",        value: fmtValue(booking.tourName) },
              { label: "Tour Date",   value: fmtDate(booking.tourDate) },
              { label: "Description", value: fmtValue(booking.tourDescription) },
              { label: "Operator",    value: fmtValue(booking.tour_operator) },
            ],
          },

          // ── 7. Transfer Information ─────────────────────────────────────────
          {
            title: "Transfer Information",
            icon: <Briefcase className="w-4 h-4" />,
            fields: [
              { label: "Transfer Details",   value: fmtValue(booking.transferInfo) },
              { label: "Transfer Provider",  value: fmtValue(booking.transfer_provider) },
              { label: "Confirmation No.",   value: fmtValue(booking.transfer_confirmation) || fmtValue(booking.transferConfirmation) },
            ],
          },

          // ── 9. Agent Information ────────────────────────────────────────────
          {
            title: "Agent Information",
            icon: <UserCheck className="w-4 h-4" />,
            fields: [
              { label: "Travel Consultant", value: fmtValue(booking.name_of_agent) || fmtValue(booking.name_of_agent_1) || fmtValue(booking.agent_name) },
              { label: "Agent Team",        value: fmtValue(booking.agent) },
            ],
          },
        ];

        // ── Filter out empty fields and empty sections ──────────────────────
        const activeSections = sections
          .map((s) => ({ ...s, fields: s.fields.filter((f) => f.value) }))
          .filter((s) => s.fields.length > 0);

        // ── Track which keys were displayed ────────────────────────────────
        const DISPLAYED_KEYS = new Set([
          // Booking Summary
          "gdx","status","formula_1","payment_type","transaction_type",
          "date_created","created","last_modified",
          // Traveler
          "lead_name","facebook_name","name_of_guests","total_number_of_guests","no_of_person",
          "email_1","mobile_1",
          // Travel
          "destinationName","destination","travel_date",
          "arrivalDate","arrival_date","departureDate","departure_date","duration",
          // Accommodation
          "hotelName","hotel_name","room_type","check_in","checkin","check_out","checkout","number_of_nights",
          // Flight
          "airlineName","name_of_airline","pnr","flightDeparture","flightReturn","flightCost","airline_cost",
          // Tour
          "tourName","tourDate","tourDescription","tour_operator",
          // Transfer
          "transferInfo","transfer_provider","transfer_details",
          // Payment
          "total_package_price_srp","total_amount_paid","amountPaid","remainingBalance","refundAmount",
          "total_cost","total_land_arrangement_cost","total_visa_cost",
          // Agent
          "name_of_agent","name_of_agent_1","agent_name","agent",
        ]);

        // Internal/system keys that should never be shown to the user
        const HIDDEN_KEYS = new Set([
          "id","dashboard_id","record_id","received_at","source_at","source_ip",
          "webhook_source","record_url","app_id","created_by","last_modified_by",
          "voucher","initial_voucher","automated_voucher",
          "itinerary","travel_itinerary","itinerary_file",
          "attachements","attachments","_raw",
          // Raw Fusioo linked-record ID arrays (resolved versions are in DISPLAYED_KEYS)
          "airline_details_1","tour_details",
        ]);

        // ── Build fallback "Additional" fields ─────────────────────────────
        const additionalFields = Object.entries(booking)
          .filter(([k, v]) => {
            if (DISPLAYED_KEYS.has(k) || HIDDEN_KEYS.has(k)) return false;
            const formatted = fmtValue(v);
            return formatted && formatted.length > 0;
          })
          .map(([k, v]) => ({
            label: k.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
            value: fmtValue(v),
          }))
          .filter((f) => f.value);

        // ── Console audit ─────────────────────────────────────────────────
        const displayedFields = activeSections.flatMap((s) => s.fields.map((f) => f.label));
        const hiddenFields    = Object.keys(booking).filter((k) => !DISPLAYED_KEYS.has(k) && !HIDDEN_KEYS.has(k));
        console.log("[BOOKING AUDIT] Full booking object", booking);
        console.log("[BOOKING AUDIT] Displayed fields", displayedFields);
        console.log("[BOOKING AUDIT] Additional fields found", hiddenFields);

        return (
          <div
            className="px-4 lg:px-8 py-10 transition-colors duration-300"
            style={{ backgroundColor: bg }}
          >
            <div className="max-w-[1500px] mx-auto space-y-5">

              {/* ── WELCOME HERO ──────────────────────────────────────────── */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="rounded-3xl overflow-hidden relative"
                style={{
                  background: isDark
                    ? "linear-gradient(135deg, #2A1000 0%, #1A0800 60%, #0F0500 100%)"
                    : "linear-gradient(135deg, #FF9913 0%, #FF6A00 60%, #E05A00 100%)",
                  boxShadow: isDark
                    ? "0 0 60px rgba(255,153,19,0.15), 0 4px 20px rgba(0,0,0,0.5)"
                    : "0 8px 40px rgba(255,153,19,0.35)",
                }}
              >
                {isDark && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(255,153,19,0.22) 0%, transparent 70%)" }}
                  />
                )}
                <div className="relative px-6 py-8 sm:px-10 sm:py-10">
                  {/* Confirmed badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="inline-flex items-center gap-1.5 font-body text-[11px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full"
                      style={{ backgroundColor: "rgba(34,197,94,0.2)", color: isDark ? "#4ADE80" : "#FFFFFF", border: "1px solid rgba(34,197,94,0.4)" }}
                    >
                      <Check className="w-3 h-3" strokeWidth={3} /> Trip Confirmed
                    </span>
                  </div>

                  {/* Headline */}
                  <h2
                    className="font-condensed font-black text-3xl sm:text-4xl lg:text-5xl leading-tight mb-2"
                    style={{ color: isDark ? ORANGE : "#FFFFFF" }}
                  >
                    Your Trip Is Confirmed! 🧡
                  </h2>
                  <p
                    className="font-body text-base sm:text-lg mb-6 leading-relaxed"
                    style={{ color: isDark ? "rgba(255,200,100,0.8)" : "rgba(255,255,255,0.88)" }}
                  >
                    {`Hi ${fmtValue(booking.lead_name || booking.facebook_name) || "Traveler"}! Your ${fmtValue(booking.destinationName || booking.destination) || "trip"} is all set.`}
                  </p>

                  {/* Trip stats grid */}
                  {(() => {
                    const stats = [
                      fmtValue(booking.lead_name || booking.facebook_name) ? { icon: "👤", label: "Lead Name", value: fmtValue(booking.lead_name || booking.facebook_name) } : null,
                      (fmtValue(booking.total_number_of_guests) || fmtValue(booking.no_of_person)) ? { icon: "👥", label: "No. of Pax", value: `${fmtValue(booking.total_number_of_guests) || fmtValue(booking.no_of_person)} pax` } : null,
                      fmtValue(booking.gdx) ? { icon: "🔖", label: "GDX Number", value: fmtValue(booking.gdx) } : null,
                      fmtValue(booking.destinationName || booking.destination) ? { icon: "🌏", label: "Destination", value: fmtValue(booking.destinationName || booking.destination) } : null,
                      (fmtDate(booking.travel_date) || fmtDate(booking.arrivalDate || booking.arrival_date)) ? { icon: "📅", label: "Travel Date", value: fmtDate(booking.travel_date) || fmtDate(booking.arrivalDate || booking.arrival_date) } : null,
                      fmtValue(booking.hotelName || booking.hotel_name) ? { icon: "🏨", label: "Hotel", value: fmtValue(booking.hotelName || booking.hotel_name) } : null,
                    ].filter(Boolean);
                    return stats.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                        {stats.map((stat, idx) => (
                          <div
                            key={idx}
                            className="rounded-xl px-3.5 py-3"
                            style={{ backgroundColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.22)" }}
                          >
                            <p className="font-body text-[11px] mb-1" style={{ color: isDark ? "rgba(255,200,100,0.55)" : "rgba(255,255,255,0.7)" }}>
                              {stat.icon} {stat.label}
                            </p>
                            <p className="font-body text-sm font-bold leading-snug" style={{ color: isDark ? "rgba(255,200,100,0.9)" : "#FFFFFF" }}>
                              {stat.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : null;
                  })()}

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-2.5">
                    {voucherDoc?.status === "url" && voucherDoc.url && (
                      <a
                        href={voucherDoc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-body font-bold text-sm px-4 py-2.5 rounded-xl transition-all hover:opacity-90 active:scale-95"
                        style={{ backgroundColor: isDark ? ORANGE : "#FFFFFF", color: isDark ? "#080808" : ORANGE }}
                      >
                        <Download className="w-4 h-4" /> View Your Voucher
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* ── BOOKING DETAILS CARD ──────────────────────────────────── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl overflow-hidden"
                style={{
                  border: `1.5px solid ${ORANGE}`,
                  boxShadow: isDark
                    ? "0 0 50px rgba(255,153,19,0.10), 0 2px 16px rgba(0,0,0,0.5)"
                    : "0 4px 30px rgba(255,153,19,0.12), 0 1px 8px rgba(0,0,0,0.06)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  backgroundColor: bgCard,
                }}
              >
                {/* ── Summary bar ────────────────────────────────────────── */}
                <div
                  className="px-6 py-5 border-b"
                  style={{
                    borderColor: border,
                    background: isDark
                      ? "linear-gradient(135deg, #1A0A00 0%, #120800 100%)"
                      : "linear-gradient(135deg, #FFF8F0 0%, #FFF3E0 100%)",
                  }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    {/* Left */}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="inline-flex items-center gap-1.5 font-body text-[11px] font-bold tracking-[0.25em] uppercase px-2.5 py-1 rounded-full"
                          style={{ backgroundColor: "rgba(34,197,94,0.15)", color: "#22C55E", border: "1px solid rgba(34,197,94,0.35)" }}
                        >
                          <Check className="w-3 h-3" strokeWidth={3} /> Booking Verified
                        </span>
                      </div>
                      <h3 className="font-condensed font-black text-xl lg:text-2xl tracking-wide leading-tight" style={{ color: textPrimary }}>
                        Your Booking Details
                      </h3>
                      <p className="font-body text-xs mt-1" style={{ color: textSecondary }}>
                        Retrieved from your GDX booking record
                      </p>
                    </div>
                    {/* Right — status badges */}
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-body font-bold text-xs"
                        style={{ backgroundColor: isDark ? "rgba(34,197,94,0.12)" : "#F0FFF4", color: statusColor, border: `1.5px solid ${statusColor}` }}
                      >
                        <Check className="w-3 h-3" strokeWidth={3} />
                        {statusLabel}
                      </span>
                      {paymentLabel && (
                        <span
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-body font-bold text-xs"
                          style={{ backgroundColor: paymentBg, color: paymentColor, border: `1.5px solid ${paymentColor}` }}
                        >
                          {paymentLabel}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* ── Sectioned fields ───────────────────────────────────── */}
                {activeSections.map((section, si) => (
                  <div key={section.title}>
                    {/* Section divider header */}
                    <div
                      className="flex items-center gap-2 px-5 py-2.5 border-b"
                      style={{ borderColor: border, backgroundColor: isDark ? "rgba(255,153,19,0.04)" : "rgba(255,153,19,0.03)" }}
                    >
                      <span style={{ color: ORANGE }}>{section.icon}</span>
                      <p className="font-body text-xs font-bold uppercase tracking-[0.25em]" style={{ color: ORANGE }}>
                        {section.title}
                      </p>
                    </div>
                    {/* Fields two-column grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2">
                      {section.fields.map((f, i) => (
                        <motion.div
                          key={f.label}
                          initial={{ opacity: 0, x: -4 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.25, delay: 0.03 * (si * 4 + i) }}
                          className={`group flex items-start gap-3 px-5 py-3.5 border-b transition-colors duration-150${i % 2 === 0 ? " sm:border-r" : ""}`}
                          style={{
                            borderColor: border,
                            backgroundColor: "transparent",
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = isDark ? "rgba(255,153,19,0.04)" : "rgba(255,153,19,0.03)"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                        >
                          <div className="min-w-0">
                            <p className="font-body text-xs font-bold uppercase tracking-[0.2em] mb-0.5" style={{ color: textSecondary }}>
                              {f.label}
                            </p>
                            <p className="font-body text-base font-semibold break-words leading-snug" style={{ color: textPrimary }}>
                              {f.value}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* ── TRAVEL DOCUMENTS — always visible inside booking card ── */}
                <div>
                  <div
                    className="flex items-center gap-2 px-5 py-2.5 border-b"
                    style={{ borderColor: border, backgroundColor: isDark ? "rgba(255,153,19,0.04)" : "rgba(255,153,19,0.03)" }}
                  >
                    <FileText className="w-4 h-4" style={{ color: ORANGE }} />
                    <p className="font-body text-xs font-bold uppercase tracking-[0.25em]" style={{ color: ORANGE }}>
                      Travel Documents
                    </p>
                  </div>
                  <div className="px-5 py-4 flex flex-wrap gap-3">



                  </div>
                </div>

              </motion.div>

            </div>
          </div>
        );
      })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── VIDEO SECTION ── */}
      {dest && (
      <div className="relative overflow-hidden" style={{ backgroundColor: "#111111" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(255,153,19,0.1) 0%, transparent 65%)" }} />
        <div className="w-full px-6 lg:px-12 xl:px-20 py-16 md:py-20 relative z-10 flex flex-col items-center">

          {/* Text — centered */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: ORANGE }}>
              Important Reminder For You
            </p>
            <h2 className="font-condensed font-black text-white leading-tight mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}>
              Watch Before You Travel
            </h2>
            <p className="font-body text-sm lg:text-base leading-relaxed max-w-sm mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
              A quick video to help you prepare, know the essentials, and enjoy a smooth trip!
            </p>
            {/* Decorative flight path */}
            <div className="mt-6 flex items-center justify-center gap-2" style={{ opacity: 0.35 }}>
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ORANGE }} />
              <div className="w-24 border-t-2 border-dashed" style={{ borderColor: ORANGE }} />
              <Plane className="w-5 h-5 -rotate-45" style={{ color: ORANGE }} />
              <div className="w-24 border-t-2 border-dashed" style={{ borderColor: ORANGE }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ORANGE }} />
            </div>
          </motion.div>

          {/* Video — centered */}
          <motion.div
            className="flex justify-center w-full"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {dest.videoUrl ? (
              <BriefingVideo videoUrl={dest.videoUrl} name={dest.name} />
            ) : (
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#111] w-full"
                style={{ maxWidth: 360, aspectRatio: "9/16" }}
              >
                <img src={dest.heroImage} alt={dest.name} className="absolute inset-0 w-full h-full object-cover opacity-30" />
                <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 rounded-full animate-ping" style={{ background: "rgba(255,153,19,0.2)" }} />
                    <div
                      className="relative w-20 h-20 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}
                    >
                      <Play className="w-8 h-8 text-white/70 ml-1" />
                    </div>
                  </div>
                  <h3 className="font-condensed font-black text-white text-2xl mb-3">Briefing Video Coming Soon</h3>
                  <p className="font-body text-gray-400 text-sm max-w-xs leading-relaxed mb-7">
                    We're preparing the official travel briefing video for {dest.name}.
                  </p>
                  <div
                    className="px-7 py-3 rounded-full border text-xs font-bold tracking-[0.25em] uppercase"
                    style={{ borderColor: ORANGE, color: ORANGE, background: "rgba(255,153,19,0.05)" }}
                  >
                    + Stay Tuned
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

        </div>
      </div>
      )}

      {/* ── Da Nang Package Selector ── */}
      {isDanangPrivate && (
        <div style={{ backgroundColor: "#FFFFFF" }} className="py-10 px-4 border-b border-gray-100">
          <div className="w-full px-6 lg:px-12 xl:px-20">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-center mb-1" style={{ color: "#FF9913" }}>
              Your Package
            </p>
            <h3 className="font-condensed font-black text-[#111] text-2xl text-center mb-1">
              Select Your Package
            </h3>
            <p className="text-xs text-center mb-6" style={{ color: "#888" }}>
              {autoDetectedDanangPkg && !selectedDanangKey
                ? "Auto-selected based on your booking — tap to switch"
                : "Tap your package to view the correct briefing"}
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              {DANANG_PACKAGES.map((dpkg) => {
                const isActive = activeDanangPkg?.key === dpkg.key;
                return (
                  <button
                    key={dpkg.key}
                    onClick={() => setSelectedDanangKey(dpkg.key)}
                    className="px-7 py-4 rounded-2xl transition-all active:scale-95 text-center min-w-[120px]"
                    style={
                      isActive
                        ? { backgroundColor: "#FF9913", color: "#fff", border: "2px solid #FF9913", boxShadow: "0 4px 16px rgba(255,153,19,0.3)" }
                        : { backgroundColor: "#F9F7F5", color: "#333", border: "2px solid #E5E7EB" }
                    }
                  >
                    <span className="font-condensed font-black text-2xl block">{dpkg.shortLabel}</span>
                    <span className="block text-xs font-medium mt-0.5" style={{ opacity: isActive ? 0.85 : 0.6 }}>
                      {dpkg.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Hong Kong Package Selector ── */}
      {isHongkongPrivate && (
        <div style={{ backgroundColor: "#FFFFFF" }} className="py-10 px-4 border-b border-gray-100">
          <div className="w-full px-6 lg:px-12 xl:px-20">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-center mb-1" style={{ color: "#FF9913" }}>
              Your Package
            </p>
            <h3 className="font-condensed font-black text-[#111] text-2xl text-center mb-1">
              Select Your Package
            </h3>
            <p className="text-xs text-center mb-6" style={{ color: "#888" }}>
              {autoDetectedHongkongPkg && !selectedHongkongKey
                ? "Auto-selected based on your booking — tap to switch"
                : "Tap your package to view the correct briefing"}
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              {HONGKONG_PACKAGES.map((hpkg) => {
                const isActive = activeHongkongPkg?.key === hpkg.key;
                return (
                  <button
                    key={hpkg.key}
                    onClick={() => setSelectedHongkongKey(hpkg.key)}
                    className="px-7 py-4 rounded-2xl transition-all active:scale-95 text-center min-w-[120px]"
                    style={
                      isActive
                        ? { backgroundColor: "#FF9913", color: "#fff", border: "2px solid #FF9913", boxShadow: "0 4px 16px rgba(255,153,19,0.3)" }
                        : { backgroundColor: "#F9F7F5", color: "#333", border: "2px solid #E5E7EB" }
                    }
                  >
                    <span className="font-condensed font-black text-2xl block">{hpkg.shortLabel}</span>
                    <span className="block text-xs font-medium mt-0.5" style={{ opacity: isActive ? 0.85 : 0.6 }}>
                      {hpkg.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Beijing Package Selector ── */}
      {isBeijing && (
        <div style={{ backgroundColor: "#FFFFFF" }} className="py-10 px-4 border-b border-gray-100">
          <div className="w-full px-6 lg:px-12 xl:px-20">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-center mb-1" style={{ color: "#FF9913" }}>
              Your Package
            </p>
            <h3 className="font-condensed font-black text-[#111] text-2xl text-center mb-1">
              Select Your Package
            </h3>
            <p className="text-xs text-center mb-6" style={{ color: "#888" }}>
              {autoDetectedBeijingPkg && !selectedBeijingKey
                ? "Auto-selected based on your booking — tap to switch"
                : "Tap your package to view the correct briefing"}
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              {BEIJING_PACKAGES.map((bpkg) => {
                const isActive = activeBeijingPkg?.key === bpkg.key;
                return (
                  <button
                    key={bpkg.key}
                    onClick={() => setSelectedBeijingKey(bpkg.key)}
                    className="px-7 py-4 rounded-2xl transition-all active:scale-95 text-center min-w-[120px]"
                    style={
                      isActive
                        ? { backgroundColor: "#FF9913", color: "#fff", border: "2px solid #FF9913", boxShadow: "0 4px 16px rgba(255,153,19,0.3)" }
                        : { backgroundColor: "#F9F7F5", color: "#333", border: "2px solid #E5E7EB" }
                    }
                  >
                    <span className="font-condensed font-black text-2xl block">{bpkg.shortLabel}</span>
                    <span className="block text-xs font-medium mt-0.5" style={{ opacity: isActive ? 0.85 : 0.6 }}>
                      {bpkg.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          BRIEFING SECTIONS — true alternating DARK / ORANGE backgrounds
          Index 0 = DARK, 1 = ORANGE, 2 = DARK … regardless of which
          conditional sections are visible.
          ══════════════════════════════════════════════════════════════════════ */}
      {briefing && (
        <div className="transition-colors duration-300">

          {/* Contact Panel + Emergency Numbers — fixed ORANGE (outside alternation) */}
          <div data-theme="orange" style={{ backgroundColor: "#FF9913" }}>
            <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-8 sm:py-12">
              <div className="space-y-8">
                <SectionErrorBoundary>
                  <ContactPanel briefing={briefing} booking={booking} theme={orangeTheme} />
                </SectionErrorBoundary>
                <SectionErrorBoundary>
                  <EmergencyContactsSection briefing={briefing} theme={orangeTheme} />
                </SectionErrorBoundary>
              </div>
            </div>
          </div>

          {visibleBriefingSections.map((section, i) => {
            const isOrange = i % 2 === 1;
            const t = isOrange ? orangeTheme : theme;
            return (
              <SectionErrorBoundary key={section.key}>
                {isOrange ? (
                  <div data-theme="orange" style={{ backgroundColor: "#FF9913" }}>
                    <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-8 sm:py-12 lg:py-16">
                      {section.render(t)}
                    </div>
                  </div>
                ) : (
                  <div className="relative overflow-hidden" style={{ backgroundColor: CARD_BG }}>
                    <TravelCardBg variant={section.bgVariant || "city"} />
                    <div className="relative w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-8 sm:py-12 lg:py-16" style={{ zIndex: 1 }}>
                      {section.render(t)}
                    </div>
                  </div>
                )}
              </SectionErrorBoundary>
            );
          })}

        </div>
      )}

      <ScrollControls />

      {/* ── BOOKING MODAL ── */}
      <AnimatePresence>
        {bookingModalTour && (
          <TourBookingModal
            key={bookingModalTour.id}
            tour={bookingModalTour}
            theme={theme}
            onClose={() => setBookingModalTour(null)}
            onConfirm={handleBookingConfirm}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DestinationPreview() {
  return (
    <PageErrorBoundary>
      <ThemeProvider>
        <PreviewContent />
      </ThemeProvider>
    </PageErrorBoundary>
  );
}
