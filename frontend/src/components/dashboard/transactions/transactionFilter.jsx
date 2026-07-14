const TransactionFilters = ({
    search,
    setSearch,
    typeFilter,
    setTypeFilter,
}) => {
    return (
        <section>

            <h3>Filters</h3>

            <input
                type="text"
                placeholder="Search transactions..."
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />

            <select
                value={typeFilter}
                onChange={(e) =>
                    setTypeFilter(e.target.value)
                }
            >
                <option value="all">
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