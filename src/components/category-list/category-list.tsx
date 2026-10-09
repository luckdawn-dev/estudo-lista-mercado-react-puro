import { useEffect, useState } from "react";
import iconAddCategory from '../../assets/icon-add-category.svg'
import { CategoryComponent } from "../category-component/category-component";
import type { ICategory } from "../../shared/models/category.model";
import axios from "axios";


export function CategoryList() {

    const [categoryField, setCategoryField] = useState('');
    const [categoryList, setCategoryList] = useState<ICategory[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/category/').then(res => {
            setCategoryList(res.data);
        })
    }, [])

    function addCategoryToList(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!categoryField.trim()) return;

        axios.post<ICategory>('http://localhost:3000/category/', { name: categoryField })
            .then(addedCategory => {
                setCategoryList((list) => [...list, addedCategory.data])
            });

        setCategoryField('');
    }

    function removeCategoryFromList(updatedCategoryId: string) {
        axios.delete(`http://localhost:3000/category/${updatedCategoryId}`)

        setCategoryList(prev =>
            prev.filter(category => category.id !== updatedCategoryId)
        );
    }

    function editCategoryName(updatedCategory: ICategory) {
        axios.put(`http://localhost:3000/category/${updatedCategory.id}`, { name: updatedCategory.name })

        setCategoryList(prev =>
            prev.map(category => (category.id === updatedCategory.id ? updatedCategory : category))
        );
    }

    return (
        <div>
            <h1>Categorias</h1>

            <form onSubmit={addCategoryToList}>
                <input autoComplete="off" autoCorrect="off" name='categoryName' onChange={(e) => setCategoryField(e.target.value)} value={categoryField} type="text" placeholder="Nome da categoria aqui" />
                <button type="submit"><img src={iconAddCategory} alt="Adicionar Categoria" /></button>
            </form>

            {categoryList.map(category => (
                <CategoryComponent key={category.id} category={category} removeCategoryFromList={removeCategoryFromList} onEditCategory={editCategoryName}></CategoryComponent>
            ))}
        </div>
    )

}
