import { useContext, useLayoutEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import IconButton from "../components/buttons/IconButton";
import { GlobalPalette } from "../constants/styles";
import Button from "../components/buttons/Button";
import { ExpensesContext } from "../store/expenses-context";

function ManageExpense({ route, navigation }) {
    const expensesCtx = useContext(ExpensesContext);

    var editExpense = route.params?.expense;
    const isEditing = !!editExpense     //obj to bool -> 0, null, undefined = false

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        });
    }), [navigation, isEditing]

    function deleteExpenseHandler() {
        expensesCtx.deleteExpense(editExpense.id)
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack();
    }

    function confirmHandler() {
        if (isEditing) {
            expensesCtx.updateExpense(editExpense.id, {description: "updated", price: 12.2, date: new Date('2024-09-02')})
        } else {
            expensesCtx.addExpense({description: "desc", price: 12.2, date: new Date('2024-09-02')});
        }
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={styles.updateCancelContainer}>
                <Button
                    style={styles.button}
                    mode="flat"
                    onPress={cancelHandler}
                >Cancel</Button>
                <Button
                    style={styles.button}
                    onPress={confirmHandler}>{isEditing ? "Update" : "Add"}</Button>
            </View>

            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton
                        icon="trash"
                        color={GlobalPalette.colors.error500}
                        size={34}
                        onPress={deleteExpenseHandler}
                    />
                </View>
            )}

        </View>
    );
}

export default ManageExpense;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalPalette.colors.primary200,
        alignItems: 'center'
    },
    updateCancelContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        minWidth: 120
    }
});