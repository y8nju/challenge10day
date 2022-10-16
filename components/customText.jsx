import { Text } from "react-native";
import { colors } from "../screens/style/defaultStyle";

export default function CustomText({ children, style, weight, type }) {
	if (!type) {
		if (weight === 300) {
			return (<Text style={[{ fontFamily: 'Neo-Lt', color: colors.black }, style]}>{children}</Text>)
		} else if (weight === 500) {
			return (<Text style={[{ fontFamily: 'Neo-Bd', color: colors.black }, style]}>{children}</Text>)
		} else if (weight === 800) {
			return (<Text style={[{ fontFamily: 'Neo-Eb', color: colors.black }, style]}>{children}</Text>)
		} else if (!weight) {
			return (<Text style={[{ fontFamily: 'Neo-Rg', color: colors.black }, style]}>{children}</Text>)
		}
	} else if (type == 'hand') {
		return (<Text style={[{ fontFamily: 'Goyang', color: colors.black }, style]}>{children}</Text>)
	}
}


