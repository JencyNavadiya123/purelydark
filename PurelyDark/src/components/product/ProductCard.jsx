import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import RatingStars from "../common/RatingStars";
import WishlistButton from "../common/WishlistButton";
import AddToCartButton from "../common/AddToCartButton";
import { formatPrice } from "../../utils/format";

export default function ProductCard({ product, onQuickView }) {
  const badge = product.badges[0];
  return (
    <div className="card group glow-hover relative flex h-full flex-col overflow-hidden">
      {/* Royal gold accent line across the top */}
      <span className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      <Link
        to={`/product/${product.slug}`}
        className="relative block aspect-square overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="zoom-media h-full w-full object-cover"
        />
        {/* Warm vignette + hover sheen */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-chocolate/70 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gold/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {badge && (
            <span
              className={
                badge === "Sale"
                  ? "badge-sale"
                  : badge === "Best Seller"
                  ? "badge-gold"
                  : "badge-dark"
              }
            >
              {badge}
            </span>
          )}
          {!product.inStock && <span className="badge-dark">Sold Out</span>}
        </div>

        {/* Cocoa % medallion */}
        <span className="absolute bottom-3 right-3 grid h-12 w-12 place-items-center rounded-full border border-gold/50 bg-espresso/70 text-center font-serif text-sm font-semibold text-gold backdrop-blur">
          {product.cocoa}%
        </span>

        {/* Hover actions */}
        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <WishlistButton product={product} className="h-10 w-10" size={16} />
          {onQuickView && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onQuickView(product);
              }}
              aria-label="Quick view"
              className="grid h-10 w-10 translate-y-1 place-items-center rounded-full border border-white/15 bg-espresso/60 text-cream/80 opacity-0 backdrop-blur transition-all duration-300 hover:border-gold/60 hover:text-gold group-hover:translate-y-0 group-hover:opacity-100"
            >
              <Eye size={16} />
            </button>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <span className="flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.18em] text-gold/85">
          <span className="h-px w-4 bg-gold/60" />
          {product.origin}
        </span>
        <Link to={`/product/${product.slug}`}>
          <h3 className="clamp-2 mt-2 min-h-[3.4rem] font-serif text-lg leading-snug text-cream transition-colors group-hover:text-gold">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2.5">
          <RatingStars rating={product.rating} showValue reviews={product.reviews} />
        </div>

        {/* Gold hairline divider */}
        <div className="mt-4 h-px bg-gradient-to-r from-gold/25 via-gold/10 to-transparent" />

        <div className="mt-3 flex items-end justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-xl font-semibold text-gold">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-cream/40 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <span className="text-[0.65rem] uppercase tracking-wider text-cream/40">
            {product.weight}
          </span>
        </div>

        <AddToCartButton
          product={product}
          fullWidth
          className="mt-auto !mt-4 !py-2.5 !text-xs"
          label="Add to Cart"
        />
      </div>
    </div>
  );
}
