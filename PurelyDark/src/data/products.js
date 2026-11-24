import { categories } from "./categories";
import { slugify } from "../utils/format";
import darkinsProducts from "./darkins";

/* ============================================================
   225 PRODUCTS — 15 per category — built from REAL product data
   sourced from darkins.in (names, prices, images). Each category
   shows 15 unique products: the ones matching its flavour/cocoa
   first, then filled out with the rest of the catalogue.
   Ratings/badges are derived deterministically (stable on refresh).
   ============================================================ */

// Which Darkins products best fit each category
function matcherFor(slug) {
  switch (slug) {
    case "classic-dark-chocolate": return (p) => p.cocoa >= 55 && p.cocoa <= 70;
    case "extra-dark-chocolate": return (p) => p.cocoa >= 70 && p.cocoa < 85;
    case "70-cocoa-chocolate": return (p) => p.cocoa === 70;
    case "85-cocoa-chocolate": return (p) => p.cocoa >= 80 && p.cocoa < 90;
    case "90-cocoa-chocolate": return (p) => p.cocoa >= 90;
    case "99-cocoa-chocolate": return (p) => p.cocoa >= 95;
    case "almond-dark-chocolate": return (p) => /almond/.test(p.text);
    case "hazelnut-dark-chocolate": return (p) => /hazelnut|elixir/.test(p.text);
    case "sea-salt-dark-chocolate": return (p) => /salt|paprika|chilli/.test(p.text);
    case "orange-dark-chocolate": return (p) => /orange|oranj|citrus/.test(p.text);
    case "mint-dark-chocolate": return (p) => /mint|peppermint|paan/.test(p.text);
    case "coffee-dark-chocolate": return (p) => /coffee|espresso/.test(p.text);
    case "caramel-dark-chocolate": return (p) => /caramel|elixir|peanut|hazelnut/.test(p.text);
    case "vegan-dark-chocolate": return (p) => /sugarfree|noir|vegan/.test(p.text);
    case "organic-dark-chocolate": return (p) => /single origin|cacao|organic/.test(p.text);
    default: return () => false;
  }
}

// 15 unique products for a category: matches first, then the rest
function poolFor(slug) {
  const match = matcherFor(slug);
  const matched = darkinsProducts.filter(match);
  const rest = darkinsProducts.filter((p) => !matched.includes(p));
  return [...matched, ...rest].slice(0, 15);
}

const ingredientsFor = (dp) => {
  const extra = [];
  if (/almond/.test(dp.text)) extra.push("roasted almonds");
  if (/hazelnut/.test(dp.text)) extra.push("hazelnuts");
  if (/orange|oranj|citrus/.test(dp.text)) extra.push("orange");
  if (/coffee/.test(dp.text)) extra.push("coffee");
  if (/mint|peppermint/.test(dp.text)) extra.push("peppermint");
  if (/salt/.test(dp.text)) extra.push("sea salt");
  if (/blueberr|cranberr|berr/.test(dp.text)) extra.push("berries");
  const sugar = /sugarfree/.test(dp.text) ? "natural sweetener" : "cane sugar";
  return ["Cocoa mass", "cocoa butter", ...extra, sugar];
};

const products = [];
let pid = 0;

categories.forEach((cat) => {
  const pool = poolFor(cat.slug);
  pool.forEach((dp, j) => {
    pid += 1;
    const seed = cat.index * 15 + j;

    const name = dp.name;
    const slug = `${slugify(name)}-${pid}`;

    const price = dp.price;
    const onSale = seed % 6 === 0;
    const originalPrice = onSale ? Math.round((price * 1.25) / 10) * 10 : null;

    const rating = +(4.1 + ((seed * 13) % 10) / 10).toFixed(1);
    const reviews = 24 + ((seed * 29) % 480);
    const weight = price > 1000 ? "1 Kg" : "50 g";
    const inStock = seed % 11 !== 0;
    const bestSeller = (seed * 3) % 7 === 0;
    const isNew = (seed + 2) % 9 === 0;
    const limited = (seed + 5) % 13 === 0;

    const parts = name.split(/[-–—]/);
    const origin = parts.length > 1 ? parts[parts.length - 1].trim() : "Single Origin";

    const gallery = dp.images && dp.images.length ? dp.images : [dp.images[0]];

    const description =
      `${name} — a ${dp.cocoa}% expression crafted bean-to-bar. ` +
      `${cat.description} Slow-conched for a clean, resonant finish.`;

    products.push({
      id: pid,
      slug,
      name,
      categorySlug: cat.slug,
      categoryName: cat.name,
      origin,
      originRegion: origin,
      cocoa: dp.cocoa,
      price,
      originalPrice,
      onSale,
      rating,
      reviews,
      weight,
      inStock,
      bestSeller,
      isNew,
      limited,
      flavorProfile: `${dp.cocoa}% Cocoa · Artisanal`,
      tastingNote: "rich cocoa & roasted depth",
      ingredients: ingredientsFor(dp),
      description,
      image: gallery[0],
      gallery,
      badges: [
        bestSeller && "Best Seller",
        isNew && "New",
        limited && "Limited",
        onSale && "Sale",
      ].filter(Boolean),
    });
  });
});

export const allProducts = products;

export const getProductBySlug = (slug) => products.find((p) => p.slug === slug);

export const getProductsByCategory = (categorySlug) =>
  products.filter((p) => p.categorySlug === categorySlug);

export const getBestSellers = (limit = 12) =>
  products.filter((p) => p.bestSeller).slice(0, limit);

export const getNewArrivals = (limit = 12) =>
  products.filter((p) => p.isNew).slice(0, limit);

export const getFeatured = (limit = 8) =>
  products.filter((p) => p.rating >= 4.7).slice(0, limit);

export const getRelated = (product, limit = 4) =>
  products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, limit);

export const searchProducts = (query = "") => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q) ||
      p.origin.toLowerCase().includes(q) ||
      String(p.cocoa).includes(q) ||
      p.flavorProfile.toLowerCase().includes(q)
  );
};

export default products;
