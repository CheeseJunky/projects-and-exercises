import { Pressable, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/styles";

function Button ({onPress, children}) {
    return (
        <Pressable style={({pressed}) => [styles.button, pressed && styles.pressed]} onPress={onPress}>
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    );
}

export default Button;

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginTop: 10,
        backgroundColor: Colors.primary700,
        elevation: 2,
        borderRadius: 4
    },
    pressed: {
        opacity: 0.7
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        color: 'white'
    }
});