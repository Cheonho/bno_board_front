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
