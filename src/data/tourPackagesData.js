/**
 * Tour packages data — maps destination slugs to package page content.
 * Each entry provides: banner, gallery images, operator info, FAQs, goodToKnow, relatedPackages.
 * Core package details (itinerary, inclusions, pricing, etc.) come from data/destinations.js
 */

export const tourPackagesMeta = {
  korea: {
    bannerImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/1a7ba7179_KOREA.png",
    gallery: [
      "https://images.unsplash.com/photo-1562832135-14a35d25edef?w=600&q=80",
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&q=80",
      "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=600&q=80",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
      "https://images.unsplash.com/photo-1563115298-e9585e7943d4?w=600&q=80",
    ],
    departingFrom: "Manila",
    operator: "Gladex Travel & Tours",
    operatorReviews: 12400,
    goodReviewRate: 94,
    tags: ["English", "Join in & private groups", "Meet with guide"],
    goodToKnow: ["Warm clothing required (especially Dec)", "Korean Won recommended for shopping", "Bring valid passport (6 months validity)", "Group visa requires minimum 5 persons"],
    faqs: [
      { q: "Will my tour get canceled due to bad weather?", a: "Tours operate in most weather conditions. In extreme cases, alternative indoor activities will be arranged." },
      { q: "Can I get a refund?", a: "Cancellations made 30+ days before departure receive a partial refund less the downpayment. No refunds within 30 days." },
      { q: "Do I need a visa for Korea?", a: "Philippine passport holders need a Korean Tourist Visa or K-ETA. Our visa team will assist." },
      { q: "Can I amend my travel date?", a: "Date amendments are subject to availability and may incur fees. Contact us at least 45 days in advance." },
    ],
  },

  japan: {
    bannerImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/011d9d868_JAPAN.png",
    gallery: [
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80",
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80",
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&q=80",
      "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=600&q=80",
      "https://images.unsplash.com/photo-1578637387939-43c525550085?w=600&q=80",
    ],
    departingFrom: "Manila",
    operator: "Gladex Travel & Tours",
    operatorReviews: 18200,
    goodReviewRate: 96,
    tags: ["English", "Free & Easy", "Private guide available"],
    goodToKnow: ["Japan Tourist Visa required — apply 2 weeks in advance", "IC Card (Suica/Pasmo) recommended for trains", "Cash-friendly country — carry Yen", "Tipping is not customary in Japan"],
    faqs: [
      { q: "Is the Japan visa difficult to get?", a: "Processing takes 5–10 business days. Our team assists with requirements. Apply well in advance." },
      { q: "What is included in the package?", a: "Airfare, hotel, daily breakfast, private driver-guide, and airport transfers are included." },
      { q: "Can I add Universal Studios Japan?", a: "Yes, USJ is an optional add-on. Confirm when booking for ticket reservation." },
      { q: "Can I amend my travel date?", a: "Date amendments subject to availability and fees. Contact us 45 days before departure." },
    ],
  },

  singapore: {
    bannerImage: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=600&q=80",
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80",
      "https://images.unsplash.com/photo-1506870799893-1e0a3e02b25c?w=600&q=80",
      "https://images.unsplash.com/photo-1563115298-e9585e7943d4?w=600&q=80",
      "https://images.unsplash.com/photo-1512152272829-e3139592d56f?w=600&q=80",
    ],
    departingFrom: "Manila",
    operator: "Gladex Travel & Tours",
    operatorReviews: 15600,
    goodReviewRate: 95,
    tags: ["English", "Visa Free", "Free & Easy"],
    goodToKnow: ["Singapore is largely cashless — bring a credit/debit card", "Dress modestly when visiting religious sites", "MRT (metro) is the easiest way to travel", "No visa required for Philippine passport holders"],
    faqs: [
      { q: "Do I need a visa for Singapore?", a: "No visa required for Philippine passport holders for stays up to 30 days." },
      { q: "Is Universal Studios included?", a: "USS tickets are optional add-ons. Confirm when booking." },
      { q: "What airport transfer is included?", a: "SIC (Seat-in-Coach) airport transfers are included in both directions." },
      { q: "Can I extend my stay in Singapore?", a: "Yes, extensions are possible. Additional hotel nights can be arranged for an extra fee." },
    ],
  },

  bangkok: {
    bannerImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/1e8258a62_THAILAND.png",
    gallery: [
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80",
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&q=80",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&q=80",
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&q=80",
      "https://images.unsplash.com/photo-1524613032530-449a5d94c285?w=600&q=80",
    ],
    departingFrom: "Manila",
    operator: "Gladex Travel & Tours",
    operatorReviews: 20100,
    goodReviewRate: 93,
    tags: ["English", "Visa Free", "Free & Easy"],
    goodToKnow: ["Dress code required for temple visits — cover shoulders and knees", "Thai Baht recommended for personal expenses", "Thailand Digital Arrival Card (TDAC) required", "No visa required for Philippine passport holders"],
    faqs: [
      { q: "Is a visa required for Bangkok?", a: "No visa required for Philippine passport holders for stays up to 30 days." },
      { q: "What is the Thailand TDAC?", a: "Thailand Digital Arrival Card — register online before departure at https://tdac.immigration.go.th" },
      { q: "What optional tours are available?", a: "Ayutthaya Tour, Dinner Cruise, Floating Market, Safari World, and more." },
      { q: "Is travel insurance included?", a: "Basic travel insurance is included. Upgrade available upon request." },
    ],
  },

  "bangkok-pattaya": {
    bannerImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/1e8258a62_THAILAND.png",
    gallery: [
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80",
      "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=600&q=80",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&q=80",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&q=80",
    ],
    departingFrom: "Manila",
    operator: "Gladex Travel & Tours",
    operatorReviews: 14500,
    goodReviewRate: 93,
    tags: ["English", "Group Tour", "Meals Included"],
    goodToKnow: ["Minimum 4 pax required", "Dress code at temples — cover shoulders & knees", "Thai Baht for personal expenses", "Festive season surcharges apply on specific dates"],
    faqs: [
      { q: "What is the minimum group size?", a: "Minimum 4 pax required to proceed with this package." },
      { q: "Are meals included?", a: "3 Breakfasts, 2 Lunches, and 2 Dinners are included as per the itinerary." },
      { q: "What are the festive surcharges?", a: "USD 38–55 per pax applies during Dec 19–Jan 6, Feb 17–25, and Apr 10–16." },
      { q: "Is Pattaya Beach accessible from the hotel?", a: "Yes, most hotels are within reach of Pattaya Beach area." },
    ],
  },

  hongkong: {
    bannerImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/304a7c916_HONGKONG.png",
    gallery: [
      "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=600&q=80",
      "https://images.unsplash.com/photo-1512452935861-f17bb7c2c8b4?w=600&q=80",
      "https://images.unsplash.com/photo-1549592887-f18f358ec977?w=600&q=80",
      "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=600&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    ],
    departingFrom: "Manila",
    operator: "Gladex Travel & Tours",
    operatorReviews: 17800,
    goodReviewRate: 94,
    tags: ["English", "Free & Easy", "Disneyland available"],
    goodToKnow: ["Octopus card recommended for transport", "Visa-free for Philippine passport holders up to 14 days", "Macau requires additional visa", "HKD is the local currency"],
    faqs: [
      { q: "Is Disneyland included in all packages?", a: "Disneyland is included in the 'with Disneyland' package only. The Free & Easy package has it as an optional add-on." },
      { q: "How do I get to Macau?", a: "Macau is accessible via ferry from Hong Kong. The Macau day tour is optional and at extra cost." },
      { q: "What is the Octopus Card?", a: "A prepaid smart card used for MTR (metro), buses, and convenience stores throughout Hong Kong." },
      { q: "Can I amend my travel date?", a: "Amendments are subject to availability. Contact us at least 45 days before departure." },
    ],
  },

  "danang-vietnam": {
    bannerImage: "https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?w=600&q=80",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&q=80",
      "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80",
      "https://images.unsplash.com/photo-1578890036220-c3bb4bfe6a22?w=600&q=80",
      "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=600&q=80",
    ],
    departingFrom: "Manila",
    operator: "Gladex Travel & Tours",
    operatorReviews: 9200,
    goodReviewRate: 95,
    tags: ["English", "Group Tour", "2026 Special"],
    goodToKnow: ["Vietnam e-Visa required — apply 3–5 days in advance", "Carry a printed copy of your e-visa at check-in", "Hoi An is best explored in the early morning", "Shopping stops are optional — no obligation to purchase"],
    faqs: [
      { q: "Is Vietnam e-Visa hard to obtain?", a: "Applying is straightforward online at https://evisa.xuatnhapcanh.gov.vn. Processing takes 3–5 business days." },
      { q: "What is included in the Ba Na Hills tour?", a: "Cable car ride, Golden Bridge photoshoot, French Village stroll, and Fantasy Park access." },
      { q: "Are shopping stops compulsory?", a: "No — shopping stops are informational only. There is no obligation to purchase." },
      { q: "What hotel categories are available?", a: "Superior 3★ (Satya Danang) and Deluxe 4★ (Stellar Maris) are available." },
    ],
  },

  dubai: {
    bannerImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/0c2084a4c_DUBAI.png",
    gallery: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
      "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=600&q=80",
      "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=600&q=80",
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=600&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
    ],
    departingFrom: "Manila",
    operator: "Gladex Travel & Tours",
    operatorReviews: 22400,
    goodReviewRate: 97,
    tags: ["English", "Free & Easy", "Private Transfer"],
    goodToKnow: ["Tourism Dirham Fee payable at hotel upon check-in", "Dress modestly in public areas and malls", "Carry some cash (AED) for tips", "Visa requirements — confirm with team before booking"],
    faqs: [
      { q: "Do Filipinos need a visa for Dubai?", a: "Visa requirements vary. Please confirm with our team before booking. We assist with processing." },
      { q: "Is the Burj Khalifa included?", a: "The Burj Khalifa 'At the Top' is an optional add-on. Confirm when booking." },
      { q: "What is the Tourism Dirham Fee?", a: "This is a government-mandated fee payable directly at the hotel — approximately AED 7–20 per room per night." },
      { q: "What optional tours are available?", a: "Desert Safari with BBQ Dinner, Dhow Cruise, Dubai Frame, Abu Dhabi Day Trip, and more." },
    ],
  },

  taipei: {
    bannerImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/3316132ae_TAIPEI.png",
    gallery: [
      "https://images.unsplash.com/photo-1470004914212-05527e49370b?w=600&q=80",
      "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80",
      "https://images.unsplash.com/photo-1574068468668-a05a11f871da?w=600&q=80",
      "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=600&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    ],
    departingFrom: "Manila",
    operator: "Gladex Travel & Tours",
    operatorReviews: 10800,
    goodReviewRate: 94,
    tags: ["English", "Visa Exempt", "Free & Easy"],
    goodToKnow: ["Taiwan entry — confirm current visa-exempt status before travel", "EasyCard recommended for MRT and buses", "Night markets are best visited after 6PM", "Compulsory tipping for driver and guide (excluded from package)"],
    faqs: [
      { q: "Do Filipinos need a visa for Taiwan?", a: "Philippine passport holders may be visa-exempt for up to 14 days. Confirm current status before travel." },
      { q: "Is Taipei 101 included?", a: "Taipei 101 observation deck is an optional add-on, not included in the base package." },
      { q: "What is the suggested walking tour?", a: "A curated itinerary covering Old Town, Longshan Temple, Dihua Street, and Shilin Night Market." },
      { q: "What are transfer surcharge hours?", a: "Late arrival/departure outside standard operating hours incurs a surcharge. Confirm with team." },
    ],
  },

  bali: {
    bannerImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&q=80",
      "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=600&q=80",
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80",
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&q=80",
    ],
    departingFrom: "Manila",
    operator: "Gladex Travel & Tours",
    operatorReviews: 28600,
    goodReviewRate: 96,
    tags: ["English", "Free & Easy", "Visa on Arrival"],
    goodToKnow: ["Visa on arrival available at Ngurah Rai Airport", "Hotel security deposit required upon check-in", "Dress respectfully at temples — sarong required", "Bali government fee may apply per stay"],
    faqs: [
      { q: "Is visa on arrival easy to get in Bali?", a: "Yes — Visa on Arrival is available at the airport for Philippine passport holders. Fee payable in USD/IDR." },
      { q: "What tours are included on Day 1?", a: "Uluwatu Temple Tour, Coffee Factory Tour, and complimentary lunch are included on Day 1." },
      { q: "What optional tours are recommended?", a: "Bali Swing, Nusa Penida, White Water Rafting, ATV Ride, and Mount Batur Sunrise Trek." },
      { q: "Can I request early check-in?", a: "Early check-in is not guaranteed but you can request it. Standard check-in is 2PM." },
    ],
  },

  "malaysia-kota-kinabalu": {
    bannerImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/6b6d37b1a_MALAYSIA.png",
    gallery: [
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&q=80",
      "https://images.unsplash.com/photo-1574068468668-a05a11f871da?w=600&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    ],
    departingFrom: "Manila",
    operator: "Gladex Travel & Tours",
    operatorReviews: 6400,
    goodReviewRate: 93,
    tags: ["English", "Visa Free", "Nature Tour"],
    goodToKnow: ["Tourism Tax RM10 per room per night — payable at hotel", "Island hopping is weather-dependent", "Malaysia Digital Arrival Card required", "No visa required for Philippine passport holders"],
    faqs: [
      { q: "Do Filipinos need a visa for Malaysia?", a: "No visa required for Philippine passport holders. Malaysia Digital Arrival Card is required." },
      { q: "Is the island hopping guaranteed?", a: "Island hopping is subject to weather conditions. Alternative activities are arranged if cancelled." },
      { q: "What is included in the island hopping tour?", a: "Boat transfers to Manukan and Mamutik Islands, snorkeling, and beach activities are included." },
      { q: "Is Mari-Mari Cultural Village included?", a: "Mari-Mari Cultural Village is an optional add-on at extra cost." },
    ],
  },
};

export const getTourPackageMeta = (slug) => {
  return tourPackagesMeta[slug] || null;
};

// Helper to get related destination slugs (excluding current)
export const getRelatedDestinations = (currentSlug, allDestinations, count = 4) => {
  return allDestinations
    .filter((d) => d.slug !== currentSlug)
    .sort(() => 0.5 - Math.random())
    .slice(0, count);
};