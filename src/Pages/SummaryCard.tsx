interface SummaryCardProps {
  label: string;
  value: number;
  sub: string;
  prefix?: string;
  valueClass: string;
}

export default function SummaryCard({
  label,
  value,
  sub,
  prefix = "",
  valueClass,
}: SummaryCardProps) {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p className={`text-2xl font-semibold ${valueClass}`}>
        {prefix}
        {formatted}
      </p>
      <p className="text-xs text-gray-300 mt-1">{sub}</p>
    </div>
  );
}
