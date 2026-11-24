import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ShoppingBag } from "lucide-react";
import { img } from "../utils/assets";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20 text-center">
      <img src={img(10, 1920, 1080)} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-espresso/80" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="container-luxe relative z-[2]"
      >
        <div className="animate-sheen font-serif text-[7rem] font-black leading-none sm:text-[11rem]">
          404
        </div>
        <h1 className="heading-md mt-2">This page melted away</h1>
        <p className="lede mx-auto mt-4 max-w-md">
          The page you're looking for doesn't exist — but there's plenty of chocolate to discover.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/" className="btn-gold"><Home size={16} /> Back Home</Link>
          <Link to="/shop" className="btn-outline"><ShoppingBag size={16} /> Shop Chocolate</Link>
        </div>
      </motion.div>
    </section>
  );
}
