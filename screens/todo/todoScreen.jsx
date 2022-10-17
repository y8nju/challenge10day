import { useContext, useEffect, useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, View, TextInput, ToastAndroid, Alert, KeyboardAvoidingView } from "react-native";
import { CommonActions, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { addtodo, completedtodo, getcompletedtodo, updatetodo } from "../../util/todoAPI";

import defaultStyle, { colors } from "../style/defaultStyle";

import LoadingOverlay from "../../components/loadingOverlay";
import CustomText from "../../components/customText";
import HeaderRightButton from "../../components/headerRightButton";
import CustomButton from "../../components/customButton";
import TodoItem from "../../components/todoItem";
import NotLogin from "../../components/notLogin";
import NotContent from "../../components/notContentComponent ";
import IosToast from "../../components/iosToast";
import { AppContext } from "../../context/app-context";

// 해당 페이지 구현 완료 후, lodaing 액션 추가

export default function TodoScreen({ navigation, route }) {
	const ctx = useContext(AppContext)
	const [loading, setLoading] = useState(false);
	const [addModalVisible, setAddModalVisible] = useState(false);
	const [updateModalVisible, setUpdateModalVisible] = useState(false);
	const [checkedTodoText, setCheckedTodoText] = useState({ id: '', todoText: '' });
	const [todoList, setTodoList] = useState({})
	const [toto, setTodo] = useState('')
	const focused = useIsFocused();
	const [login,setLogin] = useState(ctx.value === null?false:true);

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => <HeaderRightButton style={{ marginRight: 16 }} onPress={() => setAddModalVisible(true)}>추가</HeaderRightButton>
		});
		!async function () {
			const data = await AsyncStorage.getItem("authentication");
			if(data === null){
				return;
			}
			const falsetodo = await getcompletedtodo(false);
			setTodoList(falsetodo);
		}();

	}, [focused]);

	useEffect(() => {
		if (route.params) {
			switch (route.params.status) {
				case 'add':
					{
						Platform.OS === 'ios' ? IosToast('새로운 투투가 추가됐어요') :
						ToastAndroid.show("새로운 투투가 추가됐어요", ToastAndroid.SHORT);
					}
					return navigation.dispatch(CommonActions.setParams({ status: '' }));
			}
		}
	}, [route]);

	const todoAddHandle = () => {
		// todo 추가 
		setLoading(true);
		!async function () {
			try {
				if(toto.trim().length>0){
				const response = await addtodo(toto)
				if (response.type) {
					navigation.navigate('todoIng', { status: 'add' });
					!async function () {
						const falsetodo = await getcompletedtodo(false);
						setTodoList(falsetodo);
					}();
					setAddModalVisible(false)
				}
			} else {
				Alert.alert("추가","공백이 아닌 단어를 하나라도 입력해주세요!")
			}
			} catch (e) {
				console.log(e);
			}
			setTodo('');
			setLoading(false);
		}();
	}
	const todoAdjustmentHandle = (id, text) => {
		// todo 눌렀을 때 수정하는 modal open, 기존 todo 내용 modal에 전달
		setUpdateModalVisible(true);
		setCheckedTodoText({ id: id, todoText: text })	// 여기에 수정할 todo text 들어옴
	}
	const todoUpdateHandle = async () => {
		// todo 수정

		const response = await updatetodo(checkedTodoText.id, checkedTodoText.todoText)
		if (response.type) {
			setUpdateModalVisible(false);
			navigation.navigate('todoIng', { status: 'update' });
			!async function () {
				const falsetodo = await getcompletedtodo(false);
				setTodoList(falsetodo);
			}(); 
		} else {
			Alert.alert("전송에러", "현재서버와 연결이 원활하지 않습니다.")
		}

	}
	const completedHandle = async (id) => {
		let response = await completedtodo(id,true)
		if(response.type===true){
			const falsetodo = await getcompletedtodo(false);
			setTodoList(falsetodo);
		}
		return response
	}
	


	return (<>{!login && <NotLogin />}
	{login &&<View style={defaultStyle.wrap}>
		{loading && <LoadingOverlay />}
		{todoList.data?.length === 0 && <NotContent type="투두" />}
		{todoList.data?.length > 0 && <View style={{ paddingHorizontal: 24, flex: 1 }}>
			{/* <TodoItem todoPress={todoAdjustmentHandle} /> */}
			<FlatList style={{ flex: 1 }}
				data={todoList.data}
				keyExtractor={({ _id }) => _id}
				renderItem={({ item }) => <TodoItem completedPress={()=>{return completedHandle(item._id)}} todoPress={() => todoAdjustmentHandle(item._id, item.todoText)} data={item} />}
			/>
			<CustomText style={{ fontSize: 12, textAlign: 'center', lineHeight: 18 }} weight={300}>Todo를 탭 해서 수정하세요! {'\n'} 완료한 Todo는 수정할 수 없어요!</CustomText>
		</View>}
		{/* 추가 모달 */}
		<Modal animationType="slide" transparent={true} visible={addModalVisible}
			onRequestClose={() => setAddModalVisible(false)}>
				<KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
			<View style={styles.modalArea}>
				<Pressable style={styles.touchArea} onPress={() => setAddModalVisible(false)}></Pressable>
				<View style={styles.modalContent}>
					<TextInput style={[defaultStyle.input, { backgroundColor: '#fff', marginBottom: 16 }]}
						value={toto}
						autoCapitalize='none'
						onChangeText={(txt) => setTodo(txt)}
						placeholder="할 일을 적어주세요"
						placeholderTextColor="#656565" />

					<CustomButton title={"확인"} onPress={todoAddHandle} />
				</View>
			</View>
			</KeyboardAvoidingView>
		</Modal>
		{/* 수정 모달 */}
		<Modal animationType="slide" transparent={true} visible={updateModalVisible}
			onRequestClose={() => setUpdateModalVisible(false)}>
			<KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>				
			<View style={styles.modalArea}>
				<Pressable style={styles.touchArea} onPress={() => setUpdateModalVisible(false)}></Pressable>
				<View style={styles.modalContent}>
					<TextInput style={[defaultStyle.input, { backgroundColor: '#fff', marginBottom: 16 }]}
						value={checkedTodoText.todoText}
						autoCapitalize='none'
						onChangeText={(txt) => setCheckedTodoText({ ...checkedTodoText, todoText: txt })} />
					<View style={{ flexDirection: 'row' }}>
						<View style={{ flex: 1 }}>
							<CustomButton title={"취소"} color={colors.gray} onPress={() => setUpdateModalVisible(false)} />
						</View>
						<View style={{ flex: 1, marginLeft: 10 }}>
							<CustomButton title={"수정"} onPress={todoUpdateHandle} />
						</View>
					</View>
				</View>
			</View>
			</KeyboardAvoidingView>
		</Modal>
	</View>}</>)
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