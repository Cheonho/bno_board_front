import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL || "http://localhost:8080";

export const nicknamechange = async (userNickname: string, id: string) => {
    console.log(userNickname, id)
    const stringId = String(id);
    const response = await axios.post(`/nicknamecorrection`, {userNickname, stringId});
    return response ;
};

export const passwordcorrection = async (id:number, password : string, nowpassword : string) => {
    console.log(password, id)
    const response = await axios.post(`/passwordcorrection`, {id, nowpassword, password});
    return response ;
};

export const addresschange = async (address : string, id:number)=> {
    console.log(id, address)
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