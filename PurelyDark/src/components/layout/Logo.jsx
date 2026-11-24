import { Link } from "react-router-dom";

export default function Logo({ className = "" }) {
  return (
    <Link to="/" className={`group flex items-center gap-2.5 ${className}`} aria-label="PurelyDark home">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-gold-gradient font-serif text-lg font-black text-espresso">
        P
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-xl font-bold tracking-wide text-cream">
          Purely<span className="text-gold">Dark</span>
        </span>
        <span className="text-[0.55rem] uppercase tracking-luxe text-cream/50">
          Maison du Cacao
        </span>
      </span>
    </Link>
  );
}
