import { useEffect, useMemo, useState } from "react";

import {
    getTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
} from "../../api/transactionAPI";

import TransactionForm from "../../components/dashboard/transactions/transactionForm";
import TransactionFilters from "../../components/dashboard/transactions/transactionFilter";
import TransactionTable from "../../components/dashboard/transactions/transactionTable";

import { resolveErrorMessage } from "../../utils/helpers";

const TransactionsPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [editingTransaction, setEditingTransaction] = useState(null);

    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadTransactions = async () => {
        try {
            setError("");

            const response = await getTransactions();

            setTransactions(response.data);
        } catch (error) {
            setError(resolveErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let ignore = false;

        const initializePage = async () => {
            try {
                setError("");

                const response = await getTransactions();

                if (!ignore) {
                    setTransactions(response.data);
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

        initializePage();

        return () => {
            ignore = true;
        };
    }, []);

    const handleSubmit = async (transaction) => {
        try {
            setError("");

            if (editingTransaction) {
                await updateTransaction(
                    editingTransaction._id,
                    transaction
                );

                setEditingTransaction(null);
            } else {
                await createTransaction(transaction);
            }

            await loadTransactions();
        } catch (error) {
            setError(resolveErrorMessage(error));
        }
    };

    const handleDelete = async (id) => {
        try {
            setError("");

            await deleteTransaction(id);

            if (editingTransaction?._id === id) {
                setEditingTransaction(null);
            }

            await loadTransactions();
        } catch (error) {
            setError(resolveErrorMessage(error));
        }
    };

    const filteredTransactions = useMemo(() => {
        return transactions.filter((transaction) => {
            const matchesSearch =
                transaction.title
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                transaction.category
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesType =
                typeFilter === "all" ||
                transaction.type === typeFilter;

            return matchesSearch && matchesType;
        });
    }, [transactions, search, typeFilter]);

    if (loading) {
        return <p>Loading transactions...</p>;
    }

    return (
        <section>

            <h1>Transactions</h1>

            {error && <p>{error}</p>}

            <TransactionForm
                key={editingTransaction?._id ?? "create"}
                editingTransaction={editingTransaction}
                onSubmit={handleSubmit}
            />

            <TransactionFilters
                search={search}
                setSearch={setSearch}
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
            />

            <TransactionTable
                transactions={filteredTransactions}
                onEdit={setEditingTransaction}
                onDelete={handleDelete}
            />

        </section>
    );
};

export default TransactionsPage;