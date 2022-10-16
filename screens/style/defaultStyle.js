import { StyleSheet } from "react-native";


export const colors ={
	main: '#fb5438', 
	sub: '#ffba5d',
	mid: '#e1d3c1',
	black: '#504d49',
	darkGray: '#8e8e8f',
	gray: '#ddd',
	lightGray: '#ededed',
	bg: '#f2f2f2'
}

export default defaultStyle = StyleSheet.create({
	wrap: {
		flex: 1,
		paddingVertical: 30,
		backgroundColor: colors.bg,
		position: 'relative'
	},
	inputArea: {
		paddingHorizontal: 24,
		marginBottom: 16
	},
	input: {
		height: 40,
		fontFamily: 'Neo-Rg',
		borderWidth: 1,
		borderColor: colors.gray,
		borderRadius: 4,
		backgroundColor: colors.bg,
		padding: 10,
	},
	inputTitle: {
		marginBottom: 8,
	},
	textArea: {
		fontSize: 18,
		fontFamily: 'Goyang',
		textAlign: 'justify',
		lineHeight: 24,
		borderWidth: 1,
		borderColor: colors.gray,
		borderRadius: 4,
		backgroundColor: colors.bg,
		padding: 10,
		textAlignVertical: "top",
	},
	chkTxt: {
		color: "#ff5d5d"
	},
	accountBtnArea: {
		paddingHorizontal: 24,
		marginTop: 12
	}
})