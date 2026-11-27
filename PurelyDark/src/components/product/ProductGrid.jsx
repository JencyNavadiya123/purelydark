import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { PackageOpen } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

export default function ProductGrid({ products = [], onQuickView, columns = 4 }) {
  // Base: 1 col on very narrow phones (<375px), 2 cols from 375px up.
  const colCls =
    columns === 3
      ? "grid-cols-1 min-[375px]:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-1 min-[375px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  if (!products.length) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-white/10 py-24 text-center">
        <PackageOpen size={40} className="text-gold/50" />
        <p className="text-lg text-cream/70">No chocolates match your selection.</p>
        <p className="text-sm text-cream/40">Try adjusting your filters or search.</p>
      </div>
    );
  }

  return (
    <div className={`grid gap-4 sm:gap-6 ${colCls}`}>
      {products.map((p, i) => (
        <motion.div
          key={p.id}
          className="h-full min-w-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: (i % columns) * 0.06, ease: EASE }}
        >
          <ProductCard product={p} onQuickView={onQuickView} />
        </motion.div>
      ))}
    </div>
  );
}
