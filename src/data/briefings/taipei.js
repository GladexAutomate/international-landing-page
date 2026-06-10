// @ts-nocheck
/**
 * Taipei, Taiwan — Complete Briefing Data
 * Slug: taipei
 *
 * This file is the single source of truth for the Taipei briefing page.
 * Update content here only — no changes to components required.
 */

export const taipeiBriefing = {
  slug: "taipei",
  welcomeMessage: "Welcome to Taipei! This briefing covers everything you need for a smooth and memorable trip to the vibrant capital of Taiwan.",

  briefingInclusions: [
    "Round-trip airfare (Manila – Taipei, Taoyuan International Airport)",
    "4 nights hotel accommodation",
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
    { label: "Airlines", value: "Cebu Pacific / Philippine Airlines / EVA Air / China Airlines" },
    { label: "Flight Duration", value: "~1.5 hours from Manila to Taipei (TPE)" },
    { label: "Time Zone", value: "China Standard Time (CST, UTC+8) — same as Philippine Standard Time" },
    { label: "Flight Route", value: "Manila (MNL) → Taipei Taoyuan (TPE)" },
    { label: "Best Time to Visit", value: "Autumn (October–December) and Spring (March–May) offer the most pleasant weather. Summers are hot and typhoon-prone; winters are mild." },
    { label: "Language", value: "Mandarin Chinese is the official language. English is widely spoken in tourist areas, night markets, MRT stations, and hotels." },
  ],

  arrivalInstructions: [
    { step: 1, text: "Proceed to Immigration at Taoyuan International Airport (TPE) — Philippine passport holders may enter visa-free for up to 14 days. Confirm current visa status before travel." },
    { step: 2, text: "Have your passport, return ticket, and hotel booking confirmation ready for the immigration officer." },
    { step: 3, text: "Collect your baggage at the designated carousel." },
    { step: 4, text: "Proceed to Customs and declare any applicable items." },
    { step: 5, text: "Look for your Gladex Tours representative outside the arrivals hall at Taoyuan Airport." },
    { step: 6, text: "Transfer to hotel in Taipei. Check-in is usually 14:00–15:00. Early check-in subject to availability." },
  ],

  transferInstructions: {
    overview: "Private transfers are arranged for arrival and departure at Taoyuan International Airport (TPE). Keep your voucher and hotel address readily accessible.",
    notes: [
      "Driver will be waiting at the arrivals hall with your name on a board.",
      "Inform Gladex Tours of any flight changes at least 24 hours in advance.",
      "The Taoyuan Airport MRT (A1 line) connects the airport directly to Taipei Main Station in approximately 35 minutes for independent travelers.",
    ],
  },

  hotelInformation: {
    checkIn: "15:00 (3:00 PM)",
    checkOut: "12:00 (12:00 PM)",
    notes: "Early check-in and late check-out subject to availability. Hotel security deposit may be required at check-in. Store valuables in the in-room safe.",
  },

  reminders: [
    "Keep your passport and travel documents safe at all times.",
    "Always carry a copy of your hotel address in Traditional Chinese for showing to taxi drivers.",
    "Stay with your group during guided tours.",
    "Be respectful of local customs — queue patiently, give up priority seats on MRT, and be mindful of no eating/drinking policies.",
    "Carry small denomination New Taiwan Dollars for night markets and small vendors.",
    "Confirm current visa-free status for Philippine passport holders before departure.",
    "Bring a compact umbrella — Taipei receives significant rainfall and weather can change quickly.",
  ],

  immigrationAdvisory: [
    "Philippine passport holders may enter Taiwan visa-free for up to 14 days for tourism — confirm current status at www.boca.gov.tw before departure as policies can change.",
    "Ensure your passport is valid for at least 6 months beyond your travel date.",
    "Fill in arrival/departure cards accurately with your hotel address in Taiwan.",
    "Declare all required items at Customs — Taiwan strictly prohibits bringing in certain food items (fresh fruit, meat) and agricultural products.",
    "Keep your return ticket, booking reference, and hotel address accessible during immigration.",
  ],

  shoppingAdvisory: [
    "Shop at reputable stores and licensed vendors — Eslite Bookstore, Taipei 101 Mall, and major department stores are reliable.",
    "Shilin Night Market and Raohe Night Market are best for affordable souvenirs, snacks, and local goods.",
    "Bargaining is generally not practiced in Taiwan — prices are fixed in most stores and markets.",
    "Keep receipts for all major purchases — Taiwan has a receipt lottery system (uniform invoices) where receipts double as lottery tickets.",
    "Pineapple cakes (fengli su) are the most popular Taiwanese souvenir — buy from Sunny Hills or Wu-Pao-Chun Bakery for the best quality.",
    "Be cautious of counterfeit goods in smaller street stalls.",
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
    { label: "EasyCard for MRT — purchase at Taoyuan Airport or any MRT station on arrival" },
    { label: "Portable umbrella — Taipei is one of the rainiest capitals in Asia, especially in autumn and winter" },
    { label: "Comfortable walking shoes — Taipei is a very walkable city with hills at Elephant Mountain and Jiufen" },
    { label: "Light layers — summer is hot and humid; hotel and MRT air conditioning can be very cold" },
    { label: "Small backpack for day trips to Jiufen, Yehliu, and night markets" },
    { label: "New Taiwan Dollar cash for night markets, small restaurants, and local vendors" },
    { label: "Universal travel adapter — Taiwan uses Type A plugs (110V); Philippine plugs fit but voltage is different from the Philippines" },
  ],

  connectivityGuide: {
    overview: "Taiwan has excellent mobile internet coverage. Tourist SIM cards are available at Taoyuan Airport on arrival and can also be pre-purchased via Airalo as an eSIM.",
    simOptions: [
      {
        provider: "Taiwan Mobile / Chunghwa Telecom",
        type: "Tourist Data SIM",
        data: "Unlimited (throttled after daily cap)",
        validity: "5 days",
        price: "NT$300",
        notes: "Available at Taoyuan Airport arrival hall telco counters. Passport required. Excellent nationwide coverage including Jiufen, Yehliu, and Beitou.",
      },
      {
        provider: "Airalo eSIM",
        type: "Tourist Unlimited Data eSIM",
        data: "Unlimited (throttled after 1 GB/day)",
        validity: "5–15 days",
        price: "NT$300–NT$600 equivalent",
        notes: "Purchase and activate before or upon arrival for compatible devices. No physical SIM needed. Taiwan coverage is excellent.",
      },
    ],
    wifi: "Free WiFi available at hotels, 7-Eleven, FamilyMart, Hi-Life, and MRT stations throughout Taipei. 'iTaiwan' free government WiFi available at many tourist sites — register at Taoyuan Airport on arrival.",
    recommendations: "Purchase a Taiwan Mobile or Chunghwa Telecom tourist SIM at Taoyuan Airport for instant connectivity. The NT$300 5-day unlimited data plan is the best value for most travelers.",
  },

  currencyGuide: {
    currency: "New Taiwan Dollar",
    symbol: "NT$",
    code: "TWD",
    exchangeRate: "₱1 ≈ NT$0.57 (approximate, check current rates)",
    roughPrices: [
      { item: "Convenience store meal / snack (7-Eleven, FamilyMart)", price: "NT$50–NT$80" },
      { item: "Street food / night market snack", price: "NT$30–NT$80" },
      { item: "Mid-range restaurant meal", price: "NT$150–NT$350" },
      { item: "Coffee / bubble tea (boba)", price: "NT$60–NT$120" },
      { item: "MRT single ride", price: "NT$20–NT$65" },
      { item: "Local beer (convenience store)", price: "NT$50–NT$70" },
    ],
    tips: [
      "Exchange Philippine pesos to New Taiwan Dollars at authorized money changers in Manila or at Taoyuan Airport.",
      "Notify your Philippine bank before traveling to avoid card blocks on international withdrawals.",
      "Visa/Mastercard widely accepted at hotels, malls, department stores, and chain restaurants.",
      "Night markets and small local restaurants are mostly cash-only — carry NT$ bills at all times.",
      "7-Eleven and FamilyMart ATMs accept foreign cards and are available 24/7 throughout Taipei.",
      "EasyCard (MRT card) can also be used for payment at convenience stores and some restaurants.",
    ],
  },

  destinationGuide: {
    intro: "Taipei is one of Asia's most accessible, affordable, and delightful cities — a unique blend of modern skyline, ancient temples, vibrant night markets, hot spring resorts, and dramatic mountain scenery all within easy reach. With excellent MRT connectivity, world-class street food, and genuinely warm locals, Taipei rewards repeat visits.",
    highlights: [
      {
        icon: "🏙️",
        name: "Taipei 101",
        description: "Taiwan's most iconic landmark — a 508-metre supertall skyscraper that was the world's tallest building from 2004 to 2010. The indoor and outdoor observation decks offer breathtaking 360° city views.",
        img: "/images/destinations/taipei/places/taipei-101.jpg",
      },
      {
        icon: "🌙",
        name: "Shilin Night Market",
        description: "Taiwan's largest and most famous night market — a sprawling labyrinth of street food, games, fashion, and souvenirs. The underground food hall is legendary for its stinky tofu and oyster vermicelli.",
        img: "/images/destinations/taipei/places/shilin-night-market.jpg",
      },
      {
        icon: "🛍️",
        name: "Ximending Shopping District",
        description: "Taipei's youth culture capital — a pedestrian zone packed with fashion boutiques, cinemas, tattoo parlours, Taiwanese snacks, and street performers. Lively day and night.",
        img: "/images/destinations/taipei/places/ximending-shopping-district.jpg",
      },
      {
        icon: "🛕",
        name: "Longshan Temple",
        description: "Taipei's most famous and sacred temple, built in 1738 and dedicated to Guanyin (Goddess of Mercy). The ornate architecture, incense-filled atmosphere, and devout worshippers make it a profound cultural experience.",
        img: "/images/destinations/taipei/places/longshan-temple.jpg",
      },
      {
        icon: "🏮",
        name: "Jiufen Old Street",
        description: "A former gold mining town cascading down a mountainside, now famous for its red lantern-lit narrow alleyways, traditional teahouses, and panoramic views of the northern coast. Said to have inspired the town in Studio Ghibli's Spirited Away.",
        img: "/images/destinations/taipei/places/jiufen-old-street.jpg",
      },
      {
        icon: "🪨",
        name: "Yehliu Geopark",
        description: "A dramatic natural wonder on the northern coast, featuring thousands of eerily beautiful rock formations sculpted by sea erosion over millions of years. The 'Queen's Head' mushroom rock is the most photographed formation.",
        img: "/images/destinations/taipei/places/yehliu-geopark.jpg",
      },
      {
        icon: "🏛️",
        name: "National Palace Museum",
        description: "One of the world's greatest museums, housing 700,000+ imperial Chinese artifacts including jade, porcelain, calligraphy, and bronze from the Chinese imperial collection. A must for history and culture lovers.",
        img: "/images/destinations/taipei/places/national-palace-museum.jpg",
      },
      {
        icon: "🏘️",
        name: "Dihua Street",
        description: "Taipei's oldest commercial street, lined with beautifully preserved Baroque and traditional Chinese shophouses selling dried herbs, teas, textiles, snacks, and traditional medicine.",
        img: "/images/destinations/taipei/places/dihua-street.jpg",
      },
      {
        icon: "⛰️",
        name: "Elephant Mountain (Xiangshan)",
        description: "A short but steep 20-minute hike through Taipei's urban fringe leading to dramatic rocky viewpoints directly facing Taipei 101 — one of the best free viewpoints in the city.",
        img: "/images/destinations/taipei/places/elephant-mountain.jpg",
      },
      {
        icon: "🕊️",
        name: "Chiang Kai-shek Memorial Hall",
        description: "Taipei's most iconic civic landmark — a vast white memorial complex surrounded by manicured gardens and flanked by the National Theater and Concert Hall. The changing of the guard ceremony is not to be missed.",
        img: "/images/destinations/taipei/places/chiang-kai-shek-memorial-hall.jpg",
      },
      {
        icon: "🌃",
        name: "Raohe Night Market",
        description: "One of Taipei's oldest night markets, running along a single atmospheric street. Famous for Fuzhou black pepper pork buns, herbal soups, and a more local, less touristy vibe than Shilin.",
        img: "/images/destinations/taipei/places/raohe-night-market.jpg",
      },
      {
        icon: "♨️",
        name: "Beitou Hot Springs",
        description: "Taipei's famous hot spring district just 30 minutes from central Taipei by MRT, featuring public and private thermal baths, the Beitou Hot Spring Museum, and a lush, forested valley atmosphere.",
        img: "/images/destinations/taipei/places/beitou-hot-springs.jpg",
      },
    ],
    practicalInfo: [
      { label: "Best Time to Visit", value: "Autumn (October–December) for clear skies and comfortable temperatures. Spring (March–May) is also pleasant. Summer is hot and typhoon-prone; winter is mild but rainy." },
      { label: "Language", value: "Mandarin Chinese. English widely spoken in tourist areas, MRT stations, hotels, and night markets." },
      { label: "Weather", value: "Subtropical monsoon climate. Hot summers (30–35°C). Mild, wet winters (10–18°C). Typhoon season June–October. Rainfall common year-round." },
      { label: "Time Zone", value: "China Standard Time (CST, UTC+8) — same as Philippine Standard Time. No clock adjustment needed." },
      { label: "Currency", value: "New Taiwan Dollar (TWD, NT$). Mix of cash and card. Night markets are cash-only." },
      { label: "Religion & Customs", value: "Mixture of Buddhism, Taoism, and folk religion. Be respectful and quiet inside temples. Photography is allowed in most temples but be mindful of worshippers." },
    ],
    bestFood: [
      {
        name: "Beef Noodle Soup (Niurou Mian)",
        desc: "Taiwan's unofficial national dish — a deeply flavourful broth simmered for hours with beef shin, aromatic spices, and thick wheat noodles. Every restaurant has its own prized recipe.",
        img: "/images/destinations/taipei/food/beef-noodle-soup.jpg",
      },
      {
        name: "Scallion Pancake (Cong You Bing)",
        desc: "A flaky, layered savoury flatbread made with dough, fragrant scallion oil, and optional egg and cheese — a staple Taiwanese breakfast and street snack.",
        img: "/images/destinations/taipei/food/scallion-pancake.jpg",
      },
      {
        name: "Stinky Tofu (Chou Doufu)",
        desc: "Taiwan's most divisive but beloved street food — deeply fermented tofu fried crispy outside and creamy inside, served with pickled cabbage. The smell is intense but the taste is extraordinary.",
        img: "/images/destinations/taipei/food/stinky-tofu.jpg",
      },
      {
        name: "Pineapple Cake (Fengli Su)",
        desc: "Taiwan's most iconic souvenir food — a buttery, crumbly pastry filled with sweet pineapple (or winter melon) jam. Available everywhere from convenience stores to artisan bakeries.",
        img: "/images/destinations/taipei/food/pineapple-cake.jpg",
      },
      {
        name: "Bubble Tea (Boba)",
        desc: "Invented in Taiwan in the 1980s, the original milk tea with tapioca pearls remains vastly better in Taipei than anywhere else in the world. Visit Chun Shui Tang — the originator.",
        img: "/images/destinations/taipei/food/bubble-tea.jpg",
      },
    ],
    photoSpots: [
      {
        name: "Taipei 101 at Night",
        desc: "Taipei 101 illuminated at night with the city skyline stretching in every direction creates one of Asia's most striking urban photographs — best captured from Elephant Mountain or the Xinyi rooftop bars.",
        img: "/images/destinations/taipei/photo-spots/taipei-101-at-night.jpg",
      },
      {
        name: "Jiufen Tea House with Lanterns",
        desc: "The iconic red lanterns of Jiufen's teahouses glowing at dusk, with the mountainside town cascading behind and the north coast sea below — arguably Taiwan's most photographed scene.",
        img: "/images/destinations/taipei/photo-spots/jiufen-tea-house-with-lanterns.jpg",
      },
      {
        name: "Elephant Mountain Taipei 101 View",
        desc: "The rocky summit viewpoints of Xiangshan (Elephant Mountain) frame Taipei 101 perfectly across the urban landscape — the city's most accessible and dramatic free viewpoint.",
        img: "/images/destinations/taipei/photo-spots/elephant-mountain-taipei-101-view.jpg",
      },
      {
        name: "Longshan Temple Interior",
        desc: "The richly decorated interior of Longshan Temple — ornate red pillars, swirling incense smoke, and rows of devotees in prayer — offers deeply atmospheric and respectful photography.",
        img: "/images/destinations/taipei/photo-spots/longshan-temple-interior.jpg",
      },
      {
        name: "Shilin Night Market Street Lights",
        desc: "The colourful lights, vendor stalls, and bustling crowds of Shilin Night Market at night create a vibrant, energy-packed scene that captures the essence of Taipei street life.",
        img: "/images/destinations/taipei/photo-spots/shilin-night-market-street-lights.jpg",
      },
    ],
    localTips: [
      { icon: "💡", tip: "Get an EasyCard at Taoyuan Airport or any MRT station — it works on all Taipei MRT lines, city buses, YouBike rentals, and for payment at 7-Eleven and FamilyMart." },
      { icon: "💡", tip: "Most major tourist attractions are closed on Mondays — plan your itinerary around this to avoid disappointment at the National Palace Museum and other sites." },
      { icon: "💡", tip: "Eating and drinking on the MRT is strictly prohibited and carries a NT$7,500 fine — finish your food and drinks before boarding." },
      { icon: "💡", tip: "Taipei has a 7-Eleven or FamilyMart on virtually every corner — they sell quality hot meals, ATMs accept foreign cards, and they are open 24/7." },
      { icon: "💡", tip: "Bring a compact umbrella everywhere — Taipei rain is unpredictable and can arrive suddenly even on clear-looking days." },
      { icon: "💡", tip: "Jiufen and Yehliu are both excellent day trips but are best visited on weekdays — weekends bring large tour group crowds, especially from mainland China." },
    ],
    safetyTips: [
      { icon: "🛡️", tip: "Taipei is generally a very safe city — petty crime is rare and violent crime against tourists is extremely uncommon." },
      { icon: "🛡️", tip: "Taiwan is in an earthquake zone — familiarise yourself with your hotel's emergency exits and evacuation procedure upon check-in." },
      { icon: "🛡️", tip: "Typhoon season runs June to October — monitor the Central Weather Administration of Taiwan website or your hotel for storm alerts." },
      { icon: "🛡️", tip: "Scooter and motorcycle traffic is extremely heavy in Taipei — look carefully in all directions before crossing the road, even at pedestrian crossings." },
      { icon: "🛡️", tip: "Do not drink tap water in Taiwan — use bottled water or the filtered hot/cold water dispensers available in hotels and convenience stores." },
      { icon: "🛡️", tip: "In case of emergency, call 110 for Police and 119 for Fire and Ambulance. The Tourist Hotline is 0800-011-765 (toll-free, available in English)." },
    ],
  },

  emergencyContacts: {
    local: [
      { label: "Police Emergency", value: "110" },
      { label: "Medical Emergency / Ambulance", value: "119" },
      { label: "Fire Department", value: "119" },
      { label: "Taiwan Tourist Hotline (toll-free, English)", value: "0800-011-765" },
    ],
    philippineConsulate: {
      label: "Philippine Trade and Cultural Office (Taipei)",
      value: "+886-2-2378-0144",
      address: "9th Floor, 168 Zhongxiao East Road, Section 4, Taipei, Taiwan",
    },
  },

  assistanceContacts: [
    { label: "Gladex Tours Hotline", value: "+63 917 875 2200" },
    { label: "Email", value: "support@gladextours.com" },
    { label: "Facebook", value: "m.me/gladextours" },
  ],

  dosAndDonts: {
    dos: [
      "Respect local customs and keep quiet inside temples — Longshan Temple in particular is an active place of worship.",
      "Purchase an EasyCard immediately upon arrival at Taoyuan Airport for seamless MRT and bus travel.",
      "Keep your NT$ cash stocked for night markets, street food vendors, and small local restaurants.",
      "Queue patiently and give up priority seats on the MRT — Taipei commuters are polite and expect the same in return.",
      "Try the local street food with confidence — Taiwanese food hygiene standards are high and the cuisine is exceptional.",
      "Carry a compact umbrella at all times — Taipei weather changes without warning.",
    ],
    donts: [
      "Do not photograph restricted areas, military zones, or locals without permission.",
      "Do not eat or drink on the MRT — fines of NT$7,500 apply and are enforced.",
      "Do not underestimate Taipei's road traffic — scooter density is extremely high; cross streets carefully.",
      "Do not drink tap water — use bottled water or hotel filtered water dispensers.",
      "Do not assume shops are open on Mondays — many major museums and some restaurants are closed on Mondays.",
      "Do not discard your receipts casually — Taiwan's uniform invoice lottery system means your receipt could be a winning lottery ticket.",
    ],
  },

  faqs: [
    {
      question: "Do I need a visa to enter Taiwan?",
      answer: "Philippine passport holders may enter Taiwan visa-free for up to 14 days for tourism under the reciprocal visa exemption arrangement. However, this status can change — confirm current visa requirements at www.boca.gov.tw before your departure date.",
    },
    {
      question: "What currency should I bring?",
      answer: "New Taiwan Dollar (TWD, NT$). Recommended amount: NT$5,000–NT$10,000 in cash for night markets, street food, and small vendors. Hotels, malls, and chain restaurants widely accept Visa and Mastercard. Exchange in Manila or at Taoyuan Airport for competitive rates.",
    },
    {
      question: "What's the best SIM card to get?",
      answer: "Purchase a Taiwan Mobile or Chunghwa Telecom tourist SIM at Taoyuan Airport on arrival — the NT$300 5-day unlimited data plan is excellent value. eSIM via Airalo is available for compatible devices and can be activated before or upon arrival.",
    },
    {
      question: "What are the must-try foods in Taipei?",
      answer: "Beef noodle soup (niurou mian), bubble tea (try the original at Chun Shui Tang or 50 Lan), stinky tofu at a night market, pineapple cake from Sunny Hills Bakery, and scallion pancakes for breakfast. Shilin and Raohe Night Markets are essential food experiences.",
    },
    {
      question: "Is it safe to travel to Taipei?",
      answer: "Taipei is consistently ranked as one of Asia's safest cities. Petty crime is rare, locals are exceptionally helpful, and the city is easy to navigate. Standard travel precautions apply. Be aware of typhoon season (June–October) and always cross streets carefully due to heavy scooter traffic.",
    },
  ],
};
