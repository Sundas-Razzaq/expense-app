const SummaryCards = ({ summary }) => {
    return (
        <section>

            <h2>Summary</h2>

            <div>

                <p>
                    Total Income
                </p>

                <strong>
                    PKR {summary.totalIncome}
                </strong>

            </div>

            <div>

                <p>
                    Total Expense
                </p>

                <strong>
                    PKR {summary.totalExpense}
                </strong>

            </div>

            <div>

                <p>Balance</p>

                <strong>
                    PKR {summary.balance}
                </strong>

            </div>

        </section>
    );
};

export default SummaryCards;