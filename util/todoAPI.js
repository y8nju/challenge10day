import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const SERVER_IP = "http://192.168.4.97:8080"
// todo 생성
export async function addtodo(todoText) {
    const data = await AsyncStorage.getItem("authentication");
    const datad = JSON.parse(data)
    console.log(datad);
    const response = await axios.post(SERVER_IP + "/api/todo/addtodo", {
        writer: datad.data.name, todoText
    }, {
        headers: {
            common: {
                Authorization: `Bearer ${datad.token}`
            }
        }
    })
    return response.data
}

// todo 전체 불러오기
export async function getalltodo(writer) {
    const token = await AsyncStorage.getItem("authentication");
    const response = await axios.post(SERVER_IP + "/api/todo/getalltodo", {
        writer
    }, {
        headers: {
            common: {
                Authorization: `Bearer ${token}`
            }
        }
    })
    return response.data
}

// 완료여부에따라 todo 불러오기
export async function getcompletedtodo(ing) {
    const data = await AsyncStorage.getItem("authentication");
    const datad = JSON.parse(data);
    const response = await axios.post(SERVER_IP + "/api/todo/getcompletedtodo", {
        writer: datad.data.name, ing
    }, {
        headers: {
            common: {
                Authorization: `Bearer ${datad.token}`
            }
        }
    })
    return response.data
}

// todo 수정
export async function updatetodo(id, todoText) {
    const data = await AsyncStorage.getItem("authentication");
    const datad = JSON.parse(data);
    const response = await axios.put(SERVER_IP + "/api/todo/updatetodo", {
        id, todoText
    }, {
        headers: {
            common: {
                Authorization: `Bearer ${datad.token}`
            }
        }
    })
    return response.data
}

// todo 완료
export async function completedtodo(id, ing) {
    const data = await AsyncStorage.getItem("authentication");
    const datad = JSON.parse(data);
    const response = await axios.put(SERVER_IP + "/api/todo/completedtodo", {
        id, ing
    }, {
        headers: {
            common: {
                Authorization: `Bearer ${datad.token}`
            }
        }
    })
    return response.data
}

// todo 삭제
export async function deletetodo(id) {
    const data = await AsyncStorage.getItem("authentication");
    const datad = JSON.parse(data);
    const response = await axios.post(SERVER_IP + "/api/todo/deletetodo", {
        id
    }, {
        headers: {
            common: {
                Authorization: `Bearer ${datad.token}`
            }
        }
    })
    return response.data
}

