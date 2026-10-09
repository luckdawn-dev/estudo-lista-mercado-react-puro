import type { IItem } from "../../shared/models/item.model";
import { ItemComponent } from "../item-component/item-component";



type ItemListComponentProps = {
    itemList: IItem[];
    onRemoveItem: (itemId: string) => void;
};

export function ItemListComponent({ itemList, onRemoveItem }: ItemListComponentProps) {
    return (
        <div>
            <ol>
                {
                    itemList.map(item => (
                        <ItemComponent key={item.id} item={item} onRemoveItem={onRemoveItem}></ItemComponent>
                    ))
                }
            </ol>
        </div >

    )
}