/**
 * Da Nang Vietnam — Complete Briefing Data
 * Package: GDX-UOV15B2 | 5D4N Da Nang 2026
 *
 * This file is the single source of truth for the Da Nang briefing page.
 * Update content here only — no changes to components required.
 */

export const danangBriefing = {

  // ─── 1. WELCOME MESSAGE ──────────────────────────────────────────────────
  welcomeMessage: {
    title: "Official Da Nang Briefing",
    subtitle: "5D3N Da Nang, Vietnam — 2026",
    packageCode: "GDX-UOV15B2",
    body: [
      "Welcome and congratulations on your upcoming trip to Da Nang, Vietnam with Gladex Tours!",
      "This page contains your complete travel briefing — the same information covered in our pre-departure orientation sessions. Please read every section carefully and keep this page bookmarked for easy reference before and during your trip.",
      "If you have questions after reviewing this briefing, contact our team via Messenger, WhatsApp, or our hotline. We are here to help. Safe travels!",
    ],
  },

  // ─── 2. PACKAGE INCLUSIONS ───────────────────────────────────────────────
  // Key name matches the component override: briefing?.briefingInclusions
  briefingInclusions: [
    "Round trip airfare via VietJet Air (VJ)",
    "Hotel accommodation with daily breakfast",
    "Meals as listed in the itinerary",
    "Roundtrip airport transfers (airport–hotel–airport)",
    "Use of amenities at the hotel",
    "Sightseeing tours as specified in the itinerary, including required entrance tickets",
    "Air-conditioned tour bus — one seat per person guaranteed",
    "English-speaking tour guide and driver",
    "Tipping fee (already included — no additional tip required for guide/driver)",
    "Airport tax",
    "Baggage allowance: 20 kg check-in luggage + 7 kg carry-on",
  ],

  // ─── 3. PACKAGE EXCLUSIONS ───────────────────────────────────────────────
  // Key name matches the component override: briefing?.briefingExclusions
  briefingExclusions: [
    "Extra baggage allowance beyond the included 20 kg check-in + 7 kg carry-on",
    "Travel insurance — EXCEPT for passengers who have already paid",
    "Philippine travel tax (PH Travel Tax) — EXCEPT for passengers who have already paid",
    "Single supplement — EXCEPT for passengers who have already paid",
    "Vietnam e-Visa fee — EXCEPT for passengers who have already paid",
    "Personal expenses: optional tours, souvenir shopping, snacks, beverages outside meals",
    "Any items or services not explicitly listed in the inclusions above",
  ],

  // ─── 4. DAILY ITINERARY ──────────────────────────────────────────────────
  // Shape: { day, title, activities[], galleryImages[] }
  // galleryImages: add image paths here, e.g. "/images/briefings/danang/day1/photo1.jpg"
  itinerary: [
    {
      day: 1,
      title: "Manila to Da Nang — Son Tra Peninsula · Canaan Island · Hoi An",
      activities: [
        "Depart from Manila via VietJet Air and fly to Da Nang International Airport.",
        "Upon arrival, meet and greet with your Gladex tour guide at the arrival hall.",
        "First stop: Son Tra Peninsula — admire the iconic Lady Buddha statue overlooking the South China Sea.",
        "Next: Canaan Island — enjoy a relaxing visit including a fun coconut boat ride experience.",
        "Afternoon: Explore the beautiful and historic Hoi An Ancient Town — a UNESCO World Heritage Site.",
        "Dinner at a group restaurant, then transfer to the hotel and check in.",
        "Overnight stay in Da Nang.",
      ],
      galleryImages: [
        // "/images/briefings/danang/day1/photo1.jpg",
        // "/images/briefings/danang/day1/photo2.jpg",
      ],
    },
    {
      day: 2,
      title: "Ba Na Hills — Golden Bridge · French Village · Cable Car",
      activities: [
        "After breakfast, prepare for one of the highlights of the trip.",
        "Full-day visit to Ba Na Hills — experience the world-renowned cable car ride to the summit at 1,487 m.",
        "Walk the iconic Golden Bridge (Cầu Vàng) — held by giant stone hands, Vietnam's most photographed landmark.",
        "Explore the stunning French-inspired architecture and the Fantasy Park amusement area.",
        "Enjoy breathtaking panoramic mountain and coastal views from the summit.",
        "Quick stop at a local mini supermarket for personal shopping on the way back.",
        "Dinner, then transfer back to the hotel for overnight stay.",
      ],
      galleryImages: [
        // "/images/briefings/danang/day2/photo1.jpg",
        // "/images/briefings/danang/day2/photo2.jpg",
      ],
    },
    {
      day: 3,
      title: "Da Nang City Tour — Dragon Bridge · Love Bridge · APEC Park · Pink Church (B/X/X)",
      activities: [
        "After breakfast, continue exploring the city of Da Nang.",
        "Visit a local latex shop before heading into the city centre.",
        "See the iconic Dragon Bridge (Cầu Rồng) spanning the Han River.",
        "Stroll the romantic Love Bridge — a scenic riverside attraction popular for photos and evening walks.",
        "Visit the peaceful APEC Park along the Han River waterfront.",
        "Stop at Da Nang Cathedral, known as the Pink Church — one of the city's most recognizable landmarks.",
        "Shopping stop for local souvenirs and specialty finds.",
        "Dinner, then transfer back to the hotel for overnight stay.",
      ],
      galleryImages: [
        // "/images/briefings/danang/day3/photo1.jpg",
        // "/images/briefings/danang/day3/photo2.jpg",
      ],
    },
    {
      day: 4,
      title: "Free Time · Hai Van Pass · Lang Co Beach · Jewelry Stop",
      activities: [
        "After breakfast, enjoy free time before the morning activities.",
        "Visit local treasure shops and experience authentic Vietnamese coffee and bánh mì (Vietnamese bread).",
        "Scenic drive through the legendary Hai Van Pass (Đèo Hải Vân) — one of Vietnam's most spectacular coastal mountain roads.",
        "Stop at Lang Co Beach — a beautiful white-sand coastal stretch with stunning ocean views, known as the 'Bali Gallery' road.",
        "Last-minute shopping stop at a jewelry boutique.",
        "Transfer back to Da Nang. Dinner and overnight stay at the hotel.",
      ],
      galleryImages: [
        // "/images/briefings/danang/day4/photo1.jpg",
        // "/images/briefings/danang/day4/photo2.jpg",
      ],
    },
    {
      day: 5,
      title: "Da Nang to Manila — Departure Day",
      activities: [
        "After breakfast, check out of the hotel.",
        "Final transfer to Da Nang International Airport.",
        "Complete airport check-in and immigration procedures for your return flight.",
        "Board VietJet Air flight back to Manila.",
        "Arrive in Manila with unforgettable memories from Vietnam.",
      ],
      galleryImages: [
        // "/images/briefings/danang/day5/photo1.jpg",
      ],
    },
  ],

  // ─── 5. TRAVEL INFORMATION CENTER ────────────────────────────────────────
  travelInformation: {
    beforeDeparture: [
      "Secure your Vietnam e-Visa at least 7 days before departure at evisa.xuatnhapcanh.gov.vn.",
      "Complete your eTravel Philippines registration at etravel.gov.ph — required by Philippine immigration for all international departures.",
      "Submit your Vietnam Pre-Arrival Information online as instructed by our team.",
      "Arrive at the departure airport at least 4–5 hours before your scheduled international flight.",
      "Ensure your passport is valid for at least 6 months beyond your travel return date.",
      "Confirm your compulsory travel insurance documents are received and saved.",
      "Download offline maps of Da Nang and Hoi An on Google Maps before you leave.",
      "Inform your bank about your travel dates to prevent international card blocks.",
      "Prepare approximately USD 300 for personal expenses, optional purchases, and leisure spending during the 5-day trip.",
      "Online check-in is NOT available for this package — this is a group/chartered flight booking. All passengers must check in at the airport counter on departure day.",
    ],
    uponArrival: [
      "Proceed to the Immigration counter at Da Nang International Airport.",
      "Present your passport and printed Vietnam e-Visa approval letter.",
      "Fill in any required arrival card provided on the aircraft or at the counter.",
      "Claim your baggage at the designated carousel after immigration clearance.",
      "Exit to the Arrival Hall and look for your Gladex Tours meet-and-greet signage.",
      "Do NOT accept assistance from unauthorized porters or taxi drivers in the arrival hall.",
    ],
  },

  // ─── 6. ARRIVAL INSTRUCTIONS ─────────────────────────────────────────────
  arrivalInstructions: [
    {
      icon: "🇵🇭",
      step: "Philippine Departure Procedure",
      details: [
        "Arrive at the airport at least 4–5 hours before your international flight departure time.",
        "Proceed to the airline check-in counter — have your passport and booking reference ready.",
        "After check-in, proceed to the Bureau of Immigration (BI) departure hall.",
        "At BI: Present your passport, boarding pass, and round-trip ticket.",
        "Show your eTravel QR code (printed or on your phone) when requested.",
        "Proceed through security screening to your boarding gate and wait for the boarding announcement.",
      ],
    },
    {
      icon: "🇻🇳",
      step: "Arrival at Da Nang International Airport",
      details: [
        "Proceed to the Immigration counter immediately after disembarkation.",
        "Fill in the arrival/departure card provided on the aircraft or at the counter (if required).",
        "Present to the Immigration Officer: Passport + printed Vietnam e-Visa approval letter.",
        "After immigration clearance, proceed to the baggage carousel to claim your checked luggage.",
        "Exit to the Arrival Hall — look for your Gladex Tours representative holding a sign.",
        "Do NOT accept offers from unauthorized taxi operators, porters, or travel agents.",
        "Contact your tour guide immediately if you cannot locate the Gladex meet-and-greet point.",
      ],
    },
    {
      icon: "🛂",
      step: "For E-Visa Holders — Immigration Procedure",
      details: [
        "Before reaching the main immigration queue, look for an Immigration Officer holding a paper with your name.",
        "Submit your printed LOA (Letter of Approval), original passport, and two (2) pcs. 2×2 photos with white background.",
        "Visa stamping usually takes approximately 5–10 minutes.",
        "After stamping, proceed to the standard immigration clearance counter.",
        "Claim your luggage at the baggage carousel, then meet the tour guide at the exit.",
      ],
    },
  ],

  // ─── 7. TRANSFER INSTRUCTIONS ────────────────────────────────────────────
  transferInstructions: [
    "Private van transfer from Da Nang Airport to your hotel is included in the package.",
    "Transfer time is approximately 15–20 minutes depending on traffic conditions.",
    "All group luggage will be loaded by your guide — do not accept help from strangers outside the airport.",
    "Keep your hand carry and valuables (passport, phone, wallet) with you inside the vehicle at all times.",
    "If your hotel room is not ready upon early arrival, the hotel will securely store your luggage at the front desk.",
    "Departure day: your airport transfer is also included — confirm the pick-up time with your guide the evening before.",
  ],

  // ─── 8. HOTEL CHECK-IN INFORMATION ───────────────────────────────────────
  hotelInformation: {
    checkIn: "2:00 PM (Standard) — early check-in is subject to room availability",
    checkOut: "12:00 Noon (Standard) — late check-out is subject to additional charges",
    hotels: [
      { category: "Superior 3★", name: "Satya Danang Hotel or similar" },
      { category: "Deluxe 4★", name: "Stellar Maris Hotel or similar" },
    ],
    policies: [
      "A room key or keycard is required for elevator access in most Da Nang hotels.",
      "Store your passport, cash, and valuables in the in-room safe when not in use.",
      "Minibar, room service, laundry, and telephone charges are personal expenses — NOT included.",
      "Report any room issues (AC, hot water, cleanliness) immediately to the front desk.",
      "Smoking is prohibited in all hotel rooms — use designated smoking areas only.",
      "Connecting or switching rooms requires prior approval from your tour guide and hotel.",
    ],
  },

  // ─── 9. TOUR REMINDERS ───────────────────────────────────────────────────
  reminders: [
    { icon: "⏰", text: "Be at the hotel lobby 15 minutes before the scheduled departure time each morning." },
    { icon: "🍳", text: "Breakfast is served from 7:00–8:00 AM. The group departs shortly after — do not be late." },
    { icon: "🪑", text: "At buffet meals, sit with your group. Do not request separate tables or switch seats without guide permission." },
    { icon: "🚫", text: "Unauthorized personal shopping during official tour stops delays the entire group and is not permitted." },
    { icon: "🌂", text: "Bring an umbrella or rain jacket daily — Da Nang weather is tropical and unpredictable." },
    { icon: "☀️", text: "Apply sunscreen every morning before going out — UV index in Vietnam is very high year-round." },
    { icon: "💧", text: "Drink sealed bottled water only throughout your trip. Tap water is NOT safe to drink in Vietnam." },
    { icon: "💊", text: "Inform your guide of any medical conditions, allergies, or dietary restrictions before Day 1." },
    { icon: "📱", text: "Download WhatsApp and activate your eSIM or local SIM before departure for easy communication with the guide and Gladex team." },
    { icon: "📸", text: "Respect photo restrictions at temples, government buildings, and any site marked as prohibited." },
    { icon: "⚠️", text: "The group departs at the scheduled time. Travelers who leave the group without permission are subject to penalties — see Group Departure Policy." },
    { icon: "🧴", text: "Ba Na Hills altitude reaches 1,487 m — bring a light jacket as it is noticeably cooler at the summit." },
  ],

  // ─── 10. SHOPPING STOP ADVISORY ──────────────────────────────────────────
  shoppingAdvisory: {
    title: "Shopping Stop Advisory",
    warningLabel: "IMPORTANT NOTICE",
    body: "Shopping stops at designated stores (latex shop, jewelry shop, treasure shops, souvenir stores) are an official part of the group tour itinerary. Participation is required as a group; however, purchasing is entirely voluntary. Please expect possible long shop visits due to product presentations and potential delays.",
    rules: [
      "There is NO OBLIGATION to purchase anything at shopping stops.",
      "All purchases are voluntary — you will never be pressured by the guide or store staff.",
      "PERSONAL TRANSACTIONS on behalf of friends, family, or acquaintances are STRICTLY PROHIBITED.",
      "Do not purchase items, carry packages, or handle goods for other people — even as a favor.",
      "Do not accept cash or items from others to bring home as undeclared goods.",
      "Violations may result in detention by Philippine Bureau of Customs or Bureau of Immigration upon return.",
    ],
    penaltyNote: "⚠️ Passengers caught engaging in prohibited personal transactions bear full personal legal and financial responsibility under Philippine customs and immigration regulations. Gladex Tours will not intervene in individual violations.",
  },

  // ─── 11. GROUP DEPARTURE POLICY ──────────────────────────────────────────
  groupDeparturePolicy: {
    title: "Group Departure Policy",
    intro: "All passengers are required to stay with the group during all scheduled tour hours. Leaving the group without prior permission from the local operator is not allowed and is subject to the following penalties:",
    penalties: [
      {
        label: "Day 1 — Upon Arrival in Da Nang",
        amount: "USD 200 per person",
        description: "Any passenger who leaves the group without permission on the first day upon arrival in Da Nang.",
      },
      {
        label: "Last Day — In Da Nang",
        amount: "USD 100 per person",
        description: "Any passenger who leaves the group without permission on the final day in Da Nang.",
      },
    ],
    notes: [
      "Gladex Tours will not be responsible for any passenger who leaves the group without permission.",
      "In cases where a passenger abandons the group, the matter may be reported to border authorities or local police if necessary.",
      "The itinerary flow may change depending on the actual tour situation, weather, or operational requirements.",
    ],
  },

  // ─── 12. TRAVEL READINESS CHECKLIST ──────────────────────────────────────
  checklist: [
    { id: "passport",     icon: "🛂", label: "Valid ID / Passport" },
    { id: "voucher",      icon: "📄", label: "Travel Voucher" },
    { id: "ticket",       icon: "✈️", label: "Flight Ticket" },
    { id: "hotel_voucher",icon: "🏨", label: "Hotel Voucher" },
    { id: "cash",         icon: "💵", label: "Cash" },
    { id: "powerbank",    icon: "🔋", label: "Powerbank" },
    { id: "mobile_data",  icon: "📶", label: "Mobile Data" },
    { id: "chargers",     icon: "🔌", label: "Chargers" },
    { id: "medicines",    icon: "💊", label: "Medicines" },
    { id: "sunscreen",    icon: "🌞", label: "Sunscreen" },
    { id: "clothing",     icon: "👗", label: "Appropriate Clothing" },
  ],

  // ─── 13. WHAT TO BRING ───────────────────────────────────────────────────
  whatToBring: [
    { icon: "👟", label: "Comfortable walking shoes (expect 3–5 km of walking daily)" },
    { icon: "👕", label: "Light, breathable clothing (4–5 sets for 5 days)" },
    { icon: "🧥", label: "Light jacket or cardigan (Ba Na Hills summit is noticeably cold)" },
    { icon: "🌂", label: "Compact umbrella or rain jacket" },
    { icon: "🧴", label: "Sunscreen SPF 50+ (apply daily)" },
    { icon: "🪲", label: "Insect repellent (especially for Hoi An outdoor areas)" },
    { icon: "💊", label: "Personal medication (and any prescription documents)" },
    { icon: "💴", label: "Cash: approx. USD 300 and/or Vietnamese Dong (VND)" },
    { icon: "🔌", label: "Universal power adapter (Vietnam uses Type A/C/F outlets, 220V)" },
    { icon: "🔋", label: "Portable charger / power bank (for full-day tours)" },
    { icon: "📄", label: "Original passport (required at hotels and immigration)" },
    { icon: "🖨️", label: "Printed Vietnam e-Visa approval letter (+ LOA if applicable)" },
    { icon: "📱", label: "eTravel QR code (printed or screenshot on phone)" },
    { icon: "📸", label: "2 pcs. 2×2 passport-sized photos with white background (for e-Visa holders)" },
    { icon: "🎒", label: "Small daypack for tour days" },
    { icon: "💧", label: "Reusable water bottle (refill from hotel's filtered water station)" },
  ],

  // ─── 14. OUTFIT GUIDE ────────────────────────────────────────────────────
  outfitGuide: [
    {
      occasion: "Airport & Travel Days",
      icon: "✈️",
      tips: [
        "Comfortable, loose-fitting clothing for long flights and layovers.",
        "Easy-to-remove shoes for airport security.",
        "Light layer or cardigan — airline cabin temperatures can be cold.",
        "Avoid tight jeans or formal wear for comfort during transit.",
      ],
    },
    {
      occasion: "Ba Na Hills (Day 2)",
      icon: "🌁",
      tips: [
        "Light jacket or hoodie — the summit at 1,487 m is noticeably cooler than the city.",
        "Comfortable walking shoes with grip — the terrain involves stairs and uneven surfaces.",
        "Avoid flip-flops or sandals — not suitable for the cable car platform and hill paths.",
        "Layer up: you can remove the jacket once you warm up from walking.",
      ],
    },
    {
      occasion: "Hoi An Ancient Town (Day 1)",
      icon: "🏮",
      tips: [
        "Casual, comfortable clothing in light, breathable fabric.",
        "Modest attire — cover shoulders and knees when entering any temple or pagoda.",
        "Comfortable footwear — expect significant walking on cobblestone streets.",
        "Light colours look great in photos against the lantern-lit backdrop.",
      ],
    },
    {
      occasion: "Da Nang City Tour (Day 3)",
      icon: "🌆",
      tips: [
        "Light and breathable clothing — city tours are mostly outdoors in heat.",
        "Comfortable walking shoes.",
        "Bring a small bag for shopping stops (latex shop, souvenir stores).",
        "Hat or cap for sun protection during outdoor stops.",
      ],
    },
    {
      occasion: "Hai Van Pass & Lang Co Beach (Day 4)",
      icon: "🌊",
      tips: [
        "Casual clothing suitable for scenic outdoor stops and photography.",
        "Comfortable footwear — you may walk on the pass viewing area and beach.",
        "Light jacket if you are sensitive to wind on the mountain road.",
        "Sunglasses and hat recommended for the beachside stop.",
      ],
    },
    {
      occasion: "Evening Activities",
      icon: "🌙",
      tips: [
        "Smart-casual attire works for most Da Nang restaurants and evening areas.",
        "Comfortable footwear for after-dinner walks near Dragon Bridge or Love Bridge.",
        "Light layer for cooler evenings by the river.",
      ],
    },
  ],

  // ─── 15. CONNECTIVITY GUIDE ──────────────────────────────────────────────
  connectivityGuide: {
    intro: "Vietnam has reliable mobile data and free WiFi at most hotels. Here are the best ways to stay connected during your Da Nang trip.",
    options: [
      {
        title: "Vietnam Tourist SIM Card",
        icon: "📶",
        recommended: true,
        description: "Purchase at the Da Nang Airport Arrivals Hall (after customs). Best value and coverage.",
        providers: [
          { name: "Viettel", note: "Best nationwide coverage — recommended" },
          { name: "Mobifone", note: "Good speeds in city areas" },
          { name: "Vietnamobile", note: "Budget option" },
        ],
        cost: "Approx. VND 100,000–200,000 (PHP 250–500) for 7–10 days with data included",
      },
      {
        title: "International Roaming",
        icon: "🌐",
        recommended: false,
        description: "Activate international roaming with your Philippine network before departure. Check your provider's promo.",
        providers: [
          { name: "Globe", note: "GoRoam Pass — check the Globe app" },
          { name: "Smart", note: "International Roam Pass — check Smart app" },
          { name: "DITO", note: "International roaming available — confirm rates" },
        ],
        cost: "Varies by provider. Confirm rates before leaving the Philippines.",
      },
      {
        title: "Hotel WiFi",
        icon: "🏨",
        recommended: false,
        description: "All included hotels provide complimentary WiFi. Request the password at the front desk.",
        cost: "Free — included with your accommodation",
      },
      {
        title: "Offline Maps (Recommended Before Departure)",
        icon: "🗺️",
        recommended: true,
        description: "Download offline maps before you leave. Some tour locations have limited signal.",
        steps: [
          "Open Google Maps → Search 'Da Nang' → Tap the three-dot menu → Download offline map",
          "Also download: 'Hoi An' (for Day 1 ancient town tour)",
          "Alternative app: MAPS.ME — fully offline navigation, no data needed",
        ],
        cost: "Free",
      },
    ],
    tips: [
      "Download WhatsApp before departure — your guide and Gladex team will communicate via WhatsApp.",
      "Keep your phone charged — bring a power bank for full-day tours.",
      "Ba Na Hills cable car area has limited mobile signal — save your maps before going up.",
      "WhatsApp, Messenger, Viber, and all social apps work normally in Vietnam.",
      "Vietnam does NOT block major apps or social media platforms.",
    ],
  },

  // ─── 16. CURRENCY GUIDE ──────────────────────────────────────────────────
  currencyGuide: {
    currency: "Vietnamese Dong (VND)",
    symbol: "₫",
    exchangeRate: "Approximately PHP 1 = 430–470 VND (rate varies daily — check before exchanging)",
    usdNote: "USD is widely accepted at hotels, tourist shops, and major restaurants in Da Nang and Hoi An. Carrying a mix of USD and VND is recommended.",
    recommendedCash: "Prepare approximately USD 300 for personal expenses, souvenir shopping, leisure spending, and optional purchases during the 5-day trip.",
    whereToExchange: [
      { place: "Da Nang Airport", note: "Convenient upon arrival but rates may be slightly lower than the city" },
      { place: "Authorized Banks (Vietcombank, Techcombank)", note: "Best rates — bring your passport for identification" },
      { place: "Hotel Front Desk", note: "Convenient for small amounts but usually lower rates" },
      { place: "Hoi An Ancient Town money changers", note: "Competitive rates — exchange in small amounts and count carefully" },
    ],
    tips: [
      "Always count your money immediately after exchanging — do it in front of the teller.",
      "Do NOT exchange money with street vendors or unauthorized changers.",
      "Keep small VND bills (VND 20,000–100,000) for local purchases, transport, and personal tips.",
      "Credit cards are accepted at major malls, hotel restaurants, and tourist shops.",
      "Notify your Philippine bank of your travel dates to avoid international transaction blocks.",
      "Tipping for your tour guide and driver is already included in the package. Tipping at restaurants or for other personal services is optional and at your discretion.",
    ],
    roughPrices: [
      { item: "Sealed water bottle (convenience store)", price: "VND 10,000–15,000 ≈ PHP 25–35" },
      { item: "Bánh mì (local sandwich)", price: "VND 25,000–40,000 ≈ PHP 60–95" },
      { item: "Vietnamese coffee (cà phê sữa đá)", price: "VND 30,000–60,000 ≈ PHP 70–140" },
      { item: "Souvenir T-shirt in Hoi An", price: "VND 80,000–150,000 ≈ PHP 190–350" },
      { item: "Short Grab taxi ride", price: "VND 50,000–100,000 ≈ PHP 120–240" },
      { item: "Lantern (Hoi An souvenir)", price: "VND 30,000–80,000 ≈ PHP 70–190" },
    ],
  },

  // ─── 17. DESTINATION GUIDE ───────────────────────────────────────────────
  destinationGuide: {
    intro: "Da Nang is a vibrant coastal city in Central Vietnam — famous for its golden beaches, ancient cultural heritage, and the world-renowned Golden Bridge.",
    highlights: [
      {
        icon: "🌉",
        name: "Golden Bridge (Cầu Vàng)",
        description: "Held by giant stone hands 1,400 m above sea level, Vietnam's most photographed landmark at Ba Na Hills.",
        img: "/images/destinations/danang/places/golden-bridge.jpg",
      },
      {
        icon: "🏖️",
        name: "Mỹ Khê Beach",
        description: "30 km of fine white sand and clear turquoise water — one of Southeast Asia's most beautiful beaches, minutes from the city.",
        img: "/images/destinations/danang/places/my-khe-beach.jpg",
      },
      {
        icon: "🐉",
        name: "Dragon Bridge (Cầu Rồng)",
        description: "Da Nang's iconic dragon-shaped bridge over the Han River. Every Saturday & Sunday at 9 PM it breathes real fire and water.",
        img: "/images/destinations/danang/places/dragon-bridge.jpg",
      },
      {
        icon: "🏮",
        name: "Hội An Ancient Town",
        description: "A UNESCO World Heritage Site — lantern-lit streets, ancient temples, and authentic Central Vietnamese cuisine, 30 km south.",
        img: "/images/destinations/danang/places/hoi-an.jpg",
      },
      {
        icon: "⛵",
        name: "Bà Nà Hills Resort",
        description: "A French-inspired mountain resort at 1,487 m — home to the Golden Bridge, Fantasy Park, and panoramic coastal views.",
        img: "/images/destinations/danang/places/ba-na-hills.jpg",
      },
      {
        icon: "🗿",
        name: "Marble Mountains",
        description: "Five limestone peaks with Buddhist sanctuaries and hidden caves. Climb to the summit for sweeping views of Da Nang and the sea.",
        img: "/images/destinations/danang/places/marble-mountains.jpg",
      },
      {
        icon: "🙏",
        name: "Son Tra & Lady Buddha",
        description: "Vietnam's 67 m tall Lady Buddha overlooks the South China Sea from Son Tra Peninsula — peaceful and scenic on Day 1.",
        img: "/images/destinations/danang/places/son-tra.jpg",
      },
      {
        icon: "🥥",
        name: "Canaan Island & Coconut Boats",
        description: "Ride traditional round bamboo basket boats through a water palm forest — a uniquely Vietnamese riverside experience.",
        img: "/images/destinations/danang/places/canaan-island.jpg",
      },
      {
        icon: "❤️",
        name: "Love Bridge (Cầu Tình Yêu)",
        description: "A romantic Han River pedestrian bridge adorned with love locks. Perfect for evening strolls and city skyline photography.",
        img: "/images/destinations/danang/places/love-bridge.jpg",
      },
      {
        icon: "🩷",
        name: "Da Nang Cathedral (Pink Church)",
        description: "Built in 1923, this distinctive pink-façaded cathedral is one of Da Nang's most recognizable and photogenic landmarks.",
        img: "/images/destinations/danang/places/da-nang-cathedral.jpg",
      },
      {
        icon: "🏔️",
        name: "Hai Van Pass (Đèo Hải Vân)",
        description: "A 21 km mountain pass with spectacular South China Sea views — the 'ocean cloud pass' made famous by Top Gear.",
        img: "/images/destinations/danang/places/hai-van-pass.jpg",
      },
      {
        icon: "🌊",
        name: "Lang Co Beach",
        description: "A pristine white-sand lagoon at the foot of Hai Van Pass, framed by mountains and turquoise sea — Central Vietnam's hidden gem.",
        img: "/images/destinations/danang/places/lang-co-beach.jpg",
      },
    ],
    practicalInfo: [
      {
        label: "Time Zone",
        value: "ICT (UTC+7) — Vietnam is 1 hour BEHIND the Philippines (PST UTC+8). Adjust your watch upon arrival.",
      },
      {
        label: "Language",
        value: "Vietnamese. English is widely spoken in hotels, tourist restaurants, and major attractions.",
      },
      {
        label: "Climate",
        value: "Tropical — hot and humid year-round. April to August averages 30–35°C. Bring an umbrella; afternoon showers are common.",
      },
      {
        label: "Religion & Customs",
        value: "Buddhist majority. Dress modestly at pagodas and temples (cover shoulders and knees). Remove shoes before entering religious sites.",
      },
      {
        label: "Electricity",
        value: "220V, 50Hz. Plug types A, C, F. Standard Philippine two-prong plugs (Type A) work without an adapter in most outlets.",
      },
      {
        label: "Emergency Numbers",
        value: "Police: 113 | Fire: 114 | Medical / Ambulance: 115 | Tourist Hotline: 1800 599 9936 (toll-free)",
      },
    ],
    bestFood: [
      {
        name: "Mì Quảng",
        desc: "Da Nang's signature noodle dish — turmeric-yellow broth, pork, shrimp, peanuts & fresh herbs. A must-try on every visit.",
        img: "/images/destinations/danang/food/mi-quang.jpg",
      },
      {
        name: "Bún Chả Cá",
        desc: "Central Vietnam's fish-cake noodle soup. Silky broth with house-made fish cakes, tomato, and fresh dill.",
        img: "/images/destinations/danang/food/bun-cha-ca.jpg",
      },
      {
        name: "Fresh Seafood",
        desc: "Grilled or steamed catch-of-the-day at beachfront restaurants along Mỹ Khê. Order by weight for the freshest experience.",
        img: "/images/destinations/danang/food/seafood.jpg",
      },
      {
        name: "Bánh Xèo",
        desc: "Sizzling crispy Vietnamese pancake stuffed with shrimp, pork, bean sprouts, and mushrooms. Wrap in lettuce and dip in nước chấm.",
        img: "/images/destinations/danang/food/banh-xeo.jpg",
      },
      {
        name: "Bánh Mì",
        desc: "Vietnamese baguette loaded with pâté, pickled vegetables, coriander, and your choice of filling. Perfect grab-and-go breakfast.",
        img: "/images/destinations/danang/food/banh-mi.jpg",
      },
    ],
    photoSpots: [
      {
        name: "Golden Bridge",
        desc: "The iconic hands-shaped bridge at Ba Na Hills. Best photos at sunrise — arrive early to avoid crowds and get golden light.",
        img: "/images/destinations/danang/photo-spots/golden-bridge.jpg",
      },
      {
        name: "Dragon Bridge",
        desc: "Da Nang's landmark fire-breathing dragon bridge over the Han River. Illuminated at night — best shots from the riverbank promenade.",
        img: "/images/destinations/danang/photo-spots/dragon-bridge.jpg",
      },
      {
        name: "Mỹ Khê Beach",
        desc: "One of Asia's most beautiful beaches — 20km of white sand and clear water. Perfect sunrise shots facing east from the shoreline.",
        img: "/images/destinations/danang/photo-spots/my-khe-beach.jpg",
      },
      {
        name: "Hội An Ancient Town",
        desc: "UNESCO World Heritage lantern-lit streets just 30km south. Best photos during the full-moon lantern festival or at dusk.",
        img: "/images/destinations/danang/photo-spots/hoi-an.jpg",
      },
      {
        name: "Marble Mountains",
        desc: "Five limestone peaks with hidden caves and hilltop pagodas. Climb to the summit for panoramic views of Da Nang and the sea.",
        img: "/images/destinations/danang/photo-spots/marble-mountains.jpg",
      },
    ],
    localTips: [
      { icon: "🛵", tip: "Cross roads slowly and steadily — traffic rarely stops completely. Walk at a consistent pace and vehicles will flow around you." },
      { icon: "🚕", tip: "Use Grab (like Uber) for all transport. Fixed app prices protect you from overcharging — avoid unmarked taxis." },
      { icon: "💰", tip: "Pay in Vietnamese Dong (VND) everywhere. Exchange at the airport or banks — street money changers may short-change you." },
      { icon: "🍽️", tip: "Local eateries open early and popular spots fill up by 7am. Arrive early for the freshest food and shorter queues." },
      { icon: "🌞", tip: "Apply SPF 50+ sunscreen before any outdoor activity. The tropical UV index is high even on cloudy days." },
      { icon: "📶", tip: "Buy a local SIM at the airport (Viettel or Mobifone) for cheap 4G data. Grab and Google Maps work seamlessly with it." },
    ],
    safetyTips: [
      { icon: "🎒", tip: "Wear your bag in front in crowded tourist areas. Motorbike bag-snatching can happen — keep valuables secured and close to your body." },
      { icon: "🏖️", tip: "Follow beach safety flags. Some stretches near the river mouth have strong undertows — swim only in designated areas with lifeguards." },
      { icon: "💧", tip: "Drink bottled water only. Avoid ice from street stalls — hotels and reputable restaurants use purified ice." },
      { icon: "☀️", tip: "Rest indoors during 12–2pm peak heat. Heatstroke risk is real in summer. Stay hydrated with water, not just cold drinks." },
      { icon: "📱", tip: "Save Gladex (+63 917 875 2200) and Vietnam Medical Emergency (115) in your phone before you leave the hotel each day." },
      { icon: "🏦", tip: "Use ATMs inside banks or malls for safety. Carry small VND denominations (₫20,000–₫50,000) for markets and local transport." },
    ],
  },

  // ─── 18. EMERGENCY CONTACTS ──────────────────────────────────────────────
  emergencyContacts: [
    {
      category: "Gladex Tours",
      icon: "🧡",
      contacts: [
        {
          label: "Gladex Messenger",
          value: "m.me/GladexTours",
          type: "messenger",
          url: "https://m.me/771470123003758",
        },
        {
          label: "Gladex WhatsApp",
          value: "+63 917 875 2200",
          type: "whatsapp",
          url: "https://wa.me/639178752200",
        },
        {
          label: "Gladex Hotline",
          value: "+63 917 875 2200",
          type: "phone",
        },
      ],
    },
    {
      category: "Vietnam Emergency",
      icon: "🚨",
      contacts: [
        { label: "Police", value: "113", type: "phone" },
        { label: "Fire Department", value: "114", type: "phone" },
        { label: "Medical Emergency / Ambulance", value: "115", type: "phone" },
        { label: "Tourist Support Hotline (Toll-Free)", value: "1800 599 9936", type: "phone" },
      ],
    },
    {
      category: "Philippine Consulate",
      icon: "🇵🇭",
      contacts: [
        {
          label: "Philippine Consulate General (Ho Chi Minh City)",
          value: "+84-28-3825-6858",
          type: "phone",
        },
        {
          label: "DFA Assistance to Nationals (24/7)",
          value: "+63-2-8651-9400",
          type: "phone",
        },
      ],
    },
    {
      category: "Da Nang Airport",
      icon: "✈️",
      contacts: [
        {
          label: "Da Nang International Airport",
          value: "+84-236-383-8550",
          type: "phone",
        },
      ],
    },
  ],

  // ─── 19. IMMIGRATION ADVISORY ────────────────────────────────────────────
  immigrationAdvisory: [
    {
      type: "Employed Travelers",
      icon: "💼",
      requirements: [
        "Original Certificate of Employment (company letterhead, stating position, salary, and tenure)",
        "Approved Leave of Absence (signed by direct supervisor or HR)",
        "Latest 3 months payslips",
        "ITR / BIR Form 2316 — most recent year",
        "Valid company ID",
      ],
      note: "BI checks for strong employment ties showing you will return to your job after travel. Bring all original documents.",
    },
    {
      type: "Business Owners",
      icon: "🏢",
      requirements: [
        "DTI Business Name Registration Certificate or SEC Certificate of Incorporation",
        "Mayor's Business Permit (current year)",
        "Bank certificate showing business account and current balance",
        "Bank statement for the last 3 months",
        "ITR / BIR Form 1701 or 1701A — most recent year",
        "Business ID or any government-issued photo ID",
      ],
      note: "Show that your business is active and operational. BI looks for financial capacity and a functioning business to return to.",
    },
    {
      type: "OFWs (Overseas Filipino Workers)",
      icon: "🌐",
      requirements: [
        "Valid POEA/DOLE-processed employment contract with overseas employer details",
        "OWWA Membership Certificate or OFW ID",
        "Proof of remittances or bank statement showing overseas income",
        "Passport with current or most recent foreign visa or entry stamps",
        "OEC (Overseas Employment Certificate) — if applicable",
      ],
      note: "OFW status provides additional flexibility at Philippine immigration. Bring complete documentation for a smooth clearance.",
    },
    {
      type: "Government Employees",
      icon: "🏛️",
      requirements: [
        "Certificate of Employment (on official government agency letterhead)",
        "Approved Leave of Absence (signed by head of office / supervisor)",
        "Service Record (from HR / HRD office)",
        "Travel Authority or clearance from agency head — if required by your agency",
        "Government-issued ID (GSIS, UMID, PhilHealth, PRC, etc.)",
      ],
      note: "Some government agencies require a travel authority or special leave clearance. Confirm this with your HR department before departure.",
    },
    {
      type: "Sponsored Travelers",
      icon: "🤝",
      requirements: [
        "Notarized Affidavit of Support and Guarantee (from sponsor)",
        "Sponsor's Certificate of Employment or business registration",
        "Sponsor's bank certificate and 3-month bank statement",
        "Sponsor's ITR (most recent year)",
        "Proof of relationship between traveler and sponsor (PSA Birth Certificate, Marriage Certificate, etc.)",
        "Photocopy of sponsor's valid government-issued ID",
      ],
      note: "The sponsor must clearly demonstrate financial capacity to support the traveler's entire trip. Notarized documents carry more weight.",
    },
    {
      type: "Minors (with Parent / Guardian)",
      icon: "👨‍👩‍👧",
      requirements: [
        "PSA-authenticated Birth Certificate (original)",
        "Both parents' valid government-issued IDs (photocopies)",
        "If traveling with ONE parent only: Notarized Special Power of Attorney / Affidavit of Consent from the ABSENT parent",
        "If traveling with a non-parent guardian: Notarized SPA from BOTH parents authorizing the specific guardian to travel",
        "DSWD Travel Clearance — required if minor is traveling with a non-relative or alone",
      ],
      note: "BI strictly enforces minor travel regulations. Secure ALL documents well before departure — missing documents will result in offloading.",
    },
    {
      type: "Unemployed / First-Time Travelers",
      icon: "💳",
      requirements: [
        "Bank certificate showing current account and sufficient balance (recommended minimum: PHP 50,000 per person)",
        "Bank statement for the last 3–6 months showing regular activity",
        "ITR or BIR TIN card (if previously employed)",
        "Proof of financial capacity: property title, vehicle OR (OR), investment certificates, or family support documents",
        "Any valid government-issued ID (PhilHealth, SSS, Voter's ID, UMID, etc.)",
      ],
      note: "BI focuses on financial capacity and return ties. Provide as much documentation as possible showing you have sufficient funds and strong reasons to return home.",
    },
  ],

  // ─── 20. DO'S AND DON'TS ─────────────────────────────────────────────────
  dosAndDonts: {
    dos: [
      "Wear comfortable, modest clothing — especially when visiting temples and pagodas in Hoi An.",
      "Follow your tour guide's instructions at all times during all activities and transfers.",
      "Carry a printed copy of your Vietnam e-Visa at all times (hotels and immigration may ask for it).",
      "Complete your eTravel Philippines registration before departure.",
      "Be at the hotel lobby 15 minutes before the scheduled group departure time each day.",
      "Bring an umbrella or rain jacket daily — Da Nang weather changes quickly.",
      "Keep your group together, especially in crowded areas like Hoi An Ancient Town.",
      "Store your passport and valuables in the hotel room safe when not needed.",
      "Drink sealed bottled water only for the entire duration of your trip.",
      "Inform your guide immediately of any health issues, emergencies, or concerns.",
      "Respect local customs — remove shoes when entering pagodas and temples.",
      "Eat only at designated group restaurants or approved food vendors.",
    ],
    donts: [
      "Do NOT purchase items or carry packages for others — personal transactions are strictly prohibited.",
      "Do NOT separate from the group without informing your tour guide.",
      "Do NOT exchange money with unauthorized street money changers.",
      "Do NOT eat at unauthorized street food stalls not approved by your guide.",
      "Do NOT photograph military zones, government buildings, or areas marked as restricted.",
      "Do NOT leave bags, luggage, or valuables unattended in any public area.",
      "Do NOT share passport details, travel documents, or personal information with strangers.",
      "Do NOT accept tours, transportation, or services outside of the official itinerary.",
      "Do NOT be late at group departure times — the group departs as scheduled without exceptions.",
      "Do NOT bring undeclared goods, controlled substances, or excessive undeclared cash.",
      "Do NOT drink tap water — drink sealed bottled water only.",
      "Do NOT engage in any unauthorized commercial activity during the tour.",
    ],
  },

  // ─── 21. NEED ASSISTANCE ─────────────────────────────────────────────────
  assistanceContacts: {
    messenger: {
      label: "Chat on Messenger",
      url: "https://m.me/771470123003758",
      subtext: "Message us anytime",
    },
    whatsapp: {
      label: "WhatsApp",
      url: "https://wa.me/639178752200",
      number: "+63 917 875 2200",
      subtext: "Available during business hours",
    },
    hotline: {
      label: "Gladex Hotline",
      number: "+63 917 875 2200",
      subtext: "For urgent travel concerns",
    },
  },

  // ─── 22. FAQs ─────────────────────────────────────────────────────────────
  faqs: [
    {
      q: "What if my flight is delayed?",
      a: "Contact the Gladex Tours hotline immediately — your tour guide will be notified and arrangements will be adjusted. Do not board a different flight or make any new bookings without consulting our team. Standard Travel Insurance and above cover flight delay expenses (meals, accommodation) for delays of 6 hours or more.",
    },
    {
      q: "What time is hotel check-in?",
      a: "Standard check-in time is 2:00 PM. Early check-in (before 2:00 PM) is subject to room availability and cannot be guaranteed. If you arrive early, the hotel will safely store your luggage while you explore. Late check-out may also be requested at the front desk and is subject to a surcharge.",
    },
    {
      q: "What if it rains during the tour?",
      a: "Most tours in Da Nang continue in light rain. Your guide will have an umbrella or rain poncho. Ba Na Hills occasionally closes during extreme weather (typhoons, strong winds) — if this occurs, an alternative activity will be arranged. Tours are designed to proceed regardless of weather unless there is a safety concern.",
    },
    {
      q: "Is the tour refundable?",
      a: "The 5D3N Da Nang package is non-refundable after the final payment due date. Rescheduling may be allowed at the discretion of Gladex Tours subject to availability and applicable fees. Travel insurance is strongly recommended to protect against unforeseen cancellations due to medical emergencies or natural disasters.",
    },
    {
      q: "Can I add optional tours?",
      a: "Yes! Scroll down to the Optional Tours section on this page to browse available activities and add them directly to your trip. You can also contact your Gladex travel consultant via Messenger or WhatsApp to request specific tours or custom experiences.",
    },
    {
      q: "Who do I contact during an emergency?",
      a: "For urgent matters: contact your Tour Guide first (number provided in the Emergency Contacts section). For medical emergencies in Vietnam, dial 115 (ambulance). For Gladex support, call or message +63 917 875 2200 (available on Messenger and WhatsApp). Save all emergency numbers before you leave your hotel each day.",
    },
    {
      q: "What do I do if I miss my flight?",
      a: "Contact the Gladex Tours hotline or your tour guide immediately. Do not purchase a new ticket without consulting our team first. Travel insurance covers missed flights under certain qualifying conditions — keep your insurance certificate accessible at all times.",
    },
    {
      q: "What should I do if I feel sick during the trip?",
      a: "Inform your tour guide immediately. Compulsory travel insurance is part of your package and covers medical emergencies abroad. Your guide will assist with contacting medical services. Da Nang city has hospitals and clinics with English-speaking staff available.",
    },
    {
      q: "Can I explore Da Nang on my own?",
      a: "Free time may be available depending on the day's schedule — Day 4 has a free period in the morning. Always inform your guide in advance, ensure you have the guide's contact number, and return to the meeting point or hotel on time. Do not arrange private transportation through unofficial channels.",
    },
    {
      q: "What currency should I use in Da Nang?",
      a: "Vietnamese Dong (VND) is the official currency. USD is also widely accepted in tourist areas, hotels, and restaurants. Exchange money at the airport upon arrival, authorized banks (Vietcombank, Techcombank), or reputable money changers. Never exchange with street vendors. Prepare approximately USD 300 for personal expenses during the 5-day trip.",
    },
    {
      q: "Is tipping expected in Vietnam?",
      a: "Tipping fee for your tour guide and driver is already included in the 5D3N package — you do not need to tip them separately. For restaurants, hotels, or any additional personal services you arrange on your own, small tips are appreciated but entirely optional.",
    },
    {
      q: "What happens if I'm late at the group meeting point?",
      a: "The group departs at the scheduled time. If you are not at the meeting point on time, the group will proceed without you. You will be responsible for your own transportation to catch up with the group, and penalties may apply per the package terms and conditions.",
    },
    {
      q: "Are shopping stops mandatory?",
      a: "You are required to accompany the group to designated shopping stop locations as part of the tour program. However, purchasing is entirely optional — there is absolutely NO obligation to buy anything. Importantly, do not purchase items on behalf of other people (personal transactions are strictly prohibited).",
    },
    {
      q: "How do I apply for a Vietnam e-Visa?",
      a: "Apply at the official Vietnam e-Visa portal: evisa.xuatnhapcanh.gov.vn. Processing takes 3–5 business days. Requirements: passport-sized photo, passport bio-data, travel dates, and credit/debit card for payment. Our team will guide you through the process — contact us at least 2 weeks before departure to allow enough time.",
    },
    {
      q: "What is the eTravel Philippines requirement?",
      a: "The eTravel Philippines system (etravel.gov.ph) is mandatory for all Filipino travelers departing internationally. Register at least 72 hours before your departure. You will receive a QR code that BI officers will scan upon departure. Keep this QR code accessible — save a screenshot or print it.",
    },
    {
      q: "What is included in the 5D3N Da Nang package?",
      a: "Round-trip airfare via VietJet Air, 4 nights hotel accommodation with daily breakfast, meals as listed in the itinerary, roundtrip airport transfers, guided sightseeing tours with entrance tickets, air-conditioned tour bus, English-speaking guide and driver, tipping fee, airport tax, and baggage allowance (20 kg + 7 kg carry-on). Refer to the Package Inclusions section for the complete list.",
    },
    {
      q: "What happens if Ba Na Hills closes due to weather?",
      a: "Ba Na Hills occasionally closes during extreme weather (heavy fog, typhoons, strong winds). If this occurs, your guide will arrange an alternative activity or free time. Refunds or credits for the Ba Na Hills entrance fee, if applicable, will be handled by Gladex Tours on a case-by-case basis per the operator's policy.",
    },
    {
      q: "Is travel insurance mandatory?",
      a: "Yes. Compulsory travel insurance is a requirement for all travelers on this package. Your insurance certificate will be provided by Gladex Tours. Ensure you receive and understand your coverage before departure. The insurance covers medical emergencies, trip interruptions, and baggage loss.",
    },
    {
      q: "Is online check-in available for this package?",
      a: "No. Online check-in is not available for this group/chartered flight booking — all passengers are under a single booking reference number. Any individual changes or partial check-ins could affect the entire group. All passengers must proceed to the airport check-in counter directly on the day of departure.",
    },
  ],
};
