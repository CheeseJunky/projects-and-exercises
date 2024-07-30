import { View, Text, StyleSheet } from "react-native";

function MealQuickDetails({mealObj}) {
    return <View style={styles.infoBox}>
        <Text style={styles.infoItem}>{mealObj.duration}m</Text>
        <Text style={styles.infoItem}>{mealObj.complexity}</Text>
        <Text style={styles.infoItem}>{mealObj.affordability}</Text>
    </View>
}

export default MealQuickDetails;

const styles = StyleSheet.create({
    infoBox: {
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    infoItem: {
        marginHorizontal: 6,
        fontSize: 12
    }
});