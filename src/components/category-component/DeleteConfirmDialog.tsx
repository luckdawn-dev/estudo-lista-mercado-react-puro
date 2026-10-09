import { createPortal } from "react-dom";

type Props = {
  open: boolean;
  warningText: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function DeleteConfirmDialog({ open, warningText, onConfirm, onCancel }: Props) {
  if (!open) return null;
  return createPortal(
    <div className="dialog-overlay" onClick={onCancel} role="dialog" aria-modal="true">
      <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
        <p>{warningText}</p>
        <button onClick={onConfirm}>Confirmar</button>
        <button onClick={onCancel}>Cancelar</button>
      </div>
    </div>,
    document.body
  );
}
