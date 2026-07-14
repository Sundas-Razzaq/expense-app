import { useState } from "react";

const getToday = () => new Date().toISOString().split("T")[0];

const getInitialState = (transaction) => ({
    title: transaction?.title ?? "",
    amount: transaction?.amount ?? "",
    type: transaction?.type ?? "expense",
    category: transaction?.category ?? "",
    description: transaction?.description ?? "",
    date: transaction?.date
        ? transaction.date.split("T")[0]
        : getToday(),
});

const categories = [
    "Salary",
    "Food",
    "Transport",
    "Shopping",
    "Bills",
    "Entertainment",
    "Health",
    "Education",
    "Other",
];

const TransactionForm = ({
    onSubmit,
    editingTransaction,
    onCancel,
}) => {
    const [formData, setFormData] = useState(
        getInitialState(editingTransaction)
    );

    const handleChange = ({ target }) => {
        setFormData((prev) => ({
            ...prev,
            [target.name]: target.value,
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
                required
            />

            <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={formData.amount}
                onChange={handleChange}
                min="1"
                step="0.01"
                required
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

            <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
            >
                <option value="">
                    Select Category
                </option>

                {categories.map((category) => (
                    <option
                        key={category}
                        value={category}
                    >
                        {category}
                    </option>
                ))}
            </select>

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

            {editingTransaction && (
                <button
                    type="button"
                    onClick={onCancel}
                >
                    Cancel
                </button>
            )}

        </form>
    );
};

export default TransactionForm;