// 이건 로그인 안 되 있을떄 account 제외한 모든 페이지에 보이게

import { Image, View } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { colors } from '../screens/style/defaultStyle';
import CustomButton from "./customButton";
import CustomText from './customText';

export default function NotLogin() {
    const navigation = useNavigation();

    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ alignItems: 'center', marginBottom: 40 }}>
            <Image source={require('../assets/images/defaultImg-1.png')} resizeMode="cover" style={{ width: 120, height: 120 }} />
        </View>
        <CustomText style={{ color: colors.darkGray, fontSize: 18, marginBottom: 10 }} type={'hand'}>아직 로그인 하지 않으셨군요?</CustomText>
        <CustomButton title={"로그인 하러가기"} onPress={() => navigation.navigate('UserStack', { screen: 'login' })} />
    </View>);
}