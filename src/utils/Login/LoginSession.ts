export const saveSession = (name: string, role: string) => {
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("member", role);
};

export const clearSession = () => {
    sessionStorage.clear();
};
