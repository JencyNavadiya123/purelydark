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
      <section className="section">
        <div className="container-luxe">
          {items.length === 0 ? (
            <Empty />
          ) : (
            <>
              <div className="mb-8 flex items-center justify-between">
                <p className="text-sm text-cream/60">
                  <span className="text-cream">{items.length}</span> saved items
                </p>
                <button onClick={clearWishlist} className="btn-ghost text-xs">
                  <Trash2 size={14} /> Clear all
                </button>
              </div>
              <StaggerGroup className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
                {items.map((item) => {
                  const full = allProducts.find((p) => p.id === item.id) || item;
                  return (
                    <StaggerItem key={item.id}>
                      <div className="card group overflow-hidden">
                        <Link to={`/product/${item.slug}`} className="block aspect-square overflow-hidden">
                          <img src={item.image} alt={item.name} loading="lazy" className="zoom-media h-full w-full object-cover" />
                        </Link>
                        <div className="p-5">
                          <Link to={`/product/${item.slug}`}>
                            <h3 className="clamp-2 font-serif text-base text-cream hover:text-gold">{item.name}</h3>
                          </Link>
                          <div className="mt-2">
                            <RatingStars rating={item.rating || 4.5} size={13} />
                          </div>
                          <p className="mt-2 text-gold">{formatPrice(item.price)}</p>
                          <div className="mt-4 flex gap-2">
                            <button
                              onClick={() => {
                                addToCart(full);
                                removeFromWishlist(item.id);
                              }}
                              className="btn-gold flex-1 !py-2.5 !text-xs"
                            >
                              <ShoppingBag size={14} /> Move to Cart
                            </button>
                            <button
                              onClick={() => removeFromWishlist(item.id)}
                              aria-label="Remove"
                              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 text-cream/60 hover:border-caramel hover:text-caramel"
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
