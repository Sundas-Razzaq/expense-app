const RecentTransactions = ({ transactions }) => {
    return (
        <section className="recent-transactions">

            <h2>Recent Transactions</h2>

            {transactions.length === 0 ? (
                <p>No recent transactions found.</p>
            ) : (
                <ul>
                    {transactions.map((transaction) => (
                        <li key={transaction._id}>
                            <strong>{transaction.title}</strong>

                            <span>
                                {" "}
                                - PKR {transaction.amount}
                            </span>

                            <p>{transaction.category}</p>
                        </li>
                    ))}
                </ul>
            )}

        </section>
    );
};

export default RecentTransactions;