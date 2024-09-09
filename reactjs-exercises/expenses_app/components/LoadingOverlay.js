import { ActivityIndicator, View, StyleSheet } from "react-native";
import { GlobalPalette } from "../constants/styles";

function LoadingOverlay() {
    return <View style={styles.container}>
        <ActivityIndicator size={'large'} color={'black'} />
    </View>
}

export default LoadingOverlay;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        color: GlobalPalette.colors.primary700
    }
});