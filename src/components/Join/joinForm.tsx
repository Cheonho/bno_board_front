import React from "react";

interface JoinFormProps {
    form: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    onCheck: (field: "email" | "userName") => void;
}

const JoinForm: React.FC<JoinFormProps> = ({ form, onChange, onSubmit, onCheck }) => {
    return (
        <form onSubmit={onSubmit}>
            <h2>회원가입</h2>
            <input
    name="email"
    placeholder="이메일"
    value={form.email}
    onChange={onChange}
    />
    <button type="button" onClick={() => onCheck("email")}>
    중복 확인
    </button>

    <input
    name="password"
    placeholder="비밀번호"
    type="password"
    value={form.password}
    onChange={onChange}
    />

    <input
    name="userName"
    placeholder="닉네임"
    value={form.userName}
    onChange={onChange}
    />
    <button type="button" className="btn" onClick={() => onCheck("userName")}>
    중복 확인
    </button>

    <button type="submit">회원가입</button>
        </form>
);
};

export default JoinForm;
