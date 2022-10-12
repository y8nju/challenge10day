import { Canvas, Image, Text, useCanvasRef, useFont, useImage } from "@shopify/react-native-skia";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
const screen = Dimensions.get("screen");

export default function Canvasitem({ datauri }) {

    const ref = useCanvasRef();

    const image = useImage(datauri);
    const fontSize = 32;
    const font = useFont(require("../assets/fonts/NanumSquareNeo-aLt.ttf"), fontSize);
    if (font === null) {
        return null;
    }

    return (
        <Pressable style={styles.cameraArea}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Canvas style={{ flex: 1, width: "100%", height: "100%" }} ref={ref}>
                    {image && (
                        <Image
                            image={image}
                            fit="contain"
                            x={0}
                            y={screen.height / 4}
                            width={screen.width}
                            height={screen.height / 2}
                        />
                    )}
                    <Text
                        x={0}
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
        width: 110,
        height: 110,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        backgroundColor: "#ededed",
    },
})