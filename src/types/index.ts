export type TransactionType = 'income' | 'expense';

export interface Transaction {
    id: string;
    type: TransactionType;
    amount: number;
    category: string;
    date: string;
    note?: string;
    createdAt: number;
}

export interface TransactionFormData {
    type: TransactionType;
    amount: number;
    category: string;
    date: string;
    note: string;
}
export interface FilterState {
    type: 'all' | TransactionType;
    category: string;
}

export interface User {
    name: string;
}
