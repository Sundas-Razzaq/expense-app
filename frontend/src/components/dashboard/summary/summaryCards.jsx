import SummaryCard from "./summaryCard";

const SummaryCards = ({ summary }) => {
    const cards = [
        {
            title: "Income",
            amount: summary.totalIncome,
            icon: "income",
            tone: "income",
            description: "All credited transactions",
        },
        {
            title: "Expense",
            amount: summary.totalExpense,
            icon: "expense",
            tone: "expense",
            description: "All debited transactions",
        },
        {
            title: "Balance",
            amount: summary.balance,
            icon: "balance",
            tone: "balance",
            description: "Net position after activity",
        },
    ];

    return (
        <section className="dashboard-section">

            <h2>Summary</h2>

            <div className="summary-grid">
                {cards.map((card) => (
                    <SummaryCard key={card.title} {...card} />
                ))}
            </div>

        </section>
    );
};

export default SummaryCards;