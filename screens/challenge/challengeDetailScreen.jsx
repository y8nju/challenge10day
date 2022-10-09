import { useState } from "react";
import { Keyboard, TouchableWithoutFeedback, View, FlatList, StyleSheet, Pressable, Modal, Button, TextInput, Image} from "react-native";
import { format } from "date-fns";
import ko from "date-fns/esm/locale/ko/index.js";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Emoji from "../../util/emoji";

import defaultStyle from "../style/defaultStyle";

import LoadingOverlay from "../../components/loadingOverlay";
import CustomText from "../../components/customText";
import HeaderRightButton from "../../components/headerRightButton";

let confirmArr = []
for(let i = 1; i <=10; i++ ) {
	confirmArr.push({_id: i, num: i});
};

export default function ChallengeDetailScreen({route}) {
	const {data} = route.params
	const [loading, setLoading] = useState(false);
	const [confirmList, setConfirmList] = useState(confirmArr);
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
		} else {
			//인증된 아이템
		}
	}
	function EmojiItem({data}) {
		return(<Pressable onPress={() => setEmoji(data.id)}
			style={[styles.emojiItm, emoji == data.id && {backgroundColor: '#e1d3c14d'}]}>
			<Image source={data.uri} resizeMode='cover' style={{width: 50, height:50}} />
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
		width: 70,
		height: 70,
		borderRadius: 50,
		margin: 10,
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
	emojiItm: {
		justifyContent: 'center', 
		alignItems:'center', 
		borderRadius: 8,
		marginRight: 1, 
		padding: 2, 
		paddingBottom: 4,
	}
})
