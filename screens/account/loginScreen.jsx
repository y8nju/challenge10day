import { useState } from "react";
import { Alert, Button, Keyboard, Pressable, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import CustomText from "../../components/customText";
import defaultStyle from "../style/defaultStyle";

export default function LoginScreen({ navigation }) {
	const [loading, setLoading] = useState(false);
	const [inputValues, setInputValues] = useState({ userId: "", password: "" });
	const { userId, password } = inputValues;

	const moveRegisterHandle = () => {
		navigation.navigate("signUp");
	}
	const loginHandle = () => {
		setLoading(true);
		!async function () {
			try {
				// AsyncStorage.setItem('authentication', JSON.stringify(userData));
				navigation.navigate("HomeStack", { screen: 'Home', params: { status: 'login' } });
			} catch (e) {
				Alert.alert("오늘여기", "아이디 혹은 비밀번호를 확인하세요")
				console.log(e);
			}
			setLoading(false);
		}();
	}

	return (<TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
		<View style={[defaultStyle.wrap, { justifyContent: 'center' }]}>
			<View style={{ alignItems: 'center' }}>
				<CustomText>
					작심 10일
				</CustomText>
			</View>
			<View style={defaultStyle.inputArea}>
				<CustomText style={defaultStyle.inputTitle}>아이디</CustomText>
				<TextInput style={defaultStyle.input}
					value={inputValues.userId}
					autoCapitalize='none'
					onChangeText={(text) => setInputValues({ ...inputValues, userId: text })}
					placeholder="이메일을 입력하세요" />
			</View>
			<View style={defaultStyle.inputArea}>
				<CustomText style={defaultStyle.inputTitle}>비밀번호</CustomText>
				<TextInput style={defaultStyle.input} secureTextEntry={true}
					value={inputValues.password}
					onChangeText={(text) => setInputValues({ ...inputValues, password: text })}
					placeholder="비밀번호를 입력하세요" />
			</View>
			<View style={defaultStyle.accountBtnArea}>
				<Button title="로그인" color="#fb5438" onPress={loginHandle} />
			</View>
			<View style={{ marginTop: 24, width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
				<CustomText style={{ textAlign: 'center' }}>계정이 없으신가요?</CustomText>
				<Pressable onPress={moveRegisterHandle}>
					<CustomText style={{ color: '#fb5438' }}> 가입하기</CustomText>
				</Pressable>
			</View>
		</View>
	</TouchableWithoutFeedback>);
}