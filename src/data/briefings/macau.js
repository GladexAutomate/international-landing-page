// @ts-nocheck
export const macauBriefing = {
  slug: "macau",
  welcomeMessage: "Welcome to Macau! This briefing has everything you need for a smooth and memorable trip.",

  briefingInclusions: [
    "Round-trip airfare (Manila – Macau / Hong Kong gateway)",
    "3 nights hotel accommodation",
    "Daily breakfast",
    "Airport/ferry terminal transfers (arrival & departure)",
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
    { label: "Airlines / Transport", value: "Cebu Pacific / Philippine Airlines to Hong Kong, then TurboJET or Cotai Water Jet ferry to Macau (1 hour)" },
    { label: "Flight Duration", value: "~2 hours Manila to Hong Kong + 1 hour Hong Kong–Macau ferry" },
    { label: "Time Zone", value: "China Standard Time (CST, UTC+8)" },
    { label: "Flight Route", value: "Manila (MNL) → Hong Kong (HKG), then ferry → Macau (MFM / Taipa Ferry Terminal)" },
    { label: "Best Time to Visit", value: "October–December (cool and dry). Avoid July–September (typhoon season). Chinese public holidays see massive crowds from mainland China." },
    { label: "Language", value: "Cantonese, Portuguese (official). Mandarin widely spoken. English understood at casinos, hotels, and tourist sites." },
  ],

  arrivalInstructions: [
    { step: 1, text: "After clearing Hong Kong immigration, proceed to the China Ferry Terminal (Tsim Sha Tsui) or Sky Pier (HKIA) for the ferry to Macau." },
    { step: 2, text: "On arrival at Macau Ferry Terminal or Taipa Ferry Terminal, proceed to Macau Immigration." },
    { step: 3, text: "Collect baggage and proceed through Customs — declare applicable items." },
    { step: 4, text: "Look for your Gladex Tours representative or take a free casino shuttle bus to your hotel area." },
    { step: 5, text: "Transfer to hotel. Standard check-in is 14:00 — early check-in subject to availability." },
  ],

  transferInstructions: {
    overview: "Private transfers or pre-arranged casino shuttle buses from the ferry terminal to your hotel.",
    notes: [
      "All major Cotai Strip casinos (Galaxy, Venetian, City of Dreams) operate FREE shuttle buses from the Taipa Ferry Terminal.",
      "Notify Gladex Tours of any ferry or flight changes 24 hours in advance.",
    ],
  },

  hotelInformation: {
    checkIn: "14:00 (2:00 PM)",
    checkOut: "12:00 (12:00 PM)",
    notes: "Early check-in and late check-out subject to availability. Hotel security deposit may be required. Cotai Strip integrated resorts may require a credit card hold.",
  },

  reminders: [
    "Keep passport and documents safe at all times — required for casino entry.",
    "Carry hotel address in both English and Chinese (Traditional/Simplified) script.",
    "MOP and HKD are interchangeable at a near 1:1 rate in Macau — use either freely.",
    "Casino shuttle buses are free — confirm the latest schedule at your hotel front desk.",
    "Macau is very compact — most major attractions can be reached by a 10–20 minute bus or taxi ride.",
  ],

  immigrationAdvisory: [
    "Philippine passport holders are visa-free in Macau for up to 30 days.",
    "Passport must be valid for at least 6 months beyond travel date.",
    "If entering via Hong Kong, you will clear Hong Kong immigration first, then Macau immigration separately upon arrival at the ferry terminal.",
    "Have your hotel booking confirmation accessible. Officials may ask for proof of accommodation.",
  ],

  shoppingAdvisory: [
    "Shop at the Venetian Macau Grand Canal Shoppes and Galaxy Promenade for luxury brands and guaranteed authentic goods.",
    "Taipa Village and Rua do Cunha (Souvenir Street) offer local Macanese products, dried seafood, and traditional sweets.",
    "Bargaining is not the norm in Macau — prices at established shops are fixed.",
    "Purchase almond cookies, beef jerky (bakkwa), and Portuguese egg tarts from official Koi Kei or Margaret's Cafe outlets for assured quality.",
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
    { label: "Smart casual clothes — casinos enforce dress codes in some venues (no slippers or singlets in premium areas)" },
    { label: "Comfortable walking shoes suitable for cobblestone streets in Taipa Village and Senado Square" },
    { label: "HKD and/or MOP cash — both widely accepted at near 1:1 rate across Macau" },
    { label: "Small daypack if combining Macau with a Hong Kong day trip" },
    { label: "Light jacket — casino interiors are heavily air-conditioned" },
  ],

  connectivityGuide: {
    overview: "Macau has excellent 4G coverage throughout the peninsula and Cotai Strip. Tourist SIMs are available at the Macau Ferry Terminal and Macau International Airport. Alternatively, a Hong Kong SIM with Macau roaming will work for short visits.",
    simOptions: [
      { provider: "CTM (Companhia de Telecomunicações de Macau)", type: "Tourist SIM", data: "Unlimited data", validity: "7 days", price: "MOP 88", notes: "Available at Macau Ferry Terminal upon arrival and at CTM shops in malls. Best coverage across Macau." },
      { provider: "3 Macau", type: "Tourist SIM", data: "Unlimited data", validity: "5 days", price: "MOP 68", notes: "Budget-friendly option available at the ferry terminal." },
      { provider: "Hong Kong SIM with Macau Roaming", type: "Roaming SIM", data: "Varies by HK plan", validity: "As per HK plan", price: "Included in HK SIM or add-on fee", notes: "If also visiting Hong Kong, check if your HK SIM includes Macau roaming data — many do for 1–2 days free." },
    ],
    wifi: "Free WiFi available at all major casino-hotels (Venetian, Galaxy, City of Dreams), Macau Ferry Terminal, and most cafes and restaurants. Senado Square has public WiFi access.",
    recommendations: "Purchase a CTM SIM at the ferry terminal immediately upon arrival. If you are arriving via the HKIA Sky Pier, you may also use your Hong Kong SIM until you can purchase a Macau SIM later.",
  },

  currencyGuide: {
    currency: "Macanese Pataca",
    symbol: "P",
    code: "MOP",
    exchangeRate: "₱1 ≈ MOP 0.14 (approximate). Note: Hong Kong Dollar (HKD) is accepted everywhere in Macau at near 1:1 (MOP 1 ≈ HKD 1.03).",
    roughPrices: [
      { item: "Portuguese egg tart (Pastel de Nata)", price: "MOP 8–MOP 12 each" },
      { item: "Local Macanese restaurant meal", price: "MOP 50–MOP 100" },
      { item: "Dim sum / Chinese restaurant", price: "MOP 80–MOP 150 per person" },
      { item: "Coffee (cafe)", price: "MOP 30–MOP 50" },
      { item: "Taxi base fare (within Macau Peninsula)", price: "MOP 19 (flagfall)" },
      { item: "Casino free shuttle bus", price: "Free (with casino or hotel stay)" },
    ],
    tips: [
      "HKD and MOP are both accepted across Macau at near parity — no need to exchange all your HKD for MOP.",
      "MOP change is given back as MOP (not HKD) — this is fine, as MOP is accepted in Macau and can be used throughout your stay.",
      "Notify your bank before travel to avoid card blocks on international transactions.",
      "Credit cards are widely accepted at casino-hotels, malls, and established restaurants — MOP/HKD cash for local eateries and market stalls.",
    ],
  },

  destinationGuide: {
    intro: "Macau is one of Asia's most fascinating cultural fusions — a former Portuguese colony that became China's Special Administrative Region and the world's largest gambling hub. Beneath the glittering casino towers lies a remarkably preserved historic city of pastel-coloured colonial buildings, ancient Chinese temples, and cobblestone lanes where Portuguese and Cantonese cultures have blended for 400 years. A UNESCO World Heritage Site, Macau's historic centre is a treasure that few visitors fully explore beyond the casino floor.",
    highlights: [
      { icon: "🏛️", name: "Ruins of St. Paul's Cathedral", description: "The iconic stone façade of the 17th-century St. Paul's Cathedral — destroyed by fire in 1835, leaving only the magnificent carved front wall. The most photographed image in Macau, especially lit at night.", img: "/images/destinations/macau/places/ruins-of-st-pauls-cathedral.jpg" },
      { icon: "🌟", name: "Senado Square", description: "A stunning UNESCO-listed public square of wave-patterned Portuguese calcada cobblestones surrounded by colourful colonial buildings. The heart of Macau's historic district and the city's most lively gathering place.", img: "/images/destinations/macau/places/senado-square.jpg" },
      { icon: "🗼", name: "Macau Tower", description: "A 338-metre telecommunications and observation tower offering a glass-floored observation deck, revolving restaurant, and the world-famous AJ Hackett bungee jump and SkyWalk X experience on the outer ring.", img: "/images/destinations/macau/places/macau-tower.jpg" },
      { icon: "🛕", name: "A-Ma Temple", description: "Macau's oldest temple, dedicated to the goddess A-Ma (goddess of seafarers), dating to 1488 — predating Portuguese settlement. Its name is the origin of the word 'Macau.' Serene, incense-filled, and beautifully atmospheric.", img: "/images/destinations/macau/places/a-ma-temple.jpg" },
      { icon: "🎰", name: "Cotai Strip Casinos (Venetian, Galaxy, City of Dreams)", description: "The Cotai Strip is Macau's answer to Las Vegas — a 6-km boulevard of megacasino resorts. The Venetian Macau replicates Venice's Grand Canal inside a shopping mall. Galaxy features a wave pool and sky-high facilities.", img: "/images/destinations/macau/places/cotai-strip-casinos.jpg" },
      { icon: "⚓", name: "Fisherman's Wharf", description: "A themed leisure development at the outer harbour combining a Roman-style amphitheatre, replica international architecture, restaurants, and rides along Macau's waterfront.", img: "/images/destinations/macau/places/fishermans-wharf.jpg" },
      { icon: "🌺", name: "Taipa Village", description: "A charming residential village of Portuguese colonial houses, traditional temples, and local restaurants on Taipa Island — connected to the Cotai Strip but worlds away in atmosphere.", img: "/images/destinations/macau/places/taipa-village.jpg" },
      { icon: "🌿", name: "Coloane Village", description: "Macau's most peaceful neighbourhood — a sleepy fishing village at the southern end of Coloane Island, home to Fernando's restaurant, Lord Stow's Bakery (original egg tart), and the Chapel of St. Francis Xavier.", img: "/images/destinations/macau/places/coloane-village.jpg" },
      { icon: "🏰", name: "Grand Lisboa Casino", description: "The most dramatic casino building in Macau — a golden lotus flower dome rising from a 54-storey neon tower. The exterior alone is one of Macau's most iconic architectural landmarks.", img: "/images/destinations/macau/places/grand-lisboa-casino.jpg" },
      { icon: "🏛️", name: "Macau Museum", description: "Located within the restored Monte Fort, the Macau Museum chronicles the city's unique Chinese-Portuguese cultural blending through three floors of exhibits on history, architecture, and traditional crafts.", img: "/images/destinations/macau/places/macau-museum.jpg" },
      { icon: "🏯", name: "Fortaleza do Monte (Monte Fort)", description: "A 17th-century Portuguese military fortress on the highest point of Macau Peninsula — offering panoramic views of the city and the Pearl River Delta, with its original cannons still in place.", img: "/images/destinations/macau/places/fortaleza-do-monte.jpg" },
      { icon: "🚡", name: "Macau–Taipa Links (Bridges & Ferry Views)", description: "Three bridge crossings connect Macau Peninsula to Taipa Island — the Sai Van, Governador Nobre de Carvalho, and friendship bridges — spectacular when seen lit up at night from the waterfront.", img: "/images/destinations/macau/places/macau-taipa-bridges.jpg" },
    ],
    practicalInfo: [
      { label: "Best Time to Visit", value: "October–December (cool and dry, 16–24°C). Spring (March–May) is mild but humid. July–September is typhoon season — activities can be disrupted." },
      { label: "Language", value: "Cantonese is the daily language. Mandarin widely understood. Portuguese remains an official language. English is spoken at all casinos, hotels, and tourist sites." },
      { label: "Weather", value: "Subtropical — mild winters (15–20°C), hot and humid summers (28–35°C). Typhoon season July–September can bring closures and ferry cancellations." },
      { label: "Time Zone", value: "CST (UTC+8) — same as the Philippines. No time adjustment needed." },
      { label: "Currency", value: "Macanese Pataca (MOP, P). HKD also widely accepted. ₱1 ≈ MOP 0.14. Egg tart MOP 8–12. Taxi base MOP 19." },
      { label: "Religion & Customs", value: "Mix of Chinese Buddhism, Taoism, and Roman Catholic heritage. Dress respectfully at A-Ma Temple and chapels. Do not photograph people praying without permission." },
    ],
    bestFood: [
      { name: "Portuguese Egg Tart (Pastel de Nata)", desc: "Macau's most famous export — a flaky pastry shell with a rich, slightly caramelised egg custard filling. The original is from Lord Stow's Bakery in Coloane Village. Queue for it fresh from the oven.", img: "/images/destinations/macau/food/portuguese-egg-tart.jpg" },
      { name: "Pork Chop Bun (Bolo Bao com Porco)", desc: "A pork chop sandwich unique to Macau — crispy fried pork chop tucked into a slightly sweet Portuguese-style bun. Best from Tai Lei Loi Kei in Taipa Village. A must-have lunch.", img: "/images/destinations/macau/food/pork-chop-bun.jpg" },
      { name: "Serradura (Sawdust Pudding)", desc: "A Portuguese-Macanese dessert of whipped cream layered with crushed Marie biscuit crumbs — light, creamy, and mildly sweet. Available at most Portuguese bakeries and dessert shops.", img: "/images/destinations/macau/food/serradura.jpg" },
      { name: "African Chicken (Galinha à Africana)", desc: "One of Macau's iconic Macanese fusion dishes — grilled chicken marinated in a blend of African spices, coconut milk, and chili, a legacy of Portugal's colonial trade routes.", img: "/images/destinations/macau/food/african-chicken.jpg" },
      { name: "Minchi", desc: "Macau's beloved comfort food — minced pork or beef seasoned with soy sauce, Worcestershire, and spices, served with fried egg over rice or noodles. Simple, satisfying, and deeply local.", img: "/images/destinations/macau/food/minchi.jpg" },
    ],
    photoSpots: [
      { name: "Ruins of St. Paul's Façade at Night", desc: "The golden illuminated façade of St. Paul's against the deep blue night sky is Macau's defining image. The steps in front are less crowded from 9 PM onwards, ideal for clean composition shots.", img: "/images/destinations/macau/photo-spots/ruins-of-st-pauls-at-night.jpg" },
      { name: "Senado Square Colourful Colonial Buildings", desc: "The wave-mosaic cobblestones and pastel facades of Senado Square are best photographed in the early morning before the crowds arrive. The symmetric colonial buildings frame perfectly from the centre of the square.", img: "/images/destinations/macau/photo-spots/senado-square-colonial.jpg" },
      { name: "Macau Tower at Dusk", desc: "Photograph the Macau Tower from the promenade across the outer harbour at dusk — the tower's reflection in the water and the deepening sky behind it create a striking long-exposure opportunity.", img: "/images/destinations/macau/photo-spots/macau-tower-at-dusk.jpg" },
      { name: "Taipa Village Cobblestone Streets", desc: "The narrow, lamp-lined alleyways and yellow colonial buildings of Taipa Village are best at golden hour. Look for the Rua do Cunha souvenir lane and the Taipa Houses Museum row.", img: "/images/destinations/macau/photo-spots/taipa-village-cobblestone.jpg" },
      { name: "Venetian Macau Grand Canal Interior", desc: "The indoor recreation of Venice's Grand Canal inside the Venetian Macau — complete with gondolas, painted ceilings, and Venetian-costumed performers — is unlike anywhere else in Asia.", img: "/images/destinations/macau/photo-spots/venetian-macau-grand-canal.jpg" },
    ],
    localTips: [
      { icon: "🚌", tip: "All major casino resorts on the Cotai Strip (Venetian, Galaxy, City of Dreams, Sands) operate free shuttle buses from the ferry terminals and the Border Gate. Use them to save on taxi fares." },
      { icon: "🎲", tip: "Casino floors are completely free to enter and walk around — you are not obligated to gamble. The interiors of the Venetian Macau and Grand Lisboa are architectural spectacles worth exploring as a tourist." },
      { icon: "💴", tip: "MOP and HKD are interchangeable across Macau at near parity. Do not over-exchange currency — spend your remaining MOP freely, or keep HKD for your Hong Kong portion of the trip." },
      { icon: "🍽️", tip: "For authentic Macanese cuisine, head to Taipa Village — the narrow lanes off Rua do Cunha have excellent family-run Portuguese-Macanese restaurants at very reasonable prices." },
      { icon: "📅", tip: "Avoid peak Chinese Golden Week holidays (October 1–7 and Chinese New Year) — Macau receives millions of mainland Chinese visitors during these periods and is extremely crowded and expensive." },
      { icon: "🚶", tip: "The UNESCO Historic Centre of Macau is entirely walkable. The route from Senado Square to the Ruins of St. Paul's is only 700 metres — wear comfortable shoes for the cobblestone streets." },
    ],
    safetyTips: [
      { icon: "🛡️", tip: "Macau is very safe for tourists. Violent crime is extremely rare. The main concern is casino environments — set a clear gambling budget before entering and stick to it." },
      { icon: "🎰", tip: "Casino marketing staff near the ferry terminal can be aggressive. You are not obligated to take casino chips, free play vouchers, or shuttle bus offers from touts — ignore them politely." },
      { icon: "💵", tip: "Carry small cash for street vendors in Taipa Village and Rua do Cunha. Most small stalls and local restaurants do not accept credit cards." },
      { icon: "🏨", tip: "Keep your hotel address saved in both English and Chinese on your phone. Some taxi drivers speak limited English — showing the Chinese address will get you there without confusion." },
      { icon: "🌀", tip: "During typhoon season (July–September), monitor Hong Kong Observatory alerts. If a Typhoon Signal 8 or above is issued, ferries between Hong Kong and Macau will be suspended." },
      { icon: "🆘", tip: "Emergency number in Macau: 999 (Police, Fire, and Ambulance). Tourist information hotline: +853-2833-3000. Philippine Consulate (via Hong Kong): +852-2823-8500." },
    ],
  },

  emergencyContacts: {
    local: [
      { label: "Police", value: "999" },
      { label: "Medical Emergency / Ambulance", value: "999" },
      { label: "Fire Department", value: "999" },
      { label: "Tourist Information Hotline", value: "+853-2833-3000" },
    ],
    philippineConsulate: {
      label: "Philippine Consulate General in Hong Kong (covers Macau)",
      value: "+852-2823-8500",
      address: "8th Floor, United Centre, 95 Queensway, Admiralty, Hong Kong",
    },
  },

  assistanceContacts: [
    { label: "Gladex Tours Hotline", value: "+63 917 875 2200" },
    { label: "Email", value: "support@gladextours.com" },
    { label: "Facebook", value: "m.me/gladextours" },
  ],

  dosAndDonts: {
    dos: [
      "Respect local customs and religious sites — dress appropriately at A-Ma Temple and heritage chapels.",
      "Use free casino shuttle buses from the ferry terminal to save on transport costs.",
      "Explore the UNESCO Historic Centre on foot — Senado Square to St. Paul's Ruins is the essential walking route.",
      "Try authentic Macanese food in Taipa Village and Lord Stow's original egg tarts in Coloane.",
      "Carry both HKD and MOP — both currencies are freely accepted throughout Macau.",
      "Keep a record of your hotel address in Chinese for taxi drivers.",
    ],
    donts: [
      "Do not photograph people praying inside temples or churches without permission.",
      "Do not accept unsolicited casino chips or vouchers from touts at the ferry terminal.",
      "Do not expect to bargain in established shops — Macau's retail environment has fixed prices.",
      "Do not plan an outdoor-heavy visit during July–September typhoon season without monitoring weather alerts.",
      "Do not bring controlled substances into Macau — drug laws carry severe penalties under Chinese law.",
      "Do not rely solely on cards for small purchases — local eateries and market stalls in Taipa/Coloane prefer cash.",
    ],
  },

  faqs: [
    { question: "Do I need a visa to enter Macau?", answer: "Philippine passport holders are visa-free in Macau for up to 30 days. However, if your route passes through Hong Kong (as most Manila–Macau itineraries do), you will need to clear Hong Kong immigration separately — Filipinos are also visa-free in Hong Kong for up to 14 days. Confirm your transit arrangements with your Gladex travel consultant." },
    { question: "What currency should I use in Macau?", answer: "Macanese Pataca (MOP) and Hong Kong Dollar (HKD) are both accepted everywhere in Macau at near parity (MOP 1 ≈ HKD 1.03). Bring HKD and use it throughout — no need to exchange everything into MOP. ₱1 ≈ MOP 0.14." },
    { question: "What SIM card is best for Macau?", answer: "Purchase a CTM tourist SIM at the Macau Ferry Terminal arrivals hall. A 7-day unlimited data SIM costs MOP 88. If you also have a Hong Kong SIM, check if it includes free Macau roaming — many HK plans cover 1–2 days in Macau at no extra charge." },
    { question: "What are the must-try foods in Macau?", answer: "Portuguese Egg Tart from Lord Stow's Bakery (Coloane), Pork Chop Bun from Tai Lei Loi Kei (Taipa), African Chicken at a Macanese restaurant, Serradura pudding, and Minchi (minced meat rice). All found within the Taipa Village dining precinct." },
    { question: "Is Macau safe for tourists?", answer: "Macau is very safe. Violent crime is essentially non-existent. Be aware of aggressive casino marketing near ferry terminals and set a strict gambling budget if you plan to play. Emergency services are fast and reliable — dial 999 for police, fire, and ambulance." },
  ],
};
