export const formatCurrency = (amount: number): string => {
    const sign = amount < 0 ? '-' : '+';

    return `${sign}RM ${Math.abs(amount).toLocaleString('en-MY', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
};

export const formatTransactionDate = (date: string): string => {
    return new Date(date).toLocaleDateString('en-MY', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};
