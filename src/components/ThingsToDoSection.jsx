import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowLeft, Star } from "lucide-react";
import { Heart, ThumbsUp, Check, X } from "lucide-react";

const ORANGE = "#FF8C00";

// Full detail data for activity detail view
const ACTIVITY_DETAILS = {
  // Generic fallback detail template
};

function ActivityDetailView({ activityId, activityData, onClose, isDark, textPrimary, textSecondary, border, bgCard, bgAlt }) {
  const [selectedDate, setSelectedDate] = useState("2026-06-01");
  const [tourType, setTourType] = useState("Join-in tour");
  const [fareType, setFareType] = useState("Regular");
  const [quantity, setQuantity] = useState(1);

  const priceNum = parseInt(activityData?.price?.replace(/,/g, "") || "1500");

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
          <ArrowLeft className="w-3.5 h-3.5" /> Back to List
        </button>
      </div>

      <h1 className="text-xl lg:text-3xl font-black font-condensed tracking-wide mb-3" style={{ color: textPrimary }}>
        {activityData?.title}
      </h1>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 text-xs font-medium">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-amber-500 font-bold">★ {activityData?.rating}</span>
          <span style={{ color: textSecondary }}>• {activityData?.booked} booked</span>
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold" style={{ backgroundColor: isDark ? "#2A2A2A" : "#F5F5F5", color: textSecondary }}>
            {activityData?.type}
          </span>
        </div>
        <button className="flex items-center gap-1 text-zinc-500 hover:text-red-500 font-bold transition-colors">
          <Heart className="w-3.5 h-3.5" /> Save to wishlist
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-2 space-y-2">
          <div className="rounded-xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
            <img src={activityData?.img} alt={activityData?.title} className="w-full h-full object-cover" />
          </div>
          <div className="p-5 rounded-2xl border flex items-start gap-4" style={{ backgroundColor: bgAlt, borderColor: border }}>
            <div className="p-2.5 rounded-full bg-orange-50 text-orange-600 shrink-0">
              <ThumbsUp className="w-5 h-5" />
            </div>
            <div className="text-xs lg:text-sm leading-relaxed">
              <p style={{ color: textPrimary }}>
                Join this exciting {activityData?.type?.toLowerCase()} experience and discover the best of {activityData?.title}. 
                Enjoy guided exploration with knowledgeable local experts and create unforgettable memories.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["English guide", "Small group", "Instant confirmation"].map((tag, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded font-medium" style={{ backgroundColor: isDark ? "#2A2A2A" : "#F0F0F0", color: textSecondary }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-5 rounded-2xl border shadow-md space-y-5" style={{ backgroundColor: bgCard, borderColor: border }}>
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-bold text-zinc-400">Total Price</span>
              <span className="text-2xl font-black" style={{ color: ORANGE }}>₱ {(priceNum * quantity).toLocaleString()}</span>
            </div>
            <div className="space-y-3 pt-3 border-t" style={{ borderColor: border }}>
              <div>
                <label className="text-[11px] uppercase tracking-wider font-bold block mb-1.5" style={{ color: textSecondary }}>Tour Date</label>
                <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-xs bg-transparent focus:outline-none focus:ring-1 focus:ring-orange-500"
                  style={{ borderColor: border, color: textPrimary }} />
              </div>
              <div>
                <label className="text-[11px] uppercase tracking-wider font-bold block mb-1.5" style={{ color: textSecondary }}>Tour Type</label>
                <div className="flex flex-wrap gap-1.5">
                  {["Join-in tour", "Private tour"].map(t => (
                    <button key={t} onClick={() => setTourType(t)} className="px-3 py-1.5 rounded-md border text-xs font-medium transition-all"
                      style={{ borderColor: tourType === t ? ORANGE : border, backgroundColor: tourType === t ? "rgba(255,140,0,0.08)" : "transparent", color: tourType === t ? ORANGE : textPrimary }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[11px] uppercase tracking-wider font-bold block mb-1.5" style={{ color: textSecondary }}>Package</label>
                <div className="flex flex-wrap gap-1.5">
                  {["Regular", "Premium"].map(f => (
                    <button key={f} onClick={() => setFareType(f)} className="px-3 py-1.5 rounded-md border text-xs font-medium transition-all"
                      style={{ borderColor: fareType === f ? ORANGE : border, backgroundColor: fareType === f ? "rgba(255,140,0,0.08)" : "transparent", color: fareType === f ? ORANGE : textPrimary }}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-bold" style={{ color: textPrimary }}>Quantity</span>
                <div className="flex items-center border rounded-lg overflow-hidden" style={{ borderColor: border }}>
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-2.5 py-1 text-sm bg-zinc-100 text-zinc-500">-</button>
                  <span className="px-4 text-xs font-bold" style={{ color: textPrimary }}>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-2.5 py-1 text-sm bg-zinc-100 text-zinc-500">+</button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button className="w-full py-2.5 rounded-xl border text-xs font-bold tracking-wide hover:opacity-90" style={{ borderColor: ORANGE, color: ORANGE }}>Add to cart</button>
              <button className="w-full py-2.5 rounded-xl text-white text-xs font-bold tracking-wide hover:opacity-90" style={{ backgroundColor: ORANGE }}>Book now</button>
            </div>
          </div>
        </div>
      </div>

      {/* Inclusions */}
      <div className="p-4 rounded-xl border space-y-3" style={{ backgroundColor: bgCard, borderColor: border }}>
        <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: textPrimary }}>What's included</h4>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {["English-speaking guide", "All entrance fees", "Comfortable transportation", "Bottled water"].map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
              <span style={{ color: textPrimary }}>{item}</span>
            </li>
          ))}
          {["Hotel pick up", "Meals (unless stated)", "Travel insurance"].map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <X className="w-3.5 h-3.5 text-zinc-400 mt-0.5 shrink-0" />
              <span className="line-through opacity-60" style={{ color: textSecondary }}>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function ThingsToDoSection({ isDark, textPrimary, textSecondary, border, bgCard, bgAlt, activitiesData }) {
  const [selectedActivity, setSelectedActivity] = useState(null);

  const data = activitiesData || {
    cityName: "Activities",
    rating: "4.8",
    reviews: "10K+",
    totalBooked: "100K+",
    activities: [],
    reviews: [],
    nearbyPlaces: [],
    topAttractions: [],
  };

  const selectedActivityData = data.activities?.find(a => a.id === selectedActivity);

  if (selectedActivity) {
    return (
      <ActivityDetailView
        activityId={selectedActivity}
        activityData={selectedActivityData}
        onClose={() => {
          setSelectedActivity(null);
          document.getElementById("things-to-do-section")?.scrollIntoView({ behavior: "smooth" });
        }}
        isDark={isDark}
        textPrimary={textPrimary}
        textSecondary={textSecondary}
        border={border}
        bgCard={bgCard}
        bgAlt={bgAlt}
      />
    );
  }

  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl lg:text-3xl font-bold font-condensed tracking-wide mb-1" style={{ color: textPrimary }}>
          Things to do in {data.cityName}
        </h2>
        <div className="flex items-center gap-2 text-xs lg:text-sm">
          <span className="text-amber-500 font-bold">★ {data.rating}</span>
          <span style={{ color: textSecondary }}>({data.reviews} reviews) • {data.totalBooked} booked</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-6 text-sm font-semibold" style={{ borderColor: border }}>
        <button className="px-4 py-2" style={{ color: textSecondary }}>Overview</button>
        <button className="px-4 py-2 border-b-2" style={{ borderColor: ORANGE, color: ORANGE }}>Things to do</button>
        <button className="px-4 py-2" style={{ color: textSecondary }}>Hotels</button>
      </div>

      {/* Filter row */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div className="flex items-center gap-2 flex-wrap">
          {["All", "Tours", "Nature", "Food", "Adventure"].map((filter, idx) => (
            <button key={idx} className="px-3 py-1.5 rounded-md border text-xs font-medium hover:opacity-80 transition-all"
              style={{ backgroundColor: idx === 0 ? ORANGE : bgAlt, borderColor: idx === 0 ? ORANGE : border, color: idx === 0 ? "#fff" : textPrimary }}>
              {filter}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span style={{ color: textSecondary }}>Sort by:</span>
          <select className="border rounded px-2 py-1 bg-transparent text-xs font-semibold focus:outline-none" style={{ borderColor: border, color: textPrimary }}>
            <option>Most popular</option>
            <option>Price: low to high</option>
            <option>Price: high to low</option>
            <option>Highest rated</option>
          </select>
        </div>
      </div>

      <p className="text-xs mb-4 font-semibold" style={{ color: textSecondary }}>{data.activities?.length || 0} experiences found</p>

      {/* Activities Grid */}
      {data.activities?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
          {data.activities.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedActivity(item.id)}
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
                <button onClick={(e) => e.stopPropagation()} className="absolute top-2 right-2 p-1.5 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors">♥</button>
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-semibold tracking-wide uppercase block mb-1" style={{ color: textSecondary }}>{item.type}</span>
                  <h3 className="text-xs font-bold font-body line-clamp-2 leading-snug mb-1" style={{ color: textPrimary }}>{item.title}</h3>
                  <div className="flex flex-wrap gap-1 my-1.5">
                    <span className="text-[10px] px-1.5 py-0.5 rounded-sm font-medium bg-zinc-100 text-zinc-600">{item.tag}</span>
                    {idx % 2 === 0 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-sm font-medium bg-orange-50 text-orange-600">English guided</span>
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-[11px] mb-2">
                    <span className="text-amber-500 font-bold">★ {item.rating}</span>
                    <span style={{ color: textSecondary }}>• {item.booked} booked</span>
                  </div>
                  <div className="text-xs font-bold" style={{ color: textPrimary }}>
                    From <span className="text-sm font-black" style={{ color: ORANGE }}>₱ {item.price}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center mb-16">
          <p className="text-sm font-body" style={{ color: textSecondary }}>Activities coming soon for this destination.</p>
        </div>
      )}

      {/* Reviews */}
      {data.reviews?.length > 0 && (
        <div className="mb-16">
          <h3 className="text-lg font-bold font-condensed mb-4" style={{ color: textPrimary }}>
            What travelers say about {data.cityName}
          </h3>
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

      {/* Nearby Places */}
      {data.nearbyPlaces?.length > 0 && (
        <div className="mb-16">
          <h3 className="text-lg font-bold font-condensed mb-4" style={{ color: textPrimary }}>
            Popular places in {data.cityName}
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {data.nearbyPlaces.map((place, idx) => (
              <div key={idx} className="min-w-[200px] aspect-video rounded-xl overflow-hidden relative group shrink-0 border" style={{ borderColor: border }}>
                <img src={`https://images.unsplash.com/photo-${["1508009603885-50cf7c579365", "1537996194471-e657df975ab4", "1512452935861-f17bb7c2c8b4", "1565967511849-76a60a516170"][idx % 4]}?auto=format&fit=crop&w=300&q=80`} alt={place} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <h4 className="text-xs font-bold">{place}</h4>
                  <span className="text-[9px] opacity-80">📍 Popular Spot</span>
                </div>
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
              <span key={idx} className="px-3 py-1 text-xs rounded-md border font-medium cursor-pointer hover:opacity-80 transition-all flex items-center gap-1.5"
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