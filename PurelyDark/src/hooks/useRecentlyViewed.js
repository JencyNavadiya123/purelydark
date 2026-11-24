import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

/* Tracks recently viewed product ids (most recent first, max 8). */
export default function useRecentlyViewed(currentId) {
  const [ids, setIds] = useLocalStorage("pd_recent", []);

  useEffect(() => {
    if (currentId == null) return;
    setIds((prev) => [currentId, ...prev.filter((i) => i !== currentId)].slice(0, 8));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentId]);

  // return the list EXCLUDING the current product
  return ids.filter((i) => i !== currentId);
}
