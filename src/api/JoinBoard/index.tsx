import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL || "http://localhost:8080";

// 회원가입 API
export const join = async (userData: any) => {
    const response = await axios.post("/join", userData);
    return response.data;
};

// 이메일 중복 확인 API
export const checkUserId = async (userId: string) => {
    const response = await axios.get(`/idcheck?userId=${userId}`);
    return response.data.isAvailable;
};

// 닉네임 중복 확인 API
export const checkUserName = async (userName: string) => {
    const response = await axios.get(`/namecheck?userName=${userName}`);
    return response.data.isAvailable;
};
