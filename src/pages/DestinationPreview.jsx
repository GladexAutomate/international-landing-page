// @ts-nocheck
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, MapPin, Check, X, AlertTriangle, ExternalLink, Phone, Globe, Wifi, CreditCard, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { getDestinationBySlug } from "../data/destinations";
import { getBriefingBySlug } from "../data/briefings/index.js";
import { ThemeProvider, useTheme } from "../lib/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";
import ThingsToDoSection from "../components/ThingsToDoSection";
import { getActivitiesForDestination } from "../data/activitiesData";
import {
  getToursByDestination,
  getInsurancePlans,
  createCart,
  createCartTourItem,
  createCartInsuranceItem,
  calculateCartTotal,
  createOrder,
  PAYMENT_METHODS,
} from "../data/addons/index.js";

// Briefing-specific components
import BriefingSection from "../components/briefing/BriefingSection";
import ItineraryTimeline from "../components/briefing/ItineraryTimeline";
import ImmigrationAdvisory from "../components/briefing/ImmigrationAdvisory";
import TravelChecklist from "../components/briefing/TravelChecklist";
import DosAndDonts from "../components/briefing/DosAndDonts";
import BriefingFAQ from "../components/briefing/BriefingFAQ";
import NeedAssistance from "../components/briefing/NeedAssistance";

const LOGO_URL = "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/5ecc9b2cd_Untitled-design-75.png";
const ORANGE = "#FF8C00";

// ─── SECTION DIVIDER ─────────────────────────────────────────────────────────
function SectionDivider({ theme }) {
  return (
    <div
      className="h-px w-full"
      style={{ backgroundColor: theme.border }}
    />
  );
}

// ─── 1. WELCOME SECTION ──────────────────────────────────────────────────────
function WelcomeSection({ briefing, pkg, theme }) {
  const { bgCard, border, textPrimary, textSecondary, isDark } = theme;
  const { welcomeMessage } = briefing;

  return (
    <BriefingSection label="Official Briefing" title={welcomeMessage.title} theme={theme}>
      <div
        className="rounded-2xl border p-6 space-y-4"
        style={{ backgroundColor: bgCard, borderColor: border }}
      >
        {pkg && (
          <div className="flex flex-wrap items-center gap-3 pb-4 border-b" style={{ borderColor: border }}>
            <span
              className="font-condensed font-bold text-xs px-3 py-1.5 rounded-full tracking-widest uppercase"
              style={{ backgroundColor: ORANGE, color: "#fff" }}
            >
              {pkg.name}
            </span>
            <span
              className="font-condensed font-bold text-xs px-3 py-1.5 rounded-full tracking-wider"
              style={{ backgroundColor: isDark ? "#2A2A2A" : "#F0F0F0", color: textSecondary }}
            >
              {pkg.duration}
            </span>
            <span
              className="font-condensed font-bold text-xs px-3 py-1.5 rounded-full tracking-wider"
              style={{ backgroundColor: isDark ? "#2A2A2A" : "#F0F0F0", color: textSecondary }}
            >
              Code: {pkg.code}
            </span>
          </div>
        )}
        {welcomeMessage.body.map((para, i) => (
          <p
            key={i}
            className="font-body text-sm leading-relaxed"
            style={{ color: i === 0 ? textPrimary : textSecondary }}
          >
            {para}
          </p>
        ))}
      </div>
    </BriefingSection>
  );
}

// ─── 2 & 3. INCLUSIONS + EXCLUSIONS ─────────────────────────────────────────
function InclusionsSection({ pkg, briefing, theme }) {
  const { bgCard, border, textPrimary, textSecondary, isDark } = theme;
  if (!pkg) return null;

  // briefing-level overrides take priority over package-level data
  const inclusions = briefing?.briefingInclusions || pkg.inclusions || [];
  const exclusions = briefing?.briefingExclusions || pkg.exclusions || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Inclusions */}
      <BriefingSection label="What's Covered" title="Package Inclusions" theme={theme}>
        <div
          className="rounded-2xl border overflow-hidden"
          style={{ borderColor: isDark ? "#14532D" : "#BBF7D0", backgroundColor: isDark ? "#0D1F10" : "#F0FFF4" }}
        >
          <ul className="px-5 py-4 space-y-2.5">
            {inclusions.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <Check
                  className="w-4 h-4 mt-0.5 shrink-0"
                  style={{ color: "#22C55E" }}
                  strokeWidth={2.5}
                />
                <span className="font-body text-sm leading-relaxed" style={{ color: isDark ? "#86EFAC" : "#166534" }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </BriefingSection>

      {/* Exclusions */}
      <BriefingSection label="Not Covered" title="Package Exclusions" theme={theme}>
        <div
          className="rounded-2xl border overflow-hidden"
          style={{ borderColor: isDark ? "#7F1D1D" : "#FECACA", backgroundColor: isDark ? "#1C0808" : "#FFF5F5" }}
        >
          <ul className="px-5 py-4 space-y-2.5">
            {exclusions.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <X
                  className="w-4 h-4 mt-0.5 shrink-0"
                  style={{ color: "#EF4444" }}
                  strokeWidth={2.5}
                />
                <span className="font-body text-sm leading-relaxed" style={{ color: isDark ? "#FCA5A5" : "#991B1B" }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
          {/* Fuel surcharge + insurance note */}
          {(pkg.fuelSurcharge || pkg.insuranceNote) && (
            <div
              className="px-5 pb-4 pt-1 border-t space-y-1"
              style={{ borderColor: isDark ? "#7F1D1D" : "#FECACA" }}
            >
              {pkg.fuelSurcharge && (
                <p className="font-body text-xs leading-relaxed" style={{ color: isDark ? "#FCA5A5" : "#B91C1C" }}>
                  ⚠️ {pkg.fuelSurcharge}
                </p>
              )}
              {pkg.insuranceNote && (
                <p className="font-body text-xs leading-relaxed" style={{ color: isDark ? "#FCA5A5" : "#B91C1C" }}>
                  🛡️ {pkg.insuranceNote}
                </p>
              )}
            </div>
          )}
        </div>
      </BriefingSection>
    </div>
  );
}

// ─── 5. TRAVEL INFORMATION CENTER ────────────────────────────────────────────
function TravelInfoCenter({ briefing, theme }) {
  const { bgCard, bgAlt, border, textPrimary, textSecondary, isDark } = theme;
  const [activeTab, setActiveTab] = useState("before");
  const { travelInformation } = briefing;
  if (!travelInformation) return null;

  const tabs = [
    { key: "before", label: "Before Departure" },
    { key: "arrival", label: "Upon Arrival" },
  ];

  const items = activeTab === "before"
    ? travelInformation.beforeDeparture
    : travelInformation.uponArrival;

  return (
    <BriefingSection label="Travel Information Center" title="Before & After Your Flight" theme={theme}>
      {/* Tabs */}
      <div className="flex border-b mb-5 text-sm font-semibold" style={{ borderColor: border }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className="px-5 py-2.5 border-b-2 transition-colors font-body whitespace-nowrap"
            style={{
              borderColor: activeTab === tab.key ? ORANGE : "transparent",
              color: activeTab === tab.key ? ORANGE : textSecondary,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <ul className="space-y-3">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3 px-4 py-3 rounded-xl border"
            style={{ backgroundColor: bgCard, borderColor: border }}
          >
            <span
              className="font-condensed font-black text-sm shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: ORANGE }}
            >
              {i + 1}
            </span>
            <span className="font-body text-sm leading-relaxed" style={{ color: textSecondary }}>
              {item}
            </span>
          </li>
        ))}
      </ul>
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
        {arrivalInstructions.map((block, i) => (
          <div
            key={i}
            className="rounded-2xl border overflow-hidden"
            style={{ borderColor: border, backgroundColor: bgCard }}
          >
            <div
              className="flex items-center gap-3 px-5 py-3.5 border-b"
              style={{ borderColor: border, backgroundColor: isDark ? "#1A1A1A" : "#FAFAFA" }}
            >
              <span className="text-xl">{block.icon}</span>
              <h4 className="font-condensed font-bold text-base tracking-wide" style={{ color: textPrimary }}>
                {block.step}
              </h4>
            </div>
            <ul className="px-5 py-4 space-y-2.5">
              {block.details.map((detail, j) => (
                <li key={j} className="flex items-start gap-2.5">
                  <span
                    className="font-condensed font-black text-xs shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white mt-0.5"
                    style={{ backgroundColor: ORANGE }}
                  >
                    {j + 1}
                  </span>
                  <span className="font-body text-sm leading-relaxed" style={{ color: textSecondary }}>
                    {detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
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
              <span className="font-body text-sm leading-relaxed" style={{ color: textSecondary }}>
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
            <p className="font-body text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#22C55E" }}>
              Check-In
            </p>
            <p className="font-condensed font-black text-lg" style={{ color: textPrimary }}>
              {hotelInformation.checkIn}
            </p>
          </div>
          <div
            className="rounded-2xl border px-5 py-4"
            style={{ borderColor: border, backgroundColor: isDark ? "#1C0808" : "#FFF5F5" }}
          >
            <p className="font-body text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#EF4444" }}>
              Check-Out
            </p>
            <p className="font-condensed font-black text-lg" style={{ color: textPrimary }}>
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
                  <span className="font-body text-sm leading-relaxed" style={{ color: textSecondary }}>
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
  const { bgCard, border, textPrimary, textSecondary } = theme;
  const { reminders } = briefing;
  if (!reminders?.length) return null;

  return (
    <BriefingSection label="Before Each Tour Day" title="Tour Reminders" theme={theme}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {reminders.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-3 px-4 py-3.5 rounded-xl border"
            style={{ backgroundColor: bgCard, borderColor: border }}
          >
            <span className="text-lg shrink-0">{item.icon}</span>
            <span className="font-body text-sm leading-relaxed" style={{ color: textSecondary }}>
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </BriefingSection>
  );
}

// ─── 11. SHOPPING ADVISORY ───────────────────────────────────────────────────
function ShoppingAdvisorySection({ briefing, pkg, theme }) {
  const { border, textPrimary, textSecondary, isDark } = theme;
  const advisory = briefing?.shoppingAdvisory;
  if (!advisory) return null;

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
          <p className="font-body text-sm leading-relaxed" style={{ color: isDark ? "#FCA5A5" : "#991B1B" }}>
            {advisory.body}
          </p>

          <ul className="space-y-2.5">
            {advisory.rules.map((rule, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="font-body text-sm shrink-0 mt-0.5" style={{ color: "#EF4444" }}>•</span>
                <span className="font-body text-sm leading-relaxed" style={{ color: isDark ? "#FCA5A5" : "#991B1B" }}>
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
                <span className="font-body text-sm leading-relaxed" style={{ color: textPrimary }}>
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
            style={{ borderColor: border, backgroundColor: isDark ? "#111" : "#FAFAFA" }}
          >
            <p className="font-body text-xs font-bold uppercase tracking-widest mb-2" style={{ color: ORANGE }}>
              Visa Information
            </p>
            <p className="font-body text-sm leading-relaxed" style={{ color: textSecondary }}>
              {pkg.visaInfo}
            </p>
          </div>
        )}
      </div>
    </BriefingSection>
  );
}

// ─── 14. WHAT TO BRING ───────────────────────────────────────────────────────
function WhatToBringGrid({ items = [], theme }) {
  const { bgCard, border, textPrimary, textSecondary } = theme;
  if (!items.length) return null;

  return (
    <BriefingSection label="Packing Guide" title="What to Bring" theme={theme}>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-2 p-3.5 rounded-2xl border text-center"
            style={{ backgroundColor: bgCard, borderColor: border }}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="font-body text-xs leading-snug" style={{ color: textSecondary }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </BriefingSection>
  );
}

// ─── 15. CONNECTIVITY GUIDE ──────────────────────────────────────────────────
function ConnectivitySection({ briefing, theme }) {
  const { bgCard, bgAlt, border, textPrimary, textSecondary, isDark } = theme;
  const guide = briefing?.connectivityGuide;
  if (!guide) return null;

  return (
    <BriefingSection label="Stay Connected" title="Connectivity Guide" theme={theme}>
      <div className="space-y-4">
        {guide.intro && (
          <p className="font-body text-sm leading-relaxed" style={{ color: textSecondary }}>
            {guide.intro}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {guide.options.map((opt, i) => (
            <div
              key={i}
              className="rounded-2xl border overflow-hidden"
              style={{
                borderColor: opt.recommended ? ORANGE : border,
                backgroundColor: bgCard,
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

// ─── 17. DESTINATION GUIDE ───────────────────────────────────────────────────
function DestinationGuideSection({ briefing, theme }) {
  const { bgCard, border, textPrimary, textSecondary, isDark } = theme;
  const guide = briefing?.destinationGuide;
  if (!guide) return null;

  return (
    <BriefingSection label="Know Your Destination" title="Destination Guide" theme={theme}>
      <div className="space-y-4">
        {guide.intro && (
          <p className="font-body text-sm leading-relaxed" style={{ color: textSecondary }}>{guide.intro}</p>
        )}

        {/* Highlights */}
        {guide.highlights?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {guide.highlights.map((hl, i) => (
              <div
                key={i}
                className="flex items-start gap-3 px-4 py-3.5 rounded-xl border"
                style={{ backgroundColor: bgCard, borderColor: border }}
              >
                <span className="text-xl shrink-0">{hl.icon}</span>
                <div>
                  <p className="font-condensed font-bold text-sm tracking-wide mb-0.5" style={{ color: textPrimary }}>
                    {hl.name}
                  </p>
                  <p className="font-body text-xs leading-relaxed" style={{ color: textSecondary }}>
                    {hl.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Practical info */}
        {guide.practicalInfo?.length > 0 && (
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: border, backgroundColor: bgCard }}>
            <div className="px-5 py-3 border-b" style={{ borderColor: border, backgroundColor: isDark ? "#1A1A1A" : "#FAFAFA" }}>
              <p className="font-condensed font-bold text-sm tracking-wide" style={{ color: textPrimary }}>
                Practical Information
              </p>
            </div>
            <div className="px-5 py-4 space-y-3">
              {guide.practicalInfo.map((info, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Globe className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ORANGE }} />
                  <div>
                    <span className="font-body text-xs font-bold block mb-0.5" style={{ color: textPrimary }}>
                      {info.label}
                    </span>
                    <span className="font-body text-xs leading-relaxed" style={{ color: textSecondary }}>
                      {info.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </BriefingSection>
  );
}

// ─── 18. EMERGENCY CONTACTS ──────────────────────────────────────────────────
function EmergencyContactsSection({ briefing, theme }) {
  const { bgCard, border, textPrimary, textSecondary, isDark } = theme;
  const contacts = briefing?.emergencyContacts;
  if (!contacts?.length) return null;

  return (
    <BriefingSection label="Save These Now" title="Emergency Contacts" theme={theme}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {contacts.map((group, i) => (
          <div
            key={i}
            className="rounded-2xl border overflow-hidden"
            style={{ borderColor: border, backgroundColor: bgCard }}
          >
            <div
              className="flex items-center gap-2 px-4 py-3 border-b"
              style={{ borderColor: border, backgroundColor: isDark ? "#1A1A1A" : "#FAFAFA" }}
            >
              <span className="text-lg">{group.icon}</span>
              <p className="font-condensed font-bold text-sm tracking-wide" style={{ color: textPrimary }}>
                {group.category}
              </p>
            </div>
            <ul className="px-4 py-3 space-y-2.5">
              {group.contacts.map((c, j) => (
                <li key={j} className="flex items-start justify-between gap-2">
                  <span className="font-body text-xs" style={{ color: textSecondary }}>{c.label}</span>
                  {c.url ? (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-xs font-semibold hover:opacity-80 transition-opacity shrink-0"
                      style={{ color: ORANGE }}
                    >
                      {c.value}
                    </a>
                  ) : (
                    <a
                      href={`tel:${c.value.replace(/\D/g, "")}`}
                      className="font-body text-xs font-semibold hover:opacity-80 transition-opacity shrink-0"
                      style={{ color: ORANGE }}
                    >
                      {c.value}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </BriefingSection>
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
          <p key={i} className="font-body text-sm leading-relaxed flex items-start gap-2" style={{ color: textSecondary }}>
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
// Data: src/data/addons/mockTours.js → getToursByDestination(slug)
// TODO: Globaltix API Integration — replace mock data with live API in mockTours.js
// TODO: LakbayHub API Integration — merge LakbayHub results in mockTours.js
function OptionalToursSection({ tours, cartTourIds, onAdd, theme }) {
  const { bgCard, border, textPrimary, textSecondary, isDark } = theme;
  if (!tours || tours.length === 0) return null;

  const SOURCE_LABEL = {
    globaltix:     "Globaltix",
    lakbayhub:     "LakbayHub",
    gladex_manual: "Gladex",
  };

  const primaryImage = (tour) =>
    tour.images?.find((i) => i.isPrimary)?.url || null;

  return (
    <BriefingSection label="Add to Your Trip" title="Optional Tours" theme={theme}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tours.map((tour) => {
          const inCart = cartTourIds.includes(tour.id);
          const imgUrl = primaryImage(tour);
          return (
            <div
              key={tour.id}
              className="rounded-2xl border-2 overflow-hidden flex flex-col transition-all duration-200"
              style={{ backgroundColor: bgCard, borderColor: inCart ? ORANGE : border }}
            >
              {/* Tour image */}
              <div className="relative aspect-video overflow-hidden" style={{ backgroundColor: isDark ? "#1A1A1A" : "#F0F0F0" }}>
                {imgUrl ? (
                  <img src={imgUrl} alt={tour.name} className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl">🗺️</div>
                )}
                {/* Provider source badge */}
                <span
                  className="absolute top-2 left-2 font-body text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded-md"
                  style={{ backgroundColor: "rgba(0,0,0,0.6)", color: "#fff" }}
                >
                  {SOURCE_LABEL[tour.source] || tour.source}
                </span>
              </div>

              <div className="p-4 flex flex-col flex-1">
                {/* Category */}
                {tour.category && (
                  <p className="font-body text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: ORANGE }}>
                    {tour.category}
                  </p>
                )}
                <h4 className="font-condensed font-black text-lg leading-tight mb-1" style={{ color: textPrimary }}>
                  {tour.name}
                </h4>
                <p className="font-body text-xs mb-1" style={{ color: textSecondary }}>⏱ {tour.duration}</p>
                {tour.meetingPoint && (
                  <p className="font-body text-xs mb-2 flex items-start gap-1" style={{ color: textSecondary }}>
                    <MapPin className="w-3 h-3 shrink-0 mt-0.5" style={{ color: ORANGE }} />
                    {tour.meetingPoint}
                  </p>
                )}
                <p className="font-body text-sm leading-relaxed mb-3 flex-1" style={{ color: textSecondary }}>
                  {tour.description}
                </p>

                {/* Inclusions */}
                <div className="mb-3">
                  <p className="font-body text-xs font-bold uppercase tracking-wide mb-2" style={{ color: textSecondary }}>
                    Inclusions
                  </p>
                  <ul className="space-y-1">
                    {tour.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-center gap-1.5 font-body text-xs" style={{ color: textSecondary }}>
                        <Check className="w-3 h-3 shrink-0" style={{ color: "#22C55E" }} strokeWidth={2.5} />
                        {inc}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing options */}
                {tour.bookingOptions?.length > 1 && (
                  <div className="mb-3 space-y-1">
                    {tour.bookingOptions.slice(0, 3).map((opt) => (
                      <div key={opt.id} className="flex justify-between font-body text-xs" style={{ color: textSecondary }}>
                        <span>{opt.label}</span>
                        <span className="font-semibold">{opt.price === 0 ? "Free" : `₱${opt.price.toLocaleString()}`}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Footer row */}
                <div className="flex items-center justify-between gap-3 pt-3 border-t" style={{ borderColor: border }}>
                  <div>
                    <span className="font-condensed font-black text-xl" style={{ color: ORANGE }}>
                      ₱{tour.price.toLocaleString()}
                    </span>
                    <span className="font-body text-xs ml-1" style={{ color: textSecondary }}>/adult</span>
                  </div>
                  <button
                    onClick={() => onAdd(tour)}
                    disabled={inCart}
                    className="inline-flex items-center gap-1.5 font-body font-bold text-xs px-4 py-2.5 rounded-xl transition-all active:scale-95 disabled:cursor-default"
                    style={{
                      backgroundColor: inCart ? "transparent" : ORANGE,
                      color: inCart ? "#22C55E" : "#080808",
                      border: inCart ? "1.5px solid #22C55E" : "none",
                    }}
                  >
                    {inCart
                      ? <><Check className="w-3.5 h-3.5" strokeWidth={3} /> Added</>
                      : <><Plus className="w-3.5 h-3.5" /> Add To Trip</>}
                  </button>
                </div>
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

  const PROVIDER_LABEL = {
    starr:         "Starr Insurance",
    gladex_manual: "Gladex",
  };

  return (
    <BriefingSection label="Travel Protection" title="Travel Insurance" theme={theme}>
      <div className="space-y-4">
        {plans.map((plan) => {
          const selected = selectedInsurance?.id === plan.id;
          return (
            <div
              key={plan.id}
              className="rounded-2xl border-2 p-5 transition-all duration-200 cursor-pointer"
              style={{
                backgroundColor: selected ? (isDark ? "#1A0A00" : "#FFF8F0") : bgCard,
                borderColor: selected ? ORANGE : border,
              }}
              onClick={() => onSelect(plan)}
            >
              {/* Header row */}
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl mt-0.5 shrink-0">🛡️</span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      {plan.recommended && (
                        <span className="font-body text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full" style={{ backgroundColor: ORANGE, color: "#080808" }}>
                          Recommended
                        </span>
                      )}
                      <span className="font-body text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded border" style={{ borderColor: border, color: textSecondary }}>
                        {PROVIDER_LABEL[plan.provider] || plan.provider}
                      </span>
                    </div>
                    <h4 className="font-condensed font-black text-lg leading-tight" style={{ color: textPrimary }}>
                      {plan.name}
                    </h4>
                    {/* Plan code visible for transparency */}
                    {plan.planCode && (
                      <p className="font-body text-[10px] mt-0.5" style={{ color: textSecondary }}>
                        Plan: {plan.planCode}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className="font-condensed font-black text-2xl" style={{ color: ORANGE }}>
                      ₱{plan.price.toLocaleString()}
                    </span>
                    <p className="font-body text-xs" style={{ color: textSecondary }}>/person</p>
                  </div>
                  <div
                    className="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all"
                    style={{ borderColor: selected ? ORANGE : border, backgroundColor: selected ? ORANGE : "transparent" }}
                  >
                    {selected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                  </div>
                </div>
              </div>

              {/* Coverage list — from structured coverageLimits if available, else plain strings */}
              {plan.coverageLimits?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  {plan.coverageLimits.map((limit, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "#22C55E" }} />
                      <div>
                        <span className="font-body text-xs font-semibold block" style={{ color: textPrimary }}>{limit.type}</span>
                        <span className="font-body text-xs" style={{ color: textSecondary }}>
                          up to ₱{limit.limitAmount.toLocaleString()} — {limit.description}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  {plan.coverage.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 font-body text-sm" style={{ color: textSecondary }}>
                      <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#22C55E" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {/* Policy document link if available */}
              {plan.documentUrl && (
                <a href={plan.documentUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-body text-xs font-semibold mb-3 hover:opacity-75 transition-opacity"
                  style={{ color: ORANGE }}>
                  <ExternalLink className="w-3 h-3" /> Policy Document
                </a>
              )}

              <button
                onClick={(e) => { e.stopPropagation(); onSelect(plan); }}
                className="w-full font-body font-bold text-sm py-3 rounded-xl transition-all active:scale-[0.99]"
                style={{
                  backgroundColor: selected ? "transparent" : ORANGE,
                  color: selected ? ORANGE : "#080808",
                  border: selected ? `1.5px solid ${ORANGE}` : "none",
                }}
              >
                {selected ? "✓ Selected — Click to Remove" : "Add Insurance"}
              </button>
            </div>
          );
        })}
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
                          {item.tour.duration} · {item.participants.adults} adult{item.participants.adults !== 1 ? "s" : ""}
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
// TODO: Xendit Checkout Integration — replace onClick handler in this function
function CheckoutSection({ cart, total, theme }) {
  const { bgCard, border, textPrimary, textSecondary, isDark } = theme;
  const [selectedMethod, setSelectedMethod]   = useState(null);
  const [customer, setCustomer]               = useState({ name: "", email: "", phone: "" });
  const [orderPlaced, setOrderPlaced]         = useState(null);  // holds last CheckoutOrder
  const isEmpty    = cart.tours.length === 0 && !cart.insurance;
  const hasCustomer = customer.name.trim() && customer.email.trim() && customer.phone.trim();
  const canProceed = !isEmpty && selectedMethod !== null && hasCustomer;

  return (
    <BriefingSection label="Complete Your Order" title="Checkout" theme={theme}>
      <div className="space-y-5">

        {/* Customer details — required for Xendit invoice + Starr enrollment */}
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

        {/* Payment method selector */}
        <div>
          <p className="font-body text-sm font-semibold mb-3" style={{ color: textSecondary }}>
            Select Payment Method
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {PAYMENT_METHODS.map((method) => {
              const selected = selectedMethod === method.id;
              return (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(selected ? null : method.id)}
                  className="flex flex-col items-center gap-2 py-4 px-3 rounded-xl border-2 font-body font-semibold text-sm transition-all active:scale-95"
                  style={{
                    backgroundColor: selected ? (isDark ? "#1A0A00" : "#FFF8F0") : bgCard,
                    borderColor: selected ? ORANGE : border,
                    color: selected ? ORANGE : textSecondary,
                  }}
                >
                  <span className="text-2xl">{method.emoji}</span>
                  {method.label}
                </button>
              );
            })}
          </div>
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

        {/* Proceed button */}
        {/* TODO: Xendit Checkout Integration */}
        <button
          disabled={!canProceed}
          className="w-full font-condensed font-black text-xl py-4 rounded-xl transition-all active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ backgroundColor: ORANGE, color: "#080808" }}
          onClick={() => {
            // Build the full CheckoutOrder using the Cart model + customer details
            const order = createOrder(cart, customer, selectedMethod);
            setOrderPlaced(order);
            console.group("[CHECKOUT] Order created");
            console.log("[CHECKOUT] Order ID:     ", order.orderId);
            console.log("[CHECKOUT] Total:        ₱" + order.total.toLocaleString());
            console.log("[CHECKOUT] Method:       ", order.paymentMethod);
            console.log("[CHECKOUT] Customer:     ", order.customer);
            console.log("[CHECKOUT] Line items:   ", order.lineItems);
            console.log("[CHECKOUT] Full order:   ", order);
            console.groupEnd();
            // TODO: Xendit Checkout Integration
            //   1. POST order to your Supabase orders table for persistence
            //   2. Call Xendit API: POST /v2/invoices with orderId as externalId
            //   3. Redirect to order.xendit.checkoutUrl for payment
          }}
        >
          {isEmpty
            ? "Add Items to Continue"
            : !selectedMethod
              ? "Select a Payment Method"
              : `Proceed to Payment  •  ₱${total.toLocaleString()}`}
        </button>

        {!isEmpty && !selectedMethod && (
          <p className="font-body text-xs text-center" style={{ color: textSecondary }}>
            Please select a payment method above to continue.
          </p>
        )}
      </div>
    </BriefingSection>
  );
}

// ─── MAIN PAGE CONTENT ────────────────────────────────────────────────────────
function PreviewContent() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const dest = getDestinationBySlug(slug);
  const briefing = getBriefingBySlug(slug);

  // Use the first package for briefing content (most destinations have one)
  const pkg = dest?.packages?.[0] || null;

  // Theme object passed to all briefing components
  const theme = {
    isDark,
    bg: isDark ? "#111111" : "#F5F5F5",
    bgCard: isDark ? "#1A1A1A" : "#FFFFFF",
    bgAlt: isDark ? "#161616" : "#F0F0F0",
    border: isDark ? "#2A2A2A" : "#E5E5E5",
    textPrimary: isDark ? "#FFFFFF" : "#111111",
    textSecondary: isDark ? "#A0A0A0" : "#555555",
  };

  const { bg, bgCard, bgAlt, border, textPrimary, textSecondary, navBg, navBorder } = {
    ...theme,
    navBg: isDark ? "#0D0D0D" : "#FFFFFF",
    navBorder: isDark ? "#222222" : "#E5E5E5",
  };

  const activitiesData = getActivitiesForDestination(slug);

  // ── Cart state (full Cart model — src/types/addons.js) ───────────────────
  const [cart, setCart] = useState(() => createCart(slug));

  // Recompute totals whenever tours or insurance change
  const _updateTotals = (tours, insurance) => {
    const totals = calculateCartTotal(tours, insurance);
    return totals;
  };

  const addTourToCart = (tour) =>
    setCart((prev) => {
      if (prev.tours.find((t) => t.cartItemId === tour.id || t.tour?.id === tour.id)) return prev;
      const item  = createCartTourItem(tour);
      const tours = [...prev.tours, item];
      return { ...prev, tours, ..._updateTotals(tours, prev.insurance) };
    });

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

  if (!dest) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="font-condensed text-2xl font-bold text-gray-400 mb-4">Destination not found</p>
          <button onClick={() => navigate("/")} className="font-body text-sm underline" style={{ color: ORANGE }}>
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Section spacing constant
  const sectionGap = "py-10 lg:py-12";


  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: bg }}>
      <ThemeToggle />

      {/* ── NAVBAR ── */}
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

      {/* ── HERO ── */}
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
          <p className="text-xs font-bold tracking-[0.3em] uppercase mb-2" style={{ color: ORANGE }}>
            Destination Briefing Video
          </p>
          <h2 className="font-condensed font-black text-white text-3xl lg:text-4xl">Watch Before You Travel</h2>
          <p className="text-white/60 text-sm mt-2 max-w-md mx-auto">
            Your official travel briefing video — watch to prepare for your upcoming trip.
          </p>
        </div>

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
              <video
                controls
                className="absolute inset-0 w-full h-full object-cover"
                style={{ backgroundColor: "#000" }}
              >
                <source src={dest.videoUrl} type="video/mp4" />
              </video>
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

      {/* ══════════════════════════════════════════════════════════════════════
          BRIEFING SECTIONS — only renders when a briefing exists for this slug
          ══════════════════════════════════════════════════════════════════════ */}
      {briefing && (
        <div className="transition-colors duration-300" style={{ backgroundColor: bg }}>
          <div className="max-w-4xl mx-auto px-4 lg:px-6">

            {/* ── 1. WELCOME ── */}
            <div className={sectionGap}>
              <WelcomeSection briefing={briefing} pkg={pkg} theme={theme} />
            </div>
            <SectionDivider theme={theme} />

            {/* ── 2 & 3. INCLUSIONS + EXCLUSIONS ── */}
            <div className={sectionGap}>
              <InclusionsSection pkg={pkg} briefing={briefing} theme={theme} />
            </div>
            <SectionDivider theme={theme} />

            {/* ── 4. ITINERARY TIMELINE ── */}
            {pkg?.itinerary?.length > 0 && (
              <>
                <div className={sectionGap}>
                  <BriefingSection label="Day by Day" title="Itinerary Timeline" theme={theme}>
                    <ItineraryTimeline itinerary={pkg.itinerary} theme={theme} />
                  </BriefingSection>
                </div>
                <SectionDivider theme={theme} />
              </>
            )}

            {/* ── 5. TRAVEL INFORMATION CENTER ── */}
            <div className={sectionGap}>
              <TravelInfoCenter briefing={briefing} theme={theme} />
            </div>
            <SectionDivider theme={theme} />

            {/* ── 6. ARRIVAL INSTRUCTIONS ── */}
            <div className={sectionGap}>
              <ArrivalSection briefing={briefing} theme={theme} />
            </div>
            <SectionDivider theme={theme} />

            {/* ── 7. TRANSFER INSTRUCTIONS ── */}
            <div className={sectionGap}>
              <TransferSection briefing={briefing} theme={theme} />
            </div>
            <SectionDivider theme={theme} />

            {/* ── 8. HOTEL CHECK-IN ── */}
            <div className={sectionGap}>
              <HotelSection briefing={briefing} theme={theme} />
            </div>
            <SectionDivider theme={theme} />

            {/* ── 9. TOUR REMINDERS ── */}
            <div className={sectionGap}>
              <RemindersSection briefing={briefing} theme={theme} />
            </div>
            <SectionDivider theme={theme} />

            {/* ── 10. IMMIGRATION ADVISORY ── */}
            {briefing.immigrationAdvisory?.length > 0 && (
              <>
                <div className={sectionGap}>
                  <BriefingSection label="Philippine Immigration" title="Immigration Advisory" theme={theme}>
                    <div className="mb-4">
                      <p className="font-body text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                        Tap your traveler type below to see the documents required at Philippine immigration upon departure. Bring originals and photocopies of all documents.
                      </p>
                    </div>
                    <ImmigrationAdvisory advisory={briefing.immigrationAdvisory} theme={theme} />
                  </BriefingSection>
                </div>
                <SectionDivider theme={theme} />
              </>
            )}

            {/* ── 11. SHOPPING ADVISORY ── */}
            <div className={sectionGap}>
              <ShoppingAdvisorySection briefing={briefing} pkg={pkg} theme={theme} />
            </div>
            <SectionDivider theme={theme} />

            {/* ── 12. REQUIREMENTS ── */}
            <div className={sectionGap}>
              <RequirementsSection pkg={pkg} theme={theme} />
            </div>
            <SectionDivider theme={theme} />

            {/* ── 12b. IMPORTANT NOTICES ── */}
            {pkg?.importantNotices?.length > 0 && (
              <>
                <div className={sectionGap}>
                  <ImportantNoticesSection pkg={pkg} theme={theme} />
                </div>
                <SectionDivider theme={theme} />
              </>
            )}

            {/* ── 13. TRAVEL READINESS CHECKLIST ── */}
            {briefing.checklist?.length > 0 && (
              <>
                <div className={sectionGap}>
                  <BriefingSection label="Pre-Departure" title="Travel Readiness Checklist" theme={theme}>
                    <TravelChecklist
                      items={briefing.checklist}
                      storageKey={`gladex-checklist-${slug}`}
                      theme={theme}
                    />
                  </BriefingSection>
                </div>
                <SectionDivider theme={theme} />
              </>
            )}

            {/* ── 14. WHAT TO BRING ── */}
            {briefing.whatToBring?.length > 0 && (
              <>
                <div className={sectionGap}>
                  <WhatToBringGrid items={briefing.whatToBring} theme={theme} />
                </div>
                <SectionDivider theme={theme} />
              </>
            )}

            {/* ── 15. CONNECTIVITY GUIDE ── */}
            <div className={sectionGap}>
              <ConnectivitySection briefing={briefing} theme={theme} />
            </div>
            <SectionDivider theme={theme} />

            {/* ── 16. CURRENCY GUIDE ── */}
            <div className={sectionGap}>
              <CurrencySection briefing={briefing} theme={theme} />
            </div>
            <SectionDivider theme={theme} />

            {/* ── 17. DESTINATION GUIDE ── */}
            <div className={sectionGap}>
              <DestinationGuideSection briefing={briefing} theme={theme} />
            </div>
            <SectionDivider theme={theme} />

            {/* ════════════════════════════════════════════════════════════════
                ADD-ONS MODULE
                ════════════════════════════════════════════════════════════════ */}

            {/* ── OPTIONAL TOURS ── */}
            {/* TODO: Globaltix API Integration — replace getToursByDestination() in mockTours.js */}
            {/* TODO: LakbayHub API Integration — merge results in mockTours.js */}
            {(() => {
              const destTours = getToursByDestination(slug);
              if (destTours.length === 0) return null;
              return (
                <>
                  <div className={sectionGap}>
                    <OptionalToursSection
                      tours={destTours}
                      cartTourIds={cart.tours.map((t) => t.tour?.id)}
                      onAdd={addTourToCart}
                      theme={theme}
                    />
                  </div>
                  <SectionDivider theme={theme} />
                </>
              );
            })()}

            {/* ── TRAVEL INSURANCE ── */}
            {/* TODO: Starr Insurance API Integration — replace getInsurancePlans() in mockInsurance.js */}
            <div className={sectionGap}>
              <TravelInsuranceSection
                plans={getInsurancePlans()}
                selectedInsurance={cart.insurance?.plan || cart.insurance}
                onSelect={selectInsurance}
                theme={theme}
              />
            </div>
            <SectionDivider theme={theme} />

            {/* ── CART SUMMARY ── */}
            <div className={sectionGap}>
              <CartSummarySection
                cart={cart}
                total={cartTotal}
                onRemoveTour={removeTourFromCart}
                onRemoveInsurance={removeInsurance}
                theme={theme}
              />
            </div>
            <SectionDivider theme={theme} />

            {/* ── CHECKOUT ── */}
            {/* TODO: Xendit Checkout Integration */}
            <div className={sectionGap}>
              <CheckoutSection
                cart={cart}
                total={cartTotal}
                theme={theme}
              />
            </div>
            <SectionDivider theme={theme} />

            {/* ════════════════════════════════════════════════════════════════
                END ADD-ONS MODULE
                ════════════════════════════════════════════════════════════════ */}

            {/* ── 18. EMERGENCY CONTACTS ── */}
            <div className={sectionGap}>
              <EmergencyContactsSection briefing={briefing} theme={theme} />
            </div>
            <SectionDivider theme={theme} />

            {/* ── 19. DO'S AND DON'TS ── */}
            {briefing.dosAndDonts && (
              <>
                <div className={sectionGap}>
                  <BriefingSection label="Behavior Guidelines" title="Important Do's & Don'ts" theme={theme}>
                    <DosAndDonts
                      dos={briefing.dosAndDonts.dos}
                      donts={briefing.dosAndDonts.donts}
                      theme={theme}
                    />
                  </BriefingSection>
                </div>
                <SectionDivider theme={theme} />
              </>
            )}

            {/* ── 20. FAQ ── */}
            {briefing.faqs?.length > 0 && (
              <>
                <div className={sectionGap}>
                  <BriefingSection label="Common Questions" title="Frequently Asked Questions" theme={theme}>
                    <BriefingFAQ faqs={briefing.faqs} theme={theme} />
                  </BriefingSection>
                </div>
                <SectionDivider theme={theme} />
              </>
            )}

            {/* ── 21. NEED ASSISTANCE ── */}
            {briefing.assistanceContacts && (
              <div className={sectionGap}>
                <BriefingSection label="Contact Us" title="Need Assistance?" theme={theme}>
                  <NeedAssistance contacts={briefing.assistanceContacts} theme={theme} />
                </BriefingSection>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          ACTIVITIES / ATTRACTIONS CAROUSEL (moved to bottom of page)
          ══════════════════════════════════════════════════════════════════════ */}
      <div
        className="border-t py-12 px-4 lg:px-10 transition-colors duration-300 font-body"
        style={{ backgroundColor: isDark ? "#111111" : "#FFFFFF", borderColor: theme.border }}
      >
        <div className="max-w-6xl mx-auto">
          <ThingsToDoSection
            isDark={isDark}
            textPrimary={theme.textPrimary}
            textSecondary={theme.textSecondary}
            border={theme.border}
            bgCard={theme.bgCard}
            bgAlt={theme.bgAlt}
            activitiesData={activitiesData}
          />
        </div>
      </div>

      {/* ── NAVIGATION FOOTER ── */}
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
