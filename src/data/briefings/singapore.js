// @ts-nocheck
export const singaporeBriefing = {
  slug: "singapore",
  welcomeMessage: "Welcome to Singapore! This briefing has everything you need for a smooth and memorable trip.",

  briefingInclusions: [
    "Round-trip airfare (Manila – Singapore)",
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
    { label: "Airlines", value: "Cebu Pacific / Philippine Airlines / Singapore Airlines" },
    { label: "Flight Duration", value: "~3.5 hours from Manila" },
    { label: "Time Zone", value: "Singapore Standard Time (SGT, UTC+8)" },
    { label: "Flight Route", value: "Manila (MNL) → Singapore (SIN) — Changi Airport" },
    { label: "Best Time to Visit", value: "Year-round. February–April is slightly drier. Avoid Chinese New Year peak if on a budget." },
    { label: "Language", value: "English (official), Mandarin, Malay, Tamil" },
  ],

  arrivalInstructions: [
    { step: 1, text: "Proceed to Immigration — have your passport and arrival card ready." },
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
    "Carry hotel address in local language.",
    "Respect local laws — Singapore has strict penalties for littering, jaywalking, and gum chewing.",
    "Carry small denomination SGD for hawker centres and local markets.",
    "Stay hydrated — tropical humidity is intense year-round.",
  ],

  immigrationAdvisory: [
    "Philippine passport holders are visa-free for up to 30 days in Singapore.",
    "Passport must be valid for at least 6 months beyond travel date.",
    "Complete arrival/departure cards accurately.",
    "Have booking reference and hotel address accessible.",
  ],

  shoppingAdvisory: [
    "Shop at reputable stores and licensed vendors along Orchard Road and major malls.",
    "Prices are fixed in malls — bargaining is generally not practised.",
    "Keep receipts for major purchases — GST Tourist Refund is available for eligible purchases.",
    "Beware of counterfeit goods; Singapore Customs strictly enforces IP laws.",
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
    { label: "Smart casual attire for upscale restaurants and entertainment venues" },
    { label: "Comfortable walking shoes — expect long walks at Gardens by the Bay and Sentosa" },
    { label: "Compact umbrella — afternoon rain showers are common year-round" },
    { label: "EZ-Link card (or top up at MRT stations) for seamless bus and MRT travel" },
    { label: "Sunscreen SPF 50+ — UV index is high daily" },
  ],

  connectivityGuide: {
    overview: "Singapore has world-class mobile connectivity with 4G/5G coverage island-wide. Tourist SIMs are available immediately upon arrival at Changi Airport.",
    simOptions: [
      { provider: "Singtel", type: "Tourist SIM", data: "Unlimited data (fair-use throttling after 3GB/day)", validity: "7 days", price: "S$15–S$18", notes: "Available at Changi arrivals hall — ICA counter area. Best nationwide coverage." },
      { provider: "Starhub", type: "Tourist SIM", data: "100GB high-speed data", validity: "7 days", price: "S$15", notes: "Available at Changi arrivals hall and 7-Eleven stores across the island." },
      { provider: "Changi Recommends SIM", type: "Tourist SIM", data: "Unlimited data", validity: "7 days", price: "S$15", notes: "Pre-order online for faster pickup at the airport. Popular with transit and first-time visitors." },
    ],
    wifi: "Free WiFi available at Changi Airport, most hotels, Jewel Changi, major malls, and many MRT stations via Wireless@SG network.",
    recommendations: "Pick up a SIM at the arrivals hall before leaving Changi. Download the Grab app and Singapore MRT maps offline before your flight.",
  },

  currencyGuide: {
    currency: "Singapore Dollar",
    symbol: "S$",
    code: "SGD",
    exchangeRate: "₱1 ≈ S$0.023 (approximate)",
    roughPrices: [
      { item: "Convenience store snack / meal", price: "S$2–S$5" },
      { item: "Hawker centre meal (chicken rice, laksa, etc.)", price: "S$3–S$6" },
      { item: "Food court / kopitiam meal", price: "S$5–S$10" },
      { item: "Mid-range restaurant meal", price: "S$15–S$35" },
      { item: "Kopi (local coffee) / bubble tea", price: "S$0.80–S$2.50" },
      { item: "Grab base fare (short trip)", price: "S$3–S$7" },
      { item: "Tiger beer (convenience store)", price: "S$3.50–S$4.50" },
    ],
    tips: [
      "Exchange SGD at authorized money changers in Lucky Plaza, People's Park, or Mustafa Centre for better rates than hotel counters.",
      "Notify your bank before travel to avoid card blocks on international transactions.",
      "Visa and Mastercard are widely accepted across Singapore — even at most hawker stalls via PayNow QR.",
      "Keep S$5–S$10 in small bills for hawker centres, wet markets, and local food stalls.",
    ],
  },

  destinationGuide: {
    intro: "Singapore is a dazzling city-state where futuristic architecture, lush tropical greenery, and multicultural heritage come together seamlessly. From world-class food courts to rooftop infinity pools overlooking the skyline, Singapore delivers an extraordinary experience in a compact, ultra-safe, and immaculately clean environment.",
    highlights: [
      { icon: "🦁", name: "Merlion Park", description: "Singapore's iconic half-lion, half-fish statue stands at the waterfront of Marina Bay — the defining symbol of the city-state and a must-see at night.", img: "/images/destinations/singapore/places/merlion-park.jpg" },
      { icon: "🏨", name: "Marina Bay Sands SkyPark", description: "The 57th-floor observation deck atop the three-tower Marina Bay Sands hotel offers the most stunning 360-degree views of Singapore's skyline.", img: "/images/destinations/singapore/places/marina-bay-sands-skypark.jpg" },
      { icon: "🌿", name: "Gardens by the Bay", description: "An otherworldly park featuring the iconic Supertree Grove, Cloud Forest, and Flower Dome — the OCBC Garden Rhapsody light show at night is unmissable.", img: "/images/destinations/singapore/places/gardens-by-the-bay.jpg" },
      { icon: "🛍️", name: "Orchard Road", description: "Singapore's premier shopping boulevard stretches 2.2 km lined with luxury malls, international brands, and street-side food vendors.", img: "/images/destinations/singapore/places/orchard-road.jpg" },
      { icon: "🌉", name: "Clarke Quay", description: "A lively riverside quay with converted shophouses turned into bars, restaurants, and nightclubs — perfect for an evening along the Singapore River.", img: "/images/destinations/singapore/places/clarke-quay.jpg" },
      { icon: "🏖️", name: "Sentosa Island", description: "Singapore's leisure island packed with beaches, resorts, cable cars, and the S.E.A. Aquarium — accessible by monorail, cable car, or causeway.", img: "/images/destinations/singapore/places/sentosa-island.jpg" },
      { icon: "🎢", name: "Universal Studios Singapore", description: "Southeast Asia's first and only Universal Studios theme park on Sentosa Island — featuring Jurassic World, Transformers, Battlestar Galactica, and more.", img: "/images/destinations/singapore/places/universal-studios-singapore.jpg" },
      { icon: "🦒", name: "Singapore Zoo / Night Safari", description: "The award-winning Singapore Zoo is home to 300+ species in open habitats. The Night Safari next door is the world's first nocturnal wildlife park.", img: "/images/destinations/singapore/places/singapore-zoo-night-safari.jpg" },
      { icon: "🏮", name: "Chinatown", description: "A vibrant heritage district with colourful shophouses, Buddha Tooth Relic Temple, hawker food centres, and affordable souvenir shopping.", img: "/images/destinations/singapore/places/chinatown.jpg" },
      { icon: "🌸", name: "Little India (Tekka Market)", description: "Singapore's South Asian cultural quarter — fragrant with spices, flowers, and authentic Indian street food. Tekka Market is a feast for the senses.", img: "/images/destinations/singapore/places/little-india-tekka-market.jpg" },
      { icon: "🕌", name: "Kampong Glam (Arab Street)", description: "The Malay-Muslim heritage precinct centred around the Sultan Mosque — famous for its Middle Eastern restaurants, artisan shops, and colourful murals.", img: "/images/destinations/singapore/places/kampong-glam-arab-street.jpg" },
      { icon: "💧", name: "Jewel Changi Airport", description: "The world's tallest indoor waterfall (HSBC Rain Vortex) sits at the heart of Jewel — a stunning garden-mall integrated into Terminal 1 of Changi Airport.", img: "/images/destinations/singapore/places/jewel-changi-airport.jpg" },
    ],
    practicalInfo: [
      { label: "Best Time to Visit", value: "Year-round destination. February–April is slightly drier. December–January has the Christmas light-up on Orchard Road." },
      { label: "Language", value: "English is the main language of business and daily life. Singlish (colloquial English) is widely spoken. Mandarin, Malay, and Tamil also official." },
      { label: "Weather", value: "Tropical — hot and humid year-round. Average 28–32°C. Afternoon rain showers are common. Humidity regularly exceeds 80%." },
      { label: "Time Zone", value: "SGT (UTC+8) — same as the Philippines. No time adjustment needed." },
      { label: "Currency", value: "Singapore Dollar (SGD, S$). ₱1 ≈ S$0.023. Hawker meals S$3–6. Grab base fare S$3–7." },
      { label: "Religion & Customs", value: "Multi-religious society. Remove shoes before entering mosques and Hindu temples. Dress modestly at religious sites. No eating on the MRT (S$500 fine)." },
    ],
    bestFood: [
      { name: "Hainanese Chicken Rice", desc: "Singapore's unofficial national dish — poached or roasted chicken served over fragrant rice cooked in chicken broth, with chili and ginger sauce. Best at Tian Tian in Maxwell Food Centre.", img: "/images/destinations/singapore/food/hainanese-chicken-rice.jpg" },
      { name: "Laksa", desc: "A rich, spicy coconut curry noodle soup loaded with prawns, fish cake, and bean sprouts. Katong Laksa (thick cut noodles) is the must-try Singapore variant.", img: "/images/destinations/singapore/food/laksa.jpg" },
      { name: "Char Kway Teow", desc: "Flat rice noodles wok-fried over high flame with Chinese sausage, cockles, bean sprouts, and dark soy sauce — a smoky, satisfying hawker classic.", img: "/images/destinations/singapore/food/char-kway-teow.jpg" },
      { name: "Chilli Crab", desc: "Singapore's iconic seafood dish — whole Sri Lankan crab tossed in a rich, tangy, semi-sweet chili tomato sauce. Best enjoyed with deep-fried man tou buns.", img: "/images/destinations/singapore/food/chilli-crab.jpg" },
      { name: "Bak Kut Teh", desc: "A comforting pork rib soup simmered in a peppery or herbal broth — eaten with rice and you tiao (fried dough sticks). Perfect for breakfast or late-night supper.", img: "/images/destinations/singapore/food/bak-kut-teh.jpg" },
    ],
    photoSpots: [
      { name: "Marina Bay Sands Skyline at Night", desc: "Stand at the Merlion Park waterfront across from Marina Bay Sands at 8–9 PM for the iconic Singapore skyline reflection shot. The Spectra light show adds dramatic flair.", img: "/images/destinations/singapore/photo-spots/marina-bay-sands-skyline-at-night.jpg" },
      { name: "Supertree Grove Light Show", desc: "The OCBC Garden Rhapsody light show at Gardens by the Bay runs at 7:45 PM and 8:45 PM nightly. Stand beneath the supertrees for an otherworldly canopy of light and music.", img: "/images/destinations/singapore/photo-spots/supertree-grove-light-show.jpg" },
      { name: "Merlion at Marina Bay", desc: "The Merlion fountain with Marina Bay Sands in the background is Singapore's most photographed frame. Sunrise and sunset both produce spectacular colours.", img: "/images/destinations/singapore/photo-spots/merlion-at-marina-bay.jpg" },
      { name: "Jewel Changi HSBC Rain Vortex", desc: "The world's tallest indoor waterfall plunges 40 metres through the glass dome of Jewel Changi. Best at night when coloured lights illuminate the water curtain.", img: "/images/destinations/singapore/photo-spots/jewel-changi-hsbc-rain-vortex.jpg" },
      { name: "Henderson Waves Bridge", desc: "Singapore's highest pedestrian bridge at 36 metres above Henderson Road, designed with wave-shaped timber ribs — spectacular at dusk and during the Southern Ridges walk.", img: "/images/destinations/singapore/photo-spots/henderson-waves-bridge.jpg" },
    ],
    localTips: [
      { icon: "💳", tip: "Get an EZ-Link card at any MRT station for seamless travel on all MRT lines and buses. Top up at any 7-Eleven, MRT station, or Changi Airport kiosks." },
      { icon: "🚇", tip: "The MRT is the fastest and most affordable way to get around. Do NOT eat or drink on the MRT or platforms — the S$500 fine is strictly enforced." },
      { icon: "🍜", tip: "Must-visit hawker centres: Lau Pa Sat (downtown), Old Airport Road Food Centre (Katong), Maxwell Food Centre (Chinatown). Local food is cheap and incredible." },
      { icon: "✈️", tip: "Changi Airport has free amenities for all visitors — a rooftop swimming pool (Transit Hotel), free 24-hour cinema, butterfly garden, and endless food options at Jewel." },
      { icon: "📱", tip: "Download Grab app for taxis and food delivery. It is the dominant ride-hailing app in Singapore. You can also pre-book airport pickup directly." },
      { icon: "🏙️", tip: "Admission to Gardens by the Bay's Supertree Grove outdoor area is free. The Cloud Forest and Flower Dome domes require paid tickets — book online in advance." },
    ],
    safetyTips: [
      { icon: "🛡️", tip: "Singapore is consistently ranked among the world's safest cities. Violent crime is extremely rare. Exercise standard urban awareness in crowded areas like Orchard Road and Bugis." },
      { icon: "⚖️", tip: "Singapore is a fine city — literally. No chewing gum (import/sale is banned), no littering (S$300), no jaywalking (S$50), and absolutely no eating or drinking on the MRT (S$500)." },
      { icon: "🚫", tip: "Drug trafficking carries the mandatory death penalty in Singapore. Do not carry, use, or be in possession of any controlled substances under any circumstances." },
      { icon: "☀️", tip: "Heat and humidity are intense even on cloudy days. Drink water regularly, apply SPF 50+ sunscreen, and rest in air-conditioned spaces during peak midday heat." },
      { icon: "🎭", tip: "Unlicensed tour touts at Orchard Road, Chinatown, and tourist attractions do exist. Book all tours and activities through Gladex Tours or licensed counters only." },
      { icon: "🆘", tip: "Emergency numbers: Police 999 | Ambulance & Fire 995 | Tourist Hotline +65-1800-736-2000. Singapore Civil Defence Force responds extremely fast." },
    ],
  },

  emergencyContacts: {
    local: [
      { label: "Police", value: "999" },
      { label: "Medical Emergency / Ambulance", value: "995" },
      { label: "Fire Department", value: "995" },
      { label: "Tourist Police / STB Hotline", value: "+65-1800-736-2000" },
    ],
    philippineConsulate: {
      label: "Philippine Embassy Singapore",
      value: "+65-6737-3977",
      address: "20 Nassim Road, Singapore 258395",
    },
  },

  assistanceContacts: [
    { label: "Gladex Tours Hotline", value: "+63 917 875 2200" },
    { label: "Email", value: "support@gladextours.com" },
    { label: "Facebook", value: "m.me/gladextours" },
  ],

  dosAndDonts: {
    dos: [
      "Respect local laws — Singapore strictly enforces rules against littering, jaywalking, and eating on the MRT.",
      "Use the EZ-Link card for all MRT and bus rides — it is far more convenient than buying single-trip tokens.",
      "Explore hawker centres for authentic, affordable, and world-class Singaporean food.",
      "Dress modestly when visiting mosques, temples, and religious sites.",
      "Download the Grab app before your trip for convenient, fixed-price transport.",
      "Keep your hotel address saved on your phone in both English and Chinese characters for taxi drivers.",
    ],
    donts: [
      "Do not photograph restricted areas — government buildings, military zones, and Istana Palace grounds.",
      "Do not eat, drink, or chew gum on the MRT or MRT platforms — fines are strictly enforced.",
      "Do not litter anywhere in Singapore — even dropping a tissue carries a fine.",
      "Do not jaywalk — use designated pedestrian crossings at all times.",
      "Do not bring chewing gum into Singapore — it is banned and can be confiscated at customs.",
      "Do not carry, purchase, or use any controlled substances — drug laws in Singapore are among the world's strictest.",
    ],
  },

  faqs: [
    { question: "Do I need a visa to enter Singapore?", answer: "No. Philippine passport holders enjoy visa-free entry to Singapore for up to 30 days. Ensure your passport is valid for at least 6 months beyond your travel date and that you have a return ticket and proof of sufficient funds." },
    { question: "What currency should I bring?", answer: "Singapore Dollar (SGD, S$). Bring S$100–S$200 in cash for hawker centres and small vendors, and rely on your Visa/Mastercard for larger purchases. Exchange at Lucky Plaza or People's Park Complex for the best rates. ₱1 ≈ S$0.023." },
    { question: "What SIM card is best for Singapore?", answer: "Pick up a Singtel, Starhub, or Changi Recommends tourist SIM at the arrivals hall of Changi Airport immediately upon clearing immigration. A 7-day unlimited data SIM costs around S$15 and offers excellent island-wide coverage." },
    { question: "What are the must-try foods in Singapore?", answer: "Hainanese Chicken Rice, Laksa, Char Kway Teow, Chilli Crab, Bak Kut Teh, and Kaya Toast with soft-boiled eggs. Visit Maxwell Food Centre (Chinatown) or Old Airport Road Food Centre for the authentic hawker experience." },
    { question: "Is Singapore safe for tourists?", answer: "Singapore is consistently ranked one of the world's safest cities. Crime rates are very low and the city is immaculately maintained. However, strictly observe local laws — fines for littering, jaywalking, and eating on the MRT are actively enforced." },
  ],
};
