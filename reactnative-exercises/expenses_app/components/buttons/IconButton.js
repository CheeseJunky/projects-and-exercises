import { Pressable, View, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

function IconButton({ icon, size, color, onPress }) {
    return <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
        <View style={styles.container}>
            <Ionicons name={icon} size={size} color={color} />
        </View>
    </Pressable>
}

export default IconButton;

const styles = StyleSheet.create({
    container: {
        padding: 5,
        margin: 8,
        borderRadius: 20
    },
    pressed: {
        opacity: 0.75
    }
});