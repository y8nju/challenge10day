import { Pressable, StyleSheet, Text, View } from "react-native";
import CircularProgress from 'react-native-circular-progress-indicator';
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from "date-fns";
import ko from "date-fns/esm/locale/ko/index.js";

import CustomText from "../components/customText";

export default function ChallengeItem({data}) {
	console.log(data)
	const navigation = useNavigation();
	return (<Pressable style={styles.itemArea} 
		onPress={() => navigation.navigate('challengeDetail', {data: data})}>
		<View>
		<CircularProgress
			value={data.confirmArr.length}
			radius={30}
			activeStrokeColor={'#ffba5d'}
			inActiveStrokeColor={'#e1d3c1'}
			inActiveStrokeOpacity={0.3}
			progressValueColor={'#8e8e8f'}
			maxValue={10}
			titleStyle={{fontFamily: 'Neo-Bd'}}
		/>
		</View>
		<View style={{marginLeft: 20, flex: 1}}>
			<Text style={{fontSize: 18, fontFamily: 'Neo-Bd' }} numberOfLines={1}>{data.title}</Text>
			<CustomText style={{color: '#8e8e8f', marginTop: 10}}>{format(new Date(data.createdAt), 'P', {locale: ko})} ~</CustomText>
		</View>
		<Pressable onPress={() => navigation.navigate('challengeChange', {data: data})} style={{marginRight: -8, padding: 8}}>
			<MaterialCommunityIcons name="chevron-right-circle" size={24} color="#ffba5d" />
		</Pressable>
	</Pressable>)
}
const styles = StyleSheet.create({
	itemArea: {
		flexDirection: 'row', 
		alignItems: 'center',
		borderRadius: 14,
		backgroundColor: '#fff',
		paddingHorizontal: 20,
		paddingVertical: 24
	},
})