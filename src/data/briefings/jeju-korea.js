// @ts-nocheck
/**
 * Jeju Island, South Korea — Complete Briefing Data
 * Slug: jeju-korea
 *
 * This file is the single source of truth for the Jeju Korea briefing page.
 * Update content here only — no changes to components required.
 */

export const jejuKoreaBriefing = {
  slug: "jeju-korea",
  welcomeMessage: "Welcome to Jeju Island! This briefing covers everything you need for a smooth and memorable trip to South Korea's most beloved island destination.",

  briefingInclusions: [
    "Round-trip airfare (Manila – Incheon – Jeju)",
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
    { label: "Airlines", value: "Cebu Pacific / Philippine Airlines / Korean Air / Asiana Airlines" },
    { label: "Flight Duration", value: "~4.5 hours from Manila to Incheon (ICN), then ~1 hour domestic to Jeju (CJU)" },
    { label: "Time Zone", value: "Korea Standard Time (KST, UTC+9)" },
    { label: "Flight Route", value: "Manila (MNL) → Seoul Incheon (ICN) → Jeju (CJU)" },
    { label: "Best Time to Visit", value: "Spring (April–May) for cherry blossoms and canola flowers; Autumn (September–November) for cool weather and foliage. Summer is lush but may have typhoons." },
    { label: "Language", value: "Korean. English is understood in tourist areas, hotels, and major attractions. Jeju has its own local dialect distinct from standard Korean." },
  ],

  arrivalInstructions: [
    { step: 1, text: "Upon arrival at Seoul Incheon (ICN), proceed to the transit area for your domestic connection to Jeju (CJU). Ensure you have your connecting boarding pass." },
    { step: 2, text: "At Jeju Airport (CJU), proceed to Immigration if arriving on a direct international flight. Philippine passport holders must have a valid K-ETA before arrival." },
    { step: 3, text: "Collect your baggage at the designated carousel." },
    { step: 4, text: "Proceed to Customs and declare any applicable items." },
    { step: 5, text: "Look for your Gladex Tours representative outside the arrivals hall at Jeju International Airport." },
    { step: 6, text: "Transfer to hotel. Check-in is usually 15:00. Early check-in subject to availability." },
  ],

  transferInstructions: {
    overview: "Private transfers are arranged for arrival and departure at Jeju International Airport. Keep your voucher and hotel address readily accessible.",
    notes: [
      "Driver will be waiting at the arrivals hall with your name on a board.",
      "Inform Gladex Tours of any flight changes at least 24 hours in advance.",
      "Jeju Island is best explored by rented car or tour bus — public buses cover major attractions but schedules are infrequent.",
    ],
  },

  hotelInformation: {
    checkIn: "15:00 (3:00 PM)",
    checkOut: "11:00 (11:00 AM)",
    notes: "Early check-in and late check-out subject to availability. Hotel security deposit may be required at check-in. Store valuables in the in-room safe.",
  },

  reminders: [
    "Keep your passport and travel documents safe at all times.",
    "Always carry a copy of your hotel address in Korean for showing to taxi drivers.",
    "Stay with your group during guided tours.",
    "Be respectful of local customs — remove shoes when entering traditional Korean homes and certain restaurants.",
    "Carry small denomination won for local markets and tipping.",
    "K-ETA registration must be completed BEFORE departure — do not wait until arrival.",
    "Jeju's volcanic terrain can be uneven — wear sturdy footwear for outdoor activities.",
  ],

  immigrationAdvisory: [
    "Philippine passport holders are required to obtain a Korea Electronic Travel Authorization (K-ETA) before departure. Apply at www.k-eta.go.kr — processing takes up to 72 hours.",
    "Ensure your passport is valid for at least 6 months beyond your travel date.",
    "Fill in arrival/departure cards accurately with your hotel address in Korea.",
    "Declare all required items at Customs — South Korea strictly prohibits bringing in certain food items and agricultural products.",
    "Keep your K-ETA approval, booking reference, and hotel address accessible during immigration.",
    "Biometric fingerprint scan is required for all foreign nationals entering South Korea.",
  ],

  shoppingAdvisory: [
    "Dongmun Traditional Market is the best place for local Jeju specialties — Jeju tangerines, black pork products, and haenyeo seafood.",
    "Keep receipts for all major purchases — tax refund documentation is required for eligible purchases.",
    "Tax refunds (VAT) are available at designated stores on purchases over ₩30,000 — show your passport.",
    "Be cautious of counterfeit goods in smaller tourist shops.",
    "Bargaining is generally not practiced in South Korea — prices are fixed in most stores.",
    "Duty-free shopping is available at Jeju Airport for departing passengers.",
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
    { label: "K-ETA approval document (print or save screenshot before departure)" },
    { label: "T-money card for Jeju bus transport — purchase and load at Jeju Airport upon arrival" },
    { label: "Sturdy walking shoes with grip — Hallasan and volcanic rock trails are uneven" },
    { label: "Sunscreen and UV protection — Jeju is sunny and the sea breeze masks how strong the UV is" },
    { label: "Light waterproof jacket — Jeju weather can change quickly, especially near the coast" },
    { label: "Portable umbrella — Jeju receives significant rainfall year-round" },
    { label: "Won cash for Dongmun Market, local restaurants, and small vendors" },
  ],

  connectivityGuide: {
    overview: "South Korea has some of the world's fastest mobile internet. Tourist SIM cards are available at Jeju Airport and from online providers like Klook before departure.",
    simOptions: [
      {
        provider: "KT (Korea Telecom) / SKT",
        type: "Tourist Data SIM",
        data: "매일 unlimited (throttled after daily cap)",
        validity: "5–10 days",
        price: "₩15,000–₩25,000",
        notes: "Available at Jeju Airport arrival hall telco counters. Passport required. Excellent island-wide coverage.",
      },
      {
        provider: "Klook / Airalo eSIM",
        type: "Tourist Unlimited Data SIM / eSIM",
        data: "Unlimited (throttled after 1–2 GB/day)",
        validity: "5–10 days",
        price: "₩15,000–₩30,000 equivalent",
        notes: "Purchase Klook SIM before departure for airport pickup or use Airalo eSIM which activates on arrival. Convenient and affordable.",
      },
    ],
    wifi: "Free WiFi available at hotels, cafes, restaurants, convenience stores (CU, GS25, 7-Eleven), and most tourist attractions across Jeju. Connection is fast and reliable.",
    recommendations: "Purchase a tourist SIM at Jeju Airport for instant connectivity. KT and SKT both offer excellent 5G coverage across the island. eSIM via Airalo is recommended for compatible devices.",
  },

  currencyGuide: {
    currency: "Korean Won",
    symbol: "₩",
    code: "KRW",
    exchangeRate: "₱1 ≈ ₩24 (approximate, check current rates)",
    roughPrices: [
      { item: "Convenience store meal / snack (CU, GS25)", price: "₩3,000–₩5,000" },
      { item: "Street food / Dongmun Market snacks", price: "₩2,000–₩4,000" },
      { item: "Local restaurant meal (black pork BBQ)", price: "₩8,000–₩15,000" },
      { item: "Coffee / boba tea", price: "₩3,000–₩5,000" },
      { item: "Taxi base fare", price: "₩3,800 (first 2 km)" },
      { item: "Local beer (convenience store)", price: "₩1,500–₩2,500" },
    ],
    tips: [
      "Exchange Philippine pesos to Korean Won at authorized money changers in Manila before departure or at Incheon Airport.",
      "Notify your Philippine bank before traveling to avoid card blocks on international withdrawals.",
      "Visa/Mastercard widely accepted at hotels, malls, and restaurants. Some local markets and small eateries are cash-only.",
      "Keep small won bills for traditional markets, local stalls, and public transport fare boxes.",
      "Kakaopay and Naver Pay are popular for locals — visitors can often use these via linked Visa/Mastercard.",
      "ATMs accepting foreign cards are available at Jeju Airport and throughout the island at major banks.",
    ],
  },

  destinationGuide: {
    intro: "Jeju Island is South Korea's crown jewel — a UNESCO World Heritage volcanic island combining dramatic natural landscapes, unique cultural heritage, world-class digital art spaces, and a relaxed island lifestyle. Known as the 'Island of the Gods,' Jeju offers a completely different experience from mainland Seoul.",
    highlights: [
      {
        icon: "🌋",
        name: "Seongsan Sunrise Peak",
        description: "A UNESCO World Heritage tuff cone formed by a submarine volcanic eruption, rising dramatically from the sea. The sunrise view from the summit is one of Korea's most celebrated experiences.",
        img: "/images/destinations/jeju-korea/places/seongsan-sunrise-peak.jpg",
      },
      {
        icon: "🌊",
        name: "Seopjikoji Cliff",
        description: "A stunning coastal headland with sweeping views of Seongsan Sunrise Peak, golden canola flower fields in spring, and dramatic black volcanic rock formations along the shoreline.",
        img: "/images/destinations/jeju-korea/places/seopjikoji-cliff.jpg",
      },
      {
        icon: "🍵",
        name: "O'sulloc Tea Museum",
        description: "Korea's premier green tea destination featuring vast rolling tea fields, a beautifully designed museum, and a café serving Jeju's famous Osulloc green tea ice cream and desserts.",
        img: "/images/destinations/jeju-korea/places/osulloc-tea-museum.jpg",
      },
      {
        icon: "🌿",
        name: "Innisfree Jeju House",
        description: "The flagship Jeju experience centre of Korea's beloved nature-inspired cosmetics brand, surrounded by beautiful Jeju landscapes and a café featuring local Jeju ingredients.",
        img: "/images/destinations/jeju-korea/places/innisfree-jeju-house.jpg",
      },
      {
        icon: "🎨",
        name: "Spirited Garden",
        description: "A breathtaking bonsai garden created over 30 years by master Bunjae artist Sung Bum-young, featuring thousands of meticulously crafted trees and traditional Korean garden landscapes.",
        img: "/images/destinations/jeju-korea/places/spirited-garden.jpg",
      },
      {
        icon: "✨",
        name: "Arte Museum",
        description: "Jeju's world-renowned immersive digital art museum featuring floor-to-ceiling projection art rooms — the 'Garden of Light' infinity room is one of Korea's most Instagrammed spaces.",
        img: "/images/destinations/jeju-korea/places/arte-museum.jpg",
      },
      {
        icon: "🏎️",
        name: "9.81 Park",
        description: "Asia's first gravity racing experience — ride eco-friendly karts downhill through a scenic Jeju forest track. No engine, no fuel — purely gravity-powered fun for all ages.",
        img: "/images/destinations/jeju-korea/places/9-81-park.jpg",
      },
      {
        icon: "💧",
        name: "Jeongbang Waterfall",
        description: "One of the few waterfalls in Asia that falls directly into the sea — a spectacular 23-metre cascade on Jeju's southern coast surrounded by lush subtropical vegetation.",
        img: "/images/destinations/jeju-korea/places/jeongbang-waterfall.jpg",
      },
      {
        icon: "🌑",
        name: "Manjanggul Lava Tube",
        description: "One of the world's longest lava tubes at 13.4 km, formed by a volcanic eruption over 300,000 years ago. The 1 km accessible section features stunning lava formations.",
        img: "/images/destinations/jeju-korea/places/manjanggul-lava-tube.jpg",
      },
      {
        icon: "⛰️",
        name: "Hallasan National Park",
        description: "South Korea's highest mountain (1,950 m) and a UNESCO World Heritage site. The summit crater lake, Baengnokdam, offers breathtaking views on clear days.",
        img: "/images/destinations/jeju-korea/places/hallasan-national-park.jpg",
      },
      {
        icon: "🏖️",
        name: "Hyeopjae Beach",
        description: "Jeju's most beautiful beach, featuring crystal-clear turquoise water, white sand, and a backdrop of Hallasan Mountain — considered one of the best beaches in Korea.",
        img: "/images/destinations/jeju-korea/places/hyeopjae-beach.jpg",
      },
      {
        icon: "🛒",
        name: "Dongmun Traditional Market",
        description: "Jeju's oldest and most authentic market, bursting with local specialties — Jeju tangerines, black pork products, haenyeo-caught seafood, and traditional Korean street food.",
        img: "/images/destinations/jeju-korea/places/dongmun-traditional-market.jpg",
      },
    ],
    practicalInfo: [
      { label: "Best Time to Visit", value: "Spring (April–May) for cherry blossoms and canola flowers. Autumn (Sept–Nov) for cooler weather and foliage. Summer is lush but can be hot and typhoon-prone." },
      { label: "Language", value: "Korean (Jeju dialect is unique and different from standard Korean). English is understood at major hotels and tourist attractions." },
      { label: "Weather", value: "Subtropical island climate. Warm summers (25–33°C), mild winters (5–10°C). Rainfall year-round, especially summer. Typhoon season July–September." },
      { label: "Time Zone", value: "Korea Standard Time (KST, UTC+9) — 1 hour ahead of Philippine Standard Time (PST UTC+8)." },
      { label: "Currency", value: "Korean Won (KRW, ₩). Mix of cash and card payments — some local markets are cash-only." },
      { label: "Religion & Customs", value: "Buddhist and Confucian traditions influence daily life. Remove shoes when entering some restaurants. Respect elders and use two hands when receiving items." },
    ],
    bestFood: [
      {
        name: "Heukdwaeji (Jeju Black Pork BBQ)",
        desc: "Jeju's most famous culinary specialty — tender, flavourful black pork raised on Jeju's unique environment, grilled at the table and wrapped in lettuce with fermented kimchi and garlic.",
        img: "/images/destinations/jeju-korea/food/heukdwaeji.jpg",
      },
      {
        name: "Haenyeo Fresh Seafood",
        desc: "Seafood harvested by Jeju's legendary women divers (haenyeo) — raw abalone, sea urchin, conch, and fresh fish served at coastal restaurants. The freshest seafood you will ever taste.",
        img: "/images/destinations/jeju-korea/food/haenyeo-fresh-seafood.jpg",
      },
      {
        name: "Tteokbokki",
        desc: "Korea's beloved spicy rice cake dish — chewy cylindrical rice cakes in a fiery gochujang sauce with fish cake and boiled egg. A staple Korean street food available across Jeju.",
        img: "/images/destinations/jeju-korea/food/tteokbokki.jpg",
      },
      {
        name: "Dotori-muk (Acorn Jelly)",
        desc: "A traditional Jeju side dish made from acorn starch — firm, gelatinous jelly with a mild earthy flavour, served cold with soy sauce, sesame oil, and spring onions.",
        img: "/images/destinations/jeju-korea/food/dotori-muk.jpg",
      },
      {
        name: "Ramen (Ramyeon)",
        desc: "Korean ramyeon is spicier and bolder than Japanese ramen — instant or restaurant-style, it is a comforting staple enjoyed especially on cold Jeju evenings after a day of hiking.",
        img: "/images/destinations/jeju-korea/food/ramen.jpg",
      },
    ],
    photoSpots: [
      {
        name: "Seongsan Sunrise Peak at Sunrise",
        desc: "Arrive before dawn to witness the sunrise from the Seongsan crater rim — golden light flooding over the volcanic cliff and the sea below creates one of Korea's most iconic panoramas.",
        img: "/images/destinations/jeju-korea/photo-spots/seongsan-sunrise-peak-at-sunrise.jpg",
      },
      {
        name: "Seopjikoji Cliff Walk",
        desc: "Walk the coastal path from Seopjikoji lighthouse toward Seongsan for sweeping cliff-edge views, wildflowers, and dramatic sea vistas — especially beautiful in spring canola season.",
        img: "/images/destinations/jeju-korea/photo-spots/seopjikoji-cliff-walk.jpg",
      },
      {
        name: "O'sulloc Tea Museum Green Fields",
        desc: "The rolling green tea terraces surrounding O'sulloc are lush and photogenic year-round. The rows of manicured tea plants stretching to the horizon create a surreal, vivid landscape.",
        img: "/images/destinations/jeju-korea/photo-spots/osulloc-tea-museum-green-fields.jpg",
      },
      {
        name: "Arte Museum Infinity Room",
        desc: "The Garden of Light installation inside Arte Museum — an immersive room of floating digital flowers and light — is one of the most photographed interior spaces in all of Korea.",
        img: "/images/destinations/jeju-korea/photo-spots/arte-museum-infinity-room.jpg",
      },
      {
        name: "Jeju Stone Wall Fields (Doldam-gil)",
        desc: "Jeju's unique volcanic stone walls (doldam) frame rural roads, tangerine orchards, and coastal paths — a distinctly Jeju landscape unlike anywhere else in Korea.",
        img: "/images/destinations/jeju-korea/photo-spots/jeju-stone-wall-fields.jpg",
      },
    ],
    localTips: [
      { icon: "💡", tip: "K-ETA is required for Philippine passport holders — apply at www.k-eta.go.kr at least 72 hours before departure. Do not leave this until the last minute." },
      { icon: "💡", tip: "Purchase a T-money card at Jeju Airport and load it with ₩20,000–₩30,000 for bus travel across the island." },
      { icon: "💡", tip: "Renting a car or joining a guided tour bus is the most efficient way to explore Jeju's widely spaced attractions — public buses exist but can be slow." },
      { icon: "💡", tip: "KakaoT taxi app works in Jeju but coverage varies outside Jeju City — have your hotel address written in Korean as backup." },
      { icon: "💡", tip: "Jeju tangerines (hallabong) are the island's most famous souvenir — buy fresh ones at Dongmun Market for far less than airport shops." },
      { icon: "💡", tip: "Many museums and attractions are closed on Mondays — plan your itinerary accordingly to avoid disappointment." },
    ],
    safetyTips: [
      { icon: "🛡️", tip: "Jeju Island is very safe — it is one of South Korea's most popular domestic tourist destinations and crime rates are extremely low." },
      { icon: "🛡️", tip: "Beware of slippery volcanic rock surfaces near coastal areas and waterfalls — wear shoes with good grip and watch your step." },
      { icon: "🛡️", tip: "Jellyfish are common in Jeju waters from June to August — check local advisories before swimming at beaches." },
      { icon: "🛡️", tip: "Typhoon season runs July to September — monitor weather alerts via the Korea Meteorological Administration website or your hotel." },
      { icon: "🛡️", tip: "Apply sunscreen generously — Jeju's sea breeze makes the UV intensity less noticeable but sunburn is common among tourists." },
      { icon: "🛡️", tip: "In case of emergency, call 112 for Police and 119 for Fire and Ambulance. English-speaking operators are available at both numbers." },
    ],
  },

  emergencyContacts: {
    local: [
      { label: "Police Emergency", value: "112" },
      { label: "Medical Emergency / Ambulance", value: "119" },
      { label: "Fire Department", value: "119" },
      { label: "Korea Tourism Organization (multilingual)", value: "1330" },
    ],
    philippineConsulate: {
      label: "Philippine Consulate General in Seoul",
      value: "+82-2-721-7600",
      address: "5th–7th Floor, Diplomatic Center Building, 1376-1 Seocho-dong, Seocho-gu, Seoul, South Korea",
    },
  },

  assistanceContacts: [
    { label: "Gladex Tours Hotline", value: "+63 917 875 2200" },
    { label: "Email", value: "support@gladextours.com" },
    { label: "Facebook", value: "m.me/gladextours" },
  ],

  dosAndDonts: {
    dos: [
      "Respect local customs and dress codes at temples and traditional Korean restaurants — remove shoes when required.",
      "Apply for K-ETA well in advance (at least 72 hours) — do not attempt to travel without it.",
      "Use two hands when receiving items, business cards, or gifts from Koreans — it is a sign of respect.",
      "Keep a T-money card loaded for easy bus and convenience store payments across the island.",
      "Try the local Jeju specialties — black pork BBQ, fresh haenyeo seafood, and Osulloc green tea products.",
      "Carry your passport at all times — hotels and some tourist sites require ID for check-in and entry.",
    ],
    donts: [
      "Do not photograph restricted areas, military zones, or locals without permission.",
      "Do not litter — South Korea is extremely clean and littering carries heavy fines.",
      "Do not drink tap water in Korea — use bottled water or the filtered water dispensers available in hotels.",
      "Do not be loud or disruptive on public transport — Korean public transport etiquette values quiet and order.",
      "Do not skip K-ETA registration — attempting to board without it will result in denied boarding at the Philippine airport.",
      "Do not underestimate Hallasan hiking trails — weather changes quickly at altitude; bring layers, water, and start early.",
    ],
  },

  faqs: [
    {
      question: "Do I need a visa to enter South Korea / Jeju?",
      answer: "Philippine passport holders do not need a traditional visa but are required to obtain a Korea Electronic Travel Authorization (K-ETA) before departure. Apply at www.k-eta.go.kr — approval usually takes up to 72 hours. Without a K-ETA, you will not be allowed to board your flight.",
    },
    {
      question: "What currency should I bring?",
      answer: "Korean Won (KRW, ₩). Recommended amount: ₩100,000–₩200,000 in cash for markets, local restaurants, and small vendors. Most hotels, malls, and larger restaurants accept Visa and Mastercard. Exchange pesos to won in Manila before departure or at Incheon Airport.",
    },
    {
      question: "What's the best SIM card to get?",
      answer: "Purchase a KT or SKT tourist SIM at Jeju Airport immediately upon arrival — both offer excellent island-wide coverage. Alternatively, Klook SIM cards can be pre-ordered before departure for airport collection. eSIM via Airalo is a convenient option for compatible devices.",
    },
    {
      question: "What are the must-try foods in Jeju?",
      answer: "Jeju black pork BBQ (heukdwaeji) is the top priority — rich, flavourful, and unique to Jeju. Fresh haenyeo seafood (abalone, sea urchin) at coastal restaurants is exceptional. Osulloc green tea ice cream and Jeju hallabong tangerines make perfect snacks and souvenirs.",
    },
    {
      question: "Is it safe to travel to Jeju Island?",
      answer: "Jeju Island is extremely safe — it is one of the most popular domestic destinations in South Korea and has very low crime rates. Standard precautions apply outdoors, especially on volcanic rock trails and beaches during jellyfish season (June–August).",
    },
  ],
};
