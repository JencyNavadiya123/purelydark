import { useParams, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumb from "../components/common/Breadcrumb";
import ChocolateVideoSection from "../components/video/ChocolateVideoSection";
import ProductBrowser from "../components/product/ProductBrowser";
import { getCategoryBySlug, categories } from "../data/categories";
import { getProductsByCategory } from "../data/products";
import { categoryVideo } from "../utils/assets";

export default function CategoryDetails() {
  const { categorySlug } = useParams();
  const category = getCategoryBySlug(categorySlug);

  if (!category) return <Navigate to="/categories" replace />;

  const products = getProductsByCategory(category.slug);

  return (
    <>
      {/* Category hero banner with cinematic video */}
      <section className="relative flex min-h-[64vh] items-end overflow-hidden pt-32">
        <img src={category.banner} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/70 to-espresso/30" />
        <div className="container-luxe relative z-[2] pb-14">
          <Breadcrumb
            items={[
              { label: "Home", to: "/" },
              { label: "Categories", to: "/categories" },
              { label: category.name },
            ]}
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-2xl"
          >
            <span className="eyebrow">
              <span className="gold-rule" /> {category.cocoa}% Cocoa · {products.length} Products
            </span>
            <h1 className="heading-xl mt-3">{category.name}</h1>
            <p className="lede mt-4">{category.description}</p>
          </motion.div>
        </div>
      </section>

      <ProductBrowser products={products} />

      {/* Cinematic category video banner */}
      <ChocolateVideoSection
        video={categoryVideo(category.index)}
        eyebrow={category.tagline}
        title={`The making of ${category.name}`}
        text="Watch how this expression comes to life — from bean selection to the final tempered snap."
        align="left"
        controls
        height="h-[60vh] min-h-[420px]"
      />

      {/* Related categories */}
      <section className="section-tight">
        <div className="container-luxe">
          <h2 className="mb-8 font-serif text-2xl text-cream">Explore other categories</h2>
          <div className="flex flex-wrap gap-3">
            {categories
              .filter((c) => c.slug !== category.slug)
              .slice(0, 8)
              .map((c) => (
                <Link
                  key={c.id}
                  to={`/category/${c.slug}`}
                  className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-cream/70 transition-colors hover:border-gold hover:text-gold"
                >
                  {c.name}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
