import { useState } from "react";
import type { TransactionFormData, TransactionType } from "../types";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../utilities/categories";
import { todayISO } from "../utilities/formatters";

interface TransactionFormProps {
    onAdd: (data: TransactionFormData) => void;
    onClose: () => void;
}

const defaultForm: TransactionFormData = {
    type: "expense",
    amount: 0,
    category: "",
    date: todayISO(),
    note: "",
};

export default function TransactionForm({
    onAdd,
    onClose,
}: TransactionFormProps) {
    const [form, setForm] = useState<TransactionFormData>(defaultForm);

    const categories =
        form.type === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

    function setField<K extends keyof TransactionFormData>(
        key: K,
        value: TransactionFormData[K],
    ) {
        setForm((prev) => ({ ...prev, [key]: value }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!form.amount || !form.category || !form.date) return;

            onAdd(form);
            onClose();
        }

        return (
            // ── Backdrop ────────────────────────────────────────────────────────────
            <div
                className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4"
                onClick={onClose}
            >
                {/* ── Modal ───────────────────────────────────────────────────────── */}
                <div
                    className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6 flex flex-col gap-4"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm font-semibold text-gray-800">
                            New transaction
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-300 hover:text-gray-500 text-lg leading-none"
                        >
                            ✕
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {/* Type toggle */}
                        <div className="grid grid-cols-2 rounded-xl overflow-hidden border border-gray-200 text-sm font-medium">
                            {(["expense", "income"] as TransactionType[]).map((t) => (
                                <button
                                    key={t}
                                    type="button"
                                    onClick={() => {
                                        setField("type", t);
                                        setField("category", ""); // reset category when type changes
                                    }}
                                    className={`py-2 capitalize transition-colors ${form.type === t
                                        ? t === "expense"
                                            ? "bg-red-50 text-red-600"
                                            : "bg-green-50 text-green-600"
                                        : "bg-gray-50 text-gray-400"
                                        }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>

                        {/* Amount + Date */}
                        <div className="grid grid-cols-2 gap-3">
                            <label className="flex flex-col gap-1">
                                <span className="text-xs text-gray-400">Amount</span>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    required
                                    placeholder="0.00"
                                    value={form.amount || ""}
                                    onChange={(e) =>
                                        setField("amount", parseFloat(e.target.value) || 0)
                                    }
                                    className="rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                                />
                            </label>
                            <label className="flex flex-col gap-1">
                                <span className="text-xs text-gray-400">Date</span>
                                <input
                                    type="date"
                                    required
                                    value={form.date}
                                    onChange={(e) => setField("date", e.target.value)}
                                    className="rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                                />
                            </label>
                        </div>

                        {/* Category */}
                        <label className="flex flex-col gap-1">
                            <span className="text-xs text-gray-400">Category</span>
                            <select
                                required
                                value={form.category}
                                onChange={(e) => setField("category", e.target.value)}
                                className="rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                            >
                                <option value="">Select category…</option>
                                {categories.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                        </label>

                        {/* Note */}
                        <label className="flex flex-col gap-1">
                            <span className="text-xs text-gray-400">Note (optional)</span>
                            <input
                                type="text"
                                placeholder="e.g. Lunch at work"
                                value={form.note ?? ""}
                                onChange={(e) => setField("note", e.target.value)}
                                className="rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                            />
                        </label>

                        {/* Submit */}
                        <button
                            type="submit"
                            className={`w-full rounded-xl py-2.5 text-sm font-medium text-white transition-colors ${form.type === "expense"
                                ? "bg-red-500 hover:bg-red-600"
                                : "bg-green-500 hover:bg-green-600"
                                }`}
                        >
                            Add {form.type}
                        </button>
                    </form>
                </div>
            </div>
        );
    }
