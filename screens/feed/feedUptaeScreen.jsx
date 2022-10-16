import { useEffect, useState } from "react";
import { Alert, Dimensions, Image, ImageBackground, Keyboard, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { useIsFocused} from "@react-navigation/native";

import { updatedata } from "../../util/dataAPI";
import Emoji from "../../util/emoji";

import defaultStyle, { colors } from "../style/defaultStyle";

import LoadingOverlay from "../../components/loadingOverlay";
import CustomText from "../../components/customText";
import HeaderRightButton from "../../components/headerRightButton";

const windowWidth = Dimensions.get('window').width;

export default function FeedUpdateScreen({navigation, route}) {
	const {data} = route.params
	const focused = useIsFocused();
	const date = new Date(data.createAt.slice(0,10));

	const [emoji, setEmoji] = useState(null);
	const [loading, setLoading] = useState(false);
	const [content, setContent] = useState(data.comment);
	useEffect(()=> {
		navigation.setOptions({
			title: "피드 수정하기",
			headerRight: () => <HeaderRightButton onPress={updateHandle}>
					완료
				</HeaderRightButton>
		});
		if(data.emoji) {
			Emoji.forEach(one => {
				if(data.emoji == one.id) {
					return setEmoji(one.uri)
				}
			})
		}
	}, [content])
	const updateHandle = () => {
		Alert.alert("작심10일", "피드를 수정할까요?", [
			{
				text: '취소'
			}, {
				text: '수정',
				onPress: () =>{ 
					setLoading(true);
					!async function () {
						try {
							const response = await updatedata(data._id,content,null)
							if(response.type){
								setTimeout(()=>{
									setLoading(false);
									navigation.navigate('feed', {status: 'update'});
									// detaile 페이지로 이동하도록 수정
								}, 1500)
							} else {
								Alert.alert("에러","현재 서버와 연결 상태가 좋지 않습니다.")
							}
						} catch (e) {
							console.log(e);
						}
					}();
					
					
				}
			}
		])
	}
	return(<SafeAreaView>
		<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "position" : 'scroll'} style={{ backgroundColor: colors.bg }}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
				<>{loading && <LoadingOverlay />}
					<ScrollView style={{ marginBottom: 36 }}>
						<View style={styles.imageArea}>
							<ImageBackground source={{uri:data.imgURI}} resizeMode="cover" style={{ flex: 1 }} />
						</View>
						<View style={{ padding: 26 }}>
							<View style={styles.row}>
								<Image source={emoji} resizeMode="cover" style={{ width: 44, height: 44, marginRight: 10 }} />
								<CustomText style={{ fontSize: 20 }}>{date.getMonth() + 1}월 {date.getDate()}일</CustomText>
							</View>
							{/* <CustomText style={{textAlign: 'justify', fontSize: 16, lineHeight: 24}} weight={300}> */}
							<TextInput style={defaultStyle.textArea}
								onChangeText={(txt) => setContent(txt)}
								value={content}
								multiline
								numberOfLines={6} />
							<CustomText style={{ fontSize: 12, textAlign: 'center', marginTop: 20 }} weight={300}>내가 작성한 메세지만 수정할 수 있어요</CustomText>
						</View>
					</ScrollView></>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	</SafeAreaView>)
}
const styles = StyleSheet.create({
	imageArea: {
		width: windowWidth,
		height: windowWidth,
		backgroundColor: colors.gray
	},
	row: {
		flexDirection: 'row', 
		alignItems: 'center',
		borderBottomColor: colors.gray, 
		borderBottomWidth: 1, 
		marginBottom: 16, 
		paddingBottom: 12
	}
})