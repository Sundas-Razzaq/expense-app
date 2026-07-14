const CategoryBreakdown = ({
    categories,
}) => {
    return (
        <section>

            <h2>
                Category Breakdown
            </h2>

            {categories.length === 0 ? (
                <p>
                    No expense data found.
                </p>
            ) : (
                <ul>

                    {categories.map(
                        (category) => (
                            <li
                                key={category._id}
                            >
                                <strong>
                                    {
                                        category._id
                                    }
                                </strong>

                                {" - PKR "}

                                {
                                    category.totalAmount
                                }

                                {" ("}

                                {
                                    category.transactionCount
                                }

                                {" Transactions)"}
                            </li>
                        )
                    )}

                </ul>
            )}

        </section>
    );
};

export default CategoryBreakdown;