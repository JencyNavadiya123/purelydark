import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

/* Horizontal scroll-snap product slider with arrow controls. */
export default function ProductSlider({ products = [], onQuickView }) {
  const ref = useRef(null);
  const scrollBy = (dir) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };
  return (
    <div className="relative">
      <div
        ref={ref}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((p) => (
          <div
            key={p.id}
            className="w-[75%] shrink-0 snap-start sm:w-[45%] lg:w-[30%] xl:w-[23%]"
          >
            <ProductCard product={p} onQuickView={onQuickView} />
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={() => scrollBy(-1)}
          aria-label="Scroll left"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-cream/70 transition-colors hover:border-gold hover:text-gold"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => scrollBy(1)}
          aria-label="Scroll right"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-cream/70 transition-colors hover:border-gold hover:text-gold"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
