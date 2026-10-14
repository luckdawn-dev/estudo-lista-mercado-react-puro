import { useState } from "react";
import iconAddCategory from '../../assets/icon-add-category.svg'
import { CategoryComponent } from "../category-component/category-component";
import type { ICategory } from "../../shared/models/category.model";
import { useCategories } from "../../hooks/useCategories";
import { LoadingScreen } from "../loading-screen/loading-screen";
import { ErrorPage } from "../error-page/error-page";

export function CategoryList() {
    const [categoryField, setCategoryField] = useState('');
    const { categories: categoryList, isLoading, error, create, update, remove } = useCategories();

    async function addCategoryToList(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const trimmed = categoryField.trim();
        if (!trimmed) return;

        try {
            await create.mutateAsync(trimmed);
            setCategoryField('');
        } catch (err: any) {
            console.error('Erro ao adicionar categoria:', err);
        }
    }

    async function removeCategoryFromList(updatedCategoryId: string) {
        console.log('Removendo categoria ID:', updatedCategoryId);
        try {
            await remove.mutateAsync(updatedCategoryId);
            console.log('Categoria removida com sucesso');
        } catch (err: any) {
            console.error('Erro ao remover categoria:', err?.response?.data || err?.message || err);
            throw err;
        }
    }

    async function editCategoryName(updatedCategory: ICategory) {
        try {
            await update.mutateAsync(updatedCategory);
        } catch (err: any) {
            console.error('Erro ao editar categoria:', err);
        }
    }

    return (
        <div>
            <h1>Categorias</h1>
            {isLoading ? <LoadingScreen /> : (
                <>
                    {error ? <ErrorPage /> : (
                        <>
                            <form onSubmit={addCategoryToList}>
                                <input autoComplete="off" autoCorrect="off" name='categoryName' onChange={(e) => setCategoryField(e.target.value)} value={categoryField} type="text" placeholder="Nome da categoria aqui" />
                                <button type="submit"><img src={iconAddCategory} alt="Adicionar Categoria" /></button>
                            </form>
                            {categoryList?.map((category: ICategory) => (
                                <CategoryComponent key={category.id} category={category} removeCategoryFromList={removeCategoryFromList} onEditCategory={editCategoryName}></CategoryComponent>
                            ))}
                        </>
                    )}
                </>
            )}
        </div>
    )

}
