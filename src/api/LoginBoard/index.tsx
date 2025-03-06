import axios from "axios";
import {Login} from "../response/user/SuccessFailDto" ;
import {MESSAGE} from "../response/user/userResponseDto";
import {Error} from "../response/user/errorDto";
import {RecoilLoadable} from "recoil";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL || "http://localhost:8080";
export const login = async (email: string, password: string) => {
        const response= await axios.post("/login", {email, password});
        return response;

};

