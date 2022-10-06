import { Text } from "react-native";

export default function CustomText({ children, style, weight, type }) {
	if (!type) {
		if (weight === 300) {
			return (<Text style={[{ fontFamily: 'Gmarket-Light' }, style]}>{children}</Text>)
		} else if (weight === 700) {
			return (<Text style={[{ fontFamily: 'Gmarket-Bold' }, style]}>{children}</Text>)
		} else if (!weight) {
			return (<Text style={[{ fontFamily: 'Gmarket-Medium' }, style]}>{children}</Text>)
		}
	} else if (type == 'hand') {
		return (<Text style={[{ fontFamily: 'Diary' }, style]}>{children}</Text>)
	}
}


