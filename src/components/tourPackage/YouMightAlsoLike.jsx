import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ORANGE = "#FF9913";

// Image map for activity cards
const activityImages = {
  "Everland Theme Park": "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=400&q=80",
  "COEX Aquarium": "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=400&q=80",
  "K-pop Concert Experience": "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80",
  "DMZ Tour": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400&q=80",
  "Korean Cooking Class": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80",
  "Mt Fuji Day Tour": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80",
  "Tokyo Disneyland": "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=400&q=80",
  "Kyoto Full Day": "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=80",
  "Hiroshima & Miyajima Island": "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&q=80",
  "Nara Deer Park Tour": "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=400&q=80",
  "Universal Studios Singapore": "https://images.unsplash.com/photo-1506870799893-1e0a3e02b25c?w=400&q=80",
  "Night Safari": "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=400&q=80",
  "Sentosa Adventure Cove": "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=400&q=80",
  "Marina Bay SkyPark": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&q=80",
  "Singapore Flyer": "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=400&q=80",
  "Ayutthaya Ancient City Tour": "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=400&q=80",
  "Chao Phraya Dinner Cruise": "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400&q=80",
  "Floating Market Tour": "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=400&q=80",
  "Safari World": "https://images.unsplash.com/photo-1524613032530-449a5d94c285?w=400&q=80",
  "Coral Island Day Trip": "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&q=80",
  "Macau Day Tour": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
  "Ocean Park": "https://images.unsplash.com/photo-1549592887-f18f358ec977?w=400&q=80",
  "Lantau Island Trek": "https://images.unsplash.com/photo-1512452935861-f17bb7c2c8b4?w=400&q=80",
  "Night Market Tour": "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=400&q=80",
  "Harbour Cruise": "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400&q=80",
  "Desert Safari with BBQ Dinner": "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=400&q=80",
  "Dubai City Tour": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80",
  "Dhow Cruise Dinner": "https://images.unsplash.com/photo-1568797629192-789acf8e4df3?w=400&q=80",
  "Dubai Frame": "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=400&q=80",
  "Burj Khalifa At The Top": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80",
  "Bali Swing": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&q=80",
  "Nusa Penida Tour": "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&q=80",
  "White Water Rafting": "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=400&q=80",
  "ATV Ride": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80",
  "Mount Batur Sunrise Trek": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400&q=80",
};

const activityDescriptions = {
  "Everland Theme Park": "South Korea's largest theme park — thrilling rides and seasonal festivals.",
  "K-pop Concert Experience": "Live the K-pop dream with an authentic concert performance in Seoul.",
  "DMZ Tour": "Visit the historic Demilitarized Zone — a powerful reminder of Korea's history.",
  "Korean Cooking Class": "Learn to make authentic Korean dishes with a local chef.",
  "Mt Fuji Day Tour": "Iconic volcanic peak with stunning panoramic views of Japan.",
  "Kyoto Full Day": "Ancient temples, traditional geisha districts, and bamboo groves.",
  "Desert Safari with BBQ Dinner": "Dune bashing, camel rides, and a traditional BBQ feast under the stars.",
  "Dhow Cruise Dinner": "Scenic dinner cruise on traditional wooden dhow boats.",
  "Bali Swing": "Soar above the jungle canopy with breathtaking rice terrace views.",
  "Nusa Penida Tour": "Pristine beaches, dramatic cliffs, and crystal-clear turquoise waters.",
  "Night Safari": "The world's first nocturnal zoo — an extraordinary wildlife experience.",
  "Floating Market Tour": "Vibrant Thai market on the water — exotic fruits and street food.",
};

const fallbackImg = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=80";

const VISIBLE = 3;

export default function YouMightAlsoLike({ activities = [], trendingSights = [] }) {
  const [actPage, setActPage] = useState(0);
  const [sightPage, setSightPage] = useState(0);

  // Build rich activity cards
  const actCards = activities.map((act) => {
    const name = typeof act === "string" ? act : act.title || act;
    return {
      name,
      image: activityImages[name] || fallbackImg,
      desc: activityDescriptions[name] || `Explore this amazing ${name.toLowerCase()} experience.`,
    };
  });

  // Build trending sights cards
  const sightCards = trendingSights.map((s, i) => {
    const name = typeof s === "string" ? s : s.title || s;
    const images = [
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=80",
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80",
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=80",
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400&q=80",
      "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=400&q=80",
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80",
    ];
    return { name, image: images[i % images.length], desc: `Iconic landmark — a must-see on your ${name} visit.` };
  });

  if (!actCards.length && !sightCards.length) return null;

  const actTotal = Math.ceil(actCards.length / VISIBLE);
  const sightTotal = Math.ceil(sightCards.length / VISIBLE);

  return (
    <div className="space-y-10">
      {/* ── YOU MIGHT ALSO LIKE ── */}
      {actCards.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 rounded-full shrink-0" style={{ backgroundColor: ORANGE }} />
              <h2 className="text-xl font-black font-condensed tracking-wide text-gray-900">You Might Also Like</h2>
            </div>
            {actTotal > 1 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActPage(p => Math.max(0, p - 1))}
                  disabled={actPage === 0}
                  className="w-8 h-8 rounded-full border flex items-center justify-center disabled:opacity-30"
                  style={{ borderColor: ORANGE, color: ORANGE }}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs text-gray-400">{actPage + 1}/{actTotal}</span>
                <button
                  onClick={() => setActPage(p => Math.min(actTotal - 1, p + 1))}
                  disabled={actPage === actTotal - 1}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white disabled:opacity-30"
                  style={{ backgroundColor: ORANGE }}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={actPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.22 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              {actCards.slice(actPage * VISIBLE, actPage * VISIBLE + VISIBLE).map((act, i) => (
                <div key={i} className="rounded-xl overflow-hidden border border-gray-100 shadow-sm group cursor-pointer hover:shadow-md transition-all">
                  <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                    <img
                      src={act.image}
                      alt={act.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 left-3 right-3">
                      <p className="text-white text-xs font-bold leading-tight">{act.name}</p>
                    </div>
                  </div>
                  <div className="p-3 bg-white">
                    <p className="text-xs text-gray-500 leading-relaxed">{act.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* ── TRENDING SIGHTS ── */}
      {sightCards.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 rounded-full shrink-0" style={{ backgroundColor: ORANGE }} />
              <h2 className="text-xl font-black font-condensed tracking-wide text-gray-900">Trending Sights</h2>
            </div>
            {sightTotal > 1 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSightPage(p => Math.max(0, p - 1))}
                  disabled={sightPage === 0}
                  className="w-8 h-8 rounded-full border flex items-center justify-center disabled:opacity-30"
                  style={{ borderColor: ORANGE, color: ORANGE }}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs text-gray-400">{sightPage + 1}/{sightTotal}</span>
                <button
                  onClick={() => setSightPage(p => Math.min(sightTotal - 1, p + 1))}
                  disabled={sightPage === sightTotal - 1}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white disabled:opacity-30"
                  style={{ backgroundColor: ORANGE }}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={sightPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.22 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              {sightCards.slice(sightPage * VISIBLE, sightPage * VISIBLE + VISIBLE).map((sight, i) => (
                <div key={i} className="rounded-xl overflow-hidden border border-gray-100 shadow-sm group cursor-pointer hover:shadow-md transition-all">
                  <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                    <img
                      src={sight.image}
                      alt={sight.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="flex items-center gap-1 mb-0.5">
                        <span className="text-[10px] font-black px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: ORANGE }}>
                          #{i + 1 + sightPage * VISIBLE}
                        </span>
                      </div>
                      <p className="text-white text-xs font-bold leading-tight">{sight.name}</p>
                    </div>
                  </div>
                  <div className="p-3 bg-white">
                    <p className="text-xs text-gray-500 leading-relaxed">{sight.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}