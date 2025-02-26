import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "api/LoginBoard";
import { saveSession } from "utils/Login/LoginSession";
import { UserModel } from "common/UserModel";
import LoginForm from "components/Login/LoginForm";
import styles from "styles/login.module.css";
import useUserStore from "stores/useUserStore";

const Login = () => {
    const [userId, setUserId] = useState("");
    const [salt, setSalt] = useState("");
    const navigate = useNavigate();
    const setUser = useUserStore((state) => state.setUser)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await login(userId, salt);
            
            if (response.status === 200) {
                const user: UserModel = response.data.user;
                setUser({
                    email: user.email,
                    role: user.role,
                    nickname: user.userName
                })
                saveSession(user.userName, user.role, user.email);
                navigate("/");
            }
        } catch (error) {
            // @ts-ignore
            alert("로그인 실패: " + (error.response?.data.msg || "네트워크 오류"));
            // clearUser();
        }
    };

    return (
        <div className={styles.login_page}>
            <LoginForm
                userId={userId}
                salt={salt}
                onEmailChange={(e) => setUserId(e.target.value)}
                onPwChange={(e) => setSalt(e.target.value)}
                onSubmit={handleLogin}
            />
            <div className={styles.all}>
                <Link to="/join" style={{ textDecoration: "none" }}>
                    회원가입
                </Link>
                &nbsp; | &nbsp;
                <Link to="/findIdPw" style={{ textDecoration: "none" }}>
                    아이디, 비밀번호 찾기
                </Link>
            </div>
        </div>
    );
};

export default Login;
