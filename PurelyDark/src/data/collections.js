import { slugify } from "../utils/format";
import { img } from "../utils/assets";
import products from "./products";

/* Premium curated collections — each dynamically pulls products by a rule */
const defs = [
  {
    name: "Signature Collection",
    tagline: "The bars that define PurelyDark.",
    description:
      "Our most celebrated expressions — the house classics every connoisseur returns to.",
    rule: (p) => p.bestSeller,
  },
  {
    name: "Luxury Collection",
    tagline: "Rare origins, exceptional craft.",
    description:
      "Top-rated single-origin bars reserved for the most discerning palate.",
    rule: (p) => p.rating >= 4.8,
  },
  {
    name: "Dark Chocolate Lovers",
    tagline: "For the devoted dark palate.",
    description:
      "Intense expressions of 85% cocoa and above — pure, uncompromising depth.",
    rule: (p) => p.cocoa >= 85,
  },
  {
    name: "Premium Gift Collection",
    tagline: "Gifting, elevated.",
    description:
      "Beautifully composed assortments built to impress — the art of giving dark.",
    rule: (p) => p.limited || p.bestSeller,
  },
  {
    name: "Artisan Collection",
    tagline: "Flavour, hand-crafted.",
    description:
      "Our flavoured bars — almond, hazelnut, sea salt, orange and beyond, made in small batches.",
    rule: (p) =>
      [
        "almond-dark-chocolate",
        "hazelnut-dark-chocolate",
        "sea-salt-dark-chocolate",
        "orange-dark-chocolate",
        "mint-dark-chocolate",
        "coffee-dark-chocolate",
        "caramel-dark-chocolate",
      ].includes(p.categorySlug),
  },
  {
    name: "Limited Edition Collection",
    tagline: "Here for a moment.",
    description:
      "Seasonal and small-lot releases. Once they're gone, they're gone.",
    rule: (p) => p.limited || p.isNew,
  },
];

export const collections = defs.map((c, i) => {
  const items = products.filter(c.rule);
  return {
    id: i + 1,
    slug: slugify(c.name),
    name: c.name,
    tagline: c.tagline,
    description: c.description,
    image: img(i + 1, 1400, 1000),
    banner: img(i + 6, 1920, 900),
    count: items.length,
    productIds: items.map((p) => p.id),
  };
});

export const getCollectionBySlug = (slug) =>
  collections.find((c) => c.slug === slug);

export const getCollectionProducts = (slug) => {
  const col = getCollectionBySlug(slug);
  if (!col) return [];
  return products.filter((p) => col.productIds.includes(p.id));
};

export default collections;
