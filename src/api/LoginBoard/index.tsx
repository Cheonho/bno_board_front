import axios from "axios";


axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL || "http://localhost:8080";


export const login = async (email: string, password: string) => {
        const response= await axios.post("/login", {email, password});
        return response;

};

