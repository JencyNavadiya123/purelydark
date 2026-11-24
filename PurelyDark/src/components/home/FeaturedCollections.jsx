import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { getCollectionBySlug, getCollectionProducts } from "../../data/collections";

/* The three featured collections (real data) with editorial copy + number. */
const FEATURED = [
  {
    no: "01",
    slug: "signature-collection",
    image: "/collections/signature.jpg", // drop your image here
    description:
      "Our iconic creations, crafted to deliver the pure essence of fine dark chocolate.",
  },
  {
    no: "02",
    slug: "luxury-collection",
    image: "/collections/luxury.jpg",
    description:
      "Exceptional cocoa, rare origins, and exquisite chocolate experiences.",
  },
  {
    no: "03",
    slug: "dark-chocolate-lovers",
    image: "/collections/dark-lovers.jpg",
    description:
      "Bold cocoa intensity for those who appreciate chocolate in its purest form.",
  },
];

const EASE = [0.22, 1, 0.36, 1];

/* ---------- Editorial collection card (data-driven, real products) ---------- */
function CollectionCard({ item }) {
  const collection = getCollectionBySlug(item.slug);
  if (!collection) return null;
  const products = getCollectionProducts(item.slug);
  // Use your custom card image; fall back to a real product photo if missing.
  const fallback = products[0]?.image || collection.image;
  const hero = item.image || fallback;
  const thumbs = products.slice(1, 4);
  const extra = Math.max(0, collection.count - (thumbs.length + 1));

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 60 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
      }}
      style={{ background: "linear-gradient(165deg,#4a3126 0%,#311f17 55%,#2a1a13 100%)" }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-gold/20 shadow-soft transition-all duration-500 hover:-translate-y-2 hover:border-gold/50 hover:shadow-gold"
    >
      {/* subtle warm top highlight for depth */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      {/* Product photography */}
      <div className="relative aspect-[5/6] overflow-hidden">
        <img
          src={hero}
          alt={collection.name}
          loading="lazy"
          onError={(e) => {
            if (!e.currentTarget.dataset.fb) {
              e.currentTarget.dataset.fb = "1";
              e.currentTarget.src = fallback;
            }
          }}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0a] via-transparent to-transparent" />

        {/* Editorial number */}
        <span className="absolute left-5 top-4 font-serif text-5xl font-bold text-gold/35 transition-colors duration-500 group-hover:text-gold/70">
          {item.no}
        </span>
        {/* Real product count */}
        <span className="badge-gold absolute right-4 top-4 shadow-gold">
          {collection.count} pieces
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-2xl leading-tight text-cream">
          {collection.name}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-[#E6D4B4]/75">
          {item.description}
        </p>

        {/* Real product thumbnails — wraps cleanly on narrow cards */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-x-3 gap-y-3">
          <div className="flex -space-x-3">
            {thumbs.map((p) => (
              <img
                key={p.id}
                src={p.image}
                alt={p.name}
                loading="lazy"
                className="h-9 w-9 rounded-full border-2 border-[#4a3126] object-cover sm:h-10 sm:w-10"
              />
            ))}
            {extra > 0 && (
              <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-[#4a3126] bg-espresso text-[0.6rem] font-semibold text-gold sm:h-10 sm:w-10 sm:text-[0.65rem]">
                +{extra}
              </span>
            )}
          </div>
          <Link
            to={`/collections/${collection.slug}`}
            className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-gold transition-transform duration-500 group-hover:translate-x-1"
          >
            Explore Collection
            <ArrowUpRight
              size={16}
              className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* Full-card link overlay (keeps whole card clickable) */}
        <Link
          to={`/collections/${collection.slug}`}
          aria-label={`Explore ${collection.name}`}
          className="absolute inset-0"
        />
      </div>
    </motion.article>
  );
}

/* ---------- Floating gold particles ---------- */
function Particles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 14 }).map((_, i) => {
        const size = 2 + (i % 3);
        return (
          <span
            key={i}
            className="absolute rounded-full bg-gold/25"
            style={{
              width: size,
              height: size,
              left: `${(i * 67) % 100}%`,
              bottom: "-12px",
              animation: `drift ${8 + (i % 7)}s linear ${i * 0.8}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}

export default function FeaturedCollections() {
  const reduce = useReducedMotion();

  const header = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.18 } },
  };
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 26 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };
  const cards = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.22, delayChildren: reduce ? 0 : 0.45 },
    },
  };

  return (
    <section
      className="section relative overflow-hidden"
      style={{
        background:
          "linear-gradient(165deg,#24150F 0%,#1b100a 48%,#382016 100%)",
      }}
    >
      {/* Ambient champagne-gold lighting */}
      <div className="pointer-events-none absolute left-1/2 top-[-18%] h-[55vh] w-[85vw] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(198,154,82,0.14),transparent_68%)]" />
      <div className="pointer-events-none absolute bottom-[-20%] right-[-10%] h-[45vh] w-[45vw] rounded-full bg-[radial-gradient(circle,rgba(169,108,54,0.12),transparent_70%)]" />
      <Particles />

      <div className="container-luxe relative">
        {/* Header — sequential reveal */}
        <motion.div
          variants={header}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto mb-16 flex max-w-2xl flex-col items-center text-center"
        >
          <motion.span variants={item} className="eyebrow">
            <span className="gold-rule" /> The World of PurelyDark
          </motion.span>

          <motion.h2
            variants={item}
            className="heading-lg mt-5"
          >
            Discover Our <span className="text-gold-grad">Chocolate</span> Collections
          </motion.h2>

          {/* Animated gold line under heading */}
          <motion.span
            variants={{
              hidden: { scaleX: 0, opacity: 0 },
              show: { scaleX: 1, opacity: 1, transition: { duration: 0.8, ease: EASE } },
            }}
            className="mt-6 h-px w-24 origin-center bg-gold-gradient"
          />

          <motion.p variants={item} className="mt-6 text-base leading-relaxed text-[#E6D4B4]/70 sm:text-lg">
            Crafted with passion, curated with purpose. Explore extraordinary cocoa
            experiences made for true chocolate lovers.
          </motion.p>
        </motion.div>

        {/* Cards — one-by-one entrance */}
        <motion.div
          variants={cards}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURED.map((it) => (
            <CollectionCard key={it.slug} item={it} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
