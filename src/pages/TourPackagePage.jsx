import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin, Heart, Star, ChevronRight, AlertTriangle,
  Check, X, Tag, ExternalLink, ArrowLeft
} from "lucide-react";
import { getDestinationBySlug, destinations } from "../data/destinations";
import { getTourPackageMeta, getRelatedDestinations } from "../data/tourPackagesData";
import PackageGallery from "../components/tourPackage/PackageGallery";
import PackageBookingCard from "../components/tourPackage/PackageBookingCard";
import PackageItinerary from "../components/tourPackage/PackageItinerary";
import PackageFAQ from "../components/tourPackage/PackageFAQ";
import RelatedPackages from "../components/tourPackage/RelatedPackages";

const ORANGE = "#FF8C00";
const LOGO_URL = "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/5ecc9b2cd_Untitled-design-75.png";

// Section header with orange left bar
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

  const tabs = ["Overview", "Package options", "What to expect", "Reviews", "Good to know", "About the operator"];

  if (!dest) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-400 mb-4 font-condensed">Package not found</p>
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
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 lg:px-6 pt-6 pb-16">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-4 flex-wrap">
          <Link to="/" className="hover:text-gray-600 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/destination-preview" className="hover:text-gray-600 transition-colors">Destinations</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-700 font-medium">{dest.name} Tour Package</span>
        </nav>

        {/* Title */}
        <h1 className="text-2xl lg:text-3xl font-black text-gray-900 mb-3 leading-tight font-condensed tracking-wide">
          {pkg?.name || `${dest.name} Tour Package`}
        </h1>

        {/* Tags + Rating */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex flex-wrap items-center gap-3">
            {/* Tag pills */}
            <div className="flex flex-wrap gap-1.5">
              {(meta?.tags || ["English", "Group tour", "Meet with guide"]).map((tag, i) => (
                <span
                  key={i}
                  className="text-xs px-2.5 py-1 rounded-full border font-medium text-gray-600"
                  style={{ borderColor: "#D0D0D0" }}
                >
                  {tag}
                </span>
              ))}
            </div>
            {/* Rating */}
            <div className="flex items-center gap-1.5 text-sm">
              <span className="font-black text-amber-500">4.8/5</span>
              <span className="text-gray-400 text-xs">
                {(meta?.operatorReviews || 10000).toLocaleString()} reviews
              </span>
              <span className="text-gray-400 text-xs">• 100K+ booked</span>
            </div>
            {/* Departing from */}
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <MapPin className="w-3.5 h-3.5" style={{ color: ORANGE }} />
              <span>Departing from {meta?.departingFrom || "Manila"}</span>
            </div>
          </div>
          <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-500 transition-colors">
            <Heart className="w-4 h-4" /> Save to wishlist
          </button>
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
          <div className="lg:col-span-2">

            {/* Offers banner */}
            <div
              className="flex items-center justify-between px-4 py-2.5 rounded-xl mb-6 text-sm cursor-pointer hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#FFF5E9", border: "1px solid #FFD699" }}
            >
              <span className="font-semibold text-gray-700">Offers for you</span>
              <div className="flex items-center gap-2">
                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                  🇵🇭 PHP 1,000 off
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Package Tabs (if multiple packages) */}
            {dest.packages?.length > 1 && (
              <div className="mb-6">
                <SectionHeader title={`${dest.name} Package Options`} />
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

            {/* Description */}
            <div className="mb-8">
              <SectionHeader title={`${dest.name} Tour Options`} />
              <div
                className="p-5 rounded-2xl border"
                style={{ backgroundColor: "#FAFAFA", borderColor: "#EEEEEE" }}
              >
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  Discover the best of {dest.name} with this carefully curated{" "}
                  {pkg?.duration} package. {dest.tagline}.
                </p>
                {pkg?.highlights?.length > 0 && (
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Highlights include: {pkg.highlights.slice(0, 5).join(", ")} and more.
                  </p>
                )}
              </div>
            </div>

            {/* What to Expect */}
            <div className="mb-8">
              <SectionHeader title={`What to Expect from ${dest.name} Tour`} />
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                {dest.name} is one of the most exciting travel destinations in Asia. This{" "}
                {pkg?.duration} tour package is crafted to give you the best cultural,
                culinary, and sightseeing experiences. Your expert guide will take you
                through iconic landmarks, hidden gems, and local favorites that make{" "}
                {dest.name} truly unforgettable.
              </p>

              {/* Gallery strip */}
              {gallery.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
                  {gallery.map((img, i) => (
                    <div key={i} className="min-w-[200px] rounded-xl overflow-hidden shrink-0" style={{ aspectRatio: "4/3" }}>
                      <img src={img} alt={`${dest.name} ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}

              {/* Highlights grid */}
              {pkg?.highlights?.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {pkg.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-600 p-2.5 rounded-lg bg-gray-50">
                      <span style={{ color: ORANGE }}>✓</span> {h}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Itinerary */}
            <PackageItinerary itinerary={pkg?.itinerary} />

            {/* Optional Tours */}
            {pkg?.optionalTours?.length > 0 && (
              <div className="mt-10">
                <SectionHeader title="Optional Add-On Tours" />
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

            {/* Inclusions & Exclusions */}
            {(pkg?.inclusions?.length > 0 || pkg?.exclusions?.length > 0) && (
              <div className="mt-10 grid sm:grid-cols-2 gap-6">
                {pkg?.inclusions?.length > 0 && (
                  <div>
                    <SectionHeader title="Inclusions" />
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
                {pkg?.exclusions?.length > 0 && (
                  <div>
                    <SectionHeader title="Exclusions" />
                    <ul className="space-y-2">
                      {pkg.exclusions.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-500">
                          <X className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Good to Know */}
            {meta?.goodToKnow?.length > 0 && (
              <div className="mt-10">
                <SectionHeader title="Good to know" />
                <div className="mb-3">
                  <p className="text-sm font-bold text-gray-800 mb-2">What to Bring:</p>
                  <ul className="space-y-1">
                    {["Valid passport & travel documents", "Comfortable walking shoes", "Light, breathable clothing", "Local currency (cash recommended)"].map((item, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                        <span style={{ color: ORANGE }}>•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800 mb-2">Important Reminders:</p>
                  <ul className="space-y-1">
                    {meta.goodToKnow.map((item, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                        <span style={{ color: ORANGE }}>•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Important Notices */}
            {pkg?.importantNotices?.length > 0 && (
              <div className="mt-8 p-4 rounded-xl border" style={{ backgroundColor: "#FFF8F0", borderColor: "#FFD699" }}>
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-4 h-4" style={{ color: ORANGE }} />
                  <p className="text-sm font-bold text-gray-900">Important Notices</p>
                </div>
                <ul className="space-y-1.5">
                  {pkg.importantNotices.map((notice, i) => (
                    <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                      <span className="shrink-0 mt-0.5" style={{ color: ORANGE }}>›</span>
                      {notice}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements & Links */}
            {pkg?.requirements?.length > 0 && (
              <div className="mt-8">
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
                    {pkg.links.map((link, i) => (
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

            {/* About the Operator */}
            <div className="mt-10 p-5 rounded-2xl border" style={{ borderColor: "#E5E5E5" }}>
              <SectionHeader title="About the operator" />
              <p className="text-sm text-gray-700 mb-3">
                Operated by: <strong>Gladex Travel & Tours</strong>
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-400" />
                  <span>Total reviews: {(meta?.operatorReviews || 12000).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>👍</span>
                  <span>Good review rate: {meta?.goodReviewRate || 94}%</span>
                </div>
              </div>
            </div>

            {/* Trending sights */}
            <div className="mt-10">
              <SectionHeader title="Trending sights" />
              <div className="grid grid-cols-3 gap-3">
                {gallery.slice(0, 3).map((img, i) => (
                  <div key={i} className="rounded-xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
                    <img src={img} alt={`Sight ${i + 1}`} className="w-full h-full object-cover" />
                    <p className="text-xs text-gray-600 mt-1 font-medium text-center">
                      {pkg?.highlights?.[i] || dest.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <PackageFAQ faqs={meta?.faqs || []} />

            {/* Explore More */}
            <div className="mt-10 p-5 rounded-2xl bg-gray-50 border" style={{ borderColor: "#E5E5E5" }}>
              <p className="text-sm font-bold text-gray-700 mb-3">
                Everything you need for your {dest.name} visit
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {[`${dest.name} Hotels`, `${dest.name} Airport Transfers`, `${dest.name} Tours`].map((item, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium text-gray-600"
                    style={{ borderColor: "#E5E5E5" }}
                  >
                    <span
                      className="w-4 h-4 rounded text-[9px] font-black flex items-center justify-center text-white"
                      style={{ backgroundColor: ORANGE }}
                    >
                      {i + 1}
                    </span>
                    {item}
                  </span>
                ))}
              </div>
              <p className="text-sm font-bold text-gray-700 mb-2">Top destinations in Southeast Asia</p>
              <div className="flex flex-wrap gap-1.5">
                {destinations.slice(0, 12).map((d, i) => (
                  <span
                    key={i}
                    onClick={() => navigate(`/tour-packages/${d.slug}`)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs text-gray-600 cursor-pointer hover:opacity-70 transition-all"
                    style={{ borderColor: "#E5E5E5" }}
                  >
                    <span
                      className="w-4 h-4 rounded text-[9px] font-black flex items-center justify-center text-white"
                      style={{ backgroundColor: "#999" }}
                    >
                      {i + 1}
                    </span>
                    {d.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Related Packages */}
            <RelatedPackages destinations={related} />
          </div>

          {/* Right — Booking card */}
          <div className="lg:col-span-1">
            <PackageBookingCard pkg={pkg} destination={dest} />
          </div>
        </div>
      </div>
    </div>
  );
}