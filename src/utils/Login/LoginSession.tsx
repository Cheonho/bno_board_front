export const saveSession = (userName: string, role: string, email: string) => {
    sessionStorage.setItem("userName", userName);
    sessionStorage.setItem("user", role);
    sessionStorage.setItem("email", email);
};

export const clearSession = () => {
    sessionStorage.clear();
};