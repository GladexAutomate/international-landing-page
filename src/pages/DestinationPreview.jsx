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
import { Heart, Star, Calendar, Clock, Languages, ShieldCheck, ThumbsUp, Check, X, HelpCircle } from "lucide-react";

// Mock activities dataset corresponding exactly to the Klook screenshot entries
const ACTIVITIES_DATA = {
  "boracay-tour-package-island-hopping": {
    title: "Boracay Tour Package (Island Hopping)",
    type: "Tours",
    rating: "4.6",
    reviews: "6.0K reviews",
    booked: "100K+ booked",
    price: 900,
    badges: ["English", "Join in & private groups", "Meet with guide"],
    locationTags: ["Departing from Malay", "Puka Beach"],
    heroImages: [
      "https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1505080856163-267d49b30624?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=400&q=80"
    ],
    description: "Book this island tour package and discover Boracay's white-sandy beaches, pristine waters, and fun attractions! Take the opportunity to relax on the beach or snorkel around to discover and admire the colorful aquatic fauna.",
    destinations: ["Ilig-Iligan Beach"],
    whatsIncluded: [
      { text: "English-speaking guide", checked: true },
      { text: "Join in Tour", checked: true },
      { text: "BBQ lunch", checked: true },
      { text: "Hotel pick up and drop off", checked: false },
      { text: "Insurance", checked: false },
      { text: "Snorkeling gear", checked: false },
      { text: "Snorkeling fee", checked: false },
      { text: "Optional Add-on: Entrance fee to Crystal Cove (PHP 300)", checked: false }
    ]
  },
  "boracay-sunset-paraw-sailing": {
    title: "Boracay Sunset Paraw Sailing",
    type: "Water activities",
    rating: "4.6",
    reviews: "1,073 reviews",
    booked: "30K+ booked",
    price: 938,
    badges: ["English guided", "Instant Confirmation"],
    locationTags: ["White Beach Station 1"],
    heroImages: [
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&w=400&q=80"
    ],
    description: "Experience a classic Boracay activity by sailing on a traditional local Paraw sailboat as the iconic tropical sun dips over the crystal clear horizons.",
    destinations: ["Station 1 Beachline"],
    whatsIncluded: [
      { text: "Local Skipper and Crew", checked: true },
      { text: "Safety Life Vest", checked: true },
      { text: "Environmental fees", checked: true }
    ]
  }
  // Alternate key entries fall back gracefully to template data matching this configuration
};

function ActivityDetailView({ activityId, onClose, isDark, textPrimary, textSecondary, border, bgCard, bgAlt }) {
  // Graceful fallback config if custom dataset is not fully populated for standard elements
  const data = ACTIVITIES_DATA[activityId] || {
    ...ACTIVITIES_DATA["boracay-tour-package-island-hopping"],
    title: activityId.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  };

  const [selectedDate, setSelectedDate] = useState("2026-06-01");
  const [tourType, setTourType] = useState("Join-in tour");
  const [fareType, setFareType] = useState("Regular");
  const [groupSize, setGroupSize] = useState("Joiner");
  const [quantity, setQuantity] = useState(1);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: 15 }}
      className="rounded-2xl border p-4 lg:p-8 mt-4 transition-colors duration-300 shadow-xl"
      style={{ backgroundColor: isDark ? "#161616" : "#FFFFFF", borderColor: border }}
    >
      {/* Breadcrumb back navigational header line */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b" style={{ borderColor: border }}>
        <div className="flex items-center gap-2 text-xs font-medium" style={{ color: textSecondary }}>
          <span>Home</span> <span>&rsaquo;</span> <span>Boracay Activities</span> <span>&rsaquo;</span> <span style={{ color: textPrimary }}>{data.title}</span>
        </div>
        <button 
          onClick={onClose}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors"
          style={{ color: textPrimary }}
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to List
        </button>
      </div>

      {/* Main heading detail metrics */}
      <h1 className="text-xl lg:text-3xl font-black font-condensed tracking-wide mb-3" style={{ color: textPrimary }}>
        {data.title}
      </h1>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {data.badges.map((b, i) => (
          <span key={i} className="text-[11px] font-semibold px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800" style={{ color: textSecondary }}>
            {b}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 text-xs font-medium">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-amber-500 font-bold flex items-center gap-0.5">★ {data.rating} <span className="underline font-normal" style={{ color: textSecondary }}>({data.reviews})</span></span>
          <span style={{ color: textSecondary }}>• {data.booked}</span>
          {data.locationTags.map((t, i) => (
            <span key={i} className="flex items-center gap-1" style={{ color: textSecondary }}>
              <MapPin className="w-3 h-3 text-orange-500" /> {t}
            </span>
          ))}
        </div>
        <button className="flex items-center gap-1 text-zinc-500 hover:text-red-500 font-bold transition-colors">
          <Heart className="w-3.5 h-3.5" /> Save to wishlist
        </button>
      </div>

      {/* Grid containing Grid Image Mosaic Gallery and interactive selector panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        
        {/* Gallery Segment (Klook multi-pane arrangement) */}
        <div className="lg:col-span-2 space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 rounded-xl overflow-hidden aspect-video lg:aspect-[16/10]">
            <div className="md:col-span-2 bg-zinc-200 dark:bg-zinc-800">
              <img src={data.heroImages[0]} alt="Primary highlight" className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
              <img src={data.heroImages[1] || data.heroImages[0]} alt="Gallery 2" className="w-full h-full object-cover aspect-video md:aspect-auto" />
              <div className="relative w-full h-full">
                <img src={data.heroImages[2] || data.heroImages[0]} alt="Gallery 3" className="w-full h-full object-cover aspect-video md:aspect-auto" />
                <button className="absolute bottom-2 right-2 px-3 py-1 bg-black/70 backdrop-blur-md rounded text-white text-[11px] font-bold tracking-wide">
                  Gallery
                </button>
              </div>
            </div>
          </div>

          {/* Core Content Snippet card block */}
          <div className="p-5 rounded-2xl border flex items-start gap-4" style={{ backgroundColor: bgAlt, borderColor: border }}>
            <div className="p-2.5 rounded-full bg-orange-50 dark:bg-orange-950/40 text-orange-600 shrink-0">
              <ThumbsUp className="w-5 h-5" />
            </div>
            <div className="text-xs lg:text-sm leading-relaxed">
              <p style={{ color: textPrimary }}>{data.description}</p>
              <button className="mt-2 text-xs font-bold text-orange-500 flex items-center gap-1">See more &rsaquo;</button>
            </div>
          </div>
        </div>

        {/* Dynamic Booking & Checkout configurator interface panel side container */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl border shadow-md space-y-5" style={{ backgroundColor: bgCard, borderColor: border }}>
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-bold text-zinc-400">Total Price</span>
              <span className="text-2xl font-black" style={{ color: ORANGE }}>₱ {(data.price * quantity).toLocaleString()}</span>
            </div>

            {/* Simulated interactive items attributes mapping matching image_5a90c2 */}
            <div className="space-y-3 pt-3 border-t" style={{ borderColor: border }}>
              <div>
                <label className="text-[11px] uppercase tracking-wider font-bold block mb-1.5" style={{ color: textSecondary }}>Tour Date</label>
                <input 
                  type="date" 
                  value={selectedDate} 
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-xs bg-transparent focus:outline-none focus:ring-1 focus:ring-orange-500" 
                  style={{ borderColor: border, color: textPrimary }}
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider font-bold block mb-1.5" style={{ color: textSecondary }}>Tour Variant</label>
                <div className="flex flex-wrap gap-1.5">
                  {["Join-in tour", "Private tour"].map(t => (
                    <button key={t} onClick={() => setTourType(t)} className="px-3 py-1.5 rounded-md border text-xs font-medium transition-all"
                      style={{ 
                        borderColor: tourType === t ? ORANGE : border, 
                        backgroundColor: tourType === t ? "rgba(255,140,0,0.08)" : "transparent",
                        color: tourType === t ? ORANGE : textPrimary
                      }}>{t}</button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider font-bold block mb-1.5" style={{ color: textSecondary }}>Fare Structure</label>
                <div className="flex flex-wrap gap-1.5">
                  {["Regular", "Premium Package"].map(f => (
                    <button key={f} onClick={() => setFareType(f)} className="px-3 py-1.5 rounded-md border text-xs font-medium transition-all"
                      style={{ 
                        borderColor: fareType === f ? ORANGE : border, 
                        backgroundColor: fareType === f ? "rgba(255,140,0,0.08)" : "transparent",
                        color: fareType === f ? ORANGE : textPrimary
                      }}>{f}</button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector config counter */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-bold" style={{ color: textPrimary }}>Ticket Quantity</span>
                <div className="flex items-center border rounded-lg overflow-hidden" style={{ borderColor: border }}>
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-2.5 py-1 text-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-500">-</button>
                  <span className="px-4 text-xs font-bold" style={{ color: textPrimary }}>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-2.5 py-1 text-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-500">+</button>
                </div>
              </div>
            </div>

            {/* Quick CTAs matching layout buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button className="w-full py-2.5 rounded-xl border text-xs font-bold tracking-wide transition-opacity hover:opacity-90" style={{ borderColor: ORANGE, color: ORANGE }}>
                Add to cart
              </button>
              <button className="w-full py-2.5 rounded-xl text-white text-xs font-bold tracking-wide transition-opacity hover:opacity-90" style={{ backgroundColor: ORANGE }}>
                Book now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Package configuration specifics details footer metadata (What's included component element section) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6 border-t" style={{ borderColor: border }}>
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold font-condensed tracking-wide" style={{ color: textPrimary }}>Package details</h3>
          
          <div className="p-4 rounded-xl border space-y-3" style={{ backgroundColor: bgCard, borderColor: border }}>
            <div className="flex items-center gap-2 text-xs font-bold" style={{ color: textPrimary }}>
              <MapPin className="w-4 h-4 text-orange-500" />
              <span>Route & Destination Attractions:</span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs pl-6" style={{ color: textSecondary }}>
              {data.destinations.map((d, i) => <span key={i} className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded">{d}</span>)}
            </div>
          </div>
        </div>

        {/* Inclusions checklist panel rendering dynamically array state parameters */}
        <div className="p-4 rounded-xl border space-y-3" style={{ backgroundColor: bgCard, borderColor: border }}>
          <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: textPrimary }}>What's included</h4>
          <ul className="space-y-2 text-xs">
            {data.whatsIncluded.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                {item.checked ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                ) : (
                  <X className="w-3.5 h-3.5 text-zinc-400 mt-0.5 shrink-0" />
                )}
                <span style={{ color: item.checked ? textPrimary : textSecondary }} className={!item.checked ? "line-through opacity-60" : ""}>
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

const LOGO_URL = "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/5ecc9b2cd_Untitled-design-75.png";
const ORANGE = "#FF8C00";

function SectionLabel({ text }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-3">
      
      
      
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

{/* ========================================================= */}
          {/* START: KLOOK THINGS TO DO SECTION WITH DETAIL OVERLAYS     */}
          {/* ========================================================= */}
          <div id="things-to-do-section" className="py-12 px-4 lg:px-10 transition-colors duration-300 font-body" style={{ backgroundColor: isDark ? "#111111" : "#FFFFFF" }}>
            <div className="max-w-6xl mx-auto">
              
              {/* Internal state manager hook block for interactive view toggle */}
              {(() => {
                const [selectedActivity, setSelectedActivity] = useState(null);

                if (selectedActivity) {
                  return (
                    <ActivityDetailView 
                      activityId={selectedActivity}
                      onClose={() => {
                        setSelectedActivity(null);
                        document.getElementById("things-to-do-section")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      isDark={isDark}
                      textPrimary={textPrimary}
                      textSecondary={textSecondary}
                      border={border}
                      bgCard={bgCard}
                      bgAlt={bgAlt}
                    />
                  );
                }

                return (
                  <>
                    {/* Header Title & Summary */}
                    <div className="mb-6">
                      <h2 className="text-2xl lg:text-3xl font-bold font-condensed tracking-wide mb-1" style={{ color: textPrimary }}>
                        Things to do in Boracay
                      </h2>
                      <div className="flex items-center gap-2 text-xs lg:text-sm">
                        <span className="text-amber-500 font-bold">★ 4.9</span>
                        <span style={{ color: textSecondary }}>(22K+ reviews) • 1M+ booked</span>
                      </div>
                    </div>

                    {/* Navigation Tabs (Simulated Overview/Things to do/Hotels) */}
                    <div className="flex border-b mb-6 text-sm font-semibold" style={{ borderColor: border }}>
                      <button className="px-4 py-2" style={{ color: textSecondary }}>Overview</button>
                      <button className="px-4 py-2 border-b-2" style={{ borderColor: ORANGE, color: ORANGE }}>Things to do</button>
                      <button className="px-4 py-2" style={{ color: textSecondary }}>Hotels</button>
                    </div>

                    {/* Filter Pills Row */}
                    <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
                      <div className="flex items-center gap-2 flex-wrap">
                        {["Tours", "Massages", "Snorkeling", "Cruises"].map((filter, idx) => (
                          <button key={idx} className="px-3 py-1.5 rounded-md border text-xs font-medium hover:opacity-80 transition-all flex items-center gap-1"
                            style={{ backgroundColor: bgAlt, borderColor: border, color: textPrimary }}>
                            <span>{["🥾", "💆", "🤿", "⛵"][idx]}</span> {filter}
                          </button>
                        ))}
                      </div>

                      {/* Sorting Select Option */}
                      <div className="flex items-center gap-2 text-xs">
                        <span style={{ color: textSecondary }}>Sort by:</span>
                        <select className="border rounded px-2 py-1 bg-transparent text-xs font-semibold focus:outline-none" style={{ borderColor: border, color: textPrimary }}>
                          <option>Klook recommended</option>
                          <option>Price: low to high</option>
                          <option>Price: high to low</option>
                        </select>
                      </div>
                    </div>

                    <p className="text-xs mb-4 font-semibold" style={{ color: textSecondary }}>56 results found</p>

                    {/* Activities Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
                      {[
                        { id: "boracay-tour-package-island-hopping", title: "Boracay Tour Package (Island Hopping)", type: "Tours", price: "900", rating: "4.6", booked: "100K+", img: "https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&w=400&q=80", tag: "Book now for tomorrow" },
                        { id: "boracay-sunset-paraw-sailing", title: "Boracay Sunset Paraw Sailing", type: "Water activities", price: "938", rating: "4.6", booked: "30K+", img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
                        { id: "sunset-party-cruise-in-boracay", title: "Sunset Party Cruise in Boracay", type: "Cruises", price: "760", rating: "4.7", booked: "10K+", img: "https://images.unsplash.com/photo-1505080856163-267d49b30624?auto=format&fit=crop&w=400&q=80", tag: "Book now for tomorrow" },
                        { id: "boracay-parasailing", title: "Boracay Parasailing", type: "Outdoor & sports activities", price: "2,019", rating: "4.8", booked: "40K+", img: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
                        { id: "boracay-party-yacht-experience", title: "Boracay Party Yacht Experience", type: "Water activities", price: "1,250", rating: "4.8", booked: "3+ booked", img: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=400&q=80", tag: "Book now for tomorrow" },
                        { id: "station-x-experience-at-hue-hotel-boracay", title: "Station X Experience at Hue Hotel Boracay", type: "Tours", price: "899", rating: "4.8", booked: "5K+", img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=400&q=80", tag: "Book now for tomorrow" },
                        { id: "boracay-atv-and-buggy-car-adventure", title: "Boracay ATV and Buggy Car Adventure", type: "Outdoor & sports activities", price: "875", rating: "4.4", booked: "10K+", img: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
                        { id: "boracay-jet-ski-experience", title: "Boracay Jet Ski Experience", type: "Water activities", price: "2,590", rating: "4.7", booked: "6K+", img: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=400&q=80", tag: "Book now for today", choice: true },
                        { id: "boracay-diamond-sunset-cruise", title: "Boracay Diamond Sunset Cruise", type: "Water activities", price: "1,550", rating: "4.4", booked: "7K+", img: "https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&w=400&q=80", tag: "Book now for tomorrow" },
                        { id: "boracay-helmet-dive-experience", title: "Boracay Helmet Dive Experience", type: "Water activities", price: "1,000", rating: "4.7", booked: "40K+", img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
                        { id: "boracay-helicopter-experience", title: "Boracay Helicopter Experience", type: "Tours", price: "6,688", rating: "4.8", booked: "5K+", img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80", tag: "Book now for tomorrow" },
                        { id: "boracay-land-tour", title: "Boracay Land Tour", type: "Tours", price: "984", rating: "4.8", booked: "1K+", img: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=400&q=80", tag: "Book now for tomorrow" },
                      ].map((item, idx) => (
                        <motion.div 
                          key={idx} 
                          whileHover={{ y: -4 }} 
                          onClick={() => setSelectedActivity(item.id)}
                          className="rounded-xl overflow-hidden border shadow-sm flex flex-col relative group cursor-pointer"
                          style={{ backgroundColor: bgCard, borderColor: border }}
                        >
                          
                          {/* Image and Choices Badges */}
                          <div className="relative aspect-video w-full overflow-hidden bg-gray-200">
                            <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            {item.choice && (
                              <span className="absolute top-2 left-2 text-[10px] font-bold text-white px-2 py-0.5 rounded-sm" style={{ backgroundColor: ORANGE }}>
                                Klook's choice
                              </span>
                            )}
                            <button 
                              onClick={(e) => { e.stopPropagation(); }} 
                              className="absolute top-2 right-2 p-1.5 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors"
                            >
                              ♥
                            </button>
                          </div>

                          {/* Content Details */}
                          <div className="p-3 flex-1 flex flex-col justify-between">
                            <div>
                              <span className="text-[10px] font-semibold tracking-wide uppercase block mb-1" style={{ color: textSecondary }}>
                                {item.type}
                              </span>
                              <h3 className="text-xs font-bold font-body line-clamp-2 leading-snug mb-1" style={{ color: textPrimary }}>
                                {item.title}
                              </h3>

                              {/* Booking Status Dynamic Tags */}
                              <div className="flex flex-wrap gap-1 my-1.5">
                                <span className="text-[10px] px-1.5 py-0.5 rounded-sm font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                                  {item.tag}
                                </span>
                                {idx % 2 === 0 && (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded-sm font-medium bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400">
                                    English guided
                                  </span>
                                )}
                              </div>
                            </div>

                            <div>
                              {/* Rating block */}
                              <div className="flex items-center gap-1 text-[11px] mb-2">
                                <span className="text-amber-500 font-bold">★ {item.rating}</span>
                                <span style={{ color: textSecondary }}>• {item.booked} booked</span>
                              </div>

                              {/* Pricing section */}
                              <div className="text-xs font-bold" style={{ color: textPrimary }}>
                                From <span className="text-sm font-black" style={{ color: ORANGE }}>₱ {item.price}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Review Testimonials Block */}
                    <div className="mb-16">
                      <h3 className="text-lg font-bold font-condensed mb-4" style={{ color: textPrimary }}>
                        What people say about top experiences
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { user: "MarieAnn ******", date: "9 Mar", comment: "Highly recommend 🤩 very friendly staff will assist you throughout your activities and flexible itinerary." },
                          { user: "JoshuaAndrew *********", date: "9 Mar", comment: "Very friendly Staff Especially to Miss Noimie who assist us to 3 Activities. Affordable. Good Job. Keep it up." },
                          { user: "Maegan ****", date: "8 Mar", comment: "Family friendly party yacht. Kids enjoyed the trip and loved how they have plenty of activities on board. The team can improve on snacks." }
                        ].map((rev, idx) => (
                          <div key={idx} className="p-4 rounded-xl border text-xs" style={{ backgroundColor: bgCard, borderColor: border }}>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-zinc-300 dark:bg-zinc-700 flex items-center justify-center font-bold text-[10px]">
                                  {rev.user[0]}
                                </div>
                                <span className="font-bold" style={{ color: textPrimary }}>{rev.user}</span>
                              </div>
                              <span style={{ color: textSecondary }}>{rev.date}</span>
                            </div>
                            <p className="leading-relaxed mb-3" style={{ color: textSecondary }}>{rev.comment}</p>
                            <div className="flex gap-1 overflow-hidden rounded">
                              <div className="w-12 h-10 bg-zinc-200 dark:bg-zinc-800 shrink-0" />
                              <div className="w-12 h-10 bg-zinc-200 dark:bg-zinc-800 shrink-0" />
                              <div className="w-12 h-10 bg-zinc-200 dark:bg-zinc-800 shrink-0" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Popular Nearby Locations Horizontal Scroll */}
                    <div className="mb-16">
                      <h3 className="text-lg font-bold font-condensed mb-4" style={{ color: textPrimary }}>
                        Popular places near Boracay
                      </h3>
                      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
                        {["Station 1", "CityMall Boracay", "D'Mall Boracay", "Station 2"].map((place, idx) => (
                          <div key={idx} className="min-w-[220px] max-w-[240px] flex-1 aspect-video rounded-xl overflow-hidden relative group shrink-0 shadow-sm border" style={{ borderColor: border }}>
                            <img src="https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&w=300&q=80" alt={place} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                            <div className="absolute bottom-3 left-3 text-white">
                              <h4 className="text-xs font-bold">{place}</h4>
                              <span className="text-[9px] opacity-80">👥 998K+ visitors</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tag Navigation Clusters */}
                    <div className="space-y-6 pt-6 border-t" style={{ borderColor: border }}>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: textPrimary }}>Top attractions in Boracay</h4>
                        <div className="flex flex-wrap gap-2">
                          {["Station 2", "Station 1", "D'Mall Boracay", "Station 3", "CityMall Boracay"].map((item, idx) => (
                            <span key={idx} className="px-3 py-1 text-xs rounded-md border font-medium cursor-pointer hover:opacity-80 transition-all flex items-center gap-1.5"
                              style={{ backgroundColor: bgCard, borderColor: border, color: textPrimary }}>
                              <span className="text-[10px] text-amber-600 font-bold">{idx + 1}</span> {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: textPrimary }}>Top destinations in Philippines</h4>
                        <div className="flex flex-wrap gap-2">
                          {["Manila", "Cebu City", "Pasay", "Paranaque", "Makati", "Tagaytay", "El Nido", "Baguio", "Quezon City", "Panglao", "Laguna", "Puerto Princesa", "Coron"].map((item, idx) => (
                            <span key={idx} className="px-3 py-1 text-xs rounded-md border font-medium cursor-pointer hover:opacity-80 transition-all"
                              style={{ backgroundColor: bgCard, borderColor: border, color: textPrimary }}>
                              <span className="text-[10px] opacity-50 mr-1">{idx + 1}</span> {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}

            </div>
          </div>
          {/* ========================================================= */}
          {/* END: KLOOK THINGS TO DO SECTION WITH DETAIL OVERLAYS     */}
          {/* ========================================================= */}
          
          {/* Hotel Categories & Rates */}
          {pkg.hotelCategories?.length > 0 &&
        <div className="py-12 px-5 lg:px-10 transition-colors duration-300" style={{ backgroundColor: bgCard }}>

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
          







































































        

          {/* Global Warning */}
          







        
        </>
      }

      {/* CTA */}
      <div className="py-16 px-4 text-center border-t transition-colors duration-300" style={{ backgroundColor: bgAlt, borderColor: border }}>
        
        
        
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