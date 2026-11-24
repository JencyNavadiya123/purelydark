import { useParams, Navigate, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { Truck, ShieldCheck, Leaf, Check, ChevronRight } from "lucide-react";
import Breadcrumb from "../components/common/Breadcrumb";
import RatingStars from "../components/common/RatingStars";
import QuantitySelector from "../components/common/QuantitySelector";
import AddToCartButton from "../components/common/AddToCartButton";
import WishlistButton from "../components/common/WishlistButton";
import ProductGallery from "../components/product/ProductGallery";
import ProductVideo from "../components/video/ProductVideo";
import ProductGrid from "../components/product/ProductGrid";
import Reveal from "../components/common/Reveal";
import { getProductBySlug, getRelated, allProducts } from "../data/products";
import { categoryVideo } from "../utils/assets";
import { getCategoryBySlug } from "../data/categories";
import { formatPrice } from "../utils/format";
import { useCart } from "../context/CartContext";
import useRecentlyViewed from "../hooks/useRecentlyViewed";

export default function ProductDetails() {
  const { productSlug } = useParams();
  const product = getProductBySlug(productSlug);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("details");

  const recentIds = useRecentlyViewed(product?.id);

  if (!product) return <Navigate to="/shop" replace />;

  const category = getCategoryBySlug(product.categorySlug);
  const related = getRelated(product, 4);
  const recent = recentIds
    .map((id) => allProducts.find((p) => p.id === id))
    .filter(Boolean)
    .slice(0, 4);

  const buyNow = () => {
    addToCart(product, qty);
    navigate("/cart");
  };

  return (
    <div className="pt-28">
      <div className="container-luxe">
        <Breadcrumb
          items={[
            { label: "Home", to: "/" },
            { label: "Shop", to: "/shop" },
            { label: category?.name, to: `/category/${product.categorySlug}` },
            { label: product.name },
          ]}
        />
      </div>

      <section className="section-tight">
        <div className="container-luxe grid gap-12 lg:grid-cols-2">
          <Reveal variant="left">
            <ProductGallery images={product.gallery} alt={product.name} />
          </Reveal>

          <Reveal variant="right">
            <div className="flex flex-wrap items-center gap-2">
              {product.badges.map((b) => (
                <span key={b} className={b === "Sale" ? "badge-sale" : "badge-dark"}>
                  {b}
                </span>
              ))}
            </div>
            <span className="eyebrow mt-4">
              {product.origin} · {product.originRegion}
            </span>
            <h1 className="heading-md mt-2">{product.name}</h1>

            <div className="mt-3 flex items-center gap-4">
              <RatingStars rating={product.rating} showValue reviews={product.reviews} />
              <span className={`text-sm ${product.inStock ? "text-gold" : "text-caramel"}`}>
                {product.inStock ? "In Stock" : "Sold Out"}
              </span>
            </div>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="font-serif text-3xl text-cream">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-lg text-cream/40 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="mt-5 text-cream/70">{product.description}</p>

            {/* Quick specs */}
            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-y border-white/5 py-5 text-sm">
              {[
                ["Cocoa", `${product.cocoa}%`],
                ["Weight", product.weight],
                ["Origin", product.origin],
                ["Flavour", product.flavorProfile],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4">
                  <dt className="text-cream/50">{k}</dt>
                  <dd className="text-right text-cream">{v}</dd>
                </div>
              ))}
            </dl>

            {/* Actions */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <QuantitySelector value={qty} onChange={setQty} />
              <AddToCartButton product={product} qty={qty} className="flex-1" />
              <WishlistButton product={product} className="h-12 w-12" />
            </div>
            <button
              onClick={buyNow}
              disabled={!product.inStock}
              className="btn-outline mt-3 w-full disabled:opacity-50"
            >
              Buy Now
            </button>

            {/* Trust */}
            <div className="mt-7 grid grid-cols-3 gap-3 text-center">
              {[
                [Truck, "Free over ₹2000"],
                [ShieldCheck, "Secure checkout"],
                [Leaf, "Ethically sourced"],
              ].map(([Icon, label]) => (
                <div key={label} className="flex flex-col items-center gap-1.5 rounded-xl border border-white/5 p-3">
                  <Icon size={18} className="text-gold" />
                  <span className="text-[0.7rem] text-cream/60">{label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Tabs: details / ingredients / reviews + product video */}
      <section className="section-tight">
        <div className="container-luxe grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <div className="mb-6 flex gap-2 border-b border-white/5">
              {[
                ["details", "Details"],
                ["ingredients", "Ingredients"],
                ["reviews", `Reviews (${product.reviews})`],
              ].map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={`relative px-4 py-3 text-sm transition-colors ${
                    tab === id ? "text-gold" : "text-cream/60 hover:text-cream"
                  }`}
                >
                  {label}
                  {tab === id && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gold" />}
                </button>
              ))}
            </div>

            {tab === "details" && (
              <div className="space-y-4 text-cream/70">
                <p>{product.description}</p>
                <p>
                  A {product.cocoa}% dark chocolate from the {product.originRegion}, with
                  tasting notes of {product.tastingNote}. Best enjoyed at room temperature,
                  allowed to melt slowly on the palate.
                </p>
                <p className="text-sm text-cream/50">
                  Flavour profile: {product.flavorProfile}
                </p>
              </div>
            )}

            {tab === "ingredients" && (
              <ul className="space-y-2.5">
                {product.ingredients.map((ing) => (
                  <li key={ing} className="flex items-center gap-3 text-cream/70">
                    <Check size={16} className="text-gold" /> {ing}
                  </li>
                ))}
              </ul>
            )}

            {tab === "reviews" && <Reviews product={product} />}
          </div>

          {/* Product showcase video */}
          <div>
            <h3 className="mb-6 font-serif text-xl text-cream">Chocolate in motion</h3>
            <ProductVideo video={categoryVideo(category?.index || 0)} />
            <p className="mt-4 text-sm text-cream/50">
              A closer look at the texture and craft behind {product.name}.
            </p>
          </div>
        </div>
      </section>

      {/* Related products */}
      <section className="section-tight">
        <div className="container-luxe">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-serif text-2xl text-cream">You may also love</h2>
            <Link to={`/category/${product.categorySlug}`} className="btn-ghost text-xs">
              More from {category?.name} <ChevronRight size={14} />
            </Link>
          </div>
          <ProductGrid products={related} />
        </div>
      </section>

      {/* Recently viewed */}
      {recent.length > 0 && (
        <section className="section-tight pb-24">
          <div className="container-luxe">
            <h2 className="mb-8 font-serif text-2xl text-cream">Recently viewed</h2>
            <ProductGrid products={recent} />
          </div>
        </section>
      )}
    </div>
  );
}

/* Synthetic but believable review block */
function Reviews({ product }) {
  const names = ["A. Laurent", "M. Okafor", "S. Dubois", "J. Petrov"];
  const notes = [
    "Exceptional depth — the finish lingers beautifully.",
    "The snap, the aroma, the melt. Faultless.",
    "My new favourite bar. Will reorder.",
    "Rich and complex without any bitterness.",
  ];
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4 rounded-xl border border-white/5 p-4">
        <span className="font-serif text-4xl text-gold">{product.rating.toFixed(1)}</span>
        <div>
          <RatingStars rating={product.rating} size={16} />
          <p className="mt-1 text-xs text-cream/50">Based on {product.reviews} reviews</p>
        </div>
      </div>
      {names.map((n, i) => (
        <div key={n} className="border-b border-white/5 pb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-cream">{n}</span>
            <RatingStars rating={i === 3 ? 4 : 5} size={13} />
          </div>
          <p className="mt-2 text-sm text-cream/60">{notes[i]}</p>
        </div>
      ))}
    </div>
  );
}
