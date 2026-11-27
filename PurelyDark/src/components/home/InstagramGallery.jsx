import { Heart, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Parallax } from "../common/Parallax";
import { img } from "../../utils/assets";

const EASE = [0.22, 1, 0.36, 1];

/* Asymmetrical magazine composition.
   `cls` carries the responsive placement + aspect ratio for each tile:
   mobile = 2-col flow, tablet = 3-col flow, desktop = explicit editorial grid. */
const TILES = [
  {
    seed: 1,
    w: 900,
    h: 900,
    featured: true,
    caption: "Single-Origin Truffles",
    likes: "4.2k",
    cls: "col-span-2 aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:col-[1/3] lg:row-[1/3]",
  },
  {
    seed: 3,
    w: 600,
    h: 600,
    caption: "Dark Chocolate Chunks",
    likes: "1.8k",
    cls: "aspect-square lg:aspect-auto lg:h-full lg:col-[3/4] lg:row-[1/2]",
  },
  {
    seed: 6,
    w: 600,
    h: 600,
    caption: "Cocoa Nib Bar",
    likes: "2.1k",
    cls: "aspect-square lg:aspect-auto lg:h-full lg:col-[4/5] lg:row-[1/2]",
  },
  {
    seed: 4,
    w: 1000,
    h: 560,
    caption: "The Brownie Stack",
    likes: "3.6k",
    cls: "col-span-2 aspect-[2/1] lg:aspect-auto lg:h-full lg:col-[3/5] lg:row-[2/3]",
  },
  {
    seed: 8,
    w: 600,
    h: 600,
    caption: "Praline Selection",
    likes: "1.3k",
    cls: "aspect-square lg:aspect-auto lg:h-full lg:col-[1/2] lg:row-[3/4]",
  },
  {
    seed: 10,
    w: 1000,
    h: 560,
    caption: "Melted Ganache",
    likes: "2.9k",
    cls: "col-span-2 aspect-[2/1] lg:aspect-auto lg:h-full lg:col-[2/4] lg:row-[3/4]",
  },
  {
    seed: 2,
    w: 600,
    h: 600,
    caption: "Assorted Pralines",
    likes: "1.6k",
    cls: "aspect-square lg:aspect-auto lg:h-full lg:col-[4/5] lg:row-[3/4]",
  },
];

/* ---------- Reusable gallery tile ---------- */
function GalleryTile({ seed, w, h, cls, caption, likes, variants }) {
  return (
    <motion.a
      href="#"
      aria-label={caption}
      variants={variants}
      className={`group relative block overflow-hidden rounded-2xl border border-white/5 ${cls}`}
    >
      <img
        src={img(seed, w, h)}
        alt={caption}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-[900ms] ease-luxe group-hover:scale-110"
      />

      {/* Depth gradient — deepens on hover so the caption reads */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/10 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Gold glow ring on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-gold/0 transition-all duration-500 group-hover:ring-gold/55" />

      {/* Corner arrow — slides in on hover */}
      <span className="absolute right-3 top-3 grid h-9 w-9 -translate-y-1 place-items-center rounded-full border border-gold/50 bg-espresso/55 text-gold opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:opacity-100">
        <ArrowUpRight size={16} />
      </span>

      {/* Caption + likes — slides up from the bottom */}
      <div className="absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
        <h3 className="font-serif text-base leading-tight text-cream">
          {caption}
        </h3>
        <span className="mt-1 inline-flex items-center gap-1.5 text-xs text-gold/90">
          <Heart size={13} className="fill-gold/90 text-gold/90" />
          {likes}
        </span>
      </div>
    </motion.a>
  );
}

export default function InstagramGallery() {
  const reduce = useReducedMotion();

  const header = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.16,
        delayChildren: reduce ? 0 : 0.05,
      },
    },
  };
  const headerItem = {
    hidden: { opacity: 0, y: reduce ? 0 : 26 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  const grid = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.12,
        delayChildren: reduce ? 0 : 0.1,
      },
    },
  };
  const tileV = {
    hidden: { opacity: 0, y: reduce ? 0 : 38, scale: reduce ? 1 : 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: EASE },
    },
  };
  const featuredV = {
    hidden: { opacity: 0, scale: reduce ? 1 : 0.9 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.85, ease: EASE } },
  };

  return (
    <section
      className="section relative overflow-hidden"
      style={{ background: "linear-gradient(180deg,#1a0f0a 0%,#140b07 55%,#190f09 100%)" }}
    >
      {/* Ambient warmth + subtle chocolate texture */}
      <div className="pointer-events-none absolute inset-0 bg-radial-glow opacity-50" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(230,200,120,0.7) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <Parallax className="pointer-events-none absolute inset-0" speed={0.16}>
        <div className="absolute right-[-12%] top-[8%] h-[42vh] w-[42vw] rounded-full bg-[radial-gradient(circle,rgba(198,154,82,0.1),transparent_70%)]" />
      </Parallax>

      <div className="container-luxe relative">
        {/* Header */}
        <motion.div
          variants={header}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto mb-14 flex max-w-2xl flex-col items-center text-center"
        >
          <motion.span variants={headerItem} className="eyebrow">
            <span className="gold-rule" /> @PURELYDARK
          </motion.span>
          <motion.h2 variants={headerItem} className="heading-lg mt-5">
            Follow the <span className="text-gold-grad">Obsession</span>
          </motion.h2>
          <motion.p variants={headerItem} className="lede mt-4">
            A little indulgence, a lot of passion. Discover the world of Purely
            Dark.
          </motion.p>
        </motion.div>

        {/* Editorial asymmetrical grid */}
        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 gap-3 [grid-auto-flow:dense] sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:auto-rows-[200px]"
        >
          {TILES.map((t) => (
            <GalleryTile
              key={t.seed}
              seed={t.seed}
              w={t.w}
              h={t.h}
              cls={t.cls}
              caption={t.caption}
              likes={t.likes}
              variants={t.featured ? featuredV : tileV}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
