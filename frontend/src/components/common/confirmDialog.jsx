import "../../styles/components.css";

const ConfirmDialog = ({ title, children, onConfirm, onCancel, confirmLabel = "Confirm", cancelLabel = "Cancel" }) => {
	return (
		<div className="confirm-dialog-backdrop" role="presentation" onClick={onCancel}>
			<div className="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby={title ? "confirm-dialog-title" : undefined} onClick={(event) => event.stopPropagation()}>
				{title ? (
					<div className="confirm-dialog__header">
						<h2 id="confirm-dialog-title">{title}</h2>
					</div>
				) : null}

				<div className="confirm-dialog__body">{children}</div>

				<div className="confirm-dialog__footer">
					<button className="button button--secondary" type="button" onClick={onCancel}>
						{cancelLabel}
					</button>
					<button className="button button--danger" type="button" onClick={onConfirm}>
						{confirmLabel}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmDialog;