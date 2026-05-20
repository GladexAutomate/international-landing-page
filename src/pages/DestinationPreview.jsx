import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Play, MapPin, ChevronDown, ChevronUp, Plane, Hotel, Coffee, Map, Users, Briefcase, Bus, Ticket } from "lucide-react";
import { useState } from "react";
import { getDestinationBySlug } from "../data/destinations";
import { ThemeProvider, useTheme } from "../lib/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";

const LOGO_URL = "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/5ecc9b2cd_Untitled-design-75.png";

const highlights = [
  { icon: Plane, label: "Roundtrip Airfare" },
  { icon: Hotel, label: "Hotel Accommodation" },
  { icon: Coffee, label: "Daily Breakfast" },
  { icon: Map, label: "Guided Tours" },
  { icon: Users, label: "English Guide" },
  { icon: Briefcase, label: "7kg Baggage" },
  { icon: Bus, label: "Airport Transfers" },
  { icon: Ticket, label: "Entrance Fees" },
];

function AccordionItem({ title, children, accent }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border rounded-xl overflow-hidden mb-3" style={{ borderColor: "#E5E5E5" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
        style={{ backgroundColor: open ? "#FFF8F0" : "#FFFFFF" }}
      >
        <span className="font-body font-semibold text-sm" style={{ color: accent && open ? "#FF8C00" : "#1A1A1A" }}>
          {title}
        </span>
        {open ? <ChevronUp className="w-4 h-4" style={{ color: "#FF8C00" }} /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 py-4 text-sm font-body text-gray-600 leading-relaxed border-t" style={{ borderColor: "#F0E8DC" }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PreviewContent() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const dest = getDestinationBySlug(slug);

  if (!dest) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F5F5F5" }}>
        <div className="text-center">
          <p className="font-condensed text-2xl font-bold text-gray-400 mb-4">Destination not found</p>
          <button onClick={() => navigate("/")} className="font-body text-sm text-[#FF8C00] underline">← Back to Home</button>
        </div>
      </div>
    );
  }

  const pkg = dest.packages?.[0];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F5F5" }}>
      <ThemeToggle />

      {/* Top Nav */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-5 lg:px-10 h-16 flex items-center justify-between shadow-sm">
        <button onClick={() => navigate("/")} className="flex items-center gap-3 group">
          <img src={LOGO_URL} alt="Gladex" className="h-9 w-auto object-contain" />
        </button>
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 font-body text-sm text-gray-500 hover:text-[#FF8C00] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          All Destinations
        </button>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ height: "60vh", minHeight: 340 }}>
        <img
          src={dest.heroImage}
          alt={dest.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="absolute bottom-8 left-0 right-0 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="h-px w-8 bg-[#FF8C00]" />
              <span className="font-body text-[10px] font-bold tracking-[0.4em] uppercase" style={{ color: "#FF8C00" }}>
                Official Travel Preview
              </span>
              <div className="h-px w-8 bg-[#FF8C00]" />
            </div>
            <h1 className="font-condensed font-black text-white text-4xl lg:text-6xl tracking-wide mb-2">
              Experience {dest.name}
            </h1>
            <div className="flex items-center justify-center gap-1.5">
              <MapPin className="w-4 h-4" style={{ color: "#FF8C00" }} />
              <span className="font-body text-white/80 text-sm">{dest.country}</span>
            </div>
            <p className="font-body text-white/70 text-sm mt-2 max-w-md mx-auto">{dest.tagline}</p>
          </motion.div>
        </div>
      </div>

      {/* Video Preview Section */}
      <div className="bg-black py-14 px-4 lg:px-10">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-px w-8 bg-[#FF8C00]" />
            <span className="font-body text-[10px] font-bold tracking-[0.4em] uppercase" style={{ color: "#FF8C00" }}>
              Official Travel Preview
            </span>
            <div className="h-px w-8 bg-[#FF8C00]" />
          </div>
          <h2 className="font-condensed font-black text-white text-3xl lg:text-4xl mb-2">
            Experience {dest.name}
          </h2>
          <p className="font-body text-gray-400 text-sm max-w-sm mx-auto">
            Watch our exclusive cinematic preview and feel the destination before you arrive.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {dest.videoUrl ? (
            <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
              <video src={dest.videoUrl} controls className="w-full h-full object-cover" />
            </div>
          ) : (
            <VideoPlaceholder name={dest.name} />
          )}
        </div>
      </div>

      {/* Package Highlights */}
      <div className="py-14 px-4 lg:px-10 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="h-px w-8 bg-[#FF8C00]" />
              <span className="font-body text-[10px] font-bold tracking-[0.4em] uppercase" style={{ color: "#FF8C00" }}>
                What's Included
              </span>
              <div className="h-px w-8 bg-[#FF8C00]" />
            </div>
            <h2 className="font-condensed font-black text-3xl lg:text-4xl text-gray-900">Package Highlights</h2>
            <p className="font-body text-sm text-gray-500 mt-2">Everything you need for a seamless, unforgettable journey.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {highlights.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2 p-5 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                <Icon className="w-6 h-6" style={{ color: "#FF8C00" }} />
                <span className="font-body text-xs font-semibold text-center text-gray-700">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Package Rates */}
      {pkg && (
        <div className="py-14 px-4 lg:px-10 bg-black">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="h-px w-8 bg-[#FF8C00]" />
                <span className="font-body text-[10px] font-bold tracking-[0.4em] uppercase" style={{ color: "#FF8C00" }}>
                  Investment
                </span>
                <div className="h-px w-8 bg-[#FF8C00]" />
              </div>
              <h2 className="font-condensed font-black text-3xl lg:text-4xl text-white">Package Rates</h2>
              <p className="font-body text-sm text-gray-400 mt-2">Transparent pricing. No hidden fees.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Adult Rate", value: `PHP ${pkg.rates.adult?.toLocaleString()}`, note: "Per person, twin sharing", accent: false },
                { label: "Child Rate", value: pkg.rates.childNoBed ? `PHP ${pkg.rates.childNoBed?.toLocaleString()}` : "On Request", note: "Subject to availability", accent: false },
                { label: "Single Supplement", value: `PHP ${pkg.rates.singleSupplement?.toLocaleString()}`, note: "Solo traveler add-on", accent: false },
                { label: "Downpayment", value: `PHP ${pkg.rates.downpayment?.toLocaleString()}`, note: "To confirm your booking", accent: true },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col gap-1 p-5 rounded-2xl border text-center"
                  style={{
                    backgroundColor: item.accent ? "#FF8C00" : "transparent",
                    borderColor: item.accent ? "#FF8C00" : "rgba(255,255,255,0.1)",
                  }}
                >
                  <span className="font-body text-xs font-semibold" style={{ color: item.accent ? "#fff" : "#A0A0A0" }}>{item.label}</span>
                  <span className="font-condensed font-black text-xl" style={{ color: item.accent ? "#fff" : "#FFFFFF" }}>{item.value}</span>
                  <span className="font-body text-[10px]" style={{ color: item.accent ? "rgba(255,255,255,0.8)" : "#666" }}>{item.note}</span>
                </div>
              ))}
            </div>
            <p className="text-center font-body text-xs text-gray-500 mt-4">
              * Rates are subject to change without prior notice. Contact us for the latest pricing.
            </p>
          </div>
        </div>
      )}

      {/* Itinerary */}
      {pkg?.highlights?.length > 0 && (
        <div className="py-14 px-4 lg:px-10 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="h-px w-8 bg-[#FF8C00]" />
                <span className="font-body text-[10px] font-bold tracking-[0.4em] uppercase" style={{ color: "#FF8C00" }}>
                  Day by Day
                </span>
                <div className="h-px w-8 bg-[#FF8C00]" />
              </div>
              <h2 className="font-condensed font-black text-3xl lg:text-4xl text-gray-900">Your {dest.name} Itinerary</h2>
              <p className="font-body text-sm text-gray-500 mt-2">A carefully crafted journey from arrival to departure.</p>
            </div>
            <div className="relative">
              <div className="absolute left-9 top-0 bottom-0 w-0.5" style={{ backgroundColor: "#FF8C00", opacity: 0.3 }} />
              <div className="space-y-4">
                {pkg.highlights.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex gap-5"
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-condensed font-black text-sm text-white z-10"
                      style={{ backgroundColor: "#FF8C00" }}
                    >
                      D{i + 1}
                    </div>
                    <div className="flex-1 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                      <div className="font-body font-semibold text-sm text-gray-900">{item}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inclusions & Exclusions */}
      {pkg?.inclusions?.length > 0 && (
        <div className="py-14 px-4 lg:px-10" style={{ backgroundColor: "#F5F5F5" }}>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="h-px w-8 bg-[#FF8C00]" />
                <span className="font-body text-[10px] font-bold tracking-[0.4em] uppercase" style={{ color: "#FF8C00" }}>
                  Package Details
                </span>
                <div className="h-px w-8 bg-[#FF8C00]" />
              </div>
              <h2 className="font-condensed font-black text-3xl lg:text-4xl text-gray-900">Inclusions & Exclusions</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-xs font-bold">✓</span>
                  </div>
                  <span className="font-body font-bold text-sm text-gray-900">Included</span>
                </div>
                <ul className="space-y-2">
                  {pkg.inclusions.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 font-body text-sm text-gray-600">
                      <span className="text-green-500 mt-0.5">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                    <span className="text-red-500 text-xs font-bold">✗</span>
                  </div>
                  <span className="font-body font-bold text-sm text-gray-900">Not Included</span>
                </div>
                <ul className="space-y-2">
                  {["Philippine travel tax", "Tips and gratuities", "Travel insurance", "Extra baggage fees", "Optional tours", "Personal expenses", "Visa fees (if applicable)"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 font-body text-sm text-gray-600">
                      <span className="text-red-400 mt-0.5">✗</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Requirements & Notes */}
      {pkg && (
        <div className="py-14 px-4 lg:px-10 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-[#FF8C00]">⚠</span>
                <span className="font-body text-[10px] font-bold tracking-[0.4em] uppercase" style={{ color: "#FF8C00" }}>
                  Important
                </span>
              </div>
              <h2 className="font-condensed font-black text-3xl lg:text-4xl text-gray-900">Requirements & Notes</h2>
            </div>
            {pkg.visaInfo && (
              <AccordionItem title="Visa Requirements">
                {pkg.visaInfo}
              </AccordionItem>
            )}
            {pkg.termsAndConditions && (
              <AccordionItem title="Payment Terms">
                {pkg.termsAndConditions}
              </AccordionItem>
            )}
            {pkg.importantNotices?.length > 0 && (
              <AccordionItem title="Travel Reminders">
                <ul className="space-y-1">
                  {pkg.importantNotices.map((n, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span style={{ color: "#FF8C00" }}>•</span> {n}
                    </li>
                  ))}
                </ul>
              </AccordionItem>
            )}
            <AccordionItem title="Important Notices" accent>
              Please ensure all travel documents are valid at least 6 months beyond your travel dates. Gladex Travel and Tours Corp. reserves the right to make itinerary adjustments due to weather conditions or local holidays.
            </AccordionItem>
            <AccordionItem title="Terms & Conditions">
              All rates are per person based on twin sharing unless stated otherwise. Downpayment is required to confirm your booking. Full payment is due 30 days before departure. Cancellation fees apply based on the number of days before departure.
            </AccordionItem>
          </div>
        </div>
      )}

      {/* CTA Footer */}
      <div className="py-16 px-4 text-center" style={{ backgroundColor: "#F5F5F5", borderTop: "1px solid #E5E5E5" }}>
        <p className="font-body text-[10px] font-bold tracking-[0.4em] uppercase mb-3" style={{ color: "#FF8C00" }}>— Ready to Travel? —</p>
        <h2 className="font-condensed font-black text-3xl lg:text-4xl text-gray-900 mb-1">
          Explore More Destinations
        </h2>
        <p className="font-body text-sm text-gray-500 mb-6">Discover our full collection of international travel experiences.</p>
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 font-body font-bold text-sm px-8 py-3.5 rounded-full text-white transition-all duration-200 hover:opacity-90"
          style={{ backgroundColor: "#FF8C00" }}
        >
          ← Back to All Destinations
        </button>
      </div>
    </div>
  );
}

function VideoPlaceholder({ name }) {
  return (
    <div
      className="rounded-2xl flex flex-col items-center justify-center border"
      style={{
        aspectRatio: "16/9",
        backgroundColor: "#111",
        borderColor: "rgba(255,255,255,0.1)",
      }}
    >
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
        style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}
      >
        <Play className="w-7 h-7 text-white/50" />
      </div>
      <p className="font-condensed font-bold text-white text-lg mb-2">Official Travel Preview Coming Soon</p>
      <p className="font-body text-gray-500 text-sm text-center max-w-xs">
        We're preparing an exclusive cinematic preview<br />of {name}. Stay tuned.
      </p>
      <div
        className="mt-6 px-6 py-2.5 rounded-full border font-body text-xs font-bold tracking-widest uppercase"
        style={{ borderColor: "#FF8C00", color: "#FF8C00" }}
      >
        + STAY TUNED
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