import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({ value, onChange, min = 1, max = 99 }) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));
  return (
    <div className="inline-flex items-center rounded-full border border-white/15 bg-espresso/60">
      <button
        type="button"
        onClick={dec}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className="grid h-10 w-10 place-items-center text-cream/80 transition-colors hover:text-gold disabled:opacity-30"
      >
        <Minus size={16} />
      </button>
      <span className="w-10 text-center text-sm font-medium tabular-nums">
        {value}
      </span>
      <button
        type="button"
        onClick={inc}
        disabled={value >= max}
        aria-label="Increase quantity"
        className="grid h-10 w-10 place-items-center text-cream/80 transition-colors hover:text-gold disabled:opacity-30"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
