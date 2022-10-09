import { StyleSheet } from "react-native";

export default defaultStyle = StyleSheet.create({
	wrap: {
		flex: 1,
		paddingVertical: 30,
		backgroundColor: '#f2f2f2',
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
		borderColor: '#ddd',
		borderRadius: 4,
		backgroundColor: '#f2f2f2',
		padding: 10,
	},
	inputTitle: {
		marginBottom: 8,
	},
	textArea: {
		fontSize: 16,
		fontFamily: 'Diary',
		textAlign: 'justify',
		lineHeight: 24,
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 4,
		backgroundColor: '#f2f2f2',
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