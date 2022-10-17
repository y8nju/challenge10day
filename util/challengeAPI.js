
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


const SERVER_IP = process.env.SERVER_IP


// 챌린지 생성
export async function addchallenge(title, isnotification, checked, hournotification = null) {
    const data = await AsyncStorage.getItem("authentication");
    const datad = JSON.parse(data);
    const response = await axios.post(SERVER_IP + "/api/challenge/addchallenge", {
        title, userId: datad.data.userId, isnotification, checked, hournotification
    }, {
        headers: {
            common: {
                Authorization: `Bearer ${datad.token}`
            }
        }
    })
    return response.data
}

// 챌린지 전체 불러오기 (진행 여부에 따라)
export async function readchallenge(isEnd) {
    const data = await AsyncStorage.getItem("authentication");
    const datad = JSON.parse(data);
    const response = await axios.post(SERVER_IP + "/api/challenge/readchallenge", {
        userId: datad.data.userId, isEnd: isEnd
    }, {
        headers: {
            common: {
                Authorization: `Bearer ${datad.token}`
            }
        }
    })
    return response.data

}

// 챌린지 하나 불러오기
export async function readonechallenge(id) {
    console.log(id);
    const data = await AsyncStorage.getItem("authentication");
    const datad = JSON.parse(data);
    const response = await axios.post(SERVER_IP + "/api/challenge/readonechallenge", {
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

//챌린지 시간 수정하기
export async function updatechallenge(id,checked, isnotification, hournotification = null) {
    const data = await AsyncStorage.getItem("authentication");
    const datad = JSON.parse(data);
    const response = await axios.put(SERVER_IP + "/api/challenge/updatechallenge", {
        id,checked ,isnotification, hournotification
    }, {
        headers: {
            common: {
                Authorization: `Bearer ${datad.token}`
            }
        }
    })
    return response.data
}

// 챌린지 삭제
export async function deletechallenge(id) {
    const data = await AsyncStorage.getItem("authentication");
    const datad = JSON.parse(data);
    const response = await axios.post(SERVER_IP + "/api/challenge/deletechallenge", {
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

