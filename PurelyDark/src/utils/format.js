export const slugify = (str = "") =>
  str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const formatPrice = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value || 0);

export const classNames = (...parts) => parts.filter(Boolean).join(" ");

export const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

export const range = (n) => Array.from({ length: n }, (_, i) => i);
