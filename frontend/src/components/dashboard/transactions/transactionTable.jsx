import TransactionRow from "./TransactionRow";

const TransactionTable = ({
    transactions,
    onEdit,
    onDelete,
}) => {
    if (!transactions.length) {
        return (
            <section>
                <h3>No Transactions Yet</h3>

                <p>
                    Add your first income or
                    expense to start tracking
                    your finances.
                </p>
            </section>
        );
    }

    return (
        <table>

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
    );
};

export default TransactionTable;