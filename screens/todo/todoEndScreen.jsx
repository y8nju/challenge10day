import { useEffect, useState } from "react";
import { Alert, FlatList, Text, ToastAndroid, View } from "react-native";
import { CommonActions, useIsFocused } from "@react-navigation/native";

import defaultStyle from "../style/defaultStyle";

import LoadingOverlay from "../../components/loadingOverlay";
import CustomText from "../../components/customText";
import TodoItem from "../../components/todoItem";

const dumi = [
	// test 를 위한 더미 데이터!
	{_id: 1, todoText: '아이고', ing: true}
]

export default function TodoEndScreen({ navigation, route }) {
	const [loading, setLoading] = useState(false);
	const [todoList, setTodoList] = useState(dumi);
	const focused = useIsFocused();

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => <></>
		});
	});
	useEffect(()=> {
		if(route.params) {
			switch(route.params.status) {
				case 'delete':
					ToastAndroid.show("Todo를 삭제했어요", ToastAndroid.SHORT);
					return navigation.dispatch(CommonActions.setParams({ status: '' }));
			}
		}
	}, [focused])
	const todoDeleteHandle = (text) => {
		Alert.alert("작심10일", `"${text}" 를 삭제할까요?`, [
			{
				text: '취소'
			}, {
				text: '삭제',
				onPress: () => {
					setLoading(true);
					!async function () {
						try {
							navigation.navigate("todoEnd", { status: 'delete' });

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
	return (<View style={defaultStyle.wrap}>
		{loading && <LoadingOverlay />}
		<View style={{ paddingHorizontal: 24, flex: 1 }}>
			<FlatList style={{flex: 1}}
				data={todoList}
				keyExtractor={({_id})=> _id}
				renderItem={(one) => <TodoItem todoPress={() => todoDeleteHandle(one.item.todoText)} data={one}/>}
			/>
			<CustomText style={{fontSize: 12, textAlign: 'center'}} weight={300}>Todo를 탭 해서 삭제하세요!</CustomText>
		</View>
	</View>)
}