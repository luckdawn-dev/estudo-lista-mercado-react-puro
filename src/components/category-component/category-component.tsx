import { useState } from "react";
import { useCategoryItems } from "../../hooks/useCategoryItems";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { CategoryEditForm } from "./CategoryEditForm";
import { CategoryHeader } from "./CategoryHeader";
import { CategoryItemSection } from "./CategoryItemSection";
import type { ICategory } from "../../shared/models/category.model";
import './category-component.css';

type CategoryComponentProps = {
  category: ICategory;
  onEditCategory: (category: ICategory) => void;
  removeCategoryFromList: (categoryId: string) => void;
};

export function CategoryComponent({ category, onEditCategory, removeCategoryFromList }: CategoryComponentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { items } = useCategoryItems(category.id);

  const itemCount = items.length;
  const deletionWarning =
    itemCount === 0
      ? "Ela não tem nenhum item."
      : `${itemCount} ${itemCount === 1 ? "item será" : "itens serão"} apagado${itemCount === 1 ? "" : "s"} junto com ela.`;

  async function handleEditName(name: string) {
    try {
      await onEditCategory({ ...category, name });
      setIsEditing(false);
    } catch (e) {
      console.error("Erro ao editar:", e);
    }
  }

  async function handleConfirmDelete() {
    try {
      await removeCategoryFromList(category.id);
      setIsDeleteOpen(false);
    } catch (e) {
      console.error("Erro ao deletar:", e);
    }
  }

  return (
    <div>
      {!isEditing ? (
        <CategoryHeader
          category={category}
          isEditing={false}
          onEdit={() => setIsEditing(true)}
          onDelete={() => setIsDeleteOpen(true)}
        />
      ) : (
        <CategoryEditForm
          name={category.name}
          onSave={handleEditName}
          onCancel={() => setIsEditing(false)}
        />
      )}

      <CategoryItemSection categoryId={category.id} />

      <DeleteConfirmDialog
        open={isDeleteOpen}
        warningText={deletionWarning}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteOpen(false)}
      />
    </div>
  );
}
