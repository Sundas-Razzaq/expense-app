const RecentTransactions = ({ transactions }) => {
    return (
        <section className="recent-transactions">

            <h2>Recent Transactions</h2>

            {transactions.length === 0 ? (
                <p className="analytics-empty">No recent transactions found.</p>
            ) : (
                <ul>
                    {transactions.map((transaction) => (
                        <li key={transaction._id} className="recent-transaction">
                            <div>
                                <p className="recent-transaction__title">{transaction.title}</p>

                                <p className="recent-transaction__meta">
                                    {transaction.category}
                                </p>
                            </div>

                            <div>
                                <span className={`transaction-chip transaction-chip--${transaction.type}`}>
                                    {transaction.type}
                                </span>

                                <strong>
                                    PKR {Number(transaction.amount).toLocaleString()}
                                </strong>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

        </section>
    );
};

export default RecentTransactions;