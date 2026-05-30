import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowLeft } from "lucide-react";
import { Heart, ThumbsUp, Check, X } from "lucide-react";

const ORANGE = "#FF8C00";

const ACTIVITIES_DATA = {
  "boracay-tour-package-island-hopping": {
    title: "Boracay Tour Package (Island Hopping)",
    type: "Tours",
    rating: "4.6",
    reviews: "6.0K reviews",
    booked: "100K+ booked",
    price: 900,
    badges: ["English", "Join in & private groups", "Meet with guide"],
    locationTags: ["Departing from Malay", "Puka Beach"],
    heroImages: [
      "https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1505080856163-267d49b30624?auto=format&fit=crop&w=400&q=80",
    ],
    description: "Book this island tour package and discover Boracay's white-sandy beaches, pristine waters, and fun attractions!",
    destinations: ["Ilig-Iligan Beach"],
    whatsIncluded: [
      { text: "English-speaking guide", checked: true },
      { text: "Join in Tour", checked: true },
      { text: "BBQ lunch", checked: true },
      { text: "Hotel pick up and drop off", checked: false },
      { text: "Insurance", checked: false },
      { text: "Snorkeling gear", checked: false },
    ]
  },
  "boracay-sunset-paraw-sailing": {
    title: "Boracay Sunset Paraw Sailing",
    type: "Water activities",
    rating: "4.6",
    reviews: "1,073 reviews",
    booked: "30K+ booked",
    price: 938,
    badges: ["English guided", "Instant Confirmation"],
    locationTags: ["White Beach Station 1"],
    heroImages: [
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&w=400&q=80"
    ],
    description: "Experience a classic Boracay activity by sailing on a traditional local Paraw sailboat as the iconic tropical sun dips over the crystal clear horizons.",
    destinations: ["Station 1 Beachline"],
    whatsIncluded: [
      { text: "Local Skipper and Crew", checked: true },
      { text: "Safety Life Vest", checked: true },
      { text: "Environmental fees", checked: true }
    ]
  }
};

const ACTIVITIES_LIST = [
  { id: "boracay-tour-package-island-hopping", title: "Boracay Tour Package (Island Hopping)", type: "Tours", price: "900", rating: "4.6", booked: "100K+", img: "https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&w=400&q=80", tag: "Book now for tomorrow" },
  { id: "boracay-sunset-paraw-sailing", title: "Boracay Sunset Paraw Sailing", type: "Water activities", price: "938", rating: "4.6", booked: "30K+", img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
  { id: "sunset-party-cruise-in-boracay", title: "Sunset Party Cruise in Boracay", type: "Cruises", price: "760", rating: "4.7", booked: "10K+", img: "https://images.unsplash.com/photo-1505080856163-267d49b30624?auto=format&fit=crop&w=400&q=80", tag: "Book now for tomorrow" },
  { id: "boracay-parasailing", title: "Boracay Parasailing", type: "Outdoor & sports activities", price: "2,019", rating: "4.8", booked: "40K+", img: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
  { id: "boracay-party-yacht-experience", title: "Boracay Party Yacht Experience", type: "Water activities", price: "1,250", rating: "4.8", booked: "3+ booked", img: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=400&q=80", tag: "Book now for tomorrow" },
  { id: "station-x-experience-at-hue-hotel-boracay", title: "Station X Experience at Hue Hotel Boracay", type: "Tours", price: "899", rating: "4.8", booked: "5K+", img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=400&q=80", tag: "Book now for tomorrow" },
  { id: "boracay-atv-and-buggy-car-adventure", title: "Boracay ATV and Buggy Car Adventure", type: "Outdoor & sports activities", price: "875", rating: "4.4", booked: "10K+", img: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
  { id: "boracay-jet-ski-experience", title: "Boracay Jet Ski Experience", type: "Water activities", price: "2,590", rating: "4.7", booked: "6K+", img: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=400&q=80", tag: "Book now for today", choice: true },
  { id: "boracay-diamond-sunset-cruise", title: "Boracay Diamond Sunset Cruise", type: "Water activities", price: "1,550", rating: "4.4", booked: "7K+", img: "https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&w=400&q=80", tag: "Book now for tomorrow" },
  { id: "boracay-helmet-dive-experience", title: "Boracay Helmet Dive Experience", type: "Water activities", price: "1,000", rating: "4.7", booked: "40K+", img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
  { id: "boracay-helicopter-experience", title: "Boracay Helicopter Experience", type: "Tours", price: "6,688", rating: "4.8", booked: "5K+", img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80", tag: "Book now for tomorrow" },
  { id: "boracay-land-tour", title: "Boracay Land Tour", type: "Tours", price: "984", rating: "4.8", booked: "1K+", img: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=400&q=80", tag: "Book now for tomorrow" },
];

function ActivityDetailView({ activityId, onClose, isDark, textPrimary, textSecondary, border, bgCard, bgAlt }) {
  const data = ACTIVITIES_DATA[activityId] || {
    ...ACTIVITIES_DATA["boracay-tour-package-island-hopping"],
    title: activityId.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  };

  const [selectedDate, setSelectedDate] = useState("2026-06-01");
  const [tourType, setTourType] = useState("Join-in tour");
  const [fareType, setFareType] = useState("Regular");
  const [quantity, setQuantity] = useState(1);

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
          <span>Home</span> <span>&rsaquo;</span> <span>Boracay Activities</span> <span>&rsaquo;</span>
          <span style={{ color: textPrimary }}>{data.title}</span>
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
        {data.title}
      </h1>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {data.badges.map((b, i) => (
          <span key={i} className="text-[11px] font-semibold px-2 py-0.5 rounded bg-zinc-100" style={{ color: textSecondary }}>{b}</span>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 text-xs font-medium">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-amber-500 font-bold">★ {data.rating} <span className="underline font-normal" style={{ color: textSecondary }}>({data.reviews})</span></span>
          <span style={{ color: textSecondary }}>• {data.booked}</span>
          {data.locationTags.map((t, i) => (
            <span key={i} className="flex items-center gap-1" style={{ color: textSecondary }}>
              <MapPin className="w-3 h-3 text-orange-500" /> {t}
            </span>
          ))}
        </div>
        <button className="flex items-center gap-1 text-zinc-500 hover:text-red-500 font-bold transition-colors">
          <Heart className="w-3.5 h-3.5" /> Save to wishlist
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-2 space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 rounded-xl overflow-hidden" style={{ aspectRatio: "16/10" }}>
            <div className="md:col-span-2 bg-zinc-200">
              <img src={data.heroImages[0]} alt="Primary" className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
              <img src={data.heroImages[1] || data.heroImages[0]} alt="Gallery 2" className="w-full h-full object-cover" />
              <div className="relative w-full h-full">
                <img src={data.heroImages[2] || data.heroImages[0]} alt="Gallery 3" className="w-full h-full object-cover" />
                <button className="absolute bottom-2 right-2 px-3 py-1 bg-black/70 backdrop-blur-md rounded text-white text-[11px] font-bold">Gallery</button>
              </div>
            </div>
          </div>
          <div className="p-5 rounded-2xl border flex items-start gap-4" style={{ backgroundColor: bgAlt, borderColor: border }}>
            <div className="p-2.5 rounded-full bg-orange-50 text-orange-600 shrink-0">
              <ThumbsUp className="w-5 h-5" />
            </div>
            <div className="text-xs lg:text-sm leading-relaxed">
              <p style={{ color: textPrimary }}>{data.description}</p>
              <button className="mt-2 text-xs font-bold text-orange-500">See more &rsaquo;</button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-5 rounded-2xl border shadow-md space-y-5" style={{ backgroundColor: bgCard, borderColor: border }}>
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-bold text-zinc-400">Total Price</span>
              <span className="text-2xl font-black" style={{ color: ORANGE }}>₱ {(data.price * quantity).toLocaleString()}</span>
            </div>
            <div className="space-y-3 pt-3 border-t" style={{ borderColor: border }}>
              <div>
                <label className="text-[11px] uppercase tracking-wider font-bold block mb-1.5" style={{ color: textSecondary }}>Tour Date</label>
                <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-xs bg-transparent focus:outline-none focus:ring-1 focus:ring-orange-500"
                  style={{ borderColor: border, color: textPrimary }} />
              </div>
              <div>
                <label className="text-[11px] uppercase tracking-wider font-bold block mb-1.5" style={{ color: textSecondary }}>Tour Variant</label>
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
                <label className="text-[11px] uppercase tracking-wider font-bold block mb-1.5" style={{ color: textSecondary }}>Fare Structure</label>
                <div className="flex flex-wrap gap-1.5">
                  {["Regular", "Premium Package"].map(f => (
                    <button key={f} onClick={() => setFareType(f)} className="px-3 py-1.5 rounded-md border text-xs font-medium transition-all"
                      style={{ borderColor: fareType === f ? ORANGE : border, backgroundColor: fareType === f ? "rgba(255,140,0,0.08)" : "transparent", color: fareType === f ? ORANGE : textPrimary }}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-bold" style={{ color: textPrimary }}>Ticket Quantity</span>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6 border-t" style={{ borderColor: border }}>
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold font-condensed tracking-wide" style={{ color: textPrimary }}>Package details</h3>
          <div className="p-4 rounded-xl border space-y-3" style={{ backgroundColor: bgCard, borderColor: border }}>
            <div className="flex items-center gap-2 text-xs font-bold" style={{ color: textPrimary }}>
              <MapPin className="w-4 h-4 text-orange-500" />
              <span>Route & Destination Attractions:</span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs pl-6" style={{ color: textSecondary }}>
              {data.destinations.map((d, i) => <span key={i} className="px-2 py-1 bg-zinc-100 rounded">{d}</span>)}
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl border space-y-3" style={{ backgroundColor: bgCard, borderColor: border }}>
          <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: textPrimary }}>What's included</h4>
          <ul className="space-y-2 text-xs">
            {data.whatsIncluded.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                {item.checked ? <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" /> : <X className="w-3.5 h-3.5 text-zinc-400 mt-0.5 shrink-0" />}
                <span style={{ color: item.checked ? textPrimary : textSecondary }} className={!item.checked ? "line-through opacity-60" : ""}>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default function ThingsToDoSection({ isDark, textPrimary, textSecondary, border, bgCard, bgAlt }) {
  const [selectedActivity, setSelectedActivity] = useState(null);

  if (selectedActivity) {
    return (
      <ActivityDetailView
        activityId={selectedActivity}
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
      <div className="mb-6">
        <h2 className="text-2xl lg:text-3xl font-bold font-condensed tracking-wide mb-1" style={{ color: textPrimary }}>
          Things to do in Boracay
        </h2>
        <div className="flex items-center gap-2 text-xs lg:text-sm">
          <span className="text-amber-500 font-bold">★ 4.9</span>
          <span style={{ color: textSecondary }}>(22K+ reviews) • 1M+ booked</span>
        </div>
      </div>

      <div className="flex border-b mb-6 text-sm font-semibold" style={{ borderColor: border }}>
        <button className="px-4 py-2" style={{ color: textSecondary }}>Overview</button>
        <button className="px-4 py-2 border-b-2" style={{ borderColor: ORANGE, color: ORANGE }}>Things to do</button>
        <button className="px-4 py-2" style={{ color: textSecondary }}>Hotels</button>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div className="flex items-center gap-2 flex-wrap">
          {["Tours", "Massages", "Snorkeling", "Cruises"].map((filter, idx) => (
            <button key={idx} className="px-3 py-1.5 rounded-md border text-xs font-medium hover:opacity-80 transition-all flex items-center gap-1"
              style={{ backgroundColor: bgAlt, borderColor: border, color: textPrimary }}>
              <span>{["🥾", "💆", "🤿", "⛵"][idx]}</span> {filter}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span style={{ color: textSecondary }}>Sort by:</span>
          <select className="border rounded px-2 py-1 bg-transparent text-xs font-semibold focus:outline-none" style={{ borderColor: border, color: textPrimary }}>
            <option>Klook recommended</option>
            <option>Price: low to high</option>
            <option>Price: high to low</option>
          </select>
        </div>
      </div>

      <p className="text-xs mb-4 font-semibold" style={{ color: textSecondary }}>56 results found</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
        {ACTIVITIES_LIST.map((item, idx) => (
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
                  Klook's choice
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

      <div className="mb-16">
        <h3 className="text-lg font-bold font-condensed mb-4" style={{ color: textPrimary }}>What people say about top experiences</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { user: "MarieAnn ******", date: "9 Mar", comment: "Highly recommend 🤩 very friendly staff will assist you throughout your activities and flexible itinerary." },
            { user: "JoshuaAndrew *********", date: "9 Mar", comment: "Very friendly Staff Especially to Miss Noimie who assist us to 3 Activities. Affordable. Good Job. Keep it up." },
            { user: "Maegan ****", date: "8 Mar", comment: "Family friendly party yacht. Kids enjoyed the trip and loved how they have plenty of activities on board." }
          ].map((rev, idx) => (
            <div key={idx} className="p-4 rounded-xl border text-xs" style={{ backgroundColor: bgCard, borderColor: border }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-zinc-300 flex items-center justify-center font-bold text-[10px]">{rev.user[0]}</div>
                  <span className="font-bold" style={{ color: textPrimary }}>{rev.user}</span>
                </div>
                <span style={{ color: textSecondary }}>{rev.date}</span>
              </div>
              <p className="leading-relaxed mb-3" style={{ color: textSecondary }}>{rev.comment}</p>
              <div className="flex gap-1 overflow-hidden rounded">
                <div className="w-12 h-10 bg-zinc-200 shrink-0" />
                <div className="w-12 h-10 bg-zinc-200 shrink-0" />
                <div className="w-12 h-10 bg-zinc-200 shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <h3 className="text-lg font-bold font-condensed mb-4" style={{ color: textPrimary }}>Popular places near Boracay</h3>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {["Station 1", "CityMall Boracay", "D'Mall Boracay", "Station 2"].map((place, idx) => (
            <div key={idx} className="min-w-[220px] max-w-[240px] flex-1 aspect-video rounded-xl overflow-hidden relative group shrink-0 shadow-sm border" style={{ borderColor: border }}>
              <img src="https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&w=300&q=80" alt={place} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <h4 className="text-xs font-bold">{place}</h4>
                <span className="text-[9px] opacity-80">👥 998K+ visitors</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6 pt-6 border-t" style={{ borderColor: border }}>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: textPrimary }}>Top attractions in Boracay</h4>
          <div className="flex flex-wrap gap-2">
            {["Station 2", "Station 1", "D'Mall Boracay", "Station 3", "CityMall Boracay"].map((item, idx) => (
              <span key={idx} className="px-3 py-1 text-xs rounded-md border font-medium cursor-pointer hover:opacity-80 transition-all flex items-center gap-1.5"
                style={{ backgroundColor: bgCard, borderColor: border, color: textPrimary }}>
                <span className="text-[10px] text-amber-600 font-bold">{idx + 1}</span> {item}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: textPrimary }}>Top destinations in Philippines</h4>
          <div className="flex flex-wrap gap-2">
            {["Manila", "Cebu City", "Pasay", "Paranaque", "Makati", "Tagaytay", "El Nido", "Baguio", "Quezon City", "Panglao", "Laguna", "Puerto Princesa", "Coron"].map((item, idx) => (
              <span key={idx} className="px-3 py-1 text-xs rounded-md border font-medium cursor-pointer hover:opacity-80 transition-all"
                style={{ backgroundColor: bgCard, borderColor: border, color: textPrimary }}>
                <span className="text-[10px] opacity-50 mr-1">{idx + 1}</span> {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}