import { useEffect, useState } from "react";
import { Dimensions, Image, ImageBackground, StyleSheet, View } from "react-native";
import { useIsFocused} from "@react-navigation/native";

import CustomText from "../../components/customText";
import HeaderRightButton from "../../components/headerRightButton";

const windowWidth = Dimensions.get('window').width;

export default function FeedDetailScreen({navigation, route}) {
	const {data} = route.params;
	const date = new Date(data.createdAt.slice(0,10));
	const focused = useIsFocused();
	
	const [emoji, setEmoji] = useState(null);

	useEffect(()=> {
		navigation.setOptions({
			title: "",
			headerRight: () => <HeaderRightButton onPress={()=>(navigation.navigate('feedUpdate', {data: data}))}>
					수정
				</HeaderRightButton>
		});
		if(data.emoji) {
			switch (data.emoji) {
				case 'smile':
					return setEmoji(require('../../assets/images/emoji/smile.png'));
				case 'angry':
					return setEmoji(require('../../assets/images/emoji/angry.png'));
				case 'heartEye':
					return setEmoji(require('../../assets/images/emoji/heartEye.png'));
				case 'sad':
					return setEmoji(require('../../assets/images/emoji/sad.png'));
				case 'sick':
					return setEmoji(require('../../assets/images/emoji/sick.png'));
				case 'sleepy':
					return setEmoji(require('../../assets/images/emoji/sleepy.png'));
			}
		}
	}, [focused])
	return(<View style={{flex: 1, backgroundColor: '#f2f2f2'}}>
		<View style={styles.imageArea}>
			<ImageBackground source={data.imgURI} resizeMode="cover" style={{flex: 1}}/>
		</View>
		<View style={{padding: 26}}>
			<View style={styles.row}>
				<Image source={emoji} resizeMode="cover" style={{width: 44, height: 44, marginRight: 10}} />
				<CustomText style={{fontSize: 20}}>{date.getMonth()+1}월 {date.getDate()}일</CustomText>
			</View>
			<CustomText style={{textAlign: 'justify', fontSize: 16, lineHeight: 24}} type={'hand'}>
				{data.content}
			</CustomText>
		</View>
	</View>)
}
const styles = StyleSheet.create({
	imageArea: {
		width: windowWidth,
		height: windowWidth,
		backgroundColor: '#ddd'
	},
	row: {
		flexDirection: 'row', 
		alignItems: 'center',
		borderBottomColor: '#ddd', 
		borderBottomWidth: 1, 
		marginBottom: 16, 
		paddingBottom: 12
	}
})