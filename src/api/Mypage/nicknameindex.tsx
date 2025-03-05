import axios from "axios";

export const nicknamecorrection = async (userNickname: string, id:number) => {
    const response = await axios.post(`/nicknamecorrection`, {userNickname,id});
    return response ;
};

export const passwordcorrection = async (id:number) => {
    const response = await axios.post(`/passwordcorrection`, {id});
    return response ;
};

export const nowPasswordCheck = async (password:string, id: number)=> {
    const response = await axios.post(`nowPasswordCheck`, {password, id});
    return response ;
}
