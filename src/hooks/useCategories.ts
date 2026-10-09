import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";

export const useCategories = () => {
  const queryClient = useQueryClient();
  const { data: categories, isLoading, error, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => (await api.get("/category")).data,
  });

  const create = useMutation({
    mutationFn: (name: string) => api.post("/category", { name }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });

  return { categories, isLoading, error, refetch, create };
};
