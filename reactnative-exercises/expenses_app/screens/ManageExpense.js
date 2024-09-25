import { useContext, useLayoutEffect } from "react";
import { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";

import { GlobalPalette } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";

import IconButton from "../components/buttons/IconButton";
import Button from "../components/buttons/Button";
import InputField from "../components/InputField";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import LoadingOverlay from "../components/LoadingOverlay";
import ErrorOverlay from "../components/ErrorOverlay";

function ManageExpense({ route, navigation }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState();
    const expensesCtx = useContext(ExpensesContext);

    var editExpense = route.params?.expense;
    const isEditing = !!editExpense     //obj to bool -> 0, null, undefined = false

    const [inputValues, setInputValues] = useState({
        price: isEditing ? editExpense.price.toString() : '',
        date: isEditing ? editExpense.date.toISOString().slice(0, 10) : '',
        description: isEditing ? editExpense.description : ''
    });

    function inputChangedhandler(inputIdentifier, enteredValue) {
        setInputValues((curValues) => {
            return {
                ...curValues,
                [inputIdentifier]: enteredValue
            }
        });
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        });
    }), [navigation, isEditing]

    async function deleteExpenseHandler() {
        setIsSubmitting(true);
        try {
            await deleteExpense(editExpense.id);
            expensesCtx.deleteExpense(editExpense.id)
            navigation.goBack();
        } catch (error) {
            setError("Could not delete expense");
            setIsSubmitting(false);
        }
    }

    function cancelHandler() {
        navigation.goBack();
    }

    let priceValid = isEditing;
    let dateValid = isEditing;
    let descValid = isEditing;
    async function confirmHandler() {
        setIsSubmitting(true);
        priceValid = !isNaN(inputValues.price) && +inputValues.price > 0
        dateValid = inputValues.date.toString() !== 'Invalid Date'
        descValid = inputValues.description.trim().length > 0;

        if (!priceValid || !dateValid || !descValid) {
            Alert.alert("Invalid input", "Please check your input values");
            return;
        }

        let expensData = { description: inputValues.description, price: +inputValues.price, date: new Date(inputValues.date) };

        // + before a variable converts to a number -> same as above parseFloat
        try {
            if (isEditing) {
                expensesCtx.updateExpense(editExpense.id, expensData)
                updateExpense(editExpense.id, expensData);
                navigation.goBack();
            } else {
                const id = await storeExpense(expensData)
                expensesCtx.addExpense({...expensData, id: id})
            }
        } catch (error) {
            setError("Could not save data, try again later.")
            setIsSubmitting(false);
        }
    }

    if (error && !isSubmitting) {
        return <ErrorOverlay message={error} />
    }

    if (isSubmitting) {
        return <LoadingOverlay />
    }

    return (
        <View style={styles.container}>
            <View>
                <InputField
                    label="Description"
                    inputConfig={{
                        // multiline: true,
                        autoCorrect: false,
                        onChangeText: inputChangedhandler.bind(this, "description"),
                        value: inputValues.description
                    }}
                    // isError={!descValid}
                />
                <InputField
                    label="Price"
                    inputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: inputChangedhandler.bind(this, "price"),
                        value: inputValues.price
                    }}
                    // isError={!priceValid}
                />
                <InputField
                    label="Date"
                    inputConfig={{
                        placeholder: 'yyyy-MM-dd',
                        maxlength: 10,
                        onChangeText: inputChangedhandler.bind(this, "date"),
                        value: inputValues.date
                    }}
                    // isError={!dateValid}
                />
            </View>
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
        alignItems: 'center',
        marginTop: 5
    },
    button: {
        minWidth: 120
    }
});