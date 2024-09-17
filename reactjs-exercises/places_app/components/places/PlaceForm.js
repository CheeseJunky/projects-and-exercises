import { useState } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import { Colors } from "../../constants/styles";
import ImagePicker from "./ImagePicker";

function PlaceForm () {
    const [enteredTitle, setEnderedTitle] = useState('');

    function changeTitleHandler(enteredText) {
        setEnderedTitle(enteredText);
    }


    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enteredTitle}/>
            </View>
            <ImagePicker />
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