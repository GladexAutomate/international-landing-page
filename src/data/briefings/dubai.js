// @ts-nocheck
export const dubaiBriefing = {
  slug: "dubai",
  welcomeMessage: "Welcome to Dubai! This briefing has everything you need for a smooth and memorable trip.",

  briefingInclusions: [
    "Round-trip airfare (Manila – Dubai)",
    "4 nights hotel accommodation",
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
    { label: "Airlines", value: "Emirates / Cebu Pacific / Philippine Airlines" },
    { label: "Flight Duration", value: "~8–9 hours from Manila" },
    { label: "Time Zone", value: "Gulf Standard Time (GST, UTC+4)" },
    { label: "Flight Route", value: "Manila (MNL) → Dubai (DXB) — Dubai International Airport" },
    { label: "Best Time to Visit", value: "November–March (pleasant 20–28°C). Avoid June–September (extreme heat 40–48°C). Ramadan period requires extra cultural sensitivity." },
    { label: "Language", value: "Arabic (official). English widely spoken in business, hospitality, and tourist areas." },
  ],

  arrivalInstructions: [
    { step: 1, text: "Proceed to Immigration — have your passport and UAE visa approval (if applicable) ready." },
    { step: 2, text: "Collect baggage at the designated carousel." },
    { step: 3, text: "Proceed to Customs — declare any applicable items, including cash over AED 60,000." },
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
    "Carry hotel address in both English and Arabic.",
    "Dress modestly in public — covered shoulders and knees are required in malls and souks.",
    "Alcohol is only available at licensed hotel restaurants and bars — not in public or convenience stores.",
    "Friday and Saturday are the weekend in the UAE — some government offices and souks may have modified hours.",
    "Stay indoors or in air-conditioned spaces during midday heat (12 PM–4 PM) in summer.",
  ],

  immigrationAdvisory: [
    "Philippine passport holders require a UAE tourist visa prior to arrival. Confirm current visa requirements with your travel consultant — a 30-day UAE Tourist Visa is typically required.",
    "Passport must be valid for at least 6 months beyond travel date.",
    "Complete arrival card forms accurately. Biometric registration (fingerprint and photo) is conducted at immigration.",
    "Have hotel confirmation, return ticket, and sufficient funds accessible.",
  ],

  shoppingAdvisory: [
    "Dubai Mall and Mall of the Emirates are the largest shopping destinations — guaranteed authentic goods.",
    "Fixed prices in malls. Bargaining is acceptable and expected at the Gold Souk, Spice Souk, and traditional markets.",
    "Keep receipts — VAT refunds are available at the airport for eligible purchases.",
    "Counterfeit goods are present in Deira market areas — inspect items carefully before purchase.",
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
    { label: "Conservative clothing — long pants and covered shoulders for malls, souks, and public areas" },
    { label: "Light jacket or cardigan — Dubai's air conditioning is extremely cold indoors" },
    { label: "Sunscreen SPF 50+ and sunglasses — desert sun is intense even in cooler months" },
    { label: "AED cash (small denominations) for Deira souks, abra ferry rides, and street food" },
    { label: "Comfortable walking sandals for extended mall and souk exploration" },
  ],

  connectivityGuide: {
    overview: "Dubai has world-class 4G/5G connectivity. Tourist SIMs are available at Dubai International Airport upon arrival. Both Du and Etisalat (e&) offer tourist SIM packages with data and calling credit.",
    simOptions: [
      { provider: "Etisalat (e&)", type: "Tourist SIM", data: "10GB high-speed data", validity: "7 days", price: "AED 55", notes: "Available at Terminal 1 and Terminal 3 arrivals halls. Best coverage across the UAE." },
      { provider: "Du", type: "Tourist SIM", data: "10GB high-speed data", validity: "7 days", price: "AED 49–55", notes: "Available at the airport and Du retail stores in major malls. Competitive speeds." },
      { provider: "eSIM (Airalo / Holafly)", type: "eSIM", data: "Unlimited or tiered plans", validity: "7–30 days", price: "From USD 8", notes: "Pre-purchase and activate before boarding your flight. Convenient for newer smartphones." },
    ],
    wifi: "Free WiFi available at Dubai International Airport (DXB), all major malls, most hotels, and the Dubai Metro. Note: some VoIP services (WhatsApp calls, Skype, FaceTime calls) are restricted in the UAE — use cellular data calls or local SIM for voice.",
    recommendations: "Purchase a physical SIM at the airport for best reliability. Note that VoIP calling apps have restrictions in the UAE — use standard mobile calls for voice. WhatsApp text messages work normally.",
  },

  currencyGuide: {
    currency: "UAE Dirham",
    symbol: "د.إ",
    code: "AED",
    exchangeRate: "₱1 ≈ AED 0.068 (approximate)",
    roughPrices: [
      { item: "Shawarma (street kiosk)", price: "AED 5–AED 10" },
      { item: "Casual restaurant meal", price: "AED 40–AED 100" },
      { item: "Upscale restaurant meal", price: "AED 120–AED 300+" },
      { item: "Coffee (cafe)", price: "AED 15–AED 25" },
      { item: "Uber / Careem base fare (short trip)", price: "AED 12–AED 25" },
      { item: "Beer at a licensed hotel bar", price: "AED 35–AED 55" },
    ],
    tips: [
      "Exchange at authorized money changers in Deira, Gold Souk area, or DIFC for competitive rates — avoid hotel front desk exchanges.",
      "Notify your bank before travel to avoid card blocks on international transactions.",
      "Visa and Mastercard are widely accepted almost everywhere in Dubai — even small cafes.",
      "Keep AED 5–AED 20 notes for abra (traditional boat) rides, street food, and gratuities.",
    ],
  },

  destinationGuide: {
    intro: "Dubai is the world's most audacious city — a desert metropolis that has transformed itself in 50 years from a pearl-diving village to a global icon of architectural excess, luxury shopping, and multicultural energy. Home to the world's tallest tower, largest mall, and most expensive hotels, Dubai delivers spectacle at every turn while still preserving its authentic Arabic heritage in the labyrinthine lanes of Deira and the Al Fahidi Historical Neighbourhood.",
    highlights: [
      { icon: "🏙️", name: "Burj Khalifa (At The Top)", description: "The world's tallest building at 828 metres. The At The Top observation deck on Level 124 (and Levels 148/125 for Premium) delivers the most jaw-dropping cityscape view on the planet.", img: "/images/destinations/dubai/places/burj-khalifa.jpg" },
      { icon: "🛍️", name: "Dubai Mall + Dubai Fountain", description: "The world's largest shopping mall with over 1,200 stores, an indoor ice rink, the Dubai Aquarium, and the spectacular Dubai Fountain show that fires daily at the base of Burj Khalifa.", img: "/images/destinations/dubai/places/dubai-mall-dubai-fountain.jpg" },
      { icon: "🌴", name: "Palm Jumeirah Monorail", description: "Ride the Palm Monorail across the iconic palm-shaped artificial island to Atlantis The Palm. The views of the Dubai Marina skyline from the gateway station are extraordinary.", img: "/images/destinations/dubai/places/palm-jumeirah-monorail.jpg" },
      { icon: "🌃", name: "Dubai Marina at Night", description: "The Dubai Marina walk is a 7-km promenade along the world's largest man-made marina, lined with skyscrapers, restaurants, and yacht berths — stunning at night.", img: "/images/destinations/dubai/places/dubai-marina-at-night.jpg" },
      { icon: "🥇", name: "Gold Souk & Spice Souk (Deira)", description: "Dubai's historic Deira district contains the world-famous Gold Souk (250+ gold retailers) and the atmospheric Spice Souk — a sensory feast of saffron, frankincense, and exotic spices.", img: "/images/destinations/dubai/places/gold-souk-spice-souk-deira.jpg" },
      { icon: "🖼️", name: "Dubai Frame", description: "A 150-metre picture frame standing on the border of old and new Dubai — the glass bridge walkway on top connects the two sides and offers split views of historic Deira and modern Downtown.", img: "/images/destinations/dubai/places/dubai-frame.jpg" },
      { icon: "🏖️", name: "Jumeirah Beach", description: "Dubai's most famous public beach offers clear turquoise water, white sand, and the iconic Burj Al Arab silhouette in the background — best visited in the cooler months.", img: "/images/destinations/dubai/places/jumeirah-beach.jpg" },
      { icon: "🏜️", name: "Desert Safari with BBQ Dinner", description: "A quintessential Dubai experience — dune bashing in 4WDs, sandboarding, camel riding, henna painting, and a lavish BBQ dinner under the stars at a Bedouin camp.", img: "/images/destinations/dubai/places/desert-safari.jpg" },
      { icon: "⛵", name: "Abra (Traditional Dhow) Crossing", description: "Cross Dubai Creek on a traditional wooden abra (water taxi) for AED 1 — connecting Deira and Bur Dubai, passing wooden dhows loaded with goods, as traders have done for centuries.", img: "/images/destinations/dubai/places/abra-dubai-creek.jpg" },
      { icon: "🌍", name: "Global Village", description: "An open-air multicultural festival and entertainment park (open October–April) where 90+ countries present their culture, food, and crafts in themed pavilions spread across 1.6 million sq m.", img: "/images/destinations/dubai/places/global-village.jpg" },
      { icon: "🌸", name: "Dubai Miracle Garden", description: "The world's largest natural flower garden (open October–April) with over 150 million flowers sculpted into life-size replicas of the Burj Khalifa, aircraft, and fairy-tale structures.", img: "/images/destinations/dubai/places/dubai-miracle-garden.jpg" },
      { icon: "🎡", name: "Atlantis The Palm", description: "The landmark resort hotel on Palm Jumeirah — home to Aquaventure Waterpark, The Lost Chambers Aquarium, and some of the most spectacular ocean-view rooms in the world.", img: "/images/destinations/dubai/places/atlantis-the-palm.jpg" },
    ],
    practicalInfo: [
      { label: "Best Time to Visit", value: "November–March (cool season, 20–28°C). Peak tourist season. Summers (June–September) see temperatures of 40–48°C — outdoor activities are extremely limited." },
      { label: "Language", value: "Arabic is official, but English is the working language. Almost all signage, menus, and transport information is in English alongside Arabic." },
      { label: "Weather", value: "Desert climate — hot and dry. November–March: 18–28°C. April–June: 30–40°C. July–September: 40–48°C (extreme). Humidity can spike to 90%+ in summer near the coast." },
      { label: "Time Zone", value: "GST (UTC+4) — Dubai is 4 hours AHEAD of the Philippines. Adjust your watch upon arrival." },
      { label: "Currency", value: "UAE Dirham (AED, د.إ). ₱1 ≈ AED 0.068. Shawarma AED 5–10. Uber/Careem base AED 12–25." },
      { label: "Religion & Customs", value: "Islamic country. Dress modestly in public — covered shoulders and knees. No public displays of affection. During Ramadan, eating and drinking in public during daylight hours is restricted." },
    ],
    bestFood: [
      { name: "Shawarma", desc: "The ubiquitous Dubai street food — spiced meat (chicken or lamb) shaved from a vertical rotisserie, wrapped in flatbread with garlic sauce, pickles, and tomatoes. AED 5–10 at any kiosk.", img: "/images/destinations/dubai/food/shawarma.jpg" },
      { name: "Al Harees", desc: "A traditional Emirati dish of wheat and meat slow-cooked for hours in a clay pot until silky smooth — a Ramadan staple and authentic taste of old Dubai.", img: "/images/destinations/dubai/food/al-harees.jpg" },
      { name: "Luqaimat", desc: "Crispy fried dough balls drizzled with date syrup and sesame seeds — Dubai's beloved street dessert, traditionally served during Ramadan but available year-round.", img: "/images/destinations/dubai/food/luqaimat.jpg" },
      { name: "Grilled Hammour Fish", desc: "Hammour (a local grouper) is Dubai's favourite fish — grilled whole and seasoned with baharat spices, served with khubz (flatbread) and tangy tamarind sauce.", img: "/images/destinations/dubai/food/grilled-hammour.jpg" },
      { name: "Kunafa", desc: "A Middle Eastern dessert of shredded wheat pastry layered over sweet white cheese, soaked in sugar syrup and topped with crushed pistachios. Rich, gooey, and completely irresistible.", img: "/images/destinations/dubai/food/kunafa.jpg" },
    ],
    photoSpots: [
      { name: "Burj Khalifa at Sunset from Burj Park", desc: "The green lawn of Burj Park offers the best ground-level perspectives of Burj Khalifa. Arrive 30 minutes before sunset for golden-hour light on the tower's metallic facade.", img: "/images/destinations/dubai/photo-spots/burj-khalifa-at-sunset.jpg" },
      { name: "Dubai Fountain Show from Dubai Mall Terrace", desc: "The outdoor terrace of Dubai Mall, directly facing the fountain, is the prime spot for shooting the world's largest choreographed fountain show — runs at 6 PM, 6:30 PM, and every 30 min until 11 PM.", img: "/images/destinations/dubai/photo-spots/dubai-fountain-show.jpg" },
      { name: "Palm Jumeirah Monorail with Atlantis View", desc: "Ride the Palm Monorail and shoot from the train windows for sweeping aerial views of the Palm fronds and the iconic Atlantis hotel at the crescent tip.", img: "/images/destinations/dubai/photo-spots/palm-jumeirah-monorail.jpg" },
      { name: "Dubai Marina Walk at Night", desc: "The illuminated skyscraper canyon of the Marina with yachts in the foreground creates one of the world's most dramatic urban nightscapes. The JBR end offers the widest compositions.", img: "/images/destinations/dubai/photo-spots/dubai-marina-at-night.jpg" },
      { name: "Desert Dunes at Golden Hour", desc: "During the desert safari, the hour before sunset transforms the sand dunes into an ocean of liquid gold. Photograph from the dune crest for uninterrupted skylines in every direction.", img: "/images/destinations/dubai/photo-spots/desert-dunes-golden-hour.jpg" },
    ],
    localTips: [
      { icon: "🚇", tip: "Use the Dubai Metro (Red and Green Lines) for efficient, air-conditioned travel across the city. Get a Nol Card (available at any Metro station) for seamless tap-in/tap-out access." },
      { icon: "🤝", tip: "Public displays of affection — kissing, hugging between unmarried couples — are illegal in Dubai. Be mindful of cultural norms in public spaces, parks, and malls." },
      { icon: "🌙", tip: "During Ramadan, eating, drinking, and smoking in public during daylight hours is restricted. Many restaurants close during the day but open at sunset (iftar). Respect this throughout your visit." },
      { icon: "👔", tip: "Dress modestly in public areas and malls. Shorts and sleeveless tops are generally tolerated in tourist zones and beach areas, but avoid overly revealing clothing in souks and local markets." },
      { icon: "📅", tip: "The UAE weekend is Friday–Saturday. Most government offices and some malls have adjusted hours on Fridays. Souks and local markets are busiest on Friday evenings." },
      { icon: "❄️", tip: "Dubai air conditioning is extremely cold. Carry a light jacket or cardigan whenever entering malls, cinemas, or restaurants — the temperature contrast from 40°C outside to 18°C inside is stark." },
    ],
    safetyTips: [
      { icon: "🛡️", tip: "Dubai is one of the world's safest cities for tourists. Violent crime is extremely rare. The main concerns are heat-related illness in summer and traffic accidents." },
      { icon: "⚖️", tip: "UAE laws are strict. No drugs (zero tolerance — trafficking carries the death penalty), alcohol only at licensed hotel venues, and no offensive gestures (even in traffic) — these are criminal offences." },
      { icon: "🪪", tip: "Always carry your passport (or a clear photocopy). Hotel check-in and some attractions require ID. Losing your passport in Dubai requires a consulate visit and a police report." },
      { icon: "🌡️", tip: "Desert heat is life-threatening in summer months. Stay inside air-conditioned spaces from 12 PM–4 PM, drink at least 3 litres of water per day, and watch for signs of heat exhaustion." },
      { icon: "📸", tip: "Photography of government buildings, palaces, military installations, and airports is prohibited. Also avoid photographing local Emirati women without permission — it is considered disrespectful." },
      { icon: "🆘", tip: "Emergency numbers: Police 999 | Ambulance 998 | Fire 997 | Dubai Police Tourist Hotline +971-800-4438. Response times are fast and services are excellent." },
    ],
  },

  emergencyContacts: {
    local: [
      { label: "Police", value: "999" },
      { label: "Medical Emergency / Ambulance", value: "998" },
      { label: "Fire Department", value: "997" },
      { label: "Tourist Police Hotline", value: "+971-800-4438" },
    ],
    philippineConsulate: {
      label: "Philippine Overseas Labor Office / Consulate Dubai",
      value: "+971-4-220-7100",
      address: "Emarat Atrium Building, Sheikh Zayed Road, Dubai, UAE",
    },
  },

  assistanceContacts: [
    { label: "Gladex Tours Hotline", value: "+63 917 875 2200" },
    { label: "Email", value: "support@gladextours.com" },
    { label: "Facebook", value: "m.me/gladextours" },
  ],

  dosAndDonts: {
    dos: [
      "Respect Islamic customs and laws — dress modestly in public and at all shopping areas.",
      "Carry your passport or a photocopy of your ID at all times — hotels and some attractions require it.",
      "Use the Dubai Metro (Nol Card) for affordable and air-conditioned citywide travel.",
      "Book the Desert Safari experience in advance — it is the most memorable activity in Dubai.",
      "Explore the Gold Souk and Spice Souk in Deira for authentic Dubai heritage shopping.",
      "Use Uber or Careem (ride-hailing apps) for transparent fixed-price transport across the city.",
    ],
    donts: [
      "Do not photograph restricted areas — government buildings, palaces, and military facilities.",
      "Do not consume alcohol outside of licensed hotel restaurants and bars.",
      "Do not make public displays of affection — holding hands between unmarried couples can be penalised.",
      "Do not use offensive hand gestures or profanity in public or in traffic.",
      "Do not bring, carry, or use any controlled substances — UAE drug laws carry the death penalty.",
      "Do not dress immodestly in public malls, souks, or non-beach public spaces — you may be asked to leave or fined.",
    ],
  },

  faqs: [
    { question: "Do I need a visa to enter Dubai?", answer: "Philippine passport holders require a UAE tourist visa prior to arrival. A 30-day UAE Tourist Visa is typically issued. Your Gladex Tours package includes visa processing guidance. Ensure your passport is valid for at least 6 months beyond your travel date. Confirm current visa regulations with your travel consultant before departure." },
    { question: "What currency should I bring?", answer: "UAE Dirham (AED, د.إ). Cards are widely accepted throughout Dubai. Carry AED 200–500 in cash for the Gold Souk, Spice Souk, abra rides, and street shawarma stands. ₱1 ≈ AED 0.068. Exchange at authorized money changers in Deira for better rates than hotels." },
    { question: "What SIM card is best for Dubai?", answer: "Purchase an Etisalat (e&) or Du tourist SIM at Dubai International Airport arrivals hall. A 7-day 10GB SIM costs approximately AED 49–55. Note: VoIP calling apps like WhatsApp calls and FaceTime audio are restricted in the UAE — use standard mobile calls for voice. Text messages and data work normally." },
    { question: "What are the must-try foods in Dubai?", answer: "Shawarma (best from street kiosks in Deira), Luqaimat (fried honey dumplings), Kunafa (cheese pastry dessert), Al Harees, and Grilled Hammour fish. For the full experience, visit a traditional Arabic restaurant in Al Fahidi Historical Neighbourhood." },
    { question: "Is Dubai safe for tourists?", answer: "Dubai is exceptionally safe for tourists — consistently ranked among the world's lowest crime cities. Laws are strict but simple to follow: dress modestly in public, no alcohol outside licensed venues, no public displays of affection, and avoid all illegal substances. Emergency services are fast and highly professional." },
  ],
};
