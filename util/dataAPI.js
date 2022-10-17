
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";



const SERVER_IP = process.env.SERVER_IP
// 데이터 등록
export async function adddata(imgData, day, emoji, comment, targetId) {
    const data = await AsyncStorage.getItem("authentication");
    const datad = JSON.parse(data);
    const response = await axios.post(SERVER_IP + "/api/data/adddata", {
        imgData, day, emoji, comment, targetId, userId: datad.data.userId
    }, {
        headers: {
            common: {
                Authorization: `Bearer ${datad.token}`
            }
        }
    })
    return response.data
}

// 데이터 수정
export async function updatedata(id, comment, emoji) {
    const data = await AsyncStorage.getItem("authentication");
    const datad = JSON.parse(data);
    const response = await axios.put(SERVER_IP + "/api/data/updatedata", {
        id, comment, emoji
    }, {
        headers: {
            common: {
                Authorization: `Bearer ${datad.token}`
            }
        }
    })
    return response.data
}

// 데이터 삭제
export async function deletedata(id) {
    const token = await AsyncStorage.getItem("authentication");
    const response = await axios.delete(SERVER_IP + "/api/data/deletedata", {
        id
    }, {
        headers: {
            common: {
                Authorization: `Bearer ${token}`
            }
        }
    })
    return response.data
}

// 데이터 하나 불러오기
export async function getdata(id) {
    const token = await AsyncStorage.getItem("authentication");
    const response = await axios.get(SERVER_IP + "/api/data/getdata", {
        id
    }, {
        headers: {
            common: {
                Authorization: `Bearer ${token}`
            }
        }
    })
    return response.data
}

// 데이터 전체 불러오기
export async function getalldata() {
    const data = await AsyncStorage.getItem("authentication");
    const datad = JSON.parse(data);
    const response = await axios.post(SERVER_IP + "/api/data/getalldata", {
        userId: datad.data.userId
    }, {
        headers: {
            common: {
                Authorization: `Bearer ${datad.token}`
            }
        }
    })
    return response.data
}

