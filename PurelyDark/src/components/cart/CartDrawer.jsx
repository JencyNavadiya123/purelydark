import { useEffect } from "react";
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

  /* Freeze page momentum-scroll while the bag is open. */
  useEffect(() => {
    if (!isOpen) return undefined;
    window.__lenis?.stop();
    return () => window.__lenis?.start();
  }, [isOpen]);

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
            className="fixed inset-y-0 right-0 z-[101] flex h-dvh w-full flex-col bg-chocolate shadow-[-20px_0_60px_-15px_rgba(0,0,0,0.7)] sm:w-[400px] md:w-[66vw] md:max-w-[540px] lg:w-[380px] lg:max-w-none xl:w-[420px]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="flex shrink-0 items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-5"
              style={{ paddingTop: "max(1rem, env(safe-area-inset-top))" }}
            >
              <h2 className="flex items-center gap-2 font-serif text-lg text-cream sm:text-xl">
                <ShoppingBag size={20} className="text-gold" /> Your Bag
              </h2>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="grid h-10 w-10 place-items-center text-cream/70 transition-colors hover:text-gold"
              >
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
                <div data-lenis-prevent className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-4 sm:px-6">
                  <ul className="flex flex-col gap-4 sm:gap-5">
                    {items.map((item) => (
                      <li
                        key={item.id}
                        className="flex gap-3 rounded-xl p-2 transition-colors duration-300 hover:bg-white/[0.03] sm:gap-4"
                      >
                        <Link
                          to={`/product/${item.slug}`}
                          onClick={closeCart}
                          className="h-20 w-16 shrink-0 overflow-hidden rounded-lg sm:h-24 sm:w-20"
                        >
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        </Link>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex justify-between gap-2">
                            <Link
                              to={`/product/${item.slug}`}
                              onClick={closeCart}
                              className="clamp-2 min-w-0 font-serif text-sm text-cream hover:text-gold"
                            >
                              {item.name}
                            </Link>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              aria-label="Remove"
                              className="shrink-0 text-cream/40 transition-colors hover:text-caramel"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <span className="text-xs text-cream/40">{item.weight}</span>
                          <div className="mt-auto flex flex-wrap items-center justify-between gap-x-2 gap-y-2 pt-3">
                            <QuantitySelector
                              value={item.qty}
                              onChange={(q) => updateQty(item.id, q)}
                            />
                            <span className="text-sm font-medium text-gold">
                              {formatPrice(item.price * item.qty)}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className="shrink-0 border-t border-white/5 px-4 py-4 sm:px-6 sm:py-5"
                  style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
                >
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
                  <Link
                    to="/cart"
                    onClick={closeCart}
                    className="btn-gold mb-2 w-full !whitespace-normal text-center"
                  >
                    View Cart &amp; Checkout <ArrowRight size={16} className="shrink-0" />
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
