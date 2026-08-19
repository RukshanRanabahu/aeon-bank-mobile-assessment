import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TransactionsScreen from '../screens/Transactions/TransactionsScreen';
import TransactionDetailsScreen from '../screens/TransactionDetails/TransactionDetailsScreen';

export type RootStackParamList = {
    Transactions: undefined;
    TransactionDetails: {
        transactionId: string;
    };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Transactions"
                component={TransactionsScreen}
                options={{
                    title: 'Transactions',
                }}
            />

            <Stack.Screen
                name="TransactionDetails"
                component={TransactionDetailsScreen}
                options={{
                    title: 'Transaction Details',
                }}
            />
        </Stack.Navigator>
    );
};

export default AppNavigator;