// @ts-nocheck
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Star, ChevronRight, AlertTriangle, Check, ExternalLink, ArrowLeft, Info, ChevronLeft } from "lucide-react";
import { getDestinationBySlug, getDestinations } from "../data/destinations";
import { getTourPackageMeta, getRelatedDestinations } from "../data/tourPackagesData";
import { getDestinationContent } from "../data/destinationContent";
import PhotoGalleryBlock from "../components/tourPackage/PhotoGalleryBlock";
import ReviewsSection from "../components/tourPackage/ReviewsSection";
import WhatToBringSection from "../components/tourPackage/WhatToBringSection";
import YouMightAlsoLike from "../components/tourPackage/YouMightAlsoLike";
import HelpCenter from "../components/tourPackage/HelpCenter";
import ExploreMoreSection from "../components/tourPackage/ExploreMoreSection";
import PackageFAQ from "../components/tourPackage/PackageFAQ";
import DestinationGuideSection from "../components/tourPackage/DestinationGuideSection";

const ORANGE = "#FF9913";
const LOGO_URL = "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/5ecc9b2cd_Untitled-design-75.png";

function SectionHeader({ title = "" }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-1 h-6 rounded-full shrink-0" style={{ backgroundColor: ORANGE }} />
      <h2 className="text-xl font-black font-condensed tracking-wide text-gray-900">{title}</h2>
    </div>
  );
}

// Sidebar card — info only, no pricing/booking
/** @param {{ destination: any, meta: { goodToKnow: Array<any>, operatorReviews?: number }, pkg: { inclusions: Array<any> } }} props */
function BriefingInfoCard({ destination, meta, pkg }) {
  return (
    <div className="rounded-2xl border shadow-lg p-5 space-y-4" style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E5E5" }}>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Travel Briefing</p>
        <h3 className="text-lg font-black font-condensed text-gray-900">{destination?.name}</h3>
        <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
          <MapPin className="w-3 h-3" style={{ color: ORANGE }} />
          {destination?.country}
        </p>
      </div>

      <div className="pt-3 border-t space-y-2" style={{ borderColor: "#F0F0F0" }}>
        <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">Quick Reference</p>
        {[
          { icon: "✈️", label: "Confirm arrival transfer with guide" },
          { icon: "🏨", label: "Hotel check-in from 2:00 PM" },
          { icon: "📋", label: "Join tour group 10 min early" },
          { icon: "📄", label: "Carry passport copy at all times" },
          { icon: "📞", label: "Save emergency contact on phone" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {pkg?.inclusions?.length > 0 && (
        <div className="pt-3 border-t" style={{ borderColor: "#F0F0F0" }}>
          <p className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Your Trip Includes</p>
          <ul className="space-y-1.5">
            {pkg.inclusions.slice(0, 6).map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-xs">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Destination tags — info only */}
      {meta?.goodToKnow?.length > 0 && (
        <div className="pt-3 border-t" style={{ borderColor: "#F0F0F0" }}>
          <p className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Good to Know</p>
          <ul className="space-y-1">
            {meta.goodToKnow.slice(0, 4).map((tip, i) => (
              <li key={i} className="text-xs text-gray-500 flex items-start gap-1.5">
                <span style={{ color: ORANGE }}>›</span> {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="pt-3 border-t flex items-center gap-2" style={{ borderColor: "#F0F0F0" }}>
        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
        <span className="text-xs font-bold text-gray-700">4.8/5</span>
        <span className="text-xs text-gray-400">• {(meta?.operatorReviews || 10000).toLocaleString()}+ travelers served</span>
      </div>
    </div>
  );
}

export default function TourPackagePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dest = getDestinationBySlug(slug);
  const meta = getTourPackageMeta(slug);
  const related = getRelatedDestinations(slug, getDestinations(), 4);
  const content = getDestinationContent(slug);

  const [activePkgIdx, setActivePkgIdx] = useState(0);

  if (!dest) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-400 mb-4 font-condensed">Destination not found</p>
          <button onClick={() => navigate("/")} className="text-sm underline" style={{ color: ORANGE }}>
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  const pkg = dest.packages?.[activePkgIdx] || dest.packages?.[0];
  const gallery = meta?.gallery || [dest.heroImage];

  const mainGalleryImages = content.galleryBlocks?.[0]?.images?.length
    ? content.galleryBlocks[0].images
    : gallery.map((url, i) => ({ url, caption: `${dest.name} — Photo ${i + 1}` }));

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm px-4 lg:px-10 h-14 flex items-center justify-between">
        <img
          src={LOGO_URL}
          alt="Gladex"
          className="h-10 w-auto object-contain cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate("/")}
        />
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="hidden sm:flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors hover:bg-gray-50"
            style={{ borderColor: "#E5E5E5", color: "#555" }}
          >
            All Destinations
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 lg:px-6 pt-6 pb-20">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-4 flex-wrap">
          <Link to="/" className="hover:text-gray-600 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="hover:text-gray-600 transition-colors cursor-pointer" onClick={() => navigate(-1)}>Destinations</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-700 font-medium">{dest.name} — Destination Guide</span>
        </nav>

        {/* Title */}
        <h1 className="text-2xl lg:text-3xl font-black text-gray-900 mb-3 leading-tight font-condensed tracking-wide">
          {dest.name} — Travel Briefing Guide
        </h1>

        {/* Info tags — no booking/pricing tags */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-1.5 text-sm">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="font-black text-amber-500">4.8/5</span>
            <span className="text-gray-400 text-xs">{(meta?.operatorReviews || 10000).toLocaleString()} travelers</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <MapPin className="w-3.5 h-3.5" style={{ color: ORANGE }} />
            <span>{dest.country}</span>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full border font-medium text-gray-600" style={{ borderColor: "#D0D0D0" }}>
            ✈️ Confirmed Travelers Only
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full border font-medium text-gray-600" style={{ borderColor: "#D0D0D0" }}>
            📋 Briefing Portal
          </span>
        </div>

        {/* Package Tabs (if multiple) — for multi-city only */}
        {dest.packages?.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {dest.packages.map((p, i) => (
              <button
                key={i}
                onClick={() => setActivePkgIdx(i)}
                className="px-4 py-2 rounded-full text-sm font-semibold transition-all border"
                style={{
                  borderColor: i === activePkgIdx ? ORANGE : "#E5E5E5",
                  backgroundColor: i === activePkgIdx ? ORANGE : "transparent",
                  color: i === activePkgIdx ? "#fff" : "#555",
                }}
              >
                {p.name}
              </button>
            ))}
          </div>
        )}

        {/* ── SECTION 1: PHOTO GALLERY ── */}
        <div className="mb-10">
          <PhotoGalleryBlock images={mainGalleryImages} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── MAIN CONTENT ── */}
          <div className="lg:col-span-2 space-y-12">

            {/* ── WHAT TO EXPECT ── */}
            <div>
              <SectionHeader title={content.whatToExpectTitle || `What to Expect from ${dest.name} Tour`} />
              <div className="p-5 rounded-2xl border bg-gray-50 border-gray-100 mb-6">
                <ul className="space-y-3">
                  {(content.whatToExpect || []).map((point, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-2.5 text-sm text-gray-700"
                    >
                      <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-white text-xs font-bold" style={{ backgroundColor: ORANGE }}>
                        {i + 1}
                      </span>
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Gallery blocks */}
              {(content.galleryBlocks || []).map((block, bi) => (
                <div key={bi} className={bi > 0 ? "mt-8" : ""}>
                  <PhotoGalleryBlock title={bi === 0 ? "Destination Highlights" : block.title} images={block.images} />
                </div>
              ))}
              {(!content.galleryBlocks || content.galleryBlocks.length === 0) && gallery.length > 1 && (
                <PhotoGalleryBlock
                  title="Destination Photos"
                  images={gallery.map((url, i) => ({ url, caption: `${dest.name} — sight ${i + 1}` }))}
                />
              )}
            </div>

            {/* ── REVIEWS CAROUSEL ── */}
            <ReviewsSection reviews={content.reviews || []} />

            {/* ── GOOD TO KNOW: WHAT TO BRING + SEASONS ── */}
            <WhatToBringSection items={content.whatToBring || []} seasons={content.seasons || []} />

            {/* ── YOU MIGHT ALSO LIKE + TRENDING SIGHTS (image carousels) ── */}
            <YouMightAlsoLike
              activities={content.mightAlsoLike || pkg?.optionalTours || []}
              trendingSights={content.trendingSights || []}
            />

            {/* ── DESTINATION GUIDE ── */}
            <DestinationGuideSection dest={dest} />

            {/* ── ABOUT THE OPERATOR ── */}
            <div className="p-5 rounded-2xl border border-gray-100">
              <SectionHeader title="About the Operator" />
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                  <span className="text-xl">✈️</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 mb-1">Gladex Travel & Tours</p>
                  <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                    Your trusted travel partner for international group and independent tours across Asia and beyond.
                    We specialize in organizing seamless and memorable travel experiences for confirmed Filipino travelers.
                  </p>
                  <div className="flex flex-wrap items-center gap-5 text-sm text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span>{(meta?.operatorReviews || 12000).toLocaleString()}+ travelers served</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span>👍</span>
                      <span>{meta?.goodReviewRate || 94}% satisfaction rate</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span>🌏</span>
                      <span>20+ destinations covered</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── TRAVEL REQUIREMENTS ── */}
            {pkg?.requirements?.length > 0 && (
              <div>
                <SectionHeader title="Travel Requirements" />
                <ul className="space-y-2 mb-4">
                  {pkg.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      {req}
                    </li>
                  ))}
                </ul>
                {pkg?.links?.filter(l =>
                  !l.label.toLowerCase().includes("book") &&
                  !l.label.toLowerCase().includes("messenger") &&
                  !l.label.toLowerCase().includes("reserve")
                ).map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium hover:opacity-80 transition-all mr-2 mb-2"
                    style={{ borderColor: ORANGE, color: ORANGE }}
                  >
                    {link.label} <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            )}

            {/* Visa Info */}
            {pkg?.visaInfo && (
              <div>
                <SectionHeader title="Visa & Entry Information" />
                <div className="p-4 rounded-xl border text-sm text-gray-700 leading-relaxed" style={{ backgroundColor: "#F0F7FF", borderColor: "#BDD7F5" }}>
                  <Info className="w-4 h-4 inline-block mr-2" style={{ color: "#1565C0" }} />
                  {pkg.visaInfo}
                </div>
              </div>
            )}

            {/* Important Notices — reminders only, no pricing */}
            {pkg?.importantNotices?.length > 0 && (
              <div className="p-4 rounded-xl border" style={{ backgroundColor: "#FFF8F0", borderColor: "#FFD699" }}>
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-4 h-4" style={{ color: ORANGE }} />
                  <p className="text-sm font-bold text-gray-900">Important Travel Reminders</p>
                </div>
                <ul className="space-y-1.5">
                  {pkg.importantNotices
                    .filter(n => !n.includes("PERSONAL TRANSACTIONS") && !n.includes("price") && !n.includes("rate") && !n.includes("USD"))
                    .map((notice, i) => (
                      <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                        <span className="shrink-0 mt-0.5" style={{ color: ORANGE }}>›</span>
                        {notice}
                      </li>
                    ))}
                </ul>
              </div>
            )}

            {/* ── FAQs ── */}
            <PackageFAQ faqs={meta?.faqs || []} />

            {/* ── HELP CENTER ── */}
            <HelpCenter />

            {/* ── EXPLORE MORE ── */}
            <ExploreMoreSection destinations={related} />

            {/* Bottom Nav */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-gray-100">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl border transition-all hover:bg-gray-50 w-full sm:w-auto justify-center"
                style={{ borderColor: "#E5E5E5", color: "#555" }}
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 text-sm font-semibold px-6 py-2.5 rounded-xl text-white transition-all hover:opacity-90 w-full sm:w-auto justify-center"
                style={{ backgroundColor: ORANGE }}
              >
                All Destinations
              </button>
            </div>
          </div>

          {/* ── SIDEBAR ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <BriefingInfoCard destination={dest} meta={meta} pkg={pkg} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}