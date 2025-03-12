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

// google otp 초기 세팅
export const setOtp = async () => {
    const token = localStorage.getItem("token"); 
    if (!token) throw new Error("로그인이 필요합니다.");

    const response = await authInstance.post(`/otp/setup`, {}, {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });
    return response.data;
};

// google otp 활성화 시키기
export const activateOtp = async (otpCode: string) => {
    const token = localStorage.getItem("token"); 
    if (!token) throw new Error("로그인이 필요합니다.");

    const response = await authInstance.post(`/otp/activate`, {otpCode},{
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });
    return response.data;

}

