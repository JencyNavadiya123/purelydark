import { slugify } from "../utils/format";
import { img } from "../utils/assets";

/* 15 chocolate categories. Each gets 15 unique products in products.js */
const base = [
  {
    name: "Classic Dark Chocolate",
    cocoa: 60,
    tagline: "Timeless. Smooth. Deeply roasted.",
    description:
      "The foundation of our maison — balanced, velvety dark chocolate crafted from single-estate cocoa for an endlessly refined everyday indulgence.",
  },
  {
    name: "Extra Dark Chocolate",
    cocoa: 75,
    tagline: "Bolder cocoa, deeper soul.",
    description:
      "An intensified roast with low sweetness and a lingering cocoa finish, for those who crave chocolate at its most expressive.",
  },
  {
    name: "70% Cocoa Chocolate",
    cocoa: 70,
    tagline: "The connoisseur's standard.",
    description:
      "A perfectly poised 70% — fruit-forward acidity, rounded tannins and a clean snap that defines fine dark chocolate.",
  },
  {
    name: "85% Cocoa Chocolate",
    cocoa: 85,
    tagline: "Intense. Pure. Uncompromising.",
    description:
      "Minimal sugar, maximum character. Earthy, robust and complex — a true tasting-bar for the devoted palate.",
  },
  {
    name: "90% Cocoa Chocolate",
    cocoa: 90,
    tagline: "Near-pure cocoa intensity.",
    description:
      "Powerful and profound with woody, roasted depth. Reserved for collectors of the darkest expressions.",
  },
  {
    name: "99% Cocoa Chocolate",
    cocoa: 99,
    tagline: "The summit of dark.",
    description:
      "Virtually pure cocoa mass — bracing, smoky and meditative. The ultimate rite of passage for dark chocolate purists.",
  },
  {
    name: "Almond Dark Chocolate",
    cocoa: 72,
    tagline: "Roasted almonds meet rich cocoa.",
    description:
      "Whole and slivered Marcona almonds folded through dark couverture for a toasted crunch in every square.",
  },
  {
    name: "Hazelnut Dark Chocolate",
    cocoa: 70,
    tagline: "Piedmont hazelnuts, pure indulgence.",
    description:
      "Buttery roasted hazelnuts and silky gianduja layered into our dark base — nutty, aromatic, irresistible.",
  },
  {
    name: "Sea Salt Dark Chocolate",
    cocoa: 72,
    tagline: "A whisper of the ocean.",
    description:
      "Hand-harvested fleur de sel crystals suspended in dark chocolate — a sweet-savoury contrast that electrifies the palate.",
  },
  {
    name: "Orange Dark Chocolate",
    cocoa: 70,
    tagline: "Sun-ripened citrus brightness.",
    description:
      "Candied Sicilian orange and bright zest oils married to deep cocoa for a luminous, fragrant finish.",
  },
  {
    name: "Mint Dark Chocolate",
    cocoa: 72,
    tagline: "Cool, crisp, refined.",
    description:
      "Garden-fresh peppermint infused into dark chocolate for a clean, invigorating lift after any meal.",
  },
  {
    name: "Coffee Dark Chocolate",
    cocoa: 75,
    tagline: "Two dark arts, one bar.",
    description:
      "Single-origin espresso and roasted cocoa in perfect harmony — intense, aromatic and quietly addictive.",
  },
  {
    name: "Caramel Dark Chocolate",
    cocoa: 66,
    tagline: "Molten gold within.",
    description:
      "Slow-cooked salted caramel enrobed in dark chocolate for a luxurious, buttery melt.",
  },
  {
    name: "Vegan Dark Chocolate",
    cocoa: 74,
    tagline: "Plant-based, plant-perfect.",
    description:
      "Dairy-free, refined-sugar-conscious dark chocolate made with oat cream silkiness — kind to all, compromising nothing.",
  },
  {
    name: "Organic Dark Chocolate",
    cocoa: 72,
    tagline: "Pure earth, pure cocoa.",
    description:
      "Certified-organic beans grown without synthetic inputs, traceable from farm to bar for the conscious connoisseur.",
  },
];

export const categories = base.map((c, i) => ({
  id: i + 1,
  slug: slugify(c.name),
  index: i,
  image: img(i, 1400, 1000),
  banner: img(i + 3, 1920, 900),
  ...c,
}));

export const getCategoryBySlug = (slug) =>
  categories.find((c) => c.slug === slug);

export default categories;
