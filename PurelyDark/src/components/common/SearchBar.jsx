import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { searchProducts } from "../../data/products";
import { formatPrice } from "../../utils/format";

export default function SearchBar({ onClose, autoFocus = true }) {
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  useEffect(() => {
    setResults(searchProducts(q).slice(0, 6));
  }, [q]);

  const submit = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    navigate(`/search?q=${encodeURIComponent(q.trim())}`);
    onClose?.();
  };

  return (
    <div className="w-full">
      <form onSubmit={submit} className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/50" />
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name, origin, cocoa %, flavour…"
          className="input-luxe pl-12 pr-10 py-4 text-base"
          aria-label="Search products"
        />
        {q && (
          <button
            type="button"
            onClick={() => setQ("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/50 hover:text-gold"
            aria-label="Clear"
          >
            <X size={18} />
          </button>
        )}
      </form>

      {q && (
        <div className="mt-4">
          {results.length === 0 ? (
            <p className="px-2 py-4 text-sm text-cream/50">
              No matches for “{q}”. Try an origin or cocoa percentage.
            </p>
          ) : (
            <ul className="divide-y divide-white/5">
              {results.map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => {
                      navigate(`/product/${p.slug}`);
                      onClose?.();
                    }}
                    className="flex w-full items-center gap-4 rounded-lg px-2 py-3 text-left transition-colors hover:bg-white/5"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="h-14 w-14 rounded-lg object-cover"
                    />
                    <span className="flex-1">
                      <span className="block text-sm text-cream">{p.name}</span>
                      <span className="block text-xs text-cream/50">
                        {p.categoryName} · {p.cocoa}%
                      </span>
                    </span>
                    <span className="text-sm text-gold">{formatPrice(p.price)}</span>
                  </button>
                </li>
              ))}
              <li className="pt-3">
                <button onClick={submit} className="btn-ghost text-xs">
                  View all results →
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
