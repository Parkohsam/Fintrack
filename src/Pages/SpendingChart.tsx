import { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import type { Transaction } from "../types";
import { formatCurrency } from "../utilities/formatters";
import { CHART_COLORS } from "../utilities/colors";

interface SpendingChartProps {
    transactions: Transaction[];
}

export default function SpendingChart({ transactions }: SpendingChartProps) {
    const data = useMemo(() => {
        const expenses = transactions.filter((tx) => tx.type === "expense");
        const byCategory: Record<string, number> = {};
        for (const tx of expenses) {
            byCategory[tx.category] = (byCategory[tx.category] ?? 0) + tx.amount;
        }
        return Object.entries(byCategory)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value);
    }, [transactions]);

    if (data.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
                <p className="text-2xl mb-2">📊</p>
                <p className="text-sm text-gray-400">No expenses to display yet.</p>
                <p className="text-xs text-gray-300 mt-1">
                    Add some expenses to see your spending breakdown.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-medium text-gray-700 mb-4">
                Spending by category
            </h2>
            <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={3}
                        dataKey="value"
                    >
                        {data.map((_, index) => (
                            <Cell
                                key={index}
                                fill={CHART_COLORS[index % CHART_COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value) => [`${formatCurrency(value as number)}`, '']}
                        contentStyle={{
                            borderRadius: "12px",
                            border: "1px solid #F3F4F6",
                            fontSize: "12px",
                        }}
                    />
                    <Legend
                        iconType="circle"
                        iconSize={8}
                        formatter={(value) => (
                            <span style={{ fontSize: "11px", color: "#6B7280" }}>
                                {value}
                            </span>
                        )}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
