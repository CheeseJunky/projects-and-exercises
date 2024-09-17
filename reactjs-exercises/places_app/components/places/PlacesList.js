import { FlatList, View, Text, StyleSheet } from "react-native";
import PlaceItem from "./PlaceItem";

function PlacesList({ places }) {
    if (!places || places.length === 0) {
        return (
            <View style={styles.noPlacesContainer}>
                <Text style={styles.noPlacesText}>No places to display</Text>
            </View>
        );
    }

    return <FlatList
        data={places}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PlaceItem place={item} />}
    />;

}

export default PlacesList;

const styles = StyleSheet.create({
    noPlacesContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noPlacesText: {
        fontSize: 16
    }
});