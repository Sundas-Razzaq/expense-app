const TransactionFilters = () => {
    return (
        <section>

            <h3>Filters</h3>

            <input
                type="text"
                placeholder="Search..."
            />

            <select>

                <option>
                    All Types
                </option>

                <option value="income">
                    Income
                </option>

                <option value="expense">
                    Expense
                </option>

            </select>

        </section>
    );
};

export default TransactionFilters;