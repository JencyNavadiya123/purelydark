import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function CategoryCard({ category }) {
  return (
    <Link
      to={`/category/${category.slug}`}
      className="group relative block aspect-[4/5] overflow-hidden rounded-2xl border border-white/8 shadow-card transition-all duration-500 ease-luxe hover:-translate-y-1.5 hover:border-gold/45 hover:shadow-gold"
    >
      <img
        src={category.image}
        alt={category.name}
        loading="lazy"
        className="zoom-media h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/35 to-transparent transition-opacity duration-500" />
      {/* warm gold sheen on hover */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gold/15 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      {/* gold top accent line */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6">
        <div>
          <span className="text-[0.65rem] uppercase tracking-wider text-gold">
            {category.cocoa}% Cocoa
          </span>
          <h3 className="mt-1 font-serif text-xl leading-tight text-cream transition-colors duration-300 group-hover:text-gold">
            {category.name}
          </h3>
          <p className="clamp-2 mt-1 text-xs text-cream/60">{category.tagline}</p>
        </div>
        <span className="grid h-10 w-10 shrink-0 translate-y-2 place-items-center rounded-full border border-gold/50 bg-espresso/50 text-gold opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-hover:bg-gold group-hover:text-espresso">
          <ArrowUpRight size={18} />
        </span>
      </div>
    </Link>
  );
}
