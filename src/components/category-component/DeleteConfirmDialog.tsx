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
    <div className="confirm-overlay" onClick={onCancel} role="dialog" aria-modal="true">
      <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-dialog-icon">⚠</div>
        <h2>Tem certeza?</h2>
        <p>{warningText}</p>
        <div className="confirm-dialog-actions">
          <button type="button" className="cancel-button" onClick={onCancel}>Cancelar</button>
          <button type="button" className="delete-confirm-button" onClick={onConfirm}>Confirmar</button>
        </div>
      </div>
    </div>,
    document.body
  );
}
