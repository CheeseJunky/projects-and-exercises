import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";

import MealsList from "../components/MealsList";
import { FavoritesContext } from '../store/context/favourites-context';
import { MEALS } from "../data/dummy-data";
import { useSelector } from "react-redux";

function FavouritesScreen () {
    // const favouriteMealsCtx = useContext(FavoritesContext);  //context api
    // const favMeals = MEALS.filter((meal) => favouriteMealsCtx.ids.includes(meal.id))
    const favouriteMealIds = useSelector(state => state.favouriteMeals.ids);    // redux
    const favMeals = MEALS.filter((meal) => favouriteMealIds.includes(meal.id))

    displayObject = (<View style={styles.container}>
            <Text style={styles.text}>No items to display</Text>
        </View>
    );
    if (favMeals.length > 0) {
        displayObject = <MealsList items={favMeals}/>
    }
    return displayObject
}

export default FavouritesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});