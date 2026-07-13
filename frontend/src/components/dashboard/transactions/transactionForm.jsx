import { useState } from "react";

const getInitialState = (transaction) => ({
    title: transaction?.title ?? "",
    amount: transaction?.amount ?? "",
    type: transaction?.type ?? "expense",
    category: transaction?.category ?? "",
    description: transaction?.description ?? "",
    date: transaction?.date?.split("T")[0] ?? "",
});

const TransactionForm = ({
    onSubmit,
    editingTransaction,
}) => {
    const [formData, setFormData] = useState(() =>
        getInitialState(editingTransaction)
    );

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await onSubmit(formData);

        if (!editingTransaction) {
            setFormData(getInitialState(null));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
            />

            <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={formData.amount}
                onChange={handleChange}
            />

            <select
                name="type"
                value={formData.type}
                onChange={handleChange}
            >
                <option value="income">
                    Income
                </option>

                <option value="expense">
                    Expense
                </option>
            </select>

            <input
                type="text"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
            />

            <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
            />

            <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
            />

            <button type="submit">
                {editingTransaction
                    ? "Update Transaction"
                    : "Add Transaction"}
            </button>
        </form>
    );
};

export default TransactionForm;