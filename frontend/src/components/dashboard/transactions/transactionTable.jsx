import EmptyState from "../../common/emptyState";
import TransactionRow from "./TransactionRow";

const TransactionTable = ({
    transactions,
    onEdit,
    onDelete,
}) => {
    if (!transactions.length) {
        return (
            <section className="transaction-table-card">
                <EmptyState
                    title="No transactions yet"
                    description="Add your first income or expense to start tracking your finances."
                />
            </section>
        );
    }

    return (
        <section className="transaction-table-card">
            <h2>Transactions</h2>

            <div className="transaction-table-shell">
                <table className="transaction-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {transactions.map((transaction) => (
                            <TransactionRow
                                key={transaction._id}
                                transaction={transaction}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default TransactionTable;