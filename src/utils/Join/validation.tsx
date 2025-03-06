// 비밀번호 유효성 검사 (8~16자, 문자+숫자+특수문자 포함)
export const isValidPassword = (password: string) => {
    const pwPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>?]).{8,16}$/;
    return pwPattern.test(password);
};

export const emailPattern = (email: string) => {
    const iddPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return iddPattern.test(email) ;
}