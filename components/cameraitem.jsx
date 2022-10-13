import { MaterialCommunityIcons } from '@expo/vector-icons';
import { launchCameraAsync, PermissionStatus, useCameraPermissions } from "expo-image-picker";
import { Alert, Pressable, StyleSheet, View } from 'react-native';


export default function Cameraitem({onPress}) {

    const [cameraPermission, requestCameraPermission] = useCameraPermissions();


    // 카메라 ============================================
    const takeFromCamera = async () => {
        if (cameraPermission.status === PermissionStatus.UNDETERMINED ||
            cameraPermission.status === PermissionStatus.DENIED) {
            try {
                const resp = await requestCameraPermission();
                if (!resp.granted) {
                    Alert.alert("접근 권한", "이기능은 카메라 접근권한이 필요합니다.");
                    return;
                }
            } catch (e) {
                console.log(e);
                return;
            }
        }
        const result = await launchCameraAsync({
            quality: 0.4,
            allowsEditing: true,
            aspect: [1, 1],
            exif: true,
            base64: true
        });
        if (!result.cancelled) {
            onPress(result.uri)
        }
    }
    //============================

    return (<>
        <Pressable onPress={takeFromCamera} style={styles.cameraArea}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <MaterialCommunityIcons name="camera-enhance" size={34} color="#bdbdbd" />
            </View>
        </Pressable>

    </>);
}

const styles = StyleSheet.create({
    cameraArea: {
		width: 110,
		height: 110,
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 4,
		backgroundColor: "#ededed",
	},
})