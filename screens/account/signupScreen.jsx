import { useEffect, useState } from "react";
import { Button, Keyboard, TextInput, TouchableWithoutFeedback, View } from "react-native";
import CustomText from "../../components/customText";
import LoadingOverlay from "../../components/loadingOverlay";
import defaultStyle from "../style/defaultStyle";

export default function SignupScreen({ navigation }) {
	const [loading, setLoading] = useState(false);
	const [userId, setUserId] = useState();
	const [userName, setUserName] = useState();
	const [pass, setPass] = useState('');
	const [passChk, setPassChk] = useState('');
	const [passChkText, setPassChkText] = useState('');
	useEffect(() => {
		if (pass) {
			if (!passChk) {
				setPassChkText('')
			} else {
				if (pass == passChk) {
					setPassChkText('')
				} else {
					setPassChkText('비밀번호가 일치하지 않습니다')
				}
			}
		}
	}, [pass, passChk]);
	const signupHandle = () => {

		if (pass !== passChk) {
			Alert.alert('오늘여기', '비밀번호가 일치하지 않습니다')
		} else if (pass.length < 6) {
			Alert.alert('오늘여기', '비밀번호는 6자 이상 입력해주세요')

		} else if (!(/^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email))) {
			Alert.alert('오늘여기', '이메일 형식이 아닙니다')
		} else {
			setLoading(true);
			!async function () {
				try {
					const recv = await sendRegisterReq(email, pass);
					console.log(recv);
					ctx.dispatch({ type: 'login', payload: recv });
					AsyncStorage.setItem('authentication', JSON.stringify(recv));
					navigation.navigate('Home', { status: 'signup' })
				} catch (e) {
					Alert.alert('오늘여기', '회원가입이 정상적으로 이루어지지 않았습니다')
					console.log(e.message);
				}
				setLoading(false);
			}();
		}
	}

	return (<TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
		<View style={[defaultStyle.wrap, { justifyContent: 'center' }]}>
			{loading && <LoadingOverlay />}
			<View style={{ alignItems: 'center' }}>
				<CustomText>
					작심 10일
				</CustomText>
			</View>
			<View style={defaultStyle.inputArea}>
				<CustomText style={defaultStyle.inputTitle}>아이디</CustomText>
				<TextInput style={defaultStyle.input}
					value={userId}
					autoCapitalize='none'
					onChangeText={(txt) => setUserId(txt)}
					placeholder="이메일을 입력하세요" />
			</View>
			<View style={defaultStyle.inputArea}>
				<CustomText style={defaultStyle.inputTitle}>이름</CustomText>
				<TextInput style={defaultStyle.input}
					value={userName}
					autoCapitalize='none'
					onChangeText={(txt) => setUserName(txt)}
					placeholder="이름을 입력하세요" />
			</View>
			<View style={defaultStyle.inputArea}>
				<CustomText style={defaultStyle.inputTitle}>비밀번호</CustomText>
				<TextInput style={defaultStyle.input} secureTextEntry={true}
					onChangeText={(txt) => setPass(txt)}
					value={pass}
					placeholder="비밀번호를 입력하세요" />
			</View>
			<View style={defaultStyle.inputArea}>
				<CustomText style={defaultStyle.inputTitle}>비밀번호 확인</CustomText>
				<TextInput style={defaultStyle.input} secureTextEntry={true}
					onChangeText={(txt) => setPassChk(txt)}
					value={passChk}
					placeholder="비밀번호를 입력하세요" />
			</View>
			<View style={{ paddingHorizontal: 26 }}>
				<CustomText style={defaultStyle.chkTxt}>{passChkText}</CustomText>
			</View>
			<View style={defaultStyle.accountBtnArea}>
				<Button title="가입하기" color="#fb5438" onPress={signupHandle} />
			</View>
		</View>
	</TouchableWithoutFeedback>);
}