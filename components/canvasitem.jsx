import { useEffect } from "react";
import { Button, Dimensions, Pressable, StyleSheet, View } from "react-native";
import { Canvas, Group, Image, Text, useCanvasRef, useFont, useImage } from "@shopify/react-native-skia";
import { format } from "date-fns";
import ko from "date-fns/esm/locale/ko/index.js";

import CustomButton from "./customButton"

const screen = Dimensions.get("screen")


export default function Canvasitem({ onPress,datauri,onImg64 }) {

	const ref = useCanvasRef();
	const image = useImage(datauri);
	const fontSize = 30;
	const todayDate = format(new Date(), 'PP', { locale: ko });
	const todayDay = format(new Date(), 'ccc', { locale: ko });
	const todayTime = format(new Date(), 'HH:mm a')
	const dateFont = useFont(require("../assets/fonts/Goyang.ttf"), fontSize);
	const timeFont = useFont(require("../assets/fonts/Goyang.ttf"), fontSize * 2);
	if (dateFont === null && timeFont === null) {
		return null;
	}
	
	const pressHandle = () => {
		setTimeout(() => {
			// you can pass an optional rectangle
			// to only save part of the image
			try{
				const image = ref.current?.makeImageSnapshot();
				if (image) {
					// you can use image in an <Image> component
					// Or save to file using encodeToBytes -> Uint8Array
					onImg64(image.encodeToBase64())
					onPress(false)
				}
			} catch(e){
			}
			}, 2000)
	}
	const cancelHandle = () => {
		onPress(false)
	}

	return (
		<Pressable style={{flex:1}}>
			<View style={{ flex: 1,justifyContent: 'center', alignItems: 'center',backgroundColor:"#000" }}>
				<View style={styles.imageWrap}>
					<Canvas style={{ flex: 1, width: "100%", height: "100%" }} ref={ref}>
						{image && (
							<Image
								image={image}
								fit="contain"
								x={0}
								y={0}
								width={screen.width}
								height={screen.width}
							/>
						)}
						<Text
							x={screen.width / 2 - (fontSize*6) / 2 }
							y={screen.width / 2}
							text={todayDate+" ("+todayDay+")"}
							font={dateFont}
							color="white"
						/>
						<Text
							x={screen.width / 4}
							y={screen.width / 2 + fontSize * 2}
							text={todayTime}
							font={timeFont}
							color="white"
						/>
					</Canvas>
				</View>
				<View style={{position:"absolute", bottom:40, flexDirection:"row", justifyContent: 'space-between', width: '100%' }}>
					<CustomButton onPress={cancelHandle} title="취소" color="transparent" textStyle={{fontSize: 14}} style={{marginLeft: 50}} />
					<CustomButton onPress={pressHandle} title="확인" color="transparent" textStyle={{color: "#fb5538", fontSize: 14}} style={{marginRight: 50}} />
				</View>
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	imageWrap: {
		width: screen.width,
		height: screen.width
	}
})