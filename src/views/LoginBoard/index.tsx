import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "api/LoginBoard";
import { saveSession } from "utils/Login/LoginSession";
import { UserModel } from "common/UserModel";
import LoginForm from "components/Login/LoginForm";
import styles from "styles/login.module.css";

// zustand = 상태관리
// 캐시 관리 = 리액트쿼리
const Login = () => {
    const [userId, setUserId] = useState("");
    const [salt, setSalt] = useState("");
    const navigate = useNavigate();

    const join = () => navigate("/join") ;
    const findIdPw = () => navigate("findIdPw") ;

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await login(userId, salt);
            if (response.status === 200) {
                const user: UserModel = response.data.user;
                saveSession(user.userName, user.role);
                alert(response.data.msg);
                navigate("/");
            }
        } catch (error) {
            // @ts-ignore
            alert("로그인 실패: " + (error.response?.data.msg || "네트워크 오류"));
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
                 <span onClick={join} style={{ cursor: "pointer" }}>
                    회원가입
                </span>
                &nbsp; | &nbsp;
                <span  onClick={findIdPw}style={{ cursor: "pointer" }}>
                    아이디, 비밀번호 찾기
                </span>
            </div>
        </div>
    );
};

export default Login;