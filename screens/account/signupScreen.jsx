import { useContext, useEffect, useState } from "react";
import { Alert, Image, Keyboard, TextInput, TouchableWithoutFeedback, View } from "react-native";

import defaultStyle from "../style/defaultStyle";

import LoadingOverlay from "../../components/loadingOverlay";
import CustomText from "../../components/customText";
import CustomButton from "../../components/customButton";
import { sendRegisterReq } from "../../util/accountAPI";
import { AppContext } from "../../context/app-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignupScreen({ navigation }) {
	const [loading, setLoading] = useState(false);
	const [userId, setUserId] = useState();
	const [userName, setUserName] = useState();
	const [pass, setPass] = useState('');
	const [passChk, setPassChk] = useState('');
	const [passChkText, setPassChkText] = useState('');
	const ctx = useContext(AppContext);
	useEffect(() => {
		if (pass) {
			if (!passChk) {
				setPassChkText('')
			} else {
				if (pass == passChk) {
					setPassChkText('')
				} else {
					setPassChkText('비밀번호가 일치하지 않아요')
				}
			}
		}
	}, [pass, passChk]);
	const signupHandle = () => {

		if (pass !== passChk) {
			Alert.alert('작심 10일', '비밀번호가 일치하지 않아요', [{
				text: '확인'
			}])
		} else if (pass.length < 6) {
			Alert.alert('작심 10일', '비밀번호는 6자 이상이에요', [{
				text: '확인'
			}])

		} else if (userId.length<=4) {
			Alert.alert('작심 10일', '아이디는 4자 이상이에요', [{
				text: '확인'
			}])
		} else {
			setLoading(true);
			!async function () {
				try {
					const recv = await sendRegisterReq(userId, pass,userName);
					console.log(recv);
					ctx.dispatch({ type: 'login', payload: recv });
					AsyncStorage.setItem('authentication', JSON.stringify(recv));
					navigation.navigate('HomeStack', {
						screen: 'home', params: { status: 'signup' }
					})
				} catch (e) {
					Alert.alert('작심 10일', '회원가입이 정상적으로 이루어지지 않았어요', [{
						text: '확인'
					}])
					console.log(e.message);
				}
				setLoading(false);
			}();
		}
	}

	return (<TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
		<View style={[defaultStyle.wrap, { justifyContent: 'center' }]}>
			{loading && <LoadingOverlay />}
			<View style={{alignItems:'center', marginBottom: 40}}>
				<Image source={require('../../assets/images/textLogo.png')} resizeMode="contain" style={{width: 180, height: 80}}  />
			</View>
			<View style={defaultStyle.inputArea}>
				<CustomText style={defaultStyle.inputTitle}>아이디</CustomText>
				<TextInput style={defaultStyle.input}
					value={userId}
					autoCapitalize='none'
					onChangeText={(txt) => setUserId(txt)}
					placeholder="아이디를 입력해주세요" />
			</View>
			<View style={defaultStyle.inputArea}>
				<CustomText style={defaultStyle.inputTitle}>이름</CustomText>
				<TextInput style={defaultStyle.input}
					value={userName}
					autoCapitalize='none'
					onChangeText={(txt) => setUserName(txt)}
					placeholder="이름을 입력해주세요" />
			</View>
			<View style={defaultStyle.inputArea}>
				<CustomText style={defaultStyle.inputTitle}>비밀번호</CustomText>
				<TextInput style={defaultStyle.input} secureTextEntry={true}
					onChangeText={(txt) => setPass(txt)}
					value={pass}
					placeholder="비밀번호를 입력해주세요" />
			</View>
			<View style={defaultStyle.inputArea}>
				<CustomText style={defaultStyle.inputTitle}>비밀번호 확인</CustomText>
				<TextInput style={defaultStyle.input} secureTextEntry={true}
					onChangeText={(txt) => setPassChk(txt)}
					value={passChk}
					placeholder="비밀번호를 입력해주세요" />
			</View>
			{passChkText.length > 0 && <View style={{ paddingHorizontal: 26 }}>
				<CustomText style={defaultStyle.chkTxt}>{passChkText}</CustomText>
			</View>}
			<View style={defaultStyle.accountBtnArea}>
				<CustomButton title={"가입하기"} onPress={signupHandle} />
			</View>
		</View>
	</TouchableWithoutFeedback>);
}