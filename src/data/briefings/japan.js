// @ts-nocheck
/**
 * Japan (Osaka) — Complete Briefing Data
 * Slug: japan
 *
 * This file is the single source of truth for the Japan briefing page.
 * Update content here only — no changes to components required.
 */

export const japanBriefing = {
  slug: "japan",
  welcomeMessage: "Welcome to Japan! This briefing covers everything you need for a smooth and memorable trip to the Land of the Rising Sun.",

  briefingInclusions: [
    "Round-trip airfare (Manila – Osaka, Kansai International Airport)",
    "5 nights hotel accommodation",
    "Daily breakfast",
    "Airport transfers (arrival & departure)",
    "English-speaking guide / Free & Easy format",
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
    { label: "Airlines", value: "Cebu Pacific / Philippine Airlines / ANA / Japan Airlines" },
    { label: "Flight Duration", value: "~4 hours from Manila to Osaka (KIX)" },
    { label: "Time Zone", value: "Japan Standard Time (JST, UTC+9)" },
    { label: "Flight Route", value: "Manila (MNL) → Osaka (KIX)" },
    { label: "Best Time to Visit", value: "Spring (March–May) for cherry blossoms; Autumn (Oct–Nov) for fall foliage. Summer is hot and humid; Winter is cold but festive." },
    { label: "Language", value: "Japanese. English signage is widely available in tourist areas, airports, and major train stations." },
  ],

  arrivalInstructions: [
    { step: 1, text: "Proceed to Immigration — have your passport and filled arrival card ready. Philippine passport holders are granted a 15-day visa-free stay." },
    { step: 2, text: "Collect your baggage at the designated carousel." },
    { step: 3, text: "Proceed to Customs and declare any applicable items. Japan Customs is strict — declare all food items and items over ¥200,000." },
    { step: 4, text: "Look for your Gladex Tours representative outside the arrivals hall at Kansai International Airport." },
    { step: 5, text: "Transfer to hotel. Check-in is usually 14:00–15:00. Early check-in subject to availability." },
  ],

  transferInstructions: {
    overview: "Private transfers are arranged for arrival and departure at Kansai International Airport. Keep your voucher and hotel address readily accessible.",
    notes: [
      "Driver will be waiting at the arrivals hall with your name on a board.",
      "Inform Gladex Tours of any flight changes at least 24 hours in advance.",
      "JR Haruka Express also connects KIX directly to Osaka and Kyoto for independent travelers.",
    ],
  },

  hotelInformation: {
    checkIn: "15:00 (3:00 PM)",
    checkOut: "11:00 (11:00 AM)",
    notes: "Early check-in and late check-out subject to availability. Some hotels may require a credit card at check-in. Store valuables in the in-room safe.",
  },

  reminders: [
    "Keep your passport and travel documents safe at all times.",
    "Always carry a copy of your hotel address in Japanese for showing to taxi drivers.",
    "Stay with your group during guided tours.",
    "Be respectful of local customs — bow slightly when greeting, remove shoes when entering temples.",
    "Carry small denomination yen coins and notes for vending machines, shrines, and street food.",
    "Silence your mobile phone on trains and avoid talking loudly in train carriages.",
    "Trash cans are rare in Japan — carry a small bag for your litter until you find one.",
  ],

  immigrationAdvisory: [
    "Philippine passport holders may enter Japan visa-free for up to 15 days for tourism.",
    "Ensure your passport is valid for at least 6 months beyond your travel date.",
    "Fill in the arrival card accurately — declare all items as required.",
    "Japan Customs strictly prohibits bringing in certain food items, agricultural products, and controlled substances.",
    "Keep your booking reference, return ticket, and hotel address accessible during immigration.",
    "Biometric fingerprint and photo capture is required at immigration for all foreign nationals.",
  ],

  shoppingAdvisory: [
    "Shop at tax-free counters in major department stores — show your passport for a consumption tax refund (10%).",
    "Keep receipts for all major purchases — tax refund documentation is required.",
    "Authentic souvenirs and electronics are best purchased at Yodobashi Camera, BIC Camera, or Don Quijote.",
    "Be cautious of counterfeit goods in smaller tourist shops.",
    "Bargaining is generally NOT acceptable in Japan — prices are fixed.",
    "Kuromon Market and Nishiki Market are excellent for food souvenirs and local snacks.",
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
    { label: "ICOCA or Suica IC card (or purchase at KIX on arrival) for all train and bus travel" },
    { label: "Comfortable slip-on shoes — many temples and traditional restaurants require removing footwear" },
    { label: "Light jacket or layering pieces — temples and shrines can be breezy even in warm months" },
    { label: "Portable umbrella — rain is common, especially in spring and summer" },
    { label: "Small towel or handkerchief — many public restrooms lack hand dryers or paper towels" },
    { label: "Universal travel adapter — Japan uses Type A plugs (100V) — Philippine plugs fit but voltage differs" },
    { label: "Yen cash — many smaller restaurants, shrines, and local shops are cash-only" },
  ],

  connectivityGuide: {
    overview: "Japan has excellent mobile coverage. Tourist SIMs and pocket WiFi are widely available at Kansai International Airport on arrival.",
    simOptions: [
      {
        provider: "IIJmio / Maishiru",
        type: "Tourist Data SIM",
        data: "15–30 GB",
        validity: "15–30 days",
        price: "¥2,000–¥3,500",
        notes: "Available at KIX airport vending machines and convenience stores. Data only — voice calls not included on tourist SIMs.",
      },
      {
        provider: "NTT Docomo / SoftBank",
        type: "Tourist Unlimited Data SIM",
        data: "Unlimited (throttled after 3GB/day)",
        validity: "7–14 days",
        price: "¥2,500–¥4,000",
        notes: "Available at telco counters at KIX airport. Best nationwide coverage. Passport required for purchase.",
      },
    ],
    wifi: "Free WiFi available at major train stations, airports, convenience stores (7-Eleven, Lawson, FamilyMart), and most hotels. Download the 'Japan Free Wi-Fi' app before arrival.",
    recommendations: "Purchase a tourist data SIM at Kansai International Airport immediately upon arrival for the best rates and nationwide coverage. Pocket WiFi rental is a good option for groups.",
  },

  currencyGuide: {
    currency: "Japanese Yen",
    symbol: "¥",
    code: "JPY",
    exchangeRate: "₱1 ≈ ¥2.8 (approximate, check current rates)",
    roughPrices: [
      { item: "Convenience store meal / onigiri + drink", price: "¥400–¥600" },
      { item: "Street food (takoyaki, skewers)", price: "¥300–¥800" },
      { item: "Mid-range restaurant meal (ramen, set meal)", price: "¥1,200–¥2,500" },
      { item: "Coffee / canned drink from vending machine", price: "¥130–¥600" },
      { item: "Taxi base fare (Osaka)", price: "¥710 (first 1.7 km)" },
      { item: "Local beer (convenience store)", price: "¥150–¥250" },
    ],
    tips: [
      "Japan is still largely a cash society — carry yen at all times, especially for smaller restaurants, shrines, and vending machines.",
      "Exchange money at authorized money changers or 7-Eleven / Japan Post ATMs for competitive rates.",
      "Notify your Philippine bank before traveling to avoid card blocks on international withdrawals.",
      "Visa/Mastercard accepted at major department stores, hotels, and chain restaurants.",
      "IC cards (ICOCA/Suica) can be used for transport and payment at convenience stores — reload at station machines.",
      "Tax-free shopping is available at major stores on purchases over ¥5,000 — show your passport.",
    ],
  },

  destinationGuide: {
    intro: "Osaka is Japan's culinary capital and one of its most vibrant cities, perfectly positioned as a base for exploring ancient Kyoto, peaceful Nara, and the modern metropolis itself. From neon-lit entertainment districts to serene bamboo groves, Japan offers an unmatched blend of the ancient and the ultra-modern.",
    highlights: [
      {
        icon: "🏯",
        name: "Osaka Castle",
        description: "A magnificent 16th-century castle rising above the modern city skyline, surrounded by a beautiful moat and park. One of Japan's most iconic landmarks.",
        img: "/images/destinations/japan/places/osaka-castle.jpg",
      },
      {
        icon: "🌟",
        name: "Dotonbori",
        description: "Osaka's most famous entertainment and dining district, lined with enormous illuminated billboards, street food stalls, and the iconic Glico Running Man sign.",
        img: "/images/destinations/japan/places/dotonbori.jpg",
      },
      {
        icon: "🛍️",
        name: "Shinsaibashi",
        description: "Osaka's premier shopping street, a covered arcade stretching 600 metres with everything from luxury brands to affordable fashion and local boutiques.",
        img: "/images/destinations/japan/places/shinsaibashi.jpg",
      },
      {
        icon: "🐟",
        name: "Kuromon Market",
        description: "Known as 'Osaka's Kitchen,' this 170-year-old covered market offers fresh seafood, local produce, and ready-to-eat street food beloved by chefs and tourists alike.",
        img: "/images/destinations/japan/places/kuromon-market.jpg",
      },
      {
        icon: "🦌",
        name: "Nara Deer Park",
        description: "Home to over 1,200 free-roaming sacred deer and the magnificent Todai-ji Temple housing Japan's largest bronze Buddha. An unmissable half-day trip from Osaka.",
        img: "/images/destinations/japan/places/nara-deer-park.jpg",
      },
      {
        icon: "⛩️",
        name: "Fushimi Inari Shrine",
        description: "Kyoto's most iconic shrine, famous for its thousands of vermilion torii gates winding up the forested Mount Inari. A spiritual and photographic treasure.",
        img: "/images/destinations/japan/places/fushimi-inari-shrine.jpg",
      },
      {
        icon: "🎋",
        name: "Arashiyama Bamboo Grove",
        description: "One of Japan's most photographed landscapes — towering bamboo stalks lining a serene forest path on the outskirts of Kyoto.",
        img: "/images/destinations/japan/places/arashiyama-bamboo-grove.jpg",
      },
      {
        icon: "🥇",
        name: "Kinkakuji (Golden Pavilion)",
        description: "Kyoto's world-famous Zen Buddhist temple covered in gleaming gold leaf, perfectly reflected in the still waters of the surrounding pond.",
        img: "/images/destinations/japan/places/kinkakuji.jpg",
      },
      {
        icon: "🍜",
        name: "Nishiki Market",
        description: "Kyoto's 'Kitchen of Kyoto' — a narrow five-block covered market packed with 100+ specialty food vendors selling pickles, skewers, tofu, and local delicacies.",
        img: "/images/destinations/japan/places/nishiki-market.jpg",
      },
      {
        icon: "🗼",
        name: "Shinsekai",
        description: "Osaka's retro entertainment district built in the early 1900s, famous for its Tsutenkaku Tower, kushikatsu (deep-fried skewers) restaurants, and vintage atmosphere.",
        img: "/images/destinations/japan/places/shinsekai.jpg",
      },
      {
        icon: "🌊",
        name: "Osaka Bay",
        description: "Home to Kaiyukan — one of the world's largest aquariums — and the iconic Tempozan Ferris Wheel. A great area for families and evening strolls.",
        img: "/images/destinations/japan/places/osaka-bay.jpg",
      },
      {
        icon: "🏙️",
        name: "Umeda Sky Building",
        description: "Osaka's striking futuristic skyscraper with a floating garden observatory offering 360-degree panoramic views of the city, especially spectacular at night.",
        img: "/images/destinations/japan/places/umeda-sky-building.jpg",
      },
    ],
    practicalInfo: [
      { label: "Best Time to Visit", value: "Spring (March–May) for cherry blossoms; Autumn (October–November) for fall foliage. Both seasons are peak tourist periods — book early." },
      { label: "Language", value: "Japanese. English signage is common at major tourist sites, train stations, and airports." },
      { label: "Weather", value: "Four distinct seasons. Summer (Jun–Aug) is hot and humid (30–35°C). Winter (Dec–Feb) is cold (2–10°C). Spring and Autumn are mild and pleasant." },
      { label: "Time Zone", value: "Japan Standard Time (JST, UTC+9) — 1 hour ahead of Philippine Standard Time (PST UTC+8)." },
      { label: "Currency", value: "Japanese Yen (JPY, ¥). Japan is still largely cash-based — always carry yen." },
      { label: "Religion & Customs", value: "Shinto and Buddhism. Bow slightly when greeting. Remove shoes at temples and traditional restaurants. Avoid loud talking on trains." },
    ],
    bestFood: [
      {
        name: "Takoyaki",
        desc: "Osaka's signature street food — crispy-on-the-outside, gooey-on-the-inside octopus balls topped with bonito flakes, mayo, and takoyaki sauce. A must-eat in Dotonbori.",
        img: "/images/destinations/japan/food/takoyaki.jpg",
      },
      {
        name: "Ramen",
        desc: "Rich, soul-warming noodle soup available in regional styles — Tonkotsu (pork bone broth), Shoyu (soy), Miso, and Shio. Each ramen shop has its own secret recipe.",
        img: "/images/destinations/japan/food/ramen.jpg",
      },
      {
        name: "Okonomiyaki",
        desc: "Osaka's beloved savoury pancake made with cabbage, egg, flour, and your choice of toppings (pork, seafood, cheese), grilled on a teppan and drizzled with sauce and mayo.",
        img: "/images/destinations/japan/food/okonomiyaki.jpg",
      },
      {
        name: "Sushi",
        desc: "Fresh, expertly prepared sushi is everywhere in Japan — from affordable kaiten (conveyor belt) sushi restaurants to high-end omakase counters. Freshness is unmatched.",
        img: "/images/destinations/japan/food/sushi.jpg",
      },
      {
        name: "Gyoza",
        desc: "Pan-fried Japanese dumplings with crispy bottoms and juicy pork-and-cabbage filling. Best enjoyed with a cold Asahi or Sapporo beer after a day of sightseeing.",
        img: "/images/destinations/japan/food/gyoza.jpg",
      },
    ],
    photoSpots: [
      {
        name: "Dotonbori at Night",
        desc: "The neon-lit Dotonbori canal at night is one of Japan's most iconic photo spots — catch the Glico Running Man sign and its colourful reflections in the water below.",
        img: "/images/destinations/japan/photo-spots/dotonbori-at-night.jpg",
      },
      {
        name: "Fushimi Inari Torii Gates",
        desc: "Walk through thousands of vermilion torii gates at dawn or early morning for dramatic corridor shots before the crowds arrive. Head higher up the mountain for fewer tourists.",
        img: "/images/destinations/japan/photo-spots/fushimi-inari-torii-gates.jpg",
      },
      {
        name: "Arashiyama Bamboo Grove",
        desc: "The towering bamboo path in Arashiyama is magical in morning light. Arrive before 8 AM for quiet, ethereal shots of the swaying green canopy.",
        img: "/images/destinations/japan/photo-spots/arashiyama-bamboo-grove.jpg",
      },
      {
        name: "Osaka Castle Grounds",
        desc: "The castle against cherry blossoms in spring or vivid autumn foliage makes for stunning photography. The surrounding moat and stone walls add powerful foreground elements.",
        img: "/images/destinations/japan/photo-spots/osaka-castle-grounds.jpg",
      },
      {
        name: "Nara Deer Park",
        desc: "Candid moments with freely roaming deer against the backdrop of Todai-ji Temple make for unforgettable, whimsical travel photography.",
        img: "/images/destinations/japan/photo-spots/nara-deer-park.jpg",
      },
    ],
    localTips: [
      { icon: "💡", tip: "Get an ICOCA or Suica IC card immediately upon arrival at KIX — it works on all trains, subways, buses, and even at convenience stores across Japan." },
      { icon: "💡", tip: "On escalators, stand on the left side in Osaka (right in Tokyo) and keep the right side clear for people walking. This is strictly observed." },
      { icon: "💡", tip: "Do not eat or drink while walking in Japan — it is considered rude. Find a bench or eat at the stall where you purchased the food." },
      { icon: "💡", tip: "Vending machines are everywhere — hot and cold drinks, snacks, and even full meals. They are cheap, reliable, and open 24/7." },
      { icon: "💡", tip: "Convenience stores (7-Eleven, Lawson, FamilyMart) are incredibly useful in Japan — they sell quality meals, ATMs that accept foreign cards, and basic supplies." },
      { icon: "💡", tip: "Most restaurants have plastic food displays in the window or photo menus — point and order confidently even without Japanese language skills." },
    ],
    safetyTips: [
      { icon: "🛡️", tip: "Japan is one of the world's safest countries — violent crime is extremely rare. You can feel comfortable walking at night in most areas." },
      { icon: "🛡️", tip: "Keep belongings secure in crowded tourist areas like Dotonbori and busy train stations during peak hours." },
      { icon: "🛡️", tip: "In case of emergency, call 110 for Police and 119 for Fire and Ambulance. English-speaking operators are available." },
      { icon: "🛡️", tip: "Japan is an earthquake-prone country — familiarise yourself with your hotel's emergency exit and evacuation procedures upon check-in." },
      { icon: "🛡️", tip: "Typhoon season runs from June to October. Monitor weather alerts via the Japan Meteorological Agency app or your hotel's front desk." },
      { icon: "🛡️", tip: "Japanese tap water is completely safe to drink — it is some of the cleanest in the world. Use tap water freely to stay hydrated." },
    ],
  },

  emergencyContacts: {
    local: [
      { label: "Police Emergency", value: "110" },
      { label: "Medical Emergency / Ambulance", value: "119" },
      { label: "Fire Department", value: "119" },
      { label: "Japan Tourism Agency Hotline (multilingual)", value: "050-3816-2787" },
    ],
    philippineConsulate: {
      label: "Philippine Embassy in Japan",
      value: "+81-3-5562-1600",
      address: "5-15-5 Roppongi, Minato-ku, Tokyo, Japan 106-8537",
    },
  },

  assistanceContacts: [
    { label: "Gladex Tours Hotline", value: "+63 917 875 2200" },
    { label: "Email", value: "support@gladextours.com" },
    { label: "Facebook", value: "m.me/gladextours" },
  ],

  dosAndDonts: {
    dos: [
      "Respect local customs and dress codes — remove shoes when entering temples, traditional ryokans, and indicated restaurants.",
      "Bow slightly when greeting locals, hotel staff, and shop attendants — a small nod goes a long way.",
      "Carry yen cash at all times — many restaurants, shrines, and markets are cash-only.",
      "Use your ICOCA/Suica IC card for all train and bus travel — it saves time and is cheaper than buying individual tickets.",
      "Stand on the left side of escalators in Osaka and keep the right lane clear for those in a hurry.",
      "Dispose of rubbish properly — Japan has very few public bins; carry a small bag for litter.",
    ],
    donts: [
      "Do not photograph restricted areas, military zones, or locals without permission.",
      "Do not eat or drink while walking on the street — it is considered impolite in Japan.",
      "Do not talk loudly or make phone calls on trains and subways — maintain quiet etiquette.",
      "Do not tip in restaurants, taxis, or hotels — tipping is not customary in Japan and can cause confusion or offence.",
      "Do not bring food into Japan that is prohibited — Japan Customs is strict about agricultural products.",
      "Do not stick chopsticks upright in rice or pass food from chopstick to chopstick — both are funeral customs and considered very disrespectful.",
    ],
  },

  faqs: [
    {
      question: "Do I need a visa to enter Japan?",
      answer: "Philippine passport holders can enter Japan visa-free for up to 15 days for tourism. Simply present your passport, return ticket, and hotel booking at immigration. No pre-application is required.",
    },
    {
      question: "What currency should I bring?",
      answer: "Japanese Yen (JPY, ¥). Japan is still largely cash-based — many smaller restaurants, local shops, shrines, and vending machines only accept cash. Recommended amount: ¥30,000–¥50,000 for a 5-day trip depending on shopping and dining preferences.",
    },
    {
      question: "What's the best SIM card to get?",
      answer: "Purchase a tourist data SIM at Kansai International Airport on arrival — IIJmio, Maishiru, and NTT Docomo counters are available. Note that tourist SIMs are data-only; voice calls require a different plan. Pocket WiFi rental is a good option for groups.",
    },
    {
      question: "What are the must-try foods?",
      answer: "In Osaka: takoyaki, okonomiyaki, kushikatsu, and fresh seafood at Kuromon Market. In Kyoto: kaiseki set meals, matcha sweets, and Nishiki Market snacks. Ramen, sushi, and gyoza are excellent everywhere in Japan.",
    },
    {
      question: "Is it safe to travel to Japan?",
      answer: "Japan consistently ranks as one of the safest countries in the world. Violent crime is extremely rare. You can comfortably walk at night in most areas. Standard precautions apply — keep belongings secure in crowded tourist zones.",
    },
  ],
};
