import { authInstance } from "api/interceptor";

// 회원가입 API
export const join = async (userData: any) => {
    const response = await authInstance.post("/join", userData, {headers: { 'Content-Type': 'application/json' }});
    return response;
};

// 이메일 중복 확인 API
export const checkUserId = async (email: string) => {
    const response = await authInstance.get(`/idcheck?email=${email}`);
    return response.data.isAvailable;
};

// 닉네임 중복 확인 API
export const checkUserName = async (userName: string) => {
    const response = await authInstance.get(`/namecheck?userName=${userName}`);
    return response.data.isAvailable;
};
