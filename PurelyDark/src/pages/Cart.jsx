import { Link } from "react-router-dom";
import {
  Trash2,
  ShoppingBag,
  ArrowRight,
  Tag,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PageHero from "../components/layout/PageHero";
import QuantitySelector from "../components/common/QuantitySelector";
import Reveal from "../components/common/Reveal";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { formatPrice } from "../utils/format";

const FREE_SHIP_THRESHOLD = 2000;
const EASE = [0.22, 1, 0.36, 1];

export default function Cart() {
  const { items, removeFromCart, updateQty, subtotal, shipping, total, clearCart, count } =
    useCart();
  const { toast } = useToast();
  const [promo, setPromo] = useState("");

  const remaining = Math.max(FREE_SHIP_THRESHOLD - subtotal, 0);
  const progress = Math.min((subtotal / FREE_SHIP_THRESHOLD) * 100, 100);
  const freeUnlocked = remaining === 0;

  return (
    <>
      <PageHero
        eyebrow="Checkout"
        title="Shopping Cart"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Cart" }]}
        seed={2}
        compact
      />
      <section className="section">
        <div className="container-luxe">
          {items.length === 0 ? (
            /* ---------------- Empty state ---------------- */
            <Reveal className="mx-auto flex max-w-lg flex-col items-center gap-6 rounded-3xl border border-white/10 bg-cocoa/20 px-6 py-20 text-center">
              <span className="grid h-24 w-24 place-items-center rounded-full border border-gold/20 bg-espresso/50">
                <ShoppingBag size={40} className="text-gold/60" />
              </span>
              <div>
                <p className="font-serif text-2xl text-cream">Your cart is empty</p>
                <p className="mt-2 text-cream/50">
                  Nothing here yet — let's find something extraordinary.
                </p>
              </div>
              <Link to="/shop" className="btn-gold">
                Continue Shopping <ArrowRight size={16} />
              </Link>
            </Reveal>
          ) : (
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_390px]">
              {/* ---------------- Items ---------------- */}
              <div className="min-w-0">
                {/* Free-shipping progress */}
                <Reveal className="mb-7 rounded-2xl border border-gold/15 bg-cocoa/25 p-5">
                  <div className="flex items-center gap-2.5 text-sm">
                    <Truck size={17} className={freeUnlocked ? "text-gold" : "text-cream/60"} />
                    {freeUnlocked ? (
                      <span className="text-cream">
                        <span className="text-gold">Free shipping unlocked</span> — enjoy it on
                        this order.
                      </span>
                    ) : (
                      <span className="text-cream/70">
                        Add <span className="font-medium text-gold">{formatPrice(remaining)}</span>{" "}
                        more to unlock <span className="text-cream">free shipping</span>.
                      </span>
                    )}
                  </div>
                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-espresso/70">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.9, ease: EASE }}
                      className="h-full rounded-full bg-gold-gradient"
                    />
                  </div>
                </Reveal>

                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm text-cream/60">
                    {count} {count === 1 ? "item" : "items"} in your cart
                  </p>
                  <button onClick={clearCart} className="btn-ghost text-xs">
                    <Trash2 size={14} /> Clear cart
                  </button>
                </div>

                <ul className="flex flex-col gap-3">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0, transition: { duration: 0.3 } }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="group flex gap-4 rounded-2xl border border-white/10 bg-espresso/30 p-3 transition-colors duration-500 hover:border-gold/30 sm:gap-5 sm:p-4"
                      >
                        <Link
                          to={`/product/${item.slug}`}
                          className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl sm:h-32 sm:w-28"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
                          />
                        </Link>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex justify-between gap-3">
                            <div className="min-w-0">
                              <Link
                                to={`/product/${item.slug}`}
                                className="block break-words font-serif text-base text-cream transition-colors hover:text-gold sm:text-lg"
                              >
                                {item.name}
                              </Link>
                              <p className="mt-0.5 text-xs text-cream/40">
                                {item.categoryName} · {item.weight}
                              </p>
                              <p className="mt-1 text-sm text-gold/80">{formatPrice(item.price)}</p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              aria-label="Remove"
                              className="h-fit shrink-0 text-cream/40 transition-colors hover:text-caramel"
                            >
                              <Trash2 size={17} />
                            </button>
                          </div>
                          <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-2 pt-4">
                            <QuantitySelector
                              value={item.qty}
                              onChange={(q) => updateQty(item.id, q)}
                            />
                            <span className="font-serif text-base text-cream sm:text-lg">
                              {formatPrice(item.price * item.qty)}
                            </span>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                <Link to="/shop" className="btn-ghost mt-6 px-0 text-sm">
                  ← Continue shopping
                </Link>
              </div>

              {/* ---------------- Summary ---------------- */}
              <Reveal variant="right" delay={0.1} as={motion.aside} className="h-fit min-w-0 lg:sticky lg:top-28">
                <div className="card p-5 sm:p-7">
                  <h2 className="font-serif text-xl text-cream">Order Summary</h2>
                  <div className="mt-6 space-y-3 text-sm">
                    <Row label={`Subtotal (${count})`} value={formatPrice(subtotal)} />
                    <Row
                      label="Shipping"
                      value={
                        shipping === 0 ? (
                          <span className="text-gold">Free</span>
                        ) : (
                          formatPrice(shipping)
                        )
                      }
                    />
                  </div>

                  {/* Promo */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      toast(promo ? "Promo code applied at checkout" : "Enter a code", "info");
                    }}
                    className="mt-5 flex gap-2"
                  >
                    <div className="relative min-w-0 flex-1">
                      <Tag
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/40"
                      />
                      <input
                        value={promo}
                        onChange={(e) => setPromo(e.target.value)}
                        placeholder="Promo code"
                        className="input-luxe py-2.5 pl-9 text-sm"
                      />
                    </div>
                    <button type="submit" className="btn-dark !px-5 !py-2.5 text-xs">
                      Apply
                    </button>
                  </form>

                  <div className="mt-5 flex items-baseline justify-between border-t border-white/5 pt-5">
                    <span className="font-serif text-lg text-cream">Total</span>
                    <span className="font-serif text-2xl text-gold">{formatPrice(total)}</span>
                  </div>

                  <button
                    onClick={() => toast("This is a demo — checkout is not connected.", "info")}
                    className="btn-gold mt-6 w-full !whitespace-normal text-center"
                  >
                    Proceed to Checkout <ArrowRight size={16} className="shrink-0" />
                  </button>

                  {/* Trust badges */}
                  <ul className="mt-6 space-y-2.5 border-t border-white/5 pt-5">
                    {[
                      [ShieldCheck, "Secure encrypted payment"],
                      [RotateCcw, "30-day satisfaction guarantee"],
                      [Check, "Carefully packed, temperature-safe"],
                    ].map(([Icon, label]) => (
                      <li key={label} className="flex items-center gap-2.5 text-xs text-cream/55">
                        <Icon size={15} className="shrink-0 text-gold/70" />
                        {label}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between text-cream/70">
      <span>{label}</span>
      <span className="text-cream">{value}</span>
    </div>
  );
}
