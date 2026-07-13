import { useEffect, useState } from "react";

import {
    getTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
} from "../../api/transactionAPI";

import TransactionForm from "../../components/dashboard/transactions/TransactionForm";
import TransactionFilters from "../../components/dashboard/transactions/TransactionFilters";
import TransactionTable from "../../components/dashboard/transactions/TransactionTable";

import { resolveErrorMessage } from "../../utils/helpers";

const TransactionsPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadTransactions = async () => {
        try {
            const response = await getTransactions();
            setTransactions(response.data);
        } catch (error) {
            setError(resolveErrorMessage(error));
        }
    };

    useEffect(() => {
        let ignore = false;

        const initializePage = async () => {
            try {
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
            await deleteTransaction(id);
            await loadTransactions();
        } catch (error) {
            setError(resolveErrorMessage(error));
        }
    };

    if (loading) {
        return <p>Loading...</p>;
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

            <TransactionFilters />

            <TransactionTable
                transactions={transactions}
                onEdit={setEditingTransaction}
                onDelete={handleDelete}
            />
        </section>
    );
};

export default TransactionsPage;