import "../../styles/components.css";

const Modal = ({ title, children, onClose }) => {
	return (
		<div className="modal-backdrop" role="presentation" onClick={onClose}>
			<div className="modal" role="dialog" aria-modal="true" aria-labelledby={title ? "modal-title" : undefined} onClick={(event) => event.stopPropagation()}>
				{title ? (
					<div className="modal__header">
						<h2 id="modal-title">{title}</h2>
					</div>
				) : null}

				<div className="modal__body">{children}</div>
			</div>
		</div>
	);
};

export default Modal;