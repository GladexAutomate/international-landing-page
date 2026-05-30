import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Play, MapPin, ChevronDown, ChevronUp,
  Plane, Hotel, Coffee, Map, Users, Briefcase, Bus, Ticket,
  AlertTriangle, CheckCircle, XCircle, Info, Tag } from
"lucide-react";
import { useState } from "react";
import { getDestinationBySlug } from "../data/destinations";
import { ThemeProvider, useTheme } from "../lib/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";

const LOGO_URL = "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/5ecc9b2cd_Untitled-design-75.png";
const ORANGE = "#FF8C00";

function SectionLabel({ text }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-3">
      <div className="h-px w-8 hidden" style={{ backgroundColor: ORANGE }} />
      <span className="font-body text-[10px] font-bold tracking-[0.4em] uppercase hidden" style={{ color: ORANGE }}>{text}</span>
      <div className="h-px w-8 hidden" style={{ backgroundColor: ORANGE }} />
    </div>);

}

function AccordionItem({ title, children, accent = false }) {
  const [open, setOpen] = useState(false);
  const { isDark } = useTheme();
  const bgCard = isDark ? "#1A1A1A" : "#FFFFFF";
  const bgOpen = isDark ? "#1C1500" : "#FFF8F0";
  const borderColor = isDark ? "#2A2A2A" : "#E5E5E5";
  const borderOpen = isDark ? "#3A2800" : "#F0E8DC";
  const textColor = isDark ? "#CCCCCC" : "#444444";

  return (
    <div className="rounded-xl overflow-hidden mb-3 border transition-colors duration-300" style={{ borderColor }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors"
        style={{ backgroundColor: open ? bgOpen : bgCard }}>
        
        <span className="font-body font-semibold text-sm" style={{ color: accent && open ? ORANGE : isDark ? "#FFFFFF" : "#1A1A1A" }}>{title}</span>
        {open ? <ChevronUp className="w-4 h-4" style={{ color: ORANGE }} /> : <ChevronDown className="w-4 h-4" style={{ color: isDark ? "#666" : "#aaa" }} />}
      </button>
      <AnimatePresence>
        {open &&
        <motion.div
          initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }} className="overflow-hidden">
          
            <div className="px-5 py-4 text-sm font-body leading-relaxed border-t transition-colors duration-300" style={{ borderColor: borderOpen, color: textColor, backgroundColor: bgCard }}>
              {children}
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}

function HotelRatesTable({ category }) {
  const rates = category.rates;
  const entries = Object.entries(rates).filter(([k]) => k !== "downpayment");
  const labels = {
    twin: "Twin", triple: "Triple", quad: "Quad", solo: "Solo",
    childNoBed: "Child No Bed", singleSupplement: "Single Supp.",
    "2pax": "2 Pax", "3pax": "3 Pax", "4pax": "4 Pax", "5pax": "5 Pax",
    "6pax": "6 Pax", "7pax": "7 Pax", "8pax": "8 Pax", "9pax": "9 Pax"
  };
  return (
    <div className="mt-2 overflow-x-auto">
      <table className="w-full text-xs font-body">
        <thead>
          <tr style={{ backgroundColor: "#FFF5E9" }}>
            {entries.map(([k]) =>
            <th key={k} className="px-3 py-2 text-left font-semibold" style={{ color: ORANGE }}>{labels[k] || k}</th>
            )}
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-gray-100">
            {entries.map(([k, v]) =>
            <td key={k} className="px-3 py-2 font-semibold text-gray-800">
                {typeof v === "number" ? `PHP ${v.toLocaleString()}` : v}
              </td>
            )}
          </tr>
        </tbody>
      </table>
      {category.peakSurcharge &&
      <p className="mt-1 text-xs text-amber-600 flex items-start gap-1 px-1">
          <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0" /> {category.peakSurcharge}
        </p>
      }
      {rates.downpayment &&
      <p className="mt-1 text-xs font-semibold px-1" style={{ color: ORANGE }}>
          Downpayment: PHP {rates.downpayment.toLocaleString()}
        </p>
      }
    </div>);

}

function VideoPlaceholder({ name }) {
  return (
    <div className="rounded-2xl flex flex-col items-center justify-center border" style={{ aspectRatio: "16/9", backgroundColor: "#111", borderColor: "rgba(255,255,255,0.1)" }}>
      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5" style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
        <Play className="w-7 h-7 text-white/50" />
      </div>
      <p className="font-condensed font-bold text-white text-lg mb-2">Official Travel Preview Coming Soon</p>
      <p className="font-body text-gray-500 text-sm text-center max-w-xs">We're preparing an exclusive cinematic preview of {name}. Stay tuned.</p>
      <div className="mt-6 px-6 py-2.5 rounded-full border font-body text-xs font-bold tracking-widest uppercase" style={{ borderColor: ORANGE, color: ORANGE }}>
        + STAY TUNED
      </div>
    </div>);

}

function BadgePill({ label }) {
  const colors = {
    "FREE & EASY": { bg: "#E8F5E9", text: "#2E7D32" },
    "GROUP TOUR": { bg: "#E3F2FD", text: "#1565C0" },
    "NATURE TOUR": { bg: "#E8F5E9", text: "#2E7D32" },
    "ISLAND TOUR": { bg: "#E0F7FA", text: "#00695C" },
    "LUXURY PACKAGE": { bg: "#FFF3E0", text: "#E65100" },
    "MULTI-CITY": { bg: "#F3E5F5", text: "#6A1B9A" }
  };
  const c = colors[label] || { bg: "#F5F5F5", text: "#555" };
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase font-body" style={{ backgroundColor: c.bg, color: c.text }}>
      {label}
    </span>);

}

function PreviewContent() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const dest = getDestinationBySlug(slug);
  const [activePackageIdx, setActivePackageIdx] = useState(0);

  // Theme-aware colors
  const bg = isDark ? "#111111" : "#F5F5F5";
  const bgCard = isDark ? "#1A1A1A" : "#FFFFFF";
  const bgAlt = isDark ? "#161616" : "#F0F0F0";
  const border = isDark ? "#2A2A2A" : "#E5E5E5";
  const textPrimary = isDark ? "#FFFFFF" : "#111111";
  const textSecondary = isDark ? "#A0A0A0" : "#555555";
  const navBg = isDark ? "#0D0D0D" : "#FFFFFF";
  const navBorder = isDark ? "#222222" : "#E5E5E5";

  if (!dest) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="font-condensed text-2xl font-bold text-gray-400 mb-4">Destination not found</p>
          <button onClick={() => navigate("/")} className="font-body text-sm underline" style={{ color: ORANGE }}>← Back to Home</button>
        </div>
      </div>);

  }

  const pkg = dest.packages?.[activePackageIdx] || dest.packages?.[0];
  const highlightIcons = [Plane, Hotel, Coffee, Map, Users, Briefcase, Bus, Ticket];

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: bg }}>
      
    <ThemeToggle />

   

      {/* Navbar */}
     <div
        className="sticky top-0 z-40 border-b px-5 lg:px-10 h-16 flex items-center justify-between shadow-sm transition-colors duration-300"
        style={{
          backgroundColor: navBg,
          borderColor: navBorder
        }}>
        
        <img
          src={LOGO_URL}
          alt="Gladex"
          className="h-14 w-auto object-contain cursor-pointer transition-all duration-300 hover:scale-105"
          style={{
            filter:
            "drop-shadow(0 0 16px rgba(255,140,0,0.5))"
          }}
          onClick={() => navigate("/")} />
        
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ height: "60vh", minHeight: 340 }}>
        <img src={dest.heroImage} alt={dest.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
        <div className="absolute bottom-8 left-0 right-0 text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <SectionLabel text="Official Travel Preview" />
            <h1 className="font-condensed font-black text-white text-4xl lg:text-6xl tracking-wide mb-2">Experience {dest.name}</h1>
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <MapPin className="w-4 h-4" style={{ color: ORANGE }} />
              <span className="font-body text-white/80 text-sm">{dest.country}</span>
            </div>
            <p className="font-body text-white/70 text-sm max-w-md mx-auto">{dest.tagline}</p>
          </motion.div>
        </div>
      </div>

      {/* Package Tabs (if multiple packages) */}
      {dest.packages?.length > 1 &&
      <div className="border-b px-5 lg:px-10 py-3 flex gap-2 flex-wrap transition-colors duration-300" style={{ backgroundColor: navBg, borderColor: navBorder }}>
          {dest.packages.map((p, i) =>
        <button key={i} onClick={() => setActivePackageIdx(i)}
        className="px-4 py-2 rounded-full font-body text-xs font-semibold transition-all"
        style={{ backgroundColor: i === activePackageIdx ? ORANGE : isDark ? "#2A2A2A" : "#F5F5F5", color: i === activePackageIdx ? "#fff" : textSecondary }}>
          
              {p.name}
            </button>
        )}
        </div>
      }

      {!pkg ?
      <div className="py-20 text-center">
          <p className="font-body text-gray-400">Package details coming soon.</p>
        </div> :

      <>
         \

          {/* Video Preview */}
<div className="bg-black py-16 px-4 lg:px-10 relative overflow-hidden">
  {/* Background glow */}
  <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
              "radial-gradient(circle at center, rgba(255,140,0,0.18) 0%, transparent 70%)"
            }} />
          

  <div className="max-w-4xl mx-auto text-center mb-10 relative z-10">
    <SectionLabel text="Official Travel Preview" />

    <h2 className="font-condensed font-black text-white text-3xl lg:text-5xl mb-3 tracking-wide hidden">
      Experience {dest.name}
    </h2>

    <p className="font-body text-gray-400 text-sm lg:text-base max-w-xl mx-auto leading-relaxed hidden">
      Watch our exclusive cinematic travel preview and explore the beauty,
      culture, and unforgettable moments waiting for you in {dest.name}.
    </p>
  </div>

  <div className="max-w-5xl mx-auto relative z-10">
    {dest.videoUrl ?
            <motion.div
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.35 }}
              className="group relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
              style={{
                background:
                "linear-gradient(to bottom, rgba(255,255,255,0.04), rgba(255,255,255,0.02))"
              }}>
              
       {/* Video */}
<iframe
                src={dest.videoUrl}
                className="w-full"
                allow="autoplay"
                allowFullScreen
                style={{
                  aspectRatio: "16/9",
                  backgroundColor: "#000",
                  border: "none"
                }} />
              

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Top Gradient */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />

        {/* Bottom Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

        {/* Floating Label */}
        <div className="absolute top-5 left-5">
          <div
                  className="px-4 py-2 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase backdrop-blur-md border"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    borderColor: "rgba(255,255,255,0.15)",
                    color: "#fff"
                  }}>
                  
            Travel Preview
          </div>
        </div>

        {/* Cinematic Hover Text */}
        <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-6 group-hover:translate-y-0 pointer-events-none">
          <h3 className="font-condensed text-white text-2xl font-black mb-2">
            Discover {dest.name}
          </h3>

          <p className="text-white/70 text-sm max-w-md">
            Feel the atmosphere, culture, luxury, and adventure before your
            journey even begins.
          </p>
        </div>
      </motion.div> :

            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#111]"
              style={{
                aspectRatio: "16/9"
              }}>
              
        {/* Background image */}
        <img
                src={dest.heroImage}
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover opacity-30" />
              

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          {/* Animated play button */}
          <div className="relative mb-6">
            <div
                    className="absolute inset-0 rounded-full animate-ping"
                    style={{
                      background: "rgba(255,140,0,0.2)"
                    }} />
                  

            <div
                    className="relative w-20 h-20 rounded-full flex items-center justify-center"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.15)"
                    }}>
                    
              <Play className="w-8 h-8 text-white/70 ml-1" />
            </div>
          </div>

          <h3 className="font-condensed font-black text-white text-2xl mb-3">
            Official Travel Preview Coming Soon
          </h3>

          <p className="font-body text-gray-400 text-sm max-w-md leading-relaxed mb-7">
            We’re currently editing the cinematic preview video for{" "}
            {dest.name}. Stay tuned for the full travel experience showcase.
          </p>

          <div
                  className="px-7 py-3 rounded-full border text-xs font-bold tracking-[0.25em] uppercase"
                  style={{
                    borderColor: ORANGE,
                    color: ORANGE,
                    background: "rgba(255,140,0,0.05)"
                  }}>
                  
            + Stay Tuned
          </div>
        </div>
      </motion.div>
            }
  </div>
</div>

          {/* Hotel Categories & Rates */}
          {pkg.hotelCategories?.length > 0 &&
        <div className="py-12 px-5 lg:px-10 transition-colors duration-300" style={{ backgroundColor: bgCard }}>
              <div className="max-w-4xl mx-auto hidden">
                <SectionLabel text="Rooms & Rates" />
                <h2 className="font-condensed font-black text-3xl text-center mb-2" style={{ color: textPrimary }}>Hotel Categories & Rates</h2>
                <p className="text-center font-body text-sm mb-8" style={{ color: textSecondary }}>Select your preferred accommodation category.</p>
                <div className="space-y-4">
                  {pkg.hotelCategories.map((cat, i) =>
              <div key={i} className="rounded-2xl overflow-hidden border" style={{ borderColor: border }}>
                      <div className="px-5 py-3 font-body font-bold text-sm text-white flex items-center gap-2" style={{ backgroundColor: ORANGE }}>
                        <Hotel className="w-4 h-4" /> {cat.category}
                      </div>
                      <div className="px-5 pt-3 pb-2" style={{ backgroundColor: bgCard }}>
                        {cat.hotels &&
                  <div className="mb-2">
                            {cat.hotels.map((h, j) =>
                    <p key={j} className="font-body text-xs leading-relaxed" style={{ color: textSecondary }}>• {h}</p>
                    )}
                          </div>
                  }
                        <HotelRatesTable category={cat} />
                      </div>
                    </div>
              )}
                </div>
                <p className="mt-4 text-center font-body text-xs" style={{ color: textSecondary }}>* All rates are per person. Subject to availability and change without prior notice. Hotel is subject to availability — similar category will be substituted if needed.</p>
              </div>
            </div>
        }

          {/* Season Surcharges */}
          {pkg.seasonSurcharges?.length > 0 &&
        <div className="py-8 px-5 lg:px-10 transition-colors duration-300" style={{ backgroundColor: isDark ? "#1C1500" : "#FFF8F0" }}>
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5" style={{ color: ORANGE }} />
                  <h3 className="font-condensed font-black text-xl" style={{ color: textPrimary }}>Seasonal / Peak Surcharges</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {pkg.seasonSurcharges.map((s, i) =>
              <div key={i} className="rounded-xl p-4 border" style={{ backgroundColor: bgCard, borderColor: isDark ? "#3A2800" : "#FFD699" }}>
                      <p className="font-body font-bold text-sm mb-1" style={{ color: textPrimary }}>{s.label}</p>
                      <p className="font-condensed font-black text-lg" style={{ color: ORANGE }}>{s.amount}</p>
                      {s.dates?.map((d, j) => <p key={j} className="font-body text-xs" style={{ color: textSecondary }}>• {d}</p>)}
                    </div>
              )}
                </div>
              </div>
            </div>
        }

          {/* Package Highlights Grid */}
          {pkg.highlights?.length > 0 &&
        <div className="py-12 px-5 lg:px-10 border-t transition-colors duration-300" style={{ backgroundColor: bgCard, borderColor: border }}>
              <div className="max-w-4xl mx-auto hidden">
                <SectionLabel text="What's Included" />
                <h2 className="font-condensed font-black text-3xl text-center mb-2" style={{ color: textPrimary }}>Package Highlights</h2>
                <p className="text-center font-body text-sm mb-8" style={{ color: textSecondary }}>Everything you need for a seamless, unforgettable journey.</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {pkg.highlights.map((h, i) => {
                const Icon = highlightIcons[i % highlightIcons.length];
                return (
                  <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-2xl border text-center hover:shadow-md transition-shadow" style={{ backgroundColor: bgAlt, borderColor: border }}>
                        <Icon className="w-5 h-5" style={{ color: ORANGE }} />
                        <span className="font-body text-xs font-semibold leading-snug" style={{ color: textPrimary }}>{h}</span>
                      </div>);

              })}
                </div>
              </div>
            </div>
        }

          {/* Inclusions & Exclusions */}
          {(pkg.inclusions?.length > 0 || pkg.exclusions?.length > 0) &&
        <div className="py-12 px-5 lg:px-10 transition-colors duration-300" style={{ backgroundColor: bgAlt }}>
              <div className="max-w-4xl mx-auto">
                <SectionLabel text="Package Details" />
                <h2 className="font-condensed font-black text-3xl text-center mb-8" style={{ color: textPrimary }}>Inclusions & Exclusions</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {pkg.inclusions?.length > 0 &&
              <div className="rounded-2xl border p-6 transition-colors duration-300" style={{ backgroundColor: bgCard, borderColor: border }}>
                      <div className="flex items-center gap-2 mb-4">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="font-body font-bold text-sm" style={{ color: textPrimary }}>Included ✅</span>
                      </div>
                      <ul className="space-y-2">
                        {pkg.inclusions.map((item, i) =>
                  <li key={i} className="flex items-start gap-2 font-body text-sm" style={{ color: textSecondary }}>
                            <span className="text-green-500 mt-0.5 shrink-0">✓</span> {item}
                          </li>
                  )}
                      </ul>
                    </div>
              }
                  {pkg.exclusions?.length > 0 &&
              <div className="rounded-2xl border p-6 transition-colors duration-300" style={{ backgroundColor: bgCard, borderColor: border }}>
                      <div className="flex items-center gap-2 mb-4">
                        <XCircle className="w-5 h-5 text-red-400" />
                        <span className="font-body font-bold text-sm" style={{ color: textPrimary }}>Not Included ❌</span>
                      </div>
                      <ul className="space-y-2">
                        {pkg.exclusions.map((item, i) =>
                  <li key={i} className="flex items-start gap-2 font-body text-sm" style={{ color: textSecondary }}>
                            <span className="text-red-400 mt-0.5 shrink-0">✗</span> {item}
                          </li>
                  )}
                      </ul>
                    </div>
              }
                </div>
              </div>
            </div>
        }

          {/* Day-by-Day Itinerary */}
          {pkg.itinerary?.length > 0 &&
        <div className="py-12 px-5 lg:px-10 transition-colors duration-300" style={{ backgroundColor: bgCard }}>
              <div className="max-w-4xl mx-auto">
                <SectionLabel text="Day by Day" />
                <h2 className="font-condensed font-black text-3xl text-center mb-2" style={{ color: textPrimary }}>Your {dest.name} Itinerary</h2>
                <p className="text-center font-body text-sm mb-10" style={{ color: textSecondary }}>A carefully crafted journey from arrival to departure.</p>
                <div className="relative">
                  <div className="absolute left-5 top-0 bottom-0 w-0.5" style={{ backgroundColor: ORANGE, opacity: 0.25 }} />
                  <div className="space-y-4">
                    {pkg.itinerary.map((day, i) =>
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex gap-4">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-condensed font-black text-sm text-white z-10" style={{ backgroundColor: ORANGE }}>
                          D{day.day}
                        </div>
                        <div className="flex-1 rounded-2xl border p-4 shadow-sm transition-colors duration-300" style={{ backgroundColor: bgAlt, borderColor: border }}>
                          <div className="font-body font-bold text-sm mb-2" style={{ color: textPrimary }}>DAY {day.day} — {day.title}</div>
                          <ul className="space-y-1">
                            {day.activities.map((a, j) =>
                      <li key={j} className="font-body text-xs flex items-start gap-1.5" style={{ color: textSecondary }}>
                                <span style={{ color: ORANGE }} className="mt-0.5 shrink-0">›</span> {a}
                              </li>
                      )}
                          </ul>
                        </div>
                      </motion.div>
                )}
                  </div>
                </div>
              </div>
            </div>
        }

          {/* Optional Tours */}
          {pkg.optionalTours?.length > 0 &&
        <div className="py-12 px-5 lg:px-10 transition-colors duration-300" style={{ backgroundColor: bgAlt }}>
              <div className="max-w-4xl mx-auto">
                <SectionLabel text="Optional Add-Ons" />
                <h2 className="font-condensed font-black text-3xl text-center mb-8" style={{ color: textPrimary }}>Optional Tours</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {pkg.optionalTours.map((tour, i) =>
              <div key={i} className="rounded-xl border p-3 flex items-center gap-2 text-sm font-body transition-colors duration-300" style={{ backgroundColor: bgCard, borderColor: border, color: textPrimary }}>
                      <Tag className="w-3.5 h-3.5 shrink-0" style={{ color: ORANGE }} /> {tour}
                    </div>
              )}
                </div>
              </div>
            </div>
        }

          {/* Requirements & Notices */}
          <div className="py-12 px-5 lg:px-10 transition-colors duration-300" style={{ backgroundColor: bgCard }}>
            <div className="max-w-4xl mx-auto">
              <SectionLabel text="Important" />
              <h2 className="font-condensed font-black text-3xl text-center mb-8" style={{ color: textPrimary }}>Requirements & Notes</h2>

              {/* Warnings */}
              {pkg.importantNotices?.length > 0 &&
            <div className="mb-6 rounded-2xl border p-5 transition-colors duration-300" style={{ backgroundColor: isDark ? "#1C1500" : "#FFF8F0", borderColor: isDark ? "#3A2800" : "#FFD699" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-5 h-5" style={{ color: ORANGE }} />
                    <span className="font-body font-bold text-sm" style={{ color: textPrimary }}>Important Notices</span>
                  </div>
                  <ul className="space-y-2">
                    {pkg.importantNotices.map((n, i) =>
                <li key={i} className="flex items-start gap-2 font-body text-sm" style={{ color: textSecondary }}>
                        <span style={{ color: ORANGE }} className="mt-0.5 shrink-0">•</span> {n}
                      </li>
                )}
                  </ul>
                </div>
            }

              {pkg.visaInfo &&
            <AccordionItem title="Visa Requirements" accent>
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 shrink-0 mt-0.5" style={{ color: ORANGE }} />
                    <span>{pkg.visaInfo}</span>
                  </div>
                </AccordionItem>
            }

              {pkg.requirements?.length > 0 &&
            <AccordionItem title="Travel Requirements">
                  <ul className="space-y-1">
                    {pkg.requirements.map((r, i) => <li key={i} className="flex items-start gap-2"><span style={{ color: ORANGE }}>•</span> {r}</li>)}
                  </ul>
                </AccordionItem>
            }

              {pkg.termsAndConditions &&
            <AccordionItem title="Terms & Conditions">
                  {pkg.termsAndConditions}
                </AccordionItem>
            }

              {pkg.fuelSurcharge &&
            <AccordionItem title="⛽ Fuel Surcharge Notice" accent>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
                    <span>{pkg.fuelSurcharge}</span>
                  </div>
                </AccordionItem>
            }

              {pkg.insuranceNote &&
            <AccordionItem title="🛡️ Travel Insurance">
                  {pkg.insuranceNote}
                </AccordionItem>
            }

              {pkg.shoppingDisclaimer &&
            <AccordionItem title="🛍️ Shopping Stop Disclaimer">
                  {pkg.shoppingDisclaimer}
                </AccordionItem>
            }

              {pkg.remarks &&
            <AccordionItem title="📋 Remarks & Hotel Notes">
                  {pkg.remarks}
                </AccordionItem>
            }
            </div>
          </div>

          {/* Global Warning */}
          <div className="py-6 px-5 lg:px-10 bg-black">
            <div className="max-w-4xl mx-auto text-center">
              <p className="font-body text-xs text-gray-400">
                ⚠️ <strong className="text-white">PERSONAL TRANSACTIONS NOT ALLOWED.</strong> All bookings must go through official Gladex Travel channels only. •
                Passport validity: minimum 6 months. • Rates subject to change without prior notice. • Hotel subject to availability — similar category substitution may apply. •
                Unused services are non-refundable.
              </p>
            </div>
          </div>
        </>
      }

      {/* CTA */}
      <div className="py-16 px-4 text-center border-t transition-colors duration-300" style={{ backgroundColor: bgAlt, borderColor: border }}>
        <p className="font-body text-[10px] font-bold tracking-[0.4em] uppercase mb-3" style={{ color: ORANGE }}>— Ready to Explore? —</p>
        <h2 className="font-condensed font-black text-3xl lg:text-4xl mb-1" style={{ color: textPrimary }}>Discover More Destinations</h2>
        <p className="font-body text-sm mb-6" style={{ color: textSecondary }}>Browse our full collection of international travel experiences.</p>
        <button onClick={() => navigate("/")}
        className="inline-flex items-center gap-2 font-body font-bold text-sm px-8 py-3.5 rounded-full text-white transition-all duration-200 hover:opacity-90"
        style={{ backgroundColor: ORANGE }}>
          
          ← Back to All Destinations
        </button>
      </div>
    </div>);

}

export default function DestinationPreview() {
  return (
    <ThemeProvider>
      <PreviewContent />
    </ThemeProvider>);

}