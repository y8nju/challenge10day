import axios from "axios";


const SERVER_IP = process.env.SERVER_IP
// 로그인 인증
export async function sendLoginReq(userId, password) {
    const response = await axios.post(SERVER_IP + "/api/account/auth", {
        userId, password
    })
    return response.data
}

// 토큰 유효성 검사
export async function valid(token) {
    const response = await axios.post(SERVER_IP + "/api/account/valid", {
        token
    })
    return response.data
}

// 비밀번호 변경
export async function changepassword(userId, password, changepassword) {
    const response = await axios.put(SERVER_IP + "/api/account/changepassword", {
        userId, password, changepassword
    })
    return response.data
}

// 회원가입
export async function sendRegisterReq(userId, password, name) {
    const response = await axios.post(SERVER_IP + "/api/account/register", {
        userId: userId, password: password, name: name
    })
    return response.data
}
// 회원탈퇴
export async function deleteid(userId) {
    const response = await axios.post(SERVER_IP + "/api/account/deleteid", {
        userId: userId
    })
    return response.data
}

