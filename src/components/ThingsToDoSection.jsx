import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ThumbsUp, Check } from "lucide-react";

const ORANGE = "#FF8C00";

const FILTERS = ["All", "Tours", "Nature", "Food", "Adventure"];
const SORTS = [
  "Most Popular",
  "Recommended First",
  "Nature Spots",
  "Food Experiences",
  "Adventure Activities",
  "Family Friendly",
  "Easy Access",
  "Newest Destination Briefing",
];

// Overview content per destination
const OVERVIEW_CONTENT = {
  default: {
    highlights: ["Iconic landmarks and UNESCO heritage sites", "Rich cultural experiences and local traditions", "Vibrant local markets and street food scenes", "Natural landscapes and scenic viewpoints"],
    culture: "This destination offers a unique blend of ancient traditions and modern culture. Visitors can expect warm hospitality, diverse culinary experiences, and a deep sense of local heritage.",
    notes: ["Dress respectfully at religious and cultural sites", "Carry your identification at all times", "Follow local customs and etiquette", "Stay hydrated and protect yourself from the sun"],
  },
};

// Travel tips per destination
const TRAVEL_TIPS = {
  default: [
    { icon: "👕", title: "What to Wear", tip: "Dress modestly when visiting temples or religious sites. Light, breathable clothing is recommended for the tropical climate." },
    { icon: "🚌", title: "Transportation", tip: "Use official taxis or ride-hailing apps. Your guide will assist with transfers. Avoid unauthorized vehicles at the airport." },
    { icon: "📋", title: "Travel Reminders", tip: "Keep a photocopy of your passport. Save emergency contacts. Be at the meeting point 10 minutes before departure." },
    { icon: "🙏", title: "Local Customs", tip: "Remove shoes when entering temples. Avoid pointing feet toward religious symbols. Always greet locals with a smile and respect." },
    { icon: "🎒", title: "Preparation", tip: "Pack light — most hotels have laundry services. Bring a reusable water bottle, sunscreen, and insect repellent." },
  ],
};

function ActivityDetailView({ activityData, onClose, isDark, textPrimary, textSecondary, border, bgCard, bgAlt }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      className="rounded-2xl border p-4 lg:p-8 mt-4 transition-colors duration-300 shadow-xl"
      style={{ backgroundColor: isDark ? "#161616" : "#FFFFFF", borderColor: border }}
    >
      <div className="flex items-center justify-between mb-6 pb-4 border-b" style={{ borderColor: border }}>
        <div className="flex items-center gap-2 text-xs font-medium" style={{ color: textSecondary }}>
          <span>Activities</span> <span>&rsaquo;</span>
          <span style={{ color: textPrimary }}>{activityData?.title}</span>
        </div>
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-zinc-100 hover:bg-zinc-200 transition-colors"
          style={{ color: textPrimary }}
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </button>
      </div>
      <h1 className="text-xl lg:text-3xl font-black font-condensed tracking-wide mb-3" style={{ color: textPrimary }}>
        {activityData?.title}
      </h1>
      <div className="flex flex-wrap items-center gap-4 mb-6 text-xs font-medium">
        <span className="text-amber-500 font-bold">★ {activityData?.rating}</span>
        <span style={{ color: textSecondary }}>• {activityData?.booked} travelers joined</span>
        <span className="px-2 py-0.5 rounded text-[10px] font-semibold" style={{ backgroundColor: isDark ? "#2A2A2A" : "#F5F5F5", color: textSecondary }}>
          {activityData?.type}
        </span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="rounded-xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
          <img src={activityData?.img} alt={activityData?.title} className="w-full h-full object-cover" />
        </div>
        <div className="p-5 rounded-2xl border flex flex-col justify-center gap-3" style={{ backgroundColor: bgAlt, borderColor: border }}>
          <div className="flex items-start gap-3">
            <ThumbsUp className="w-5 h-5 shrink-0 mt-0.5" style={{ color: ORANGE }} />
            <p className="text-sm leading-relaxed" style={{ color: textPrimary }}>
              A {activityData?.type?.toLowerCase()} experience at this destination with knowledgeable local guides and unforgettable memories.
            </p>
          </div>
        </div>
      </div>
      <div className="p-4 rounded-xl border space-y-3" style={{ backgroundColor: bgCard, borderColor: border }}>
        <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: textPrimary }}>Activity Guide</h4>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {["English-speaking guide", "All entrance fees", "Comfortable transportation", "Bottled water"].map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
              <span style={{ color: textPrimary }}>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function ThingsToDoSection({ isDark, textPrimary, textSecondary, border, bgCard, bgAlt, activitiesData }) {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activeTab, setActiveTab] = useState("Activities");
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Most Popular");
  const navigate = useNavigate();
  const { slug } = useParams();

  const data = activitiesData || { cityName: "Activities", rating: "4.8", reviewCount: "10K+", totalBooked: "100K+", activities: [], reviews: [], nearbyPlaces: [], topAttractions: [] };
  const selectedActivityData = data.activities?.find(a => a.id === selectedActivity);

  // Filter map — tag-to-filter mapping
  const filterMap = {
    "All": () => true,
    "Tours": (a) => ["city tour", "guided tour", "tour", "cultural", "temple", "palace", "castle"].some(k => (a.type || "").toLowerCase().includes(k) || (a.tag || "").toLowerCase().includes(k) || (a.title || "").toLowerCase().includes(k)),
    "Nature": (a) => ["nature", "beach", "park", "mountain", "forest", "island", "outdoor", "lake", "river"].some(k => (a.type || "").toLowerCase().includes(k) || (a.tag || "").toLowerCase().includes(k) || (a.title || "").toLowerCase().includes(k)),
    "Food": (a) => ["food", "restaurant", "dining", "market", "cuisine", "eat", "culinary"].some(k => (a.type || "").toLowerCase().includes(k) || (a.tag || "").toLowerCase().includes(k) || (a.title || "").toLowerCase().includes(k)),
    "Adventure": (a) => ["adventure", "island hopping", "water", "rafting", "atv", "dive", "snorkel", "hike", "trek", "swing", "safari"].some(k => (a.type || "").toLowerCase().includes(k) || (a.tag || "").toLowerCase().includes(k) || (a.title || "").toLowerCase().includes(k)),
  };

  // Sort map
  const sortFn = {
    "Most Popular": (a, b) => parseFloat(b.rating) - parseFloat(a.rating),
    "Recommended First": (a, b) => (b.choice ? 1 : 0) - (a.choice ? 1 : 0),
    "Nature Spots": (a, b) => {
      const isNatureA = filterMap["Nature"](a) ? 1 : 0;
      const isNatureB = filterMap["Nature"](b) ? 1 : 0;
      return isNatureB - isNatureA;
    },
    "Food Experiences": (a, b) => {
      const isA = filterMap["Food"](a) ? 1 : 0;
      const isB = filterMap["Food"](b) ? 1 : 0;
      return isB - isA;
    },
    "Adventure Activities": (a, b) => {
      const isA = filterMap["Adventure"](a) ? 1 : 0;
      const isB = filterMap["Adventure"](b) ? 1 : 0;
      return isB - isA;
    },
    "Family Friendly": (a, b) => (a.title || "").localeCompare(b.title || ""),
    "Easy Access": (a, b) => parseFloat(b.rating) - parseFloat(a.rating),
    "Newest Destination Briefing": (a, b) => (b.id || "").localeCompare(a.id || ""),
  };

  const filteredActivities = (data.activities || [])
    .filter(filterMap[activeFilter] || (() => true))
    .sort(sortFn[sortBy] || (() => 0));

  const overview = OVERVIEW_CONTENT[slug] || OVERVIEW_CONTENT.default;
  const travelTips = TRAVEL_TIPS[slug] || TRAVEL_TIPS.default;

  if (selectedActivity && activeTab === "Activities") {
    return (
      <ActivityDetailView
        activityData={selectedActivityData}
        onClose={() => setSelectedActivity(null)}
        isDark={isDark} textPrimary={textPrimary} textSecondary={textSecondary}
        border={border} bgCard={bgCard} bgAlt={bgAlt}
      />
    );
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold font-condensed tracking-wide mb-1" style={{ color: textPrimary }}>
            {data.cityName}
          </h2>
          <div className="flex items-center gap-2 text-xs lg:text-sm">
            <span className="text-amber-500 font-bold">★ {data.rating}</span>
            <span style={{ color: textSecondary }}>({data.reviewCount} traveler reviews) • {data.totalBooked} travelers</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-6 text-sm font-semibold overflow-x-auto" style={{ borderColor: border }}>
        {["Overview", "Activities", "Travel Tips"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-4 py-2 whitespace-nowrap border-b-2 transition-colors"
            style={{
              borderColor: activeTab === tab ? ORANGE : "transparent",
              color: activeTab === tab ? ORANGE : textSecondary,
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── TAB: OVERVIEW ── */}
      {activeTab === "Overview" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 mb-16">
          <div>
            <h3 className="text-base font-bold mb-3" style={{ color: textPrimary }}>About {data.cityName}</h3>
            <p className="text-sm leading-relaxed" style={{ color: textSecondary }}>{overview.culture}</p>
          </div>
          <div>
            <h3 className="text-base font-bold mb-3" style={{ color: textPrimary }}>Highlights</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {overview.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: textSecondary }}>
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0 mt-0.5" style={{ backgroundColor: ORANGE }}>{i + 1}</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 rounded-xl border" style={{ backgroundColor: isDark ? "#1C1500" : "#FFF8F0", borderColor: isDark ? "#3A2800" : "#FFD699" }}>
            <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: ORANGE }}>Important Notes</p>
            <ul className="space-y-1.5">
              {overview.notes.map((n, i) => (
                <li key={i} className="text-xs flex items-start gap-1.5" style={{ color: textSecondary }}>
                  <span style={{ color: ORANGE }}>›</span> {n}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ── TAB: ACTIVITIES ── */}
      {activeTab === "Activities" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {/* Filter + Sort row */}
          <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              {FILTERS.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className="px-3 py-1.5 rounded-md border text-xs font-medium hover:opacity-80 transition-all"
                  style={{
                    backgroundColor: activeFilter === filter ? ORANGE : bgAlt,
                    borderColor: activeFilter === filter ? ORANGE : border,
                    color: activeFilter === filter ? "#fff" : textPrimary,
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span style={{ color: textSecondary }}>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded px-2 py-1 bg-transparent text-xs font-semibold focus:outline-none"
                style={{ borderColor: border, color: textPrimary }}
              >
                {SORTS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <p className="text-xs mb-4 font-semibold" style={{ color: textSecondary }}>{filteredActivities.length} experiences available</p>

          {filteredActivities.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
              {filteredActivities.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  onClick={() => slug ? navigate(`/tour-packages/${slug}`) : setSelectedActivity(item.id)}
                  className="rounded-xl overflow-hidden border shadow-sm flex flex-col relative group cursor-pointer"
                  style={{ backgroundColor: bgCard, borderColor: border }}
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-gray-200">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    {item.choice && (
                      <span className="absolute top-2 left-2 text-[10px] font-bold text-white px-2 py-0.5 rounded-sm" style={{ backgroundColor: ORANGE }}>
                        Top Pick
                      </span>
                    )}
                  </div>
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-semibold tracking-wide uppercase block mb-1" style={{ color: textSecondary }}>{item.type}</span>
                      <h3 className="text-xs font-bold line-clamp-2 leading-snug mb-1" style={{ color: textPrimary }}>{item.title}</h3>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-sm font-medium bg-zinc-100 text-zinc-600">{item.tag}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] mt-2">
                      <span className="text-amber-500 font-bold">★ {item.rating}</span>
                      <span style={{ color: textSecondary }}>• {item.booked} travelers</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center mb-16 rounded-2xl border-2 border-dashed" style={{ borderColor: border }}>
              <p className="text-sm font-semibold mb-1" style={{ color: textSecondary }}>No activities in this category</p>
              <p className="text-xs" style={{ color: textSecondary }}>Try selecting "All" to see everything.</p>
            </div>
          )}
        </motion.div>
      )}

      {/* ── TAB: TRAVEL TIPS ── */}
      {activeTab === "Travel Tips" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 mb-16">
          {travelTips.map((tip, i) => (
            <div key={i} className="flex gap-4 p-4 rounded-xl border" style={{ backgroundColor: bgCard, borderColor: border }}>
              <span className="text-2xl shrink-0">{tip.icon}</span>
              <div>
                <p className="font-bold text-sm mb-1" style={{ color: textPrimary }}>{tip.title}</p>
                <p className="text-sm leading-relaxed" style={{ color: textSecondary }}>{tip.tip}</p>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Reviews */}
      {data.reviews?.length > 0 && (
        <div className="mb-16">
          <h3 className="text-lg font-bold font-condensed mb-4" style={{ color: textPrimary }}>Traveler experiences in {data.cityName}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.reviews.map((rev, idx) => (
              <div key={idx} className="p-4 rounded-xl border text-xs" style={{ backgroundColor: bgCard, borderColor: border }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-zinc-300 flex items-center justify-center font-bold text-[10px]">{rev.user[0]}</div>
                    <span className="font-bold" style={{ color: textPrimary }}>{rev.user}</span>
                  </div>
                  <span style={{ color: textSecondary }}>{rev.date}</span>
                </div>
                <p className="leading-relaxed" style={{ color: textSecondary }}>{rev.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top Attractions */}
      {data.topAttractions?.length > 0 && (
        <div className="pt-6 border-t" style={{ borderColor: border }}>
          <h4 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: textPrimary }}>Top attractions in {data.cityName}</h4>
          <div className="flex flex-wrap gap-2">
            {data.topAttractions.map((item, idx) => (
              <span key={idx} className="px-3 py-1 text-xs rounded-md border font-medium flex items-center gap-1.5"
                style={{ backgroundColor: bgCard, borderColor: border, color: textPrimary }}>
                <span className="text-[10px] text-amber-600 font-bold">{idx + 1}</span> {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
}