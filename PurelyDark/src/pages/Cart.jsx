import { Link } from "react-router-dom";
import { Trash2, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { useState } from "react";
import PageHero from "../components/layout/PageHero";
import QuantitySelector from "../components/common/QuantitySelector";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { formatPrice } from "../utils/format";

export default function Cart() {
  const { items, removeFromCart, updateQty, subtotal, shipping, total, clearCart } = useCart();
  const { toast } = useToast();
  const [promo, setPromo] = useState("");

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
            <div className="flex flex-col items-center gap-5 rounded-3xl border border-dashed border-white/10 py-24 text-center">
              <ShoppingBag size={48} className="text-gold/40" />
              <div>
                <p className="font-serif text-2xl text-cream">Your cart is empty</p>
                <p className="mt-2 text-cream/50">Let's find something extraordinary.</p>
              </div>
              <Link to="/shop" className="btn-gold">Continue Shopping</Link>
            </div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
              {/* Items */}
              <div>
                <div className="mb-5 flex items-center justify-between">
                  <p className="text-sm text-cream/60">{items.length} items</p>
                  <button onClick={clearCart} className="btn-ghost text-xs">
                    <Trash2 size={14} /> Clear cart
                  </button>
                </div>
                <ul className="divide-y divide-white/5">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-5 py-5">
                      <Link to={`/product/${item.slug}`} className="h-28 w-24 shrink-0 overflow-hidden rounded-xl">
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      </Link>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-3">
                          <div>
                            <Link to={`/product/${item.slug}`} className="font-serif text-lg text-cream hover:text-gold">
                              {item.name}
                            </Link>
                            <p className="text-xs text-cream/40">{item.categoryName} · {item.weight}</p>
                          </div>
                          <span className="text-gold">{formatPrice(item.price)}</span>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-4">
                          <QuantitySelector value={item.qty} onChange={(q) => updateQty(item.id, q)} />
                          <div className="flex items-center gap-4">
                            <span className="font-medium text-cream">{formatPrice(item.price * item.qty)}</span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              aria-label="Remove"
                              className="text-cream/40 hover:text-caramel"
                            >
                              <Trash2 size={17} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link to="/shop" className="btn-ghost mt-6 px-0 text-sm">
                  ← Continue shopping
                </Link>
              </div>

              {/* Summary */}
              <aside className="h-fit lg:sticky lg:top-28">
                <div className="card p-7">
                  <h2 className="font-serif text-xl text-cream">Order Summary</h2>
                  <div className="mt-6 space-y-3 text-sm">
                    <Row label="Subtotal" value={formatPrice(subtotal)} />
                    <Row label="Shipping" value={shipping === 0 ? "Free" : formatPrice(shipping)} />
                    {shipping > 0 && (
                      <p className="text-xs text-cream/40">
                        Add {formatPrice(2000 - subtotal)} more for free shipping.
                      </p>
                    )}
                  </div>

                  {/* Promo */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      toast(promo ? "Promo code applied at checkout" : "Enter a code", "info");
                    }}
                    className="mt-5 flex gap-2"
                  >
                    <div className="relative flex-1">
                      <Tag size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/40" />
                      <input
                        value={promo}
                        onChange={(e) => setPromo(e.target.value)}
                        placeholder="Promo code"
                        className="input-luxe py-2.5 pl-9 text-sm"
                      />
                    </div>
                    <button type="submit" className="btn-dark !px-5 !py-2.5 text-xs">Apply</button>
                  </form>

                  <div className="mt-5 flex justify-between border-t border-white/5 pt-5 text-lg">
                    <span className="font-serif text-cream">Total</span>
                    <span className="font-medium text-gold">{formatPrice(total)}</span>
                  </div>
                  <button
                    onClick={() => toast("This is a demo — checkout is not connected.", "info")}
                    className="btn-gold mt-6 w-full"
                  >
                    Proceed to Checkout <ArrowRight size={16} />
                  </button>
                  <p className="mt-4 text-center text-xs text-cream/40">
                    Secure encrypted payment · 30-day guarantee
                  </p>
                </div>
              </aside>
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
