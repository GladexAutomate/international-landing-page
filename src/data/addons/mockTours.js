/**
 * MOCK TOUR DATA — Globaltix / LakbayHub Schema
 *
 * All fields conform to the Tour typedef in src/types/addons.js.
 * When Globaltix or LakbayHub APIs go live, replace each mock record
 * with the API response mapped to the same field names.
 *
 * TODO: Globaltix API Integration
 *   - Replace mock objects with: GET /api/products?destinationId={id}
 *   - Map Globaltix response fields to the Tour interface
 *   - sourceId    = globaltix.productId
 *   - sourceProductCode = globaltix.productCode
 *
 * TODO: LakbayHub API Integration
 *   - Source PH-specific tour listings
 *   - source = "lakbayhub"
 *   - sourceId = lakbayhub.listingId
 */

/** @type {Record<string, import("../../types/addons").Tour[]>} */
const TOURS_BY_DESTINATION = {

  // ── DA NANG VIETNAM ──────────────────────────────────────────────────────
  "danang-vietnam": [
    {
      id: "danang-tour-0",
      name: "Han River Dinner Cruise",
      source: "globaltix",
      sourceId: "gtx_DAN_001",
      sourceProductCode: "GTX-DAN-HRC-2026",
      sourceCategoryId: "cruises",
      description:
        "Glide along the Han River as Da Nang lights up at night. Enjoy a buffet dinner, live music, and the iconic Dragon Bridge fire-breathing show from the water.",
      images: [
        { url: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80", isPrimary: true },
      ],
      duration: "Evening Tour (3 hrs)",
      durationMinutes: 180,
      meetingPoint: "Han River Pier, Da Nang city centre",
      category: "Cruises",
      tags: ["evening", "dinner", "river", "scenic"],
      price: 1800,
      currency: "PHP",
      bookingOptions: [
        { id: "adult",  label: "Adult (12+)",  price: 1800 },
        { id: "child",  label: "Child (3–11)", price: 1200 },
        { id: "infant", label: "Infant (0–2)", price: 0 },
      ],
      inclusions: ["Buffet dinner", "Live entertainment", "River cruise (3 hrs)", "Life jackets"],
      exclusions: ["Alcoholic beverages", "Hotel transfer"],
      importantNotes: ["Departs at 7:30 PM sharp — be at the pier by 7:15 PM."],
      cancellationPolicy: "Free cancellation up to 24 hours before departure.",
      requiresBookingDate: true,
      availability: [],
      minParticipants: 1,
      maxParticipants: 120,
    },
    {
      id: "danang-tour-1",
      name: "Marble Mountain Tour",
      source: "globaltix",
      sourceId: "gtx_DAN_002",
      sourceProductCode: "GTX-DAN-MMT-2026",
      sourceCategoryId: "cultural",
      description:
        "Explore the five limestone hills of Ngũ Hành Sơn, dotted with Buddhist pagodas, ancient caves, and panoramic views of Da Nang and the South China Sea.",
      images: [
        { url: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=600&q=80", isPrimary: true },
      ],
      duration: "Half Day (4 hrs)",
      durationMinutes: 240,
      meetingPoint: "Hotel lobby pick-up (included)",
      category: "Cultural Tours",
      tags: ["caves", "temples", "hiking", "panoramic"],
      price: 1500,
      currency: "PHP",
      bookingOptions: [
        { id: "adult",  label: "Adult (12+)",  price: 1500 },
        { id: "child",  label: "Child (5–11)", price: 1000 },
      ],
      inclusions: ["English-speaking guide", "Return hotel transfer", "Entrance fee", "Bottled water"],
      exclusions: ["Personal shopping", "Tips"],
      importantNotes: ["Wear comfortable shoes — there are stairs."],
      cancellationPolicy: "Free cancellation up to 24 hours before departure.",
      requiresBookingDate: false,
      availability: [],
      minParticipants: 1,
    },
    {
      id: "danang-tour-2",
      name: "Hội An Night Tour",
      source: "lakbayhub",
      sourceId: "lbh_DAN_003",
      sourceProductCode: "LBH-DAN-HOI-EVE",
      sourceCategoryId: "cultural",
      description:
        "Wander the lantern-lit streets of Hội An Ancient Town after dark, release a floating lantern on the Thu Bồn River, and browse the famous silk shops and tailors.",
      images: [
        { url: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&q=80", isPrimary: true },
      ],
      duration: "Evening Tour (4 hrs)",
      durationMinutes: 240,
      meetingPoint: "Da Nang city centre pick-up point",
      category: "Cultural Tours",
      tags: ["lanterns", "heritage", "nightlife", "UNESCO"],
      price: 2000,
      currency: "PHP",
      bookingOptions: [
        { id: "adult",  label: "Adult (12+)",  price: 2000 },
        { id: "child",  label: "Child (5–11)", price: 1400 },
      ],
      inclusions: ["Round-trip transfer", "English-speaking guide", "Lantern release experience", "Entrance fee"],
      exclusions: ["Meals", "Shopping"],
      cancellationPolicy: "Free cancellation up to 48 hours before departure.",
      requiresBookingDate: true,
      availability: [],
    },
    {
      id: "danang-tour-3",
      name: "Mỹ Sơn Sanctuary Tour",
      source: "globaltix",
      sourceId: "gtx_DAN_004",
      sourceProductCode: "GTX-DAN-MSS-2026",
      sourceCategoryId: "heritage",
      description:
        "Journey to the ruins of the ancient Cham Kingdom — a UNESCO World Heritage Site hidden in a jungle valley 70 km from Da Nang. See centuries-old Hindu towers and learn about one of Southeast Asia's most fascinating lost civilisations.",
      images: [
        { url: "https://images.unsplash.com/photo-1524613032530-449a5d94c285?w=600&q=80", isPrimary: true },
      ],
      duration: "Full Day (8 hrs)",
      durationMinutes: 480,
      meetingPoint: "Hotel lobby pick-up (6:30 AM)",
      category: "Heritage Tours",
      tags: ["UNESCO", "Cham", "ruins", "history", "jungle"],
      price: 2500,
      currency: "PHP",
      bookingOptions: [
        { id: "adult",  label: "Adult (12+)",  price: 2500 },
        { id: "child",  label: "Child (5–11)", price: 1800 },
      ],
      inclusions: ["Full-day transfer", "English/Filipino guide", "Entrance fee", "Lunch", "Bottled water"],
      exclusions: ["Tips", "Personal expenses"],
      importantNotes: ["Bring sunscreen and insect repellent — outdoor site.", "Dress modestly — active temple site."],
      cancellationPolicy: "Free cancellation up to 48 hours before departure.",
      requiresBookingDate: false,
      availability: [],
    },
  ],

  // ── HONG KONG ────────────────────────────────────────────────────────────
  "hongkong": [
    {
      id: "hk-tour-0",
      name: "Macau Day Tour",
      source: "globaltix",
      sourceId: "gtx_HK_001",
      sourceProductCode: "GTX-HK-MAC-2026",
      sourceCategoryId: "day-trips",
      description:
        "Take a high-speed ferry to Macau — the Vegas of Asia — and explore its Portuguese colonial heritage, the Ruins of St. Paul, and the glittering casino strip. Return to Hong Kong the same evening.",
      images: [
        { url: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/eb748ba68_MACAU.png", isPrimary: true },
      ],
      duration: "Full Day (10 hrs)",
      durationMinutes: 600,
      meetingPoint: "Hong Kong–Macau Ferry Terminal, Sheung Wan",
      category: "Day Trips",
      tags: ["Macau", "heritage", "casino", "ferry"],
      price: 3500,
      currency: "PHP",
      bookingOptions: [
        { id: "adult",  label: "Adult (12+)",  price: 3500 },
        { id: "child",  label: "Child (3–11)", price: 2800 },
      ],
      inclusions: ["Round-trip TurboJet ferry", "English-speaking guide", "Ruins of St. Paul entrance", "Macau city tour"],
      exclusions: ["Lunch", "Casino activities", "Visa fee (if required)", "Personal expenses"],
      importantNotes: ["Philippine citizens require a separate Macau visa — apply in advance.", "Departure at 8:00 AM from ferry terminal."],
      cancellationPolicy: "Free cancellation up to 72 hours before departure.",
      requiresBookingDate: true,
      availability: [],
    },
    {
      id: "hk-tour-1",
      name: "Ocean Park Full-Day",
      source: "globaltix",
      sourceId: "gtx_HK_002",
      sourceProductCode: "GTX-HK-OCP-2026",
      sourceCategoryId: "theme-parks",
      description:
        "Hong Kong's iconic marine-theme park with thrilling roller coasters, a giant panda habitat, an aquarium, and spectacular cable-car views of the South China Sea — a full-day adventure for all ages.",
      images: [
        { url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80", isPrimary: true },
      ],
      duration: "Full Day (8 hrs)",
      durationMinutes: 480,
      meetingPoint: "Ocean Park Main Gate, Aberdeen, HK",
      category: "Theme Parks",
      tags: ["family", "thrill", "animals", "rides"],
      price: 3000,
      currency: "PHP",
      bookingOptions: [
        { id: "adult",  label: "Adult (12+)",  price: 3000 },
        { id: "child",  label: "Child (3–11)", price: 2200 },
        { id: "infant", label: "Infant (0–2)", price: 0 },
      ],
      inclusions: ["Full-day admission ticket", "Cable car access", "All rides & attractions"],
      exclusions: ["Hotel transfer", "Meals & beverages", "Souvenir purchases"],
      cancellationPolicy: "Non-refundable. Reschedule up to 24 hours before visit.",
      requiresBookingDate: true,
      availability: [],
    },
    {
      id: "hk-tour-2",
      name: "Ngong Ping 360 Cable Car",
      source: "lakbayhub",
      sourceId: "lbh_HK_003",
      sourceProductCode: "LBH-HK-NP360",
      sourceCategoryId: "scenic",
      description:
        "Ride the 5.7 km cable car across Lantau Island to the Ngong Ping plateau, home of the iconic Tian Tan Big Buddha — with breathtaking views of the ocean, mountains, and Hong Kong Airport.",
      images: [
        { url: "https://images.unsplash.com/photo-1512452935861-f17bb7c2c8b4?w=600&q=80", isPrimary: true },
      ],
      duration: "Half Day (4 hrs)",
      durationMinutes: 240,
      meetingPoint: "Tung Chung Cable Car Station (MTR Tung Chung Exit B)",
      category: "Scenic",
      tags: ["cable car", "Big Buddha", "Lantau", "scenic"],
      price: 2500,
      currency: "PHP",
      bookingOptions: [
        { id: "adult",  label: "Adult (12+)",  price: 2500 },
        { id: "child",  label: "Child (3–11)", price: 1800 },
        { id: "crystal", label: "Crystal Cabin Upgrade", price: 3200 },
      ],
      inclusions: ["Round-trip cable car ticket", "Big Buddha base access", "Village of Wisdom walk"],
      exclusions: ["Monastery entrance", "Meals", "Hotel transfer"],
      importantNotes: ["Crystal cabin upgrade shows the floor — ideal for photos.", "Cable car may close in bad weather."],
      cancellationPolicy: "Free cancellation up to 24 hours before departure.",
      requiresBookingDate: true,
      availability: [],
    },
    {
      id: "hk-tour-3",
      name: "Harbour Cruise & Light Show",
      source: "globaltix",
      sourceId: "gtx_HK_004",
      sourceProductCode: "GTX-HK-HBR-2026",
      sourceCategoryId: "cruises",
      description:
        "Cruise Victoria Harbour as the Symphony of Lights — the world's largest permanent light-and-sound show — illuminates the Hong Kong skyline. A must-see for first-time visitors.",
      images: [
        { url: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=600&q=80", isPrimary: true },
      ],
      duration: "Evening Tour (2 hrs)",
      durationMinutes: 120,
      meetingPoint: "Tsim Sha Tsui Pier 1, Kowloon",
      category: "Cruises",
      tags: ["harbour", "nightlife", "lights", "Victoria Harbour"],
      price: 1800,
      currency: "PHP",
      bookingOptions: [
        { id: "adult",  label: "Adult (12+)",  price: 1800 },
        { id: "child",  label: "Child (3–11)", price: 1200 },
      ],
      inclusions: ["Harbour cruise (2 hrs)", "Welcome drink", "Light show viewing deck"],
      exclusions: ["Dinner", "Hotel transfer"],
      cancellationPolicy: "Free cancellation up to 24 hours before departure.",
      requiresBookingDate: true,
      availability: [],
    },
    {
      id: "hk-tour-4",
      name: "Mong Kok Night Market Tour",
      source: "lakbayhub",
      sourceId: "lbh_HK_005",
      sourceProductCode: "LBH-HK-MKN-EVE",
      sourceCategoryId: "markets",
      description:
        "Explore the vibrant street markets of Mong Kok at night — the Ladies' Market, Flower Market, Goldfish Market, and the neon-lit Fa Yuen Street with a knowledgeable local guide.",
      images: [
        { url: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=600&q=80", isPrimary: true },
      ],
      duration: "Evening Tour (3 hrs)",
      durationMinutes: 180,
      meetingPoint: "Mong Kok MTR Station Exit E2",
      category: "Markets",
      tags: ["shopping", "night market", "local", "street food"],
      price: 1500,
      currency: "PHP",
      bookingOptions: [
        { id: "adult",  label: "Adult (12+)",  price: 1500 },
        { id: "child",  label: "Child (5–11)", price: 1000 },
      ],
      inclusions: ["English/Filipino guide", "Market walking tour", "Street food tasting"],
      exclusions: ["Shopping budget", "Transport to/from meeting point"],
      cancellationPolicy: "Free cancellation up to 24 hours before departure.",
      requiresBookingDate: false,
      availability: [],
    },
  ],
};

/**
 * Returns the mock tours for a given destination slug.
 * Falls back to an empty array if the slug has no tours registered.
 *
 * TODO: Globaltix API Integration
 *   Replace this function body with:
 *   const response = await fetch(`https://api.globaltix.com/products?destinationId=${id}`);
 *   return response.json().map(mapGlobtixToTour);
 *
 * TODO: LakbayHub API Integration
 *   Merge LakbayHub results with Globaltix results and sort by price.
 *
 * @param {string} slug - destination slug, e.g. "danang-vietnam"
 * @returns {import("../../types/addons").Tour[]}
 */
export function getToursByDestination(slug) {
  return TOURS_BY_DESTINATION[slug] || [];
}
