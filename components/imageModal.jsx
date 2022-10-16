import { Modal, StyleSheet, View } from "react-native"
import Canvasitem from "./canvasitem"

export default function ImageModal({ onPress,onImg64,imageModalVisible, setImageModalVisible,datauri}) {
    return(<Modal animationType="slide" transparent={true} visible={imageModalVisible}
    onRequestClose={()=>{onPress(false)}}>
    <View style={styles.modalArea}>
        {/* <Pressable style={styles.touchArea} onPress={onPress}></Pressable> */}
        <View style={styles.modalContent}>
            <Canvasitem onPress={onPress} onImg64={onImg64} datauri={datauri} />
        </View>

    </View>
</Modal>)
}
const styles = StyleSheet.create({
	modalArea: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
	touchArea: {
		width: '100%',
		height: '100%',
		backgroundColor: '#000',
	},
	modalContent: {
		marginTop: 'auto',
		width: '100%',
		backgroundColor: '#fff',
		overflow: 'hidden',
	}
})
