
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { useFonts } from 'expo-font';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import TodoScreen from './screens/todo/todoScreen';
import LoginScreen from './screens/account/loginScreen';
import FeedScreen from './screens/feed/feedScreen';
import HomeScreen from './screens/homeScreen';
import UserInfoScreen from './screens/userInfo/userInfoScreen';
import PassChangeScreen from './screens/userInfo/passChangeScreen';
import WithdrawScreen from './screens/userInfo/withdrawScreen';
import SignupScreen from './screens/account/signupScreen';
import TodoEndScreen from './screens/todo/todoEndScreen';
import FeedDetailScreen from './screens/feed/feedDetailScreen';
import FeedUpdateScreen from './screens/feed/feedUptaeScreen';
import ChallengeAddScreen from './screens/challenge/challengeAddScreen';
import ChallengeChangeScreen from './screens/challenge/callengeChangeScreen';
import ChallengeDetailScreen from './screens/challenge/challengeDetailScreen';
import CustomText from './components/customText';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();



function HomeStackNavigator() {
	return (<Stack.Navigator initialRouteName="home" screenOptions={{
		headerStyle: { backgroundColor: "#f2f2f2" },
		headerShadowVisible: false,
		headerTitleStyle: { fontFamily: "Neo-Bd", color: "#504d49" },
		animation: 'slide_from_right'
	}}>
		<Stack.Screen name="home" component={HomeScreen}
			options={{title: '', headerTransparent: true, headerStyle: {backgroundColor: 'transparent'}}}/>
		<Stack.Screen name="challengeDetail" component={ChallengeDetailScreen}
			options={{title: '작심10일'}}/>
		<Stack.Screen name="challengeAdd" component={ChallengeAddScreen}
			options={{title: '작심10일 만들기'}}/>
		<Stack.Screen name="challengeChange" component={ChallengeChangeScreen}
			options={{title: '작심10일 수정하기'}}/>
	</Stack.Navigator>)
}
function FeedStackNavigator() {
	return (<Stack.Navigator initialRouteName="feed" screenOptions={{
		headerStyle: { backgroundColor: "#f2f2f2" },
		headerShadowVisible: false,
		headerTitleStyle: { fontFamily: "Neo-Bd", color: "#504d49" },
		animation: 'slide_from_right'
	}}>
		<Stack.Screen name="feed" component={FeedScreen}
			options={{ title: '피드'}}/>
		<Stack.Screen name="feedDetail" component={FeedDetailScreen}
			options={{headerTransparent: true, headerStyle: {backgroundColor: 'transparent'}}}/>
		<Stack.Screen name="feedUpdate" component={FeedUpdateScreen}
			options={{title: '피드 수정하기', headerTransparent: true, headerStyle: {backgroundColor: '#f2f2f20f'}}}/>
	</Stack.Navigator>)
}
function TodoDrawerNavigator() {
	return (<Drawer.Navigator initialRouteName="todoIng" screenOptions={{
		headerStyle: { backgroundColor: "#f2f2f2" },
		headerShadowVisible: false,
		headerTitleStyle: { fontFamily: "Neo-Bd", color: "#504d49" },
		drawerStyle: {
			paddingTop: 60,
			paddingLeft: 10
		},
		drawerActiveTintColor: "#fb5438",
		drawerActiveBackgroundColor: "transparent",
		drawerInactiveTintColor: "#8E8E8F",
	}}>
		<Drawer.Screen name="todoIng" component={TodoScreen}
			options={{ title: '진행 중'}} />
		<Drawer.Screen name="todoEnd" component={TodoEndScreen}
			options={{ title: '완료' }} />
	</Drawer.Navigator>)
}
function UserStackNavigator() {
	return (<Stack.Navigator initialRouteName="userInfo" screenOptions={{
		headerStyle: { backgroundColor: "#f2f2f2" },
		headerShadowVisible: false,
		headerTitleAlign: "center",
		headerTitleStyle: { fontFamily: "Neo-Bd", color: "#504d49" },
		animation: 'slide_from_right'
	}}>
		<Stack.Screen name="userInfo" component={UserInfoScreen}
			options={{ title: '마이 페이지', }} />
		<Stack.Screen name="passChange" component={PassChangeScreen}
			options={{ title: '비밀번호 변경' }} />
		<Stack.Screen name="withdraw" component={WithdrawScreen}
			options={{ title: '서비스 탈퇴' }} />
	</Stack.Navigator>)
}
function GuestStackNavigator() {
	return (<Stack.Navigator
		initialRouteName="login" screenOptions={{
			headerStyle: { backgroundColor: "#f2f2f2" },
			headerShadowVisible: false,
			headerTitleAlign: "center",
			headerTitleStyle: { fontFamily: "Neo-Bd", color: "#504d49" },
			animation: 'slide_from_right'
		}}>
		<Stack.Screen name="login" component={LoginScreen}
			options={{ title: '로그인',}} />
		<Stack.Screen name="signUp" component={SignupScreen}
			options={{ title: '회원가입', }} />
	</Stack.Navigator>)
}



export default function App() {
	const [fontLoaded] = useFonts({
		'Neo-Lt': require('./assets/fonts/NanumSquareNeo-aLt.ttf'),
		'Neo-Rg': require('./assets/fonts/NanumSquareNeo-bRg.ttf'),
		'Neo-Bd': require('./assets/fonts/NanumSquareNeo-cBd.ttf'),
		'Neo-Eb': require('./assets/fonts/NanumSquareNeo-dEb.ttf'),
		'Diary': require('./assets/fonts/EF_Diary.ttf'),
	})

	if (!fontLoaded) {
		return <></>
	}
	return (<>
		<StatusBar style="auto" />
		<NavigationContainer>
			<Tab.Navigator screenOptions={{
				tabBarLabelStyle: { fontFamily: 'Neo-Bd', paddingBottom: 5 },
				tabBarActiveTintColor: "#fb5438",
				tabBarStyle: { backgroundColor: '#f2f2f2' }
			}}>
				{/* challenge */}
				<Tab.Screen name="HomeStack" component={HomeStackNavigator}
					options={{
						headerShown: false,
						title: '챌린지',
						tabBarIcon: ({ focused, color, }) => (
							<MaterialCommunityIcons name={focused ? 'card-bulleted' : 'card-bulleted-outline'} color={color} size={26} />
						)
					}} />
				{/* feeed */}
				<Tab.Screen name="FeedStack" component={FeedStackNavigator}
					options={{
						headerShown: false,
						title: '피드',
						tabBarIcon: ({ focused, color, }) => (
							<MaterialCommunityIcons name={focused ? 'image-multiple' : 'image-multiple-outline'} color={color} size={focused ? 24 : 22} />
						)
					}} />
				{/* todo < drawer */}
				<Tab.Screen name="TodoDrawer" component={TodoDrawerNavigator}
					options={{
						headerShown: false,
						title: '투두',
						tabBarIcon: ({ focused, color, }) => (
							<MaterialCommunityIcons name={focused ? 'check-circle' : 'check-circle-outline'} color={color} size={24} />
						)
					}} />
				{/* user */}
				<Tab.Screen name="UserStack" component={UserStackNavigator}
					options={{
						headerShown: false,
						title: '마이 페이지',
						tabBarIcon: ({ focused, color, }) => (
							<MaterialCommunityIcons name={focused ? 'account' : 'account-outline'} color={color} size={24} />
						)
					}} />
			</Tab.Navigator>
		</NavigationContainer>
	</>
	);
}
