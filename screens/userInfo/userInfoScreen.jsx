import { Alert, Pressable, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import CustomText from "../../components/customText";

export default function UserInfoScreen({ navigation }) {

	// 로그아웃
	const logoutHandle = () => {
		Alert.alert("작심10일", "로그아웃 할까요?", [
			{
				text: '취소'
			}, {
				text: '로그아웃',
				onPress: () => {
					navigation.navigate("UserStack", { screen: 'login', params: { status: 'logout' } });
				}
			}
		])
	}
	// 비밀번호 변경
	const passChangeHandele = () => {
		navigation.navigate("passChange");
	}
	// 탈퇴
	const accountDeleteHandle = () => {
		navigation.navigate("withdraw");
	}

	return (<View style={defaultStyle.wrap}>
		<View style={{ paddingHorizontal: 20 }}>
			<View style={{ borderBottomColor: "#ddd", borderBottomWidth: 1, paddingBottom: 20, marginBottom: 16 }}>
				<CustomText style={{ fontSize: 14, textAlign: 'center' }}>계정id</CustomText>
			</View>
			<Pressable onPress={passChangeHandele}>
				<View style={styles.infoItemRow}>
					<CustomText>비밀번호 변경</CustomText>
					<View style={{ overflow: 'hidden', borderRadius: 8 }}>
						<MaterialCommunityIcons name="chevron-right" size={18} color="#000" />
					</View>
				</View>
			</Pressable>
			<Pressable onPress={logoutHandle}>
				<View style={styles.infoItemRow}>
					<CustomText>로그아웃</CustomText>
					<View style={{ overflow: 'hidden', borderRadius: 8 }}>
						<MaterialCommunityIcons name="chevron-right" size={18} color="#000" />
					</View>
				</View>
			</Pressable>
			<Pressable onPress={accountDeleteHandle}>
				<View style={styles.infoItemRow}>
					<CustomText>서비스 탈퇴</CustomText>
					<View style={{ overflow: 'hidden', borderRadius: 8 }}>
						<MaterialCommunityIcons name="chevron-right" size={18} color="#000" />
					</View>
				</View>
			</Pressable>

		</View>
	</View>)
}
const styles = StyleSheet.create({
	infoItemRow: {
		paddingVertical: 20,
		paddingHorizontal: 20,
		borderRadius: 14,
		backgroundColor: "#ededed",
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 16
	},
	infoTit: {
		color: "#777",
		marginBottom: 8
	}
})