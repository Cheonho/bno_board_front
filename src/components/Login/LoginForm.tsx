import React from "react";
import styles from "styles/login.module.css";

interface Props {
    userId: string;
    salt: string;
    onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onPwChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
}

const LoginForm: React.FC<Props> = ({ userId, salt, onEmailChange, onPwChange, onSubmit }) => {
    return (
        <form className="login-form" onSubmit={onSubmit}>
            <h2 className={styles.title}>로그인</h2>
            <div>이메일 주소</div>
            <input
                className={styles.email}
                value={userId}
                placeholder="youremail@example.com"
                type="email"
                onChange={onEmailChange}
            />
            <div>비밀번호</div>
            <input
                className={styles.pw}
                value={salt}
                placeholder="*******"
                type="password"
                onChange={onPwChange}
            />
            <button className={styles.btn} type="submit">
                로그인
            </button>
        </form>
    );
};

export default LoginForm;
