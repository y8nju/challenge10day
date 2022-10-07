import { useEffect } from "react";
import { Text, View } from "react-native";
import defaultStyle from "../style/defaultStyle";

export default function TodoEndScreen({ navigation }) {

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <></>
        });

    })
    return (<View style={defaultStyle.wrap}>
        <Text>투두 완료된 리스트 불러오고, 아이템 터치하면 삭제 모달띄워주기</Text>
    </View>)
}