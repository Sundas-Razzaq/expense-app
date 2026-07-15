import { useEffect, useState } from "react";

import {
    getCategoryAnalytics,
    getMonthlyAnalytics,
    getStatistics,
} from "../../api/analyticsAPI";

import StatisticsCards from "../../components/dashboard/analytics/staticsCard";
import CategoryBreakdown from "../../components/dashboard/analytics/categoryBreakdown";
import MonthlyOverview from "../../components/dashboard/analytics/monthlyOverview";
import Loader from "../../components/common/loader";

import { resolveErrorMessage } from "../../utils/helpers";
import "../../styles/dashboard.css";
import "../../styles/analytics.css";

const AnalyticsPage = () => {
    const [statistics, setStatistics] = useState(null);

    const [categories, setCategories] =
        useState([]);

    const [monthlyData, setMonthlyData] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] = useState("");

    useEffect(() => {
        const loadAnalytics = async () => {
            try {
                const [
                    statisticsResponse,
                    categoryResponse,
                    monthlyResponse,
                ] = await Promise.all([
                    getStatistics(),
                    getCategoryAnalytics(),
                    getMonthlyAnalytics(),
                ]);

                setStatistics(
                    statisticsResponse.data
                );

                setCategories(
                    categoryResponse.data
                );

                setMonthlyData(
                    monthlyResponse.data
                );
            } catch (error) {
                setError(
                    resolveErrorMessage(error)
                );
            } finally {
                setLoading(false);
            }
        };

        loadAnalytics();
    }, []);

    if (loading) {
        return (
            <section className="analytics-page">
                <Loader label="Loading analytics" />
            </section>
        );
    }

    return (
        <section className="analytics-page dashboard-stack">
            <div>
                <h1 className="dashboard-page__title">Analytics</h1>
                <p className="dashboard-page__description">
                    Monitor trends, categories, and monthly movement in one place.
                </p>
            </div>

            {error && <p className="auth-status auth-status--error">{error}</p>}

            {statistics && <StatisticsCards statistics={statistics} />}

            <CategoryBreakdown categories={categories} />

            <MonthlyOverview monthlyData={monthlyData} />
        </section>
    );
};

export default AnalyticsPage;