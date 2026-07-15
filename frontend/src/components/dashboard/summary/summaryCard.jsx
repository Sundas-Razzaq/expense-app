const SummaryCard = ({ title, amount, icon, tone, description }) => {
    return (
        <article className={`summary-card summary-card--${tone ?? "neutral"}`}>
            <div className="summary-card__top">
                <div className={`summary-card__icon summary-card__icon--${icon}`} aria-hidden="true" />
                <span className="transaction-chip">{title}</span>
            </div>

            <p className="summary-card__amount">
                PKR {Number(amount).toLocaleString()}
            </p>

            {description ? <p className="summary-card__description">{description}</p> : null}
        </article>
    );
};

export default SummaryCard;