import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";
import type { ICategory } from "../shared/models/category.model";

export const useCategories = () => {
  const queryClient = useQueryClient();
  const { data: categories, isLoading, error, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api.get("/category");
      return res.data;
    },
  });

  const create = useMutation({
    mutationFn: (name: string) => api.post("/category", { name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const update = useMutation({
    mutationFn: (updated: ICategory) =>
      api.put(`/category/${updated.id}`, { name: updated.name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => api.delete(`/category/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return { categories, isLoading, error, refetch, create, update, remove };
};
