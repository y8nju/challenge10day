import { useEffect, useState } from "react";
import { Alert, Button, Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import CustomText from "../../components/customText";
import defaultStyle from "../style/defaultStyle";

export default function PassChangeScreen({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [pass, setPass] = useState('');
    const [passchkText, setPassChkText] = useState('');

    useEffect(() => {
        if (pass.length > 1 && pass.length < 6) {
            setPassChkText('비밀번호는 6자 이상 입력해주세요');
        } else if (pass.length == 0 || pass.length >= 6) {
            setPassChkText('');
        }
    }, [pass]);

    // password 체크, 변경
    const passChangeHandele = () => {
        Alert.alert("오늘여기", `입력하신 비밀번호로 저장할까요? \n비밀번호 변경 시 로그아웃됩니다`, [
            {
                text: '취소'
            }, {
                text: '저장',
                onPress: () => {
                    if (pass.length < 6) {
                        Alert.alert('오늘여기', '비밀번호는 6자 이상 입력해주세요')
                    } else {
                        setLoading(true);
                        !async function () {
                            try {
                                navigation.navigate("Account", { screen: 'Login', params: { status: 'passChange' } });
                            } catch (e) {
                                Alert.alert('오늘여기', '비밀번호가 정상적으로 변경되지 않았습니다')
                                console.log(e.message);
                            }
                            setLoading(false);
                        }();
                    }
                }
            }
        ])
    }

    return (<TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <View style={defaultStyle.wrap}>
            <View style={defaultStyle.inputArea}>
                <CustomText style={defaultStyle.inputTitle}>비밀번호(6자 이상)</CustomText>
                <TextInput style={defaultStyle.input} secureTextEntry={true}
                    onChangeText={(txt) => setPass(txt)}
                    value={pass}
                    placeholder="변경할 비밀번호를 입력해주세요" />
            </View>
            <View style={{ paddingHorizontal: 26 }}>
                <CustomText style={defaultStyle.chkTxt}>{passchkText}</CustomText>
            </View>
            <View style={[defaultStyle.accountBtnArea, { paddingHorizontal: 26 }]}>
                <Button title="저장" color="#504d49" onPress={passChangeHandele} />
            </View>
        </View>
    </TouchableWithoutFeedback >);
}