import { useEffect, useState } from "react";
import { Keyboard, StyleSheet, Switch, TextInput, TouchableWithoutFeedback, View, Pressable} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import ko from "date-fns/esm/locale/ko/index.js";

import defaultStyle from "../style/defaultStyle";

import CustomText from "../../components/customText";
import LoadingOverlay from "../../components/loadingOverlay";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import CustomButton from "../../components/customButton";

export default function ChallengeAddScreen({navigation}) {
	const [loading, setLoading] = useState(false);
	const [title, setTitle] = useState()
	const [isEnabled, setIsEnabled] = useState(false); 
	const [date, setDate] = useState(new Date());
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const [checked, setChecked] = useState(null);
	const [chkColor, setChkCOlor] = useState('#bbb');

	const showTimePicker = () => {
		setDatePickerVisibility(true);
	};
	const confirmHandle = (time) => {
		console.log("선택시간: ", time);
		console.log(format(new Date(time), 'ppp', {locale: ko}));
		// 선택된 시간 확인하기!
		setDate(time)
		setDatePickerVisibility(false);
	};
	const ChallengeAddHandle = () => {
		// 챌린지 추가
		setLoading(true);
		!async function () {
			try {
				navigation.navigate('home', { status: 'add' });
			} catch (e) {
				console.log(e);
			}
			setLoading(false);
		}();
	}

	const toggleSwitch = () => setIsEnabled(previousState => !previousState);

	const checkHandle = () => {
		setChecked(!checked);
		if (checked) {
			setChkCOlor('#bbb');
		} else {
			setChkCOlor('#fb5438');
		}
	}

	return (<TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
		<View style={defaultStyle.wrap}>
			{loading && <LoadingOverlay />}
			<View style={{paddingHorizontal: 24}}>
				<View>
					<CustomText style={{textAlign: 'center', fontSize: 16, color: '#8e8e8f', lineHeight: 22}} type={'hand'}>
						10일동안 새로운 습관을 만들어요{'\n'}
						한 번 만든 습관은 변경이 어려워요! {'\n'}
						만들기 전 한 번 더 확인해주세요
					</CustomText>
				</View>
				<View style={{marginTop: 20}}>
					<TextInput style={[styles.input]}
						value={title}
						maxLength={20}
						onChangeText={(txt) => setTitle(txt)}
						placeholder="새로운 습관의 이름을 입력해주세요" />
				</View>
				<View style={{marginTop: 30}}>
					<View style={styles.row}>
						<CustomText style={{flex: 1, color: '#8e8e8f'}}>알림설정</CustomText>
						<Switch
							trackColor={{ false: '#ddd', true: '#e1d3c1' }}
							thumbColor={isEnabled ? '#ffba5d' : '#f4f3f4'}
							ios_backgroundColor="#3e3e3e"
							onValueChange={toggleSwitch}
							value={isEnabled}
						/>
					</View>
					{isEnabled && <View style={[styles.row, {paddingVertical: 20, paddingRight: 20}]}>
						<CustomText style={{flex: 1, color: '#8e8e8f'}}>시간</CustomText>
						<Pressable onPress={showTimePicker}>
							<CustomText>{format(new Date(date), 'p', {locale: ko})}</CustomText>
						</Pressable>
							<DateTimePickerModal
								isVisible={isDatePickerVisible}
								mode="time"
								date={date}
								onConfirm={confirmHandle}
								onCancel={() => setDatePickerVisibility(false)}
							/>
						</View>}
				</View>
				<View style={{marginTop: 10, paddingRight: 10}}>	
					{/* 챌린지 실패 혹은 지속 여부 체크 */}
					<BouncyCheckbox
						size={18}
						style={{ margin: 0 }}
						text="정해진 시간 안에 인증을 놓쳐도 10일 동안 습관을 계속 유지 합니다"
						textStyle={{ fontFamily: 'Neo-Lt', fontSize: 12, textDecorationLine: 'none' }}
						fillColor={chkColor}
						unfillColor="#ddd"
						isChecked={checked}
						onPress={ checkHandle }
					/>
				</View>
				<View style={{marginTop: 30}}>
					<CustomButton title={"만들기"} onPress={ChallengeAddHandle} />
				</View>
			</View>
		</View>
	</TouchableWithoutFeedback>)
}
const styles = StyleSheet.create({
	input: {
		fontFamily: 'Neo-Bd',
		textAlign: 'center',
		fontSize: 16,
		borderRadius: 8,
		backgroundColor: '#fff',
		paddingHorizontal: 10,
		paddingVertical: 20
	},
	row: {
		flexDirection: 'row', 
		alignItems: 'center',
		borderRadius: 8,
		backgroundColor: '#fff',
		marginBottom: 16,
		paddingVertical: 4,
		paddingLeft: 20,
		paddingRight: 14
	}
})