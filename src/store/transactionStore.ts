import { create } from 'zustand';
import { getTransactions } from '../services/transactionService';
import { Transaction } from '../types/transaction';

interface TransactionState {
    transactions: Transaction[];
    isLoading: boolean;
    error: string | null;

    fetchTransactions: () => Promise<void>;
}

export const useTransactionStore = create<TransactionState>(set => ({
    transactions: [],
    isLoading: false,
    error: null,

    fetchTransactions: async () => {
        set({
            isLoading: true,
            error: null,
        });

        try {
            const transactions = await getTransactions();

            set({
                transactions,
                isLoading: false,
            });
        } catch {
            set({
                isLoading: false,
                error: 'Failed to load transactions.',
            });
        }
    },
}));