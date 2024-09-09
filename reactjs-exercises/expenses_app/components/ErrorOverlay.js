import { View, Text, StyleSheet } from "react-native";
import { GlobalPalette } from "../constants/styles";

function ErrorOverlay({ message, onConfirm }) {
    return <View style={styles.container}>
        <Text style={[styles.text, styles.title]}>An Error Occured</Text>
        <Text style={[styles.text, styles.msg]}>{message}</Text>
    </View>
}

export default ErrorOverlay;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        color: GlobalPalette.colors.primary700
    },
    text: {
        textAlign: 'center',
        marginBottom: 5,
        color: 'black'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    msg: {
        fontSize: 14
    }
});