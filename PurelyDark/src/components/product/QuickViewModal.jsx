import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "../common/Modal";
import RatingStars from "../common/RatingStars";
import QuantitySelector from "../common/QuantitySelector";
import AddToCartButton from "../common/AddToCartButton";
import WishlistButton from "../common/WishlistButton";
import { formatPrice } from "../../utils/format";

export default function QuickViewModal({ product, open, onClose }) {
  const [qty, setQty] = useState(1);
  if (!product) return null;
  return (
    <Modal open={open} onClose={onClose} size="xl" label={`Quick view: ${product.name}`}>
      <div className="grid gap-0 md:grid-cols-2">
        <div className="aspect-square overflow-hidden md:aspect-auto">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col gap-4 p-7 sm:p-9">
          <span className="eyebrow">
            {product.origin} · {product.cocoa}% Cocoa
          </span>
          <h2 className="heading-md">{product.name}</h2>
          <RatingStars rating={product.rating} showValue reviews={product.reviews} />
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-medium text-gold">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-cream/40 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          <p className="clamp-3 text-sm text-cream/70">{product.description}</p>
          <p className="text-xs uppercase tracking-wider text-cream/50">
            {product.flavorProfile} · {product.weight}
          </p>
          <div className="mt-2 flex items-center gap-3">
            <QuantitySelector value={qty} onChange={setQty} />
            <WishlistButton product={product} className="h-11 w-11" />
          </div>
          <AddToCartButton product={product} qty={qty} fullWidth className="mt-1" />
          <Link
            to={`/product/${product.slug}`}
            onClick={onClose}
            className="btn-ghost justify-center text-xs"
          >
            View full details →
          </Link>
        </div>
      </div>
    </Modal>
  );
}
