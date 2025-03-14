import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "api/LoginBoard";
import { LoginModel, UserModel } from "common/UserModel";
import LoginForm from "components/Login/LoginForm";
import styles from "styles/login.module.css";
import { AxiosError } from 'axios'
import Swal from "sweetalert2";
import {Cookies} from 'react-cookie';

import useUserStore from "stores/useUserStore";
import { OTP_VERIFY_PATH } from "constant";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useUserStore();
    const navigate = useNavigate();
    const cookies = new Cookies();
    const join = () => navigate("/join");
    const findIdPw = () => navigate("/findIdPw");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await login(email, password);

            // 로그인 성공
            if (response.status === 200) {
                const loginmodel: LoginModel = response.data.loginResponseDto;
                if (loginmodel.otpEnabled) {
                    navigate("/otp/verify", { state: { email: loginmodel.email,
                                              refreshToken : response.data.refreshToken} });
                    return;
                }
                setUser({
                    email: loginmodel.email,
                    role: loginmodel.role,
                    nickname: loginmodel.userNickname
                });

                localStorage.setItem("token", response.data.accessToken);
                cookies.set("refreshToken", response.data.refreshToken) ;

                Swal.fire({
                    icon: "success",
                    text: response.data.message
                }).then(() => {
                    navigate("/");
                });

            }
        } catch (error: any) {
            console.log(error)
            Swal.fire({
                icon: "error",
                text: error.response.data.body.message
            });
        }
    }
    return (
        <div className={styles.login_page}>
            <LoginForm
                email={email}
                password={password}
                onEmailChange={(e) => setEmail(e.target.value)}
                onPwChange={(e) => setPassword(e.target.value)} // ✅ 카멜 케이스 수정
                onSubmit={handleLogin}
            />
            <div className={styles.all}>
                <span onClick={join} style={{ cursor: "pointer" }}>회원가입</span>
                &nbsp; | &nbsp;
                <span onClick={findIdPw} style={{ cursor: "pointer" }}>아이디, 비밀번호 찾기</span>
            </div>
        </div>
    );
};

export default Login;
