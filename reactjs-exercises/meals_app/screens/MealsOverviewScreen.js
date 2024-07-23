import { View, Text, StyleSheet, FlatList } from "react-native";
import { useLayoutEffect } from "react";
// import { useRoute } from "@react-navigation/native";

import { MEALS, CATEGORIES } from "../data/dummy-data";
import MealItem from "../components/MealItem";

function MealsOverviewScreen({ route, navigation }) {
    // const route = useRoute();

    const displayedMeals = MEALS.filter(
        (mealItem) => {
            return mealItem.categoryIds.indexOf(route.params.categoryId) >= 0;
        }
    );

    useLayoutEffect(() => {
        const categoryTitle = CATEGORIES.find((category) => category.id === route.params.categoryId).title;
        navigation.setOptions({title: categoryTitle});
    }, [route.params.categoryId, navigation]);

    function renderMealItem (itemData) {
        return <MealItem mealObj={itemData.item} />
    }

    return (
        <View style={styles.container}>
            <FlatList 
                data={displayedMeals} 
                keyExtractor={(item) => item.id}
                renderItem={renderMealItem}
            />
        </View>
    );
}

export default MealsOverviewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    }
});