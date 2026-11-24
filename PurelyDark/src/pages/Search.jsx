import { useSearchParams, Link } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";
import PageHero from "../components/layout/PageHero";
import SearchBar from "../components/common/SearchBar";
import ProductBrowser from "../components/product/ProductBrowser";
import { searchProducts } from "../data/products";

export default function Search() {
  const [params] = useSearchParams();
  const q = params.get("q") || "";
  const results = q ? searchProducts(q) : [];

  return (
    <>
      <PageHero
        eyebrow="Search"
        title={q ? `Results for “${q}”` : "Search Chocolate"}
        subtitle={q ? `${results.length} chocolates matched your search.` : "Find your next favourite bar."}
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Search" }]}
        seed={7}
        compact
      />

      <div className="container-luxe mt-10">
        <div className="mx-auto max-w-2xl">
          <SearchBar autoFocus={false} />
        </div>
      </div>

      {q && results.length === 0 ? (
        <div className="container-luxe section">
          <div className="flex flex-col items-center gap-5 rounded-3xl border border-dashed border-white/10 py-20 text-center">
            <SearchIcon size={44} className="text-gold/40" />
            <div>
              <p className="font-serif text-2xl text-cream">No matches found</p>
              <p className="mt-2 text-cream/50">
                Try a cocoa percentage, an origin, or a flavour like “sea salt”.
              </p>
            </div>
            <Link to="/shop" className="btn-gold">Browse all chocolate</Link>
          </div>
        </div>
      ) : q ? (
        <ProductBrowser products={results} />
      ) : null}
    </>
  );
}
