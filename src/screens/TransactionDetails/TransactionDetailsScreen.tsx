import React from 'react';
import {
    Pressable,
    ScrollView,
    Share,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';

import type { RootStackParamList } from '../../navigation/AppNavigator';
import {
    formatCurrency,
    formatTransactionDate,
} from '../../utils/formatters';
import { useTransactionStore } from '../../store/transactionStore';

type TransactionDetailsRouteProp = RouteProp<
    RootStackParamList,
    'TransactionDetails'
>;

const TransactionDetailsScreen = () => {
    const route = useRoute<TransactionDetailsRouteProp>();
    const { transactionId } = route.params;

    const transactions = useTransactionStore(
        state => state.transactions,
    );

    const transaction = transactions.find(
        item => item.refId === transactionId,
    );

    const handleShare = async () => {
        if (!transaction) {
            return;
        }

        const message = [
            'Transaction Details',
            '',
            `Reference ID: ${transaction.refId}`,
            `Transfer: ${transaction.transferName}`,
            `Date: ${formatTransactionDate(transaction.transferDate)}`,
            `Recipient: ${transaction.recipientName}`,
            `Amount: ${formatCurrency(transaction.amount)}`,
        ].join('\n');

        try {
            await Share.share({
                message,
            });
        } catch {
            // The native share sheet can be dismissed by the user.
        }
    };

    if (!transaction) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>
                    Transaction not found.
                </Text>
            </View>
        );
    }

    const isIncoming = transaction.amount >= 0;

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}>
            <View style={styles.card}>
                <View style={styles.amountContainer}>
                    <Text style={styles.amountLabel}>
                        Transfer Amount
                    </Text>

                    <Text
                        style={[
                            styles.amount,
                            isIncoming
                                ? styles.incoming
                                : styles.outgoing,
                        ]}>
                        {formatCurrency(transaction.amount)}
                    </Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Reference ID</Text>
                    <Text style={styles.value}>
                        {transaction.refId}
                    </Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Transfer</Text>
                    <Text style={styles.value}>
                        {transaction.transferName}
                    </Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Date</Text>
                    <Text style={styles.value}>
                        {formatTransactionDate(
                            transaction.transferDate,
                        )}
                    </Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Recipient</Text>
                    <Text style={styles.value}>
                        {transaction.recipientName}
                    </Text>
                </View>
            </View>

            <Pressable
                onPress={handleShare}
                style={({ pressed }) => [
                    styles.shareButton,
                    pressed && styles.shareButtonPressed,
                ]}>
                <Text style={styles.shareButtonText}>
                    Share Transaction
                </Text>
            </Pressable>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },

    contentContainer: {
        padding: 16,
    },

    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
    },

    amountContainer: {
        alignItems: 'center',
        paddingVertical: 12,
    },

    amountLabel: {
        fontSize: 14,
        color: '#64748B',
    },

    amount: {
        marginTop: 8,
        fontSize: 28,
        fontWeight: '700',
    },

    incoming: {
        color: '#15803D',
    },

    outgoing: {
        color: '#DC2626',
    },

    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#E5E7EB',
        marginVertical: 16,
    },

    detailRow: {
        paddingVertical: 12,
    },

    label: {
        fontSize: 13,
        color: '#64748B',
    },

    value: {
        marginTop: 4,
        fontSize: 16,
        color: '#111827',
        fontWeight: '500',
    },

    shareButton: {
        marginTop: 20,
        backgroundColor: '#111827',
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: 'center',
    },

    shareButtonPressed: {
        opacity: 0.7,
    },

    shareButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#FFFFFF',
    },

    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },

    errorText: {
        fontSize: 15,
        color: '#DC2626',
        textAlign: 'center',
    },
});

export default TransactionDetailsScreen;
