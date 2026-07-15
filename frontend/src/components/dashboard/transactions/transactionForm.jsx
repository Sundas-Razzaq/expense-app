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
        <section className="transaction-form-card">
            <h2>{editingTransaction ? "Edit transaction" : "New transaction"}</h2>

            <form className="transaction-form" onSubmit={handleSubmit}>
                <div className="transaction-form__grid transaction-form__grid--two">
                    <div className="transaction-form__field">
                        <label className="transaction-form__label" htmlFor="title">Title</label>
                        <input
                            className="form-control"
                            id="title"
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="transaction-form__field">
                        <label className="transaction-form__label" htmlFor="amount">Amount</label>
                        <input
                            className="form-control"
                            id="amount"
                            type="number"
                            name="amount"
                            placeholder="Amount"
                            value={formData.amount}
                            onChange={handleChange}
                            min="1"
                            step="0.01"
                            required
                        />
                    </div>
                </div>

                <div className="transaction-form__grid transaction-form__grid--two">
                    <div className="transaction-form__field">
                        <label className="transaction-form__label" htmlFor="type">Type</label>
                        <select
                            className="form-control"
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                        >
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>

                    <div className="transaction-form__field">
                        <label className="transaction-form__label" htmlFor="category">Category</label>
                        <select
                            className="form-control"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="transaction-form__grid transaction-form__grid--two">
                    <div className="transaction-form__field">
                        <label className="transaction-form__label" htmlFor="date">Date</label>
                        <input
                            className="form-control"
                            id="date"
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="transaction-form__field">
                        <label className="transaction-form__label" htmlFor="description">Description</label>
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="transaction-form__footer">
                    {editingTransaction && (
                        <button className="button button--secondary" type="button" onClick={onCancel}>
                            Cancel
                        </button>
                    )}

                    <button className="button button--primary" type="submit">
                        {editingTransaction ? "Update Transaction" : "Add Transaction"}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default TransactionForm;