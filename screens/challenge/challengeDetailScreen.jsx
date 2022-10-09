import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import defaultStyle from "../style/defaultStyle";

export default function ChallengeDetailScreen() {
    return (<TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <View style={defaultStyle.wrap}>

        </View>
    </TouchableWithoutFeedback>)
}