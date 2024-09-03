import { View, StyleSheet } from "react-native";

import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";

const DUMMY_EXPENSES = [
    {
        id: 'expense1',
        description: 'shoes',
        price: 59.99,
        date: new Date('2024-09-02')
    },
    {
        id: 'expense2',
        description: 'bread',
        price: 3.21,
        date: new Date('2024-09-02')
    },
    {
        id: 'expense3',
        description: 'liquid',
        price: 20.00,
        date: new Date('2024-08-24')
    },
    {
        id: 'expense4',
        description: 'books',
        price: 35.67,
        date: new Date('2024-07-20')
    },
    {
        id: 'expense5',
        description: 'brakes',
        price: 89.99,
        date: new Date('2024-07-02')
    },
    {
        id: 'expense6',
        description: 'shoes',
        price: 59.99,
        date: new Date('2024-09-02')
    },
    {
        id: 'expense7',
        description: 'bread',
        price: 3.21,
        date: new Date('2024-09-02')
    },
    {
        id: 'expense8',
        description: 'liquid',
        price: 20.00,
        date: new Date('2024-08-24')
    },
    {
        id: 'expense9',
        description: 'books',
        price: 35.67,
        date: new Date('2024-07-20')
    },
    {
        id: 'expense10',
        description: 'brakes',
        price: 89.99,
        date: new Date('2024-07-02')
    }
];

function ExpensesOutput({ expenses, expensesPeriod }) {
    return <View style={styles.container} >
        <ExpensesSummary expenses={DUMMY_EXPENSES} period={expensesPeriod} />
        <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});