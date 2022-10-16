import { useContext, useState } from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import { AppContext } from "../../context/app-context";
import { deleteid } from "../../util/accountAPI";

import { colors } from "../style/defaultStyle";

import LoadingOverlay from "../../components/loadingOverlay";
import CustomButton from "../../components/customButton";
import CustomText from "../../components/customText";

export default function WithdrawScreen({ navigation }) {
	const [loading, setLoading] = useState(false);
	const [isDisabled, setIsDisabled] = useState(true);
	const [chkColor, setChkCOlor] = useState('#bbb');
	const ctx = useContext(AppContext);
	const checkHandle = () => {
		setIsDisabled(!isDisabled);
		if (isDisabled) {
			setChkCOlor(colors.main);
		} else {
			setChkCOlor('#bbb');
		}
	}

	const accountDeleteHandle = () => {
		Alert.alert("작심10일", "서비스를 탈퇴 하실건가요?", [
			{
				text: '취소'
			}, {
				text: '탈퇴',
				onPress: () => {
					setLoading(true);
					!async function () {
						try {
							const data = await AsyncStorage.getItem("authentication")
							const datad = JSON.parse(data);
							const response = await deleteid(datad.data.userId);
							if (response.result) {
								ctx.dispatch({ type: "logout" });
								// params 수정 필요
								navigation.navigate("UserStack", { screen: 'login', params: { status: 'passChange' } });
							} else {
								Alert.alert('작심10일', '탈퇴가 정상적으로 이루어지지 않았어요', [{
									text: '확인'
								}])
							}
							// navigation.navigate("HomeStack", { screen: 'withdrawSuccess', params: { status: 'success' } });
						} catch (e) {
							Alert.alert('작심10일', '탈퇴가 정상적으로 이루어지지 않았어요')
							console.log(e.message);
						}
						setLoading(false);
					}();

				}
			}
		])
	}

	return (<View style={{ flex: 1, backgroundColor: colors.bg }}>
		{loading && <LoadingOverlay />}
		<View style={{ alignItems: 'center', paddingVertical: 20 }}>
			<Image source={require('../../assets/images/textLogo.png')} resizeMode="contain" style={{ width: 180, height: 80 }} />
		</View>
		<View style={{ paddingHorizontal: 24 }}>
			<CustomText style={{ fontSize: 18 }} weight={500}>
				서비스 탈퇴 전{'\n'}아래 주의 사항을 꼭 확인해주세요.
			</CustomText>
			<View style={{ marginTop: 24 }}>
				<CustomText style={styles.withdrawText}>
					· 탈퇴 시, 작심10일 서비스 이용이 불가해요.
				</CustomText>
				<CustomText style={styles.withdrawText}>
					· 작심10일 서비스를 탈퇴하더라도 등록하신 챌린지와 피드는 유지돼요.{'\n'}
					작심10일 서비스에 등록한 챌린지와 피드 삭제를 원하시는 경우, 탈퇴 전 삭제해 주세요
				</CustomText>
			</View>
		</View>
		<View style={{ marginTop: 'auto' }}>
			<View style={{ backgroundColor: colors.lightGray, padding: 20, }}>
				<BouncyCheckbox
					size={18}
					style={{ margin: 0 }}
					text="안내사항을 모두 확인했으며, 탈퇴 시 회원 정보는 모두 삭제 및 복구가 불가함에 동의합니다 "
					textStyle={{ fontFamily: 'Neo-Rg', fontSize: 12, color: colors.darkGray, textDecorationLine: 'none' }}
					disableBuiltInState
					fillColor={chkColor}
					unfillColor={colors.gray}
					isChecked={!isDisabled}
					onPress={checkHandle}
				/>
			</View>
			<CustomButton title={"탈퇴"} onPress={accountDeleteHandle} disabled={isDisabled} style={{ borderRadius: 0 }} />
		</View>
	</View >);
}

const styles = StyleSheet.create({
	withdrawText: {
		color: colors.darkGray,
		marginBottom: 16,
		lineHeight: 20
	}
});