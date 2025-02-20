import React from "react";

interface JoinFormProps {
    form: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    onCheck: (field: "userId" | "userName") => void;
}

const JoinForm: React.FC<JoinFormProps> = ({ form, onChange, onSubmit, onCheck }) => {
    return (
        <form onSubmit={onSubmit}>
            <h2>회원가입</h2>
            <input
    name="userId"
    placeholder="이메일"
    value={form.userId}
    onChange={onChange}
    />
    <button type="button" onClick={() => onCheck("userId")}>
    중복 확인
    </button>

    <input
    name="userPw"
    placeholder="비밀번호"
    type="password"
    value={form.userPw}
    onChange={onChange}
    />

    <input
    name="userName"
    placeholder="닉네임"
    value={form.userName}
    onChange={onChange}
    />
    <button type="button" onClick={() => onCheck("userName")}>
    중복 확인
    </button>

    <button type="submit">회원가입</button>
        </form>
);
};

export default JoinForm;
