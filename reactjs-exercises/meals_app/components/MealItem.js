import { View, Text, Pressable, StyleSheet, Image } from "react-native"

function MealItem ({mealObj}) {
    return <View style={styles.mealItem}>
        <Pressable android_ripple={{color: '#ccc'}}>
            <View>
                <Image source={{uri: mealObj.imageUrl}} style={styles.image}/>
                <Text style={styles.title}>{mealObj.title}</Text>
            </View>
            <View style={styles.infoBox}>
                <Text style={styles.infoItem}>{mealObj.duration}m</Text>
                <Text style={styles.infoItem}>{mealObj.complexity}</Text>
                <Text style={styles.infoItem}>{mealObj.affordability}</Text>
            </View>
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
    },
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