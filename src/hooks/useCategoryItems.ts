import { api } from "../services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { IItem } from "../shared/models/item.model";

async function getCategoryItems(categoryId: string) {
  const res = await api.get(`/shopItem/${categoryId}`);
  return res.data;
}

async function remove(id: string) {
  const res = await api.delete(`/shopItem/${id}`);
  return res.data;
};

export function useCategoryItems(categoryId: string) {
  const queryClient = useQueryClient()

  const { data: items, isLoading: loading, error } = useQuery({
    queryKey: ['categoryItems', categoryId],
    queryFn: () => getCategoryItems(categoryId),
    initialData: []
  })

  const { mutateAsync: addItem } = useMutation({
    mutationFn: (name: string) => api.post("/shopItem", { name, categoryId }).then((res) => res.data),
    onSuccess: (returned: IItem) => queryClient.setQueryData<IItem[]>(['categoryItems', categoryId], (prev = []) => [...prev, returned])
  })

  const { mutateAsync: removeItem } = useMutation({
    mutationFn: remove,
    onSuccess: (_, id) => queryClient.setQueryData<IItem[]>(['categoryItems', categoryId], (prev = []) => prev.filter((i) => i.id !== id))
  })

  return { items, loading, error, addItem, removeItem };
}
