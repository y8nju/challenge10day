import { Pressable, StyleSheet, Text, View } from "react-native";
import CircularProgress from 'react-native-circular-progress-indicator';
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from "date-fns";
import ko from "date-fns/esm/locale/ko/index.js";

import CustomText from "../components/customText";
import { colors } from "../screens/style/defaultStyle";

export default function ChallengeItem({data,challengetype}) {
	console.log("data",data);
	const navigation = useNavigation();
	return (<Pressable style={styles.itemArea} 
		onPress={() => navigation.navigate('challengeDetail', {data: data,challengetype:challengetype})}>
		<View>
		<CircularProgress
			value={[data.data.length,]}
			radius={30}
			activeStrokeColor={colors.sub}
			inActiveStrokeColor={colors.mid}
			inActiveStrokeOpacity={0.3}
			progressValueColor={colors.darkGray}
			maxValue={10}
			titleStyle={{fontFamily: 'Neo-Bd'}}
		/>
		</View>
		<View style={{marginLeft: 20, flex: 1}}>
			<Text style={{fontSize: 18, fontFamily: 'Neo-Bd' }} numberOfLines={1}>{data.title}</Text>
{data.data.length>0 && <CustomText style={{color: colors.darkGray, marginTop: 10, fontSize: 12}}>{format(new Date(data.data[0]?.createAt??null), 'P', {locale: ko})} ~  </CustomText>}
		</View>
		<Pressable onPress={() => navigation.navigate('challengeChange', {data: data})} style={{marginRight: -8, padding: 8}}>
			<MaterialCommunityIcons name="chevron-right-circle" size={24} color={colors.sub} />
		</Pressable>
	</Pressable>)
}
const styles = StyleSheet.create({
	itemArea: {
		flexDirection: 'row', 
		alignItems: 'center',
		borderRadius: 14,
		backgroundColor: '#fff',
		marginBottom: 10,
		paddingHorizontal: 20,
		paddingVertical: 24
	},
})