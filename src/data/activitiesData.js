// Destination-specific activities data
// Each destination has unique activities, reviews, and nearby places

export const destinationActivities = {

  // ============================================================
  // KOREA
  // ============================================================
  korea: {
    cityName: "Korea",
    rating: "4.8",
    reviews: "18K+ reviews",
    totalBooked: "500K+",
    activities: [
      { id: "nami-island-day-trip", title: "Nami Island Day Trip from Seoul", type: "Nature Tours", price: "2,800", rating: "4.8", booked: "200K+", img: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=400&q=80", tag: "Book now for tomorrow", choice: true },
      { id: "everland-theme-park", title: "Everland Theme Park Full Day", type: "Theme Parks", price: "3,500", rating: "4.7", booked: "150K+", img: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
      { id: "gyeongbokgung-palace-hanbok", title: "Gyeongbokgung Palace + Hanbok Rental", type: "Cultural Tours", price: "1,200", rating: "4.9", booked: "300K+", img: "https://images.unsplash.com/photo-1562832135-14a35d25edef?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
      { id: "dmz-tour-seoul", title: "DMZ Tour from Seoul", type: "Historical Tours", price: "3,200", rating: "4.7", booked: "80K+", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80", tag: "Book now for tomorrow" },
      { id: "myeongdong-food-tour", title: "Myeongdong Street Food Night Tour", type: "Food & Drink", price: "1,800", rating: "4.9", booked: "120K+", img: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
      { id: "kpop-experience-tour", title: "K-Pop Entertainment District Tour", type: "Entertainment", price: "2,200", rating: "4.8", booked: "90K+", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
      { id: "seoul-tower-cable-car", title: "N Seoul Tower & Cable Car", type: "Sightseeing", price: "900", rating: "4.6", booked: "250K+", img: "https://images.unsplash.com/photo-1563115298-e9585e7943d4?auto=format&fit=crop&w=400&q=80", tag: "Book now for tomorrow" },
      { id: "bukchon-hanok-village-walk", title: "Bukchon Hanok Village Walking Tour", type: "Cultural Tours", price: "500", rating: "4.7", booked: "180K+", img: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
    ],
    reviews: [
      { user: "AngelaM ****", date: "12 Apr", comment: "Nami Island was breathtaking! The fall foliage was everything I imagined. Guide was super helpful." },
      { user: "MarkR *****", date: "9 Apr", comment: "Everland exceeded my expectations! T-Express roller coaster was incredible. Worth every peso." },
      { user: "SarahL ***", date: "8 Apr", comment: "Hanbok experience at the palace was magical. Photos came out amazing. Highly recommend!" },
    ],
    nearbyPlaces: ["Hongdae", "Insadong", "COEX Mall", "Dongdaemun"],
    topAttractions: ["Nami Island", "Gyeongbokgung", "N Seoul Tower", "Bukchon Village", "Myeongdong"],
  },

  // ============================================================
  // JAPAN
  // ============================================================
  japan: {
    cityName: "Japan",
    rating: "4.9",
    reviews: "25K+ reviews",
    totalBooked: "800K+",
    activities: [
      { id: "universal-studios-japan", title: "Universal Studios Japan (USJ) Tickets", type: "Theme Parks", price: "4,200", rating: "4.9", booked: "500K+", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80", tag: "Book now for today", choice: true },
      { id: "kyoto-fushimi-inari-tour", title: "Kyoto + Fushimi Inari Full Day Tour", type: "Cultural Tours", price: "3,500", rating: "4.9", booked: "350K+", img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=400&q=80", tag: "Book now for tomorrow" },
      { id: "nara-deer-park-day-trip", title: "Nara Deer Park & Todaiji Temple", type: "Nature Tours", price: "2,800", rating: "4.8", booked: "200K+", img: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
      { id: "osaka-street-food-tour", title: "Osaka Dotonbori Street Food Walk", type: "Food & Drink", price: "1,500", rating: "4.9", booked: "180K+", img: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
      { id: "mt-fuji-day-trip", title: "Mt. Fuji + Lake Kawaguchiko Day Trip", type: "Nature Tours", price: "5,200", rating: "4.7", booked: "100K+", img: "https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=400&q=80", tag: "Book now for tomorrow" },
      { id: "shibuya-crossing-tour", title: "Shibuya Crossing + Harajuku Tour", type: "City Tours", price: "1,800", rating: "4.8", booked: "220K+", img: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
      { id: "arashiyama-bamboo-grove", title: "Arashiyama Bamboo Grove & Monkey Park", type: "Nature Tours", price: "2,200", rating: "4.8", booked: "160K+", img: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=400&q=80", tag: "Book now for tomorrow" },
      { id: "osaka-castle-tour", title: "Osaka Castle Tour & Nishinomaru Garden", type: "Cultural Tours", price: "1,200", rating: "4.7", booked: "280K+", img: "https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
    ],
    reviews: [
      { user: "TomK *****", date: "15 Apr", comment: "USJ Harry Potter World was absolutely magical. Best theme park experience I've ever had!" },
      { user: "RinaP ****", date: "13 Apr", comment: "Fushimi Inari was stunning at sunrise. The thousand torii gates took my breath away." },
      { user: "CarloD ***", date: "10 Apr", comment: "Nara deer park was so unique! The deer really do come up to you for food. Amazing experience." },
    ],
    nearbyPlaces: ["Dotonbori", "Shinsaibashi", "Naamba", "Umeda"],
    topAttractions: ["USJ", "Fushimi Inari", "Osaka Castle", "Nara Park", "Mt. Fuji"],
  },

  // ============================================================
  // SINGAPORE
  // ============================================================
  singapore: {
    cityName: "Singapore",
    rating: "4.8",
    reviews: "20K+ reviews",
    totalBooked: "600K+",
    activities: [
      { id: "universal-studios-singapore", title: "Universal Studios Singapore Tickets", type: "Theme Parks", price: "4,500", rating: "4.8", booked: "400K+", img: "https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=400&q=80", tag: "Book now for today", choice: true },
      { id: "gardens-by-the-bay-night-show", title: "Gardens by the Bay + Supertree Grove Night Show", type: "Sightseeing", price: "1,200", rating: "4.9", booked: "300K+", img: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
      { id: "night-safari-singapore", title: "Singapore Night Safari", type: "Wildlife", price: "3,200", rating: "4.8", booked: "200K+", img: "https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?auto=format&fit=crop&w=400&q=80", tag: "Book now for tomorrow" },
      { id: "sentosa-island-adventure-cove", title: "Sentosa Island + Adventure Cove Waterpark", type: "Water Activities", price: "3,800", rating: "4.7", booked: "150K+", img: "https://images.unsplash.com/photo-1570735886756-58d9cd9e81f0?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
      { id: "marina-bay-sands-skypark", title: "Marina Bay Sands SkyPark Observation Deck", type: "Sightseeing", price: "1,800", rating: "4.7", booked: "250K+", img: "https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
      { id: "singapore-food-tour-hawker", title: "Singapore Hawker Centre Food Tour", type: "Food & Drink", price: "900", rating: "4.9", booked: "180K+", img: "https://images.unsplash.com/photo-1512152272829-e3139592d56f?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
      { id: "singapore-city-tour-merlion", title: "Singapore City Tour — Merlion, Chinatown, Little India", type: "City Tours", price: "1,100", rating: "4.6", booked: "220K+", img: "https://images.unsplash.com/photo-1506870799893-1e0a3e02b25c?auto=format&fit=crop&w=400&q=80", tag: "Book now for tomorrow" },
      { id: "singapore-flyer-ride", title: "Singapore Flyer Giant Observation Wheel", type: "Sightseeing", price: "1,500", rating: "4.5", booked: "130K+", img: "https://images.unsplash.com/photo-1563115298-e9585e7943d4?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
    ],
    reviews: [
      { user: "Ailyn ****", date: "20 Apr", comment: "USS was amazing! Transformers ride was the highlight. Kids absolutely loved it." },
      { user: "Renz P. ***", date: "18 Apr", comment: "Gardens by the Bay night show was surreal. The light show on the Supertrees was absolutely stunning." },
      { user: "Mia C. ****", date: "16 Apr", comment: "Singapore Night Safari exceeded all expectations. Seeing animals in their natural night habitat was incredible." },
    ],
    nearbyPlaces: ["Orchard Road", "Clarke Quay", "Bugis", "Chinatown"],
    topAttractions: ["Universal Studios", "Gardens by the Bay", "Sentosa", "Marina Bay Sands", "Night Safari"],
  },

  // ============================================================
  // BANGKOK
  // ============================================================
  bangkok: {
    cityName: "Bangkok",
    rating: "4.7",
    reviews: "22K+ reviews",
    totalBooked: "700K+",
    activities: [
      { id: "floating-market-tour", title: "Damnoen Saduak Floating Market Tour", type: "Cultural Tours", price: "2,200", rating: "4.7", booked: "300K+", img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=400&q=80", tag: "Book now for tomorrow", choice: true },
      { id: "grand-palace-wat-pho", title: "Grand Palace + Wat Pho Temple Tour", type: "Cultural Tours", price: "1,800", rating: "4.8", booked: "400K+", img: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
      { id: "chao-phraya-dinner-cruise", title: "Chao Phraya River Dinner Cruise", type: "Cruises", price: "3,500", rating: "4.6", booked: "150K+", img: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=400&q=80", tag: "Book now for tomorrow" },
      { id: "ayutthaya-day-trip", title: "Ayutthaya Ancient City Day Trip", type: "Historical Tours", price: "2,800", rating: "4.8", booked: "180K+", img: "https://images.unsplash.com/photo-1524613032530-449a5d94c285?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
      { id: "safari-world-bangkok", title: "Safari World + Marine Park Bangkok", type: "Wildlife", price: "2,800", rating: "4.5", booked: "120K+", img: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?auto=format&fit=crop&w=400&q=80", tag: "Book now for tomorrow" },
      { id: "wat-arun-temple", title: "Wat Arun Temple of Dawn at Sunset", type: "Cultural Tours", price: "900", rating: "4.9", booked: "280K+", img: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
      { id: "bangkok-street-food-walk", title: "Bangkok Street Food Night Walk — Chinatown", type: "Food & Drink", price: "1,400", rating: "4.9", booked: "200K+", img: "https://images.unsplash.com/photo-1464013778555-8e723c2f01f8?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
      { id: "thai-massage-spa", title: "Traditional Thai Massage & Spa Experience", type: "Wellness", price: "1,200", rating: "4.8", booked: "160K+", img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
    ],
    reviews: [
      { user: "LornaG ****", date: "22 Apr", comment: "Floating market was so lively and colorful! Bought so many souvenirs and tried amazing local food." },
      { user: "JuanP ***", date: "20 Apr", comment: "Grand Palace blew my mind. The architecture and detail are incredible. A must-visit in Bangkok." },
      { user: "MaryC *****", date: "18 Apr", comment: "Chao Phraya dinner cruise was magical — food was delicious and the views of the city at night are gorgeous." },
    ],
    nearbyPlaces: ["Silom", "Sukhumvit", "Chatuchak", "Siam Square"],
    topAttractions: ["Grand Palace", "Wat Arun", "Floating Market", "Chao Phraya", "Chatuchak"],
  },

  // ============================================================
  // BANGKOK-PATTAYA
  // ============================================================
  "bangkok-pattaya": {
    cityName: "Bangkok & Pattaya",
    rating: "4.7",
    reviews: "16K+ reviews",
    totalBooked: "450K+",
    activities: [
      { id: "pattaya-coral-island", title: "Pattaya Coral Island Day Trip", type: "Water Activities", price: "2,500", rating: "4.7", booked: "200K+", img: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=400&q=80", tag: "Book now for today", choice: true },
      { id: "alcazar-cabaret-show", title: "Alcazar Cabaret Show Pattaya", type: "Entertainment", price: "1,800", rating: "4.8", booked: "150K+", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=400&q=80", tag: "Book now for tomorrow" },
      { id: "nong-nooch-village", title: "Nong Nooch Tropical Village + Elephant Show", type: "Wildlife", price: "2,200", rating: "4.6", booked: "130K+", img: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
      { id: "icon-siam-bangkok", title: "ICON SIAM Shopping + Dinner Cruise", type: "Shopping", price: "1,500", rating: "4.8", booked: "180K+", img: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
      { id: "pattaya-walking-street-night", title: "Pattaya Walking Street Night Tour", type: "Nightlife", price: "800", rating: "4.5", booked: "220K+", img: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
      { id: "water-park-cartoon-network", title: "Cartoon Network Amazone Water Park", type: "Theme Parks", price: "2,800", rating: "4.7", booked: "90K+", img: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=400&q=80", tag: "Book now for tomorrow" },
    ],
    reviews: [
      { user: "AnnaB ***", date: "25 Apr", comment: "Coral Island was gorgeous! Snorkeling was so clear and the beach is pristine." },
      { user: "JoseM ****", date: "22 Apr", comment: "Alcazar show was spectacular! The costumes and performances were absolutely world-class." },
      { user: "GraceT ****", date: "20 Apr", comment: "Nong Nooch Village surprised me! The gardens were massive and the elephant show was incredible." },
    ],
    nearbyPlaces: ["Pattaya Beach", "Central Festival", "Jomtien Beach", "Naklua"],
    topAttractions: ["Coral Island", "Alcazar Show", "Nong Nooch Village", "Walking Street", "Pattaya Beach"],
  },

  // ============================================================
  // HONG KONG
  // ============================================================
  hongkong: {
    cityName: "Hong Kong",
    rating: "4.8",
    reviews: "19K+ reviews",
    totalBooked: "550K+",
    activities: [
      { id: "disneyland-hong-kong", title: "Hong Kong Disneyland 1-Day Pass", type: "Theme Parks", price: "4,800", rating: "4.8", booked: "350K+", img: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=400&q=80", tag: "Book now for today", choice: true },
      { id: "ngong-ping-360-cable-car", title: "Ngong Ping 360 Cable Car + Big Buddha", type: "Sightseeing", price: "2,500", rating: "4.7", booked: "280K+", img: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=400&q=80", tag: "Book now for tomorrow" },
      { id: "victoria-harbour-star-ferry", title: "Victoria Harbour Star Ferry Harbour Cruise", type: "Cruises", price: "800", rating: "4.9", booked: "400K+", img: "https://images.unsplash.com/photo-1512452935861-f17bb7c2c8b4?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
      { id: "ocean-park-hong-kong", title: "Ocean Park Hong Kong Full Day", type: "Theme Parks", price: "3,800", rating: "4.7", booked: "200K+", img: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=400&q=80", tag: "Book now for tomorrow" },
      { id: "macau-day-trip-from-hk", title: "Macau Day Trip from Hong Kong by Ferry", type: "Day Trips", price: "3,200", rating: "4.6", booked: "120K+", img: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=400&q=80", tag: "Book now for tomorrow" },
      { id: "hong-kong-city-tour-peak-tram", title: "HK City Tour + Victoria Peak Tram", type: "City Tours", price: "1,800", rating: "4.8", booked: "320K+", img: "https://images.unsplash.com/photo-1549592887-f18f358ec977?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
      { id: "mong-kok-night-market", title: "Mong Kok Street Markets Night Walk", type: "Shopping", price: "600", rating: "4.6", booked: "180K+", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
      { id: "hong-kong-food-tour-dim-sum", title: "Authentic Dim Sum & Local Food Tour", type: "Food & Drink", price: "1,400", rating: "4.9", booked: "150K+", img: "https://images.unsplash.com/photo-1512152272829-e3139592d56f?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
    ],
    reviews: [
      { user: "PatriciaL ****", date: "3 May", comment: "Disneyland HK was magical! Castle parade at night was stunning. Kids had the best time ever." },
      { user: "DavidC ***", date: "1 May", comment: "Ngong Ping cable car over the ocean was breathtaking! Big Buddha at the top was worth every step." },
      { user: "SuzyT *****", date: "28 Apr", comment: "Star Ferry is the best value in HK! The views of the skyline crossing Victoria Harbour are incredible." },
    ],
    nearbyPlaces: ["Tsim Sha Tsui", "Causeway Bay", "Central", "Aberdeen"],
    topAttractions: ["Disneyland", "Victoria Peak", "Ngong Ping 360", "Ocean Park", "Victoria Harbour"],
  },

  // ============================================================
  // DANANG VIETNAM
  // ============================================================
  "danang-vietnam": {
    cityName: "Da Nang",
    rating: "4.7",
    reviews: "12K+ reviews",
    totalBooked: "300K+",
    activities: [
      { id: "bana-hills-golden-bridge", title: "Ba Na Hills + Golden Bridge Day Tour", type: "Nature Tours", price: "2,800", rating: "4.9", booked: "250K+", img: "https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?auto=format&fit=crop&w=400&q=80", tag: "Book now for today", choice: true },
      { id: "hoi-an-ancient-town-tour", title: "Hoi An Ancient Town + Coconut Boat Ride", type: "Cultural Tours", price: "2,200", rating: "4.9", booked: "200K+", img: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=400&q=80", tag: "Book now for tomorrow" },
      { id: "marble-mountain-danang", title: "Marble Mountains & Dragon Bridge Tour", type: "Sightseeing", price: "1,200", rating: "4.7", booked: "130K+", img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
      { id: "my-son-sanctuary-tour", title: "My Son Sanctuary Ancient Temples Tour", type: "Historical Tours", price: "2,500", rating: "4.8", booked: "90K+", img: "https://images.unsplash.com/photo-1578890036220-c3bb4bfe6a22?auto=format&fit=crop&w=400&q=80", tag: "Book now for tomorrow" },
      { id: "han-river-cruise-danang", title: "Han River Dinner Cruise at Night", type: "Cruises", price: "1,800", rating: "4.6", booked: "80K+", img: "https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
      { id: "my-khe-beach-water-sports", title: "My Khe Beach Water Sports Experience", type: "Water Activities", price: "1,500", rating: "4.5", booked: "70K+", img: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
    ],
    reviews: [
      { user: "MaeR ****", date: "5 May", comment: "Golden Bridge was absolutely breathtaking! The giant stone hands holding it up — unreal. Best photo spot ever." },
      { user: "ToniP ***", date: "3 May", comment: "Hoi An ancient town was like walking back in time. The lanterns at night are magical." },
      { user: "LindaC *****", date: "1 May", comment: "Ba Na Hills was foggy but that made it feel even more mystical. The cable car ride alone is worth it!" },
    ],
    nearbyPlaces: ["My Khe Beach", "Hoi An", "Ba Na Hills", "Dragon Bridge"],
    topAttractions: ["Golden Bridge", "Hoi An Old Town", "Dragon Bridge", "Marble Mountains", "My Son Sanctuary"],
  },

  // ============================================================
  // DUBAI
  // ============================================================
  dubai: {
    cityName: "Dubai",
    rating: "4.9",
    reviews: "28K+ reviews",
    totalBooked: "900K+",
    activities: [
      { id: "burj-khalifa-at-the-top", title: "Burj Khalifa 'At the Top' Observation Deck", type: "Sightseeing", price: "4,500", rating: "4.8", booked: "500K+", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&q=80", tag: "Book now for today", choice: true },
      { id: "dubai-desert-safari-bbq", title: "Dubai Desert Safari + BBQ Dinner & Show", type: "Adventure", price: "3,800", rating: "4.9", booked: "600K+", img: "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=400&q=80", tag: "Book now for tomorrow" },
      { id: "dubai-dhow-cruise-marina", title: "Dubai Marina Dhow Cruise Dinner", type: "Cruises", price: "2,800", rating: "4.7", booked: "350K+", img: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
      { id: "dubai-mall-fountain-show", title: "Dubai Mall + Dubai Fountain Show", type: "Shopping", price: "800", rating: "4.8", booked: "700K+", img: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
      { id: "dubai-frame-ticket", title: "Dubai Frame Experience Tickets", type: "Sightseeing", price: "1,500", rating: "4.6", booked: "200K+", img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=400&q=80", tag: "Book now for tomorrow" },
      { id: "dubai-city-tour-gold-souk", title: "Dubai City Tour — Gold Souk, Spice Souk, Creek", type: "City Tours", price: "2,200", rating: "4.7", booked: "280K+", img: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
      { id: "ski-dubai-indoor-skiing", title: "Ski Dubai Indoor Skiing Experience", type: "Adventure", price: "4,200", rating: "4.7", booked: "120K+", img: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
      { id: "abu-dhabi-day-trip", title: "Abu Dhabi Day Trip — Sheikh Zayed Mosque", type: "Day Trips", price: "3,500", rating: "4.9", booked: "180K+", img: "https://images.unsplash.com/photo-1581349485608-9469926a8e5e?auto=format&fit=crop&w=400&q=80", tag: "Book now for tomorrow" },
    ],
    reviews: [
      { user: "MarcoS *****", date: "8 May", comment: "Burj Khalifa at sunset was the most spectacular view I've ever seen. The 124th floor observation deck is breathtaking." },
      { user: "IsabelR ****", date: "6 May", comment: "Desert safari was the highlight of our Dubai trip! Camel riding, dune bashing, and the dinner under the stars was incredible." },
      { user: "JohnP ***", date: "4 May", comment: "Dubai fountain show is FREE and absolutely spectacular. We watched it twice. Perfect evening entertainment." },
    ],
    nearbyPlaces: ["JBR Walk", "Palm Jumeirah", "Dubai Marina", "Downtown Dubai"],
    topAttractions: ["Burj Khalifa", "Dubai Desert", "Dubai Mall", "Palm Jumeirah", "Gold Souk"],
  },

  // ============================================================
  // TAIPEI
  // ============================================================
  taipei: {
    cityName: "Taipei",
    rating: "4.7",
    reviews: "14K+ reviews",
    totalBooked: "380K+",
    activities: [
      { id: "taipei-101-observation-deck", title: "Taipei 101 Observation Deck Tickets", type: "Sightseeing", price: "1,800", rating: "4.8", booked: "300K+", img: "https://images.unsplash.com/photo-1470004914212-05527e49370b?auto=format&fit=crop&w=400&q=80", tag: "Book now for today", choice: true },
      { id: "jiufen-old-street-day-trip", title: "Jiufen Old Street + Ruifang Day Trip", type: "Cultural Tours", price: "2,200", rating: "4.9", booked: "200K+", img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=400&q=80", tag: "Book now for tomorrow" },
      { id: "yehliu-geopark-tour", title: "Yehliu Geopark & Golden Waterfall Tour", type: "Nature Tours", price: "2,500", rating: "4.7", booked: "150K+", img: "https://images.unsplash.com/photo-1574068468668-a05a11f871da?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
      { id: "shilin-night-market-tour", title: "Shilin Night Market Food Tour", type: "Food & Drink", price: "900", rating: "4.9", booked: "250K+", img: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
      { id: "national-palace-museum", title: "National Palace Museum Guided Tour", type: "Cultural Tours", price: "1,200", rating: "4.7", booked: "120K+", img: "https://images.unsplash.com/photo-1591608971362-f08b2a75731a?auto=format&fit=crop&w=400&q=80", tag: "Book now for tomorrow" },
      { id: "taroko-gorge-day-trip", title: "Taroko National Park Full Day Tour", type: "Nature Tours", price: "4,500", rating: "4.9", booked: "80K+", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80", tag: "Book now for tomorrow" },
    ],
    reviews: [
      { user: "RosieM ****", date: "10 May", comment: "Taipei 101 at night was absolutely gorgeous. The city lights stretched endlessly. A must-see!" },
      { user: "KenN ***", date: "8 May", comment: "Jiufen felt like the inspiration for Spirited Away! The lanterns at dusk were magical." },
      { user: "ChrisT *****", date: "5 May", comment: "Shilin Night Market was overwhelming in the best way! So much food to try, great prices." },
    ],
    nearbyPlaces: ["Ximending", "Zhongshan", "Xinyi", "Da'an"],
    topAttractions: ["Taipei 101", "Jiufen", "Shilin Night Market", "National Palace Museum", "Taroko Gorge"],
  },

  // ============================================================
  // BALI
  // ============================================================
  bali: {
    cityName: "Bali",
    rating: "4.8",
    reviews: "30K+ reviews",
    totalBooked: "1M+",
    activities: [
      { id: "bali-swing-experience", title: "Bali Swing + Instagrammable Spots Tour", type: "Adventure", price: "2,500", rating: "4.8", booked: "400K+", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80", tag: "Book now for today", choice: true },
      { id: "nusa-penida-day-trip", title: "Nusa Penida Island + Kelingking Beach", type: "Island Tours", price: "3,200", rating: "4.9", booked: "300K+", img: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=400&q=80", tag: "Book now for tomorrow" },
      { id: "uluwatu-temple-kecak-fire", title: "Uluwatu Temple + Kecak Fire Dance", type: "Cultural Tours", price: "2,200", rating: "4.9", booked: "250K+", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
      { id: "tegalalang-rice-terrace", title: "Tegalalang Rice Terraces + Ubud Art", type: "Nature Tours", price: "1,800", rating: "4.8", booked: "280K+", img: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
      { id: "bali-white-water-rafting", title: "Bali White Water Rafting + Lunch", type: "Adventure", price: "2,800", rating: "4.7", booked: "150K+", img: "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=400&q=80", tag: "Book now for tomorrow" },
      { id: "tanah-lot-sunset-tour", title: "Tanah Lot Temple Sunset Experience", type: "Cultural Tours", price: "1,400", rating: "4.8", booked: "320K+", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
    ],
    reviews: [
      { user: "AliceW *****", date: "14 May", comment: "Bali Swing was terrifying and amazing all at once! Views over the jungle were absolutely stunning." },
      { user: "BobM ****", date: "12 May", comment: "Nusa Penida was the highlight of our whole Bali trip. Kelingking Beach is truly one of a kind." },
      { user: "CarmenS ***", date: "10 May", comment: "Kecak fire dance at Uluwatu at sunset — this is the kind of memory that stays with you forever." },
    ],
    nearbyPlaces: ["Seminyak", "Kuta", "Ubud", "Jimbaran"],
    topAttractions: ["Bali Swing", "Uluwatu Temple", "Nusa Penida", "Tegalalang", "Tanah Lot"],
  },

  // ============================================================
  // MALAYSIA - KOTA KINABALU
  // ============================================================
  "malaysia-kota-kinabalu": {
    cityName: "Kota Kinabalu",
    rating: "4.7",
    reviews: "8K+ reviews",
    totalBooked: "150K+",
    activities: [
      { id: "kk-island-hopping-snorkel", title: "Tunku Abdul Rahman Islands Snorkeling", type: "Water Activities", price: "1,800", rating: "4.8", booked: "100K+", img: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=400&q=80", tag: "Book now for today", choice: true },
      { id: "kinabalu-park-poring-hot-spring", title: "Kinabalu Park + Poring Hot Spring Tour", type: "Nature Tours", price: "2,500", rating: "4.8", booked: "80K+", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=80", tag: "Book now for tomorrow" },
      { id: "mari-mari-cultural-village", title: "Mari-Mari Cultural Village Experience", type: "Cultural Tours", price: "2,200", rating: "4.7", booked: "60K+", img: "https://images.unsplash.com/photo-1574068468668-a05a11f871da?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
      { id: "kk-sunset-cruise", title: "Kota Kinabalu Sunset Cruise", type: "Cruises", price: "1,500", rating: "4.9", booked: "70K+", img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
      { id: "kk-city-tour-waterfront", title: "KK City Tour + Handicraft Market", type: "City Tours", price: "900", rating: "4.5", booked: "50K+", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80", tag: "Book now for tomorrow" },
    ],
    reviews: [
      { user: "JessicaP ***", date: "18 May", comment: "Island hopping in KK was so relaxing! Crystal clear water and pristine beaches. Paradise." },
      { user: "RobertN ****", date: "15 May", comment: "Kinabalu Park is breathtaking! Even without climbing to the summit, the forest trails are amazing." },
      { user: "ElenaG ***", date: "12 May", comment: "Sunset cruise was the most romantic experience. The sky was painted in orange and purple." },
    ],
    nearbyPlaces: ["Waterfront Esplanade", "Gaya Island", "Tanjung Aru", "Manukan Island"],
    topAttractions: ["Kinabalu Park", "Island Hopping", "Poring Hot Spring", "Mari-Mari Village", "KK Waterfront"],
  },

  // ============================================================
  // DEFAULT FALLBACK
  // ============================================================
  default: {
    cityName: "Destination",
    rating: "4.7",
    reviews: "10K+ reviews",
    totalBooked: "100K+",
    activities: [
      { id: "city-tour-1", title: "Full Day City Tour", type: "City Tours", price: "1,500", rating: "4.7", booked: "50K+", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
      { id: "cultural-tour-1", title: "Cultural Heritage Walking Tour", type: "Cultural Tours", price: "1,200", rating: "4.8", booked: "30K+", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80", tag: "Book now for tomorrow" },
      { id: "food-tour-1", title: "Local Street Food Tour", type: "Food & Drink", price: "900", rating: "4.9", booked: "40K+", img: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=400&q=80", tag: "Book now for today" },
    ],
    reviews: [
      { user: "TravellerX ****", date: "Today", comment: "Amazing destination! Highly recommend visiting." },
    ],
    nearbyPlaces: ["City Center", "Local Market", "Cultural District"],
    topAttractions: ["Main Landmark", "City Center", "Local Market"],
  },
};

export const getActivitiesForDestination = (slug) => {
  return destinationActivities[slug] || destinationActivities.default;
};