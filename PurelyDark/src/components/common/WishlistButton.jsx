import { Heart } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";
import { classNames } from "../../utils/format";

export default function WishlistButton({ product, className = "", size = 18 }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const active = isWishlisted(product.id);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product);
      }}
      aria-pressed={active}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      className={classNames(
        "grid place-items-center rounded-full border backdrop-blur transition-all duration-300",
        active
          ? "border-gold bg-gold/20 text-gold"
          : "border-white/15 bg-espresso/60 text-cream/80 hover:border-gold/60 hover:text-gold",
        className
      )}
    >
      <Heart size={size} className={active ? "fill-gold" : ""} />
    </button>
  );
}
