import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin, Star, ChevronRight, AlertTriangle,
  Check, Tag, ExternalLink, ArrowLeft, Info, ChevronLeft
} from "lucide-react";
import { getDestinationBySlug, destinations } from "../data/destinations";
import { getTourPackageMeta, getRelatedDestinations } from "../data/tourPackagesData";
import PackageGallery from "../components/tourPackage/PackageGallery";
import DestinationInfoCard from "../components/tourPackage/DestinationInfoCard";
import PackageItinerary from "../components/tourPackage/PackageItinerary";
import PackageFAQ from "../components/tourPackage/PackageFAQ";
import RelatedPackages from "../components/tourPackage/RelatedPackages";

const ORANGE = "#FF8C00";
const LOGO_URL = "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/5ecc9b2cd_Untitled-design-75.png";

function SectionHeader({ title }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-1 h-6 rounded-full shrink-0" style={{ backgroundColor: ORANGE }} />
      <h2 className="text-xl font-black font-condensed tracking-wide text-gray-900">{title}</h2>
    </div>
  );
}

export default function TourPackagePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dest = getDestinationBySlug(slug);
  const meta = getTourPackageMeta(slug);
  const related = getRelatedDestinations(slug, destinations, 4);

  const [activeTab, setActiveTab] = useState("overview");
  const [activePkgIdx, setActivePkgIdx] = useState(0);

  const tabs = ["Overview", "Itinerary", "Activities", "Travel Requirements", "Travel Tips", "About"];

  if (!dest) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-400 mb-4 font-condensed">Destination not found</p>
          <button
            onClick={() => navigate("/")}
            className="text-sm underline font-body"
            style={{ color: ORANGE }}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  const pkg = dest.packages?.[activePkgIdx] || dest.packages?.[0];
  const bannerImage = meta?.bannerImage || dest.heroImage;
  const gallery = meta?.gallery || [dest.heroImage];

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

      <div className="max-w-6xl mx-auto px-4 lg:px-6 pt-6 pb-16">

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

        {/* Tags + Rating */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap gap-1.5">
              {(meta?.tags || ["English", "Confirmed Travelers", "Travel Guide"]).map((tag, i) => (
                <span
                  key={i}
                  className="text-xs px-2.5 py-1 rounded-full border font-medium text-gray-600"
                  style={{ borderColor: "#D0D0D0" }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <span className="font-black text-amber-500">4.8/5</span>
              <span className="text-gray-400 text-xs">
                {(meta?.operatorReviews || 10000).toLocaleString()} travelers
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <MapPin className="w-3.5 h-3.5" style={{ color: ORANGE }} />
              <span>{dest.country}</span>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <PackageGallery images={gallery} destinationName={dest.name} />

        {/* Sticky Tabs */}
        <div className="sticky top-14 z-30 bg-white border-b border-gray-200 mt-5 -mx-4 lg:-mx-6 px-4 lg:px-6 overflow-x-auto">
          <div className="flex gap-0 min-w-max">
            {tabs.map((tab) => {
              const key = tab.toLowerCase().replace(/\s/g, "-");
              const active = activeTab === key || (activeTab === "overview" && tab === "Overview");
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(key)}
                  className="px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-all"
                  style={{
                    borderColor: active ? ORANGE : "transparent",
                    color: active ? ORANGE : "#888",
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">

          {/* Left — Main content */}
          <div className="lg:col-span-2 space-y-10">

            {/* Package Options (if multiple) */}
            {dest.packages?.length > 1 && (
              <div>
                <SectionHeader title={`${dest.name} — Available Itineraries`} />
                <div className="flex flex-wrap gap-2">
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
              </div>
            )}

            {/* Destination Overview */}
            <div>
              <SectionHeader title={`About ${dest.name}`} />
              <div className="p-5 rounded-2xl border" style={{ backgroundColor: "#FAFAFA", borderColor: "#EEEEEE" }}>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  {dest.tagline}. This {pkg?.duration} guide covers everything you need to know before and during your trip.
                </p>
                {pkg?.highlights?.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">Destination Highlights</p>
                    <div className="grid grid-cols-2 gap-2">
                      {pkg.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-600 p-2.5 rounded-lg bg-white border" style={{ borderColor: "#EEEEEE" }}>
                          <span style={{ color: ORANGE }}>✓</span> {h}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Photo Gallery Strip */}
            {gallery.length > 1 && (
              <div>
                <SectionHeader title="Destination Photos" />
                <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
                  {gallery.map((img, i) => (
                    <div key={i} className="min-w-[200px] rounded-xl overflow-hidden shrink-0 border" style={{ aspectRatio: "4/3", borderColor: "#EEEEEE" }}>
                      <img src={img} alt={`${dest.name} ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                  ))}
                  {/* Placeholder slot */}
                  <div className="min-w-[200px] rounded-xl shrink-0 border-2 border-dashed flex items-center justify-center" style={{ aspectRatio: "4/3", borderColor: "#DDD" }}>
                    <p className="text-xs text-gray-400 text-center px-3">More photos coming soon</p>
                  </div>
                </div>
              </div>
            )}

            {/* Day-by-Day Itinerary */}
            <div>
              <SectionHeader title={`${dest.name} Day-by-Day Itinerary`} />
              <PackageItinerary itinerary={pkg?.itinerary} />
            </div>

            {/* Activities / Optional Tours */}
            {pkg?.optionalTours?.length > 0 && (
              <div>
                <SectionHeader title="Activities & Optional Tours" />
                <p className="text-sm text-gray-500 mb-3">Activities and experiences available at this destination:</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {pkg.optionalTours.map((tour, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs p-3 rounded-xl border"
                      style={{ backgroundColor: "#FAFAFA", borderColor: "#EEEEEE", color: "#555" }}
                    >
                      <Tag className="w-3.5 h-3.5 shrink-0" style={{ color: ORANGE }} />
                      {tour}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Inclusions — What's Covered */}
            {pkg?.inclusions?.length > 0 && (
              <div>
                <SectionHeader title="What's Covered in Your Package" />
                <ul className="space-y-2">
                  {pkg.inclusions.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Travel Requirements */}
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
                {pkg?.links?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {pkg.links
                      .filter(link => !link.label.toLowerCase().includes("book") && !link.label.toLowerCase().includes("messenger"))
                      .map((link, i) => (
                        <a
                          key={i}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium hover:opacity-80 transition-all"
                          style={{ borderColor: ORANGE, color: ORANGE }}
                        >
                          {link.label} <ExternalLink className="w-3 h-3" />
                        </a>
                      ))}
                  </div>
                )}
              </div>
            )}

            {/* Good to Know / Travel Tips */}
            {(meta?.goodToKnow?.length > 0 || true) && (
              <div>
                <SectionHeader title="Travel Tips & Reminders" />
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border" style={{ backgroundColor: "#FAFAFA", borderColor: "#EEEEEE" }}>
                    <p className="text-xs font-bold text-gray-700 mb-2">What to Bring:</p>
                    <ul className="space-y-1">
                      {["Valid passport & travel documents", "Comfortable walking shoes", "Light, breathable clothing", "Local currency (cash recommended)", "Printed copies of e-visa (if required)"].map((item, i) => (
                        <li key={i} className="text-xs text-gray-600 flex items-center gap-2">
                          <span style={{ color: ORANGE }}>•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {meta?.goodToKnow?.length > 0 && (
                    <div className="p-4 rounded-xl border" style={{ backgroundColor: "#FAFAFA", borderColor: "#EEEEEE" }}>
                      <p className="text-xs font-bold text-gray-700 mb-2">Local Tips:</p>
                      <ul className="space-y-1">
                        {meta.goodToKnow.map((item, i) => (
                          <li key={i} className="text-xs text-gray-600 flex items-center gap-2">
                            <span style={{ color: ORANGE }}>•</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Important Notices */}
            {pkg?.importantNotices?.length > 0 && (
              <div className="p-4 rounded-xl border" style={{ backgroundColor: "#FFF8F0", borderColor: "#FFD699" }}>
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-4 h-4" style={{ color: ORANGE }} />
                  <p className="text-sm font-bold text-gray-900">Important Travel Reminders</p>
                </div>
                <ul className="space-y-1.5">
                  {pkg.importantNotices
                    .filter(n => !n.includes("PERSONAL TRANSACTIONS"))
                    .map((notice, i) => (
                      <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                        <span className="shrink-0 mt-0.5" style={{ color: ORANGE }}>›</span>
                        {notice}
                      </li>
                    ))}
                </ul>
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

            {/* About the Operator */}
            <div className="p-5 rounded-2xl border" style={{ borderColor: "#E5E5E5" }}>
              <SectionHeader title="About Your Tour Operator" />
              <p className="text-sm text-gray-700 mb-3">
                Operated by: <strong>Gladex Travel & Tours</strong>
              </p>
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-400" />
                  <span>Travelers served: {(meta?.operatorReviews || 12000).toLocaleString()}+</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>👍</span>
                  <span>Satisfaction rate: {meta?.goodReviewRate || 94}%</span>
                </div>
              </div>
            </div>

            {/* Destination Gallery Preview */}
            <div>
              <SectionHeader title={`More from ${dest.name}`} />
              <div className="grid grid-cols-3 gap-3">
                {gallery.slice(0, 3).map((img, i) => (
                  <div key={i} className="rounded-xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
                    <img src={img} alt={`${dest.name} sight ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <PackageFAQ faqs={meta?.faqs || []} />

            {/* Destination Navigator */}
            <div className="flex items-center justify-between gap-3 pt-4 border-t" style={{ borderColor: "#EEEEEE" }}>
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl border transition-all hover:bg-gray-50"
                style={{ borderColor: "#E5E5E5", color: "#555" }}
              >
                <ChevronLeft className="w-4 h-4" /> Back to Destinations
              </button>
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl text-white transition-all hover:opacity-90"
                style={{ backgroundColor: ORANGE }}
              >
                View All Destinations
              </button>
            </div>

            {/* Related Destinations */}
            <RelatedPackages destinations={related} />
          </div>

          {/* Right — Destination Info Card (no booking) */}
          <div className="lg:col-span-1">
            <DestinationInfoCard pkg={pkg} destination={dest} meta={meta} />
          </div>
        </div>
      </div>
    </div>
  );
}