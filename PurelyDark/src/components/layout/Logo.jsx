import { Link } from "react-router-dom";

export default function Logo({ className = "" }) {
  return (
    <Link to="/" className={`group flex items-center gap-2 sm:gap-2.5 ${className}`} aria-label="PurelyDark home">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-gold-gradient font-serif text-base font-black text-espresso sm:h-9 sm:w-9 sm:text-lg">
        P
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-lg font-bold tracking-wide text-cream sm:text-xl">
          Purely<span className="text-gold">Dark</span>
        </span>
        <span className="text-[0.5rem] uppercase tracking-luxe text-cream/50 sm:text-[0.55rem]">
          Maison du Cacao
        </span>
      </span>
    </Link>
  );
}
