import { View, StyleSheet, Alert } from "react-native";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from "expo-location";
import MapView, { Marker } from 'react-native-maps';

import OutlinedButton from "../ui/OutlinedButton";
import { Colors } from "../../constants/styles";
import { useEffect, useState } from "react";
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";

function LocationPicker({onLocationSelected}) {
    const [locationPermissionInfo, requestPermission] = useForegroundPermissions();
    const [coords, setCoords] = useState();
    const [markers, setMarkers] = useState([]);

    const navigation = useNavigation();
    const route = useRoute();
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused && route.params) {
            setCoords({
                lat: route.params.pickedLocation.lat,
                long: route.params.pickedLocation.lng
            });
            addMarker(route.params.pickedLocation.lat, route.params.pickedLocation.lng);
        }
    }, [route, isFocused]);

    useEffect(() => {
        onLocationSelected(coords);
    }, [coords, onLocationSelected]);

    const addMarker = (latitude, longitude) => {
        setMarkers([...markers, { latitude, longitude }]);
    };

    async function verifyPermissions() {
        if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }

        if (locationPermissionInfo.status === PermissionStatus.DENIED) {
            Alert.alert(
                'Insufficient Permissions!',
                'You need to grant location permissions to use this app.'
            );
            return false;
        }

        return true;
    }

    async function getLocationHandler() {
        const hasPermission = await verifyPermissions();

        if (!hasPermission) {
            return;
        }

        const result = await getCurrentPositionAsync();

        setCoords({
            lat: result.coords['latitude'],
            long: result.coords['longitude']
        });
        addMarker(result.coords['latitude'], result.coords['longitude']);
    }

    function pickOnMapHandler() {
        navigation.navigate("Map");
    }

    let mapPreview;
    if (coords) {
        mapPreview = <MapView
            style={styles.mapPreview}
            initialRegion={{
                latitude: coords.lat,
                longitude: coords.long,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >
            {markers.map((marker, index) => (
                <Marker
                    key={index}
                    coordinate={marker}
                    onPress={() => console.log('Marker pressed')}
                />
            ))}
        </MapView>
    } else {
        mapPreview = <View style={styles.mapPreview}></View>;
    }


    return (
        <View>
            {mapPreview}
            <View style={styles.actionsView}>
                <OutlinedButton icon="location" onPress={getLocationHandler}>Locate User</OutlinedButton>
                <OutlinedButton icon="map" onPress={pickOnMapHandler}>Pick on Map</OutlinedButton>
            </View>
        </View>
    );
}

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
    },
    actionsView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});