import SummaryCard from "./SummaryCard";

const SummaryCards = ({ summary }) => {
    return (
        <section className="summary-cards">

            <SummaryCard
                title="Balance"
                amount={summary.balance}
            />

            <SummaryCard
                title="Income"
                amount={summary.totalIncome}
            />

            <SummaryCard
                title="Expense"
                amount={summary.totalExpense}
            />

        </section>
    );
};

export default SummaryCards;