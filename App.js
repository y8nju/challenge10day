import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import TodoScreen from './screens/todo/todoScreen';
import LoginScreen from './screens/account/loginScreen';
import FeedScreen from './screens/feed/feedScreen';
import HomeScreen from './screens/homeScreen';
import UserInfoScreen from './screens/userInfo/userInfoScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


function HomeStackNavigator() {
	return (<Stack.Navigator initialRouteName="home" screenOptions={{
		headerStyle: { backgroundColor: "#f2f2f2" },
		headerShadowVisible: false,
		headerTitleStyle: { fontFamily: "Gmarket-Medium" },
		animation: 'slide_from_right'
	}}>
		<Stack.Screen name="home" component={HomeScreen} />
	</Stack.Navigator>)
}
function FeedStackNavigator() {
	return (<Stack.Navigator initialRouteName="feed" screenOptions={{
		headerStyle: { backgroundColor: "#f2f2f2" },
		headerShadowVisible: false,
		headerTitleStyle: { fontFamily: "Gmarket-Medium" },
		animation: 'slide_from_right'
	}}>
		<Stack.Screen name="feed" component={FeedScreen} />
	</Stack.Navigator>)
}
function TodoDrawerNavigator() {
	return (<Drawer.Navigator initialRouteName="todo" screenOptions={{
		headerStyle: { backgroundColor: "#f2f2f2" },
		headerShadowVisible: false,
		headerTitleStyle: { fontFamily: "Gmarket-Medium" },
	}}>
		<Drawer.Screen name="todo" component={TodoScreen} />
	</Drawer.Navigator>)
}
function UserStackNavigator() {
	return (<Stack.Navigator initialRouteName="userInfo" screenOptions={{
		headerStyle: { backgroundColor: "#f2f2f2" },
		headerShadowVisible: false,
		headerTitleStyle: { fontFamily: "Gmarket-Medium" },
		animation: 'slide_from_right'
	}}>
		<Stack.Screen name="userInfo" component={UserInfoScreen} />
	</Stack.Navigator>)
}
function GuestStackNavigator() {
	<Stack.Navigator
		initialRouteName="login" screenOptions={{
			headerStyle: { backgroundColor: "#f2f2f2" },
			headerShadowVisible: false,
			headerTitleStyle: { fontFamily: "Gmarket-Medium" },
			animation: 'slide_from_right'
		}}>
		<Stack.Screen name="login" component={LoginScreen} />
		{/* <Stack.Screen name="signUp" component={} /> */}
	</Stack.Navigator>
}



export default function App() {
	const [fontLoaded] = useFonts({
		'Gmarket-Light': require('./assets/fonts/GmarketSansTTFLight.ttf'),
		'Gmarket-Medium': require('./assets/fonts/GmarketSansTTFMedium.ttf'),
		'Gmarket-Bold': require('./assets/fonts/GmarketSansTTFBold.ttf'),
		'Diary': require('./assets/fonts/EF_Diary.ttf'),
	})

	if (!fontLoaded) {
		return <></>
	}
	return (<>
		<StatusBar style="auto" />
		<NavigationContainer>
			<Tab.Navigator screenOptions={{
				tabBarLabelStyle: { fontFamily: 'Gmarket-Medium', paddingBottom: 5},
				tabBarActiveTintColor: "#fb5438",
				tabBarStyle: { backgroundColor: '#f2f2f2'}
			}}>
				{/* challenge */}
				<Tab.Screen name="HomeStack" component={HomeStackNavigator} 
					options={{headerShown: false,
					title: '챌린지',
					tabBarIcon:({ focused, color,  }) => (
					// <MaterialCommunityIcons name={focused ? 'ballot' : 'ballot-outline' } color={color} size={24} />
					<MaterialCommunityIcons name={focused ? 'card-bulleted' : 'card-bulleted-outline' } color={color} size={26} />
				)}}/>
				{/* feeed */}
				<Tab.Screen name="FeedStack" component={FeedStackNavigator}
					options={{ headerShown: false,
						title: '피드',
						tabBarIcon:({ focused, color,  }) => (
						<MaterialCommunityIcons name={focused ? 'image-multiple' : 'image-multiple-outline' } color={color} size={focused ? 24 : 22} />
					)}}/>
				{/* todo < drawer */}
				<Tab.Screen name="TodoDrawer" component={TodoDrawerNavigator}
					options={{ headerShown: false,
						title: '투두',
						tabBarIcon:({ focused, color,  }) => (
						// <MaterialCommunityIcons name={focused ? 'checkbox-marked' : 'checkbox-outline' } color={color} size={24} />
						<MaterialCommunityIcons name={focused ? 'check-circle' : 'check-circle-outline' } color={color} size={24} />
					)}}/>
				{/* user */}
				<Tab.Screen name="UserStack" component={UserStackNavigator}
					options={{ headerShown: false,
						title: '마이 페이지',
						tabBarIcon:({ focused, color,  }) => (
						<MaterialCommunityIcons name={focused ? 'account' : 'account-outline' } color={color} size={24} />
					)}}/>
			</Tab.Navigator>
		</NavigationContainer>
	</>
	);
}
