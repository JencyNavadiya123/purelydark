/* ============================================================
   CENTRAL MEDIA CONFIG  —  swap these for your own assets
   ------------------------------------------------------------
   • Images: remote Unsplash chocolate photography (query-based,
     deterministic via seed) so the site looks real out of the box.
   • Videos: swappable CDN placeholders. Drop your own cinematic
     chocolate MP4/WebM files into /src/assets/videos (or a CDN)
     and replace the URLs in VIDEOS below. Every <video> on the
     site reads from here, so one edit updates the whole site.
   ============================================================ */

/* Unsplash image helper — stable, cover-cropped chocolate imagery.
   `seed` keeps a given product/category image consistent across renders. */
const UNSPLASH = "https://images.unsplash.com";

// Curated pool — every image verified (visually) as real dark chocolate.
const PHOTO_POOL = [
  "photo-1549007994-cb92caebd54b", // dark chocolate truffles
  "photo-1511381939415-e44015466834", // dark chocolate chunks
  "photo-1606312619070-d48b4c652a52", // dark chocolate stack with nuts
  "photo-1606313564200-e75d5e30476c", // rich chocolate brownie stack
  "photo-1481391319762-47dff72954d9", // assorted chocolate box
  "photo-1610611424854-5e07032143d8", // dark chocolate brownie
  "photo-1610450949065-1f2841536c88", // dark chocolate bar stack
  "photo-1614088685112-0a760b71a3c8", // dark chocolate bar with nibs
  "photo-1599599810769-bcde5a160d32", // chocolate pralines
  "photo-1623660053975-cf75a8be0908", // chocolate bar
  "photo-1548741487-18d363dc4469", // chocolate box close-up
  "photo-1614088685112-0a760b71a3c8", // dark chocolate bar with nibs
  "photo-1610450949065-1f2841536c88", // dark chocolate bar stack
  "photo-1599599810769-bcde5a160d32", // chocolate pralines
  "photo-1481391319762-47dff72954d9", // assorted chocolate box
  "photo-1511381939415-e44015466834", // dark chocolate chunks
];

export function img(seed = 0, w = 1200, h = 1200) {
  const id = PHOTO_POOL[Math.abs(seed) % PHOTO_POOL.length];
  return `${UNSPLASH}/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;
}

/* ---- Cinematic CHOCOLATE videos (real footage, Mixkit free CDN) ----
   These are genuine dark-chocolate / cocoa clips served from
   assets.mixkit.co (hotlinkable, no sign-in). Swap any `src` with your
   own footage anytime — every <video> on the site reads from here. */
// 720p is plenty for decorative, full-bleed background footage and keeps
// bandwidth + GPU decode roughly half of 1080p — much smoother on scroll.
const MK = (id, res = 720) =>
  `https://assets.mixkit.co/videos/${id}/${id}-${res}.mp4`;

/* Local project video (Vite hashes & bundles it). Used as the hero/footer bg. */
import heroLocal from "../assets/videos/gemini_generated_video_042eecad.mp4";

export const VIDEOS = {
  // Your local chocolate video — dramatic full-screen hero background.
  // Poster is a DARK chocolate still (index 0) so it matches the video's
  // palette and crossfades seamlessly while the clip buffers.
  hero: {
    src: heroLocal,
    webm: "",
    poster: img(0, 1920, 1080),
  },
  // Pouring chocolate syrup
  pouring: {
    src: MK(41109),
    poster: img(2, 1600, 900),
  },
  // Cocoa / chocolate beans slowly rotating
  beans: {
    src: MK(40797),
    poster: img(4, 1600, 900),
  },
  // Chocolate bar chunks texture
  roasting: {
    src: MK(41121),
    poster: img(10, 1600, 900),
  },
  // Liquid chocolate fountain texture
  grinding: {
    src: MK(41126),
    poster: img(7, 1600, 900),
  },
  // Pieces of chocolate bars falling
  moulding: {
    src: MK(41117),
    poster: img(11, 1600, 900),
  },
  // Chocolate powder over cupcakes
  packaging: {
    src: MK(41116),
    poster: img(8, 1600, 900),
  },
  // Bars of luxury chocolate (720 only)
  craftsmanship: {
    src: MK(26597, 720),
    poster: img(12, 1600, 900),
  },
  // Subtle looping chocolate for the footer (your local video)
  footer: {
    src: heroLocal,
    poster: img(5, 1600, 900),
  },
  // Chocolate bar (Pexels, 1080p ~1.8MB)
  chocolateBar: {
    src: "https://videos.pexels.com/video-files/4226091/4226091-hd_1920_1080_25fps.mp4",
    poster: img(9, 1600, 900),
  },
};

/* Pick a cinematic video for a given category index (cycles through set). */
const CATEGORY_VIDEO_KEYS = [
  "pouring",
  "beans",
  "roasting",
  "grinding",
  "moulding",
  "craftsmanship",
  "packaging",
];
export function categoryVideo(index = 0) {
  return VIDEOS[CATEGORY_VIDEO_KEYS[index % CATEGORY_VIDEO_KEYS.length]];
}
