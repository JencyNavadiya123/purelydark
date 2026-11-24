import { SlidersHorizontal, X } from "lucide-react";
import { formatPrice } from "../../utils/format";

/* Controlled filter panel. filters: { price, cocoa[], availability, bestSeller } */
const COCOA_BANDS = [
  { label: "Up to 65%", value: "0-65" },
  { label: "66–75%", value: "66-75" },
  { label: "76–89%", value: "76-89" },
  { label: "90% & above", value: "90-100" },
];

export function matchesFilters(p, f) {
  if (p.price > f.price) return false;
  if (f.availability === "in" && !p.inStock) return false;
  if (f.availability === "out" && p.inStock) return false;
  if (f.bestSeller && !p.bestSeller) return false;
  if (f.cocoa.length) {
    const hit = f.cocoa.some((band) => {
      const [lo, hi] = band.split("-").map(Number);
      return p.cocoa >= lo && p.cocoa <= hi; // inclusive, non-overlapping bands
    });
    if (!hit) return false;
  }
  return true;
}

export const defaultFilters = {
  price: 100000,
  cocoa: [],
  availability: "all",
  bestSeller: false,
};

export default function FilterSidebar({ filters, setFilters, onClose, maxPrice = 40 }) {
  const toggleCocoa = (value) =>
    setFilters((f) => ({
      ...f,
      cocoa: f.cocoa.includes(value)
        ? f.cocoa.filter((v) => v !== value)
        : [...f.cocoa, value],
    }));

  return (
    <aside className="flex h-full flex-col gap-8">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-serif text-xl text-cream">
          <SlidersHorizontal size={18} className="text-gold" /> Filters
        </h3>
        {onClose && (
          <button onClick={onClose} className="text-cream/60 lg:hidden" aria-label="Close filters">
            <X size={20} />
          </button>
        )}
      </div>

      {/* Price */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className="label-luxe mb-0">Max Price</span>
          <span className="text-sm text-gold">{formatPrice(filters.price)}</span>
        </div>
        <input
          type="range"
          min={100}
          max={maxPrice}
          step={10}
          value={filters.price}
          onChange={(e) => setFilters((f) => ({ ...f, price: Number(e.target.value) }))}
          className="w-full accent-gold"
          aria-label="Maximum price"
        />
      </div>

      {/* Cocoa % */}
      <div>
        <span className="label-luxe">Cocoa Percentage</span>
        <div className="flex flex-col gap-2.5">
          {COCOA_BANDS.map((b) => (
            <label key={b.value} className="flex cursor-pointer items-center gap-3 text-sm text-cream/80">
              <input
                type="checkbox"
                checked={filters.cocoa.includes(b.value)}
                onChange={() => toggleCocoa(b.value)}
                className="h-4 w-4 accent-gold"
              />
              {b.label}
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <span className="label-luxe">Availability</span>
        <div className="flex flex-col gap-2.5">
          {[
            { v: "all", l: "All products" },
            { v: "in", l: "In stock" },
            { v: "out", l: "Out of stock" },
          ].map((o) => (
            <label key={o.v} className="flex cursor-pointer items-center gap-3 text-sm text-cream/80">
              <input
                type="radio"
                name="availability"
                checked={filters.availability === o.v}
                onChange={() => setFilters((f) => ({ ...f, availability: o.v }))}
                className="h-4 w-4 accent-gold"
              />
              {o.l}
            </label>
          ))}
        </div>
      </div>

      {/* Best sellers */}
      <label className="flex cursor-pointer items-center gap-3 text-sm text-cream/80">
        <input
          type="checkbox"
          checked={filters.bestSeller}
          onChange={(e) => setFilters((f) => ({ ...f, bestSeller: e.target.checked }))}
          className="h-4 w-4 accent-gold"
        />
        Best sellers only
      </label>

      <button
        onClick={() => setFilters({ ...defaultFilters, price: maxPrice })}
        className="btn-ghost justify-start px-0 text-xs"
      >
        Reset all filters
      </button>
    </aside>
  );
}
