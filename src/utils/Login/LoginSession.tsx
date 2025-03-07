import internal from "node:stream";

export const saveSession = (id:number, userNickname:string, role:string, email:string) => {
    sessionStorage.setItem("id", String(id)) ;
    sessionStorage.setItem("userNickname", userNickname);
    sessionStorage.setItem("role", role);
    sessionStorage.setItem("email", email)
};

export const clearSession = () => {
    sessionStorage.clear();
};

export const getSessionUser = () => {
    const id = sessionStorage.getItem("id")
    const nickname = sessionStorage.getItem("userNickname")
    const role = sessionStorage.getItem("role")
    const email = sessionStorage.getItem("email")

    return {
        id: id,
        nickname: nickname,
        role : role,
        email: email
    }
}