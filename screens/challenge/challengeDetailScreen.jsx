import { useEffect, useState } from "react";
import { Keyboard, TouchableWithoutFeedback, View, FlatList, StyleSheet, Pressable, Modal, Button, TextInput, Image, Dimensions, ImageBackground, Alert } from "react-native";
import { format } from "date-fns";
import ko from "date-fns/esm/locale/ko/index.js";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Emoji from "../../util/emoji";

import defaultStyle from "../style/defaultStyle";

import LoadingOverlay from "../../components/loadingOverlay";
import CustomText from "../../components/customText";
import HeaderRightButton from "../../components/headerRightButton";
import { deletechallenge } from "../../util/challengeAPI";
import ConfirmItem from "../../components/confirmItem";
import { adddata } from "../../util/dataAPI";

const windowWidth = Dimensions.get('window').width;


export default function ChallengeDetailScreen({ navigation, route }) {
	const { data } = route.params
	const [loading, setLoading] = useState(false);
	const [confirmList, setConfirmList] = useState([]);
	const [addModalVisible, setAddModalVisible] = useState(false);
	const [content, setContent] = useState('');
	const [emoji, setEmoji] = useState(null);
	const [dayd,setDayd] = useState(null);

	useEffect(() => {
		//========================인증 데이터 조건 
		let confirmArr = []
		for (let i = 1; i <= 10; i++) {
			if(i !== 1){
				confirmArr.push({ day: i, num: i });
			} else {
				confirmArr.push({ day: 0, num: i });
			}
		};
		let newArr = []
		if(data.data.length > 0){
		let afterArr = data.data.sort((a,b)=>a.day-b.day)
		for(let i = 0;i<afterArr[afterArr.length-1].day;i++){
			if(afterArr[i]?.day){
				newArr[afterArr[i]?.day-1] = afterArr[i]
			}
			if(newArr[i] === undefined){
				newArr[i] = ({day:null,confirm:false})
			}
		}
	}
		let confirmArr2 = newArr
		let confirmArr3;
		if (confirmArr2.length > 0) {
			let today = new Date().getDate();
			let lastDate = new Date(confirmArr2[confirmArr2.length - 1].createdAt).getDate();
			if (today - lastDate == 1) {
				confirmArr2.push({ day: 0, num: confirmArr2.length + 1 });
			} else if (today - lastDate > 1) {
				confirmArr2.push({ day: confirmArr2.length + 1, confirm: false });
				confirmArr2.push({ day: 0, num: confirmArr2.length + 2 });
			}
			confirmArr3 = confirmArr2.concat(confirmArr.slice(-(confirmArr.length - confirmArr2.length)));
			setConfirmList(confirmArr3);
		} else {
			confirmArr3 = confirmArr;
			setConfirmList(confirmArr3);
		}
		//========================
	}, [addModalVisible])

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => <HeaderRightButton onPress={deleteHandle}>
				삭제
			</HeaderRightButton>
		});
	})
	const deleteHandle = () => {
		Alert.alert("작심10일", "습관을 삭제할까요?", [
			{
				text: '취소'
			}, {
				text: '삭제',
				onPress: () => {
					setLoading(true);
					!async function () {
						try {
							let response = await deletechallenge(data._id)
							if (response.type === true) {
								navigation.navigate('home', { status: 'deleted' });
							} else {
								Alert.alert("에러", "현재 서버와 통신이 원할하지 않습니다.")
							}
						} catch (e) {
							console.log(e);
						}
					}();
					setLoading(false);
				}
			}
		])
	}
	const confirmHandle = async () => {
		if(emoji !== null && content.trim().length > 0){
			const response = await adddata("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",dayd,emoji,content,data._id)
			if(response.type === true){
				const response = await readonechallenge(data._id)
				data = response
				setAddModalVisible(false)
			} else {
				Alert.alert("에러","현재 서버와 통신이 원활하지 않습니다.")
			}
		} else {
			Alert.alert("알림","이모지와 멘트를 남겨 주셔야 해요!!");
		}
		
		
	}

	const modalHandle = (num) => {
		setDayd(num)
		setAddModalVisible(true)
	}
	
	function EmojiItem({ data }) {
		return (<Pressable onPress={() => setEmoji(data.id)}
			style={[styles.emojiItem, emoji == data.id && { backgroundColor: '#e1d3c14d' }]}>
			<Image source={data.uri} resizeMode='cover' style={styles.emojiIcon} />
			<CustomText style={[{ textAlign: 'center', marginTop: 2, color: '#8e8e8f' }, emoji == data.id && { color: '#504d49' }]} type={'hand'}>{data.name}</CustomText>
		</Pressable>)
	}

	return (<TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
		<View style={defaultStyle.wrap}>
			{loading && <LoadingOverlay />}
			<View style={{ flex: 1, paddingHorizontal: 26 }}>
				<View style={{ marginBottom: 20, alignItems: 'center' }}>
					<CustomText style={{ fontSize: 20, color: '#fb5438' }} weight={700}>{data.title}</CustomText>
					<CustomText style={{ color: '#8e8e8f', marginTop: 8 }}>{format(new Date(data.createdAt), 'P', { locale: ko })} ~</CustomText>
				</View>
				<View>
					{confirmList ? <FlatList data={confirmList}
						keyExtractor={({ day }) => day}
						renderItem={({ item }) => <ConfirmItem onModal={modalHandle} data={item} />}
						numColumns={4}
					/> : <></>}
				</View>
				<View style={{ marginTop: 30, alignItems: 'center', flex: 1 }}>
					<CustomText style={{ fontSize: 16, color: '#8e8e8f' }} type={'hand'}>
						스티커는 하루 한 번만 붙일 수 있어요
					</CustomText>
				</View>
			</View>
			<Modal animationType="slide" transparent={true} visible={addModalVisible}
				onRequestClose={() => setAddModalVisible(false)}>
				<View style={styles.modalArea}>
					<Pressable style={styles.touchArea} onPress={() => setAddModalVisible(false)}></Pressable>
					<View style={styles.modalContent}>
						<View style={styles.modalHeader}>
							<Pressable style={{ paddingHorizontal: 20, paddingVertical: 10 }} onPress={() => setAddModalVisible(false)}>
								<CustomText>취소</CustomText>
							</Pressable>
							<CustomText weight={700} style={{ fontSize: 20 }}>인증하기</CustomText>
							<Pressable style={{ paddingHorizontal: 20, paddingVertical: 10 }} onPress={confirmHandle}>
								<CustomText>인증</CustomText>
							</Pressable>
						</View>
						<View style={{ padding: 40, paddingTop: 0 }}>
							<View style={{ marginBottom: 10 }}>
								<FlatList data={Emoji}
									keyExtractor={({ id }) => id}
									renderItem={({ item }) => <EmojiItem data={item} />}
									horizontal
									showsHorizontalScrollIndicator={false}
									scrollEnabled={false}
								/>
							</View>
							<View style={{ flexDirection: 'row' }}>
								{/* 카메라 */}
								<Pressable style={styles.cameraArea}>
									<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
										<MaterialCommunityIcons name="camera-enhance" size={34} color="#bdbdbd" />
									</View>
								</Pressable>
								<TextInput style={[defaultStyle.textArea, { flex: 1, height: 110, backgroundColor: '#fff', marginLeft: 10 }]}
									value={content}
									multiline
									onChangeText={(txt) => setContent(txt)}
									placeholder="인증기록을 남겨보세요" />
							</View>
						</View>
					</View>
				</View>
			</Modal>
		</View>
		{/* 인증 모달 */}
	</TouchableWithoutFeedback>)
}
const styles = StyleSheet.create({
	itemArea: {
		width: (windowWidth - 52 - (8 * 8)) / 4,
		height: (windowWidth - 52 - (8 * 8)) / 4,
		borderRadius: 50,
		margin: 8,
		justifyContent: 'center',
		alignItems: 'center'
	},
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
	modalHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: 30,
		paddingHorizontal: 20,
		marginBottom: 20
	},
	modalContent: {
		marginTop: 'auto',
		width: '100%',
		borderTopLeftRadius: 32,
		borderTopRightRadius: 32,
		backgroundColor: '#fff',
		overflow: 'hidden',
	},
	cameraArea: {
		width: 110,
		height: 110,
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 4,
		backgroundColor: "#ededed",
	},
	emojiItem: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 8,
		marginRight: 1,
		padding: 2,
		paddingBottom: 4,
	},
	emojiIcon: {
		width: (windowWidth - 80 - 5 - (4 * 6)) / 6,
		height: (windowWidth - 80 - 5 - (4 * 6)) / 6,
	}
})
