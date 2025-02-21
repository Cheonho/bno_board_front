import { authInstance } from "api/interceptor";

export const login = async (email: string, salt: string) => {
    return await authInstance.post(
        "/login",
        { email: email, salt: salt },
        { headers: { "Content-Type": "application/json" } }
    );
};
