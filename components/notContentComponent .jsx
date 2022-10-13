// 로그인 했는데 아무런 데이터가 없을떄

import { Image, View } from 'react-native'
import CustomText from './customText'
export default function NotContent({ type }) {
    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require('../assets/images/emoji/smile.png')} resizeMode="cover" style={{ width: 40, height: 40 }} />
        <CustomText type={'hand'} style={{ color: '#8e8e8f', marginTop: 10 }}>아직 등록된 {type}가 없어요</CustomText>
    </View>)
}