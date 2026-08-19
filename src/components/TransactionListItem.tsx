import React from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { Transaction } from '../types/transaction';
import {
    formatCurrency,
    formatTransactionDate,
} from '../utils/formatters';

interface TransactionListItemProps {
    transaction: Transaction;
    onPress: () => void;
}

const TransactionListItem = ({
    transaction,
    onPress,
}: TransactionListItemProps) => {
    const isIncoming = transaction.amount >= 0;

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.container,
                pressed && styles.pressed,
            ]}>
            <View style={styles.content}>
                <Text style={styles.transferName}>
                    {transaction.transferName}
                </Text>

                <Text style={styles.recipientName}>
                    {transaction.recipientName}
                </Text>

                <Text style={styles.date}>
                    {formatTransactionDate(transaction.transferDate)}
                </Text>
            </View>

            <Text
                style={[
                    styles.amount,
                    isIncoming ? styles.incoming : styles.outgoing,
                ]}>
                {formatCurrency(transaction.amount)}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 18,
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#E5E7EB',
    },

    pressed: {
        opacity: 0.7,
    },

    content: {
        flex: 1,
        marginRight: 16,
    },

    transferName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },

    recipientName: {
        marginTop: 4,
        fontSize: 14,
        color: '#6B7280',
    },

    date: {
        marginTop: 6,
        fontSize: 12,
        color: '#9CA3AF',
    },

    amount: {
        fontSize: 15,
        fontWeight: '700',
    },

    incoming: {
        color: '#15803D',
    },

    outgoing: {
        color: '#DC2626',
    },
});

export default TransactionListItem;
