import { useState, useEffect } from "react";
import { api } from "../services/api";
import type { ICategory } from "../shared/models/category.model";

export const useCategories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    api
      .get("/category")
      .then((res) => {
        if (!cancelled) setCategories(res.data || []);
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message || "Erro ao carregar categorias");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const create = async (name: string) => {
    const res = await api.post("/category", { name });
    const created = res.data;
    setCategories((prev) => [...prev, created]);
    return created;
  };

  const update = async (updated: ICategory) => {
    const res = await api.put(`/category/${updated.id}`, { name: updated.name, id: updated.id });
    const returned = res.data;
    setCategories((prev) =>
      prev.map((cat) => (cat.id === updated.id ? (returned || updated) : cat))
    );
    return returned || updated;
  };

  const remove = async (id: string) => {
    const res = await api.delete(`/category/${id}`);
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
    return res.data;
  };

  return { categories, isLoading, error, create, update, remove };
};
