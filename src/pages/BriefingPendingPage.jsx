// @ts-nocheck
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Phone } from "lucide-react";
import { ThemeProvider, useTheme } from "../lib/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";

const ORANGE   = "#FF9913";
const LOGO_URL = "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/5ecc9b2cd_Untitled-design-75.png";

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

function BriefingPendingInner() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { isDark } = useTheme();

  const bg            = isDark ? "#080808" : "#F0F0F0";
  const textPrimary   = isDark ? "#FFFFFF" : "#111111";
  const textSecondary = isDark ? "#A0A0A0" : "#555555";
  const border        = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

  const booking = location.state?.booking ?? null;
  const gdx     = location.state?.gdx ?? booking?.gdx ?? null;

  // Extract first name from lead_name for a personal touch
  function getFirstName(name) {
    if (!name) return null;
    const n = String(name).trim();
    if (n.includes(",")) {
      // "DELA CRUZ, JUAN" → "JUAN"
      const parts = n.split(",");
      return parts[1]?.trim().split(/\s+/)[0] ?? null;
    }
    // "JUAN DELA CRUZ" → "JUAN"
    return n.split(/\s+/)[0] ?? null;
  }
  const firstName = getFirstName(booking?.lead_name);

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 transition-colors duration-500"
      style={{ backgroundColor: bg }}
    >
      <BackgroundOrbs isDark={isDark} />

      <div className="relative z-10 w-full flex flex-col items-center">

        {/* Logo */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src={LOGO_URL} alt="Gladex Tours" className="h-14 object-contain" />
        </motion.div>

        {/* Card */}
        <motion.div
          className="w-full max-w-md rounded-3xl p-8 text-center"
          style={{
            backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
            boxShadow: isDark
              ? "0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,153,19,0.1)"
              : "0 24px 80px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,153,19,0.12)",
          }}
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          {/* Icon */}
          <motion.div
            className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{
              backgroundColor: "rgba(255,153,19,0.1)",
              border: "1.5px solid rgba(255,153,19,0.3)",
            }}
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Clock size={36} style={{ color: ORANGE }} />
          </motion.div>

          {/* Greeting */}
          {firstName && (
            <p
              className="font-body text-sm font-semibold mb-1 uppercase tracking-widest"
              style={{ color: ORANGE }}
            >
              Hi, {firstName}!
            </p>
          )}

          {/* Title */}
          <h1
            className="font-condensed font-black text-2xl sm:text-3xl mb-3 leading-tight"
            style={{ color: textPrimary }}
          >
            Your Briefing is Being Prepared
          </h1>

          {/* Body */}
          <p
            className="font-body text-sm leading-relaxed mb-6"
            style={{ color: textSecondary }}
          >
            We're currently putting together your travel briefing. It will be ready
            soon — please check back later or contact your travel coordinator
            for assistance.
          </p>

          {/* GDX badge */}
          {gdx && (
            <div
              className="inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 mb-6"
              style={{
                backgroundColor: "rgba(255,153,19,0.08)",
                border: "1px solid rgba(255,153,19,0.22)",
              }}
            >
              <span
                className="font-body text-xs font-semibold uppercase tracking-widest"
                style={{ color: textSecondary }}
              >
                GDX
              </span>
              <span
                className="font-condensed font-black text-base"
                style={{ color: ORANGE }}
              >
                {gdx}
              </span>
            </div>
          )}

          {/* Status pill */}
          <div
            className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 mb-8"
            style={{
              backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
              border: `1px solid ${border}`,
            }}
          >
            <motion.div
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: ORANGE }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <span
              className="font-body text-xs font-medium"
              style={{ color: textSecondary }}
            >
              Landing page is ongoing — not yet complete
            </span>
          </div>

          {/* Contact hint */}
          <div
            className="flex items-center justify-center gap-2 mb-8"
            style={{ color: textSecondary }}
          >
            <Phone size={14} />
            <span className="font-body text-xs">
              Questions? Contact us on{" "}
              <span style={{ color: ORANGE, fontWeight: 700 }}>
                Facebook: Gladex Tours
              </span>
            </span>
          </div>

          {/* Back button */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-body text-sm font-semibold transition-all duration-200"
            style={{
              backgroundColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)",
              color: textPrimary,
              border: `1px solid ${border}`,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = ORANGE; e.currentTarget.style.color = ORANGE; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = border; e.currentTarget.style.color = textPrimary; }}
          >
            <ArrowLeft size={16} />
            Back to Home
          </button>
        </motion.div>

        {/* Footer */}
        <motion.p
          className="mt-8 font-body text-xs text-center"
          style={{ color: isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.3)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          © {new Date().getFullYear()} Gladex Tours — All rights reserved
        </motion.p>
      </div>
    </div>
  );
}

export default function BriefingPendingPage() {
  return (
    <ThemeProvider>
      <ThemeToggle />
      <BriefingPendingInner />
    </ThemeProvider>
  );
}
