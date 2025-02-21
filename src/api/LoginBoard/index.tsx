import axios from "axios";

export const login = async (userId: string, salt: string) => {
    return await axios.post(
        "http://localhost:8080/login",
        { userId, salt },
        { headers: { "Content-Type": "application/json" } }
    );
};
