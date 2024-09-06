import { View, Text, TextInput, StyleSheet } from "react-native";
import { GlobalPalette } from "../constants/styles";

function InputField({ label, inputConfig, isError }) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput {...inputConfig} style={[styles.input, isError && styles.errorHightlight]}/>
        </View>
    );
}

export default InputField;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 5,
        padding: 10
    },
    label: {
        minWidth: 100,
        fontWeight: 'bold',
        fontSize: 16
    },
    input: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        flex: 1,
        fontSize: 14
    },
    errorHightlight: {
        backgroundColor: GlobalPalette.colors.error50
    }
});