import PageHero from "../components/layout/PageHero";
import ProductBrowser from "../components/product/ProductBrowser";
import { allProducts } from "../data/products";

export default function Shop() {
  return (
    <>
      <PageHero
        eyebrow="The Full Collection"
        title="Shop All Chocolate"
        subtitle={`${allProducts.length} single-origin and flavoured dark chocolate bars, crafted in small batches.`}
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Shop" }]}
        seed={6}
      />
      <ProductBrowser products={allProducts} />
    </>
  );
}
