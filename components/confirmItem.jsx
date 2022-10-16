import { Dimensions, ImageBackground, Pressable, StyleSheet } from 'react-native';
import Emoji from "../util/emoji"
import { colors } from '../screens/style/defaultStyle';
import CustomText from './customText';

const windowWidth = Dimensions.get('window').width;

export default function ConfirmItem({ data,onModal }) {
    if (data.num) {
        // 인증되지 않은 아이템
        if (data.day == 0) {
            // 인증할 수 있는 아이템도 해당 조건에 추가
            return (<Pressable onPress={()=>{onModal(data.num)}}
                style={[styles.itemArea, { backgroundColor: '#fff' }]}>
                <CustomText type={'hand'} style={{ color: colors.sub, fontSize: 24 }}>{data.num}</CustomText>
            </Pressable>)
        }
        return (<Pressable style={[styles.itemArea, { backgroundColor: '#e9e9e9' }]}>
            <CustomText type={'hand'} style={{ color: '#bdbdbd', fontSize: 24 }}>{data.num}</CustomText>
        </Pressable>)
    } else if (data.confirm) {
        // 인증 데이터가 있는 아이템
        let confirmEmojiUri;
        Emoji.forEach((one)=>{
            if (one.id == data.emoji) {
                confirmEmojiUri = one.uri
            }
        })
        return (<Pressable style={styles.itemArea}>
            <ImageBackground source={confirmEmojiUri} resizeMode='cover' style={{ width: '100%', height: '100%' }} />
        </Pressable>)
    } else if (!data.confirm) {
        // 인증 실패한 데이터
        return (<Pressable style={styles.itemArea}>
            <ImageBackground source={require('../assets/images/emoji/false.png')} resizeMode='cover' style={{ width: '100%', height: '100%' }} />
        </Pressable>)
    }
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
})