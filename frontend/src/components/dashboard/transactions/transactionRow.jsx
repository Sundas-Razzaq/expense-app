const TransactionRow = ({
    transaction,
    onEdit,
    onDelete,
}) => {
    return (
        <tr>
            <td>{new Date(transaction.date).toLocaleDateString()}</td>
            <td>{transaction.title}</td>
            <td>{transaction.category}</td>
            <td>
                <span className={`transaction-chip transaction-chip--${transaction.type}`}>
                    {transaction.type}
                </span>
            </td>
            <td className={`transaction-table__amount transaction-table__amount--${transaction.type}`}>
                PKR {Number(transaction.amount).toLocaleString()}
            </td>
            <td>
                <div className="transaction-row__actions">
                    <button
                        className="button button--compact button--secondary"
                        onClick={() =>
                            onEdit(transaction)
                        }
                    >
                        Edit
                    </button>

                    <button
                        className="button button--compact button--danger"
                        onClick={() =>
                            onDelete(transaction._id)
                        }
                    >
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default TransactionRow;