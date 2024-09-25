import { Text, View, StyleSheet } from "react-native";
import { GlobalPalette } from "../constants/styles";

function ExpensesSummary({ expenses, period }) {
    const expenseSum = expenses.reduce((sum, expense) => {
        return sum + expense.price
    }, 0);


    return <View style={styles.container} >
        <Text style={styles.period} >{period}</Text>
        <Text style={styles.sum} >{expenseSum.toFixed(2)}€</Text>
    </View>
}

export default ExpensesSummary;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: GlobalPalette.colors.primary50,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    period: {
        fontSize: 12,
        fontWeight: 'bold',
        color: GlobalPalette.colors.primary500
    },
    sum: {
        fontSize: 16, 
        fontWeight: 'bold',
        color: GlobalPalette.colors.primary500
    }
});