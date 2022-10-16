import { useEffect, useState, useRef } from "react";
import { Keyboard, StyleSheet, Switch, TextInput, TouchableWithoutFeedback, View, Pressable, Alert } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import ko from "date-fns/esm/locale/ko/index.js";

import defaultStyle from "../style/defaultStyle";

import CustomText from "../../components/customText";
import LoadingOverlay from "../../components/loadingOverlay";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import CustomButton from "../../components/customButton";


import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { updatechallenge } from "../../util/challengeAPI";

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

export default function ChallengeChangeScreen({ navigation, route }) {
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

	const { data } = route.params;
	console.log(data);
	const [loading, setLoading] = useState(false);
	const [title, setTitle] = useState(data.title)
	// 알림 설정했으면 true, 아니면 false
	const [isEnabled, setIsEnabled] = useState(data.isnotification);
	const [date, setDate] = useState(new Date(data.hournotification) ?? new Date());
	console.log(date);
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const [checked, setChecked] = useState(true);
	const [chkColor, setChkCOlor] = useState('#fb5438');

	const showTimePicker = () => {
		setDatePickerVisibility(true);
	};

	const confirmHandle = (time) => {
		setDatePickerVisibility(false);
		//알림 설정.
		const identifier = Notifications.cancelAllScheduledNotificationsAsync({
			content: {
				title: '알림이 취소되었습니다.',
				body: "알림이 취소되었습니다.",
				data: { data: 'data' },
			},
			trigger: {
				second: 1,
			}
		});
		Notifications.cancelAllScheduledNotificationsAsync(identifier);

		Notifications.scheduleNotificationAsync({
			content: {
				title: "Challenge's 10 Days",
				body: `${Number(format(new Date(time), 'H', { locale: ko, format: ' HH:mm:ss' }))} : ${Number(format(new Date(time), 'm', { locale: ko, format: ' MM:dd HH:mm' }))} 챌린지 알림입니다.`,
				data: { data: 'data' },
			},

			//원하는 시간으로 변경
			trigger: {
				hour: Number(format(new Date(time), 'H', { locale: ko })),
				minute: Number(format(new Date(time), 'm'), { locale: ko }),
				repeats: true,
			},
		});
	};

	const ChallengeChangeHandle = async () => {

		let response;
		if (isEnabled === false) {
			response = await updatechallenge(data._id, isEnabled)
			if(response.type === true){
			const identifier = Notifications.scheduleNotificationAsync({
        content: {
          title: "알림이 취소되었습니다.",
          body: "알림이 취소되었습니다.",
          data: { data: "data" },
        },
        trigger: {
          second: 1,
        },
      });
			Notifications.cancelAllScheduledNotificationsAsync(identifier);
		}
		} else if(isEnabled === true) {
			response = await updatechallenge(data._id, isEnabled, date)
			if(response.type === true){
				confirmHandle(date);
			}
		}
		console.log("data",response);
		console.log("is",isEnabled)
		if (response.type === true) {
			// 챌린지 추가
			setLoading(true);
			!async function () {
				setLoading(false);
				try {
					navigation.navigate('home', { status: 'change' });
				} catch (e) {
					console.log(e);
				}
			}();
		} else {
			Alert.alert("에러", "현재 서버와 연결 상태가 좋지 않습니다.")
		}


	}

	const toggleSwitch = () => {setIsEnabled(previousState => !previousState)};

	const checkHandle = () => {
		setChecked(!checked);
		if (checked) {
			setChkCOlor('#bbb');
		} else {
			setChkCOlor('#fb5438');
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
				<View style={{ marginTop: 20 }}>
					<TextInput style={[styles.input]}
						value={title}
						maxLength={20}
						onChangeText={(txt) => setTitle(txt)}
						placeholder="새로운 습관의 이름을 입력해주세요" />
				</View>
				<View style={{ marginTop: 30 }}>

					<View style={[styles.row, { paddingRight: 14 }]}>
						<CustomText style={{ flex: 1, color: '#8e8e8f' }}>알림설정</CustomText>
						<Switch
							trackColor={{ false: '#ddd', true: '#e1d3c1' }}
							thumbColor={isEnabled ? '#ffba5d' : '#f4f3f4'}
							ios_backgroundColor="#3e3e3e"
							onValueChange={toggleSwitch}
							value={isEnabled}

						/>
					</View>
					{isEnabled && <View style={styles.row}>
						<CustomText style={{ flex: 1, color: '#8e8e8f' }}>시간</CustomText>
						<Pressable onPress={showTimePicker}>
							{/* 설정해놓은 알림 시간 있으면 보여주기 */}
							<CustomText>{format(new Date(date), 'p', { locale: ko })}</CustomText>

						</Pressable>
						<DateTimePickerModal
							isVisible={isDatePickerVisible}
							mode="time"
							date={date}
							onConfirm={(date) => { setDate(date); setDatePickerVisibility(false); }}
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
						unfillColor="#ddd"
						isChecked={checked}
						onPress={checkHandle}
					/>
				</View>
				<View style={{ marginTop: 30 }}>
					<CustomButton title={"수정하기"} onPress={ChallengeChangeHandle} />
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