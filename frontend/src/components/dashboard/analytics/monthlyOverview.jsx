const MonthlyOverview = ({
    monthlyData,
}) => {
    return (
        <section>

            <h2>
                Monthly Overview
            </h2>

            {monthlyData.length === 0 ? (
                <p>
                    No monthly data.
                </p>
            ) : (
                <table>

                    <thead>

                        <tr>

                            <th>
                                Year
                            </th>

                            <th>
                                Month
                            </th>

                            <th>
                                Income
                            </th>

                            <th>
                                Expense
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {monthlyData.map(
                            (month) => (
                                <tr
                                    key={`${month.year}-${month.month}`}
                                >
                                    <td>
                                        {
                                            month.year
                                        }
                                    </td>

                                    <td>
                                        {
                                            month.month
                                        }
                                    </td>

                                    <td>
                                        PKR{" "}
                                        {
                                            month.income
                                        }
                                    </td>

                                    <td>
                                        PKR{" "}
                                        {
                                            month.expense
                                        }
                                    </td>
                                </tr>
                            )
                        )}

                    </tbody>

                </table>
            )}

        </section>
    );
};

export default MonthlyOverview;