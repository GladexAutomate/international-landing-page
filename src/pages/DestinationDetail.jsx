import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Globe, Download, Share2 } from "lucide-react";
import { getDestinationBySlug } from "../data/destinations";
import PackageCard from "../components/detail/PackageCard";
import InquiryForm from "../components/detail/InquiryForm";
import InfoAccordion from "../components/detail/InfoAccordion";
import NavBar from "../components/NavBar";

export default function DestinationDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const destination = getDestinationBySlug(slug);
  const [activePackage, setActivePackage] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#080808" }}>
        <div className="text-center">
          <h2 className="font-condensed text-4xl text-white mb-4">Destination Not Found</h2>
          <Link to="/" className="font-body text-gladex-orange hover:underline">← Back to all destinations</Link>
        </div>
      </div>
    );
  }

  const pkg = destination.packages[activePackage];
  const hasPackages = destination.packages.length > 0;

  // Build info accordion sections from available data
  const buildInfoSections = () => {
    const sections = [];

    if (pkg?.visaInfo) {
      sections.push({ title: "Visa Information", content: pkg.visaInfo });
    }
    if (pkg?.preArrivalNotice) {
      sections.push({ title: "Pre-Arrival Notice", content: pkg.preArrivalNotice });
    }
    if (pkg?.termsAndConditions) {
      sections.push({ title: "Terms & Conditions", content: pkg.termsAndConditions });
    }
    if (pkg?.importantNotices) {
      sections.push({
        title: "Important Notices",
        content: (
          <ul className="space-y-2">
            {pkg.importantNotices.map((n, i) => (
              <li key={i} className="flex items-start gap-2 font-body text-chrome text-sm">
                <span className="text-gladex-orange mt-0.5">•</span>
                {n}
              </li>
            ))}
          </ul>
        ),
      });
    }
    if (pkg?.faqItems) {
      sections.push({
        title: "FAQ",
        content: (
          <div className="space-y-4">
            {pkg.faqItems.map((faq, i) => (
              <div key={i}>
                <p className="font-body text-white text-sm font-semibold mb-1">{faq.q}</p>
                <p className="font-body text-chrome text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        ),
      });
    }
    if (pkg?.shoppingDisclaimer) {
      sections.push({ title: "Shopping Stop Disclaimer", content: pkg.shoppingDisclaimer });
    }

    return sections;
  };

  const infoSections = hasPackages ? buildInfoSections() : [];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#080808" }}>
      <NavBar />

      {/* Hero */}
      <div className="relative h-[70vh] lg:h-[80vh] overflow-hidden">
        <img
          src={destination.heroImage}
          alt={destination.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/50 via-[#080808]/20 to-[#080808]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/60 to-transparent" />

        {/* Back button */}
        <div className="absolute top-24 left-6 lg:left-10 z-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 font-body text-sm text-chrome hover:text-white transition-colors glass-panel px-4 py-2.5 rounded-sm focus-ring"
          >
            <ArrowLeft className="w-4 h-4" />
            All Destinations
          </button>
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 px-6 lg:px-10 pb-12 lg:pb-16 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-gladex-orange" />
              <span className="font-body text-sm text-chrome tracking-wider uppercase">
                {destination.country}
              </span>
              <span className="w-px h-3 bg-white/20 mx-2" />
              <span
                className="font-body text-[10px] text-gladex-orange border border-gladex-orange/40 px-2.5 py-0.5 tracking-widest uppercase"
                style={{ fontFamily: "monospace" }}
              >
                {destination.promoLabel}
              </span>
            </div>
            <h1
              className="font-condensed font-black text-white leading-none mb-3"
              style={{ fontSize: "clamp(48px, 9vw, 110px)", letterSpacing: "0.04em" }}
            >
              {destination.name.toUpperCase()}
            </h1>
            <p className="font-body text-chrome text-lg max-w-lg leading-relaxed">
              {destination.tagline}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">

          {/* Left: Main content */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-10">

            {hasPackages ? (
              <>
                {/* Packages */}
                <div>
                  <div className="font-body text-[10px] tracking-[0.4em] text-gladex-orange uppercase mb-4" style={{ fontFamily: "monospace" }}>
                    {destination.packages.length > 1 ? "Available Packages" : "Package Details"}
                  </div>
                  <div className="space-y-3">
                    {destination.packages.map((p, i) => (
                      <PackageCard
                        key={p.code}
                        pkg={p}
                        isActive={activePackage === i}
                        onSelect={() => setActivePackage(i)}
                      />
                    ))}
                  </div>
                </div>

                {/* Info sections */}
                {infoSections.length > 0 && (
                  <div>
                    <div className="font-body text-[10px] tracking-[0.4em] text-gladex-orange uppercase mb-4" style={{ fontFamily: "monospace" }}>
                      Travel Information
                    </div>
                    <InfoAccordion sections={infoSections} />
                  </div>
                )}
              </>
            ) : (
              /* No packages yet — Coming Soon */
              <div>
                <div className="font-body text-[10px] tracking-[0.4em] text-gladex-orange uppercase mb-4" style={{ fontFamily: "monospace" }}>
                  Package Details
                </div>
                <div className="glass-panel rounded-sm p-8 text-center">
                  <div className="text-5xl mb-4">🌍</div>
                  <h3 className="font-condensed font-bold text-white text-3xl mb-2">
                    Package Details Coming Soon
                  </h3>
                  <p className="font-body text-chrome text-sm leading-relaxed max-w-md mx-auto mb-6">
                    Our travel team is finalizing the complete itinerary and pricing for {destination.name}. 
                    Inquire now to be the first to know when this package launches.
                  </p>
                  <div className="font-condensed text-2xl font-bold text-gladex-orange">
                    From ₱{destination.startingPrice.toLocaleString()}
                  </div>
                </div>
              </div>
            )}

            {/* Gallery placeholder */}
            <div>
              <div className="font-body text-[10px] tracking-[0.4em] text-gladex-orange uppercase mb-4" style={{ fontFamily: "monospace" }}>
                Destination Gallery
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[destination.heroImage, destination.cardImage, destination.heroImage].map((img, i) => (
                  <div key={i} className="aspect-square rounded-sm overflow-hidden">
                    <img
                      src={img}
                      alt={`${destination.name} ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Sticky sidebar */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="lg:sticky lg:top-24 space-y-4">
              {/* Price summary */}
              {hasPackages && pkg && (
                <div className="glass-panel rounded-sm p-5 border border-gladex-orange/20">
                  <div className="font-body text-[9px] tracking-[0.25em] text-gladex-orange uppercase mb-3" style={{ fontFamily: "monospace" }}>
                    Current Selection — {pkg.code}
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="font-condensed text-5xl font-black text-gladex-orange leading-none">
                        ₱{pkg.rates.adult.toLocaleString()}
                      </div>
                      <div className="font-body text-chrome text-xs mt-1">per adult</div>
                    </div>
                    {pkg.rates.downpayment && (
                      <div className="text-right">
                        <div className="font-body text-chrome text-xs">Downpayment</div>
                        <div className="font-condensed text-2xl font-bold text-white">
                          ₱{pkg.rates.downpayment.toLocaleString()}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Inquiry form */}
              <InquiryForm destination={destination} />

              {/* Download brochure button */}
              <button className="w-full font-condensed font-semibold tracking-widest uppercase text-sm px-6 py-4 glass-panel text-white rounded-sm hover:bg-white/10 transition-all duration-200 min-h-[52px] flex items-center justify-center gap-2 border border-white/10 hover:border-white/30 focus-ring">
                <Download className="w-4 h-4 text-gladex-orange" />
                Download Brochure
              </button>

              {/* Share */}
              <button
                onClick={() => navigator.share?.({ title: destination.name, url: window.location.href })}
                className="w-full font-condensed font-semibold tracking-widest uppercase text-sm px-6 py-4 glass-panel text-chrome rounded-sm hover:text-white hover:bg-white/5 transition-all duration-200 min-h-[48px] flex items-center justify-center gap-2 border border-white/8 focus-ring"
              >
                <Share2 className="w-4 h-4" />
                Share This Package
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer strip */}
      <div className="border-t border-white/8 px-6 lg:px-10 py-6">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 font-body text-chrome text-sm hover:text-white transition-colors focus-ring">
            <ArrowLeft className="w-4 h-4" />
            Back to All Destinations
          </Link>
          <p className="font-body text-chrome text-xs">
            © {new Date().getFullYear()} Gladex International Travel
          </p>
        </div>
      </div>
    </div>
  );
}