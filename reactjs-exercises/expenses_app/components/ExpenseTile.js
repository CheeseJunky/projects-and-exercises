import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { GlobalPalette } from "../constants/styles";

function ExpenseTile({ expense }) {
    const navigation = useNavigation();

    function expensePressHandler() {
        navigation.navigate('ManageExpense', {
            expense: expense
        });
    }

    const formatDate = (date) => {
        // dd.MM.yyyy
        const newDate = new Date(date);
        const day = newDate.getDate().toString().padStart(2, '0');
        const month = (newDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
        const year = newDate.getFullYear();
        return `${day}.${month}.${year}`;
    };

    return (
        <Pressable onPress={expensePressHandler} style={({pressed}) => pressed && styles.pressed}>
            <View style={styles.container}>
                <View>
                    <Text style={[styles.text, styles.descriptionContainer]}>
                        {expense.description.charAt(0).toUpperCase() + expense.description.slice(1)}
                    </Text>
                    <Text style={styles.text}>{formatDate(expense.date)}</Text>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={[styles.text, styles.priceText]}>{expense.price.toFixed(2)}€</Text>
                </View>
            </View>
        </Pressable>
    );
}

export default ExpenseTile;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        backgroundColor: GlobalPalette.colors.primary200,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
        elevation: 4,
        shadowColor: GlobalPalette.colors.gray500,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4
    },
    text: {
        color: 'black'
    },
    descriptionContainer: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold'
    },
    priceContainer: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        minWidth: 60
    },
    priceText: {
        fontWeight: 'bold'
    },
    pressed: {
        opacity: 0.9
    }
});