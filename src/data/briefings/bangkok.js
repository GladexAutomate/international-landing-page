// @ts-nocheck
export const bangkokBriefing = {
  slug: "bangkok",
  welcomeMessage: "Welcome to Bangkok! This briefing has everything you need for a smooth and memorable trip.",

  briefingInclusions: [
    "Round-trip airfare (Manila – Bangkok)",
    "3 nights hotel accommodation",
    "Daily breakfast",
    "Airport transfers (arrival & departure)",
  ],

  briefingExclusions: [
    "Compulsory driver/guide tipping",
    "Fuel surcharge",
    "Travel insurance",
    "PH Travel Tax",
    "Personal expenses",
    "Optional tours",
  ],

  travelInformation: [
    { label: "Airlines", value: "Cebu Pacific / Philippine Airlines / AirAsia" },
    { label: "Flight Duration", value: "~3.5 hours from Manila" },
    { label: "Time Zone", value: "Indochina Time (ICT, UTC+7)" },
    { label: "Flight Route", value: "Manila (MNL) → Bangkok (BKK) — Suvarnabhumi Airport" },
    { label: "Best Time to Visit", value: "November–February (cool and dry season). Avoid March–May (extreme heat). June–October is rainy season." },
    { label: "Language", value: "Thai (official). English widely understood at tourist sites, hotels, and malls." },
  ],

  arrivalInstructions: [
    { step: 1, text: "Proceed to Immigration — have your passport and Thailand TDAC (Digital Arrival Card) reference ready." },
    { step: 2, text: "Collect baggage at the designated carousel." },
    { step: 3, text: "Proceed to Customs — declare any applicable items." },
    { step: 4, text: "Look for your Gladex Tours representative at the arrivals hall." },
    { step: 5, text: "Transfer to hotel. Standard check-in is 14:00 — early check-in subject to availability." },
  ],

  transferInstructions: {
    overview: "Private transfers arranged for arrival and departure.",
    notes: [
      "Driver will be at arrivals hall with a name board.",
      "Notify Gladex Tours of any flight changes 24 hours in advance.",
    ],
  },

  hotelInformation: {
    checkIn: "14:00 (2:00 PM)",
    checkOut: "12:00 (12:00 PM)",
    notes: "Early check-in and late check-out subject to availability. Hotel security deposit may be required.",
  },

  reminders: [
    "Keep passport and documents safe at all times.",
    "Carry hotel address card in Thai script — essential for tuk-tuk and taxi drivers.",
    "Respect local customs — wai (hands together slight bow) is the standard greeting.",
    "Dress modestly at temples — cover shoulders and knees, or use provided sarongs.",
    "Carry small denomination Thai Baht for street food and markets.",
    "Stay hydrated — Bangkok heat is intense, especially from March to May.",
  ],

  immigrationAdvisory: [
    "Philippine passport holders are visa-free for up to 30 days in Thailand.",
    "Thailand TDAC (Thailand Digital Arrival Card) must be completed online before arrival at tdac.immigration.go.th.",
    "Passport must be valid for at least 6 months beyond travel date.",
    "Have your hotel booking confirmation and return ticket accessible at immigration.",
  ],

  shoppingAdvisory: [
    "Shop at reputable malls (Siam Paragon, MBK, ICONSIAM) for guaranteed authentic goods.",
    "Bargaining is acceptable and expected at Chatuchak Market and street stalls.",
    "Keep receipts for all purchases — VAT refund available at the airport for eligible amounts.",
    "Beware of counterfeit goods in markets and near major tourist attractions.",
  ],

  checklist: [
    { id: "passport",      icon: "🛂", label: "Valid ID / Passport" },
    { id: "voucher",       icon: "📄", label: "Travel Voucher" },
    { id: "ticket",        icon: "✈️", label: "Flight Ticket" },
    { id: "hotel_voucher", icon: "🏨", label: "Hotel Voucher" },
    { id: "cash",          icon: "💵", label: "Cash" },
    { id: "powerbank",     icon: "🔋", label: "Powerbank" },
    { id: "mobile_data",   icon: "📶", label: "Mobile Data" },
    { id: "chargers",      icon: "🔌", label: "Chargers" },
    { id: "medicines",     icon: "💊", label: "Medicines" },
    { id: "sunscreen",     icon: "🌞", label: "Sunscreen" },
    { id: "clothing",      icon: "👗", label: "Appropriate Clothing" },
  ],

  whatToBring: [
    { label: "Lightweight, breathable clothing appropriate for temples (cover shoulders and knees)" },
    { label: "Sarong or light scarf for temple entry if wearing shorts or sleeveless tops" },
    { label: "Insect repellent — especially for outdoor temples and riverside areas at dusk" },
    { label: "Thai Baht in small denominations for street food, tuk-tuks, and market stalls" },
    { label: "Sunscreen SPF 50+ — Bangkok's UV index is high and summer heat is extreme" },
  ],

  connectivityGuide: {
    overview: "Thailand has excellent 4G coverage throughout Bangkok. Tourist SIMs are available at Suvarnabhumi Airport arrival hall and at all major shopping malls. The AIS, DTAC, and True Move H networks all offer competitive tourist SIM packages.",
    simOptions: [
      { provider: "AIS", type: "Tourist SIM", data: "Unlimited (high-speed 30GB, throttled after)", validity: "8 days", price: "฿299", notes: "Best coverage and speeds in Bangkok. Available at airport arrival hall counters and AIS shops." },
      { provider: "DTAC / True Move H", type: "Tourist SIM", data: "Unlimited data", validity: "7 days", price: "฿299", notes: "Similar coverage to AIS. Available at airport and 7-Eleven convenience stores nationwide." },
      { provider: "Klook SIM Package", type: "Pre-order Tourist SIM", data: "Unlimited data", validity: "8 days", price: "From ฿199", notes: "Pre-order via Klook app before departure and pick up at the airport on arrival." },
    ],
    wifi: "Free WiFi available at most hotels, Suvarnabhumi Airport, all Siam shopping malls, and major restaurants. Bangkok's BTS stations also have free WiFi.",
    recommendations: "Purchase a SIM at the airport arrival hall to activate Grab and Google Maps from the moment you exit the terminal. Pre-complete the Thailand TDAC before your flight for faster immigration clearance.",
  },

  currencyGuide: {
    currency: "Thai Baht",
    symbol: "฿",
    code: "THB",
    exchangeRate: "₱1 ≈ ฿0.58 (approximate)",
    roughPrices: [
      { item: "Convenience store snack (7-Eleven)", price: "฿15–฿50" },
      { item: "Street Pad Thai / stall food", price: "฿50–฿80" },
      { item: "Restaurant meal (mid-range)", price: "฿100–฿250" },
      { item: "Iced Thai milk tea (street vendor)", price: "฿20–฿40" },
      { item: "Grab / metered taxi base fare", price: "฿40–฿60" },
      { item: "Chang or Leo beer (7-Eleven)", price: "฿49–฿55" },
    ],
    tips: [
      "Exchange at authorized money changers at Suvarnabhumi Airport or Superrich Thailand (iconic green or orange kiosks) for competitive rates.",
      "Notify your bank before travel to avoid card blocks on international transactions.",
      "Visa and Mastercard accepted at malls, hotels, and major restaurants — carry cash for street food.",
      "Keep ฿20–฿50 notes handy for street vendors, tuk-tuks, and temple donation boxes.",
    ],
  },

  destinationGuide: {
    intro: "Bangkok is one of the world's most dynamic and vibrant capitals — a thrilling blend of glittering temples, chaotic street markets, rooftop bars, and some of Asia's best street food. Known locally as Krung Thep (City of Angels), Bangkok assaults the senses in the most wonderful way, offering something extraordinary around every corner.",
    highlights: [
      { icon: "👑", name: "Grand Palace", description: "Bangkok's most visited landmark — the former royal residence and seat of government. A spectacular complex of Thai architecture, golden spires, and royal halls spanning 218,000 sq m.", img: "/images/destinations/bangkok/places/grand-palace.jpg" },
      { icon: "💎", name: "Wat Phra Kaew (Temple of Emerald Buddha)", description: "Located within the Grand Palace complex, this sacred temple houses Thailand's most revered Buddhist image — the Emerald Buddha, dressed in seasonal golden robes.", img: "/images/destinations/bangkok/places/wat-phra-kaew.jpg" },
      { icon: "🌅", name: "Wat Arun (Temple of Dawn)", description: "Bangkok's most beautiful riverside temple, its 82-metre central tower encrusted with colourful porcelain shards and seashells. Magical at sunrise and from the river at night.", img: "/images/destinations/bangkok/places/wat-arun.jpg" },
      { icon: "🛕", name: "Wat Pho (Reclining Buddha)", description: "Home to Thailand's largest Reclining Buddha, 46 metres long and covered in gold leaf. Wat Pho is also the birthplace of traditional Thai massage — treatments available on-site.", img: "/images/destinations/bangkok/places/wat-pho.jpg" },
      { icon: "🛒", name: "Chatuchak Weekend Market", description: "One of the world's largest outdoor markets with over 15,000 stalls selling everything from vintage fashion to live plants, street food, and antiques. Open Saturday and Sunday only.", img: "/images/destinations/bangkok/places/chatuchak-weekend-market.jpg" },
      { icon: "🌃", name: "Khao San Road", description: "Bangkok's legendary backpacker street — a non-stop strip of street food, bars, live music, souvenir stalls, and vibrant nightlife energy.", img: "/images/destinations/bangkok/places/khao-san-road.jpg" },
      { icon: "🌊", name: "Asiatique The Riverfront", description: "An open-air waterfront night market combining a mega Ferris wheel, riverside restaurants, boutique shopping, and live cabaret shows along the Chao Phraya River.", img: "/images/destinations/bangkok/places/asiatique-the-riverfront.jpg" },
      { icon: "🏬", name: "Siam Paragon / MBK Center", description: "Siam Paragon is Bangkok's premier luxury mall with a world-class aquarium and cinema complex. MBK next door is the go-to for electronics, fashion, and affordable eats.", img: "/images/destinations/bangkok/places/siam-paragon-mbk-center.jpg" },
      { icon: "🌳", name: "Lumpini Park", description: "Bangkok's green lung — a 58-hectare park in the heart of the city perfect for morning jogs, paddleboat rides, and observing locals practising tai chi at dawn.", img: "/images/destinations/bangkok/places/lumpini-park.jpg" },
      { icon: "🏮", name: "Chinatown (Yaowarat Road)", description: "Bangkok's legendary Chinatown is at its most spectacular at night when the neon signs blaze and street-food vendors line every metre of Yaowarat Road with fresh seafood and dim sum.", img: "/images/destinations/bangkok/places/chinatown-yaowarat.jpg" },
      { icon: "⛰️", name: "Golden Mount (Wat Saket)", description: "A man-made golden hilltop temple offering panoramic views over old Bangkok's rooftops. Climb 318 steps through a shaded spiral path and ring the bell at the summit for good luck.", img: "/images/destinations/bangkok/places/golden-mount-wat-saket.jpg" },
      { icon: "🛍️", name: "ICONSIAM", description: "Bangkok's most spectacular riverside shopping complex — featuring a floating market inside a mall, luxury brands, Thailand's largest food hall, and breathtaking Chao Phraya River views.", img: "/images/destinations/bangkok/places/iconsiam.jpg" },
    ],
    practicalInfo: [
      { label: "Best Time to Visit", value: "November–February (cool and dry season, 20–30°C). Peak tourist season. Avoid March–May (extreme heat up to 42°C)." },
      { label: "Language", value: "Thai is the official language. English is widely spoken at hotels, major malls, and tourist areas. Learn a few Thai words — locals appreciate the effort." },
      { label: "Weather", value: "Tropical — three seasons: hot (March–June, 35–42°C), rainy (July–October), cool/dry (November–February, 20–30°C). Humidity is high year-round." },
      { label: "Time Zone", value: "ICT (UTC+7) — Bangkok is 1 hour BEHIND the Philippines. Adjust your watch upon arrival." },
      { label: "Currency", value: "Thai Baht (THB, ฿). ₱1 ≈ ฿0.58. Street Pad Thai ฿50–80. Grab base fare ฿40–60." },
      { label: "Religion & Customs", value: "Buddhist country. Dress modestly at temples (cover shoulders and knees). Never touch a monk or hand objects directly to monks. Point feet away from Buddha images." },
    ],
    bestFood: [
      { name: "Pad Thai", desc: "Thailand's signature stir-fried rice noodle dish with egg, tofu or shrimp, bean sprouts, and crushed peanuts — flavoured with tamarind paste and fish sauce. Best eaten fresh from a street wok.", img: "/images/destinations/bangkok/food/pad-thai.jpg" },
      { name: "Tom Yum Goong", desc: "A bold, aromatic Thai hot and sour prawn soup with lemongrass, galangal, kaffir lime leaves, mushrooms, and chili. A fundamental Thai flavour profile in a single bowl.", img: "/images/destinations/bangkok/food/tom-yum-goong.jpg" },
      { name: "Som Tam (Papaya Salad)", desc: "Shredded unripe papaya pounded in a mortar with chili, lime, fish sauce, tomatoes, and dried shrimp. Fresh, spicy, sour, and completely addictive. A Bangkok street staple.", img: "/images/destinations/bangkok/food/som-tam.jpg" },
      { name: "Mango Sticky Rice", desc: "Thailand's beloved dessert — glutinous rice soaked in sweetened coconut milk, served alongside fresh ripe yellow mango. Best during April–June mango season.", img: "/images/destinations/bangkok/food/mango-sticky-rice.jpg" },
      { name: "Massaman Curry", desc: "A rich, gently spiced Thai curry with Persian and Indian influences — tender braised meat, potatoes, onions, and roasted peanuts in a creamy coconut-based sauce.", img: "/images/destinations/bangkok/food/massaman-curry.jpg" },
    ],
    photoSpots: [
      { name: "Wat Arun at Dawn from the River", desc: "Take the ฿4 cross-river ferry from Tha Tien pier at sunrise. Wat Arun's porcelain-studded tower bathed in morning gold is one of Asia's most spectacular travel photographs.", img: "/images/destinations/bangkok/photo-spots/wat-arun-at-dawn.jpg" },
      { name: "Grand Palace Golden Spires", desc: "The Prasat Phra Thep Bidon and gilded chedis of the Temple of the Emerald Buddha are best photographed in the early morning before crowds arrive and light is golden.", img: "/images/destinations/bangkok/photo-spots/grand-palace-golden-spires.jpg" },
      { name: "Asiatique at Night over Chao Phraya", desc: "The giant Ferris wheel of Asiatique reflected in the Chao Phraya River at night — best shot from the wooden jetty piers along the water's edge.", img: "/images/destinations/bangkok/photo-spots/asiatique-at-night.jpg" },
      { name: "Khao San Road Neon Lights", desc: "The neon-drenched chaos of Khao San Road after dark is uniquely Bangkok. Wide-angle street shots with tuk-tuks, food carts, and bar signs make for vivid travel photography.", img: "/images/destinations/bangkok/photo-spots/khao-san-road-neon.jpg" },
      { name: "Chatuchak Market Labyrinth", desc: "Overhead shots from the market's elevated walkways reveal the vast maze of colourful stalls. Look for the iconic green-roofed clock tower at the centre for an orientation landmark.", img: "/images/destinations/bangkok/photo-spots/chatuchak-market.jpg" },
    ],
    localTips: [
      { icon: "🚆", tip: "Use the BTS Skytrain and MRT to skip Bangkok's notorious traffic. A Rabbit Card (BTS) lets you tap in and out across all lines without buying individual tickets." },
      { icon: "📱", tip: "Grab (ride-hailing) is far more reliable than metered taxis in Bangkok. It shows the fare upfront and eliminates the risk of being overcharged by drivers." },
      { icon: "🙏", tip: "The wai — pressing palms together at chest level with a slight bow — is the standard Thai greeting. Returning a wai is polite and greatly appreciated by locals." },
      { icon: "👗", tip: "Always carry a light scarf or sarong when visiting temples. Many Bangkok temples require covered shoulders and knees — guards at the entrance will turn you away if underdressed." },
      { icon: "🌡️", tip: "Bangkok temperatures peak between March and May at up to 42°C. Explore outdoor temples in the early morning (7–9 AM) and retreat to malls or rooftop bars during midday." },
      { icon: "🍜", tip: "Yaowarat (Chinatown) is best visited after dark when the street food scene explodes. Arrive after 7 PM for fresh crab, oyster omelettes, and shark fin soup along the neon-lit road." },
    ],
    safetyTips: [
      { icon: "🛡️", tip: "Bangkok is generally safe for tourists. However, be vigilant near the Grand Palace where gem and tuk-tuk scams are common — strangers offering 'special tours' or 'lucky Buddha days' are almost always scammers." },
      { icon: "🚕", tip: "Tuk-tuk overcharging is common for tourists. Always negotiate the fare before boarding, or better yet — use Grab for transparent fixed pricing and GPS tracking." },
      { icon: "🤝", tip: "Do not accept unsolicited help from friendly strangers near major tourist sites. Offers to guide you to a gem shop, tailor, or special temple are common confidence scams." },
      { icon: "📋", tip: "Complete the Thailand TDAC (Digital Arrival Card) before your flight at tdac.immigration.go.th. Failure to complete it can cause delays at immigration." },
      { icon: "🌊", tip: "During rainy season (July–October), Bangkok streets can flood significantly. Keep footwear appropriate and avoid areas near the river during heavy rainfall." },
      { icon: "🆘", tip: "Emergency numbers: Police 191 | Ambulance/Medical 1669 | Fire 199 | Tourist Police 1155 (English-speaking officers available). Save these before leaving your hotel." },
    ],
  },

  emergencyContacts: {
    local: [
      { label: "Police", value: "191" },
      { label: "Medical Emergency / Ambulance", value: "1669" },
      { label: "Fire Department", value: "199" },
      { label: "Tourist Police Hotline", value: "1155" },
    ],
    philippineConsulate: {
      label: "Philippine Embassy Bangkok",
      value: "+66-2-259-0139 / +66-2-259-0140",
      address: "760 Sukhumvit Road, Bangkok 10110, Thailand",
    },
  },

  assistanceContacts: [
    { label: "Gladex Tours Hotline", value: "+63 917 875 2200" },
    { label: "Email", value: "support@gladextours.com" },
    { label: "Facebook", value: "m.me/gladextours" },
  ],

  dosAndDonts: {
    dos: [
      "Respect local customs and religious sites — dress modestly at all Buddhist temples.",
      "Complete the Thailand TDAC (Digital Arrival Card) online before your flight.",
      "Use the BTS Skytrain or MRT to avoid Bangkok's traffic gridlock.",
      "Carry your hotel address card in Thai script for communicating with taxi and tuk-tuk drivers.",
      "Visit the Grand Palace and Wat Pho in the early morning to avoid peak crowds and heat.",
      "Use Grab for all taxi and motorbike transport — it is safe, reliable, and shows fares upfront.",
    ],
    donts: [
      "Do not photograph restricted areas — particularly inside palaces and near royal portraits.",
      "Do not wear sleeveless tops, shorts, or mini-skirts to Buddhist temples — you will be turned away.",
      "Do not engage with gem shop touts, tuk-tuk 'free tour' offers, or Grand Palace 'closed today' scammers.",
      "Do not touch monks or hand objects directly to them — women especially should avoid direct contact.",
      "Do not point your feet towards Buddha images, monks, or Thai royalty — it is deeply offensive.",
      "Do not criticize or disrespect the Thai royal family — lèse-majesté laws carry severe criminal penalties.",
    ],
  },

  faqs: [
    { question: "Do I need a visa to enter Thailand?", answer: "Philippine passport holders are visa-free for up to 30 days in Thailand. However, you must complete the Thailand TDAC (Digital Arrival Card) online before arrival at tdac.immigration.go.th. Ensure your passport is valid for at least 6 months and carry proof of onward travel." },
    { question: "What currency should I bring?", answer: "Thai Baht (THB, ฿). Bring a mix of cash and card. Street food and markets are cash-only. Exchange at Superrich Thailand (green or orange kiosks) near BTS stations or at Suvarnabhumi Airport for competitive rates. ₱1 ≈ ฿0.58." },
    { question: "What SIM card is best for Bangkok?", answer: "Purchase an AIS, DTAC, or True Move H tourist SIM at the Suvarnabhumi Airport arrival hall. A 7–8 day unlimited data SIM costs ฿299 and provides excellent coverage throughout Bangkok and across Thailand." },
    { question: "What are the must-try foods in Bangkok?", answer: "Pad Thai, Tom Yum Goong, Som Tam (papaya salad), Mango Sticky Rice, and Massaman Curry. For street food, visit Yaowarat Road (Chinatown) at night and Khao San Road for diverse options at all hours." },
    { question: "Is Bangkok safe for tourists?", answer: "Bangkok is generally safe. The main risks are tourist scams near the Grand Palace (gem shops, tuk-tuk overcharging) and petty theft in crowded markets. Use Grab instead of tuk-tuks, do not engage with strangers offering unsolicited help, and keep valuables secured." },
  ],
};
