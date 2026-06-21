/**
 * Hong Kong SAR — Complete Briefing Data
 * Package: GDX-CNHK | 4D3N Hong Kong 2026
 *
 * This file is the single source of truth for the Hong Kong briefing page.
 * Update content here only — no changes to components required.
 */

export const hongkongBriefing = {

  // ─── 1. WELCOME MESSAGE ──────────────────────────────────────────────────
  welcomeImage: "/images/welcome-hk.png",

  welcomeMessage: {
    title: "Official Hong Kong Briefing",
    subtitle: "4D3N Hong Kong SAR — 2026",
    packageCode: "GDX-CNHK",
    body: [
      "Welcome and congratulations on your upcoming trip to Hong Kong SAR with Gladex Tours!",
      "This page contains your complete travel briefing — including all important travel information, arrival instructions, transfer details, hotel check-in policies, tour reminders, requirements, FAQs, and emergency contacts.",
      "Please read every section carefully before your departure and keep this page bookmarked for easy reference throughout your trip. If you have questions after reviewing the briefing, reach out to our team via Messenger, WhatsApp, or our hotline.",
    ],
  },

  // ─── 2 & 3. BRIEFING INCLUSIONS & EXCLUSIONS (override pkg data) ─────────
  // These values are used instead of pkg.inclusions / pkg.exclusions
  // when rendering the briefing page for Hong Kong.
  briefingInclusions: [
    "Roundtrip Airfare",
    "Hotel Accommodation (3 Nights)",
    "Breakfast Meal Coupon (HK$20/Pax/Day)",
    "Roundtrip Airport Transfers",
    "Hotel Taxes and Surcharges",
    "Use of Hotel Amenities",
    "Seat-In-Coach Bus",
    "Hong Kong Morning City Tour",
    "English Speaking Tour Guide / Driver",
  ],

  briefingExclusions: [
    "Compulsory Tipping Fees (HKD 50/Pax — mandatory)",
    "Philippine Travel Tax",
    "Extra Baggage Fees",
    "Travel Insurance (compulsory, arrange separately)",
    "Travel Requirements (visa fees, eTravel, etc.)",
    "Pool Access Charges (applicable in some hotels)",
    "Midnight Transfer Surcharge (12AM–6AM transfers)",
    "Optional Tours (Disneyland, Ocean Park, Macau, Ngong Ping 360, etc.)",
    "Other Personal Expenses",
  ],

  // ─── 4. DAILY ITINERARY ──────────────────────────────────────────────────
  // Shape: { day, title, activities[], galleryImages[] }
  // galleryImages: add image paths here, e.g. "/images/briefings/hongkong/day1/photo1.jpg"
  itinerary: [
    {
      day: 1,
      title: "Hong Kong Arrival — Airport Meet & Greet · SIC Transfer · Hotel Check-In",
      activities: [
        "Upon arrival at Hong Kong International Airport, meet and greet with the agency representative at the arrival hall.",
        "Enjoy your SIC (Seat-in-Coach) transfer going to the hotel for check-in.",
        "Enjoy free time in the afternoon — perfect for exploring nearby streets, trying local food, or simply relaxing after the flight.",
        "Overnight stay at the hotel.",
      ],
      galleryImages: [],
    },
    {
      day: 2,
      title: "Hong Kong City Tour — Avenue of Stars · Victoria Harbour · West Kowloon · Shopping",
      activities: [
        "Start the day with breakfast before heading out for the city tour.",
        "Visit the famous Avenue of Stars and enjoy the stunning view of Victoria Harbour.",
        "Explore the West Kowloon Cultural District — take photos around the Hong Kong Palace Museum and Art Park.",
        "Shopping stops at jewelry factories and souvenir outlets.",
        "Tour usually ends at Tsim Sha Tsui where you can continue exploring the city on your own.",
        "Overnight stay at the hotel.",
      ],
      galleryImages: [],
    },
    {
      day: 3,
      title: "Free Time or Optional Tours — Disneyland · Ocean Park · Macau · Ngong Ping 360",
      activities: [
        "After breakfast, enjoy free time at your own leisure or avail of optional tours.",
        "One of the highlights is visiting Hong Kong Disneyland — perfect for making unforgettable memories, watching magical shows, and enjoying thrilling rides.",
        "Overnight stay at the hotel.",
      ],
      tourOptions: [
        { name: "Whole Day Disneyland", note: "" },
        { name: "Whole Day Ocean Park", note: "" },
        { name: "Half Day City Tour + Disneyland", note: "Clients must attend the city tour first before receiving Disneyland tickets." },
        { name: "Half Day City Tour + Ocean Park", note: "Clients must attend the city tour first before receiving Ocean Park tickets." },
        { name: "Macau Tour", note: "" },
        { name: "Night Tour", note: "" },
        { name: "PM Ngong Ping 360", note: "" },
      ],
      galleryImages: [],
    },
    {
      day: 4,
      title: "Hong Kong Departure — Check-Out · Airport Transfer · Farewell",
      activities: [
        "After breakfast, prepare for check-out and coordinate hotel pick-up for your transfer back to the airport.",
        "Be at the hotel lobby at your confirmed pick-up time for your SIC transfer to Hong Kong International Airport.",
        "Time to say goodbye to Hong Kong and head back home with unforgettable memories.",
      ],
      galleryImages: [],
    },
  ],

  // ─── 5. TRAVEL INFORMATION CENTER ────────────────────────────────────────
  travelInformation: {
    beforeDeparture: [
      "Ensure your passport is valid for at least 6 months beyond your return date — Hong Kong immigration enforces this strictly.",
      "Prepare all immigration documents: passport, eTravel QR code, round-trip ticket, and booking voucher/confirmation.",
      "Arrive at the Philippine departure airport at least 3 hours before your international flight.",
      "Save your Gladex WhatsApp contact before departure — the team may send important reminders.",
      "Download and save your booking voucher/confirmation to your phone (screenshot or PDF).",
      "Complete your eTravel Philippines registration at etravel.gov.ph — required at Philippine immigration.",
      "Prepare HKD cash for personal expenses, tipping, and optional tours.",
      "Inform your Philippine bank of your travel dates to avoid international card blocks.",
      "Complete online check-in for your flight (opens 24–48 hours before departure).",
    ],
    uponArrival: [
      "Free WiFi is available throughout Hong Kong International Airport (HKIA) — connect immediately upon arrival.",
      "eSIM and local SIM cards are available at airport convenience stores (7-Eleven, Circle K) and telco counters inside the terminal.",
      "Exchange a small amount of HKD at the HKIA money changers for immediate expenses — enough for transport and snacks while rates at city banks are better.",
      "Save your hotel name and address to your phone before leaving the terminal — useful if you need to direct a taxi or ask for help.",
    ],
  },

  // ─── 6. ARRIVAL INSTRUCTIONS ─────────────────────────────────────────────
  arrivalInstructions: [
    {
      icon: "🇵🇭",
      step: "Philippine Departure Procedure",
      details: [
        "Proceed to the airline check-in counter — present your passport and booking reference.",
        "After check-in, proceed to the Bureau of Immigration (BI) departure hall.",
        "At BI: present your passport, boarding pass, and round-trip ticket.",
        "Show your eTravel QR code (printed or on your phone) when requested.",
        "No Hong Kong visa is required — Philippine passport holders enter visa-free for up to 14 days.",
        "Proceed through security screening to your boarding gate and wait for the boarding announcement.",
      ],
    },
    {
      icon: "🇭🇰",
      step: "Arrival at Hong Kong International Airport (HKIA)",
      details: [
        "Present your passport to the immigration officer — no additional visa form is required for most arrivals.",
        "Collect your checked baggage at the designated carousel after immigration clearance.",
        "Proceed to the Arrivals Hall and follow signs to the Tourist Pick-Up Area — Hall A.",
        "Look for your Gladex representative at Pole 01 or Pole 02 holding a placard with the Lead Guest's name.",
        "Present your booking voucher to the driver for verification before boarding.",
        "If you cannot locate the Gladex representative after 45 minutes, call the local operator number provided in your voucher.",
        "Do NOT accept rides from unauthorized taxi operators, touts, or travel agents.",
      ],
    },
  ],

  // ─── 7. TRANSFER INSTRUCTIONS ────────────────────────────────────────────
  transferInstructions: [
    "Arrival Transfer: Airport → Hotel via Seat-In-Coach (SIC) bus — included in the package.",
    "Departure Transfer: Hotel → Airport via Seat-In-Coach — also included in the package.",
    "Transfer time from HKIA to most Kowloon/Tsim Sha Tsui hotels is approximately 30–50 minutes.",
    "Keep all personal belongings and hand carry with you inside the vehicle at all times.",
    "Departure day: confirm your pick-up time with the hotel front desk or your guide the evening before.",
    "⚠️ MIDNIGHT TRANSFER NOTICE: Transfers between 12:00 AM and 6:00 AM incur an additional midnight surcharge — this is NOT included in the package and will be collected separately.",
  ],

  // ─── 8. HOTEL CHECK-IN INFORMATION ───────────────────────────────────────
  hotelInformation: {
    checkIn: "2:00 PM – 3:00 PM (Standard) — early check-in subject to room availability",
    checkOut: "11:00 AM – 12:00 Noon (Standard) — late check-out subject to additional charge",
    hotels: [
      { category: "Standard Hotel", name: "Standard HK hotel or similar (to be advised)" },
    ],
    policies: [
      "A security deposit is required at check-in — payable by credit card or HKD cash. This will be fully refunded upon check-out if no charges are incurred.",
      "Breakfast is provided via meal coupon (HK$20/pax/day) — surrender your coupon at the hotel restaurant each morning.",
      "Minibar, room service, international calls, and laundry are personal expenses — NOT included.",
      "Store valuables (passport, cash, jewelry) in the in-room safe at all times when not in use.",
      "Smoking is prohibited in all hotel rooms — designated smoking areas are available outside.",
    ],
  },

  // ─── 9. TOUR REMINDERS ───────────────────────────────────────────────────
  reminders: [
    { icon: "⏰", text: "Be at the hotel lobby at the scheduled time each tour day — the group departs promptly." },
    { icon: "🚌", text: "All included transfers use Seat-In-Coach (SIC) buses — you will be travelling with other tour groups." },
    { icon: "🧭", text: "The Hong Kong Morning City Tour is included — do NOT book a separate city tour at extra cost." },
    { icon: "💳", text: "Tipping (HKD 50/pax) is compulsory for the tour guide and driver — prepare HKD cash." },
    { icon: "🚇", text: "An Octopus Card is highly recommended for the MTR (subway) and buses — purchase at 7-Eleven or the airport." },
    { icon: "🌂", text: "Hong Kong weather is unpredictable — bring a compact umbrella or light rain jacket." },
    { icon: "🧥", text: "Indoor air conditioning in Hong Kong malls and restaurants is extremely cold — carry a light jacket." },
    { icon: "📱", text: "Save your tour guide's and local operator's contact numbers before arriving." },
  ],

  // ─── 10. IMMIGRATION ADVISORY ────────────────────────────────────────────
  immigrationAdvisory: [
    {
      type: "Employed Travelers",
      icon: "💼",
      requirements: [
        "Original Certificate of Employment (company letterhead, with position, salary, and length of service)",
        "Approved Leave of Absence (signed by direct supervisor or HR)",
        "Latest 3 months payslips",
        "ITR / BIR Form 2316 — most recent year",
        "Valid company ID",
      ],
      note: "Philippine immigration checks for strong employment ties showing you will return after your trip. Bring originals — photocopies alone may not be accepted.",
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
      note: "Show that the business is active and operational. BI looks for financial capacity and a legitimate business to return to.",
    },
    {
      type: "OFWs (Overseas Filipino Workers)",
      icon: "🌐",
      requirements: [
        "Valid POEA/DOLE-processed employment contract",
        "OWWA Membership Certificate or OFW ID",
        "Proof of remittances or bank statement showing overseas income",
        "Passport with current or most recent foreign visa and entry stamps",
        "OEC (Overseas Employment Certificate) — if applicable",
      ],
      note: "OFW status provides additional flexibility at Philippine immigration. Carry complete documentation for a smooth clearance.",
    },
    {
      type: "Government Employees",
      icon: "🏛️",
      requirements: [
        "Certificate of Employment (on official government agency letterhead)",
        "Approved Leave of Absence (signed by head of office)",
        "Service Record (from HR / HRD office)",
        "Travel authority or clearance from agency head — if required by your agency",
        "Government-issued ID (GSIS, UMID, PhilHealth, PRC, etc.)",
      ],
      note: "Some agencies require a travel authority or special clearance. Confirm requirements with your HR department well before departure.",
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
      note: "The sponsor must demonstrate clear financial capacity to cover the traveler's entire trip. Notarized documents carry significantly more weight at immigration.",
    },
    {
      type: "Minors (with Parent / Guardian)",
      icon: "👨‍👩‍👧",
      requirements: [
        "PSA-authenticated Birth Certificate (original)",
        "Both parents' valid government-issued IDs (photocopies)",
        "If traveling with ONE parent only: Notarized Special Power of Attorney / Affidavit of Consent from the ABSENT parent",
        "If traveling with a non-parent guardian: Notarized SPA from BOTH parents authorizing the specific guardian",
        "DSWD Travel Clearance — required if minor is traveling with a non-relative or alone",
      ],
      note: "BI strictly enforces minor travel regulations. Secure ALL documents well before departure — missing documents will result in offloading at the airport.",
    },
    {
      type: "Unemployed / First-Time Travelers",
      icon: "💳",
      requirements: [
        "Bank certificate showing current account and sufficient balance (recommended minimum: PHP 50,000 per person)",
        "Bank statement for the last 3–6 months showing regular account activity",
        "ITR or BIR TIN card (if previously employed)",
        "Proof of financial capacity: property title, vehicle OR (OR), investments, or family support documents",
        "Any valid government-issued ID (PhilHealth, SSS, Voter's ID, UMID, etc.)",
      ],
      note: "BI focuses on financial capacity and return ties. Provide as much documentation as possible showing sufficient funds and strong reasons to return to the Philippines.",
    },
  ],

  // ─── 11. SHOPPING STOP ADVISORY ──────────────────────────────────────────
  shoppingAdvisory: {
    title: "Shopping Stop Advisory",
    warningLabel: "IMPORTANT NOTICE",
    body: "Shopping stops at designated stores may be included as part of the Hong Kong Morning City Tour itinerary. These stops support local businesses and are a standard part of the guided tour program.",
    rules: [
      "There is NO OBLIGATION to purchase anything at shopping stops — participation in browsing is expected but buying is entirely voluntary.",
      "Tour schedules at shopping stops are subject to change without prior notice.",
      "Do NOT separate from the group during shopping stops — wait for the guide's instruction before moving.",
      "PERSONAL TRANSACTIONS on behalf of others (buying goods, carrying items) are STRICTLY PROHIBITED.",
    ],
    penaltyNote: "⚠️ Passengers found engaging in prohibited personal transactions bear full personal legal and financial responsibility under Philippine Bureau of Customs and immigration regulations. Gladex Tours will not intervene in individual violations.",
  },

  // ─── 13. TRAVEL READINESS CHECKLIST ──────────────────────────────────────
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

  // ─── 14. WHAT TO BRING ───────────────────────────────────────────────────
  whatToBring: [
    { icon: "👟", label: "Comfortable walking shoes (Hong Kong has many hills and stairs)" },
    { icon: "👕", label: "Light, breathable clothing (2–3 sets for warm weather)" },
    { icon: "🧥", label: "Light jacket or cardigan (AC in malls and restaurants is very cold)" },
    { icon: "🌂", label: "Compact umbrella or rain jacket" },
    { icon: "💴", label: "HKD cash (for tips, transport, meals, and optional tours)" },
    { icon: "💳", label: "International credit/debit card (widely accepted)" },
    { icon: "🎫", label: "Octopus card (for MTR, buses, and convenience stores)" },
    { icon: "📄", label: "Original passport (required at hotel check-in and everywhere)" },
    { icon: "🎟️", label: "Booking voucher (saved on phone or printed)" },
    { icon: "🔋", label: "Portable charger / power bank (for full-day tours)" },
    { icon: "🔌", label: "Universal power adapter (Hong Kong uses Type G — British 3-pin plugs, 220V)" },
    { icon: "🧴", label: "Sunscreen and personal toiletries" },
    { icon: "💊", label: "Personal medication (and prescription documents if needed)" },
    { icon: "🎒", label: "Small daypack for tour days" },
    { icon: "😷", label: "Face mask (optional, but useful in crowded MTR stations)" },
  ],

  // ─── 15. CONNECTIVITY GUIDE ──────────────────────────────────────────────
  connectivityGuide: {
    intro: "Hong Kong has excellent mobile connectivity. Free WiFi is available throughout the city, and SIM/eSIM options are affordable and easy to set up.",
    options: [
      {
        title: "Free Airport WiFi",
        icon: "🛜",
        recommended: true,
        description: "Hong Kong International Airport offers free high-speed WiFi throughout all terminals — connect immediately upon arrival.",
        cost: "Free",
      },
      {
        title: "eSIM (Recommended)",
        icon: "📱",
        recommended: true,
        description: "Purchase an eSIM before departure from your Philippines network provider or from an eSIM app. Activates automatically upon arrival in HK.",
        providers: [
          { name: "Globe eSIM", note: "Available via Globe app — purchase before departure" },
          { name: "Smart eSIM", note: "Available via Smart app — purchase before departure" },
          { name: "Airalo / Nomad", note: "Third-party eSIM apps — affordable HK data packages" },
        ],
        cost: "Approx. PHP 200–400 for 5–7 days of data",
      },
      {
        title: "Local SIM Card",
        icon: "📶",
        recommended: false,
        description: "Available at the airport upon arrival and at 7-Eleven and Circle K stores throughout the city.",
        providers: [
          { name: "3HK", note: "Best data speeds for tourists" },
          { name: "SmarTone", note: "Good city coverage" },
          { name: "7-Eleven SIM", note: "Budget option — widely available" },
        ],
        cost: "Approx. HKD 50–100 for a tourist SIM with data",
      },
      {
        title: "International Roaming",
        icon: "🌐",
        recommended: false,
        description: "Activate international roaming with your Philippine network before departure.",
        providers: [
          { name: "Globe", note: "GoRoam pass — check Globe app" },
          { name: "Smart", note: "International Roam pass — check Smart app" },
        ],
        cost: "Varies by provider — confirm rates before leaving",
      },
      {
        title: "Free City WiFi",
        icon: "🏙️",
        recommended: false,
        description: "Government Free WiFi.HK hotspots are available in public areas, MTR stations, and tourist spots across the city.",
        cost: "Free",
      },
    ],
    tips: [
      "WhatsApp, Messenger, Facebook, Instagram, and Google all work normally in Hong Kong.",
      "Hong Kong does NOT have internet restrictions — unlike mainland China.",
      "Download the MTR Mobile app before departure — it has offline maps and route planning.",
      "Save important contact numbers and addresses to your phone before relying on data.",
    ],
  },

  // ─── 16. CURRENCY GUIDE ──────────────────────────────────────────────────
  currencyGuide: {
    currency: "Hong Kong Dollar (HKD)",
    symbol: "HK$",
    exchangeRate: "Approximately PHP 1 = HKD 0.14–0.15 (rate varies daily — check before exchanging)",
    usdNote: "USD is NOT widely accepted in shops and restaurants — exchange to HKD before spending. Credit cards are widely accepted at malls and tourist spots.",
    recommendedCash: "Prepare HKD 2,000–3,000 for 4 days: tipping (HKD 50 compulsory), transport, optional tours, meals, and shopping.",
    whereToExchange: [
      { place: "HKIA Airport Money Changers", note: "Convenient upon arrival but rates are slightly lower — exchange a small amount here" },
      { place: "Authorized Banks (HSBC, Hang Seng)", note: "Best rates — bring your passport for larger transactions" },
      { place: "Chungking Mansions, Tsim Sha Tsui", note: "Well-known money changer area — compare rates between shops, always count in front of teller" },
      { place: "ATMs (HSBC, Standard Chartered, Citibank)", note: "Withdraw HKD directly — check if your Philippine bank charges international withdrawal fees" },
    ],
    tips: [
      "Always count your money in front of the teller after exchanging.",
      "Do NOT exchange money with street vendors or unauthorized changers.",
      "Credit and debit cards are accepted in most restaurants, hotels, malls, and tourist attractions.",
    ],
    roughPrices: [
      { item: "MTR single journey (cross-harbour)", price: "HKD 15–30 ≈ PHP 100–200" },
      { item: "Convenience store meal (7-Eleven)", price: "HKD 30–50 ≈ PHP 200–330" },
      { item: "Local cha chaan teng lunch", price: "HKD 60–100 ≈ PHP 400–670" },
      { item: "Restaurant dinner (mid-range)", price: "HKD 120–200 ≈ PHP 800–1,330" },
      { item: "Octopus card (initial load + deposit)", price: "HKD 150 deposit + HKD 100–200 load ≈ PHP 1,000–2,330 total" },
      { item: "Souvenir magnet / item (tourist shop)", price: "HKD 20–50 ≈ PHP 130–330" },
    ],
  },

  // ─── 17. DESTINATION GUIDE ───────────────────────────────────────────────
  destinationGuide: {
    intro: "Hong Kong is a world-class destination combining ultramodern skyscrapers, traditional Chinese culture, world-famous harbours, and world-class shopping — all in a compact, walkable city.",
    highlights: [
      {
        icon: "⭐",
        name: "Avenue of Stars, Tsim Sha Tsui",
        description: "Hong Kong's tribute to its film legends, located along the Kowloon waterfront with stunning views of Victoria Harbour and the Hong Kong skyline.",
        img: "/images/destinations/hongkong/places/avenue-of-stars-tsim-sha-tsui.jpg",
      },
      {
        icon: "🌊",
        name: "Victoria Harbour",
        description: "One of the world's great natural harbours and Hong Kong's iconic centrepiece. The Symphony of Lights show takes place nightly at 8 PM along the harbour.",
        img: "/images/destinations/hongkong/places/victoria-harbour.jpg",
      },
      {
        icon: "🏛️",
        name: "West Kowloon Cultural District",
        description: "Hong Kong's new arts hub — home to M+ Museum and the Hong Kong Palace Museum, showcasing art and cultural heritage in a stunning waterfront setting.",
        img: "/images/destinations/hongkong/places/west-kowloon-cultural-district.jpg",
      },
      {
        icon: "🏯",
        name: "Hong Kong Palace Museum",
        description: "A world-class museum at West Kowloon, displaying imperial Chinese treasures and cultural artifacts from the Palace Museum collection in Beijing.",
        img: "/images/destinations/hongkong/places/hong-kong-palace-museum.jpg",
      },
      {
        icon: "🛍️",
        name: "Tsim Sha Tsui",
        description: "The heart of tourist Hong Kong — Nathan Road, Harbour City shopping mall, night market, and the iconic Kowloon waterfront. Walkable from most hotels.",
        img: "/images/destinations/hongkong/places/tsim-sha-tsui.jpg",
      },
      {
        icon: "🏰",
        name: "Hong Kong Disneyland",
        description: "Asia's most magical theme park featuring seven themed lands. Included in the Disneyland package or available as an optional tour for Free & Easy bookings.",
        img: "/images/destinations/hongkong/places/hong-kong-disneyland.jpg",
      },
      {
        icon: "🚡",
        name: "Victoria Peak (The Peak)",
        description: "Hong Kong's most visited attraction — ride the historic Peak Tram to the summit for a breathtaking 360° panorama over the city, harbour, and surrounding islands.",
        img: "/images/destinations/hongkong/places/victoria-peak.jpg",
      },
      {
        icon: "🛕",
        name: "Wong Tai Sin Temple",
        description: "One of Hong Kong's most famous Taoist temples, renowned for its colourful architecture and the belief that prayers made here are always answered. A vibrant cultural experience.",
        img: "/images/destinations/hongkong/places/wong-tai-sin-temple.jpg",
      },
      {
        icon: "🌿",
        name: "Nan Lian Garden",
        description: "A stunning Tang-dynasty style classical Chinese garden in Diamond Hill, featuring immaculately manicured trees, pavilions, a lotus pond, and the beautiful Chi Lin Nunnery next door.",
        img: "/images/destinations/hongkong/places/nan-lian-garden.jpg",
      },
      {
        icon: "🗿",
        name: "Tian Tan Buddha (Lantau Island)",
        description: "The world's largest seated outdoor bronze Buddha, located on Lantau Island and reachable via the spectacular Ngong Ping 360 cable car. Surrounded by a striking monastery complex.",
        img: "/images/destinations/hongkong/places/tian-tan-buddha.jpg",
      },
      {
        icon: "🌃",
        name: "Temple Street Night Market",
        description: "Kowloon's most famous night market — rows of stalls selling antiques, jade, street food, and souvenirs. Cantonese opera performers and fortune tellers add to the vibrant atmosphere.",
        img: "/images/destinations/hongkong/places/temple-street-night-market.jpg",
      },
      {
        icon: "🚂",
        name: "Star Ferry",
        description: "Hong Kong's beloved 125-year-old ferry service crossing Victoria Harbour between Tsim Sha Tsui and Central. Offers one of the world's great scenic harbour crossings for just HKD 3.40.",
        img: "/images/destinations/hongkong/places/star-ferry.jpg",
      },
    ],
    practicalInfo: [
      {
        label: "Time Zone",
        value: "HKT (UTC+8) — same as the Philippines (PST UTC+8). No clock adjustment needed.",
      },
      {
        label: "Language",
        value: "Cantonese is the local language. English is widely spoken in tourist areas, hotels, restaurants, and the MTR.",
      },
      {
        label: "Climate",
        value: "Subtropical. Hot and humid in summer (April–September). Cooler and drier October–March. Average 25–32°C in summer. Indoor AC is very cold — carry a jacket.",
      },
      {
        label: "Transport",
        value: "MTR (subway) is the fastest and cheapest way to get around. Octopus Card works on MTR, buses, trams, ferries, and 7-Eleven. Taxis are metered and honest.",
      },
      {
        label: "Electricity",
        value: "220V, 50Hz. Plug type G (British 3-pin). Philippine plugs (Type A) will NOT fit without an adapter — purchase one at the airport or 7-Eleven.",
      },
    ],
    bestFood: [
      {
        name: "Dim Sum",
        desc: "Hong Kong's most iconic culinary tradition — bite-sized steamed and fried dumplings, buns, and rolls served in bamboo steamers with hot tea (yum cha). Best enjoyed at a busy local teahouse for breakfast or lunch.",
        img: "/images/destinations/hongkong/food/dim-sum.jpg",
      },
      {
        name: "Egg Tarts (Dan Tat)",
        desc: "A beloved Hong Kong pastry — silky, lightly sweet egg custard in a flaky or crumbly pastry shell, best eaten fresh from the oven at legendary bakeries like Tai Cheong or Hon's Wun Tun Noodle.",
        img: "/images/destinations/hongkong/food/egg-tarts.jpg",
      },
      {
        name: "Wonton Noodle Soup",
        desc: "A quintessential Hong Kong comfort food — thin, springy egg noodles in a clear, flavourful prawn and pork broth topped with plump wontons. A staple of traditional Hong Kong cha chaan tengs.",
        img: "/images/destinations/hongkong/food/wonton-noodle-soup.jpg",
      },
      {
        name: "Pineapple Bun (Bo Lo Bao)",
        desc: "Despite the name, this classic Hong Kong bakery bread contains no pineapple — its golden, crinkled sugar crust simply resembles a pineapple skin. Best enjoyed warm with a thick slab of cold butter inside.",
        img: "/images/destinations/hongkong/food/pineapple-bun.jpg",
      },
      {
        name: "Roast Goose",
        desc: "Hong Kong's most celebrated roasted meat — crispy, lacquered skin over succulent, flavourful meat. Yung Kee in Central is legendary, but local roast meat shops throughout Kowloon serve exceptional versions.",
        img: "/images/destinations/hongkong/food/roast-goose.jpg",
      },
    ],
    photoSpots: [
      {
        name: "Victoria Peak Panorama",
        desc: "The skyline view from The Peak — a sweeping panorama of skyscrapers rising from the harbour against the Kowloon hills — is one of the world's most spectacular urban vistas, especially at dusk.",
        img: "/images/destinations/hongkong/photo-spots/victoria-peak-panorama.jpg",
      },
      {
        name: "Tsim Sha Tsui Promenade (Kowloon Skyline)",
        desc: "The waterfront promenade in Tsim Sha Tsui looking back at the Hong Kong Island skyline across Victoria Harbour is the city's most iconic daytime and nighttime photography spot.",
        img: "/images/destinations/hongkong/photo-spots/tsim-sha-tsui-promenade.jpg",
      },
      {
        name: "Wong Tai Sin Temple",
        desc: "The vivid yellow, red, and gold architecture of Wong Tai Sin Temple against a clear sky — especially during morning incense offering hours — creates a rich, colourful, and atmospheric photograph.",
        img: "/images/destinations/hongkong/photo-spots/wong-tai-sin-temple.jpg",
      },
      {
        name: "Tian Tan Buddha, Lantau Island",
        desc: "The 34-metre bronze Buddha emerging from the mountain mist above Po Lin Monastery, approached via 268 steps, creates one of Hong Kong's most majestic and serene photographic subjects.",
        img: "/images/destinations/hongkong/photo-spots/tian-tan-buddha.jpg",
      },
      {
        name: "Nan Lian Garden",
        desc: "The perfectly composed classical Chinese garden — ancient-style pavilions, pine trees, and a still lotus pond — provides a tranquil, painterly contrast to Hong Kong's urban skyline visible in the distance.",
        img: "/images/destinations/hongkong/photo-spots/nan-lian-garden.jpg",
      },
    ],
    localTips: [
      { icon: "💡", tip: "On escalators, stand on the right side and keep the left lane clear for people walking. This is a firm Hong Kong custom and locals take it seriously." },
      { icon: "💡", tip: "Bargaining is acceptable at Temple Street Night Market and Ladies' Market in Mong Kok — start at 50-60% of the asking price and negotiate politely." },
      { icon: "💡", tip: "Many Hong Kong restaurants and cha chaan tengs stay open until 1:00–2:00 AM — late-night meals are a normal part of local life." },
      { icon: "💡", tip: "Avoid the Peak Tram on weekends and public holidays — queues can exceed 2 hours. Take a taxi or minibus to the Peak instead, or visit on a weekday morning." },
    ],
    safetyTips: [
      { icon: "🛡️", tip: "Hong Kong is one of the world's safest cities — violent crime against tourists is extremely rare and petty crime is uncommon." },
      { icon: "🛡️", tip: "Be mindful of your belongings in heavily crowded tourist areas like Mong Kok street markets and busy MTR stations during peak hours." },
      { icon: "🛡️", tip: "Stay hydrated — Hong Kong's summer humidity (April–September) is extreme and heat-related illness is a real risk for tourists not acclimatised to tropical heat." },
      { icon: "🛡️", tip: "Typhoon season runs May to November. Pay attention to typhoon signal announcements — if Signal T8 or above is raised, all businesses, transport, and attractions close. Your hotel will keep you informed." },
      { icon: "🛡️", tip: "Avoid confrontations of any kind — while safe, Hong Kong has firm public order laws and any disturbance can result in police attention." },
      { icon: "🛡️", tip: "In case of emergency, call 999 — it covers Police, Fire, and Ambulance. English-speaking operators are always available." },
    ],
  },

  // ─── 18. EMERGENCY CONTACTS ──────────────────────────────────────────────
  emergencyContacts: [
    {
      category: "Gladex Tours",
      icon: "🧡",
      contacts: [
        {
          label: "Gladex Hotline",
          value: "+63 917 875 2200",
          type: "phone",
        },
        {
          label: "Gladex WhatsApp",
          value: "+63 917 875 2200",
          type: "whatsapp",
          url: "https://wa.me/639178752200",
        },
        {
          label: "Gladex Messenger",
          value: "m.me/GladexTours",
          type: "messenger",
          url: "https://m.me/771470123003758",
        },
      ],
    },
    {
      category: "Hong Kong Emergency",
      icon: "🚨",
      contacts: [
        { label: "Police / Fire / Ambulance (Emergency)", value: "999", type: "phone" },
        { label: "Non-Emergency Police Enquiry", value: "2527 7177", type: "phone" },
        { label: "Hong Kong Tourism Board Visitor Hotline", value: "2508 1234", type: "phone" },
      ],
    },
    {
      category: "Philippine Consulate General",
      icon: "🇵🇭",
      contacts: [
        {
          label: "Philippine Consulate General (Hong Kong)",
          value: "+852 2823 8500",
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
      category: "Airport & Transport",
      icon: "✈️",
      contacts: [
        { label: "Hong Kong International Airport (HKIA)", value: "2181 8888", type: "phone" },
        { label: "MTR Customer Service", value: "2881 8888", type: "phone" },
      ],
    },
    {
      category: "Local Transfer and Tour Operations Team",
      icon: "🚐",
      contacts: [
        { label: "Local Transfer and Tour Operations Team (Hong Kong)", value: "+852 6822 7223", type: "phone" },
      ],
    },
  ],

  // ─── 19. DO'S AND DON'TS ─────────────────────────────────────────────────
  dosAndDonts: {
    dos: [
      "Carry your passport at all times — Hong Kong hotels and immigration may require it.",
      "Follow the tour guide's instructions during city tour stops and shopping visits.",
      "Download the MTR Mobile app before departure for easy navigation around the city.",
      "Keep your Gladex booking voucher accessible at all times (phone screenshot or printout).",
      "Inform your guide immediately of any medical issues, emergencies, or concerns.",
      "Respect quiet zones on the MTR — avoid loud conversations and phone calls.",
    ],
    donts: [
      "Do NOT eat, drink, or chew gum on the MTR — fines apply (HKD 5,000).",
      "Do NOT be late at group departure times — the vehicle departs on schedule.",
      "Do NOT book separate city tours or transfer services outside the Gladex itinerary.",
      "Do NOT photograph restricted areas (government buildings, certain museums).",
      "Do NOT bring large amounts of undeclared cash — declare amounts over USD 15,000 at customs.",
      "Do NOT bring prohibited items (restricted food, agricultural products, controlled substances).",
    ],
  },

  // ─── 20. FAQs ────────────────────────────────────────────────────────────
  faqs: [
    {
      q: "Do I need a visa to enter Hong Kong?",
      a: "No. Philippine passport holders can enter Hong Kong visa-free for up to 14 days. No visa application, no fees, and no pre-approval is needed. You simply present your passport to the immigration officer upon arrival.",
    },
    {
      q: "What currency is used in Hong Kong, and how much cash should I bring?",
      a: "Hong Kong uses the Hong Kong Dollar (HKD). We recommend bringing at least HKD 2,000–3,000 for the 4-day trip — this covers the compulsory tipping (HKD 50/pax), Octopus Card, personal meals, and light shopping. Credit cards are accepted at most restaurants, malls, and tourist sites.",
    },
    {
      q: "Is tipping mandatory in Hong Kong?",
      a: "The compulsory tipping fee of HKD 50 per person for the tour guide and driver is required as part of the package terms. Beyond that, a 10% service charge is typically already included in restaurant bills, so additional tipping is at your discretion.",
    },
    {
      q: "What is the Octopus Card and do I need one?",
      a: "The Octopus Card is a rechargeable smart card used for the MTR (subway), buses, trams, ferries, and payment at convenience stores and some restaurants. It is highly recommended — it saves time and is cheaper than buying individual tickets. Purchase at HKIA upon arrival or at 7-Eleven stores.",
    },
    {
      q: "Is Disneyland included in all Hong Kong packages?",
      a: "Disneyland is included in the GDX-CNHK1B2 (4D3N with Disneyland + City Tour) package. It is an optional tour (at extra cost) for the GDX-CNHK1B1 (Free & Easy) package. Confirm your package code from your booking confirmation to know what is included.",
    },
    {
      q: "Can I go to Macau from Hong Kong?",
      a: "Yes, Macau is a short 55-minute ferry ride from Hong Kong. However, Philippine passport holders require a Macau visa (separate from Hong Kong) — apply in advance or on arrival at the Macau ferry terminal. The Macau Day Tour is an optional add-on available through Gladex at extra cost.",
    },
    {
      q: "What happens if my room is not ready when I arrive?",
      a: "Standard hotel check-in is 2–3 PM. If you arrive earlier, the hotel will hold your luggage securely and you may explore the city. Early check-in is subject to availability and cannot be guaranteed. Contact your guide if you need assistance.",
    },
    {
      q: "Is the breakfast coupon enough for a full meal?",
      a: "The breakfast coupon is valued at HKD 20 per person per day — this typically covers a simple breakfast set (bread, eggs, coffee) at the hotel restaurant. Some hotels may accept it as a credit toward a larger breakfast if you pay the difference.",
    },
    {
      q: "What if I am left behind by the group during a tour?",
      a: "If separated from the group, call your tour guide immediately using the number provided. As a backup, Hong Kong is extremely safe and MTR-connected — most hotel addresses are easy to communicate to an MTR station master or taxi driver. Do not panic — contact your guide first.",
    },
    {
      q: "Is Hong Kong safe for Filipino tourists?",
      a: "Yes. Hong Kong consistently ranks as one of the world's safest cities. The MTR is reliable and staff are helpful. English is widely spoken. Petty crime is rare, though standard precautions apply — watch your belongings in crowded areas like Mong Kok and Causeway Bay.",
    },
    {
      q: "Can I use my Philippine phone/SIM in Hong Kong?",
      a: "Yes, through international roaming (check with Globe or Smart for roaming passes). Alternatively, eSIM options (Airalo, Nomad, Globe eSIM) offer affordable data packages. A local SIM is available at the airport and 7-Eleven. Hong Kong has no internet restrictions — all apps work normally.",
    },
    {
      q: "What is the midnight transfer surcharge?",
      a: "Any transfer between 12:00 midnight and 6:00 AM incurs an additional surcharge from the transport provider. This surcharge is NOT included in the package and will be collected separately. To avoid this, arrange flights and transfers that arrive or depart during regular hours where possible.",
    },
  ],

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
};
