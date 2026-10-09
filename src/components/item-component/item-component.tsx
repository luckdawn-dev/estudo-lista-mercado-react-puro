import type { IItem } from "../../shared/models/item.model";
import removeItem from '../../assets/icon-remove.svg';
import './item-component.css'

type ItemComponentProps = {
    item: IItem;
    onRemoveItem: (itemId: string) => void;
};

export function ItemComponent({ item, onRemoveItem }: ItemComponentProps) {
    return (
        <li>
            <div className="item-container">
                <p>{item.name}</p>
                <button onClick={() => onRemoveItem(item.id)}><img src={removeItem} alt="Remover item" /></button>
            </div>
        </li>
    )
}