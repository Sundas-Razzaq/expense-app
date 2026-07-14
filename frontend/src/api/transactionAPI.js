import api from "./axiosInstance";

export const getTransactionSummary = async () => {
    const { data } = await api.get("/transactions/summary");
    return data;
};

export const getTransactions = async () => {
    const { data } = await api.get("/transactions");
    return data;
};

export const createTransaction = async (transaction) => {
    const { data } = await api.post("/transactions", transaction);
    return data;
};

export const updateTransaction = async (id, transaction) => {
    const { data } = await api.put(
        `/transactions/${id}`,
        transaction
    );

    return data;
};

export const deleteTransaction = async (id) => {
    const { data } = await api.delete(
        `/transactions/${id}`
    );

    return data;
};