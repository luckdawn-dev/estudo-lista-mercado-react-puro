import { useState } from "react";
import iconAddCategory from '../../assets/icon-add-category.svg'
import { CategoryComponent } from "../category-component/category-component";
import type { ICategory } from "../../shared/models/category.model";
import { useCategories } from "../../hooks/useCategories";
import { api } from "../../services/api";


export function CategoryList() {

    const [categoryField, setCategoryField] = useState('');
    const { categories: categoryList, isLoading, error, refetch } = useCategories();

    function addCategoryToList(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!categoryField.trim()) return;

        api.post('/category', { name: categoryField })
            .then(() => refetch());

        setCategoryField('');
    }

    function removeCategoryFromList(updatedCategoryId: string) {
        api.delete(`/category/${updatedCategoryId}`).then(() => refetch());
    }

    function editCategoryName(updatedCategory: ICategory) {
        api.put(`/category/${updatedCategory.id}`, { name: updatedCategory.name }).then(() => refetch());
    }

    return (
        <div>
            <h1>Categorias</h1>
            {isLoading && <p>Carregando...</p>}
            {error && <p style={{ color: 'red' }}>{error.message || String(error)}</p>}

            <form onSubmit={addCategoryToList}>
                <input autoComplete="off" autoCorrect="off" name='categoryName' onChange={(e) => setCategoryField(e.target.value)} value={categoryField} type="text" placeholder="Nome da categoria aqui" />
                <button type="submit"><img src={iconAddCategory} alt="Adicionar Categoria" /></button>
            </form>

            {categoryList?.map((category: ICategory) => (
                <CategoryComponent key={category.id} category={category} removeCategoryFromList={removeCategoryFromList} onEditCategory={editCategoryName}></CategoryComponent>
            ))}
        </div>
    )

}
