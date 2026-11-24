import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronDown, Heart, ShoppingBag } from "lucide-react";
import Logo from "./Logo";
import { NAV_LINKS } from "../../data/nav";
import { categories } from "../../data/categories";
import collections from "../../data/collections";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

export default function MobileDrawer({ open, onClose }) {
  const [expanded, setExpanded] = useState(null);
  const { count, openCart } = useCart();
  const { count: wishCount } = useWishlist();

  const subItems = (key) =>
    key === "categories" ? categories : key === "collections" ? collections : [];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[95] bg-espresso/70 backdrop-blur-sm xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed inset-y-0 left-0 z-[96] flex w-[86%] max-w-sm flex-col bg-chocolate xl:hidden"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
              <Logo />
              <button onClick={onClose} aria-label="Close menu" className="text-cream/70">
                <X size={22} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-5 py-6">
              {NAV_LINKS.map((link) =>
                link.hasMega ? (
                  <div key={link.to} className="border-b border-white/5">
                    <button
                      onClick={() =>
                        setExpanded((e) => (e === link.hasMega ? null : link.hasMega))
                      }
                      className="flex w-full items-center justify-between py-3.5 text-left font-serif text-lg text-cream"
                    >
                      {link.label}
                      <ChevronDown
                        size={18}
                        className={expanded === link.hasMega ? "rotate-180 transition" : "transition"}
                      />
                    </button>
                    <AnimatePresence>
                      {expanded === link.hasMega && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          {subItems(link.hasMega).map((it) => (
                            <li key={it.slug}>
                              <Link
                                to={
                                  link.hasMega === "categories"
                                    ? `/category/${it.slug}`
                                    : `/collections/${it.slug}`
                                }
                                onClick={onClose}
                                className="block py-2.5 pl-4 text-sm text-cream/60 hover:text-gold"
                              >
                                {it.name}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `block border-b border-white/5 py-3.5 font-serif text-lg ${
                        isActive ? "text-gold" : "text-cream"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                )
              )}
            </nav>

            <div className="flex gap-3 border-t border-white/5 p-5">
              <Link to="/wishlist" onClick={onClose} className="btn-outline flex-1 !py-3 text-xs">
                <Heart size={16} /> Wishlist {wishCount > 0 && `(${wishCount})`}
              </Link>
              <button
                onClick={() => {
                  onClose();
                  openCart();
                }}
                className="btn-gold flex-1 !py-3 text-xs"
              >
                <ShoppingBag size={16} /> Cart {count > 0 && `(${count})`}
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
