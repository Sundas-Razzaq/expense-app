import { useEffect, useState } from "react";

import { getTransactionSummary } from "../../api/analyticsAPI";

import SummaryCards from "../../components/dashboard/summary/summaryCards";
import RecentTransactions from "../../components/dashboard/transactions/recentTransaction";
import Loader from "../../components/common/loader";
import EmptyState from "../../components/common/emptyState";

import { resolveErrorMessage } from "../../utils/helpers";
import "../../styles/dashboard.css";

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
        return (
            <section className="dashboard-page">
                <Loader label="Loading dashboard" />
            </section>
        );
    }

    return (
        <section className="dashboard-page dashboard-stack">
            <div>
                <p className="dashboard-page__description">
                    Review your income, spending, and recent activity at a glance.
                </p>
            </div>

            {error && <p className="auth-status auth-status--error">{error}</p>}

            {summary ? (
                <>
                    <SummaryCards summary={summary} />
                    <RecentTransactions transactions={summary.recentTransactions} />
                </>
            ) : (
                <EmptyState
                    title="No dashboard data"
                    description="Try again after transactions have been created."
                />
            )}
        </section>
    );
};

export default DashboardHome;