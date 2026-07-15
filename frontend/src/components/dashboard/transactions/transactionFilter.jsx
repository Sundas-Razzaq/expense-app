const TransactionFilters = ({
    search,
    setSearch,
    typeFilter,
    setTypeFilter,
}) => {
    return (
        <section className="transaction-filters-card">
            <h3>Filters</h3>

            <div className="transaction-filters__controls">
                <input
                    className="form-control"
                    type="text"
                    placeholder="Search transactions..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

                <select
                    className="form-control"
                    value={typeFilter}
                    onChange={(e) =>
                        setTypeFilter(e.target.value)
                    }
                >
                    <option value="all">All Types</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
            </div>
        </section>
    );
};

export default TransactionFilters;