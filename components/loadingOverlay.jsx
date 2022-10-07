import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function LoadingOverlay() {
    return (<View style={styles.overlay}>
        <ActivityIndicator size={60} color="#fb5438" />
    </View>);
}
const styles = StyleSheet.create({
    overlay: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 10
    }
})