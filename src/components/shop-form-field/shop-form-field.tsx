import { useState } from "react";
import plusAddIcon from '../../assets/icon-plus-add.svg'

type ShopFormFieldProps = {
    onAddItem: (itemName: string, quantity?: number) => void;
};

export function ShopFormField({ onAddItem }: ShopFormFieldProps) {
    const [itemName, setItemName] = useState('');

    function onChangeItemName(itemNameInput: string) {
        setItemName(itemNameInput);
    }

    function onSubmitItemName(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const trimmedName = itemName.trim();

        if (!trimmedName) return;

        onAddItem(trimmedName);
        setItemName('');
    }

    return (
        <div>
            <form className="item-form" onSubmit={onSubmitItemName}>
                <input
                    className="item-input"
                    autoComplete="off"
                    autoCorrect="off"
                    name="itemNameFormField"
                    value={itemName}
                    onChange={(e) => onChangeItemName(e.target.value)}
                    placeholder='Digite o nome do item...'
                ></input>
                <button className="item-submit-button" type="submit">
                    <img src={plusAddIcon} alt="Adicionar" />
                </button>
            </form>
        </div>
    )
}
