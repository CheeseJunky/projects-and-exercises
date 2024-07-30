import { View, Text, Pressable, StyleSheet, Image } from "react-native"
import { useNavigation } from "@react-navigation/native";
import MealQuickDetails from "./MealQuickDetails";


function MealItem ({mealObj}) {
    const navigation = useNavigation()

    function openMealDetails () {
        navigation.navigate('MealDetailScreen', { cMeal: mealObj })
    }

    return <View style={styles.mealItem}>
        <Pressable android_ripple={{color: '#ccc'}} onPress={openMealDetails}>
            <View>
                <Image source={{uri: mealObj.imageUrl}} style={styles.image}/>
                <Text style={styles.title}>{mealObj.title}</Text>
            </View>
            <MealQuickDetails mealObj={mealObj}/>
        </Pressable>
    </View>
}

export default MealItem;

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    title: {
        fontWeight: 'bold',
        textaAlign: 'center',
        fontSize: 18,
        padding: 10
    },
    mealItem: {
        margin: 10,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#FAFAFA',
        elevation: 4
    }
});