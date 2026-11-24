import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "../../context/CartContext";
import QuantitySelector from "../common/QuantitySelector";
import { formatPrice } from "../../utils/format";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeFromCart,
    updateQty,
    subtotal,
    shipping,
    total,
  } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[100] bg-espresso/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-[101] flex w-full max-w-md flex-col bg-chocolate"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-white/5 px-6 py-5">
              <h2 className="flex items-center gap-2 font-serif text-xl text-cream">
                <ShoppingBag size={20} className="text-gold" /> Your Bag
              </h2>
              <button onClick={closeCart} aria-label="Close cart" className="text-cream/70 hover:text-gold">
                <X size={22} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
                <ShoppingBag size={48} className="text-gold/30" />
                <div>
                  <p className="font-serif text-xl text-cream">Your bag is empty</p>
                  <p className="mt-2 text-sm text-cream/50">
                    Discover our finest dark chocolate.
                  </p>
                </div>
                <button onClick={closeCart} className="btn-gold">
                  <Link to="/shop">Start Shopping</Link>
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <ul className="flex flex-col gap-5">
                    {items.map((item) => (
                      <li key={item.id} className="flex gap-4">
                        <Link
                          to={`/product/${item.slug}`}
                          onClick={closeCart}
                          className="h-24 w-20 shrink-0 overflow-hidden rounded-lg"
                        >
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        </Link>
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between gap-2">
                            <Link
                              to={`/product/${item.slug}`}
                              onClick={closeCart}
                              className="clamp-2 font-serif text-sm text-cream hover:text-gold"
                            >
                              {item.name}
                            </Link>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              aria-label="Remove"
                              className="text-cream/40 hover:text-caramel"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <span className="text-xs text-cream/40">{item.weight}</span>
                          <div className="mt-auto flex items-center justify-between pt-2">
                            <QuantitySelector
                              value={item.qty}
                              onChange={(q) => updateQty(item.id, q)}
                            />
                            <span className="text-sm text-gold">
                              {formatPrice(item.price * item.qty)}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-white/5 px-6 py-5">
                  <div className="mb-1 flex justify-between text-sm text-cream/70">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="mb-3 flex justify-between text-sm text-cream/70">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                  </div>
                  <div className="mb-4 flex justify-between border-t border-white/5 pt-3 text-base text-cream">
                    <span className="font-serif">Total</span>
                    <span className="font-medium text-gold">{formatPrice(total)}</span>
                  </div>
                  <Link to="/cart" onClick={closeCart} className="btn-gold mb-2 w-full">
                    View Cart & Checkout <ArrowRight size={16} />
                  </Link>
                  <button onClick={closeCart} className="btn-ghost w-full text-xs">
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
