import { getMediaForSlug } from "./mediaConfig.js";

/**
 * Rich destination content for TourPackagePage sections:
 * - Photo galleries with descriptions (multiple blocks)
 * - What to Expect
 * - What to Bring
 * - Season/Weather info
 * - Trending Sights
 * - You Might Also Like activities
 * - Sample Reviews
 */

const defaultContent = {
  whatToExpect: [
    "An unforgettable journey through breathtaking landscapes and vibrant culture.",
    "Expertly guided tours to the most iconic landmarks and hidden gems.",
    "Authentic local cuisine and unique cultural experiences.",
    "Safe, organized travel with English-speaking guides throughout.",
    "Comfortable accommodation and seamless airport transfers.",
  ],
  whatToBring: [
    { icon: "👟", label: "Comfortable walking shoes" },
    { icon: "👕", label: "Light, breathable clothing" },
    { icon: "🧴", label: "Sunscreen & insect repellent" },
    { icon: "💊", label: "Personal medication" },
    { icon: "📄", label: "Valid passport & documents" },
    { icon: "💴", label: "Local currency (cash)" },
    { icon: "🎒", label: "Small daypack or bag" },
    { icon: "📱", label: "Charged phone & power bank" },
  ],
  seasons: [
    { label: "Jan – Mar", weather: "Cool & dry", icon: "☀️", note: "Great for outdoor sightseeing" },
    { label: "Apr – Jun", weather: "Warm", icon: "🌤", note: "Peak tourist season" },
    { label: "Jul – Sep", weather: "Hot & humid", icon: "🌧", note: "Some rain expected" },
    { label: "Oct – Dec", weather: "Mild & pleasant", icon: "🍂", note: "Great for travel" },
  ],
  reviews: [
    { name: "Maria S.", rating: 5, text: "Beautiful destination and very organized. Highly recommend!", date: "March 2025" },
    { name: "Renz D.", rating: 5, text: "Great experience, easy to follow instructions from the guide.", date: "February 2025" },
    { name: "Liza M.", rating: 5, text: "Worth every peso! Will travel again with Gladex.", date: "January 2025" },
  ],
  trendingSights: [],
  mightAlsoLike: [],
  galleryBlocks: [],
};

export const destinationContent = {
  korea: {
    whatToExpectTitle: "What to Expect from South Korea Tour",
    whatToExpect: [
      "Walk through ancient palaces like Gyeongbokgung, frozen in time amid modern Seoul.",
      "Stroll the romantic paths of Nami Island, famous for its tree-lined avenues and seasonal beauty.",
      "Explore vibrant neighborhoods like Hongdae and Myeongdong — K-pop, street food, and fashion.",
      "Visit Bukchon Hanok Village, where centuries-old traditional Korean houses line narrow alleyways.",
      "Shop in COEX Mall, one of Asia's largest underground malls, and enjoy local Korean cuisine.",
      "Experience the excitement of a possible ski resort visit for December departures.",
    ],
    galleryBlocks: [
      {
        title: "Destination Highlights",
        images: [
          { url: "https://images.unsplash.com/photo-1562832135-14a35d25edef?w=800&q=80", caption: "Gyeongbokgung Palace — the grand royal palace at the heart of Seoul." },
          { url: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80", caption: "Nami Island — famous tree-lined path perfect for every season." },
          { url: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&q=80", caption: "Bukchon Hanok Village — traditional Korean houses on a hillside." },
          { url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80", caption: "Seoul Tower — iconic landmark with panoramic city views." },
          { url: "https://images.unsplash.com/photo-1563115298-e9585e7943d4?w=800&q=80", caption: "Myeongdong — Seoul's ultimate shopping and street food district." },
        ],
      },
      {
        title: "Cultural Experience",
        images: [
          { url: "https://images.unsplash.com/photo-1598977564768-6e3a741d0e33?w=800&q=80", caption: "Traditional Korean hanbok — a beautiful cultural experience." },
          { url: "https://images.unsplash.com/photo-1579265415048-03f0d7df5a10?w=800&q=80", caption: "Korean street food stalls — tteokbokki, hotteok, and more." },
          { url: "https://images.unsplash.com/photo-1589602007861-9f78a1c2f66c?w=800&q=80", caption: "Insadong cultural street — arts, crafts, and traditional tea houses." },
          { url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80", caption: "Korean BBQ — an unmissable dining experience in Korea." },
        ],
      },
    ],
    whatToBring: [
      { icon: "🧥", label: "Warm jacket (especially for winter)" },
      { icon: "👟", label: "Comfortable walking shoes" },
      { icon: "💴", label: "Korean Won (KRW) for shopping" },
      { icon: "📄", label: "Valid passport & Korea visa" },
      { icon: "🧣", label: "Scarf and gloves (for Dec departures)" },
      { icon: "📱", label: "Pocket WiFi or SIM card" },
      { icon: "🎒", label: "Small daypack for day tours" },
      { icon: "💊", label: "Personal medication" },
    ],
    seasons: [
      { label: "Mar – May", weather: "Spring / Cherry Blossom", icon: "🌸", note: "Ideal — beautiful cherry blossoms everywhere" },
      { label: "Jun – Aug", weather: "Hot & Humid", icon: "☀️", note: "Summer — warm but busy" },
      { label: "Sep – Nov", weather: "Autumn Foliage", icon: "🍁", note: "Stunning fall colors — highly recommended" },
      { label: "Dec – Feb", weather: "Cold / Snow", icon: "❄️", note: "Winter — ski resorts active, festive atmosphere" },
    ],
    reviews: [
      { name: "Janine R.", rating: 5, text: "Korea was absolutely magical! Nami Island in autumn is stunning. Gladex organized everything perfectly.", date: "November 2024" },
      { name: "Carlo M.", rating: 5, text: "The guide was excellent. Palace tours, Hongdae, Myeongdong — all amazing. Will come back!", date: "October 2024" },
      { name: "Grace T.", rating: 5, text: "First time in Korea and it exceeded all expectations. Food, culture, shopping — all 10/10!", date: "September 2024" },
    ],
    trendingSights: ["Gyeongbokgung Palace", "Nami Island", "Bukchon Hanok Village", "Seoul Tower", "Myeongdong Shopping District", "Hongdae"],
    mightAlsoLike: ["Everland Theme Park", "COEX Aquarium", "K-pop Concert Experience", "DMZ Tour", "Korean Cooking Class"],
  },

  japan: {
    whatToExpectTitle: "What to Expect from Japan Tour",
    whatToExpect: [
      "Experience the timeless beauty of Osaka Castle surrounded by cherry blossoms or autumn leaves.",
      "Wander through the thousands of torii gates at Fushimi Inari Shrine in Kyoto.",
      "Feed friendly deer at Nara Deer Park — a unique and unforgettable encounter.",
      "Explore Shinsekai District, a retro neighborhood full of street food and local flavor.",
      "Visit Kuromon Ichiba Market — Osaka's Kitchen — packed with fresh seafood and local produce.",
      "Optional: spend a full day at Universal Studios Japan, including the Wizarding World of Harry Potter.",
    ],
    galleryBlocks: [
      {
        title: "Destination Highlights",
        images: [
          { url: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80", caption: "Fushimi Inari Shrine — thousands of torii gates winding through the forest." },
          { url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80", caption: "Osaka Castle — a majestic historic landmark in the heart of the city." },
          { url: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80", caption: "Nara Deer Park — roam freely with over 1,000 friendly deer." },
          { url: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800&q=80", caption: "Dotonbori — Osaka's iconic entertainment district glowing at night." },
          { url: "https://images.unsplash.com/photo-1578637387939-43c525550085?w=800&q=80", caption: "Arashiyama Bamboo Grove — a magical walk through towering bamboo." },
        ],
      },
      {
        title: "Culture & Food",
        images: [
          { url: "https://images.unsplash.com/photo-1579290879696-4e6e87ab7b4e?w=800&q=80", caption: "Traditional Japanese ramen — a must-try on every Japan trip." },
          { url: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80", caption: "Kyoto geisha district — Gion, where tradition meets evening elegance." },
          { url: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=800&q=80", caption: "Japan street food — takoyaki, okonomiyaki, and matcha treats." },
          { url: "https://images.unsplash.com/photo-1440778303588-435521a205bc?w=800&q=80", caption: "Osaka's vibrant nightlife — lanterns, lights, and local energy." },
        ],
      },
    ],
    whatToBring: [
      { icon: "🧥", label: "Layered clothing (seasonal)" },
      { icon: "👟", label: "Comfortable walking shoes" },
      { icon: "💴", label: "Japanese Yen (JPY) — cash preferred" },
      { icon: "📄", label: "Valid passport & Japan Tourist Visa" },
      { icon: "🎒", label: "Small backpack for day trips" },
      { icon: "📱", label: "IC Card / Pocket WiFi" },
      { icon: "🧴", label: "Sunscreen & personal care" },
      { icon: "💊", label: "Personal medication" },
    ],
    seasons: [
      { label: "Mar – May", weather: "Spring / Cherry Blossoms", icon: "🌸", note: "Peak season — stunning sakura blooms" },
      { label: "Jun – Aug", weather: "Hot & Humid", icon: "🌞", note: "Summer festivals — lively and warm" },
      { label: "Sep – Nov", weather: "Autumn Foliage", icon: "🍁", note: "Beautiful red and gold leaves" },
      { label: "Dec – Feb", weather: "Cold / Winter", icon: "❄️", note: "Snow in some areas — warm indoor experiences" },
    ],
    reviews: [
      { name: "Paolo T.", rating: 5, text: "Japan is on another level. Fushimi Inari, Nara, Dotonbori — all absolutely incredible. Best trip of my life!", date: "April 2025" },
      { name: "Anna L.", rating: 5, text: "The guide was so helpful and knowledgeable. Everything was organized perfectly.", date: "March 2025" },
      { name: "Miko S.", rating: 5, text: "Japan exceeded every expectation. The food, the culture, the people — simply beautiful.", date: "February 2025" },
    ],
    trendingSights: ["Fushimi Inari Shrine", "Osaka Castle", "Nara Deer Park", "Dotonbori", "Arashiyama Bamboo Grove", "Universal Studios Japan"],
    mightAlsoLike: ["Mt Fuji Day Tour", "Tokyo Disneyland", "Kyoto Full Day", "Hiroshima & Miyajima Island", "Nara Deer Park Tour"],
  },

  singapore: {
    whatToExpectTitle: "What to Expect from Singapore Tour",
    whatToExpect: [
      "Marvel at the futuristic Supertrees at Gardens by the Bay — a world-famous landmark.",
      "Visit Merlion Park and take iconic photos by the Singapore waterfront.",
      "Explore the vibrant cultural districts of Chinatown, Little India, and Arab Street.",
      "Optional: spend a thrilling day at Universal Studios Singapore on Sentosa Island.",
      "Discover the world's first Night Safari — an extraordinary after-dark wildlife experience.",
      "Shop at Orchard Road, Singapore's premier shopping boulevard.",
    ],
    galleryBlocks: [
      {
        title: "Destination Highlights",
        images: [
          { url: "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&q=80", caption: "Marina Bay Sands — Singapore's most iconic building with rooftop infinity pool." },
          { url: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80", caption: "Gardens by the Bay — futuristic Supertrees light up at night." },
          { url: "https://images.unsplash.com/photo-1506870799893-1e0a3e02b25c?w=800&q=80", caption: "Merlion Park — the iconic symbol of the Lion City." },
          { url: "https://images.unsplash.com/photo-1563115298-e9585e7943d4?w=800&q=80", caption: "Sentosa Island — beaches, theme parks, and endless entertainment." },
          { url: "https://images.unsplash.com/photo-1512152272829-e3139592d56f?w=800&q=80", caption: "Universal Studios Singapore — rides, shows, and movie magic." },
        ],
      },
      {
        title: "Culture & City Life",
        images: [
          { url: "https://images.unsplash.com/photo-1538683541876-0a7a793a7e48?w=800&q=80", caption: "Chinatown — colorful heritage shophouses and vibrant street markets." },
          { url: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&q=80", caption: "Little India — vibrant colors, spices, and cultural charm." },
          { url: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80", caption: "Hawker Centre — Singapore's beloved local food culture at its best." },
          { url: "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=800&q=80", caption: "Singapore Flyer — the giant observation wheel with sweeping city views." },
        ],
      },
    ],
    whatToBring: [
      { icon: "👕", label: "Light, breathable clothing" },
      { icon: "👟", label: "Comfortable walking shoes" },
      { icon: "💳", label: "Credit/Debit card (cashless city)" },
      { icon: "📄", label: "Valid passport" },
      { icon: "🧴", label: "Sunscreen (tropical heat)" },
      { icon: "🎒", label: "Small daypack" },
      { icon: "📱", label: "Singapore Tourist SIM or WiFi" },
      { icon: "👗", label: "Modest clothing for religious sites" },
    ],
    seasons: [
      { label: "Jan – Mar", weather: "Hot & Dry", icon: "☀️", note: "Great for outdoor activities" },
      { label: "Apr – Jun", weather: "Warm & Occasional Rain", icon: "🌤", note: "Good travel weather" },
      { label: "Jul – Sep", weather: "Hot with showers", icon: "🌦", note: "Short afternoon showers typical" },
      { label: "Oct – Dec", weather: "Wetter / NE Monsoon", icon: "🌧", note: "Bring a light raincoat" },
    ],
    reviews: [
      { name: "Kristine B.", rating: 5, text: "Singapore is stunning. Gardens by the Bay at night is unbelievable. Love this trip!", date: "April 2025" },
      { name: "Jun M.", rating: 5, text: "Loved Universal Studios and the food tour in Chinatown. Will definitely go back!", date: "March 2025" },
      { name: "Tricia A.", rating: 5, text: "Seamless travel experience. Guide was amazing and hotel was perfect.", date: "January 2025" },
    ],
    trendingSights: ["Marina Bay Sands", "Gardens by the Bay", "Merlion Park", "Sentosa Island", "Universal Studios Singapore", "Chinatown"],
    mightAlsoLike: ["Universal Studios Singapore", "Night Safari", "Sentosa Adventure Cove", "Marina Bay SkyPark", "Singapore Flyer"],
  },

  bangkok: {
    whatToExpectTitle: "What to Expect from Bangkok Tour",
    whatToExpect: [
      "Explore the ornate Wat Arun (Temple of Dawn) rising majestically above the Chao Phraya River.",
      "Cruise the iconic Chao Phraya River and soak in Bangkok's waterfront scenery.",
      "Visit the colorful floating markets — a uniquely Thai shopping experience on the water.",
      "Discover the Grand Palace area, home to the legendary Emerald Buddha.",
      "Experience the electric energy of Bangkok's street food scene and vibrant night markets.",
      "Optional day trip to Ayutthaya — Thailand's ancient capital, a UNESCO World Heritage Site.",
    ],
    galleryBlocks: [
      {
        title: "Destination Highlights",
        images: [
          { url: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80", caption: "Wat Arun — the Temple of Dawn reflecting on the Chao Phraya River." },
          { url: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80", caption: "Grand Palace — the glittering royal complex at the heart of Bangkok." },
          { url: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80", caption: "Floating Market — vibrant and colorful boats selling local produce." },
          { url: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80", caption: "Chao Phraya River — Bangkok's lifeline flowing through the city." },
          { url: "https://images.unsplash.com/photo-1524613032530-449a5d94c285?w=800&q=80", caption: "Bangkok street food scene — delicious local flavors at every corner." },
        ],
      },
      {
        title: "Temples & Culture",
        images: [
          { url: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80", caption: "Wat Pho — home to the massive golden reclining Buddha." },
          { url: "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=800&q=80", caption: "Ayutthaya — ancient ruins of Thailand's former capital." },
          { url: "https://images.unsplash.com/photo-1583417267826-aebc4d1542e1?w=800&q=80", caption: "Thai cultural performance — traditional dance and music." },
          { url: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80", caption: "Night market Bangkok — shopping, street food, and local life after dark." },
        ],
      },
    ],
    whatToBring: [
      { icon: "👕", label: "Light clothing (humid climate)" },
      { icon: "👗", label: "Modest clothing for temples" },
      { icon: "👟", label: "Comfortable walking shoes" },
      { icon: "💴", label: "Thai Baht (THB) for expenses" },
      { icon: "📄", label: "Valid passport" },
      { icon: "🧴", label: "Sunscreen & insect repellent" },
      { icon: "🎒", label: "Small daypack" },
      { icon: "💊", label: "Personal medication" },
    ],
    seasons: [
      { label: "Nov – Feb", weather: "Cool & Dry Season", icon: "☀️", note: "Best time to visit — pleasant weather" },
      { label: "Mar – May", weather: "Hot Season", icon: "🌡", note: "Very hot — stay hydrated" },
      { label: "Jun – Oct", weather: "Rainy Season", icon: "🌧", note: "Green scenery, some flooding possible" },
      { label: "Oct – Nov", weather: "Transition", icon: "🌤", note: "Cooling down — good for travel" },
    ],
    reviews: [
      { name: "Bing R.", rating: 5, text: "Bangkok was incredible! The floating market and temple tours were highlights of my year.", date: "February 2025" },
      { name: "Dennis V.", rating: 5, text: "Amazing trip, our guide was fantastic. Thai food is absolutely delicious!", date: "January 2025" },
      { name: "Claire S.", rating: 4, text: "Great value trip. The city tour was informative and the hotel was clean and comfortable.", date: "December 2024" },
    ],
    trendingSights: ["Wat Arun", "Grand Palace", "Floating Market", "Chao Phraya River", "Ayutthaya Ruins", "Bangkok Night Market"],
    mightAlsoLike: ["Ayutthaya Ancient City Tour", "Chao Phraya Dinner Cruise", "Floating Market Tour", "Safari World", "Coral Island Day Trip"],
  },

  hongkong: {
    whatToExpectTitle: "What to Expect from Hong Kong Tour",
    whatToExpect: [
      "Ride the Ngong Ping 360 cable car to the serene Big Buddha on Lantau Island.",
      "Experience the magic of Hong Kong Disneyland — entertainment for all ages.",
      "Take a water taxi across Victoria Harbour and see the iconic skyline up close.",
      "Explore the bustling Mong Kok and Causeway Bay shopping districts.",
      "Optional day trip to Macau — the Vegas of Asia, just a ferry ride away.",
      "Enjoy Hong Kong's world-famous dim sum and Cantonese cuisine.",
    ],
    galleryBlocks: [
      {
        title: "Destination Highlights",
        images: [
          { url: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80", caption: "Victoria Harbour — Hong Kong's iconic skyline glittering at night." },
          { url: "https://images.unsplash.com/photo-1512452935861-f17bb7c2c8b4?w=800&q=80", caption: "Ngong Ping Cable Car — scenic ride to Big Buddha on Lantau Island." },
          { url: "https://images.unsplash.com/photo-1549592887-f18f358ec977?w=800&q=80", caption: "Hong Kong Disneyland — fantasy and fun for everyone." },
          { url: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=800&q=80", caption: "Mong Kok — vibrant streets and world-class street food." },
          { url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80", caption: "Ocean Park — thrilling rides overlooking the South China Sea." },
        ],
      },
      {
        title: "City & Culture",
        images: [
          { url: "https://images.unsplash.com/photo-1474514644254-7584d77212b0?w=800&q=80", caption: "Dim sum breakfast — Hong Kong's beloved morning tradition." },
          { url: "https://images.unsplash.com/photo-1563115298-e9585e7943d4?w=800&q=80", caption: "Temple Street Night Market — a maze of street stalls and local goods." },
          { url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&q=80", caption: "Star Ferry — crossing Victoria Harbour since 1888." },
          { url: "https://images.unsplash.com/photo-1506870799893-1e0a3e02b25c?w=800&q=80", caption: "The Peak — panoramic views of one of Asia's greatest skylines." },
        ],
      },
    ],
    whatToBring: [
      { icon: "👕", label: "Comfortable, layered clothing" },
      { icon: "👟", label: "Comfortable walking shoes" },
      { icon: "💳", label: "Octopus Card for transport" },
      { icon: "💴", label: "Hong Kong Dollar (HKD)" },
      { icon: "📄", label: "Valid passport" },
      { icon: "🎒", label: "Small daypack" },
      { icon: "📱", label: "Local SIM or WiFi device" },
      { icon: "💊", label: "Personal medication" },
    ],
    seasons: [
      { label: "Oct – Dec", weather: "Cool & Dry", icon: "🍂", note: "Best time — comfortable weather" },
      { label: "Jan – Mar", weather: "Cool & Occasionally Cloudy", icon: "🌤", note: "Good for sightseeing" },
      { label: "Apr – Jun", weather: "Warm & Humid", icon: "🌦", note: "Some rain — light layers recommended" },
      { label: "Jul – Sep", weather: "Hot, Humid & Typhoon Season", icon: "⛈", note: "Typhoon risk — check forecasts" },
    ],
    reviews: [
      { name: "Sarah L.", rating: 5, text: "Hong Kong Disneyland was magical. The whole trip was well-organized and memorable!", date: "December 2024" },
      { name: "Mark B.", rating: 5, text: "Victoria Harbour at night is breathtaking. Hong Kong is truly world-class.", date: "November 2024" },
      { name: "Joy P.", rating: 5, text: "The food, the sights, the shopping — Hong Kong has it all. Loved every moment!", date: "October 2024" },
    ],
    trendingSights: ["Victoria Harbour", "Ngong Ping 360", "Hong Kong Disneyland", "Ocean Park", "The Peak", "Temple Street Night Market"],
    mightAlsoLike: ["Macau Day Tour", "Ocean Park", "Lantau Island Trek", "Night Market Tour", "Harbour Cruise"],
  },

  dubai: {
    whatToExpectTitle: "What to Expect from Dubai Tour",
    whatToExpect: [
      "Stand in awe of the Burj Khalifa — the world's tallest tower — dominating the Dubai skyline.",
      "Browse the legendary Dubai Mall and discover a world of luxury retail and entertainment.",
      "Explore the historic Gold Souk and Spice Souk in the old Dubai Creek area.",
      "Optional: experience an unforgettable desert safari with dune bashing and BBQ dinner under the stars.",
      "Stroll along JBR Beach Walk for seaside dining and shopping by the Arabian Gulf.",
      "Discover a city where ultra-modern architecture meets deep Arabian heritage.",
    ],
    galleryBlocks: [
      {
        title: "Destination Highlights",
        images: [
          { url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80", caption: "Burj Khalifa — the world's tallest building soaring above Dubai." },
          { url: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80", caption: "Dubai Mall — one of the world's largest shopping destinations." },
          { url: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&q=80", caption: "Dubai Creek — the historic heart of old Dubai with traditional dhow boats." },
          { url: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&q=80", caption: "Desert Safari — golden dunes and breathtaking sunset over the Arabian Desert." },
          { url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80", caption: "Palm Jumeirah — Dubai's iconic palm-shaped island from above." },
        ],
      },
      {
        title: "Culture & Luxury",
        images: [
          { url: "https://images.unsplash.com/photo-1537019575197-df34b8e86e60?w=800&q=80", caption: "Gold Souk — glittering jewelry and precious metals in the old market." },
          { url: "https://images.unsplash.com/photo-1568797629192-789acf8e4df3?w=800&q=80", caption: "Dhow Cruise Dinner — fine dining on traditional wooden boats at night." },
          { url: "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=800&q=80", caption: "JBR Beach Walk — vibrant seafront promenade on the Arabian Gulf." },
          { url: "https://images.unsplash.com/photo-1579265415048-03f0d7df5a10?w=800&q=80", caption: "Spice Souk — aromas and colors of exotic spices from around the world." },
        ],
      },
    ],
    whatToBring: [
      { icon: "👗", label: "Modest clothing for public areas" },
      { icon: "👟", label: "Comfortable walking shoes" },
      { icon: "💴", label: "UAE Dirham (AED) for tips" },
      { icon: "💳", label: "Credit/debit cards (widely accepted)" },
      { icon: "📄", label: "Valid passport & visa (if required)" },
      { icon: "🧴", label: "Sunscreen (strong desert sun)" },
      { icon: "🎒", label: "Small daypack" },
      { icon: "💊", label: "Personal medication" },
    ],
    seasons: [
      { label: "Nov – Mar", weather: "Cool & Pleasant", icon: "☀️", note: "Best time to visit — outdoor activities perfect" },
      { label: "Apr – Jun", weather: "Warm to Hot", icon: "🌡", note: "Heating up — still manageable" },
      { label: "Jul – Sep", weather: "Extremely Hot", icon: "🔥", note: "Intense heat — mostly indoors recommended" },
      { label: "Oct", weather: "Cooling Down", icon: "🌤", note: "Transitioning — good for travel" },
    ],
    reviews: [
      { name: "Rey C.", rating: 5, text: "Dubai is beyond imagination. The Burj Khalifa, the desert safari, the shopping — all world-class!", date: "March 2025" },
      { name: "Lea M.", rating: 5, text: "The private transfer service was excellent. Desert safari at sunset was truly magical.", date: "February 2025" },
      { name: "Tony B.", rating: 5, text: "First time in the Middle East and Dubai blew my mind. Highly recommend Gladex for this trip.", date: "January 2025" },
    ],
    trendingSights: ["Burj Khalifa", "Dubai Mall", "Gold Souk", "Desert Safari", "Palm Jumeirah", "JBR Beach Walk"],
    mightAlsoLike: ["Desert Safari with BBQ Dinner", "Dubai City Tour", "Dhow Cruise Dinner", "Dubai Frame", "Burj Khalifa At The Top"],
  },

  bali: {
    whatToExpectTitle: "What to Expect from Bali Tour",
    whatToExpect: [
      "Witness a breathtaking Kecak Fire Dance performance at Uluwatu Temple above the Indian Ocean cliff.",
      "Explore the terraced emerald Tegalalang Rice Fields — a UNESCO-listed cultural landscape.",
      "Visit Tanah Lot, a sacred sea temple perched dramatically on a rocky outcrop.",
      "Enjoy a complimentary Coffee Factory Tour and taste world-famous Balinese kopi.",
      "Optional: experience the famous Bali Swing for panoramic jungle views and stunning photos.",
      "Island-hop to Nusa Penida — home to the iconic Kelingking Beach and crystal-clear waters.",
    ],
    galleryBlocks: [
      {
        title: "Destination Highlights",
        images: [
          { url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80", caption: "Tegalalang Rice Terraces — Bali's iconic emerald-green staircase fields." },
          { url: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80", caption: "Uluwatu Temple — sacred sea temple perched on dramatic ocean cliffs." },
          { url: "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=800&q=80", caption: "Tanah Lot — Bali's most photographed sunset spot by the sea." },
          { url: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80", caption: "Kelingking Beach — Nusa Penida's breathtaking T-Rex shaped cliff." },
          { url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=80", caption: "Bali Swing — thrilling jungle swing with panoramic rice terrace views." },
        ],
      },
      {
        title: "Culture & Temples",
        images: [
          { url: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80", caption: "Kecak Fire Dance — a dramatic Balinese dance performed at sunset." },
          { url: "https://images.unsplash.com/photo-1574068468668-a05a11f871da?w=800&q=80", caption: "Traditional Balinese offering — a daily ritual of flowers and incense." },
          { url: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=800&q=80", caption: "Balinese coffee plantation — where the famous kopi is grown and processed." },
          { url: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=800&q=80", caption: "Seminyak Beach — golden sands and world-class beach clubs at sunset." },
        ],
      },
    ],
    whatToBring: [
      { icon: "👕", label: "Light, breathable clothing" },
      { icon: "👗", label: "Sarong for temple visits (required)" },
      { icon: "👟", label: "Comfortable walking shoes" },
      { icon: "💴", label: "Indonesian Rupiah (IDR)" },
      { icon: "📄", label: "Valid passport & Visa on Arrival fee (USD)" },
      { icon: "🧴", label: "Sunscreen & insect repellent" },
      { icon: "🎒", label: "Waterproof bag for activities" },
      { icon: "💊", label: "Personal medication" },
    ],
    seasons: [
      { label: "Apr – Oct", weather: "Dry Season", icon: "☀️", note: "Best time to visit — sunny and clear" },
      { label: "Nov – Mar", weather: "Wet Season", icon: "🌧", note: "Lush greenery but daily afternoon showers" },
      { label: "Mar – May", weather: "Transition / Shoulder", icon: "🌤", note: "Good weather with fewer crowds" },
      { label: "Jun – Aug", weather: "Peak Dry Season", icon: "🌞", note: "Busiest period — book early" },
    ],
    reviews: [
      { name: "Angel R.", rating: 5, text: "Bali is heaven on earth! The temples, rice terraces, and Kecak Dance are unforgettable.", date: "June 2025" },
      { name: "James M.", rating: 5, text: "Nusa Penida blew my mind. Kelingking Beach is unreal. Gladex organized everything perfectly.", date: "May 2025" },
      { name: "Christine B.", rating: 5, text: "The Uluwatu sunset was magical. Will definitely return to Bali for another trip!", date: "April 2025" },
    ],
    trendingSights: ["Uluwatu Temple", "Tanah Lot", "Tegalalang Rice Terrace", "Nusa Penida", "Bali Swing", "Seminyak Beach"],
    mightAlsoLike: ["Bali Swing", "Nusa Penida Tour", "White Water Rafting", "ATV Ride", "Mount Batur Sunrise Trek"],
  },
};

export const getDestinationContent = (slug) => {
  const content = destinationContent[slug] || {
    whatToExpectTitle: "What to Expect from This Tour",
    whatToExpect: defaultContent.whatToExpect,
    galleryBlocks: [],
    whatToBring: defaultContent.whatToBring,
    seasons: defaultContent.seasons,
    reviews: defaultContent.reviews,
    trendingSights: [],
    mightAlsoLike: [],
  };

  // If mediaConfig supplies gallery images for this destination, inject them
  // into the first gallery block so future gallery updates only require
  // editing mediaConfig.js.
  const media = getMediaForSlug(slug);
  if (media.gallery?.length) {
    const mediaBlock = { title: "Destination Gallery", images: media.gallery };
    return {
      ...content,
      galleryBlocks: [mediaBlock, ...(content.galleryBlocks?.slice(1) ?? [])],
    };
  }

  return content;
};