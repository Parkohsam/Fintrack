import { useState } from "react";
import type { FilterState } from "../types";
import { useTransactions } from "../hooks/useTransaction";
import { formatCurrency } from "../utilities/formatters";
import TransactionForm from "../Pages/TransactionForm";
import SpendingChart from '../Pages/SpendingChart';

const defaultFilter: FilterState = { type: "all", category: "all" };

interface DashboardProps {
  user: string;
  onLogout: () => void;
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const [filter] = useState<FilterState>(defaultFilter);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const {
    filteredTransactions,
    addTransaction,
    deleteTransaction,
    totalBalance,
    totalIncome,
    totalExpenses,
  } = useTransactions(filter, user);

  const searchedTransactions = filteredTransactions.filter((tx) => {
    const q = search.toLowerCase();
    return (
      tx.category.toLowerCase().includes(q) ||
      tx.note?.toLowerCase().includes(q) ||
      tx.amount.toString().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-800">💰 FinTrack</h1>
          <p className="text-xs text-gray-400">
            Welcome back,{" "}
            <span className="text-blue-500 font-medium">{user}</span>! 👋
          </p>
        </div>
        <button
          onClick={onLogout}
          className="text-xs text-gray-400 hover:text-blue-800 transition-colors btn rounded-xl bg-blue-500 font-bold px-4 py-2.5 "
        >
          Log out
        </button>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SummaryCard
            label="Balance"
            value={totalBalance}
            sub="All time"
            valueClass={totalBalance >= 0 ? "text-gray-800" : "text-red-500"}
          />
          <SummaryCard
            label="Income"
            value={totalIncome}
            prefix="+"
            sub="All time"
            valueClass="text-green-600"
          />
          <SummaryCard
            label="Expenses"
            value={totalExpenses}
            prefix="-"
            sub="All time"
            valueClass="text-red-500"
          />
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={search}
            placeholder="🔍  Search transactions…"
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-white border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 shadow-sm"
          />
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white rounded-xl px-4 py-2.5 text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap"
          >
            + Add transaction
          </button>
        </div>

        {/* <SpendingChart transactions={filteredTransactions} /> */}

        {/* Transaction List */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="text-sm font-medium text-gray-700">Transactions</h2>
          </div>

          {searchedTransactions.length === 0 ? (
            <div className="px-4 py-10 text-center">
              <p className="text-gray-400 text-sm">No transactions yet.</p>
              <p className="text-gray-300 text-xs mt-1">
                Click <span className="font-medium">+ Add transaction</span> to
                get started!
              </p>
            </div>
          ) : (
            <ul>
              {searchedTransactions.map((tx) => (
                <li
                  key={tx.id}
                  className="flex items-center gap-3 px-4 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors group"
                >
                  <span className="text-xl w-8 text-center">{tx.category}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 mt-10">
                      {tx.category} · {tx.date}
                    </p>
                  </div>
                  <span
                    className={`text-sm font-semibold ${tx.type === "income" ? "text-green-600" : "text-red-500"}`}
                  >
                    {tx.type === "income" ? "+" : "-"}
                    {formatCurrency(tx.amount)}
                  </span>
                  <button
                    onClick={() => deleteTransaction(tx.id)}
                    className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-all text-sm ml-1"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <SpendingChart transactions={filteredTransactions} />
      </main>

      {/* Modal */}
      {showForm && (
        <TransactionForm
          onAdd={addTransaction}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

// ── Summary Card─

interface SummaryCardProps {
  label: string;
  value: number;
  sub: string;
  prefix?: string;
  valueClass: string;
}

function SummaryCard({
  label,
  value,
  sub,
  prefix = "",
  valueClass,
}: SummaryCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p className={`text-2xl font-semibold ${valueClass}`}>
        {prefix}
        {formatCurrency(value)}
      </p>
      <p className="text-xs text-gray-300 mt-1">{sub}</p>
    </div>
  );
}
