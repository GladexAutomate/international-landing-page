// @ts-nocheck
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, AlertTriangle, Download } from "lucide-react";
import { ThemeProvider, useTheme } from "../lib/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";
import BriefingSection from "../components/briefing/BriefingSection";
import NeedAssistance from "../components/briefing/NeedAssistance";

const ORANGE = "#FF9913";
const CARD_BG = "#FFF5EC";
const LOGO_URL = "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/5ecc9b2cd_Untitled-design-75.png";

const orangeTheme = {
  bgCard: "rgba(255,255,255,0.1)",
  border: "rgba(255,255,255,0.25)",
  textPrimary: "#FFFFFF",
  textSecondary: "rgba(255,255,255,0.85)",
  accent: "#FFFFFF",
  isDark: false,
};

const lightTheme = {
  bgCard: "#FFFFFF",
  border: "rgba(255,153,19,0.2)",
  textPrimary: "#111111",
  textSecondary: "#555555",
  accent: ORANGE,
  isDark: false,
};

// ─── DATA ────────────────────────────────────────────────────────────────────

const FAQS = [
  { q: "Ano ang Group Visa?", a: "Ang Group Visa ay visa application processed as part of an accredited tour group. Requirements are simplified, as financial documents are generally not required." },
  { q: "Magkano ang Japan E-Group Visa Fee?", a: "The Japan E-Group Visa Fee is ₱6,500 per person, subject to change without prior notice." },
  { q: "Totoo bang walang financial documents?", a: "Generally, financial documents are not required under the Japan Group Visa program. However, the Japanese Embassy may still require additional supporting documents for verification or further assessment if deemed necessary during the evaluation process." },
  { q: "Guaranteed ba ang visa approval?", a: "Qualified applicants with no history of visa denial, overstaying, immigration violations, or adverse travel records are generally approved under the Japan Group Visa program. Terms and Conditions Apply." },
  { q: "Kailan dapat mag-apply?", a: "Recommended application period is 46–90 days before departure. Applications within 45 days before departure are subject to slot availability." },
  { q: "May sticker visa ba sa passport?", a: "No. Japan E-Group Visa is usually issued as a separate visa document (paper visa) and not as a visa sticker attached to the passport." },
  { q: "Pwede bang mag-DIY travel gamit ang E-Group Visa?", a: "No. Travelers must follow the approved itinerary and travel with the accredited group tour." },
  { q: "Pwede bang humiwalay sa group habang nasa Japan?", a: "No. Group Visa holders are expected to follow the approved group itinerary and tour arrangements." },
  { q: "Pwede bang mag-extend ng stay sa Japan?", a: "No. Group Visa holders must enter and exit Japan according to the approved travel dates." },
  { q: "Pwede ba ang may previous Japan visa?", a: "Yes. Previous Japan visa holders may still apply under the Group Visa program." },
  { q: "Sino ang hindi qualified?", a: "Applicants with previous visa denials (including Japan visa denials), overstaying records, immigration violations, or adverse travel history may not qualify." },
  { q: "Kailangan ba ng PSA Birth Certificate?", a: "Yes. First-time applicants are required to submit an original PSA Birth Certificate. Married applicants may also be required to submit an original PSA Marriage Certificate." },
  { q: "Ano mangyayari kung may kulang na requirements?", a: "The Japanese Embassy may request additional documents or the application may be delayed until requirements are completed." },
  { q: "Refundable ba ang visa fee?", a: "No. Visa fees, processing fees, deposits, and other charges are non-refundable regardless of the visa result." },
  { q: "Limited ba ang slots?", a: "Yes. Group Visa slots are limited and processed on a first-come, first-served basis." },
  { q: "May penalty ba kapag nag-TNT or nag-overstay?", a: "Yes. Group Visa travelers are required to sign a waiver form. Applicable penalties and liabilities (₱500,000) may apply based on the signed agreement." },
  { q: "Guaranteed ba na makakalusot sa Immigration kapag approved ang Group Visa?", a: "No. Immigration clearance is a separate process. Final approval to depart remains at the discretion of the Philippine Immigration Officer on the day of travel." },
  { q: "Pwede bang ma-offload kahit approved ang visa?", a: "Yes. Approval of a visa does not automatically guarantee departure clearance from Philippine Immigration." },
  { q: "Ano ang common reasons ng Immigration offload?", a: "Immigration may conduct additional assessment for travelers with incomplete travel documents, inconsistent answers during interview, suspected unauthorized employment abroad, or other immigration concerns." },
  { q: "Magkano ang penalty kung ma-offload?", a: "Applicable penalties, forfeitures, and charges will be based on the signed waiver form and agreed tour terms and conditions." },
  { q: "Pwede ba ang solo traveler?", a: "Yes, subject to available group visa slots and Single Supplement fee." },
  { q: "Pwede ba ang senior citizen?", a: "Yes, provided all requirements are met and the traveler is fit to travel." },
  { q: "Kailangan ba ng personal appearance?", a: "Generally, no. However, the Japanese Embassy may request additional documents or verification if necessary." },
  { q: "Pwede ba ang unemployed?", a: "Yes. Applications are evaluated on a case-to-case basis. Additional supporting documents may be requested if necessary." },
  { q: "Ano ang pinakamadalas na dahilan ng visa denial?", a: "Previous visa denials, overstaying records, immigration violations, incomplete documents, or inconsistencies in submitted information may affect the application." },
];

const REMINDERS = [
  "Visa Fee: ₱6,500 per person. Subject to change without prior notice.",
  "Financial documents are generally not required under the Japan Group Visa program.",
  "However, the Japanese Embassy may still require additional supporting documents for verification or further assessment if deemed necessary.",
  "Japan E-Group Visa is usually issued as a paper visa — not as a sticker in your passport.",
  "Approval of the visa and approval by Philippine Immigration are separate processes.",
  "Submission of complete requirements does not guarantee visa approval or departure clearance.",
  "E-Group Visa travelers are expected to follow the approved itinerary and tour arrangements throughout the trip.",
  "Visa fees, processing fees, deposits, and other charges are non-refundable regardless of visa result.",
  "Terms and conditions apply. E-Group Visa travelers are required to sign a waiver form.",
];

const REQUIREMENTS = [
  {
    title: "Valid Passport",
    notes: [
      "Must have the holder's signature inside the passport.",
      "Submit previously issued Japan Visa if applicable (original passport with the visa is acceptable).",
    ],
  },
  {
    title: "Photocopy of Passport with Signature",
    notes: [],
  },
  {
    title: "Visa Application Form",
    formLink: { url: "https://drive.google.com/file/d/1iNHR07TfbzN-8kHcveSKYIP2ulBYJzH2/view?usp=sharing", label: "Download Application Form" },
    notes: [],
    formRules: [
      "Must be printed on A4-size paper, strictly typewritten, and signed using black ink.",
      "No back-to-back printing allowed.",
      "Only the signature field may be handwritten, in black or blue ink.",
      "E-signatures are not accepted.",
      'All unused fields must be marked as "N/A".',
      'Do not fill in the "Date of Application" field — leave this blank.',
    ],
  },
  {
    title: "Two (2) Copies of Recent Photo — 4.5 cm × 3.5 cm",
    notes: [
      "Avoid wearing white or light-colored shirts.",
      "No smiling, no jewelry, no headwear. Hair must be pulled back to clearly show the face.",
    ],
  },
  {
    title: "For Corporate Incentive Tours Only",
    badge: "Corporate Only",
    notes: [
      "Submit documents that show a profile or overview of the sponsoring corporation:",
      "— Hard copy of the company website",
      "— Photocopy of the Certificate of Business Registration or equivalent document",
    ],
  },
  {
    title: "Original PSA Birth Certificate",
    badge: "Waived if Previous Japan Visa",
    notes: ["Must be issued at least one (1) year before application."],
    subCases: [
      { label: "If unreadable", items: ["Submit PSA Birth Certificate issued by Local Civil Registrar"] },
      { label: "If late registered", items: ["Baptismal Certificate", "School Record (Form 137)"] },
      { label: "If no record on file", items: ["PSA Birth Certificate from Local Civil Registrar", "Negative Certificate issued by PSA"] },
      { label: "If incomplete or wrong information", items: ["Affidavit of Discrepancy"] },
    ],
  },
  {
    title: "Original PSA Marriage Certificate",
    badge: "Waived if Previous Japan Visa",
    notes: ["Must be issued at least one (1) year before application."],
    subCases: [
      { label: "If unreadable", items: ["Submit PSA Marriage Certificate issued by Local Civil Registrar"] },
      { label: "If no record on file", items: ["PSA Marriage Certificate from Local Civil Registrar", "Negative Certificate issued by PSA"] },
      { label: "If incomplete or wrong information", items: ["Affidavit of Discrepancy"] },
    ],
  },
  {
    title: "Authorization & Waiver Documents",
    notes: ["Print, sign, and submit all four (4) documents below. Signature fields only."],
    downloads: [
      { label: "PSA Authorization Letter", sub: "1 copy" },
      { label: "Travel Agency Authorization Letter", sub: "2 copies" },
      { label: "Waiver for Visa Application", sub: "1 copy" },
      { label: "Passenger's Tour Waiver", sub: "1 copy" },
    ],
  },
];

const CONTACTS = {
  whatsapp: { label: "WhatsApp Gladex", url: "https://wa.me/639178752200", number: "+63 917 875 2200", subtext: "Available during business hours" },
  hotline:  { label: "Gladex Hotline",  number: "+63 917 875 2200", subtext: "For urgent visa concerns" },
};

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

function FAQItem({ q, a }) {
  return (
    <div className="rounded-2xl border px-5 py-4" style={{ borderColor: "rgba(255,153,19,0.2)", backgroundColor: "#FFFFFF" }}>
      <p className="font-body text-base font-semibold leading-snug mb-2" style={{ color: "#111111" }}>{q}</p>
      <p className="font-body text-base leading-relaxed" style={{ color: "#555555" }}>{a}</p>
    </div>
  );
}

function RequirementItem({ req, index }) {
  return (
    <div className="rounded-2xl border p-5 space-y-3" style={{ borderColor: "rgba(255,153,19,0.2)", backgroundColor: "#FFFFFF" }}>
      {/* Header */}
      <div className="flex items-start gap-3">
        <span
          className="font-condensed font-black text-sm shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white mt-0.5"
          style={{ backgroundColor: ORANGE }}
        >
          {index + 1}
        </span>
        <div className="flex-1">
          <span className="font-body text-base font-semibold leading-snug" style={{ color: "#111111" }}>
            {req.title}
          </span>
          {req.badge && (
            <span
              className="ml-2 inline-block text-xs font-bold tracking-wide uppercase px-2 py-0.5 rounded-full"
              style={{ backgroundColor: "rgba(255,153,19,0.12)", color: ORANGE }}
            >
              {req.badge}
            </span>
          )}
        </div>
      </div>

      {/* Notes */}
      {req.notes?.length > 0 && (
        <ul className="space-y-1.5 ml-10">
          {req.notes.map((n, i) => (
            <li key={i} className="font-body text-sm leading-relaxed" style={{ color: "#555555" }}>
              {n}
            </li>
          ))}
        </ul>
      )}

      {/* Form download link */}
      {req.formLink && (
        <div className="ml-10">
          <a
            href={req.formLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold font-body transition-all hover:scale-105 active:scale-95"
            style={{ backgroundColor: ORANGE, color: "#FFFFFF" }}
          >
            <Download className="w-4 h-4" />
            {req.formLink.label}
          </a>
        </div>
      )}

      {/* Form fill rules */}
      {req.formRules?.length > 0 && (
        <ul className="ml-10 space-y-1.5 pl-4 border-l-2" style={{ borderColor: "rgba(255,153,19,0.3)" }}>
          {req.formRules.map((r, i) => (
            <li key={i} className="font-body text-sm leading-relaxed" style={{ color: "#666666" }}>{r}</li>
          ))}
        </ul>
      )}

      {/* Sub-cases */}
      {req.subCases?.length > 0 && (
        <div className="ml-10 rounded-xl overflow-hidden border" style={{ borderColor: "rgba(255,153,19,0.2)" }}>
          {req.subCases.map((sc, i) => (
            <div key={i} className="border-b last:border-b-0" style={{ borderColor: "rgba(255,153,19,0.15)" }}>
              <div className="px-4 py-2" style={{ backgroundColor: "rgba(255,153,19,0.06)" }}>
                <span className="font-body text-xs font-bold tracking-wide uppercase" style={{ color: ORANGE }}>{sc.label}</span>
              </div>
              <ul className="px-4 py-2 space-y-1">
                {sc.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 font-body text-sm" style={{ color: "#555555" }}>
                    <span className="mt-0.5 shrink-0" style={{ color: ORANGE }}>—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Download buttons */}
      {req.downloads?.length > 0 && (
        <ul className="ml-10 space-y-2">
          {req.downloads.map((d, i) => (
            <li key={i}>
              <button
                className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl border font-body text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ borderColor: "rgba(255,153,19,0.25)", backgroundColor: "rgba(255,153,19,0.04)" }}
                onClick={() => alert("Contact Gladex Tours for this document.")}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: ORANGE }}
                >
                  <Download className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold" style={{ color: "#111111" }}>{d.label}</p>
                  <p className="text-xs" style={{ color: "#888888" }}>{d.sub} · Contact Gladex Tours</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

function JapanEGroupVisaInner() {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  return (
    <div className="min-h-screen" style={{ backgroundColor: isDark ? "#111111" : "#F5F5F5" }}>

      {/* ── NAVBAR ── */}
      <div
        className="sticky top-0 z-40 border-b px-5 lg:px-10 h-16 flex items-center justify-between shadow-sm transition-colors duration-300"
        style={{ backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF", borderColor: isDark ? "rgba(255,153,19,0.15)" : "rgba(0,0,0,0.08)" }}
      >
        <img
          src={LOGO_URL}
          alt="Gladex Tours"
          className="h-14 w-auto object-contain cursor-pointer transition-all duration-300 hover:scale-105"
          style={{ filter: "drop-shadow(0 0 16px rgba(255,153,19,0.5))" }}
          onClick={() => navigate("/")}
        />
        <ThemeToggle />
      </div>

      {/* ── HERO ── */}
      <div
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #FF9913 0%, #FF6600 55%, #CC5500 100%)" }}
      >
        {/* Security paper diagonal lines texture */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "repeating-linear-gradient(-45deg, rgba(255,255,255,0.045) 0px, rgba(255,255,255,0.045) 1px, transparent 1px, transparent 9px)",
        }} />

        {/* Guilloche wavy security lines — bottom */}
        <svg className="absolute bottom-0 left-0 w-full pointer-events-none" style={{ height: 80, opacity: 0.12 }} viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 C120,10 240,70 360,40 C480,10 600,70 720,40 C840,10 960,70 1080,40 C1200,10 1320,70 1440,40 L1440,80 L0,80 Z" fill="white"/>
          <path d="M0,52 C180,22 360,82 540,52 C720,22 900,82 1080,52 C1260,22 1380,72 1440,52 L1440,80 L0,80 Z" fill="white" opacity="0.6"/>
        </svg>

        {/* Large passport stamp — top right */}
        <div className="absolute pointer-events-none hidden md:block" style={{ right: "4%", top: "50%", transform: "translateY(-50%) rotate(12deg)", opacity: 0.13 }}>
          <svg viewBox="0 0 260 260" width="260" height="260" fill="none">
            {/* Outer ring */}
            <circle cx="130" cy="130" r="124" stroke="white" strokeWidth="4"/>
            {/* Inner ring */}
            <circle cx="130" cy="130" r="108" stroke="white" strokeWidth="1.5" strokeDasharray="6 4"/>
            {/* Center circle */}
            <circle cx="130" cy="130" r="60" stroke="white" strokeWidth="3"/>
            {/* Rising sun rays */}
            {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => (
              <line key={i}
                x1={130 + 65 * Math.cos(deg * Math.PI / 180)}
                y1={130 + 65 * Math.sin(deg * Math.PI / 180)}
                x2={130 + 92 * Math.cos(deg * Math.PI / 180)}
                y2={130 + 92 * Math.sin(deg * Math.PI / 180)}
                stroke="white" strokeWidth="2"/>
            ))}
            {/* Center star */}
            <circle cx="130" cy="130" r="28" fill="white" opacity="0.9"/>
            <text x="130" y="135" textAnchor="middle" fontSize="18" fontWeight="900" fill="#CC5500" fontFamily="serif">日本</text>
            {/* Stamp text around ring — top arc */}
            <path id="top-arc" d="M 20,130 A 110,110 0 0,1 240,130" fill="none"/>
            <text fontSize="11" fontWeight="700" letterSpacing="3" fill="white" fontFamily="sans-serif">
              <textPath href="#top-arc" startOffset="8%">JAPAN E-GROUP VISA · GLADEX TOURS ·</textPath>
            </text>
            {/* Stamp text around ring — bottom arc */}
            <path id="btm-arc" d="M 20,130 A 110,110 0 0,0 240,130" fill="none"/>
            <text fontSize="10" fontWeight="600" letterSpacing="2" fill="white" fontFamily="sans-serif">
              <textPath href="#btm-arc" startOffset="12%">OFFICIAL · ACCREDITED · GROUP TOUR</textPath>
            </text>
          </svg>
        </div>

        {/* Small passport stamp — bottom left */}
        <div className="absolute pointer-events-none" style={{ left: "2%", bottom: "8%", opacity: 0.1, transform: "rotate(-18deg)" }}>
          <svg viewBox="0 0 140 140" width="140" height="140" fill="none">
            <circle cx="70" cy="70" r="66" stroke="white" strokeWidth="3"/>
            <circle cx="70" cy="70" r="52" stroke="white" strokeWidth="1.5" strokeDasharray="4 3"/>
            <circle cx="70" cy="70" r="28" fill="white" opacity="0.8"/>
            <text x="70" y="75" textAnchor="middle" fontSize="13" fontWeight="900" fill="#CC5500" fontFamily="serif">日本国</text>
          </svg>
        </div>

        {/* Passport booklet outline — right edge */}
        <div className="absolute pointer-events-none hidden lg:block" style={{ right: "-30px", top: "50%", transform: "translateY(-50%)", opacity: 0.07 }}>
          <svg viewBox="0 0 180 240" width="180" height="240" fill="none">
            <rect x="10" y="10" width="160" height="220" rx="8" stroke="white" strokeWidth="3"/>
            <rect x="22" y="22" width="136" height="196" rx="5" stroke="white" strokeWidth="1.5"/>
            {/* Passport lines */}
            <line x1="35" y1="80" x2="145" y2="80" stroke="white" strokeWidth="2"/>
            <line x1="35" y1="100" x2="120" y2="100" stroke="white" strokeWidth="1.5"/>
            <line x1="35" y1="118" x2="130" y2="118" stroke="white" strokeWidth="1.5"/>
            <line x1="35" y1="136" x2="110" y2="136" stroke="white" strokeWidth="1.5"/>
            {/* Photo placeholder */}
            <rect x="35" y="170" width="52" height="36" rx="3" stroke="white" strokeWidth="1.5"/>
            {/* MRZ lines */}
            <line x1="35" y1="190" x2="145" y2="190" stroke="white" strokeWidth="1" strokeDasharray="3 2"/>
            <line x1="35" y1="200" x2="145" y2="200" stroke="white" strokeWidth="1" strokeDasharray="3 2"/>
            {/* Seal */}
            <circle cx="110" cy="185" r="16" stroke="white" strokeWidth="1.5"/>
            <text x="110" y="190" textAnchor="middle" fontSize="11" fill="white" fontFamily="serif">国</text>
          </svg>
        </div>

        {/* VISA watermark text */}
        <div className="absolute pointer-events-none" style={{ left: "38%", top: "50%", transform: "translate(-50%, -50%) rotate(-30deg)", opacity: 0.05 }}>
          <span style={{ fontSize: "11rem", fontWeight: 900, color: "white", fontFamily: "sans-serif", letterSpacing: "0.1em", lineHeight: 1, userSelect: "none" }}>VISA</span>
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 md:py-24">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <p className="font-body text-xs font-bold tracking-[0.35em] uppercase mb-4" style={{ color: "rgba(255,255,255,0.75)" }}>
              Official Visa Information Guide
            </p>
            <h1 className="font-condensed font-black text-white leading-none mb-4" style={{ fontSize: "clamp(2.8rem, 8vw, 5.5rem)" }}>
              Japan E-Group Visa
            </h1>
            <p className="font-body text-white/75 text-lg max-w-xl leading-relaxed mb-8">
              Kumpletong FAQs at requirements para sa Japan E-Group Visa application sa pamamagitan ng Gladex Tours.
            </p>
            {/* Quick stats */}
            <div className="flex flex-wrap gap-4">
              {[
                { val: "₱6,500", lbl: "Visa fee per person" },
                { val: "46–90", lbl: "Days before departure" },
                { val: "Limited", lbl: "Group slots" },
                { val: "Non-ref", lbl: "Visa fee policy" },
              ].map((s, i) => (
                <div key={i} className="px-4 py-3 rounded-2xl border" style={{ backgroundColor: "rgba(255,255,255,0.12)", borderColor: "rgba(255,255,255,0.25)" }}>
                  <p className="font-condensed font-black text-white text-xl leading-none">{s.val}</p>
                  <p className="font-body text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.7)" }}>{s.lbl}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── SECTION: IMPORTANT REMINDERS (orange) ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.07 }} transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <div style={{ backgroundColor: ORANGE }}>
          <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-8 sm:py-12 lg:py-16">
            <BriefingSection label="Important Reminders" title="Mahalagang Paalala" theme={orangeTheme}>
              <div className="rounded-2xl border p-5 sm:p-7 space-y-3" style={{ backgroundColor: "rgba(255,255,255,0.12)", borderColor: "rgba(255,255,255,0.25)" }}>
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-white" />
                  <span className="font-body text-xs font-bold tracking-[0.2em] uppercase text-white">Official Notice</span>
                </div>
                <ul className="space-y-3">
                  {REMINDERS.map((r, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-4 h-4 mt-0.5 shrink-0 text-white" strokeWidth={2.5} />
                      <span className="font-body text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.9)" }}>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </BriefingSection>
          </div>
        </div>
      </motion.div>

      {/* ── SECTION: FAQs (cream) ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.07 }} transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <div style={{ backgroundColor: CARD_BG }}>
          <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-8 sm:py-12 lg:py-16">
            <BriefingSection label="Frequently Asked Questions" title="FAQs" theme={lightTheme}>
              <div className="space-y-2">
                {FAQS.map((faq, i) => (
                  <FAQItem key={i} q={faq.q} a={faq.a} />
                ))}
              </div>
            </BriefingSection>
          </div>
        </div>
      </motion.div>

      {/* ── SECTION: REQUIREMENTS (orange) ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.07 }} transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <div style={{ backgroundColor: ORANGE }}>
          <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-8 sm:py-12 lg:py-16">
            <BriefingSection label="Applicant's Requirements" title="Listahan ng Mga Kailangan" theme={orangeTheme}>
              <div className="space-y-3">
                {REQUIREMENTS.map((req, i) => (
                  <RequirementItem key={i} req={req} index={i} />
                ))}
              </div>
            </BriefingSection>
          </div>
        </div>
      </motion.div>

      {/* ── SECTION: CONTACT (cream) ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.07 }} transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <div style={{ backgroundColor: CARD_BG }}>
          <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-8 sm:py-12 lg:py-16">
            <BriefingSection label="Need Assistance?" title="Contact Gladex Tours" theme={lightTheme}>
              <NeedAssistance contacts={CONTACTS} theme={{ ...lightTheme, isDark }} />
            </BriefingSection>
          </div>
        </div>
      </motion.div>

      {/* ── FOOTER ── */}
      <div
        className="py-8 px-6 text-center border-t"
        style={{ backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF", borderColor: "rgba(255,153,19,0.15)" }}
      >
        <img src={LOGO_URL} alt="Gladex Tours" className="h-10 mx-auto mb-3 object-contain" />
        <p className="font-body text-xs" style={{ color: "#888888" }}>
          Japan E-Group Visa — Official Information Guide by Gladex Tours<br />
          Visa fees and requirements subject to change. Terms &amp; Conditions Apply.
        </p>
      </div>

    </div>
  );
}

export default function JapanEGroupVisa() {
  return (
    <ThemeProvider>
      <JapanEGroupVisaInner />
    </ThemeProvider>
  );
}
