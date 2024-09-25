import { View, Image, Text, Pressable, StyleSheet } from "react-native";
import { Colors } from "../../constants/styles";

function PlaceItem({ place, onSelect }) {
    return (
        <Pressable style={({ pressed }) => [styles.item, pressed && styles.pressed]} onPress={onSelect}>
            <Image style={styles.image} source={{ uri: place.imageUrl }} />
            <View style={styles.info}>
                <Text style={styles.title}>{place.title}</Text>
                <Text style={styles.position} >lat:{place.location.lat} long:{place.location.long}</Text>
            </View>
        </Pressable>
    );
}

export default PlaceItem;

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderRadius: 4,
        marginHorizontal: 10,
        marginVertical: 10,
        backgroundColor: Colors.primary500,
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: 0.15,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 2,
    },
    pressed: {
        opacity: 0.7,
    },
    image: {
        flex: 1,
        borderBottomLeftRadius: 4,
        borderTopLeftRadius: 4,
        height: 100,
    },
    info: {
        flex: 2,
        padding: 14,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        color: 'white',
    },
    position: {
        fontSize: 12,
        color: 'white',
    },
});