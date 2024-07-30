import { View, Text, StyleSheet, FlatList } from "react-native";

import MealItem from "../components/MealItem";

function MealsList({items}) {
    function renderMealItem (itemData) {
        return <MealItem mealObj={itemData.item} />
    }

    return (
        <View style={styles.container}>
            <FlatList 
                data={items} 
                keyExtractor={(item) => item.id}
                renderItem={renderMealItem}
            />
        </View>
    );
}

export default MealsList;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    }
});