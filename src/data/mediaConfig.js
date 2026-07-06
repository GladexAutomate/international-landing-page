/**
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  GLADEX TOURS — CENTRALIZED MEDIA CONFIGURATION                        │
 * │  Single source of truth for all destination images and videos.          │
 * │                                                                         │
 * │  HOW TO UPDATE MEDIA                                                    │
 * │  ─────────────────────────────────────────────────────────────────────  │
 * │  VIDEO    → paste the Google Drive preview URL into the `video` field.  │
 * │             Format: https://drive.google.com/file/d/FILE_ID/preview     │
 * │             Or use a local path: "/media/slug/briefing.mp4"             │
 * │                                                                         │
 * │  IMAGES   → paste any image URL, or use a local path.                  │
 * │             heroImage: displayed full-width on the destination page.     │
 * │             cardImage: displayed in the destination grid / card.         │
 * │                                                                         │
 * │  LOCAL FILES                                                             │
 * │  ─────────────────────────────────────────────────────────────────────  │
 * │  Drop image/video files into: public/media/<destination-slug>/          │
 * │  Then reference them as:      "/media/<destination-slug>/filename.jpg"  │
 * │                                                                         │
 * │  Example:                                                               │
 * │    File:  public/media/danang-vietnam/cover.jpg                        │
 * │    Value: heroImage: "/media/danang-vietnam/cover.jpg"                  │
 * │                                                                         │
 * │  GALLERY                                                                │
 * │  ─────────────────────────────────────────────────────────────────────  │
 * │  Add { url, caption } objects to the `gallery` array to manage          │
 * │  destination gallery images from this file.                             │
 * │  Leave as [] to use the existing gallery in destinationContent.js.      │
 * │                                                                         │
 * │  ADDING A NEW DESTINATION                                               │
 * │  ─────────────────────────────────────────────────────────────────────  │
 * │  Copy any existing entry below, change the key to the new slug,         │
 * │  and fill in the media URLs.                                            │
 * └─────────────────────────────────────────────────────────────────────────┘
 */

export const mediaConfig = {

  // ── DA NANG VIETNAM ──────────────────────────────────────────────────────
  "danang-vietnam": {
    heroImage: "https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?w=1600&q=80",
    cardImage: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80",
    video: "https://youtu.be/8z4kBSX8PdA",
    gallery: [],
  },

  // ── KOREA ────────────────────────────────────────────────────────────────
  "korea": {
    heroImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/1a7ba7179_KOREA.png",
    cardImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/1a7ba7179_KOREA.png",
    video: null,
    gallery: [],
  },

  // ── BANGKOK (FREE & EASY) ────────────────────────────────────────────────
  "bangkok": {
    heroImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/1e8258a62_THAILAND.png",
    cardImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/1e8258a62_THAILAND.png",
    video: null,
    gallery: [],
  },

  // ── SINGAPORE ────────────────────────────────────────────────────────────
  "singapore": {
    heroImage: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1600&q=80",
    cardImage: "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&q=80",
    video: null,
    gallery: [],
  },

  // ── HONG KONG ────────────────────────────────────────────────────────────
  "hongkong": {
    heroImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/304a7c916_HONGKONG.png",
    cardImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/304a7c916_HONGKONG.png",
    video: "https://youtu.be/xduac823yJ0",
    gallery: [],
  },

  // ── BANGKOK + PATTAYA ────────────────────────────────────────────────────
  "bangkok-pattaya": {
    heroImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/1e8258a62_THAILAND.png",
    cardImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/1e8258a62_THAILAND.png",
    video: null,
    gallery: [],
  },

  // ── BALI (FREE & EASY) ───────────────────────────────────────────────────
  "bali": {
    heroImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600&q=80",
    cardImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    video: null,
    gallery: [],
  },

  // ── BALI WISATAKU ────────────────────────────────────────────────────────
  "bali-wisataku": {
    heroImage: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1600&q=80",
    cardImage: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80",
    video: null,
    gallery: [],
  },

  // ── BEIJING (all packages) ───────────────────────────────────────────────
  "beijing": {
    heroImage: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1600&q=80",
    cardImage: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80",
    video: null,
    gallery: [],
  },

  // ── BEIJING 6D5N PAL ─────────────────────────────────────────────────────
  "beijing-6d5n-pal": {
    heroImage: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1600&q=80",
    cardImage: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80",
    video: null,
    gallery: [],
  },

  // ── BEIJING + SHANGHAI ───────────────────────────────────────────────────
  "beijing-shanghai": {
    heroImage: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1600&q=80",
    cardImage: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80",
    video: null,
    gallery: [],
  },

  // ── CHIANG MAI ───────────────────────────────────────────────────────────
  "chiangmai": {
    heroImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/ac83b2d2d_CHIAMAIGETAWAY.png",
    cardImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/ac83b2d2d_CHIAMAIGETAWAY.png",
    video: null,
    gallery: [],
  },

  // ── DUBAI ────────────────────────────────────────────────────────────────
  "dubai": {
    heroImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/0c2084a4c_DUBAI.png",
    cardImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/0c2084a4c_DUBAI.png",
    video: null,
    gallery: [],
  },

  // ── MALAYSIA KOTA KINABALU ───────────────────────────────────────────────
  "malaysia-kota-kinabalu": {
    heroImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/6b6d37b1a_MALAYSIA.png",
    cardImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/6b6d37b1a_MALAYSIA.png",
    video: null,
    gallery: [],
  },

  // ── MALDIVES MAAFUSHI ────────────────────────────────────────────────────
  "maldives-maafushi": {
    heroImage: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1600&q=80",
    cardImage: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    video: null,
    gallery: [],
  },

  // ── MALDIVES (BUDGET) ────────────────────────────────────────────────────
  "maldives": {
    heroImage: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1600&q=80",
    cardImage: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80",
    video: null,
    gallery: [],
  },

  // ── MACAU ────────────────────────────────────────────────────────────────
  "macau": {
    heroImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/eb748ba68_MACAU.png",
    cardImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/eb748ba68_MACAU.png",
    video: null,
    gallery: [],
  },

  // ── NEW ZEALAND ──────────────────────────────────────────────────────────
  "new-zealand": {
    heroImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/b4378a0bc_NEWZEALAND.png",
    cardImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/b4378a0bc_NEWZEALAND.png",
    video: null,
    gallery: [],
  },

  // ── JAPAN ────────────────────────────────────────────────────────────────
  "japan": {
    heroImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/011d9d868_JAPAN.png",
    cardImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/011d9d868_JAPAN.png",
    video: null,
    gallery: [],
  },

  // ── JEJU KOREA ───────────────────────────────────────────────────────────
  "jeju-korea": {
    heroImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/3cb24dd77_JEJU-KOREA.png",
    cardImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/3cb24dd77_JEJU-KOREA.png",
    video: null,
    gallery: [],
  },

  // ── TAIPEI ───────────────────────────────────────────────────────────────
  "taipei": {
    heroImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/3316132ae_TAIPEI.png",
    cardImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/3316132ae_TAIPEI.png",
    video: null,
    gallery: [],
  },

  // ── PHUKET ───────────────────────────────────────────────────────────────
  "phuket": {
    heroImage: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=1600&q=80",
    cardImage: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&q=80",
    video: null,
    gallery: [],
  },

  // ── VIETNAM HANOI ────────────────────────────────────────────────────────
  "vietnam-hanoi": {
    heroImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/2abbe67e3_VIETNAM-HANOI.png",
    cardImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/2abbe67e3_VIETNAM-HANOI.png",
    video: null,
    gallery: [],
  },

  // ── VIETNAM PHU QUOC ─────────────────────────────────────────────────────
  "vietnam-phu-quoc": {
    heroImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/c3b501d54_VIETNAM-PHU-QUOC.png",
    cardImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/c3b501d54_VIETNAM-PHU-QUOC.png",
    video: null,
    gallery: [],
  },

  // ── KUALA LUMPUR ─────────────────────────────────────────────────────────
  "kuala-lumpur": {
    heroImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/e22b0e37b_KUALALUMPUR.png",
    cardImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/e22b0e37b_KUALALUMPUR.png",
    video: null,
    gallery: [],
  },

  // ── TRI-CITY ─────────────────────────────────────────────────────────────
  "tri-city": {
    heroImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/8d649c200_Tri-City.png",
    cardImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/8d649c200_Tri-City.png",
    video: null,
    gallery: [],
  },

  // ── TWIN-CITY ────────────────────────────────────────────────────────────
  "twin-city": {
    heroImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/22848d9a6_TwinCity.png",
    cardImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/22848d9a6_TwinCity.png",
    video: null,
    gallery: [],
  },

  // ── INDOCHINA ────────────────────────────────────────────────────────────
  "indochina": {
    heroImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/8b2806427_Indochina.png",
    cardImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/8b2806427_Indochina.png",
    video: null,
    gallery: [],
  },

  // ── CAMBODIA ─────────────────────────────────────────────────────────────
  "cambodia": {
    heroImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/c13692d34_CAMBODIA.png",
    cardImage: "https://media.base44.com/images/public/6a0d6ad01d34ead888ecdd6f/c13692d34_CAMBODIA.png",
    video: null,
    gallery: [],
  },

};

/**
 * Returns the media config for a given destination slug.
 * Returns an empty object {} if the slug has no entry — callers
 * should fall back to their own data in that case.
 *
 * @param {string} slug - The destination slug (e.g. "danang-vietnam")
 * @returns {{ heroImage?: string, cardImage?: string, video?: string|null, gallery?: Array }}
 */
export function getMediaForSlug(slug) {
  return mediaConfig[slug] || {};
}
