import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({ value, onChange, min = 1, max = 99 }) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));
  return (
    <div className="inline-flex shrink-0 items-center rounded-full border border-white/15 bg-espresso/60">
      <button
        type="button"
        onClick={dec}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className="grid h-11 w-9 place-items-center text-cream/80 transition-colors hover:text-gold disabled:opacity-30 sm:w-11"
      >
        <Minus size={16} />
      </button>
      <span className="w-8 text-center text-sm font-medium tabular-nums sm:w-10">
        {value}
      </span>
      <button
        type="button"
        onClick={inc}
        disabled={value >= max}
        aria-label="Increase quantity"
        className="grid h-11 w-9 place-items-center text-cream/80 transition-colors hover:text-gold disabled:opacity-30 sm:w-11"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
