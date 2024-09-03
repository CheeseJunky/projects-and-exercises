import { FlatList } from "react-native-gesture-handler";
import ExpenseTile from "./ExpenseTile";

function renderExpenseTile (itemData) {
    return <ExpenseTile expense={itemData.item}></ExpenseTile>
}

function ExpensesList({ expenses }) {
    return <FlatList data={expenses} renderItem={renderExpenseTile} keyExtractor={(item) => { item.id }}/>
}

export default ExpensesList;