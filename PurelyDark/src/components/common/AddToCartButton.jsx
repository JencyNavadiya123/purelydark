import { ShoppingBag, Check } from "lucide-react";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { classNames } from "../../utils/format";

export default function AddToCartButton({
  product,
  qty = 1,
  className = "",
  variant = "gold",
  label = "Add to Cart",
  fullWidth = false,
}) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  const base = variant === "outline" ? "btn-outline" : "btn-gold";

  return (
    <button
      type="button"
      onClick={handle}
      disabled={!product.inStock}
      className={classNames(base, fullWidth && "w-full", className)}
    >
      {added ? <Check size={16} /> : <ShoppingBag size={16} />}
      {!product.inStock ? "Sold Out" : added ? "Added" : label}
    </button>
  );
}
