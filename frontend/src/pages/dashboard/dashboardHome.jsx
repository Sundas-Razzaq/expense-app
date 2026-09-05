import { useEffect, useState } from "react";

import {
    getCategoryAnalytics,
    getMonthlyAnalytics,
    getTransactionSummary,
} from "../../api/analyticsAPI";

import SummaryCards from "../../components/dashboard/summary/summaryCards";
import RecentTransactions from "../../components/dashboard/transactions/recentTransaction";
import Loader from "../../components/common/loader";
import EmptyState from "../../components/common/emptyState";

import { resolveErrorMessage } from "../../utils/helpers";
import "../../styles/dashboard.css";

const formatAmount = (amount) =>
    `PKR ${Number(amount ?? 0).toLocaleString()}`;

const formatMonth = ({ year, month }) =>
    new Date(year, month - 1, 1).toLocaleDateString(
        "en-US",
        { month: "short" }
    );

const MonthlyCashflowChart = ({ monthlyData }) => {
    const months = monthlyData.slice(-6);

    if (!months.length) {
        return (
            <div className="dashboard-chart__empty">
                Add income or expenses to see your monthly cash flow.
            </div>
        );
    }

    const chartHeight = 190;
    const chartWidth = 720;
    const baseline = 210;
    const maxAmount = Math.max(
        ...months.flatMap(({ income, expense }) => [income, expense]),
        1
    );
    const groupWidth = chartWidth / months.length;
    const barWidth = Math.min(24, groupWidth / 3);

    return (
        <div className="dashboard-chart__scroll">
            <svg
                className="dashboard-chart"
                viewBox={`0 0 ${chartWidth} 250`}
                role="img"
                aria-label="Monthly income and expense chart"
            >
                <line
                    className="dashboard-chart__axis"
                    x1="0"
                    y1={baseline}
                    x2={chartWidth}
                    y2={baseline}
                />

                {months.map((month, index) => {
                    const center = groupWidth * index + groupWidth / 2;
                    const incomeHeight =
                        (Number(month.income) / maxAmount) * chartHeight;
                    const expenseHeight =
                        (Number(month.expense) / maxAmount) * chartHeight;

                    return (
                        <g key={`${month.year}-${month.month}`}>
                            <rect
                                className="dashboard-chart__bar dashboard-chart__bar--income"
                                x={center - barWidth - 3}
                                y={baseline - incomeHeight}
                                width={barWidth}
                                height={incomeHeight}
                                rx="5"
                            >
                                <title>
                                    {`${formatMonth(month)} income: ${formatAmount(month.income)}`}
                                </title>
                            </rect>

                            <rect
                                className="dashboard-chart__bar dashboard-chart__bar--expense"
                                x={center + 3}
                                y={baseline - expenseHeight}
                                width={barWidth}
                                height={expenseHeight}
                                rx="5"
                            >
                                <title>
                                    {`${formatMonth(month)} expenses: ${formatAmount(month.expense)}`}
                                </title>
                            </rect>

                            <text
                                className="dashboard-chart__label"
                                x={center}
                                y="238"
                                textAnchor="middle"
                            >
                                {formatMonth(month)}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
};

const CategorySpendingChart = ({ categories }) => {
    const visibleCategories = categories.slice(0, 5);
    const maxAmount = Math.max(
        ...visibleCategories.map(({ totalAmount }) => totalAmount),
        1
    );

    if (!visibleCategories.length) {
        return (
            <div className="dashboard-chart__empty">
                Add an expense to see where your money is going.
            </div>
        );
    }

    return (
        <div className="category-chart">
            {visibleCategories.map((category) => {
                const percentage =
                    (Number(category.totalAmount) / maxAmount) * 100;

                return (
                    <div
                        className="category-chart__row"
                        key={category._id}
                    >
                        <div className="category-chart__heading">
                            <span>{category._id}</span>
                            <strong>{formatAmount(category.totalAmount)}</strong>
                        </div>
                        <div className="category-chart__track">
                            <span
                                className="category-chart__bar"
                                style={{ width: `${percentage}%` }}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const DashboardHome = () => {
    const [summary, setSummary] = useState(null);
    const [categories, setCategories] = useState([]);
    const [monthlyData, setMonthlyData] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {
        let ignore = false;

        const loadDashboard = async () => {
            try {
                const [summaryResponse, categoryResponse, monthlyResponse] =
                    await Promise.all([
                        getTransactionSummary(),
                        getCategoryAnalytics(),
                        getMonthlyAnalytics(),
                    ]);

                if (!ignore) {
                    setSummary(summaryResponse.data);
                    setCategories(categoryResponse.data);
                    setMonthlyData(monthlyResponse.data);
                }
            } catch (error) {
                if (!ignore) {
                    setError(resolveErrorMessage(error));
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        };

        loadDashboard();

        return () => {
            ignore = true;
        };
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

                    <section className="dashboard-visuals">
                        <article className="dashboard-chart-card dashboard-chart-card--wide">
                            <div className="dashboard-chart-card__header">
                                <div>
                                    <h2>Cash flow</h2>
                                    <p>Income versus expenses over the last six months</p>
                                </div>
                                <div className="dashboard-chart-card__legend">
                                    <span><i className="legend-dot legend-dot--income" />Income</span>
                                    <span><i className="legend-dot legend-dot--expense" />Expenses</span>
                                </div>
                            </div>
                            <MonthlyCashflowChart monthlyData={monthlyData} />
                        </article>

                        <article className="dashboard-chart-card">
                            <div className="dashboard-chart-card__header">
                                <div>
                                    <h2>Spending by category</h2>
                                    <p>Your biggest expense areas</p>
                                </div>
                            </div>
                            <CategorySpendingChart categories={categories} />
                        </article>
                    </section>

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