import { useState, useMemo, useEffect } from "react";
import { SlidersHorizontal } from "lucide-react";
import ProductGrid from "./ProductGrid";
import QuickViewModal from "./QuickViewModal";
import SortDropdown, { sortProducts } from "../common/SortDropdown";
import FilterSidebar, { matchesFilters, defaultFilters } from "../common/FilterSidebar";
import Modal from "../common/Modal";

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
    <div className="container-luxe section-tight">
      <div className={showFilters ? "grid gap-10 lg:grid-cols-[260px_1fr]" : ""}>
        {/* Desktop filters */}
        {showFilters && (
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <FilterSidebar filters={filters} setFilters={setFilters} maxPrice={maxPrice} />
            </div>
          </div>
        )}

        <div>
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

      {/* Mobile filter modal */}
      {showFilters && (
        <Modal open={mobileFilters} onClose={() => setMobileFilters(false)} size="sm" label="Filters">
          <div className="p-6">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              maxPrice={maxPrice}
              onClose={() => setMobileFilters(false)}
            />
            <button onClick={() => setMobileFilters(false)} className="btn-gold mt-8 w-full">
              Show {filtered.length} products
            </button>
          </div>
        </Modal>
      )}

      <QuickViewModal
        product={quickView}
        open={!!quickView}
        onClose={() => setQuickView(null)}
      />
    </div>
  );
}
