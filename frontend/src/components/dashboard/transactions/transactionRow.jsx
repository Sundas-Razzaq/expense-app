const TransactionRow = ({
    transaction,
    onEdit,
    onDelete,
}) => {
    return (
        <tr>

            <td>{transaction.title}</td>

            <td>{transaction.category}</td>

            <td>{transaction.type}</td>

            <td>{transaction.amount}</td>

            <td>
                {new Date(
                    transaction.date
                ).toLocaleDateString()}
            </td>

            <td>

                <button
                    onClick={() =>
                        onEdit(transaction)
                    }
                >
                    Edit
                </button>

                <button
                    onClick={() =>
                        onDelete(transaction._id)
                    }
                >
                    Delete
                </button>

            </td>

        </tr>
    );
};

export default TransactionRow;