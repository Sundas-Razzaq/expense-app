const SummaryCard = ({ title, amount }) => {
    return (
        <article className="summary-card">
            <h3>{title}</h3>

            <p>
                PKR {Number(amount).toLocaleString()}
            </p>
        </article>
    );
};

export default SummaryCard;