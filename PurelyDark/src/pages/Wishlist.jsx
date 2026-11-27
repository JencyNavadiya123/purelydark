import { Link } from "react-router-dom";
import { Heart, Trash2, ShoppingBag } from "lucide-react";
import PageHero from "../components/layout/PageHero";
import RatingStars from "../components/common/RatingStars";
import { StaggerGroup, StaggerItem } from "../components/common/Reveal";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { allProducts } from "../data/products";
import { formatPrice } from "../utils/format";

export default function Wishlist() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <>
      <PageHero
        eyebrow="Saved for Later"
        title="Your Wishlist"
        subtitle="Your hand-picked favourites, ready whenever you are."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Wishlist" }]}
        seed={13}
        compact
      />
      <section
        className="section relative overflow-hidden"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, #2a1812 0%, #1a100b 50%, #120c09 100%)",
        }}
      >
        {/* Ambient warmth so the page never reads as empty */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
        <div className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-gold/10 blur-[140px]" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-caramel/10 blur-[140px]" />

        <div className="container-luxe relative z-[2]">
          {items.length === 0 ? (
            <Empty />
          ) : (
            <>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3 sm:mb-8">
                <p className="text-sm text-cream/60">
                  <span className="text-cream">{items.length}</span> saved items
                </p>
                <button onClick={clearWishlist} className="btn-ghost text-xs">
                  <Trash2 size={14} /> Clear all
                </button>
              </div>
              <StaggerGroup className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
                {items.map((item) => {
                  const full = allProducts.find((p) => p.id === item.id) || item;
                  return (
                    <StaggerItem key={item.id} className="min-w-0">
                      <div className="card group flex h-full flex-col overflow-hidden">
                        <Link
                          to={`/product/${item.slug}`}
                          className="block aspect-square overflow-hidden bg-white"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            loading="lazy"
                            className="zoom-media h-full w-full object-contain"
                          />
                        </Link>
                        <div className="flex flex-1 flex-col p-4 sm:p-5">
                          <Link to={`/product/${item.slug}`}>
                            <h3 className="clamp-2 font-serif text-sm text-cream hover:text-gold sm:text-base">
                              {item.name}
                            </h3>
                          </Link>
                          <div className="mt-2">
                            <RatingStars rating={item.rating || 4.5} size={13} />
                          </div>
                          <p className="mt-2 text-gold">{formatPrice(item.price)}</p>
                          <div className="mt-4 flex items-center gap-2">
                            <button
                              onClick={() => {
                                addToCart(full);
                                removeFromWishlist(item.id);
                              }}
                              className="btn-gold min-w-0 flex-1 !whitespace-normal !px-3 !py-2.5 text-center !text-xs"
                            >
                              <ShoppingBag size={14} className="shrink-0" /> Move to Cart
                            </button>
                            <button
                              onClick={() => removeFromWishlist(item.id)}
                              aria-label="Remove"
                              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 text-cream/60 transition-colors hover:border-caramel hover:text-caramel sm:h-10 sm:w-10"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </StaggerItem>
                  );
                })}
              </StaggerGroup>
            </>
          )}
        </div>
      </section>
    </>
  );
}

function Empty() {
  return (
    <div className="flex flex-col items-center gap-5 rounded-3xl border border-dashed border-white/10 py-24 text-center">
      <Heart size={48} className="text-gold/40" />
      <div>
        <p className="font-serif text-2xl text-cream">Your wishlist is empty</p>
        <p className="mt-2 text-cream/50">Start saving the chocolates you love.</p>
      </div>
      <Link to="/shop" className="btn-gold">Browse Chocolate</Link>
    </div>
  );
}
