import React from "react";
import styles from "styles/login.module.css";

interface Props {
    email: string,
    password: string,
    onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onPwChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onSubmit: (e: React.FormEvent) => void,
}

const LoginForm: React.FC<Props> = ({email, password, onEmailChange, onPwChange, onSubmit}) => {
    return (
        <form className={styles.login_form} onSubmit={onSubmit}>
            <h2 className={styles.title}>로그인</h2>
            <div>이메일 주소</div>
            <input
                className={styles.input_field}
                value={email}
                placeholder="youremail@example.com"
                type="email"
                onChange={onEmailChange}
            />
            <div>비밀번호</div>
            <input
                className={styles.input_field}
                value={password}
                placeholder="*******"
                type="password"
                onChange={onPwChange}
            />

            <button className={styles.login_button} type="submit">
                로그인
            </button>
        </form>
    );
};

export default LoginForm;
