import { api } from "../services/api";
import type { ICategory } from "../shared/models/category.model";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

async function getCategories() {
  const categories = await api.get("/category");
  return categories.data;
}

async function create(name: string) {
  const res = await api.post("/category", { name });
  return res.data;
}

async function update(updated: ICategory) {
  const res = await api.put(`/category/${updated.id}`, { name: updated.name, id: updated.id });
  return res.data;
};

async function remove(id: string) {
  const res = await api.delete(`/category/${id}`);
  return res.data;
};

export const useCategories = () => {
  // o MESMO client do <QueryClientProvider> no main.tsx
  const queryClient = useQueryClient();

  const { data: categories, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const { mutateAsync: createCategory } = useMutation({
    mutationFn: create,
    onSuccess: (returned: ICategory) => queryClient.setQueryData<ICategory[]>(['categories'], (prev = []) => [...prev, returned])
  })

  const { mutateAsync: updateCategory } = useMutation({
    mutationFn: update,
    onSuccess: (returned: ICategory) => queryClient.setQueryData<ICategory[]>(['categories'], (prev = []) =>
      prev.map((cat) => (cat.id === returned.id ? returned : cat)))
  })

  const { mutateAsync: deleteCategory } = useMutation({
    mutationFn: remove,
    onSuccess: (_, id) => queryClient.setQueryData<ICategory[]>(['categories'], (prev = []) => prev.filter((cat) => cat.id !== id))
  })

  return { categories, isLoading, error, create: createCategory, update: updateCategory, remove: deleteCategory };
};
