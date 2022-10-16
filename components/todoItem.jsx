import { useState } from "react";
import { StyleSheet, Pressable, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { colors } from "../screens/style/defaultStyle";
import { completedtodo } from "../util/todoAPI";

import CustomText from "./customText";

export default function TodoItem({ completedPress,todoPress, data }) {
	const [checked, setChecked] = useState(data.ing);
	
	const completedHandle= async () =>{
		const response = await completedPress()
		if(response.type === true){
			setChecked(!checked)
		}
	}

	return (<View style={styles.todoItem}>
		<BouncyCheckbox
			size={18}
			fillColor={colors.main}
			isChecked={checked}
			disabled={checked}
			onPress={completedHandle}/>
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