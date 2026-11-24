/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        chocolate: "#24130F", // Deep Chocolate Brown (primary)
        cocoa: "#382018", // Dark Cocoa (secondary)
        espresso: "#100B09", // Espresso Black (background)
        gold: "#C69A52", // Rich Gold (accent)
        cream: "#F4E5CE",
        caramel: "#A96C36",
        "gold-soft": "#D9B779",
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "serif"],
        serif: ['"Playfair Display"', "serif"],
        sans: ['"Jost"', "system-ui", "sans-serif"],
      },
      letterSpacing: {
        luxe: "0.28em",
      },
      boxShadow: {
        gold: "0 10px 40px -12px rgba(198,154,82,0.45)",
        soft: "0 24px 60px -24px rgba(0,0,0,0.75)",
        card: "0 20px 45px -20px rgba(0,0,0,0.65)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg,#C69A52 0%,#F4E5CE 45%,#A96C36 100%)",
        "choco-gradient": "linear-gradient(160deg,#24130F 0%,#100B09 100%)",
        "radial-glow": "radial-gradient(circle at 50% 0%,rgba(198,154,82,0.18),transparent 60%)",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 1.6s infinite",
        "fade-in": "fade-in 0.7s ease forwards",
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.22,1,0.36,1)",
      },
    },
  },
  plugins: [],
};
