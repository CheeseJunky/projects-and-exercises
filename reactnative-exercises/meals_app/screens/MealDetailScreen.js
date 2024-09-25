import { Text, Image, StyleSheet, ScrollView } from "react-native";
import { useContext, useLayoutEffect } from "react";
import MealQuickDetails from "../components/MealQuickDetails";
import IconButton from "../components/IconButton";
import { useDispatch, useSelector } from "react-redux";
// import { FavoritesContext } from '../store/context/favourites-context';
import { addFavourite, removeFavourite } from "../store/redux/favourites";

function MealDetailScreen({ route, navigation }) {
    const mealObj = route.params.cMeal

    // const favoriteMealsCtx = useContext(FavoritesContext);   // context api
    // const mealIsFavourite = favoriteMealsCtx.ids.includes(mealObj.id)
    const favouriteMealIds = useSelector((state) => state.favouriteMeals.ids);  // redux
    const mealIsFavourite = favouriteMealIds.includes(mealObj.id)
    const dispatch = useDispatch();
    
    function changeFavouriteStatus () {
        if (mealIsFavourite) {
            // favoriteMealsCtx.removeFavorite(mealObj.id)
            dispatch(removeFavourite({ id: mealObj.id }));
        } else {
            // favoriteMealsCtx.addFavorite(mealObj.id)
            dispatch(addFavourite({ id: mealObj.id }));
        }
    }
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return <IconButton 
                    icon={ mealIsFavourite ? "star" : "star-outline" } 
                    color={"white"} 
                    onTap={changeFavouriteStatus} 
                />
            },
            title: mealObj.title
        });
    }, [navigation, changeFavouriteStatus]);

    return <ScrollView style={styles.root}>
        <Image source={{ uri: mealObj.imageUrl }} style={styles.image} />
        <Text style={styles.title}>{mealObj.title}</Text>
        <MealQuickDetails mealObj={mealObj} />
        <Text style={styles.subtitle}>Ingredients:</Text>
        {mealObj.ingredients.map((ingredient) => (
            <Text key={ingredient} style={styles.listText} > {ingredient} </Text>
        ))}
        <Text style={styles.subtitle}>Steps:</Text>
        {mealObj.steps.map((step) => (
            <Text key={step} style={styles.listText} > - {step} </Text>
        ))}
    </ScrollView>
}

export default MealDetailScreen;

const styles = StyleSheet.create({
    root: {
        marginBottom: 20
    },
    image: {
        width: '100%',
        height: 350,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        margin: 8,
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 10,
        marginVertical: 4
    },
    listText: {
        marginHorizontal: 14,
        marginVertical: 2,
        fontSize: 14
    }
});