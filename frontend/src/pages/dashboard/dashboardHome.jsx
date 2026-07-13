import { useEffect, useState } from "react";

import { getTransactionSummary } from "../../api/transactionAPI";

import SummaryCards from "../../components/dashboard/summary/SummaryCards";
import RecentTransactions from "../../components/dashboard/transactions/RecentTransactions";

import { resolveErrorMessage } from "../../utils/helpers";

const DashboardHome = () => {
    const [summary, setSummary] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await getTransactionSummary();

                setSummary(response.data);
            } catch (error) {
                setError(resolveErrorMessage(error));
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    if (loading) {
        return <p>Loading dashboard...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!summary) {
        return <p>No dashboard data found.</p>;
    }

    return (
        <section className="dashboard-home">

            <SummaryCards summary={summary} />

            <RecentTransactions
                transactions={summary.recentTransactions}
            />

        </section>
    );
};

export default DashboardHome;