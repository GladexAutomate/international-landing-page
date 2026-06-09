// @ts-nocheck
export const phuketBriefing = {
  slug: "phuket",
  welcomeMessage: "Welcome to Phuket! This briefing covers everything you need for a smooth and unforgettable trip to Thailand's most celebrated island.",

  briefingInclusions: [
    "Round-trip airfare (Manila – Phuket International Airport, HKT)",
    "Hotel accommodation with daily breakfast",
    "Airport transfers (arrival & departure)",
    "Half-day Phuket city/island orientation tour",
    "Use of hotel amenities",
  ],

  briefingExclusions: [
    "Compulsory driver/guide tipping",
    "Fuel surcharge",
    "Travel insurance",
    "PH Travel Tax",
    "Personal expenses",
    "Optional tours and water activities",
    "Entrance fees (unless stated)",
    "Thailand TDAC registration fee (if applicable)",
  ],

  travelInformation: [
    { label: "Airlines", value: "Philippine Airlines, Cebu Pacific, AirAsia (via Bangkok or direct charters)" },
    { label: "Flight Duration", value: "Approximately 3.5 hours (Manila to Phuket International Airport)" },
    { label: "Flight Route", value: "Manila (MNL) → Phuket (HKT) — direct or via Bangkok" },
    { label: "Time Zone", value: "Indochina Time (ICT, UTC+7) — 1 hour behind Philippine Standard Time" },
    { label: "Best Time to Visit", value: "November to April (dry season). May–October is rainy season — some boat tours may be cancelled." },
    { label: "Language", value: "Thai. English widely spoken in tourist areas, hotels, and resorts." },
  ],

  arrivalInstructions: [
    { step: 1, text: "Proceed to Immigration — passport and arrival/departure card (TM.6) ready. Thailand TDAC registration may be required; complete before departure." },
    { step: 2, text: "Collect baggage at designated carousel after immigration clearance." },
    { step: 3, text: "Clear Customs — declare applicable items. Duty-free allowance: 1 liter of alcohol, 200 cigarettes." },
    { step: 4, text: "Meet Gladex Tours representative at the arrivals hall exit — look for your name on a board." },
    { step: 5, text: "Transfer to hotel/resort. Standard check-in is 14:00 — early check-in subject to availability." },
  ],

  transferInstructions: {
    overview: "Private transfers are arranged for both arrival and departure. Your driver will be waiting at the arrivals hall.",
    notes: [
      "Driver will display your name on a sign at the arrivals exit.",
      "Transfer time from Phuket Airport to Patong area is approximately 45–60 minutes.",
      "Inform Gladex Tours at least 24 hours in advance of any flight schedule changes.",
      "Do not accept rides from unauthorized taxi touts inside the arrivals hall.",
    ],
  },

  hotelInformation: {
    checkIn: "14:00 (2:00 PM)",
    checkOut: "12:00 (12:00 PM)",
    notes: "Early check-in and late check-out are subject to availability and may incur additional charges. A security deposit may be required at resort properties. Store passport and valuables in the in-room safe.",
  },

  reminders: [
    "Apply sunscreen SPF 50+ generously before going outdoors and reapply every 2 hours.",
    "Stay well-hydrated — Phuket's tropical heat can be intense, especially midday.",
    "Keep passport, travel documents, and valuables in the hotel room safe.",
    "Respect marine life — no touching, standing on, or collecting coral reefs.",
    "Carry Thai Baht (THB) for local markets, street food, and smaller vendors.",
    "Dress modestly when visiting Wat Chalong and Big Buddha — cover shoulders and knees.",
    "Complete Thailand's TDAC (Thailand Digital Arrival Card) online before departure.",
    "Negotiate taxi or tuk-tuk fares before boarding — always agree on the price upfront.",
  ],

  immigrationAdvisory: [
    "Passport must be valid for at least 6 months beyond your travel return date.",
    "Philippine passport holders enjoy visa-free entry to Thailand for up to 30 days.",
    "Complete the Thailand Digital Arrival Card (TDAC) online before departure — required for all arrivals.",
    "Fill in the TM.6 arrival/departure card accurately on the aircraft or at the airport.",
    "Declare all applicable items at Customs — undeclared goods may be confiscated.",
    "Have your hotel name and address accessible during immigration screening.",
  ],

  shoppingAdvisory: [
    "Shop at licensed vendors, reputable malls (Jungceylon, Central Festival), and authorized stores.",
    "Bargaining is acceptable at local markets (Weekend Market, Sunday Night Market) — be friendly and patient.",
    "Keep all receipts for purchases, especially electronics and gems.",
    "Beware of unofficial gem or tailor touts near tourist beaches — many are scams.",
    "Avoid purchasing counterfeit goods — Thai customs penalties are strict.",
    "Tailor shops along Patong Beach Road offer quick turnarounds — inspect quality carefully before paying.",
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
    { label: "Swimwear and rash guard for beach and water activities" },
    { label: "Comfortable walking sandals and closed-toe shoes for temple visits" },
    { label: "Lightweight sarong or scarf for temple entry dress code" },
    { label: "Motion sickness medication (for Phi Phi Island boat trips)" },
    { label: "Waterproof dry bag for island hopping and water activities" },
    { label: "Insect repellent for evening outdoor activities" },
    { label: "Small day backpack for beach and island day trips" },
    { label: "Cash in Thai Baht — exchange at airport or authorized money changers" },
  ],

  connectivityGuide: {
    overview: "Thailand has excellent 4G/5G mobile coverage throughout Phuket. Tourist SIM cards are available at the airport and are the best value option for staying connected.",
    simOptions: [
      { provider: "AIS", type: "Tourist SIM", data: "Unlimited 4G (capped speed after 30GB)", validity: "8 days", price: "฿299 (~₱460)", notes: "Best overall coverage across the island — available at airport counter upon arrival" },
      { provider: "DTAC (True Move H)", type: "Tourist SIM", data: "15 GB high-speed", validity: "7 days", price: "฿299 (~₱460)", notes: "Good speeds in tourist areas; available at airport and 7-Eleven" },
      { provider: "True Move H", type: "Tourist SIM", data: "30 GB", validity: "7 days", price: "฿299 (~₱460)", notes: "Strong signal in Patong and Kata Beach zones" },
    ],
    wifi: "All hotels provide complimentary WiFi. Most restaurants, cafes, and 7-Eleven stores offer free WiFi. Signal can be spotty on remote beaches and boat trips.",
    recommendations: "Purchase a tourist SIM immediately upon arriving at Phuket Airport — counters are in the arrivals hall. Download Google Maps offline before departure. Grab app works throughout Phuket for affordable rides.",
  },

  currencyGuide: {
    currency: "Thai Baht",
    symbol: "฿",
    code: "THB",
    exchangeRate: "₱1 ≈ ฿0.58 (approximate — check current rate before exchanging)",
    roughPrices: [
      { item: "Street food / convenience store snack", price: "฿50–80 (~₱85–135)" },
      { item: "Local restaurant meal", price: "฿150–300 (~₱260–520)" },
      { item: "Seafood dinner (mid-range restaurant)", price: "฿300–600 (~₱520–1,035)" },
      { item: "Fresh coconut / cold drink", price: "฿40–60 (~₱70–100)" },
      { item: "Grab / taxi base fare (short trip)", price: "฿50–120 (~₱85–200)" },
      { item: "Bottle of local beer (Chang/Singha)", price: "฿60–90 (~₱100–155)" },
    ],
    tips: [
      "Exchange at authorized money changers (SuperRich, Vasu Exchange) for significantly better rates than banks.",
      "Airport exchange rates are lower — exchange a small amount at arrival, then exchange the bulk in Patong town.",
      "Notify your Philippine bank of your travel dates before departure to prevent card blocks.",
      "ATMs are widely available — choose 'No Conversion' to avoid dynamic currency conversion fees.",
      "Keep small bills (฿20–฿100) for tuk-tuks, market stalls, and beach vendors.",
      "Major hotels and shopping malls accept Visa/Mastercard; street markets and small vendors are cash only.",
    ],
  },

  destinationGuide: {
    intro: "Phuket is Thailand's largest and most popular island — a tropical paradise with world-class beaches, vibrant nightlife, ornate temples, and crystal-clear Andaman Sea waters. From the energetic bustle of Patong to the serene cliffs of Promthep Cape, Phuket offers an unforgettable blend of culture, nature, and adventure.",
    highlights: [
      {
        icon: "🏖️",
        name: "Patong Beach",
        description: "Phuket's most famous and lively beach — 3 km of golden sand, buzzing beachfront restaurants, watersports, and the famous Bangla Road just steps away.",
        img: "/images/destinations/phuket/places/patong-beach.jpg",
      },
      {
        icon: "🌊",
        name: "Kata Beach",
        description: "A beautiful crescent-shaped beach south of Patong, beloved for its clear turquoise water, gentle surf, and relaxed family-friendly atmosphere.",
        img: "/images/destinations/phuket/places/kata-beach.jpg",
      },
      {
        icon: "🏄",
        name: "Karon Beach",
        description: "One of Phuket's longest beaches — wide, uncrowded white-sand shoreline with a lively town behind it offering restaurants, bars, and shops.",
        img: "/images/destinations/phuket/places/karon-beach.jpg",
      },
      {
        icon: "🙏",
        name: "Big Buddha (Phra Putthamingmongkol Akenakkiri)",
        description: "A 45-metre white marble Buddha statue visible from across the island, offering breathtaking panoramic views of Phuket from its hilltop perch.",
        img: "/images/destinations/phuket/places/big-buddha.jpg",
      },
      {
        icon: "🛕",
        name: "Wat Chalong Temple",
        description: "Phuket's most important and revered Buddhist temple — ornate, gold-spired, and beautifully peaceful. Dress modestly and remove shoes before entering.",
        img: "/images/destinations/phuket/places/wat-chalong.jpg",
      },
      {
        icon: "🏛️",
        name: "Phuket Old Town",
        description: "Sino-Portuguese shophouse architecture, vibrant street art, boutique cafes, and local heritage museums in the island's charming historic quarter.",
        img: "/images/destinations/phuket/places/phuket-old-town.jpg",
      },
      {
        icon: "🎉",
        name: "Bangla Road (Patong Nightlife)",
        description: "Phuket's legendary entertainment street transforms at night into a dazzling strip of live music, neon lights, rooftop bars, and street performances.",
        img: "/images/destinations/phuket/places/bangla-road.jpg",
      },
      {
        icon: "⛵",
        name: "Phi Phi Island",
        description: "A stunning island group 45 minutes by speedboat — turquoise lagoons, towering limestone cliffs, and the iconic Maya Bay made famous by 'The Beach.'",
        img: "/images/destinations/phuket/places/phi-phi-island.jpg",
      },
      {
        icon: "🪨",
        name: "Phang Nga Bay / James Bond Island",
        description: "Dramatic limestone karsts rising from emerald water — explored by longtail boat or sea kayak. James Bond Island (Ko Tapu) is a UNESCO-recognized site.",
        img: "/images/destinations/phuket/places/phang-nga-bay.jpg",
      },
      {
        icon: "🌅",
        name: "Promthep Cape Viewpoint",
        description: "Phuket's most famous sunset viewpoint at the island's southern tip — panoramic views over the Andaman Sea that draw crowds every evening.",
        img: "/images/destinations/phuket/places/promthep-cape.jpg",
      },
      {
        icon: "🥊",
        name: "Bangla Boxing Stadium",
        description: "Watch live Muay Thai fights at this iconic stadium on Bangla Road — authentic, thrilling, and one of Phuket's most unique cultural experiences.",
        img: "/images/destinations/phuket/places/bangla-boxing-stadium.jpg",
      },
      {
        icon: "🛍️",
        name: "Sunday Night Market (Phuket Town)",
        description: "Phuket's beloved Walking Street — rows of local food stalls, handmade crafts, fresh fruit, and live music every Sunday evening in the old town.",
        img: "/images/destinations/phuket/places/sunday-night-market.jpg",
      },
    ],
    practicalInfo: [
      { label: "Best Time to Visit", value: "November to April (dry season, calm seas). May to October is monsoon season — some boat tours may be suspended." },
      { label: "Language", value: "Thai. English is widely spoken at hotels, resorts, tourist restaurants, and major attractions." },
      { label: "Weather", value: "Tropical — hot and humid year-round. Dry season averages 28–34°C. Rainy season brings afternoon downpours but is still warm." },
      { label: "Time Zone", value: "ICT (UTC+7) — 1 hour behind the Philippines (PST UTC+8). Set your watch back 1 hour upon arrival." },
      { label: "Currency", value: "Thai Baht (฿ / THB). ATMs widely available. Authorized money changers offer better rates than banks or airport counters." },
      { label: "Water Activities", value: "Snorkeling, scuba diving, sea kayaking, jet skiing, parasailing, surfing (Kata/Karon), longtail boat tours — all widely available." },
    ],
    bestFood: [
      {
        name: "Tom Kha Gai",
        desc: "Creamy coconut milk soup with galangal, lemongrass, kaffir lime leaves, and chicken — fragrant, mildly spicy, and deeply comforting.",
        img: "/images/destinations/phuket/food/tom-kha-gai.jpg",
      },
      {
        name: "Pad See Ew",
        desc: "Wide flat rice noodles stir-fried with egg, Chinese broccoli, and your choice of protein in a rich sweet soy sauce — a Phuket street food staple.",
        img: "/images/destinations/phuket/food/pad-see-ew.jpg",
      },
      {
        name: "Moo Ping",
        desc: "Juicy grilled pork skewers marinated in fish sauce, garlic, and palm sugar — sold at every street corner and best enjoyed with sticky rice.",
        img: "/images/destinations/phuket/food/moo-ping.jpg",
      },
      {
        name: "Phuket Lobster",
        desc: "Fresh local lobster grilled with garlic butter or steamed with lime and chili — a must-try at beachfront seafood restaurants along Rawai and Kata.",
        img: "/images/destinations/phuket/food/phuket-lobster.jpg",
      },
      {
        name: "Roti with Condensed Milk",
        desc: "Flaky pan-fried flatbread drizzled with sweetened condensed milk and sugar — Phuket's beloved late-night street dessert, served hot from the griddle.",
        img: "/images/destinations/phuket/food/roti-condensed-milk.jpg",
      },
    ],
    photoSpots: [
      {
        name: "Promthep Cape at Sunset",
        desc: "Arrive 30–45 minutes before sunset to secure a spot on the observation deck. The golden light over the Andaman Sea is spectacular — one of Asia's best sunset viewpoints.",
        img: "/images/destinations/phuket/photo-spots/promthep-cape-sunset.jpg",
      },
      {
        name: "Big Buddha Panoramic View",
        desc: "The hilltop grounds around the Big Buddha offer sweeping 360° views of Phuket's coastline. Best in the morning when the air is clear and before the tour buses arrive.",
        img: "/images/destinations/phuket/photo-spots/big-buddha-view.jpg",
      },
      {
        name: "Patong Beach Shoreline",
        desc: "Early morning at Patong Beach offers calm waters, soft light, and nearly empty sand — perfect for wide-angle beach shots before the crowds arrive.",
        img: "/images/destinations/phuket/photo-spots/patong-beach-view.jpg",
      },
      {
        name: "Phang Nga Bay Limestone Karsts",
        desc: "The dramatic vertical karst towers rising from the emerald bay are best photographed from a longtail boat at water level — surreal and unforgettable.",
        img: "/images/destinations/phuket/photo-spots/phang-nga-bay-karsts.jpg",
      },
      {
        name: "Phi Phi Island Turquoise Viewpoint",
        desc: "The twin bays viewpoint on Koh Phi Phi Don offers one of Thailand's most iconic photographs — turquoise water framed between two limestone peaks.",
        img: "/images/destinations/phuket/photo-spots/phi-phi-viewpoint.jpg",
      },
    ],
    localTips: [
      { icon: "🛵", tip: "Rent a scooter (฿200–300/day) to explore the island at your own pace — but wear a helmet, as police checkpoints and fines are common." },
      { icon: "🚕", tip: "Negotiate taxi and tuk-tuk fares before boarding — meters are rarely used. Grab app offers fixed fares and is the safest option in town." },
      { icon: "🌙", tip: "Bangla Road comes alive from 9 PM — it is lively, safe, and endlessly entertaining even just as a walk-through spectacle." },
      { icon: "⏰", tip: "Visit Big Buddha early (7–9 AM) to avoid tour bus crowds and enjoy the peaceful atmosphere before the heat builds." },
      { icon: "🌧️", tip: "May to October is rainy season — afternoon showers are common but brief. Some boat trips to Phi Phi or Phang Nga may be cancelled during rough seas." },
      { icon: "🦞", tip: "For the freshest and best-priced seafood, head to Rawai Seafood Market — pick your own catch and have it cooked at nearby restaurants for a small fee." },
    ],
    safetyTips: [
      { icon: "🏊", tip: "Swim only between the red and yellow flags on all Phuket beaches — rip currents can be deadly, especially at Patong and Karon during monsoon season." },
      { icon: "⛵", tip: "Phi Phi Island speedboat trips can be rough in choppy conditions — bring motion sickness medication and wear your life jacket at all times." },
      { icon: "🪼", tip: "Jellyfish are common October–May. Wear a rash guard for ocean swimming. If stung, rinse with seawater (not fresh water) and seek medical help." },
      { icon: "🐠", tip: "Never touch, stand on, or collect coral reefs — it is illegal in Thailand and ecologically harmful. Use reef-safe sunscreen." },
      { icon: "🛡️", tip: "Keep bags zipped and phones inside pockets in Patong and markets — bag snatching by motorbike is uncommon but does occur." },
      { icon: "🚨", tip: "Emergency numbers: Police 191, Ambulance/Medical 1669, Tourist Police 1155 (English-speaking). Philippine Embassy Bangkok: +66-2-259-0139." },
    ],
  },

  emergencyContacts: {
    local: [
      { label: "Police Emergency", value: "191" },
      { label: "Medical Emergency / Ambulance", value: "1669" },
      { label: "Fire Department", value: "199" },
      { label: "Tourist Police (English-speaking)", value: "1155" },
    ],
    philippineConsulate: {
      label: "Philippine Embassy (Bangkok — covers Phuket)",
      value: "+66-2-259-0139",
      address: "760 Sukhumvit Road, Bangkok 10110, Thailand",
    },
  },

  assistanceContacts: [
    { label: "Gladex Tours Hotline", value: "+63 917 875 2200" },
    { label: "Email", value: "support@gladextours.com" },
    { label: "Facebook", value: "m.me/GladexTours" },
  ],

  dosAndDonts: {
    dos: [
      "Dress modestly when visiting temples — cover shoulders and knees, remove shoes at entrances.",
      "Negotiate transport fares before boarding any tuk-tuk or taxi without a meter.",
      "Apply reef-safe sunscreen before swimming or snorkeling near coral reefs.",
      "Complete the Thailand Digital Arrival Card (TDAC) online before your flight.",
      "Swim only in designated areas between lifeguard flags.",
      "Keep your passport in the hotel safe and carry a photocopy for daily use.",
    ],
    donts: [
      "Don't touch or disrespect Buddha images — it is illegal and deeply offensive in Thailand.",
      "Don't stand on or collect coral reefs during snorkeling — heavy fines apply.",
      "Don't exchange money with unauthorized street money changers.",
      "Don't leave valuables unattended on the beach or in visible areas of rental vehicles.",
      "Don't drink tap water — drink sealed bottled water only throughout your stay.",
      "Don't accept unlicensed gem or tailor tours from touts near tourist beaches.",
    ],
  },

  faqs: [
    {
      question: "Do I need a visa for Thailand?",
      answer: "Philippine passport holders enjoy visa-free entry to Thailand for up to 30 days. However, you must complete the Thailand Digital Arrival Card (TDAC) online before your flight. Ensure your passport is valid for at least 6 months beyond your travel date.",
    },
    {
      question: "What currency should I bring?",
      answer: "Thai Baht (THB / ฿) is the local currency. Exchange at authorized money changers (SuperRich, Vasu Exchange) for the best rates — much better than airport counters. ₱1 ≈ ฿0.58 approximately. Prepare enough Baht for personal expenses, activities, and shopping.",
    },
    {
      question: "What water activities are available?",
      answer: "Phuket offers snorkeling, scuba diving, sea kayaking, jet skiing, parasailing, banana boat rides, island hopping to Phi Phi and Phang Nga Bay, and surfing at Kata Beach. Most activities are bookable through your hotel, tour operators on the beach, or via Klook.",
    },
    {
      question: "What are the must-try local foods?",
      answer: "Top picks: Tom Kha Gai (coconut soup), Pad See Ew (noodles), Moo Ping (grilled pork skewers), Phuket lobster, and Roti with condensed milk for dessert. Head to the Sunday Night Market in Phuket Old Town for the best street food spread.",
    },
    {
      question: "Is swimming safe at Phuket beaches?",
      answer: "Yes, but always swim between the red and yellow lifeguard flags. Rip currents can be very strong, especially during monsoon season (May–October). Never swim alone or ignore warning flags. Jellyfish are seasonally present — a rash guard is recommended.",
    },
  ],
};
