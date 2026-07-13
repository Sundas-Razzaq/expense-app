import TransactionRow from "./TransactionRow";

const TransactionTable = ({
    transactions,
    onEdit,
    onDelete,
}) => {
    if (transactions.length === 0) {
        return (
            <p>
                No transactions found.
            </p>
        );
    }

    return (
        <table>

            <thead>

                <tr>

                    <th>Title</th>

                    <th>Category</th>

                    <th>Type</th>

                    <th>Amount</th>

                    <th>Date</th>

                    <th>Actions</th>

                </tr>

            </thead>

            <tbody>

                {transactions.map(
                    (transaction) => (
                        <TransactionRow
                            key={transaction._id}
                            transaction={
                                transaction
                            }
                            onEdit={onEdit}
                            onDelete={
                                onDelete
                            }
                        />
                    )
                )}

            </tbody>

        </table>
    );
};

export default TransactionTable;