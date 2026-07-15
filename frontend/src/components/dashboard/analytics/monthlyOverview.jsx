const MonthlyOverview = ({
    monthlyData,
}) => {
    return (
        <section className="analytics-panel">
            <h2>Monthly Overview</h2>

            {monthlyData.length === 0 ? (
                <p className="analytics-empty">No monthly data.</p>
            ) : (
                <div className="transaction-table-shell">
                    <table className="monthly-overview__table">
                        <thead>
                            <tr>
                                <th>Year</th>
                                <th>Month</th>
                                <th>Income</th>
                                <th>Expense</th>
                            </tr>
                        </thead>

                        <tbody>
                            {monthlyData.map((month) => (
                                <tr key={`${month.year}-${month.month}`}>
                                    <td>{month.year}</td>
                                    <td>{month.month}</td>
                                    <td>PKR {Number(month.income).toLocaleString()}</td>
                                    <td>PKR {Number(month.expense).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
};

export default MonthlyOverview;