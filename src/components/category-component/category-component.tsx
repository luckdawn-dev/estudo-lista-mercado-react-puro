import { useEffect, useState } from "react";
import { useCategoryItems } from "../../hooks/useCategoryItems";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { ItemListComponent } from "../item-list/item-list";
import { ShopFormField } from "../shop-form-field/shop-form-field";
import type { ICategory } from "../../shared/models/category.model";
import editCategoryIcon from '../../assets/pencil-solid-full.svg';
import removeCategoryIcon from '../../assets/icon-remove.svg';
import './category-component.css';


type CategoryComponentProps = {
    category: ICategory;
    onEditCategory: (category: ICategory) => void;
    removeCategoryFromList: (categoryId: string) => void;
};

export function CategoryComponent({ category, onEditCategory, removeCategoryFromList }: CategoryComponentProps) {
    const { items: itemList, addItem, removeItem } = useCategoryItems(category.id);
    const [categoryEditField, setCategoryEditField] = useState('');
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

    const itemCount = itemList.length;
    const deletionWarning =
        itemCount === 0
            ? 'Ela não tem nenhum item.'
            : `${itemCount} ${itemCount === 1 ? 'item será' : 'itens serão'} apagado${itemCount === 1 ? '' : 's'} junto com ela.`;

    function startCategoryEdit() {
        setCategoryEditField(category.name);
        setIsEditing(true);
    }

    function cancelCategoryEdit() {
        setIsEditing(false);
    }

    function updateCategoryName(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const trimmedName = categoryEditField.trim();

        if (!trimmedName) {
            cancelCategoryEdit();
            return;
        }

        onEditCategory({ id: category.id, name: trimmedName });
        setIsEditing(false);
    }

    async function addItemToList(itemName: string, quantity?: number) {
        await addItem(itemName, quantity);
    }

    function removeItemFromList(itemRemovalId: string) {
        removeItem(itemRemovalId);
    }

    function openDeleteDialog() {
        setIsDeleteDialogOpen(true);
    }

    function closeDeleteDialog() {
        setIsDeleteDialogOpen(false);
    }

    function confirmDeleteCategory() {
        removeCategoryFromList(category.id);
        setIsDeleteDialogOpen(false);
    }

    // Enquanto o popup estiver aberto: Esc fecha e a página não rola
    useEffect(() => {
        if (!isDeleteDialogOpen) return;

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') setIsDeleteDialogOpen(false);
        }

        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isDeleteDialogOpen]);

    return (
        <div>
            <div className="category-header">
                {
                    isEditing
                        ?
                        <form className="category-edit-form" onSubmit={updateCategoryName}>
                            <input
                                autoFocus
                                value={categoryEditField}
                                onChange={(e) => setCategoryEditField(e.target.value)}
                                placeholder="Edite o nome"
                                aria-label="Editar nome da categoria"
                            />
                            <button type="submit" className="confirm-button" aria-label="Salvar nome">✓</button>
                            <button type="button" className="cancel-button" aria-label="Cancelar edição" onClick={cancelCategoryEdit}>✕</button>
                        </form>
                        : <h1>{category.name}</h1>
                }

                {
                    !isEditing && (
                        <>
                            <button className="icon-button delete-category-button" onClick={openDeleteDialog} aria-label="Deletar categoria">
                                <img src={removeCategoryIcon} alt="Deletar categoria" />
                            </button>
                            <button className="icon-button edit-category-button" onClick={startCategoryEdit} aria-label="Editar categoria">
                                <img width='20px' height='20px' src={editCategoryIcon} alt="Editar categoria" />
                            </button>
                        </>
                    )
                }
            </div>

            <ShopFormField onAddItem={addItemToList}></ShopFormField>

            <ItemListComponent itemList={itemList} onRemoveItem={removeItemFromList}></ItemListComponent>

            <DeleteConfirmDialog
                open={isDeleteDialogOpen}
                warningText={deletionWarning}
                onConfirm={confirmDeleteCategory}
                onCancel={closeDeleteDialog}
            />
        </div>
    )
}
