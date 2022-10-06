import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useFonts } from 'expo-font';
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
    headerTitleStyle: { fontFamily: "SUIT-Regular" },
    animation: 'slide_from_right'
  }}>
    <Stack.Screen name="home" component={HomeScreen} />
  </Stack.Navigator>)
}
function FeedStackNavigator() {
  return (<Stack.Navigator initialRouteName="feed" screenOptions={{
    headerStyle: { backgroundColor: "#f2f2f2" },
    headerTitleStyle: { fontFamily: "SUIT-Regular" },
    animation: 'slide_from_right'
  }}>
    <Stack.Screen name="feed" component={FeedScreen} />
  </Stack.Navigator>)
}
function TodoDrawerNavigator() {
  return (<Drawer.Navigator initialRouteName="todo" screenOptions={{
    headerStyle: { backgroundColor: "#f2f2f2" },
    headerTitleStyle: { fontFamily: "SUIT-Regular" },
  }}>
    <Drawer.Screen name="todo" component={TodoScreen} />
  </Drawer.Navigator>)
}
function UserStackNavigator() {
  return (<Stack.Navigator initialRouteName="userInfo" screenOptions={{
    headerStyle: { backgroundColor: "#f2f2f2" },
    headerTitleStyle: { fontFamily: "SUIT-Regular" },
    animation: 'slide_from_right'
  }}>
    <Stack.Screen name="userInfo" component={UserInfoScreen} />
  </Stack.Navigator>)
}
function GuestStackNavigator() {
  <Stack.Navigator
    initialRouteName="login" screenOptions={{
      headerStyle: { backgroundColor: "#f2f2f2" },
      headerTitleStyle: { fontFamily: "SUIT-Regular" },
      animation: 'slide_from_right'
    }}>
    <Stack.Screen name="login" component={LoginScreen} />
    {/* <Stack.Screen name="signUp" component={} /> */}
  </Stack.Navigator>
}



export default function App() {
  const [fontLoaded] = useFonts({
    'SUIT-Light': require('./assets/fonts/SUIT-Light.ttf'),	// 300
    'SUIT-Regular': require('./assets/fonts/SUIT-Regular.ttf'),	// 400
    'SUIT-SemiBold': require('./assets/fonts/SUIT-SemiBold.ttf'),	// 600
    'SUIT-ExtraBold': require('./assets/fonts/SUIT-ExtraBold.ttf'),	// 800
    'Kyobo': require('./assets/fonts/KyoboHandwriting.ttf'),
  })

  if (!fontLoaded) {
    return <></>
  }
  return (<>
    <StatusBar style="auto" />
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        tabBarLabelStyle: { fontFamily: 'SUIT-Regular' }
      }}>
        {/* challenge */}
        <Tab.Screen name="HomeStack" component={HomeStackNavigator}
          options={{ headerShown: false }} />
        {/* feeed */}
        <Tab.Screen name="FeedStack" component={FeedStackNavigator}
          options={{ headerShown: false }} />
        {/* todo < drawer */}
        <Tab.Screen name="TodoDrawer" component={TodoDrawerNavigator}
          options={{ headerShown: false }} />
        {/* user */}
        <Tab.Screen name="UserStack" component={UserStackNavigator}
          options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  </>
  );
}
