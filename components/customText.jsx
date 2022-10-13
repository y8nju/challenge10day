import { Text } from "react-native";

export default function CustomText({ children, style, weight, type }) {
	if (!type) {
		if (weight === 300) {
			return (<Text style={[{ fontFamily: 'Neo-Lt', color: '#504d49' }, style]}>{children}</Text>)
		} else if (weight === 500) {
			return (<Text style={[{ fontFamily: 'Neo-Bd', color: '#504d49' }, style]}>{children}</Text>)
		} else if (weight === 800) {
			return (<Text style={[{ fontFamily: 'Neo-Eb', color: '#504d49' }, style]}>{children}</Text>)
		} else if (!weight) {
			return (<Text style={[{ fontFamily: 'Neo-Rg', color: '#504d49' }, style]}>{children}</Text>)
		}
	} else if (type == 'hand') {
		return (<Text style={[{ fontFamily: 'Goyang', color: '#504d49' }, style]}>{children}</Text>)
	}
}


