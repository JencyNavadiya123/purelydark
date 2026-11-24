import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import PageTransition from "../components/common/PageTransition";

/* Main navigation pages are imported eagerly so clicking a nav link renders
   the page INSTANTLY — no chunk fetch, no blank/black screen, no wait. */
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Categories from "../pages/Categories";
import Collections from "../pages/Collections";
import BestSellers from "../pages/BestSellers";
import OurStory from "../pages/OurStory";
import Contact from "../pages/Contact";

/* Secondary / detail pages stay lazy (code-split). They fade in when ready;
   no full-screen loader, so there is never a black transition screen. */
const CategoryDetails = lazy(() => import("../pages/CategoryDetails"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const CollectionDetails = lazy(() => import("../pages/CollectionDetails"));
const Wishlist = lazy(() => import("../pages/Wishlist"));
const Cart = lazy(() => import("../pages/Cart"));
const Search = lazy(() => import("../pages/Search"));
const FAQ = lazy(() => import("../pages/FAQ"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("../pages/TermsAndConditions"));
const NotFound = lazy(() => import("../pages/NotFound"));

// Each page fades in on mount (enter only — no exit, no waiting).
const wrap = (El) => (
  <Suspense fallback={null}>
    <PageTransition>{El}</PageTransition>
  </Suspense>
);

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={wrap(<Home />)} />
        <Route path="shop" element={wrap(<Shop />)} />
        <Route path="categories" element={wrap(<Categories />)} />
        <Route path="category/:categorySlug" element={wrap(<CategoryDetails />)} />
        <Route path="product/:productSlug" element={wrap(<ProductDetails />)} />
        <Route path="collections" element={wrap(<Collections />)} />
        <Route path="collections/:collectionSlug" element={wrap(<CollectionDetails />)} />
        <Route path="our-story" element={wrap(<OurStory />)} />
        <Route path="best-sellers" element={wrap(<BestSellers />)} />
        <Route path="wishlist" element={wrap(<Wishlist />)} />
        <Route path="cart" element={wrap(<Cart />)} />
        <Route path="search" element={wrap(<Search />)} />
        <Route path="contact" element={wrap(<Contact />)} />
        <Route path="faq" element={wrap(<FAQ />)} />
        <Route path="privacy-policy" element={wrap(<PrivacyPolicy />)} />
        <Route path="terms-and-conditions" element={wrap(<TermsAndConditions />)} />
        <Route path="*" element={wrap(<NotFound />)} />
      </Route>
    </Routes>
  );
}
