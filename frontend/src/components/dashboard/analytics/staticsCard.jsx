const StatisticsCards = ({ statistics }) => {
    return (
        <section>

            <h2>Statistics</h2>

            <p>
                Total Transactions:
                {" "}
                {statistics.totalTransactions}
            </p>

            <p>
                Average Income:
                {" "}
                PKR {statistics.averageIncome}
            </p>

            <p>
                Average Expense:
                {" "}
                PKR {statistics.averageExpense}
            </p>

            <p>
                Highest Income:
                {" "}
                {statistics.highestIncome?.title ??
                    "N/A"}
            </p>

            <p>
                Highest Expense:
                {" "}
                {statistics.highestExpense?.title ??
                    "N/A"}
            </p>

        </section>
    );
};

export default StatisticsCards;