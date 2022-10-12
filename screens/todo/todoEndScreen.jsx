import { useEffect, useState } from "react";
import { Alert, FlatList, ToastAndroid, View } from "react-native";
import { CommonActions, useIsFocused } from "@react-navigation/native";

import defaultStyle from "../style/defaultStyle";

import LoadingOverlay from "../../components/loadingOverlay";
import CustomText from "../../components/customText";
import TodoItem from "../../components/todoItem";
import { deletetodo, getcompletedtodo } from "../../util/todoAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NotLogin from "../../components/notLogin";
import NotContent from "../../components/notContentComponent ";

export default function TodoEndScreen({ navigation, route }) {
	const [loading, setLoading] = useState(false);
	const [todoList, setTodoList] = useState({});
	const focused = useIsFocused();
	const [login,setLogin] = useState(false);

	useEffect(() => {
		AsyncStorage.getItem("authentication").then((data) => {
			const token = JSON.parse(data)
			console.log("token", token == null);
			if (token == null) {
				setLogin(false)
			} else {
				setLogin(true)
			}
		})
	}, [])

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => <></>
		});
		!async function () {
			const data = await AsyncStorage.getItem("authentication");
			if(data === null){
				return;
			}
			const truetodo = await getcompletedtodo(true);
			setTodoList(truetodo.data);
		}();
	}, [focused]);
	useEffect(() => {
		if (route.params) {
			switch (route.params.status) {
				case 'delete':
					ToastAndroid.show("Todo를 삭제했어요", ToastAndroid.SHORT);
					return navigation.dispatch(CommonActions.setParams({ status: '' }));
			}
		}
	}, [focused])
	const todoDeleteHandle = (id, text) => {
		Alert.alert("작심10일", `"${text}" 를 삭제할까요?`, [
			{
				text: '취소'
			}, {
				text: '삭제',
				onPress: () => {
					setLoading(true);
					!async function () {
						try {
							const response = await deletetodo(id);
							if (response.type) {
								const truetodo = await getcompletedtodo(true);
								setTodoList(truetodo.data);
								navigation.navigate("todoEnd", { status: 'delete' });
							} else {
								Alert.alert("전송에러", "현재서버와 연결이 원활하지 않습니다.")
							}

						} catch (e) {
							Alert.alert('작심10일', `"${text}" 가 삭제되지 않았어요`)
							console.log(e.message);
						}
						setLoading(false);
					}();

				}
			}
		])
	}
	return (<>
	{!login && <NotLogin />}
	{todoList?.length === 0 && <NotContent type={"투두"} />}
	{login && todoList?.length > 0 && <View style={defaultStyle.wrap}>
		{loading && <LoadingOverlay />}
		<View style={{ paddingHorizontal: 24, flex: 1 }}>
			<FlatList style={{ flex: 1 }}
				data={todoList}
				keyExtractor={({ _id }) => _id}
				renderItem={({ item }) => <TodoItem todoPress={() => todoDeleteHandle(item._id, item.todoText)} data={item} />}
			/>
			<CustomText style={{ fontSize: 12, textAlign: 'center' }} weight={300}>Todo를 탭 해서 삭제하세요!</CustomText>
		</View>
	</View>}</>)
}