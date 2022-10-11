import { useState } from "react";
import { StyleSheet, Pressable } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import CustomText from "./customText";

export default function TodoItem({ todoPress, data }) {
	const [checked, setChecked] = useState(data.ing);
	console.log("data",data);

	return (<View style={styles.todoItem}>
		<BouncyCheckbox
			size={18}
			fillColor="#fb5438"
			isChecked={checked}
			disabled={checked}
			onPress={() => setChecked(!checked)} />
		<Pressable onPress={todoPress}>
			<CustomText type={'hand'} style={[checked ? { textDecorationLine: 'line-through' } : { textDecorationLine: 'none' }, { fontSize: 16 }]}>{data.todoText}</CustomText>
		</Pressable>
	</View>);
}
const styles = StyleSheet.create({
	todoItem: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		paddingRight: 40, 
		marginBottom: 10
	}
})