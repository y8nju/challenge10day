import { useEffect, useState } from "react";
import { Button, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { TextInput } from "react-native-gesture-handler";
import CustomText from "../../components/customText";
import HeaderRightButton from "../../components/headerRightButton";
import TodoItem from "../../components/todoItem";
import defaultStyle from "../style/defaultStyle";

export default function TodoScreen({ navigation }) {
	const [addModalVisible, setAddModalVisible] = useState(false);
	const [updateModalVisible, setUpdateModalVisible] = useState(false);
	const [checkedTodoText, setCheckedTodoText] = useState();
	const [toto, setTodo] = useState('')

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => <HeaderRightButton style={{ marginRight: 16 }} onPress={todoAddHandle}>추가</HeaderRightButton>
		});

	})
	const todoAddHandle = () => {
		setAddModalVisible(true);
	}
	const todoUpdateHandle = () => {
		setUpdateModalVisible(true);
		setCheckedTodoText()	// 여기에 투두 내용 들어옴
	}
	return (<View style={defaultStyle.wrap}>
		<View style={{ paddingHorizontal: 24, flex: 1 }}>
			<TodoItem onPress={todoUpdateHandle} />
		</View>
		{/* 추가 모달 */}
		<Modal animationType="slide" transparent={true} visible={addModalVisible}
			onRequestClose={() => setAddModalVisible(false)}>
			<View style={styles.modalArea}>
				<Pressable style={styles.touchArea} onPress={() => setAddModalVisible(!addModalVisible)}></Pressable>
				<View style={styles.modalContent}>
					<TextInput style={[defaultStyle.input, { backgroundColor: '#fff', marginBottom: 16 }]}
						value={toto}
						autoCapitalize='none'
						onChangeText={(txt) => setTodo(txt)}
						placeholder="할 일을 적어주세요" />
					<Button title="확인" color="#fb5438" />
				</View>
			</View>
		</Modal>
		{/* 수정 모달 */}
		<Modal animationType="slide" transparent={true} visible={updateModalVisible}
			onRequestClose={() => setUpdateModalVisible(false)}>
			<View style={styles.modalArea}>
				<Pressable style={styles.touchArea} onPress={() => setUpdateModalVisible(!updateModalVisible)}></Pressable>
				<View style={styles.modalContent}>
					<TextInput style={[defaultStyle.input, { backgroundColor: '#fff', marginBottom: 16 }]}
						value={toto}
						autoCapitalize='none'
						onChangeText={(txt) => setTodo(txt)}
						placeholder="여기에 클릭한 투두 내용 들어온다요" />
					<View style={{ flexDirection: 'row' }}>
						<View style={{ flex: 1 }}>
							<Button title="취소" color="#ddd" />
						</View>
						<View style={{ flex: 1, marginLeft: 10 }}>
							<Button title="수정" color="#fb5438" />
						</View>
					</View>
				</View>
			</View>
		</Modal>
	</View>)
}

const styles = StyleSheet.create({
	modalArea: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1
	},
	touchArea: {
		width: '100%',
		height: '100%',
		position: 'absolute',
		backgroundColor: '#00000075'
	},
	modalContent: {
		marginTop: 'auto',
		width: '100%',
		borderTopLeftRadius: 32,
		borderTopRightRadius: 32,
		backgroundColor: '#fff',
		overflow: 'hidden',
		padding: 40
	},
})