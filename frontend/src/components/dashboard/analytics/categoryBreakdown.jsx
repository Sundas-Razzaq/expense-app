const CategoryBreakdown = ({
    categories,
}) => {
    return (
        <section className="analytics-panel">
            <h2>Category Breakdown</h2>

            {categories.length === 0 ? (
                <p className="analytics-empty">No expense data found.</p>
            ) : (
                <ul className="category-list">
                    {categories.map((category) => (
                        <li key={category._id} className="category-list__item">
                            <div>
                                <strong>{category._id}</strong>
                                <p className="recent-transaction__meta">
                                    {category.transactionCount} transactions
                                </p>
                            </div>

                            <strong>PKR {Number(category.totalAmount).toLocaleString()}</strong>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};

export default CategoryBreakdown;