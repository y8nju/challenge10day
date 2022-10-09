import { useState } from "react";
import { Dimensions, FlatList, ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";

const windowWidth = Dimensions.get('window').width;
const dumi = [
	// 챌린지에서 인증 시 사진 경로를 저장할 때 애초에 require(이미지경로)로 저장해야 로컬에서 불러와서 쓸 수 있음.
	// 아니면 다른 방법이 있는지 알아보기
	{imgURI: require("../../assets/images/defaultImg-1.png"),
		content: '나랏말싸미 듕귁에 달아 문자와로 서르 사맛디 아니할쎄 이런 젼차로 어린 백셩이 니르고져 홀 배 이셔도 마참내 제 뜨들 시러펴디 몯 할 노미 하니라 내 이랄 위하야 어엿비 너겨 새로 스믈 여듧 짜랄 맹가노니 사람마다 해여 수비 니겨 날로 쑤메 뼌한킈 하고져 할따라미니라',
		createdAt: "2022-10-05T13:01:17.056Z",
		emoji: '002'},
	{imgURI: require("../../assets/images/defaultImg-4.png"),
		content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum non maxime cupiditate facere, labore itaque eum enim culpa repudiandae architecto ducimus possimus in, dicta nostrum, error inventore voluptatum omnis fugiat!',
		createdAt: "2022-10-06T13:01:17.056Z",
		emoji: '006'},
]

export default function FeedScreen({navigation}) {
	const [feedList, setFeedList] = useState(dumi); // feed 데이터 들어옴
	function FeedItem({data}) {
		return (<Pressable style={styles.itemArea} onPress={() => navigation.navigate('feedDetail', {data: data})}>
			<ImageBackground source={data.imgURI} resizeMode="cover" style={{flex: 1}} /> 
		</Pressable>)
	}
	return (<View style={{flex: 1, backgroundColor: '#f2f2f2'}}>
		{feedList ? <FlatList style={{flex: 1}} data={feedList}
			keyExtractor={({_id})=> _id}
			numColumns = {3}
			renderItem={({item}) => <FeedItem data={item} />}
			/>
		: <></>}
	</View>);
}
const styles = StyleSheet.create({
	itemArea: {
		width: (windowWidth - 6) / 3,
		height: (windowWidth - 6) / 3,
		backgroundColor: '#ddd',
		margin: 1,
	}
})