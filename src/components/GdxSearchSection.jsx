// @ts-nocheck
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { resolveDestinationSlug } from "../utils/destinationResolver";

const ORANGE = "#FF8C00";
const GDX_PATTERN = /^[0-9]+$/;

export default function GdxSearchSection({ isDark }) {
  const navigate = useNavigate();
  const [gdxInput, setGdxInput]   = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError]         = useState(null);

  const bg       = isDark ? "#0D0D0D" : "#F0F0F0";
  const bgCard   = isDark ? "#1A1A1A" : "#FFFFFF";
  const border   = isDark ? "#2A2A2A" : "#E5E5E5";
  const textPrimary   = isDark ? "#FFFFFF" : "#111111";
  const textSecondary = isDark ? "#A0A0A0" : "#555555";

  const handleSearch = async () => {
    const query = gdxInput.trim().toUpperCase();
    if (!query) return;

    // Validate format
    if (!GDX_PATTERN.test(query)) {
      setError("Please enter a valid GDX number (numbers only).");
      return;
    }

    setError(null);
    setIsSearching(true);

    try {
      // Query Supabase for the booking
     console.log("Searching GDX:", query);

const { data, error: supaError } = await supabase
  .from("bookings_6fbdd6b2")
  .select("*")
  .eq("gdx", query);

console.log("Supabase Data:", data);
console.log("Supabase Error:", supaError);

      if (supaError || !data) {
        setError(`No booking found for GDX code ${query}. Please check your code and try again.`);
        return;
      }

      // Resolve destination slug from booking data
      const slug = resolveDestinationSlug(data);

      if (!slug) {
        setError(
          "Booking found but destination could not be determined. Please contact Gladex Tours for assistance."
        );
        return;
      }

      // Navigate to the correct destination briefing page, passing booking data
      navigate(`/destination/${slug}`, {
        state: { booking: data },
      });

    } catch (err) {
      console.error("[GDX Search] Unexpected error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <section
      className="py-14 px-4 lg:px-10 transition-colors duration-300"
      style={{ backgroundColor: bg }}
    >
      <div className="max-w-2xl mx-auto text-center">

        {/* Label */}
        <p
          className="font-body text-xs font-bold tracking-[0.4em] uppercase mb-3"
          style={{ color: ORANGE }}
        >
          ✦ Booking Verification ✦
        </p>

        {/* Heading */}
        <h2
          className="font-condensed font-black text-3xl lg:text-4xl mb-2 leading-tight"
          style={{ color: textPrimary, letterSpacing: "0.03em" }}
        >
          Access Your Briefing
        </h2>

        {/* Subheading */}
        <p
          className="font-body text-sm lg:text-base mb-8 max-w-md mx-auto leading-relaxed"
          style={{ color: textSecondary }}
        >
          Enter your GDX booking number to view your personalised travel briefing and trip details.
        </p>

        {/* Search bar */}
        <div
          className="flex items-stretch gap-3 rounded-2xl border p-2 shadow-sm"
          style={{ backgroundColor: bgCard, borderColor: gdxInput ? ORANGE : border }}
        >
          <input
            type="text"
            inputMode="numeric"
            value={gdxInput}
            onChange={(e) => {
              setGdxInput(e.target.value.replace(/[^0-9]/g, ""));
              setError(null);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Enter your GDX number  (e.g. 7664)"
            maxLength={20}
            aria-label="GDX booking number"
            className="flex-1 bg-transparent font-body font-semibold text-base px-3 py-2 focus:outline-none min-w-0"
            style={{ color: textPrimary }}
          />
          <button
            onClick={handleSearch}
            disabled={isSearching || !gdxInput.trim()}
            aria-label="Search my booking"
            className="inline-flex items-center gap-2 font-body font-bold text-sm px-6 py-3 rounded-xl transition-all hover:opacity-90 active:scale-95 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: ORANGE, color: "#080808" }}
          >
            <Search className="w-4 h-4" />
            {isSearching ? "Searching…" : "Find Briefing"}
          </button>
        </div>

        {/* Error state */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="font-body text-sm mt-4 px-4 py-3 rounded-xl border"
              style={{
                color: "#EF4444",
                borderColor: isDark ? "#7F1D1D" : "#FECACA",
                backgroundColor: isDark ? "#1C0808" : "#FFF5F5",
              }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Helper text */}
        <p className="font-body text-xs mt-5" style={{ color: textSecondary }}>
          Your GDX number was provided in your booking confirmation from Gladex Tours.
        </p>

      </div>
    </section>
  );
}
