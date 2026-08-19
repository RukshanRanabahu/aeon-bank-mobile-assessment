import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import TransactionListItem from '../../components/TransactionListItem';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { useTransactionStore } from '../../store/transactionStore';

type TransactionsNavigationProp =
    NativeStackNavigationProp<RootStackParamList, 'Transactions'>;

const TransactionsScreen = () => {

    const navigation = useNavigation<TransactionsNavigationProp>();
    const {
        transactions,
        isLoading,
        error,
        fetchTransactions,
    } = useTransactionStore();

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    if (isLoading && transactions.length === 0) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" />
                <Text style={styles.loadingText}>
                    Loading transactions...
                </Text>
            </View>
        );
    }

    if (error && transactions.length === 0) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={transactions}
                keyExtractor={item => item.refId}
                renderItem={({ item }) => (
                    <TransactionListItem
                        transaction={item}
                        onPress={() => {
                            navigation.navigate('TransactionDetails', {
                                transactionId: item.refId,
                            });
                        }}
                    />
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={fetchTransactions}
                    />
                }
                contentContainerStyle={
                    transactions.length === 0
                        ? styles.emptyList
                        : undefined
                }
                ListEmptyComponent={
                    <Text style={styles.emptyText}>
                        No transactions found.
                    </Text>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },

    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },

    loadingText: {
        marginTop: 12,
        fontSize: 14,
        color: '#64748B',
    },

    errorText: {
        fontSize: 15,
        color: '#DC2626',
        textAlign: 'center',
    },

    emptyList: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    emptyText: {
        fontSize: 15,
        color: '#64748B',
    },
});

export default TransactionsScreen;
