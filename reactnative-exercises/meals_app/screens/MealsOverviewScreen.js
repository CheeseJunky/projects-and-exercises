import { useLayoutEffect } from "react";
// import { useRoute } from "@react-navigation/native";

import { MEALS, CATEGORIES } from "../data/dummy-data";
import MealsList from "../components/MealsList";

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

    return <MealsList items={displayedMeals} />
        
    }

export default MealsOverviewScreen;
