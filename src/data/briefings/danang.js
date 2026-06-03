/**
 * Da Nang Vietnam — Complete Briefing Data
 * Package: GDX-UOV15B2 | 4D3N Da Nang 2026
 *
 * This file is the single source of truth for the Da Nang briefing page.
 * Update content here only — no changes to components required.
 */

export const danangBriefing = {

  // ─── 1. WELCOME MESSAGE ──────────────────────────────────────────────────
  welcomeMessage: {
    title: "Official Da Nang Briefing",
    subtitle: "4D3N Da Nang, Vietnam — 2026",
    packageCode: "GDX-UOV15B2",
    body: [
      "Welcome and congratulations on your upcoming trip to Da Nang, Vietnam with Gladex Tours!",
      "This page contains your complete travel briefing — the same information covered in our pre-departure orientation sessions. Please read every section carefully and keep this page bookmarked for easy reference before and during your trip.",
      "If you have questions after reviewing this briefing, contact our team via Messenger, WhatsApp, or our hotline. We are here to help. Safe travels!",
    ],
  },

  // ─── 5. TRAVEL INFORMATION CENTER ────────────────────────────────────────
  travelInformation: {
    beforeDeparture: [
      "Secure your Vietnam e-Visa at least 7 days before departure at evisa.xuatnhapcanh.gov.vn.",
      "Complete your eTravel Philippines registration at etravel.gov.ph — required by Philippine immigration for all international departures.",
      "Submit your Vietnam Pre-Arrival Information online as instructed by our team.",
      "Arrive at the departure airport at least 3 hours before your scheduled international flight.",
      "Ensure your passport is valid for at least 6 months beyond your travel return date.",
      "Confirm your compulsory travel insurance documents are received and saved.",
      "Download offline maps of Da Nang and Hoi An on Google Maps before you leave.",
      "Inform your bank about your travel dates to prevent international card blocks.",
      "Prepare USD 100–150 or its VND equivalent for personal expenses.",
      "Complete online check-in for your flight (opens 24–48 hours before departure).",
    ],
    uponArrival: [
      "Proceed to the Immigration counter at Da Nang International Airport.",
      "Present your passport and printed Vietnam e-Visa approval letter.",
      "Fill in any required arrival card provided on the aircraft or at the counter.",
      "Claim your baggage at the designated carousel after immigration clearance.",
      "Exit to the Arrivals Hall and look for your Gladex Tours meet-and-greet signage.",
      "Do NOT accept assistance from unauthorized porters or taxi drivers in the arrivals hall.",
    ],
  },

  // ─── 6. ARRIVAL INSTRUCTIONS ─────────────────────────────────────────────
  arrivalInstructions: [
    {
      icon: "🇵🇭",
      step: "Philippine Departure Procedure",
      details: [
        "Arrive at the airport at least 3 hours before your international flight departure time.",
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
        "Exit to the Arrivals Hall — look for your Gladex Tours representative holding a sign.",
        "Do NOT accept offers from unauthorized taxi operators, porters, or travel agents.",
        "Contact your tour guide immediately if you cannot locate the Gladex meet-and-greet point.",
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
    { icon: "📱", text: "Save your tour guide's contact number and keep your phone charged at all times." },
    { icon: "📸", text: "Respect photo restrictions at temples, government buildings, and any site marked as prohibited." },
    { icon: "⚠️", text: "The group departs at the scheduled time. Travelers who cause delays may be subject to penalties per the package terms." },
    { icon: "🧴", text: "Ba Na Hills altitude reaches 1,487 m — bring a light jacket as it is noticeably cooler at the summit." },
  ],

  // ─── 11. SHOPPING STOP ADVISORY ──────────────────────────────────────────
  shoppingAdvisory: {
    title: "Shopping Stop Advisory",
    warningLabel: "IMPORTANT NOTICE",
    body: "Shopping stops at designated stores are an official part of the group tour itinerary. These stops support local businesses and are built into the tour program. Participation in these stops is required as a group; however, purchasing is entirely voluntary.",
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

  // ─── 13. TRAVEL READINESS CHECKLIST ──────────────────────────────────────
  checklist: [
    { id: "passport", label: "Passport validity checked (min. 6 months beyond return date)" },
    { id: "evisa", label: "Vietnam e-Visa applied and received (evisa.xuatnhapcanh.gov.vn)" },
    { id: "etravel", label: "eTravel Philippines registered (etravel.gov.ph)" },
    { id: "prearrival", label: "Vietnam Pre-Arrival Information submitted" },
    { id: "insurance", label: "Travel insurance confirmed and documents saved" },
    { id: "flights", label: "Flight e-tickets printed or downloaded (with flight number)" },
    { id: "hotel", label: "Hotel confirmation saved on phone" },
    { id: "emergency", label: "Emergency contacts saved (guide, Gladex hotline, consulate)" },
    { id: "currency", label: "Cash prepared: USD 100–150 or equivalent VND" },
    { id: "sim", label: "Vietnam SIM card or international roaming arranged" },
    { id: "maps", label: "Offline maps downloaded (Da Nang + Hoi An)" },
    { id: "packing", label: "Packing completed (see What to Bring section)" },
    { id: "checkin", label: "Online check-in completed (opens 24–48 hours before departure)" },
    { id: "departure", label: "Airport arrival time confirmed — plan to arrive 3 hours before departure" },
    { id: "briefing", label: "This entire briefing page read and saved on your phone" },
  ],

  // ─── 14. WHAT TO BRING ───────────────────────────────────────────────────
  whatToBring: [
    { icon: "👟", label: "Comfortable walking shoes (expect 3–5 km of walking daily)" },
    { icon: "👕", label: "Light, breathable clothing (3–4 sets)" },
    { icon: "🧥", label: "Light jacket or cardigan (Ba Na Hills summit is noticeably cold)" },
    { icon: "🌂", label: "Compact umbrella or rain jacket" },
    { icon: "🧴", label: "Sunscreen SPF 50+ (apply daily)" },
    { icon: "🪲", label: "Insect repellent (especially for Hoi An outdoor areas)" },
    { icon: "💊", label: "Personal medication (and any prescription documents)" },
    { icon: "💴", label: "Cash: USD and/or Vietnamese Dong (VND)" },
    { icon: "🔌", label: "Universal power adapter (Vietnam uses Type A/C/F outlets, 220V)" },
    { icon: "🔋", label: "Portable charger / power bank (for full-day tours)" },
    { icon: "📄", label: "Original passport (required at hotels and immigration)" },
    { icon: "🖨️", label: "Printed Vietnam e-Visa approval letter" },
    { icon: "📱", label: "eTravel QR code (printed or screenshot on phone)" },
    { icon: "📸", label: "1–2 spare passport-sized photos" },
    { icon: "🎒", label: "Small daypack for tour days" },
    { icon: "💧", label: "Reusable water bottle (refill from hotel's filtered water station)" },
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
          "Also download: 'Hoi An' (for Day 3 ancient town tour)",
          "Alternative app: MAPS.ME — fully offline navigation, no data needed",
        ],
        cost: "Free",
      },
    ],
    tips: [
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
    recommendedCash: "Prepare USD 100–150 for personal expenses: optional tours, shopping, tips, snacks.",
    whereToExchange: [
      { place: "Da Nang Airport", note: "Convenient upon arrival but rates may be slightly lower than the city" },
      { place: "Authorized Banks (Vietcombank, Techcombank)", note: "Best rates — bring your passport for identification" },
      { place: "Hotel Front Desk", note: "Convenient for small amounts but usually lower rates" },
      { place: "Hoi An Ancient Town money changers", note: "Competitive rates — exchange in small amounts and count carefully" },
    ],
    tips: [
      "Always count your money immediately after exchanging — do it in front of the teller.",
      "Do NOT exchange money with street vendors or unauthorized changers.",
      "Keep small VND bills (VND 20,000–100,000) for local purchases, transport, and tips.",
      "Credit cards are accepted at major malls, hotel restaurants, and tourist shops.",
      "Notify your Philippine bank of your travel dates to avoid international transaction blocks.",
      "Tipping is not mandatory in Vietnam but is appreciated — VND 20,000–50,000 for good service.",
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
        name: "Golden Bridge (Cầu Vàng) — Ba Na Hills",
        description: "Held by giant stone hands 1,400 m above sea level, the Golden Bridge is Vietnam's most photographed landmark. Located inside the Ba Na Hills resort complex.",
      },
      {
        icon: "🏖️",
        name: "Mỹ Khê Beach",
        description: "Stretching 30 km along the coast, Mỹ Khê is one of the most beautiful beaches in Southeast Asia — fine white sand and clear turquoise water just minutes from the city.",
      },
      {
        icon: "🐉",
        name: "Dragon Bridge (Cầu Rồng)",
        description: "Da Nang's iconic dragon-shaped bridge spanning the Han River. On Saturday and Sunday evenings at 9 PM, the dragon breathes fire and water — a spectacular show.",
      },
      {
        icon: "🏯",
        name: "Hội An Ancient Town",
        description: "A UNESCO World Heritage Site, Hội An is a beautifully preserved 15th–19th century trading port. Famous for its lantern-lit streets, tailors, and authentic Vietnamese cuisine.",
      },
      {
        icon: "⛵",
        name: "Bà Nà Hills Resort",
        description: "A hilltop French-inspired resort at 1,487 m altitude with the Golden Bridge, Fantasy Park amusement area, French Village, and stunning panoramic views of the coast.",
      },
      {
        icon: "🗿",
        name: "Marble Mountains (Ngũ Hành Sơn)",
        description: "Five limestone and marble hills named after the five elements. Contains Buddhist sanctuaries, natural caves, and a panoramic viewpoint overlooking the coast and Da Nang city.",
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
          value: "+63 917 XXX XXXX",
          type: "whatsapp",
          url: "https://wa.me/63917XXXXXXX",
        },
        {
          label: "Gladex Hotline",
          value: "0917-XXX-XXXX",
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
        { label: "Tourist Support Hotline (toll-free)", value: "1800 599 9936", type: "phone" },
      ],
    },
    {
      category: "Philippine Consulate",
      icon: "🇵🇭",
      contacts: [
        {
          label: "Phil. Consulate General (Ho Chi Minh City)",
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

  // ─── 10. IMMIGRATION ADVISORY ────────────────────────────────────────────
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

  // ─── 19. DO'S AND DON'TS ─────────────────────────────────────────────────
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
      url: "https://wa.me/63917XXXXXXX",
      number: "+63 917 XXX XXXX",
      subtext: "Available during business hours",
    },
    hotline: {
      label: "Gladex Hotline",
      number: "0917-XXX-XXXX",
      subtext: "For urgent travel concerns",
    },
  },

  // ─── 20. FAQs ─────────────────────────────────────────────────────────────
  faqs: [
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
      a: "Free time may be available depending on the day's schedule. Always inform your guide in advance, ensure you have the guide's contact number, and return to the meeting point or hotel on time. Do not arrange private transportation through unofficial channels.",
    },
    {
      q: "What currency should I use in Da Nang?",
      a: "Vietnamese Dong (VND) is the official currency. USD is also widely accepted in tourist areas, hotels, and restaurants. Exchange money at the airport upon arrival, authorized banks (Vietcombank, Techcombank), or reputable money changers. Never exchange with street vendors. Bring USD 100–150 in cash for personal expenses.",
    },
    {
      q: "Is tipping expected in Vietnam?",
      a: "Tipping is not mandatory but is appreciated for good service. For group tour guides and drivers, USD 1–2 per person per day is a common courtesy — entirely voluntary. For restaurants and hotels, small tips of VND 20,000–50,000 are welcomed.",
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
      q: "What is included in the 4D3N Da Nang package?",
      a: "Round-trip airfare, 3 nights hotel accommodation (based on selected category), daily breakfast, Ba Na Hills cable car and Golden Bridge admission, guided city tours, and airport transfers. Refer to the Package Inclusions section above for the complete list. Vietnam e-Visa fee, personal expenses, shopping, tipping, and optional tours are NOT included.",
    },
    {
      q: "What happens if Ba Na Hills closes due to weather?",
      a: "Ba Na Hills occasionally closes during extreme weather (heavy fog, typhoons, strong winds). If this occurs, your guide will arrange an alternative activity or free time. Refunds or credits for the Ba Na Hills entrance fee, if applicable, will be handled by Gladex Tours on a case-by-case basis per the operator's policy.",
    },
    {
      q: "Is travel insurance mandatory?",
      a: "Yes. Compulsory travel insurance is a requirement for all travelers on this package. Your insurance certificate will be provided by Gladex Tours. Ensure you receive and understand your coverage before departure. The insurance covers medical emergencies, trip interruptions, and baggage loss.",
    },
  ],
};
