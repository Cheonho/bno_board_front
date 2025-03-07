import { authInstance } from "utils/interceptor";

// 회원가입 API
export const join = async (userData: any) => {
    const response = await authInstance.post("/join", userData);
    return response;
};

// 이메일 중복 확인 API
export const checkUserId = async (email: string) => {
        const response = await authInstance.get(`/idcheck?email=${email}`);
        return response;
    } ;

// 닉네임 중복 확인 API
export const checkUserName = async (userNickname: string) => {
    const response = await authInstance.get(`/namecheck?userNickname=${userNickname}`);
    return response;
};
