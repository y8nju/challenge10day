import { StyleSheet, TouchableHighlight, View } from "react-native";
import CustomText from "./customText";

export default function CustomButton({onPress, title, color, style, disabled}) {
	return (<TouchableHighlight onPress={disabled ? null : onPress} 
		style={[{ overflow: 'hidden', borderRadius: 4}, style]}>
		<View style={[styles.button, color && {backgroundColor: color}, disabled && {backgroundColor: '#dfdfdf'}]}>
			<CustomText style={[styles.text, disabled && { color: '#a1a1a1' }]} weight={700} >{title}</CustomText>
		</View>
	</TouchableHighlight>)
}
const styles = StyleSheet.create({
	button: {
		backgroundColor: '#fb5438',
		padding: 14,
	},
	text: {
		fontSize: 12,
		textAlign: 'center',
		color: '#fff' 
	}
});