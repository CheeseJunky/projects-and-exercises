import { Pressable, View, Text, StyleSheet, Platform } from "react-native";
// import { useNavigation } from "@react-navigation/native";

function CategoryGridTile({title, color, tileClicked}) {
    // const navigation = useNavigation();
    
    return (<View style={styles.gridItem}>
        <Pressable 
            android_ripple={{color: '#ccc'}} 
            style={({pressed}) => [styles.tapArea, pressed ? styles.buttonPressed : null]}
            onPress={tileClicked}
        >
            <View style={[styles.innerContainer, {backgroundColor: color}]}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </Pressable>
    </View>);
}

export default CategoryGridTile;

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 12,
        height: 150,
        borderRadius: 8,
        elevation: 4,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible'
    },
    innerContainer: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    tapArea: {
        flex: 1
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16
    },
    buttonPressed: {
        opacity: 0.5
    }
});