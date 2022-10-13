import Toast from 'react-native-root-toast';

export default function IosToast(msg) {
    Toast.show(msg, {
        duration: Toast.durations.SHORT,
        position: -30,
        shadow: true,
        animation: true,
        backgroundColor: '#0000006e'
    });
}