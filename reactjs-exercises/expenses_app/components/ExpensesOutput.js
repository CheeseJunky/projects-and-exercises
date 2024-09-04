import { View, StyleSheet } from "react-native";

import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";

function ExpensesOutput({ expenses, expensesPeriod }) {
    return <View style={styles.container} >
        <ExpensesSummary expenses={expenses} period={expensesPeriod} />
        <ExpensesList expenses={expenses} />
    </View>
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});