import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "best-selling", label: "Best Selling" },
  { value: "top-rated", label: "Top Rated" },
  { value: "new", label: "New Arrivals" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export function sortProducts(list, sort) {
  const arr = [...list];
  switch (sort) {
    case "price-asc":
      return arr.sort((a, b) => a.price - b.price);
    case "price-desc":
      return arr.sort((a, b) => b.price - a.price);
    case "top-rated":
      return arr.sort((a, b) => b.rating - a.rating);
    case "best-selling":
      return arr.sort((a, b) => b.reviews - a.reviews);
    case "new":
      return arr.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    default:
      return arr;
  }
}

export default function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const onClick = (e) => !ref.current?.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);
  const current = SORT_OPTIONS.find((o) => o.value === value) || SORT_OPTIONS[0];
  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full border border-white/15 bg-espresso/60 px-5 py-2.5 text-sm text-cream/80 transition-colors hover:border-gold/50"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-cream/50">Sort:</span> {current.label}
        <ChevronDown size={15} className={open ? "rotate-180 transition" : "transition"} />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-30 mt-2 w-56 overflow-hidden rounded-xl border border-white/10 bg-chocolate shadow-soft"
        >
          {SORT_OPTIONS.map((o) => (
            <li key={o.value}>
              <button
                role="option"
                aria-selected={o.value === value}
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm text-cream/80 transition-colors hover:bg-white/5 hover:text-gold"
              >
                {o.label}
                {o.value === value && <Check size={15} className="text-gold" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
