import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, MapPin } from "lucide-react";
import { useState } from "react";
import { getDestinationBySlug } from "../data/destinations";
import { ThemeProvider, useTheme } from "../lib/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";
import ThingsToDoSection from "../components/ThingsToDoSection";
import { getActivitiesForDestination } from "../data/activitiesData";

const LOGO_URL = "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/5ecc9b2cd_Untitled-design-75.png";
const ORANGE = "#FF8C00";

function PreviewContent() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const dest = getDestinationBySlug(slug);

  const bg = isDark ? "#111111" : "#F5F5F5";
  const bgCard = isDark ? "#1A1A1A" : "#FFFFFF";
  const bgAlt = isDark ? "#161616" : "#F0F0F0";
  const border = isDark ? "#2A2A2A" : "#E5E5E5";
  const textPrimary = isDark ? "#FFFFFF" : "#111111";
  const textSecondary = isDark ? "#A0A0A0" : "#555555";
  const navBg = isDark ? "#0D0D0D" : "#FFFFFF";
  const navBorder = isDark ? "#222222" : "#E5E5E5";

  const activitiesData = getActivitiesForDestination(slug);

  if (!dest) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="font-condensed text-2xl font-bold text-gray-400 mb-4">Destination not found</p>
          <button onClick={() => navigate("/")} className="font-body text-sm underline" style={{ color: ORANGE }}>← Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: bg }}>
      <ThemeToggle />

      {/* Navbar */}
      <div
        className="sticky top-0 z-40 border-b px-5 lg:px-10 h-16 flex items-center justify-between shadow-sm transition-colors duration-300"
        style={{ backgroundColor: navBg, borderColor: navBorder }}
      >
        <img
          src={LOGO_URL}
          alt="Gladex"
          className="h-14 w-auto object-contain cursor-pointer transition-all duration-300 hover:scale-105"
          style={{ filter: "drop-shadow(0 0 16px rgba(255,140,0,0.5))" }}
          onClick={() => navigate("/")}
        />
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ height: "60vh", minHeight: 340 }}>
        <img src={dest.heroImage} alt={dest.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
        <div className="absolute bottom-8 left-0 right-0 text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <h1 className="font-condensed font-black text-white text-4xl lg:text-6xl tracking-wide mb-2">{dest.name}</h1>
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <MapPin className="w-4 h-4" style={{ color: ORANGE }} />
              <span className="font-body text-white/80 text-sm">{dest.country}</span>
            </div>
            <p className="font-body text-white/70 text-sm max-w-md mx-auto">{dest.tagline}</p>
          </motion.div>
        </div>
      </div>

      {/* ── PORTRAIT VIDEO SECTION ── */}
      <div className="bg-black py-16 px-4 lg:px-10 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: "radial-gradient(circle at center, rgba(255,140,0,0.18) 0%, transparent 70%)" }}
        />

        <div className="max-w-4xl mx-auto text-center mb-8 relative z-10">
          <p className="text-xs font-bold tracking-[0.3em] uppercase mb-2" style={{ color: ORANGE }}>Destination Briefing Video</p>
          <h2 className="font-condensed font-black text-white text-3xl lg:text-4xl">
            Watch Before You Travel
          </h2>
          <p className="text-white/60 text-sm mt-2 max-w-md mx-auto">
            Your official travel briefing video — watch to prepare for your upcoming trip.
          </p>
        </div>

        {/* Portrait video container — centered, max width ~360px on desktop */}
        <div className="relative z-10 flex justify-center">
          {dest.videoUrl ? (
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl w-full"
              style={{
                maxWidth: 360,
                aspectRatio: "9/16",
                background: "linear-gradient(to bottom, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
              }}
            >
              <iframe
                src={dest.videoUrl}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; fullscreen"
                allowFullScreen
                style={{ backgroundColor: "#000", border: "none" }}
              />
              {/* Label */}
              <div className="absolute top-4 left-4 pointer-events-none">
                <div
                  className="px-3 py-1.5 rounded-full text-[10px] font-bold tracking-[0.25em] uppercase backdrop-blur-md border"
                  style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.15)", color: "#fff" }}
                >
                  Travel Briefing
                </div>
              </div>
            </motion.div>
          ) : (
            /* No video — portrait placeholder */
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#111] w-full"
              style={{ maxWidth: 360, aspectRatio: "9/16" }}
            >
              <img
                src={dest.heroImage}
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                <div className="relative mb-6">
                  <div className="absolute inset-0 rounded-full animate-ping" style={{ background: "rgba(255,140,0,0.2)" }} />
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
                  style={{ borderColor: ORANGE, color: ORANGE, background: "rgba(255,140,0,0.05)" }}
                >
                  + Stay Tuned
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* ── THINGS TO DO SECTION ── */}
      <div id="things-to-do-section" className="py-12 px-4 lg:px-10 transition-colors duration-300 font-body" style={{ backgroundColor: isDark ? "#111111" : "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto">
          <ThingsToDoSection
            isDark={isDark}
            textPrimary={textPrimary}
            textSecondary={textSecondary}
            border={border}
            bgCard={bgCard}
            bgAlt={bgAlt}
            activitiesData={activitiesData}
          />
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="py-12 px-4 border-t transition-colors duration-300" style={{ backgroundColor: bgAlt, borderColor: border }}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 font-body font-semibold text-sm px-6 py-3 rounded-full border transition-all hover:opacity-80"
            style={{ borderColor: border, color: textPrimary, backgroundColor: bgCard }}
          >
            ← Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 font-body font-bold text-sm px-8 py-3.5 rounded-full text-white transition-all hover:opacity-90"
            style={{ backgroundColor: ORANGE }}
          >
            All Destinations
          </button>
          <button
            onClick={() => navigate(`/tour-packages/${slug}`)}
            className="inline-flex items-center gap-2 font-body font-semibold text-sm px-6 py-3 rounded-full border transition-all hover:opacity-80"
            style={{ borderColor: ORANGE, color: ORANGE }}
          >
            View Full Guide →
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DestinationPreview() {
  return (
    <ThemeProvider>
      <PreviewContent />
    </ThemeProvider>
  );
}