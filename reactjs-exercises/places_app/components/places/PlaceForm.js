import { useCallback, useState } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import { Colors } from "../../constants/styles";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../ui/Button";
import { Place } from "../../models/place";

function PlaceForm({ onCreatePlace }) {
    const [enteredTitle, setEnderedTitle] = useState('');
    const [selectedImage, setSelectedImage] = useState();
    const [selectedLocation, setSelectedLocation] = useState();

    function changeTitleHandler(enteredText) {
        setEnderedTitle(enteredText);
    }

    function onImageTakenHandler(uri) {
        setSelectedImage(uri);
    }

    const onLocationSelectedHandler = useCallback((location) => {
        setSelectedLocation(location)
    }, []);

    function savePlaceHandler() {
        const placeData = new Place(enteredTitle, selectedImage, selectedLocation);
        onCreatePlace(placeData);
    }

    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enteredTitle} />
            </View>
            <ImagePicker onImageTaken={onImageTakenHandler} />
            <LocationPicker onLocationSelected={onLocationSelectedHandler} />
            <Button onPress={savePlaceHandler} >
                Add Place
            </Button>
        </ScrollView>
    );
}

export default PlaceForm;

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 20
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
        color: Colors.primary400
    },
    input: {
        marginVertical: 10,
        paddingHorizontal: 5,
        paddingVertical: 4,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 1,
        backgroundColor: Colors.primary100
    }
});