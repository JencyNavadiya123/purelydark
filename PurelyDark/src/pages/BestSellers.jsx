import PageHero from "../components/layout/PageHero";
import ProductBrowser from "../components/product/ProductBrowser";
import { allProducts } from "../data/products";

export default function BestSellers() {
  const bestSellers = allProducts.filter((p) => p.bestSeller);
  return (
    <>
      <PageHero
        eyebrow="Most Loved"
        title="Best Sellers"
        subtitle="The chocolates our connoisseurs reach for again and again — proven favourites across every origin."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Best Sellers" }]}
        seed={1}
      />
      <ProductBrowser products={bestSellers} initialSort="best-selling" />
    </>
  );
}
