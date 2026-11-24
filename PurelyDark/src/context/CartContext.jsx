import { createContext, useContext, useMemo, useCallback, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useToast } from "./ToastContext";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useLocalStorage("pd_cart", []);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addToCart = useCallback(
    (product, qty = 1) => {
      setItems((prev) => {
        const found = prev.find((i) => i.id === product.id);
        if (found) {
          return prev.map((i) =>
            i.id === product.id ? { ...i, qty: i.qty + qty } : i
          );
        }
        return [
          ...prev,
          {
            id: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            image: product.image,
            weight: product.weight,
            categoryName: product.categoryName,
            qty,
          },
        ];
      });
      toast(`${product.name} added to cart`);
      setIsOpen(true);
    },
    [setItems, toast]
  );

  const removeFromCart = useCallback(
    (id) => setItems((prev) => prev.filter((i) => i.id !== id)),
    [setItems]
  );

  const updateQty = useCallback(
    (id, qty) =>
      setItems((prev) =>
        prev
          .map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i))
          .filter((i) => i.qty > 0)
      ),
    [setItems]
  );

  const clearCart = useCallback(() => setItems([]), [setItems]);

  const { count, subtotal } = useMemo(() => {
    return items.reduce(
      (acc, i) => {
        acc.count += i.qty;
        acc.subtotal += i.qty * i.price;
        return acc;
      },
      { count: 0, subtotal: 0 }
    );
  }, [items]);

  const shipping = subtotal > 2000 || subtotal === 0 ? 0 : 99;
  const total = subtotal + shipping;

  const value = {
    items,
    isOpen,
    openCart,
    closeCart,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    count,
    subtotal,
    shipping,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
