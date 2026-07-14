import { useEffect, useState } from "react";

import {
    getCategoryAnalytics,
    getMonthlyAnalytics,
    getStatistics,
} from "../../api/analyticsAPI";

import StatisticsCards from "../../components/dashboard/analytics/staticsCard";
import CategoryBreakdown from "../../components/dashboard/analytics/categoryBreakdown";
import MonthlyOverview from "../../components/dashboard/analytics/monthlyOverview";

import { resolveErrorMessage } from "../../utils/helpers";
import "../../styles/dashboard.css";

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
        return <p>Loading analytics...</p>;
    }

    return (
        <section>

            <h1>Analytics</h1>

            {error && <p>{error}</p>}

            {statistics && (
                <StatisticsCards
                    statistics={statistics}
                />
            )}

            <CategoryBreakdown
                categories={categories}
            />

            <MonthlyOverview
                monthlyData={monthlyData}
            />

        </section>
    );
};

export default AnalyticsPage;