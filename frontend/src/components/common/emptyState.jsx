import "../../styles/components.css";

const EmptyState = ({ title, description }) => {
	return (
		<div className="empty-state">
			<div className="empty-state__icon" aria-hidden="true">•</div>
			<h3 className="empty-state__title">{title}</h3>
			<p className="empty-state__description">{description}</p>
		</div>
	);
};

export default EmptyState;