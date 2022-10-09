import React, { useEffect, useRef } from 'react';
import {Animated, StyleSheet, Image, View, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function LoadingOverlay() {
	const emojiAnimatedValue1 = useRef(new Animated.Value(0)).current;
	const emojiAnimatedValue2 = useRef(new Animated.Value(0)).current;
	const emojiAnimatedValue3 = useRef(new Animated.Value(0)).current;
	const emojiAnimatedValue4 = useRef(new Animated.Value(0)).current;
	const emojiAnimatedValue5 = useRef(new Animated.Value(0)).current;
	const emojiAnimatedValue6 = useRef(new Animated.Value(0)).current;
	useEffect(()=> {
		const anim = {
			toValue: 1,
			duration: 1500,
			useNativeDriver: true,
		}
		const moveBall1 = Animated.timing(emojiAnimatedValue1, anim)
		const moveBall2 = Animated.timing(emojiAnimatedValue2, {...anim , delay: 300})
		const moveBall3 = Animated.timing(emojiAnimatedValue3, {...anim , delay: 600})
		const moveBall4 = Animated.timing(emojiAnimatedValue4, {...anim , delay: 900})
		const moveBall5 = Animated.timing(emojiAnimatedValue5, {...anim , delay: 1200})
		const moveBall6 = Animated.timing(emojiAnimatedValue6, {...anim , delay: 1500})
		
		Animated.loop( moveBall1, {iterations: -1} ).start()
		Animated.loop( moveBall2, {iterations: -1} ).start()
		Animated.loop( moveBall3, {iterations: -1} ).start()
		Animated.loop( moveBall4, {iterations: -1} ).start()
		Animated.loop( moveBall5, {iterations: -1} ).start()
		Animated.loop( moveBall6, {iterations: -1} ).start()
	})
	
	const yVal = emojiAnimatedValue1.interpolate({
		inputRange: [0, 0.25, 0.5, 0.75, 1],
		outputRange: [0, 7, 14, 7, 0],
	});
	const yVa2 = emojiAnimatedValue2.interpolate({
		inputRange: [0, 0.25, 0.5, 0.75, 1],
		outputRange: [0, 7, 14, 7, 0],
	});
	const yVa3 = emojiAnimatedValue3.interpolate({
		inputRange: [0, 0.25, 0.5, 0.75, 1],
		outputRange: [0, 7, 14, 7, 0],
	});
	const yVa4 = emojiAnimatedValue4.interpolate({
		inputRange: [0, 0.25, 0.5, 0.75, 1],
		outputRange: [0, 7, 14, 7, 0],
	});
	const yVa5 = emojiAnimatedValue5.interpolate({
		inputRange: [0, 0.25, 0.5, 0.75, 1],
		outputRange: [0, 7, 14, 7, 0],
	});
	const yVa6 = emojiAnimatedValue6.interpolate({
		inputRange: [0, 0.25, 0.5, 0.75, 1],
		outputRange: [0, 5, 10, 5, 0],
	});
	const animStyle1 = { transform: [ {translateY: yVal} ] };
	const animStyle2 = { transform: [ {translateY: yVa2} ] };
	const animStyle3 = { transform: [ {translateY: yVa3} ] };
	const animStyle4 = { transform: [ {translateY: yVa4} ] };
	const animStyle5 = { transform: [ {translateY: yVa5} ] };
	const animStyle6 = { transform: [ {translateY: yVa6} ] };

return (
	<View style={styles.container}>
		<View style={{flexDirection: 'row'}}>
			<Animated.Image source={require('../assets/images/emoji/smile.png')} style={[styles.ball, animStyle1]} />
			<Animated.Image source={require('../assets/images/emoji/heartEye.png')} style={[styles.ball, animStyle2]} />
			<Animated.Image source={require('../assets/images/emoji/sad.png')} style={[styles.ball, animStyle3]} />
			<Animated.Image source={require('../assets/images/emoji/sick.png')} style={[styles.ball, animStyle4]} />
			<Animated.Image source={require('../assets/images/emoji/sleepy.png')} style={[styles.ball, animStyle5]} />
			<Animated.Image source={require('../assets/images/emoji/angry.png')} style={[styles.ball, animStyle6]} />
		</View>
	</View>
);
}
const styles = StyleSheet.create({
	container: {
		width: windowWidth,
		height: windowHeight,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		zIndex: 10,
		backgroundColor: '#0000001f'
	},
	ball: {
		width: 30,
		height: 30,
		borderRadius: 30,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		fontWeight: 'bold',
		color: 'white',
		fontSize: 32
	}
})