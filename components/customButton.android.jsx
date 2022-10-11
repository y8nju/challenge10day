import { Pressable, StyleSheet, TouchableHighlight, View } from "react-native";
import CustomText from "./customText";

export default function CustomButton({onPress, title, color, style, disabled}) {
	return (<View style={[{overflow: 'hidden', borderRadius: 4}, style]}>
		<Pressable onPress={onPress}
			android_ripple={{color: '#0000001c'}}
			disabled={disabled}
			style={[styles.button, color && {backgroundColor: color}, disabled && {backgroundColor: '#dfdfdf'} ]}>
			<CustomText style={[styles.text, disabled && { color: '#a1a1a1' }]} weight={700} >{title}</CustomText>
		</Pressable>
	</View>)
}
const styles = StyleSheet.create({
	button: {
		backgroundColor: '#fb5439',
		padding: 14,
	},
	text: {
		fontSize: 12,
		textAlign: 'center',
		color: '#fff' 
	}
});