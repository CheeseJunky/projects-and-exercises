import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native"
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/ui/IconButton";

function Map({ navigation }) {
    const [coords, setCoords] = useState();

    function selectLocationHandler(event) {
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;

        setCoords({ lat: lat, lng: lng });
    }

    const saveCoordsHandler = useCallback(() => {
        if (!coords) {
            Alert.alert("No location", "Pick a location on the map first");
            return;
        }

        navigation.navigate('AddPlace', { pickedLocation: coords });
    }, [navigation, coords]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({tintColor}) => <IconButton icon="save-outline" size={24} color={tintColor} onPress={saveCoordsHandler} />
        });
    }, [navigation, saveCoordsHandler]);

    return (
        <MapView
            style={styles.map}
            initialRegion={{
                latitude: 46.322,
                longitude: 15.495,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            onPress={selectLocationHandler}
        >
            {coords && (
                <Marker
                    title="Picked Location"
                    coordinate={{
                        latitude: coords.lat,
                        longitude: coords.lng,
                    }}
                />
            )}
        </MapView>
    );
}

export default Map;

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
});