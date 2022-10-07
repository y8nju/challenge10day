import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import CustomText from "./customText";

export default function TodoItem({ onPress }) {
    const [checked, setChecked] = useState(false);
    useEffect(() => {

    })
    return (<Pressable style={styles.totoItem} onPress={onPress}>
        <BouncyCheckbox
            size={18}
            fillColor="#fb5438"
            isChecked={checked}
            onPress={() => setChecked(!checked)} />
        <CustomText style={checked && { textDecorationLine: 'line-through' }}>투두내용</CustomText>
    </Pressable>);
}
const styles = StyleSheet.create({
    totoItem: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 40
    }
})