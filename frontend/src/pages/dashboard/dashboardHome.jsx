import { useEffect, useState } from "react";

import { getTransactionSummary } from "../../api/analyticsAPI";

import SummaryCards from "../../components/dashboard/summary/summaryCards";
import RecentTransactions from "../../components/dashboard/transactions/recentTransaction";

import { resolveErrorMessage } from "../../utils/helpers";

const DashboardHome = () => {
    const [summary, setSummary] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const response =
                    await getTransactionSummary();

                setSummary(response.data);
            } catch (error) {
                setError(resolveErrorMessage(error));
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, []);

    if (loading) {
        return <p>Loading dashboard...</p>;
    }

    return (
        <section>

            <h1>Dashboard</h1>

            {error && <p>{error}</p>}

            {summary && (
                <>
                    <SummaryCards
                        summary={summary}
                    />

                    <RecentTransactions
                        transactions={
                            summary.recentTransactions
                        }
                    />
                </>
            )}

        </section>
    );
};

export default DashboardHome;