import { useEffect, useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, View, TextInput, ToastAndroid } from "react-native";
import { CommonActions } from "@react-navigation/native";

import defaultStyle from "../style/defaultStyle";

import LoadingOverlay from "../../components/loadingOverlay";
import CustomText from "../../components/customText";
import HeaderRightButton from "../../components/headerRightButton";
import CustomButton from "../../components/customButton";
import TodoItem from "../../components/todoItem";

const dumi = [
	// test 를 위한 더미 데이터!
	{_id: 1, todoText: '아이고', ing: true}
]
// 해당 페이지 구현 완료 후, lodaing 액션 추가

export default function TodoScreen({ navigation, route }) {
	const [loading, setLoading] = useState(false);
	const [addModalVisible, setAddModalVisible] = useState(false);
	const [updateModalVisible, setUpdateModalVisible] = useState(false);
	const [checkedTodoText, setCheckedTodoText] = useState('');
	const [todoList, setTodoList] = useState(dumi)
	const [toto, setTodo] = useState('')

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => <HeaderRightButton style={{ marginRight: 16 }} onPress={() => setAddModalVisible(true)}>추가</HeaderRightButton>
		});
	}, []);

	useEffect(()=> {
		if(route.params) {
			switch(route.params.status) {
				case 'add':
					ToastAndroid.show("새로운 투투가 추가됐어요", ToastAndroid.SHORT);
					return navigation.dispatch(CommonActions.setParams({ status: '' }));
			}
		}
	}, [route]);

	const todoAddHandle = () => {
		// todo 추가 
		setLoading(true);
		!async function () {
			try {
				navigation.navigate('todoIng', { status: 'add' });
			} catch (e) {
				console.log(e);
			}
			setLoading(false);
		}();
	}
	const todoAdjustmentHandle = (text) => {
		// todo 눌렀을 때 수정하는 modal open, 기존 todo 내용 modal에 전달
		setUpdateModalVisible(true);
		setCheckedTodoText(text)	// 여기에 수정할 todo text 들어옴
	}
	const todoUpdateHandle = () => {
		// todo 수정
		setUpdateModalVisible(false);
	}
	return (<View style={defaultStyle.wrap}>
		{loading && <LoadingOverlay />}
		<View style={{ paddingHorizontal: 24, flex: 1 }}>
			{/* <TodoItem todoPress={todoAdjustmentHandle} /> */}
			<FlatList style={{flex: 1}}
				data={todoList}
				keyExtractor={({_id})=> _id}
				renderItem={({item}) => <TodoItem todoPress={()=> todoAdjustmentHandle(item.todoText)} data={item} />}
			/>
			<CustomText style={{fontSize: 12, textAlign: 'center', lineHeight: 18}} weight={300}>Todo를 탭 해서 수정하세요! {'\n'} 완료한 Todo는 수정할 수 없어요!</CustomText>
		</View>
		{/* 추가 모달 */}
		<Modal animationType="slide" transparent={true} visible={addModalVisible}
			onRequestClose={() => setAddModalVisible(false)}>
			<View style={styles.modalArea}>
				<Pressable style={styles.touchArea} onPress={() => setAddModalVisible(false)}></Pressable>
				<View style={styles.modalContent}>
					<TextInput style={[defaultStyle.input, { backgroundColor: '#fff', marginBottom: 16 }]}
						value={toto}
						autoCapitalize='none'
						onChangeText={(txt) => setTodo(txt)}
						placeholder="할 일을 적어주세요" />
					<CustomButton title={"확인"} onPress={todoAddHandle} />
				</View>
			</View>
		</Modal>
		{/* 수정 모달 */}
		<Modal animationType="slide" transparent={true} visible={updateModalVisible}
			onRequestClose={() => setUpdateModalVisible(false)}>
			<View style={styles.modalArea}>
				<Pressable style={styles.touchArea} onPress={() => setUpdateModalVisible(false)}></Pressable>
				<View style={styles.modalContent}>
					<TextInput style={[defaultStyle.input, { backgroundColor: '#fff', marginBottom: 16 }]}
						value={checkedTodoText}
						autoCapitalize='none'
						onChangeText={(txt) => setCheckedTodoText(txt)} />
					<View style={{ flexDirection: 'row' }}>
						<View style={{ flex: 1 }}>
							<CustomButton title={"취소"} color={"#ddd"} onPress={()=> setUpdateModalVisible(false)} />
						</View>
						<View style={{ flex: 1, marginLeft: 10 }}>
							<CustomButton title={"수정"} onPress={todoUpdateHandle} />
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