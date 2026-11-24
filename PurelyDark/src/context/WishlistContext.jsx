import { createContext, useContext, useCallback, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useToast } from "./ToastContext";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [items, setItems] = useLocalStorage("pd_wishlist", []);
  const { toast } = useToast();

  const ids = useMemo(() => new Set(items.map((i) => i.id)), [items]);

  const isWishlisted = useCallback((id) => ids.has(id), [ids]);

  const toggleWishlist = useCallback(
    (product) => {
      setItems((prev) => {
        if (prev.find((i) => i.id === product.id)) {
          toast(`${product.name} removed from wishlist`, "info");
          return prev.filter((i) => i.id !== product.id);
        }
        toast(`${product.name} added to wishlist`);
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
            rating: product.rating,
            cocoa: product.cocoa,
          },
        ];
      });
    },
    [setItems, toast]
  );

  const removeFromWishlist = useCallback(
    (id) => setItems((prev) => prev.filter((i) => i.id !== id)),
    [setItems]
  );

  const clearWishlist = useCallback(() => setItems([]), [setItems]);

  const value = {
    items,
    count: items.length,
    isWishlisted,
    toggleWishlist,
    removeFromWishlist,
    clearWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
};
