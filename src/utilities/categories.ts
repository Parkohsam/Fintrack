export const EXPENSE_CATEGORIES = [
    'Food',
    'Rent',
    'Transport',
    'Health',
    'Shopping',
    'Entertainment',
    'Utilities',
    'Other',
] as const;

export const INCOME_CATEGORIES = [
    'Salary',
    'Freelance',
    'Gift',
    'Investment',
    'Other Income',
] as const;

export const CATEGORY_ICONS: Record<string, string> = {
    Food: '🍔',
    Rent: '🏠',
    Transport: '🚌',
    Health: '💊',
    Shopping: '🛍️',
    Entertainment: '🎬',
    Utilities: '💡',
    Other: '📦',
    Salary: '💼',
    Freelance: '💻',
    Gift: '🎁',
    Investment: '📈',
    'Other Income': '💵',
};