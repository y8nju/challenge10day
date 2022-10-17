import { useContext, useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, ToastAndroid, View } from "react-native"
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { readchallenge } from "../util/challengeAPI";

import defaultStyle, { colors } from "./style/defaultStyle"

import ChallengeItem from "../components/challengeItem";
import CustomText from "../components/customText";
import NotLogin from "../components/notLogin";
import IosToast from "../components/iosToast";
import NotContent from "../components/notContentComponent ";
import { AppContext } from "../context/app-context";

export default function HomeScreen({ navigation, route }) {
	const ctx = useContext(AppContext)
	const [loading, setLoading] = useState(false);
	const [challengetype, selChallengeType] = useState('ing'); // 진행 중: ing, 실패: false, 완료: success << 상태에 따라서 challengeList가 바뀜
	const [challengeList, setChallengeList] = useState([]);
	const [login, setLogin] = useState(ctx.value === null?false:true)
	const focused = useIsFocused();
	useEffect(() => {
		// setRefresh(true);
		if (route.params) {
			switch (route.params.status) {
				case 'signup':
					{
						Platform.OS === 'ios' ? IosToast('만나서 반가워요') :
							ToastAndroid.show("만나서 반가워요", ToastAndroid.SHORT);
					}
					// return navigation.dispatch(CommonActions.setParams({ status: '' }));
					navigation.navigate("HomeStack", { screen: 'home'});
					break;
				case 'login':
					{
						Platform.OS === 'ios' ? IosToast('어서오세요') :
							ToastAndroid.show("어서오세요", ToastAndroid.SHORT);
					}
					// return navigation.dispatch(CommonActions.setParams({ status: '' }));
					navigation.navigate("HomeStack", { screen: 'home'});
					break;
				case 'add':
					{
						Platform.OS === 'ios' ? IosToast('새로운 습관을 시작했어요') :
							ToastAndroid.show("새로운 습관을 시작했어요", ToastAndroid.SHORT);
					}
					// return navigation.dispatch(CommonActions.setParams({ status: '' }));
					navigation.navigate("HomeStack", { screen: 'home'});
					break;
				case 'deleted':
					{
						Platform.OS === 'ios' ? IosToast('습관을 지웠어요') :
							ToastAndroid.show("습관을 지웠어요", ToastAndroid.SHORT);
					}
					// return navigation.dispatch(CommonActions.setParams({ status: '' }));
					navigation.navigate("HomeStack", { screen: 'home'});
					break;
				case 'change':
					{
						Platform.OS === 'ios' ? IosToast('습관을 수정했어요') :
							ToastAndroid.show("습관을 수정했어요", ToastAndroid.SHORT)
					}
					// return navigation.dispatch(CommonActions.setParams({ status: '' }));
					navigation.navigate("HomeStack", { screen: 'home'});
					break;
			}
		}
		// setRefresh(false);
	}, [focused]);

	useEffect(() => {
		!async function () {
			if (login) {
				const response = await readchallenge(challengetype)
				if (response.type === true) {
					let data
					if(challengetype === "ing"){
						data = response.result.filter((elm)=>{
							if(elm.checked === true){
								if(elm.data[0]?.createAt == undefined){
									return elm
								} else if(elm.data[0]?.createAt !== undefined && (Date.now() - new Date(elm.data[0]?.createAt))<864000000){
									return elm
								}
							} else if((elm.checked === null || elm.checked === false)){
								if(elm.data[0]?.createAt == undefined){
									return elm
								} else if(elm.data[0]?.createAt !== undefined && (Date.now() - new Date(elm.data[elm.data.length-1].createAt)< 86400000)){
									return elm
								}
							}
						})
					} else if(challengetype === false){
						data = response.result.filter((elm)=>{
						if((elm.checked === null || elm.checked === false) && (Date.now() - new Date(elm.data[elm.data.length-1]?.createAt) > 86400000)){
								return elm
						}})
					} else if(challengetype === "success"){
						data = response.result.filter((elm)=>{
							if(elm.checked === true && (Date.now() - new Date(elm.data[0]?.createAt))>864000000){
								return elm
							} else if(elm.checked === null && elm.data.length === 10){
								return elm
							}
						})
					}
					setChallengeList(data??[])
				}
			}
		}();
	}, [challengetype,focused])

	return (<>{!login && <NotLogin />}
		{login && <View style={defaultStyle.wrap}>
			{loading && <LoadingOverlay />}
			<View style={{ flex: 1, paddingHorizontal: 26, paddingTop: 16 }}>
				<View style={{ marginBottom: 20 }}>
					<View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 'auto' }}>
						<CustomText style={{ fontSize: 20, textAlign: 'center', marginBottom: 4 }} weight={500}>오늘</CustomText>
						<CustomText style={{ fontSize: 12, textAlign: 'center' }}>{new Date().getMonth() + 1}월 {new Date().getDate()}일</CustomText>
					</View>
				</View>
				<View style={styles.row}>
					{/* 챌린지 타입 선택 */}
					<Pressable onPress={() => selChallengeType('ing')}
						style={[styles.selBtn, challengetype == 'ing' ? { backgroundColor: colors.darkGray } : { backgroundColor: '#fff' }]}>
						<CustomText style={[challengetype == 'ing' ? { color: '#fff' } : { color: colors.darkGray }]}>진행 중</CustomText>
					</Pressable>
					<Pressable onPress={() => selChallengeType('false')}
						style={[styles.selBtn, challengetype == 'false' ? { backgroundColor: colors.darkGray } : { backgroundColor: '#fff' }]}>
						<CustomText style={[challengetype == 'false' ? { color: '#fff' } : { color: colors.darkGray }]}>실패</CustomText>
					</Pressable>
					<Pressable onPress={() => selChallengeType('success')}
						style={[styles.selBtn, challengetype == 'success' ? { backgroundColor: colors.darkGray } : { backgroundColor: '#fff' }]}>
						<CustomText style={[challengetype == 'success' ? { color: '#fff' } : { color: colors.darkGray }]}>완료</CustomText>
					</Pressable>
				</View>
				{challengeList.length==0 && <NotContent type="챌린저스" />}
				{challengeList.length>0 && <FlatList style={{ flex: 1 }} data={challengeList}
					keyExtractor={({ _id }) => _id}
					renderItem={({ item }) => <ChallengeItem data={item} challengetype={challengetype} />}
				/>}
			</View>
			<View style={styles.addBtn}>
				<Pressable android_ripple={{ color: '#fff' }} onPress={() => navigation.navigate('challengeAdd')}
					style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<MaterialCommunityIcons name="plus" size={32} color="#fff" />
				</Pressable>
			</View>
		</View>}</>)
}
const styles = StyleSheet.create({
	addBtn: {
		position: 'absolute',
		width: 60,
		height: 60,
		bottom: 30,
		right: 24,
		borderRadius: 50,
		backgroundColor: colors.main,
		overflow: 'hidden',
		shadowColor: "#000",
		shadowOffset: {
			width: 2,
			height: 2,
		},
		shadowOpacity: 0.2,
		shadowRadius: 0.3,
		elevation: 2,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 8,
		marginBottom: 20,
	},
	selBtn: {
		borderRadius: 12,
		marginRight: 8,
		paddingVertical: 4,
		paddingHorizontal: 8,
	}
})