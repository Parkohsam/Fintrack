import { useState, useEffect, useMemo } from "react";
import type { Transaction, TransactionFormData, FilterState } from "../types";

const STORAGE_KEY = "fintrack_transaction";

function loadFormStorage(): Transaction[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? (JSON.parse(raw) as Transaction[]) : [];
    } catch {
        return [];
    }
}

export function useTransactions(filter: FilterState) {
    const [transactions, setTransactions] =
        useState<Transaction[]>(loadFormStorage);

    // Save to localStorage every time transactions change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    }, [transactions]);

    // Add a new transaction
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

    // ── Calculated values ──────────────────────────────────────────────────────
    const totalIncome = useMemo(
        () =>
            transactions
                .filter((tx) => tx.type === "income")
                .reduce((sum, tx) => sum + tx.amount, 0),
        [transactions],
    );

    const totalExpenses = useMemo(
        () =>
            transactions
                .filter((tx) => tx.type === "expense")
                .reduce((sum, tx) => sum + tx.amount, 0),
        [transactions],
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
