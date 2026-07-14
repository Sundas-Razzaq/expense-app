import api from "./axiosInstance";

export const getTransactionSummary = async () => {
    const { data } = await api.get("/transactions/summary");
    return data;
};

export const getCategoryAnalytics = async () => {
    const { data } = await api.get(
        "/transactions/analytics/category"
    );

    return data;
};

export const getMonthlyAnalytics = async () => {
    const { data } = await api.get(
        "/transactions/analytics/monthly"
    );

    return data;
};

export const getStatistics = async () => {
    const { data } = await api.get(
        "/transactions/analytics/statistics"
    );

    return data;
};