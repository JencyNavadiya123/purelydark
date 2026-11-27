import { Fragment } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Breadcrumb from "../components/common/Breadcrumb";
import BackgroundVideo from "../components/video/BackgroundVideo";
import ProductBrowser from "../components/product/ProductBrowser";
import { getCategoryBySlug, categories } from "../data/categories";
import { getProductsByCategory } from "../data/products";
import { categoryVideo, img } from "../utils/assets";

const EASE = [0.22, 1, 0.36, 1];
const heroC = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.1 } },
};
const heroItem = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.65, ease: EASE } },
};

/* ---------- Animated vector graphics for the "explore" band ---------- */
function VectorDecor({ reduce }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Warm glows */}
      <div className="absolute -left-24 top-1/3 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(198,154,82,0.12),transparent_70%)]" />
      <div className="absolute right-1/4 bottom-[-10%] h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(169,108,54,0.1),transparent_70%)]" />

      {/* Floating gold dust */}
      {Array.from({ length: 10 }).map((_, i) => {
        const size = 2 + (i % 3);
        return (
          <span
            key={i}
            className="absolute rounded-full bg-gold/30"
            style={{
              width: size,
              height: size,
              left: `${(i * 59) % 100}%`,
              bottom: "-10px",
              animation: `drift ${8 + (i % 6)}s linear ${i * 0.8}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}

/* ---------- Floating real-chocolate prop (varied shapes) ---------- */
const SHAPE_CLS = {
  circle: "rounded-full",
  squircle: "rounded-[1.75rem]",
  leaf: "rounded-[55%_20%_55%_20%]",
  hex: "",
};
const HEX_CLIP = "polygon(25% 4%,75% 4%,100% 50%,75% 96%,25% 96%,0% 50%)";

function FloatingChip({ seed, className = "", style, float, reduce, spin = 24, shape = "circle" }) {
  const shapeCls = SHAPE_CLS[shape] || SHAPE_CLS.circle;
  const hexStyle = shape === "hex" ? { clipPath: HEX_CLIP } : undefined;
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      style={style}
      animate={reduce ? undefined : float.animate}
      transition={float.transition}
    >
      {/* rotating gold ring (circles only) */}
      {shape === "circle" && (
        <motion.span
          className="absolute inset-[-7px] rounded-full border border-dashed border-gold/45"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: spin, repeat: Infinity, ease: "linear" }}
        />
      )}
      {/* prop */}
      <div
        className={`relative h-full w-full overflow-hidden border-2 border-gold/50 shadow-[0_18px_40px_rgba(0,0,0,0.5),0_0_22px_rgba(198,154,82,0.32)] ${shapeCls}`}
        style={hexStyle}
      >
        <img
          src={img(seed, 300, 300)}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-espresso/35 to-transparent" />
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.22),transparent_45%)]" />
      </div>
    </motion.div>
  );
}

/* Symmetric (mirrored) floating-prop layout — same shape/size left & right. */
const FLOAT_PAIRS = [
  { shape: "circle", size: "h-28 w-28", top: "8%", edge: "5%", seedL: 2, seedR: 6, dur: 7, spin: 26 },
  { shape: "hex", size: "h-20 w-20", top: "30%", edge: "9%", seedL: 4, seedR: 0, dur: 8.5, spin: 30 },
  { shape: "squircle", size: "h-24 w-24", top: "52%", edge: "4%", seedL: 8, seedR: 10, dur: 9.5, spin: 24 },
  { shape: "leaf", size: "h-20 w-20", top: "72%", edge: "8%", seedL: 13, seedR: 3, dur: 8, spin: 28 },
  { shape: "circle", size: "h-28 w-28", top: "86%", edge: "5%", seedL: 5, seedR: 9, dur: 7.5, spin: 22 },
];

const exploreGroup = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};
const explorePill = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: EASE } },
};

export default function CategoryDetails() {
  const { categorySlug } = useParams();
  const category = getCategoryBySlug(categorySlug);
  const reduce = useReducedMotion();

  if (!category) return <Navigate to="/categories" replace />;

  const products = getProductsByCategory(category.slug);

  return (
    <>
      {/* Category hero banner with cinematic video */}
      <section className="relative flex min-h-[64vh] items-end overflow-hidden pt-28">
        <BackgroundVideo
          video={{ ...categoryVideo(category.index), poster: category.banner }}
          overlay="none"
          eager
        />
        {/* Targeted darkening so the text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/35 to-espresso/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/80 via-espresso/25 to-transparent" />

        <motion.div
          variants={heroC}
          initial="hidden"
          animate="show"
          className="relative z-[2] w-full"
          style={{ padding: "70px 7%" }}
        >
          <motion.div variants={heroItem} className="mb-5">
            <Breadcrumb
              items={[
                { label: "Home", to: "/" },
                { label: "Categories", to: "/categories" },
                { label: category.name },
              ]}
            />
          </motion.div>
          <div className="max-w-2xl">
            <motion.span variants={heroItem} className="eyebrow">
              <span className="gold-rule" /> {category.cocoa}% Cocoa · {products.length} Products
            </motion.span>
            <motion.h1 variants={heroItem} className="heading-xl mt-3">
              {category.name}
            </motion.h1>
            <motion.p variants={heroItem} className="lede mt-4">
              {category.description}
            </motion.p>
          </div>
        </motion.div>
      </section>

      <ProductBrowser products={products} />

      {/* Related categories — redesigned editorial band with vector motion */}
      <section
        className="section relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#2c1a12 0%,#1b0f0a 55%,#271710 100%)" }}
      >
        {/* Gold top hairline */}
        <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <VectorDecor reduce={reduce} />

        {/* Floating real-chocolate props — symmetric mirrored pairs */}
        {FLOAT_PAIRS.map((p, i) => (
          <Fragment key={i}>
            <FloatingChip
              seed={p.seedL}
              shape={p.shape}
              reduce={reduce}
              spin={p.spin}
              className={`hidden lg:block ${p.size}`}
              style={{ top: p.top, left: p.edge }}
              float={{
                animate: { y: [0, -14, 0] },
                transition: { duration: p.dur, repeat: Infinity, ease: "easeInOut" },
              }}
            />
            <FloatingChip
              seed={p.seedR}
              shape={p.shape}
              reduce={reduce}
              spin={p.spin}
              className={`hidden lg:block ${p.size}`}
              style={{ top: p.top, right: p.edge }}
              float={{
                animate: { y: [0, -14, 0] },
                transition: {
                  duration: p.dur,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4,
                },
              }}
            />
          </Fragment>
        ))}

        <div className="container-luxe relative">
          <motion.div
            variants={heroC}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="mx-auto max-w-2xl text-center"
          >
            <motion.span variants={heroItem} className="eyebrow mx-auto justify-center">
              <span className="gold-rule" /> Keep Exploring
            </motion.span>
            <motion.h2 variants={heroItem} className="heading-md mt-4">
              Explore other categories
            </motion.h2>
          </motion.div>

          <motion.div
            variants={exploreGroup}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-10 grid grid-cols-1 gap-4 min-[400px]:grid-cols-2 sm:mt-12 sm:gap-5 lg:grid-cols-4"
          >
            {categories.slice(0, 8).map((c) => (
                <motion.div key={c.id} variants={explorePill} className="min-w-0">
                  <Link
                    to={`/category/${c.slug}`}
                    className="group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-gold/15 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-gold/50 hover:shadow-gold"
                  >
                    <img
                      src={c.image}
                      alt={c.name}
                      loading="lazy"
                      className="zoom-media h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/35 to-transparent" />
                    {/* gold top accent on hover */}
                    <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <span className="text-[0.6rem] uppercase tracking-[0.18em] text-gold">
                        {c.cocoa}% Cocoa
                      </span>
                      <h3 className="mt-0.5 font-serif text-sm leading-snug text-cream transition-colors duration-300 group-hover:text-gold sm:text-base">
                        {c.name}
                      </h3>
                    </div>

                    <span className="absolute right-3 top-3 grid h-8 w-8 translate-y-1 place-items-center rounded-full border border-gold/50 bg-espresso/55 text-gold opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-hover:bg-gold group-hover:text-espresso">
                      <ArrowUpRight size={15} />
                    </span>
                  </Link>
                </motion.div>
              ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
