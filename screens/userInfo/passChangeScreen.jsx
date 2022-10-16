import { useContext, useEffect, useState } from "react";
import { Alert, Keyboard, TextInput, TouchableWithoutFeedback, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AppContext } from "../../context/app-context";
import { changepassword } from "../../util/accountAPI";

import defaultStyle from "../style/defaultStyle";

import LoadingOverlay from "../../components/loadingOverlay";
import CustomButton from "../../components/customButton";
import CustomText from "../../components/customText";

export default function PassChangeScreen({ navigation }) {
	const [loading, setLoading] = useState(false);
	const [pass, setPass] = useState('');
	const [newPass, setNewPass] = useState('');
	const [passchkText, setPassChkText] = useState('');
	const [newPassChkText, setNewPassChkText] = useState('');
	const ctx = useContext(AppContext);
	useEffect(()=> {
		// 기존 패스워드와 비교하여 동일하지 않으면  
		// setPassChkText('비밀번호가 일치하지 않아요')
	}, [pass])
	useEffect(() => {
		if (newPass.length > 1 && newPass.length < 6) {
			setNewPassChkText('비밀번호는 6자 이상이에요');
		} else if (newPass.length == 0 || newPass.length >= 6) {
			setNewPassChkText('');
		}
	}, [newPass]);
	// password 체크, 변경
	const passChangeHandele = () => {
		Alert.alert("작심10일", `입력하신 비밀번호로 저장할까요? \n비밀번호 변경 시 로그아웃돼요`, [
			{
				text: '취소'
			}, {
				text: '저장',
				onPress: () => {
					if (pass.length < 6) {
						Alert.alert('작심10일', '비밀번호는 6자 이상이에요', [{
							text: '확인'
						}])
					} else {
						setLoading(true);
						!async function () {
							try {
								const data = await AsyncStorage.getItem("authentication")
								const datad = JSON.parse(data);
								const response = await changepassword(datad.data.userId,pass,newPass);
								if(response.result){
									ctx.dispatch({type:"logout"});
									navigation.navigate("UserStack", { screen: 'login', params: { status: 'passChange' } });
								} else {
									Alert.alert('작심10일','입력하신 비밀번호가 일치하지 않았어요',[{
										text:'확인'
									}])
								}
							} catch (e) {
								Alert.alert('작심10일', '비밀번호가 정상적으로 변경되지 않았어요', [{
							text: '확인'
						}])
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
		{loading && <LoadingOverlay />}
			<View style={defaultStyle.inputArea}>
				<CustomText style={defaultStyle.inputTitle}>비밀번호는 6자 이상이에요</CustomText>
				<TextInput style={defaultStyle.input} secureTextEntry={true}
					onChangeText={(txt) => setPass(txt)}
					value={pass}
					placeholder="현재 사용 중인 비밀번호를 입력해주세요"
					placeholderTextColor="#dfdfdf" />
				{passchkText.length > 0 && <View style={{marginTop: 10}}>
					<CustomText style={defaultStyle.chkTxt} >{passchkText}</CustomText>
				</View>}
				<TextInput style={[defaultStyle.input, {marginTop: 14}]} secureTextEntry={true}
					onChangeText={(txt) => setNewPass(txt)}
					value={newPass}
					placeholder="변경할 비밀번호를 입력해주세요"
					placeholderTextColor="#dfdfdf" />
				{newPassChkText.length > 0 && <View style={{marginTop: 10}}>
					<CustomText style={defaultStyle.chkTxt} >{newPassChkText}</CustomText>
				</View>}
			</View>
			<View style={[defaultStyle.accountBtnArea, { paddingHorizontal: 26 }]}>
				<CustomButton title={"저장"} onPress={passChangeHandele} />
			</View>
		</View>
	</TouchableWithoutFeedback >);
}