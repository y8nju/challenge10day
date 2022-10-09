import { useEffect, useState } from "react";
import { StyleSheet, Pressable } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import CustomText from "./customText";

export default function TodoItem({ todoPress, data }) {
	const {item} = data;
	const [checked, setChecked] = useState(null);
	useEffect(() => {
		setChecked(!item.ing);
	}, []);

	return (<Pressable style={styles.totoItem} onPress={todoPress}>
		<BouncyCheckbox
			size={18}
			fillColor="#fb5438"
			isChecked={checked}
			disabled={checked}
			onPress={() => setChecked(!checked)} />
		<CustomText type={'hand'} style={checked ? { textDecorationLine: 'line-through' } :{ textDecorationLine: 'none' }  }>{item.todoText}</CustomText>
	</Pressable>);
}
const styles = StyleSheet.create({
	totoItem: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		paddingRight: 40, 
		marginBottom: 10
	}
})