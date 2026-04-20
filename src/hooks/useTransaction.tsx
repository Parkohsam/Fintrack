import { useState, useEffect, useMemo } from "react";
import type { Transaction, TransactionFormData, FilterState } from "../types";

// ✅ Accepts the key as a parameter
function loadFromStorage(key: string): Transaction[] {
    try {
        const raw = localStorage.getItem(key);
        return raw ? (JSON.parse(raw) as Transaction[]) : [];
    } catch {
        return [];
    }
}

// ✅ Accepts user so each user gets their own key
export function useTransactions(filter: FilterState, user: string) {
    const STORAGE_KEY = `fintrack_transactions_${user}`;

    const [transactions, setTransactions] = useState<Transaction[]>(
        () => loadFromStorage(STORAGE_KEY) // ✅ runs once on mount
    );

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    }, [transactions, STORAGE_KEY]);

    function addTransaction(data: TransactionFormData): void {
        const newTx: Transaction = {
            id: crypto.randomUUID(),
            createdAt: Date.now(),
            ...data,
        };
        setTransactions((prev) => [newTx, ...prev]);
    }

    function deleteTransaction(id: string): void {
        setTransactions((prev) => prev.filter((tx) => tx.id !== id));
    }

    const totalIncome = useMemo(
        () =>
            transactions
                .filter((tx) => tx.type === "income")
                .reduce((sum, tx) => sum + tx.amount, 0),
        [transactions]
    );

    const totalExpenses = useMemo(
        () =>
            transactions
                .filter((tx) => tx.type === "expense")
                .reduce((sum, tx) => sum + tx.amount, 0),
        [transactions]
    );

    const totalBalance = totalIncome - totalExpenses;

    const filteredTransactions = useMemo(() => {
        return transactions.filter((tx) => {
            const typeMatch = filter.type === "all" || tx.type === filter.type;
            const categoryMatch =
                filter.category === "all" || tx.category === filter.category;
            return typeMatch && categoryMatch;
        });
    }, [transactions, filter]);

    return {
        transactions,
        filteredTransactions,
        addTransaction,
        deleteTransaction,
        totalIncome,
        totalExpenses,
        totalBalance,
    };
}