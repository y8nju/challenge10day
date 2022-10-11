import { useContext, useEffect, useState } from "react";
import { Alert, Image, Keyboard, Pressable, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { CommonActions, useIsFocused} from "@react-navigation/native";

import defaultStyle from "../style/defaultStyle";

import CustomText from "../../components/customText";
import CustomButton from "../../components/customButton";
import { AppContext } from "../../context/app-context";
import { sendLoginReq } from "../../util/accountAPI";
import LoadingOverlay from "../../components/loadingOverlay";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation, route }) {
	const [loading, setLoading] = useState(false);
	const [inputValues, setInputValues] = useState({ userId: "", password: "" });
	const { userId, password } = inputValues;
	const focused = useIsFocused();
	const ctx = useContext(AppContext);
	useEffect(()=> {
		if(route.params) {
			switch(route.params.staus) {
				case 'signup':
					ToastAndroid.show("만나서 반가워요. 로그인 해주실거죠?", ToastAndroid.SHORT);
					return navigation.dispatch(CommonActions.setParams({ status: '' }));
				case 'logout':
					Alert.alert('aa', 'aaaa')
					ToastAndroid.show("다음에 또 만나요", ToastAndroid.SHORT);
					return navigation.dispatch(CommonActions.setParams({ status: '' }));
				case 'passChange':
					ToastAndroid.show("비밀번호가 변경되어 로그아웃 되었어요", ToastAndroid.SHORT);
					return navigation.dispatch(CommonActions.setParams({ status: '' }));
			}
		}
	}, [focused])

	const moveRegisterHandle = () => {
		navigation.navigate("signUp");
	}
	const loginHandle = () => {
		setLoading(true);
		!async function () {
			try {
				const recv = await sendLoginReq(inputValues.userId, inputValues.password);
                ctx.dispatch({type:"login",payload:recv})
				
                if (recv.registered) {
                    AsyncStorage.setItem("authentication",JSON.stringify(recv))
					console.log("recv",recv)
					navigation.navigate("HomeStack", { screen: 'home', params: { status: 'login' } });
                }
				// AsyncStorage.setItem('authentication', JSON.stringify(userData));
			} catch (e) {
				Alert.alert("작심10일", "아이디 혹은 비밀번호를 확인해보세요", [{
					text: '확인'
				}])
				console.log(e);
			}
			setLoading(false);
		}();
	}

	return (<TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
		<View style={[defaultStyle.wrap, { justifyContent: 'center' }]}>
			{loading && <LoadingOverlay />}
			<View style={{alignItems:'center', marginBottom: 40}}>
				<Image source={require('../../assets/images/defaultImg-1.png')} resizeMode="cover" style={{width: 120, height: 120}}  />
			</View>
			<View style={defaultStyle.inputArea}>
				<CustomText style={defaultStyle.inputTitle}>아이디</CustomText>
				<TextInput style={defaultStyle.input}
					value={inputValues.userId}
					autoCapitalize='none'
					onChangeText={(text) => setInputValues({ ...inputValues, userId: text })}
					placeholder="아이디를 입력해주세요" />
			</View>
			<View style={defaultStyle.inputArea}>
				<CustomText style={defaultStyle.inputTitle}>비밀번호</CustomText>
				<TextInput style={defaultStyle.input} secureTextEntry={true}
					value={inputValues.password}
					onChangeText={(text) => setInputValues({ ...inputValues, password: text })}
					placeholder="비밀번호를 입력해주세요" />
			</View>
			<View style={defaultStyle.accountBtnArea}>
				<CustomButton title={"로그인"} onPress={loginHandle} />
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