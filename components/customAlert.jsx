import { Modal, Pressable, StyleSheet, View } from "react-native";
import { colors } from "../screens/style/defaultStyle";
import CustomText from "./customText";

export default function CustomAlert({visible, setVisible, content}) {
    return(<Modal animationType="fade" transparent={true} visible={visible}
    onRequestClose={() => setVisible(!visible)}>
    <View style={styles.modalArea}>
        <Pressable style={styles.touchArea} onPress={() => setVisible(!visible)}></Pressable>
        <View style={styles.alertContainer}>
            <CustomText style={{color: colors.main}}>작심10일</CustomText>
            <CustomText style={{marginTop: 10}}>{content}</CustomText>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 30}}>
                <View style={{ overflow: 'hidden', borderRadius: 8 }}>
                    <Pressable android_ripple={{ color: "#00000008" }} 
                        style={{ paddingHorizontal: 4, paddingVertical: 8 }}
                        onPress={() => setVisible(!visible)}>
                        <CustomText style={{fontSize: 12, color: colors.darkGray}}>취소</CustomText>
                    </Pressable>
                </View>
                <View style={{ overflow: 'hidden', borderRadius: 8, marginLeft: 16 }}>
                    <Pressable android_ripple={{ color: "#00000008", marginLeft: 10 }} style={{ paddingHorizontal: 4, paddingVertical: 8 }}>
                        <CustomText style={{fontSize: 12, color: colors.darkGray}}>확인</CustomText>
                    </Pressable>
                </View>
            </View>
        </View>
    </View>
</Modal>)
}
const styles = StyleSheet.create({
    modalArea: {
		flex: 1,
		alignItems: 'center',
        justifyContent: 'center'
	},
    touchArea: {
		width:'100%', 
		height: '100%', 
		position: 'absolute', 
		bottom: 0, 
		backgroundColor: '#00000075'
	},
    alertContainer: {
        width: '70%',
        borderRadius:10,
        padding: 24,
        paddingBottom: 18,
        backgroundColor: colors.bg
    }
})