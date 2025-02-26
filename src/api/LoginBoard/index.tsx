import { authInstance } from "utils/interceptor";

export const login = async (email: string, password: string) => {
    return await authInstance.post(
        "/user/login",
        { email: email, password: password },
        { headers: { "Content-Type": "application/json" } }
    );
};
