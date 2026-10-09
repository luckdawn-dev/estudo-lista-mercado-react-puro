import { useState, useEffect, useCallback } from "react";
import { api } from "../services/api";
import type { IItem } from "../shared/models/item.model";

export function useCategoryItems(categoryId: string) {
  const [items, setItems] = useState<IItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/shopItem/${categoryId}`);
      setItems(res.data || []);
    } catch (e: any) {
      setError(e.message || "Failed to load items");
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const addItem = async (name: string, quantity?: number) => {
    try {
      const res = await api.post("/shopItem/", { name, categoryId, quantity: quantity || 1 });
      setItems((prev) => [...prev, res.data]);
    } catch (e: any) {
      setError(e.message || "Failed to add item");
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      await api.delete(`/shopItem/${itemId}`);
      setItems((prev) => prev.filter((i) => i.id !== itemId));
    } catch (e: any) {
      setError(e.message || "Failed to remove item");
    }
  };

  return { items, loading, error, fetchItems, addItem, removeItem };
}
