import { useEffect, useState, useRef } from "react";
import { Keyboard, StyleSheet, Switch, TextInput, TouchableWithoutFeedback, View, Pressable, Alert } from "react-native";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { format } from "date-fns";
import ko from "date-fns/esm/locale/ko/index.js";

import { addchallenge } from "../../util/challengeAPI";

import defaultStyle, { colors } from "../style/defaultStyle";

import LoadingOverlay from "../../components/loadingOverlay";
import CustomText from "../../components/customText";
import CustomButton from "../../components/customButton";


Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

export default function ChallengeAddScreen({ navigation }) {
	const [loading, setLoading] = useState(false);
	const [title, setTitle] = useState()
	const [isEnabled, setIsEnabled] = useState(false);
	const [date, setDate] = useState(new Date());
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const [checked, setChecked] = useState(null);
	const [chkColor, setChkCOlor] = useState('#bbb');

	const [expoPushToken, setExpoPushToken] = useState('');
	const [notification, setNotification] = useState(false);
	const notificationListener = useRef();
	const responseListner = useRef();

	useEffect(() => {
		registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

		notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
			setNotification(notification);
		});

		responseListner.current = Notifications.addNotificationResponseReceivedListener(response => {
			console.log(response);
		});

		return () => {
			Notifications.removeNotificationSubscription(notificationListener.current);
			Notifications.removeNotificationSubscription(responseListner.current);
		};
	}, []);

	const showTimePicker = () => {
		setDatePickerVisibility(true);
	};
	const confirmHandle = async (time) => {
		setDatePickerVisibility(false);
		// 선택된 시간 확인하기!
		setDate(time)

	 	await Notifications.scheduleNotificationAsync({
			content: {
				title: "Challenge's 10 Days",
				body: title,

			},

			//원하는 시간으로 변경
			trigger: {
				channelId:title,
				hour: Number(format(new Date(time), 'H', { locale: ko })),
				minute: Number(format(new Date(time), 'm'), { locale: ko }),
				repeats: true,
			},
		});

		let data = await Notifications.getAllScheduledNotificationsAsync();
		console.log(data[0].trigger.dateComponents);

	};


	const ChallengeAddHandle = () => {
		// 챌린지 추가
		setLoading(true);
		!async function () {
			try {
				const response = !isEnabled ? await addchallenge(title, isEnabled, checked) : await addchallenge(title, isEnabled, checked, date)
				if (response.type === true) {
					confirmHandle(date);
					navigation.navigate('home', { status: 'add' });
				} else {
					Alert.alert("에러", "현재 서버와 연결이 좋지 않습니다.")
				}
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
			setChkCOlor(colors.main);
		}
	}

	//expo token

	async function registerForPushNotificationsAsync() {
		let token;

		if (Platform.OS === 'android') {
			await Notifications.setNotificationChannelAsync('default', {
				name: 'default',
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: '#FF231F7C',
			});
		}

		if (Device.isDevice) {
			const { status: existingStatus } = await Notifications.getPermissionsAsync();
			let finalStatus = existingStatus;
			if (existingStatus !== 'granted') {
				const { status } = await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}
			if (finalStatus !== 'granted') {
				alert('Failed to get push token for push notification!');
				return;
			}
			token = (await Notifications.getExpoPushTokenAsync()).data;
			console.log(token);
		} else {
			alert('Must use physical device for Push Notifications');
		}

		return token;
	}


	return (<TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
		<View style={defaultStyle.wrap}>
			{loading && <LoadingOverlay />}
			<View style={{ paddingHorizontal: 24 }}>
				<View>
					<CustomText style={{ textAlign: 'center', fontSize: 16, color: colors.darkGray, lineHeight: 22 }} type={'hand'}>
						10일동안 새로운 습관을 만들어요{'\n'}
						한 번 만든 습관은 변경이 어려워요! {'\n'}
						만들기 전 한 번 더 확인해주세요
					</CustomText>
				</View>
				<View style={{ marginTop: 20 }}>
					<TextInput style={[styles.input]}
						value={title}
						maxLength={20}
						onChangeText={(txt) => setTitle(txt)}
						placeholder="새로운 습관의 이름을 입력해주세요" />
				</View>
				<View style={{ marginTop: 30 }}>
					<View style={styles.row}>
						<CustomText style={{ flex: 1, color: colors.darkGray }}>알림설정</CustomText>
						<Switch
							trackColor={{ false: colors.gray, true: colors.mid }}
							thumbColor={isEnabled ? colors.sub : '#f4f3f4'}
							ios_backgroundColor={colors.gray}
							onValueChange={toggleSwitch}
							value={isEnabled}
						/>
					</View>
					{isEnabled && <View style={[styles.row, { paddingVerticla: 20, paddingRight: 20 }]}>
						<CustomText style={{ flex: 1, color: colors.darkGray }}>시간</CustomText>
						<Pressable onPress={showTimePicker}>
							<CustomText>{format(new Date(date), 'p', { locale: ko })}</CustomText>
						</Pressable>
						<DateTimePickerModal
							isVisible={isDatePickerVisible}
							mode="time"
							date={date}
							onConfirm={(data)=>{setDate(data);setDatePickerVisibility(false);}}
							onCancel={() => setDatePickerVisibility(false)}
						/>
					</View>}
				</View>
				<View style={{ marginTop: 10, paddingRight: 10 }}>
					{/* 챌린지 실패 혹은 지속 여부 체크 */}
					<BouncyCheckbox
						size={18}
						style={{ margin: 0 }}
						text="정해진 시간 안에 인증을 놓쳐도 10일 동안 습관을 계속 유지 합니다"
						textStyle={{ fontFamily: 'Neo-Lt', fontSize: 12, textDecorationLine: 'none' }}
						fillColor={chkColor}
						unfillColor={colors.gray}
						isChecked={checked}
						onPress={checkHandle}
					/>
				</View>
				<View style={{ marginTop: 30 }}>
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
		height: 50,
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 8,
		backgroundColor: '#fff',
		marginBottom: 16,
		paddingHorizontal: 20,
	}
})