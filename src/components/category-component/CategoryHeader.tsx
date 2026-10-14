import editCategoryIcon from '../../assets/pencil-solid-full.svg';
import removeCategoryIcon from '../../assets/icon-remove.svg';
import type { ICategory } from '../../shared/models/category.model';

type Props = {
  category: ICategory;
  isEditing: boolean;
  onEdit: () => void;
  onDelete: () => void;
};

export function CategoryHeader({ category, isEditing, onEdit, onDelete }: Props) {
  if (isEditing) return null;
  return (
    <div className="category-header">
      <h1>{category.name}</h1>
      <div>
        <button className="icon-button delete-category-button" onClick={onDelete} aria-label="Deletar categoria">
          <img src={removeCategoryIcon} alt="Deletar categoria" />
        </button>
        <button className="icon-button edit-category-button" onClick={onEdit} aria-label="Editar categoria">
          <img width="20" height="20" src={editCategoryIcon} alt="Editar categoria" />
        </button>
      </div>
    </div>
  );
}
