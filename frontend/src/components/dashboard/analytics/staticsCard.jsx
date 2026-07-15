const StatisticsCards = ({ statistics }) => {
    const cards = [
        {
            label: "Total Transactions",
            value: statistics.totalTransactions,
            icon: "transactions",
        },
        {
            label: "Average Income",
            value: `PKR ${Number(statistics.averageIncome).toLocaleString()}`,
            icon: "income",
        },
        {
            label: "Average Expense",
            value: `PKR ${Number(statistics.averageExpense).toLocaleString()}`,
            icon: "expense",
        },
        {
            label: "Highest Income",
            value: statistics.highestIncome?.title ?? "N/A",
            icon: "income",
        },
        {
            label: "Highest Expense",
            value: statistics.highestExpense?.title ?? "N/A",
            icon: "expense",
        },
    ];

    return (
        <section className="analytics-panel">
            <h2>Statistics</h2>

            <div className="stats-grid">
                {cards.map((card) => (
                    <article key={card.label} className="stats-card">
                        <div className={`stats-card__icon stats-card__icon--${card.icon}`} aria-hidden="true" />
                        <p className="stats-card__label">{card.label}</p>
                        <p className="stats-card__value">{card.value}</p>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default StatisticsCards;