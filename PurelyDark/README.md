# PurelyDark — Premium Dark Chocolate E-Commerce

A luxurious, cinematic, fully-responsive dark-chocolate e-commerce website built with React, Tailwind CSS, React Router, Framer Motion and React Three Fiber.

## Tech Stack
- **React 18** + **Vite**
- **Tailwind CSS** (custom chocolate/gold design system)
- **React Router DOM** (lazy-loaded routes, 404, deep-link safe)
- **Framer Motion** (reveals, page transitions, staggered grids)
- **React Three Fiber / Three.js** (3D floating chocolate hero — lazy-loaded)
- **Lucide React** (icons)
- **Context API** (Cart, Wishlist, Toasts) with **LocalStorage** persistence

## Getting Started
```bash
npm install
npm run dev      # start dev server
npm run build    # production build
npm run preview  # preview the build
```

## Project Structure
```
src/
  assets/            images · videos · textures (drop your own here)
  components/
    common/          Reveal, SectionHeading, SearchBar, FilterSidebar, Modal,
                     Toasts, RatingStars, QuantitySelector, AddToCart, Wishlist,
                     Accordion, BackToTop, ScrollProgressBar, CustomCursor…
    layout/          Header, AnnouncementBar, MobileDrawer, Footer, Layout, PageHero
    home/            Hero, FeaturedCollections, ShopByCategory, BestSellers,
                     ProcessSection, IngredientsSection, StoryPreview,
                     SignatureCollection, InstagramGallery
    product/         ProductCard, ProductGrid, ProductSlider, ProductGallery,
                     ProductBrowser (filter+sort+load-more), QuickViewModal
    category/        CategoryCard
    cart/            CartDrawer
    video/           BaseVideo, HeroVideo, BackgroundVideo, ChocolateVideoSection,
                     ProductVideo, StoryVideo, VideoGallery
    three/           ChocolateScene (R3F)
  context/           CartContext, WishlistContext, ToastContext
  data/              categories (15) · products (225) · collections · testimonials · faq · nav
  hooks/             useLocalStorage, useScrollProgress, useMediaQuery, useRecentlyViewed
  pages/             Home, Shop, Categories, CategoryDetails, ProductDetails,
                     Collections, CollectionDetails, OurStory, BestSellers,
                     Wishlist, Cart, Search, Contact, FAQ, PrivacyPolicy,
                     TermsAndConditions, NotFound
  routes/            AppRoutes (lazy + transitions)
  styles/            index.css · common.css · animations.css · video.css
  utils/             assets.js (MEDIA CONFIG) · format.js
```

## Catalog
- **15 categories × 15 products = 225 unique chocolates.**
- Each product = a single-origin bean (Madagascar, Ecuador, Peru…) expressed
  through its category's flavour. Prices, ratings, badges and stock are derived
  deterministically so they stay stable across refreshes.

## ⚙️ Swapping in your own media (IMPORTANT)
All imagery and video flow through **`src/utils/assets.js`** — one file.
- **Images**: use real dark-chocolate Unsplash photography out of the box.
- **Videos**: the `VIDEOS` object points at public sample MP4s as placeholders so
  playback works immediately. **Replace each `src` with your own cinematic
  chocolate footage** (local file in `src/assets/videos` or a CDN URL). Every
  `<video>` on the site reads from here, so one edit updates the whole site.

Videos are lazy-loaded (IntersectionObserver), muted + autoplay where
appropriate, pause when off-screen, show poster fallbacks, and respect
`prefers-reduced-motion`.

## Features
- Sticky header, transparent-over-hero → solid on scroll, animated mega menus
- Search (live suggestions + results page), filters (price, cocoa %, availability,
  best-sellers), sorting, Load More pagination
- Cart drawer + full cart page, Wishlist, both persisted to LocalStorage
- Product detail: gallery with hover-zoom, tabs, reviews, related + recently viewed,
  showcase video, Buy Now
- Fully responsive, accessible (focus states, reduced-motion, semantic HTML)
```
