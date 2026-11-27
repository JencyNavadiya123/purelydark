import { useState, useMemo, useEffect } from "react";
import { SlidersHorizontal } from "lucide-react";
import ProductGrid from "./ProductGrid";
import QuickViewModal from "./QuickViewModal";
import SortDropdown, { sortProducts } from "../common/SortDropdown";
import FilterSidebar, { matchesFilters, defaultFilters } from "../common/FilterSidebar";
import FilterDrawer from "../common/FilterDrawer";

const PAGE_SIZE = 12;

export default function ProductBrowser({ products = [], showFilters = true, initialSort = "featured" }) {
  const maxPrice = useMemo(
    () => Math.ceil(Math.max(10, ...products.map((p) => p.price))),
    [products]
  );
  const [filters, setFilters] = useState({ ...defaultFilters, price: maxPrice });
  const [sort, setSort] = useState(initialSort);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [quickView, setQuickView] = useState(null);
  const [mobileFilters, setMobileFilters] = useState(false);

  useEffect(() => {
    setFilters((f) => ({ ...f, price: maxPrice }));
  }, [maxPrice]);

  const filtered = useMemo(() => {
    const list = showFilters ? products.filter((p) => matchesFilters(p, filters)) : products;
    return sortProducts(list, sort);
  }, [products, filters, sort, showFilters]);

  useEffect(() => setVisible(PAGE_SIZE), [filtered.length]);

  const shown = filtered.slice(0, visible);

  return (
    <section
      className="relative"
      style={{ background: "linear-gradient(180deg,#1c110b 0%,#160d08 50%,#1e120c 100%)" }}
    >
      {/* Ambient warmth — clipped in its own layer so it never breaks the
          sticky filter sidebar (overflow-hidden on an ancestor would). */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-0 h-[55vh] w-[55vw] rounded-full bg-[radial-gradient(circle,rgba(198,154,82,0.08),transparent_70%)]" />
        <div className="absolute bottom-0 right-[-8%] h-[45vh] w-[45vw] rounded-full bg-[radial-gradient(circle,rgba(169,108,54,0.08),transparent_70%)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(rgba(230,200,120,0.8) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="container-luxe section-tight relative">
      <div className={showFilters ? "grid gap-10 lg:grid-cols-[260px_1fr]" : ""}>
        {/* Desktop filters */}
        {showFilters && (
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <FilterSidebar filters={filters} setFilters={setFilters} maxPrice={maxPrice} />
            </div>
          </div>
        )}

        <div className="min-w-0">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-cream/60">
              <span className="text-cream">{filtered.length}</span> products
            </p>
            <div className="flex items-center gap-3">
              {showFilters && (
                <button
                  onClick={() => setMobileFilters(true)}
                  className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm text-cream/80 lg:hidden"
                >
                  <SlidersHorizontal size={15} /> Filters
                </button>
              )}
              <SortDropdown value={sort} onChange={setSort} />
            </div>
          </div>

          <ProductGrid products={shown} onQuickView={setQuickView} columns={3} />

          {visible < filtered.length && (
            <div className="mt-14 text-center">
              <button onClick={() => setVisible((v) => v + PAGE_SIZE)} className="btn-outline">
                Load More ({filtered.length - visible} remaining)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile / tablet filter drawer */}
      {showFilters && (
        <FilterDrawer open={mobileFilters} onClose={() => setMobileFilters(false)} label="Filters">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            maxPrice={maxPrice}
            onClose={() => setMobileFilters(false)}
          />
          <button onClick={() => setMobileFilters(false)} className="btn-gold mt-8 w-full">
            Show {filtered.length} products
          </button>
        </FilterDrawer>
      )}

      <QuickViewModal
        product={quickView}
        open={!!quickView}
        onClose={() => setQuickView(null)}
      />
      </div>
    </section>
  );
}
