import { useState } from "react";
import { StyleSheet, Pressable, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { completedtodo } from "../util/todoAPI";

import CustomText from "./customText";


export default function TodoItem({ todoPress, data }) {
	const [checked, setChecked] = useState(data.ing);
	
	const completedHandle= async () =>{
		const response = await completedtodo(data._id,true)
		if(response.type === true){
			console.log(response);
			setChecked(!checked)
		}
	}

	return (<View style={styles.todoItem}>
		<BouncyCheckbox
			size={18}
			fillColor="#fb5438"
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