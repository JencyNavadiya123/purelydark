import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
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
  // Duplicate the list so the marquee loops seamlessly (-50% = one set).
  const loop = [...products, ...products];

  return (
    <section
      className="section relative overflow-hidden"
      style={{ background: "linear-gradient(180deg,#1b100b 0%,#2a1810 55%,#1d110c 100%)" }}
    >
      {/* soft ambient gold glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[40vh] w-[70vw] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(198,154,82,0.1),transparent_68%)]" />

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

      {/* Full-bleed continuous marquee */}
      <div className="product-marquee-wrap relative mt-2 overflow-hidden">
        <div className="animate-product-marquee flex w-max gap-5 sm:gap-6">
          {loop.map((p, i) => (
            <div key={`${p.id}-${i}`} className="w-[230px] shrink-0 sm:w-[270px]">
              <ProductCard product={p} onQuickView={onQuickView} />
            </div>
          ))}
        </div>
        {/* edge fades for a premium cinematic feel */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#1d110c] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#1d110c] to-transparent" />
      </div>
    </section>
  );
}
