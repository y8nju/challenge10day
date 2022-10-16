import { useEffect, useState } from "react";
import { Keyboard, TouchableWithoutFeedback, View, FlatList, StyleSheet, Pressable, Modal, Button, TextInput, Image, Dimensions, ImageBackground, Alert, KeyboardAvoidingView } from "react-native";
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
import Cameraitem from "../../components/cameraitem";
import Canvasitem from "../../components/canvasitem";
import ImageModal from "../../components/imageModal";

import * as Notifications from 'expo-notifications';

const windowWidth = Dimensions.get('window').width;


export default function ChallengeDetailScreen({ navigation, route }) {
	const { data } = route.params
	const [loading, setLoading] = useState(false);
	const [confirmList, setConfirmList] = useState([]);
	const [confirmBtn,setConfirmBtn] = useState(false);
	const [addModalVisible, setAddModalVisible] = useState(false);
	const [imageModalVisible, setImageModalVisible] = useState(false);
	const [content, setContent] = useState('');
	const [emoji, setEmoji] = useState(null);
	const [dayd, setDayd] = useState(null);

	const [imgdata, setImgdata] = useState(null)
	const [img64, setImg64] = useState(null);

	useEffect(() => {
		//========================인증 데이터 조건 
		let confirmArr = []
		for (let i = 1; i <= 10; i++) {
			if (i !== 1) {
				confirmArr.push({ day: i, num: i });
			} else {
				confirmArr.push({ day: 0, num: i });
			}
		};
		let newArr = []
		if (data.data.length > 0) {
			let afterArr = data.data.sort((a, b) => a.day - b.day)
			for (let i = 0; i < afterArr[afterArr.length - 1].day; i++) {
				if (afterArr[i]?.day) {
					newArr[afterArr[i]?.day - 1] = afterArr[i]
				}
				if (newArr[i] === undefined) {
					newArr[i] = ({ day: null, confirm: false })
				}
			}
		}
		let confirmArr2 = newArr
		let confirmArr3;
		if (confirmArr2.length > 0) {
			let today = new Date().getDate();
			let lastDate = new Date(confirmArr2[confirmArr2.length - 1].createAt).getDate();
			for(let j = (today-lastDate);j>0;j--){
				if (j == 1) {
					confirmArr2.push({ day: 0, num: confirmArr2.length + 1 });
				} else if (j > 1) {
					confirmArr2.push({ day: confirmArr2.length + 1, confirm: false });
				}
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
								const identifier = Notifications.cancelAllScheduledNotificationsAsync({
									content: {
										title: '알림이 취소되었습니다.',
										body: "알림이 취소되었습니다.",
										data: { data: 'data' },
									},
									trigger: {
										second: 1,
									}
								});
								Notifications.cancelAllScheduledNotificationsAsync(identifier);
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

	const cancleHandle = () => {
		setContent("");
		setEmoji(null);
		setImgdata(null)
		setImg64(null)
		setAddModalVisible(false)

	}


	const confirmHandle = async () => {
		if (img64 !== null && emoji !== null && content.trim().length > 0) {
			setConfirmBtn(true)
			const response = await adddata(img64, dayd, emoji, content, data._id)
			if (response.type === true) {
				data.data.push(response.result)
				setImg64(null);
				setImgdata(null);
				setConfirmBtn(false)
				setAddModalVisible(false)
			} else {
				Alert.alert("에러", "현재 서버와 통신이 원활하지 않습니다.")
			}
		} else {
			Alert.alert("알림", "이모지와 멘트를 남겨 주셔야 해요!!");
		}


	}

	const modalHandle = (num) => {
		setDayd(num)
		setAddModalVisible(true)
	}

	const imgdataHandle = (data) => {
			setImgdata(data);
			setImageModalVisible(true)
	}
	const imgdatadisableHandle = () => {
		setImageModalVisible(false);
	}
	const Img64Handle = (data) => {
		setImg64(data);
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
					<CustomText style={{ fontSize: 20, color: '#fb5438' }} weight={500}>{data.title}</CustomText>
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
					<View style={{marginTop: 30,}}>
				</View>
				</View>
			</View>
	
			<Modal animationType="slide" transparent={true} visible={addModalVisible}
				onRequestClose={() => setAddModalVisible(false)}>
				<ImageModal onPress={imgdatadisableHandle} onImg64={Img64Handle} datauri={imgdata} imageModalVisible={imageModalVisible}  setImageModalVisible={setImageModalVisible} />
				<KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
					<View style={styles.modalArea}>
						<Pressable style={styles.touchArea} onPress={() => setAddModalVisible(false)}></Pressable>
						<View style={styles.modalContent}>
							<View style={styles.modalHeader}>
								<Pressable style={{ paddingHorizontal: 20, paddingVertical: 10 }} onPress={cancleHandle}>
									<CustomText>취소</CustomText>
								</Pressable>
								<CustomText weight={500} style={{ fontSize: 20 }}>인증하기</CustomText>
								<Pressable disabled={confirmBtn} style={{ paddingHorizontal: 20, paddingVertical: 10 }} onPress={confirmHandle}>
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
									{!img64 && <Cameraitem onPress={imgdataHandle} />}
									
									{img64 && <Pressable style={styles.cameraArea}>
										<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
											<Image style={{ width: "100%", height: "100%" }} source={{ uri: `data:image/jpeg;base64,${img64}` }} resizeMode={"cover"} />
										</View>
									</Pressable>}
									<TextInput style={[defaultStyle.textArea, { flex: 1, height: 110, backgroundColor: '#fff', marginLeft: 10 }]}
										value={content}
										multiline
										onChangeText={(txt) => setContent(txt)}
										placeholder="인증기록을 남겨보세요" />
								</View>
							</View>
						</View>
					</View>
				</KeyboardAvoidingView>
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
