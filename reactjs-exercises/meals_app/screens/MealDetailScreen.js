import { Text, Image, StyleSheet, ScrollView } from "react-native";
import { useLayoutEffect } from "react";
import MealQuickDetails from "../components/MealQuickDetails";
import IconButton from "../components/IconButton";

function MealDetailScreen({ route, navigation }) {
    const mealObj = route.params.cMeal

    function headerButtonPress () {
        console.log("tapped inside")
    }
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return <IconButton 
                    icon={"star"} 
                    color={"white"} 
                    onTap={headerButtonPress} 
                />
            },
            title: mealObj.title
        });
    }, [navigation, headerButtonPress]);

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