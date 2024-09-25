import { FlatList, Text, StyleSheet } from "react-native";
import ExpenseTile from "./ExpenseTile";

function renderExpenseTile (itemData) {
    return <ExpenseTile expense={itemData.item}></ExpenseTile>
}

function ExpensesList({ expenses }) {
    return expenses.length > 0 ? (
      <FlatList data={expenses} renderItem={renderExpenseTile} keyExtractor={(item) => item.id} />
    ) : (
      <Text style={styles.fallbacktext}>No expenses to show</Text>
    );
  }

export default ExpensesList;

const styles = StyleSheet.create({
    fallbacktext: {
        color: 'black',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 20
      },
});