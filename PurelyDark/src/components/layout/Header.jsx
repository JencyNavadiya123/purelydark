import { useState, useEffect } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, Menu, ChevronDown } from "lucide-react";
import Logo from "./Logo";
import Modal from "../common/Modal";
import SearchBar from "../common/SearchBar";
import { NAV_LINKS } from "../../data/nav";
import { categories } from "../../data/categories";
import collections from "../../data/collections";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { classNames } from "../../utils/format";

export default function Header({ onOpenMenu }) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mega, setMega] = useState(null);
  const { count, openCart } = useCart();
  const { count: wishCount } = useWishlist();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const submitSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    setQuery("");
  };

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMega(null), [pathname]);

  const megaItems = mega === "categories" ? categories : mega === "collections" ? collections : [];

  return (
    <>
      <header
        className={classNames(
          "fixed inset-x-0 top-9 z-[80] w-full transition-all duration-500",
          transparent
            ? "bg-transparent"
            : "bg-espresso/90 shadow-soft backdrop-blur-xl"
        )}
        onMouseLeave={() => setMega(null)}
      >
        {/* Full-width bar; content spans edge-to-edge with page padding */}
        <div className="flex h-[68px] w-full items-center justify-between gap-3 px-4 sm:h-[72px] sm:px-6 lg:px-8 xl:gap-4 xl:px-12">
          {/* Logo — always far left */}
          <Logo className="shrink-0" />

          {/* Desktop nav — centered, only at xl where it fits */}
          <nav className="hidden min-w-0 items-center xl:flex 2xl:gap-1">
            {NAV_LINKS.map((link) => (
              <div
                key={link.to}
                onMouseEnter={() => setMega(link.hasMega || null)}
                className="relative"
              >
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    classNames(
                      "flex items-center gap-1 whitespace-nowrap px-2.5 py-2 text-[0.78rem] font-medium uppercase tracking-wide transition-colors 2xl:px-3.5 2xl:text-sm 2xl:tracking-wider",
                      isActive ? "text-gold" : "text-cream/80 hover:text-gold"
                    )
                  }
                >
                  {link.label}
                  {link.hasMega && <ChevronDown size={13} className="shrink-0" />}
                </NavLink>
              </div>
            ))}
          </nav>

          {/* Right actions — never shrink, touch-friendly spacing */}
          <div className="flex shrink-0 items-center gap-0.5 sm:gap-1.5">
            {/* Inline search pill (tablet + desktop) */}
            <form
              onSubmit={submitSearch}
              className="mr-1 hidden items-center gap-2 rounded-full border border-gold/30 bg-espresso/40 px-4 py-2 backdrop-blur transition-colors focus-within:border-gold/70 lg:flex"
            >
              <Search size={16} className="shrink-0 text-gold" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                aria-label="Search products"
                className="w-28 bg-transparent text-sm text-cream placeholder:text-cream/45 focus:outline-none xl:w-36 2xl:w-44"
              />
            </form>

            {/* Search icon → modal (mobile only) */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="grid h-10 w-10 place-items-center text-cream/80 transition-colors hover:text-gold lg:hidden"
            >
              <Search size={20} />
            </button>

            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative grid h-10 w-10 place-items-center text-cream/80 transition-colors hover:text-gold"
            >
              <Heart size={20} />
              {wishCount > 0 && <Count n={wishCount} />}
            </Link>

            <button
              onClick={openCart}
              aria-label="Open cart"
              className="relative grid h-10 w-10 place-items-center text-cream/80 transition-colors hover:text-gold"
            >
              <ShoppingBag size={20} />
              {count > 0 && <Count n={count} />}
            </button>

            {/* Hamburger — right side, hidden once full desktop nav shows */}
            <button
              onClick={onOpenMenu}
              className="grid h-10 w-10 place-items-center text-cream transition-colors hover:text-gold xl:hidden"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mega menu */}
        <AnimatePresence>
          {mega && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              onMouseEnter={() => setMega(mega)}
              className="absolute inset-x-0 top-full hidden w-full bg-espresso/95 shadow-soft backdrop-blur-xl xl:block"
            >
              <div className="grid w-full grid-cols-4 gap-x-6 gap-y-2 px-8 py-7 xl:grid-cols-6 xl:px-12 2xl:grid-cols-7">
                {megaItems.map((item) => (
                  <Link
                    key={item.slug}
                    to={mega === "categories" ? `/category/${item.slug}` : `/collections/${item.slug}`}
                    className="group flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-white/5"
                  >
                    <img
                      src={item.image}
                      alt=""
                      loading="lazy"
                      className="h-11 w-11 rounded-lg object-cover"
                    />
                    <span className="text-sm text-cream/80 transition-colors group-hover:text-gold">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <Modal open={searchOpen} onClose={() => setSearchOpen(false)} size="lg" label="Search">
        <div className="p-6 sm:p-8">
          <h2 className="mb-5 font-serif text-2xl text-cream">Search PurelyDark</h2>
          <SearchBar onClose={() => setSearchOpen(false)} />
        </div>
      </Modal>
    </>
  );
}

function Count({ n }) {
  return (
    <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-gold px-1 text-[0.65rem] font-bold text-espresso">
      {n}
    </span>
  );
}
