import { Canvas, Image, Text, useCanvasRef, useFont, useImage } from "@shopify/react-native-skia";
import { useEffect } from "react";
import { Button, Dimensions, Pressable, StyleSheet, View } from "react-native";

const screen = Dimensions.get("screen")


export default function Canvasitem({ onPress,datauri,onImg64 }) {



    

    const ref = useCanvasRef();
    const image = useImage(datauri);
    const fontSize = 16;
    const todayDate = new Date(Date.now()).toLocaleString()
    const font = useFont(require("../assets/fonts/NanumSquareNeo-aLt.ttf"), fontSize);
    if (font === null) {
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
          }, 1000)
    }
    const cancelHandle = () => {
        onPress(false)
    }

    return (
        <Pressable style={{flex:1}}>
            <View style={{ flex: 1,justifyContent: 'center', alignItems: 'center',backgroundColor:"#000" }}>
                <Canvas style={{ flex: 1, width: "100%", height: "100%" }} ref={ref}>
                    {image && (
                        <Image
                            image={image}
                            fit="contain"
                            x={0}
                            y={screen.height/4}
                            width={screen.width}
                            height={screen.width}
                        />
                    )}
                    <Text
                        x={screen.width/5}
                        y={screen.width}
                        text={todayDate}
                        font={font}
                        color="white"
                    />
                </Canvas>
                <View style={{position:"absolute",bottom:30,flexDirection:"row"}}>
                    <Button onPress={cancelHandle} title="취소" />
                    <Button onPress={pressHandle} title="확인" />
                </View>
            </View>
        </Pressable>
    )
}
