import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Parallax } from "../common/Parallax";
import ProductCard from "../product/ProductCard";

const EASE = [0.22, 1, 0.36, 1];
const headerC = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.05 } },
};
const itemV = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function BestSellers({
  products = [],
  onQuickView,
  title,
  eyebrow,
  to = "/best-sellers",
}) {
  const reduce = useReducedMotion();
  // Duplicate the list so the marquee loops seamlessly (-50% = one set).
  const loop = [...products, ...products];

  return (
    <section
      className="section relative overflow-hidden"
      style={{ background: "linear-gradient(180deg,#1b100b 0%,#2a1810 55%,#1d110c 100%)" }}
    >
      {/* soft ambient gold glow — gentle scroll parallax */}
      <Parallax className="pointer-events-none absolute inset-0" speed={0.16}>
        <div className="absolute left-1/2 top-0 h-[40vh] w-[70vw] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(198,154,82,0.1),transparent_68%)]" />
      </Parallax>

      <div className="container-luxe relative">
        <motion.div
          variants={headerC}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div className="max-w-xl">
            <motion.span variants={itemV} className="eyebrow">
              <span className="gold-rule" /> {eyebrow || "Most Loved"}
            </motion.span>
            <motion.h2 variants={itemV} className="heading-lg mt-4">
              {title || "Best-selling chocolates"}
            </motion.h2>
          </div>
          <motion.div variants={itemV} className="shrink-0">
            <Link to={to} className="btn-ghost whitespace-nowrap">
              View all <ArrowRight size={16} />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Continuous marquee — constrained to the section width */}
      <div className="container-luxe relative">
        <div className="product-marquee-wrap relative mt-2 overflow-hidden rounded-2xl">
          <div className="animate-product-marquee flex w-max items-stretch gap-5 py-1 sm:gap-6">
            {loop.map((p, i) => (
              <motion.div
                key={`${p.id}-${i}`}
                className="flex w-[230px] shrink-0 sm:w-[270px]"
                initial={reduce ? false : { opacity: 0, y: 44, scale: 0.96 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.6,
                  // one-by-one cascade for the first row, then settle
                  delay: Math.min(i % products.length, 6) * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <ProductCard product={p} onQuickView={onQuickView} />
              </motion.div>
            ))}
          </div>
          {/* edge fades for a premium cinematic feel */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#23140d] to-transparent sm:w-16" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#1d110c] to-transparent sm:w-16" />
        </div>
      </div>
    </section>
  );
}
