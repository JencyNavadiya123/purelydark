import { useParams, Navigate, useNavigate, Link } from "react-router-dom";
import { useState, useRef } from "react";
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
  const tabRefs = useRef([]);

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

  const tabs = [
    { id: "details", label: "Details" },
    { id: "ingredients", label: "Ingredients" },
    { id: "reviews", label: `Reviews (${product.reviews})` },
  ];

  // Accessible tablist keyboard navigation (Arrow keys / Home / End).
  const onTabKey = (e, idx) => {
    const n = tabs.length;
    let next;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (idx + 1) % n;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (idx - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    else return;
    e.preventDefault();
    setTab(tabs[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="overflow-x-clip pt-28">
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
        <div className="container-luxe grid gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12">
          <Reveal variant="left" className="min-w-0">
            <ProductGallery images={product.gallery} alt={product.name} />
          </Reveal>

          <Reveal variant="right" className="min-w-0">
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

            <p className="mt-5 leading-relaxed text-cream/70">{product.description}</p>

            {/* Quick specs */}
            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-y border-white/5 py-5 text-sm">
              {[
                ["Cocoa", `${product.cocoa}%`],
                ["Weight", product.weight],
                ["Origin", product.origin],
                ["Flavour", product.flavorProfile],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3">
                  <dt className="shrink-0 text-cream/50">{k}</dt>
                  <dd className="min-w-0 break-words text-right text-cream">{v}</dd>
                </div>
              ))}
            </dl>

            {/* Actions — on small/tablet widths the Add to Cart drops to its own
                full-width row (quantity + wishlist stay together); from lg they
                sit inline. Prevents the button from overflowing narrow columns. */}
            {/* Small/tablet: quantity (left) + wishlist (right) on row 1, then
                Add to Cart full-width on its own row — the button never wraps.
                From lg: all three sit inline in a single row. */}
            <div className="mt-7 flex flex-wrap items-center justify-between gap-3 lg:justify-start">
              <QuantitySelector value={qty} onChange={setQty} />
              <AddToCartButton
                product={product}
                qty={qty}
                className="order-last w-full min-w-0 lg:order-none lg:w-auto lg:flex-1"
              />
              <WishlistButton product={product} className="h-12 w-12 shrink-0" />
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
                [Truck, "Free over Rs. 2000"],
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
        <div className="container-luxe grid gap-8 md:grid-cols-2 md:gap-8 lg:gap-10">
          <div className="min-w-0">
            {/* Accessible tablist — horizontally scrollable (no visible scrollbar)
                on narrow screens, active underline preserved. */}
            <div
              role="tablist"
              aria-label="Product information"
              className="mb-6 flex gap-2 overflow-x-auto border-b border-white/5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {tabs.map(({ id, label }, i) => (
                <button
                  key={id}
                  id={`tab-${id}`}
                  role="tab"
                  type="button"
                  aria-selected={tab === id}
                  aria-controls={`panel-${id}`}
                  tabIndex={tab === id ? 0 : -1}
                  ref={(el) => (tabRefs.current[i] = el)}
                  onClick={() => setTab(id)}
                  onKeyDown={(e) => onTabKey(e, i)}
                  className={`relative shrink-0 whitespace-nowrap px-4 py-3 text-sm transition-colors ${
                    tab === id ? "text-gold" : "text-cream/60 hover:text-cream"
                  }`}
                >
                  {label}
                  {tab === id && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gold" />}
                </button>
              ))}
            </div>

            {tab === "details" && (
              <div
                id="panel-details"
                role="tabpanel"
                aria-labelledby="tab-details"
                tabIndex={0}
                className="space-y-4 text-cream/70"
              >
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
              <ul
                id="panel-ingredients"
                role="tabpanel"
                aria-labelledby="tab-ingredients"
                tabIndex={0}
                className="space-y-2.5"
              >
                {product.ingredients.map((ing) => (
                  <li key={ing} className="flex items-center gap-3 text-cream/70">
                    <Check size={16} className="shrink-0 text-gold" />{" "}
                    <span className="min-w-0">{ing}</span>
                  </li>
                ))}
              </ul>
            )}

            {tab === "reviews" && (
              <div
                id="panel-reviews"
                role="tabpanel"
                aria-labelledby="tab-reviews"
                tabIndex={0}
              >
                <Reviews product={product} />
              </div>
            )}
          </div>

          {/* Product showcase video (single instance — shown right on desktop,
              below the tab content on mobile; never duplicated). */}
          <div className="min-w-0">
            <h3 className="mb-6 font-serif text-xl text-cream">Chocolate in motion</h3>
            <ProductVideo video={categoryVideo(category?.index || 0)} className="w-full" />
            <p className="mt-4 text-sm text-cream/50">
              A closer look at the texture and craft behind {product.name}.
            </p>
          </div>
        </div>
      </section>

      {/* Related products */}
      <section className="section-tight">
        <div className="container-luxe">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-serif text-2xl text-cream">You may also love</h2>
            <Link to={`/category/${product.categorySlug}`} className="btn-ghost self-start px-0 text-xs sm:self-auto">
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
        <span className="font-serif text-3xl text-gold sm:text-4xl">{product.rating.toFixed(1)}</span>
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
