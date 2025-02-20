// 비밀번호 유효성 검사 (8~16자, 문자+숫자+특수문자 포함)
export const isValidPassword = (password: string) => {
    const pwPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,16}$/;
    return pwPattern.test(password);
};
