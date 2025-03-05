import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL || "http://localhost:8080";

// 회원가입 API
export const join = async (userData: any) => {
    const response = await axios.post("/join", userData);
    return response;
};

// 이메일 중복 확인 API
export const checkUserId = async (email: string) => {
        const response = await axios.get(`/idcheck?email=${email}`);
        return response;
    } ;

// 닉네임 중복 확인 API
export const checkUserName = async (userNickname: string) => {
    const response = await axios.get(`/namecheck?userNickname=${userNickname}`);
    return response;
};
