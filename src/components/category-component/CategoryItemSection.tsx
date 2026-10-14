import { useCategoryItems } from "../../hooks/useCategoryItems";
import { ShopFormField } from "../shop-form-field/shop-form-field";
import { ItemListComponent } from "../item-list/item-list";

type Props = {
  categoryId: string;
};

export function CategoryItemSection({ categoryId }: Props) {
  const { items: itemList, addItem, removeItem } = useCategoryItems(categoryId);

  async function handleAddItem(itemName: string, quantity?: number) {
    await addItem(itemName, quantity);
  }

  return (
    <>
      <ShopFormField onAddItem={handleAddItem} />
      <ItemListComponent itemList={itemList} onRemoveItem={removeItem} />
    </>
  );
}
