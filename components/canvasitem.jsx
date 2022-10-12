import { Canvas, Image, Text, useCanvasRef, useFont, useImage } from "@shopify/react-native-skia";
import { useEffect } from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";

export default function Canvasitem({ datauri,onPress }) {


    useEffect(() => {

        
        setTimeout(() => {
          // you can pass an optional rectangle
          // to only save part of the image
          try{
          const image = ref?.current?.makeImageSnapshot();
          if (image) {
            // you can use image in an <Image> component
            // Or save to file using encodeToBytes -> Uint8Array
            onPress(image.encodeToBase64())
          }
        } catch(e){

        }
        }, 1000)
      });

    const ref = useCanvasRef();
    const image = useImage(datauri);
    const fontSize = 10;
    const font = useFont(require("../assets/fonts/NanumSquareNeo-aLt.ttf"), fontSize);
    if (font === null) {
        return null;
    }
    

    return (
        <Pressable style={styles.cameraArea}>
            <View style={{ flex: 1,justifyContent: 'center', alignItems: 'center' }}>
                <Canvas style={{ flex: 1, width: "100%", height: "100%" }} ref={ref}>
                    {image && (
                        <Image
                            image={image}
                            fit="contain"
                            x={0}
                            y={0}
                            width={220}
                            height={220}
                        />
                    )}
                    <Text
                        x={25}
                        y={50}
                        text="Hello World"
                        font={font}
                        color="white"
                    />
                </Canvas>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    cameraArea: {
        width: 220,
        height: 220,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        backgroundColor: "#ededed",
    },
})