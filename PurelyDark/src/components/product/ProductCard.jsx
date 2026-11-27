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
        <span className="absolute bottom-2.5 right-2.5 grid h-10 w-10 place-items-center rounded-full border border-gold/50 bg-espresso/70 text-center font-serif text-xs font-semibold text-gold backdrop-blur sm:bottom-3 sm:right-3 sm:h-12 sm:w-12 sm:text-sm">
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

      <div className="flex flex-1 flex-col p-3.5 sm:p-5">
        <span className="flex h-4 items-center gap-2 text-[0.6rem] uppercase tracking-[0.16em] text-gold/85 sm:text-[0.68rem] sm:tracking-[0.18em]">
          <span className="h-px w-3 shrink-0 bg-gold/60 sm:w-4" />
          <span className="truncate">{product.origin}</span>
        </span>
        <Link to={`/product/${product.slug}`}>
          <h3 className="clamp-2 mt-1.5 min-h-[2.5rem] font-serif text-sm leading-snug text-cream transition-colors group-hover:text-gold sm:mt-2 sm:min-h-[3.4rem] sm:text-base lg:text-lg">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 sm:mt-2.5">
          <RatingStars rating={product.rating} showValue reviews={product.reviews} />
        </div>

        {/* Gold hairline divider */}
        <div className="mt-3 h-px bg-gradient-to-r from-gold/25 via-gold/10 to-transparent sm:mt-4" />

        <div className="mt-2.5 flex flex-wrap items-end justify-between gap-x-2 gap-y-1 sm:mt-3">
          <div className="flex items-baseline gap-1.5 sm:gap-2">
            <span className="font-serif text-base font-semibold text-gold sm:text-lg lg:text-xl">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-cream/40 line-through sm:text-sm">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <span className="text-[0.6rem] uppercase tracking-wider text-cream/40 sm:text-[0.65rem]">
            {product.weight}
          </span>
        </div>

        <AddToCartButton
          product={product}
          fullWidth
          className="mt-auto !mt-3 !py-2.5 !text-xs sm:!mt-4"
          label="Add to Cart"
        />
      </div>
    </div>
  );
}
