import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL || "http://localhost:8080";

export const nicknamechange = async (userNickname: string, id: string) => {
    const response = await axios.post(`/nicknamecorrection`, {userNickname, id});
    return response ;
};

export const passwordcorrection = async (id:string, password : string, nowpassword : string, checkpassword : string) => {
    const response = await axios.post(`/passwordcorrection`, {id, nowpassword, password, checkpassword});
    return response ;
};

export const addresschange = async (address : string, id:string)=> {
    const response = await axios.post(`/addresscorrection`, {id, address})
    return response ;
}

export const apitokendata = async(token: any) => {
    const response = await axios.post(`/mypage/apitokendata`, {}, {
        headers : {
            "Authorization": `Bearer ${token}`
        }
    }) ;
    return response ;
}

export const refreshToken = async(refreshtoken : any) =>{
    const response = await axios.post(`/mypage/refreshtoken`, {}, {
    headers : {
        "Authorization": `Bearer ${refreshtoken}`
    }
}) ;
return response ;
}