import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import CategoryCard from "../category/CategoryCard";
import { categories } from "../../data/categories";

const EASE = [0.22, 1, 0.36, 1];

const headerC = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.05 } },
};
const itemV = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

export default function ShopByCategory() {
  return (
    <section className="section">
      <div className="container-luxe">
        {/* Header — reveals one element at a time */}
        <motion.div
          variants={headerC}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div className="max-w-2xl">
            <motion.span variants={itemV} className="eyebrow">
              <span className="gold-rule" /> Shop by Category
            </motion.span>
            <motion.h2 variants={itemV} className="heading-lg mt-4">
              Fifteen expressions of dark
            </motion.h2>
            <motion.p variants={itemV} className="lede mt-4">
              From our velvety 60% classic to a bracing 99% pure — plus flavoured
              bars crafted with almonds, sea salt, orange and more.
            </motion.p>
          </div>
          <motion.div variants={itemV} className="shrink-0">
            <Link to="/categories" className="btn-ghost whitespace-nowrap">
              View all categories <ArrowRight size={16} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Cards — enter one by one as they scroll into view */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-5">
          {categories.slice(0, 10).map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: (i % 5) * 0.08, ease: EASE }}
            >
              <CategoryCard category={c} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
