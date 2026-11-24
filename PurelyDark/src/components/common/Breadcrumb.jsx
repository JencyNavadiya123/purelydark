import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

/* items: [{ label, to }] — last item is current (no link) */
export default function Breadcrumb({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.15em] text-cream/65">
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5">
            {last || !item.to ? (
              <span className={last ? "text-gold" : ""}>{item.label}</span>
            ) : (
              <Link to={item.to} className="transition-colors hover:text-gold">
                {item.label}
              </Link>
            )}
            {!last && <ChevronRight size={12} className="text-cream/30" />}
          </span>
        );
      })}
    </nav>
  );
}
