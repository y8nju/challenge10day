import { useState } from "react";
import { Keyboard, TouchableWithoutFeedback, View, FlatList, StyleSheet, Pressable, Modal, Button, TextInput, Image, Dimensions, ImageBackground} from "react-native";
import { format } from "date-fns";
import ko from "date-fns/esm/locale/ko/index.js";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Emoji from "../../util/emoji";

import defaultStyle from "../style/defaultStyle";

import LoadingOverlay from "../../components/loadingOverlay";
import CustomText from "../../components/customText";

const windowWidth = Dimensions.get('window').width;

let confirmArr = []
for(let i = 1; i <=10; i++ ) {
	confirmArr.push({_id: i, num: i});
};
let confirmArr2 = []
confirmArr2 =[{_id: 458, emoji: '002', createdAt: "2022-10-07T13:01:17.056Z", confirm: true},
{_id: 556, confirm: false},
{_id: 434, emoji: '006', createdAt: "2022-10-09T13:01:17.056Z", confirm: true}]

let confirmArr3;
if(confirmArr2.length > 0) {
	let today = new Date().getDate();
	let lastDate = new Date(confirmArr2[confirmArr2.length-1].createdAt.slice(0, 10)).getDate();
	if(today - lastDate == 1 ) {
		confirmArr2.push({_id: 1, num: confirmArr2.length + 1});
	} else if (today - lastDate > 1) {
		confirmArr2.push({_id: confirmArr2.length + 1, confirm: false});
		confirmArr2.push({_id: 1, num: confirmArr2.length + 2});
	}
	confirmArr3 = confirmArr2.concat(confirmArr.slice(-(confirmArr.length - confirmArr2.length)));
}else {
	confirmArr3 = confirmArr;
}

export default function ChallengeDetailScreen({route}) {
	const {data} = route.params
	const [loading, setLoading] = useState(false);
	const [confirmList, setConfirmList] = useState(confirmArr3);
	const [addModalVisible, setAddModalVisible] = useState(false);
	const [content, setContent] = useState('');
	const [emoji, setEmoji] = useState(null);

	function ConfirmItem({data}) {
		if(data.num) {
			// 인증되지 않은 아이템
			if(data._id == 1) {
				// 인증할 수 있는 아이템도 해당 조건에 추가
				return (<Pressable onPress={() => setAddModalVisible(true)}
					style={[styles.itemArea, {backgroundColor: '#fff'}]}>
					<CustomText type={'hand'} style={{color: '#ffba5d', fontSize: 24}}>{data.num}</CustomText>
				</Pressable>)
			}
			return (<Pressable style={[styles.itemArea, {backgroundColor: '#e9e9e9'}]}>
				<CustomText type={'hand'} style={{color: '#bdbdbd', fontSize: 24}}>{data.num}</CustomText>
			</Pressable>)
		} else if(data.confirm) {
			// 인증 데이터가 있는 아이템
			let confirmEmojiUri;
			Emoji.forEach(one => {
				if(one.id == data.emoji) {
					confirmEmojiUri = one.uri
				}
			})
			return (<Pressable style={styles.itemArea}>
					<ImageBackground source={confirmEmojiUri} resizeMode='cover' style={{width: '100%', height: '100%'}} />
				</Pressable>)
		} else if(!data.confirm) {
			// 인증 실패한 데이터
			return (<Pressable style={styles.itemArea}>
				<ImageBackground source={require('../../assets/images/emoji/false.png')} resizeMode='cover' style={{width: '100%', height: '100%'}} />
			</Pressable>)
		}
	}
	function EmojiItem({data}) {
		return(<Pressable onPress={() => setEmoji(data.id)}
			style={[styles.emojiItem, emoji == data.id && {backgroundColor: '#e1d3c14d'}]}>
			<Image source={data.uri} resizeMode='cover' style={styles.emojiIcon} />
			<CustomText style={[{textAlign: 'center', marginTop: 2, color: '#8e8e8f'}, emoji == data.id && {color: '#504d49'}]} type={'hand'}>{data.name}</CustomText>
		</Pressable>)
	}

	return (<TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
		<View style={defaultStyle.wrap}>
			{loading && <LoadingOverlay />}
			<View style={{flex: 1, paddingHorizontal: 26}}>
				<View style={{marginBottom: 20, alignItems: 'center'}}>
					<CustomText style={{fontSize: 20, color: '#fb5438'}} weight={700}>{data.title}</CustomText>
					<CustomText style={{color: '#8e8e8f', marginTop: 8}}>{format(new Date(data.createdAt), 'P', {locale: ko})} ~</CustomText>
				</View>
				<View>
					{confirmList ? <FlatList data={confirmList} 
						keyExtractor={({_id}) => _id}
						renderItem={({item}) => <ConfirmItem data={item}/>}
						numColumns={4}
					/> : <></>}
				</View>
				<View style={{marginTop: 30, alignItems: 'center', flex: 1}}>
					<CustomText style={{fontSize: 16, color: '#8e8e8f'}} type={'hand'}>
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
							<CustomText weight={700} style={{fontSize: 20}}>인증하기</CustomText>
							<Pressable style={{ paddingHorizontal: 20, paddingVertical: 10 }} onPress={() => setAddModalVisible(false)}>
								<CustomText>인증</CustomText>
							</Pressable>
						</View>
						<View style={{padding: 40, paddingTop: 0}}>
							<View style={{marginBottom: 10}}>
								<FlatList data={Emoji} 
									keyExtractor={({id}) => id}
									renderItem={({item}) => <EmojiItem data={item}/>}
									horizontal
									showsHorizontalScrollIndicator={false}
									scrollEnabled={false}
								/>
							</View>
							<View style={{flexDirection: 'row'}}>
								{/* 카메라 */}
								<Pressable style={styles.cameraArea}>
									<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
										<MaterialCommunityIcons name="camera-enhance" size={34} color="#bdbdbd" />
									</View>
								</Pressable>
								<TextInput style={[defaultStyle.textArea, {flex: 1, height: 110, backgroundColor: '#fff', marginLeft: 10}]}
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
		alignItems:'center', 
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
 