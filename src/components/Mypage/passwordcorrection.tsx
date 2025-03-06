import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import { passwordcorrection } from "../../api/Mypage/nicknameindex";
import styles from "../../styles/join.module.css";
import { isValidPassword } from "../../utils/Join/validation";

const PasswordForm: React.FC = () => {
    const [form, setForm] = useState({
        password: "",
        checkpassword: ""
    });
    const [checkPwMessage, setCheckPwMessage] = useState("");
    const [checkPwMessageType, setCheckPwMessageType] = useState<"success" | "error" | "">("");
    const navigate = useNavigate();

    const location = useLocation();
    const [loginmodel, setLoginModel] = useState<any>()

const id = Number(sessionStorage.getItem("id")); // 숫자로 변환
/*
const [password, setpassword] = useState("") ;
const handleNowPwcheck = async () => {
    const samepassword = await nowPasswordCheck(password, id) ;
    if
}*/

const handlePwCheck = (password: string) => {
        if (password.length < 8 || password.length > 16) {
            setCheckPwMessage("비밀번호는 8자 이상 16자 이하로 입력해주세요.");
            setCheckPwMessageType("error");
            return;
        }
        if (!isValidPassword(password)) {
            setCheckPwMessage("최소 하나의 대소문자, 숫자, 특수문자가 포함되어야 합니다.");
            setCheckPwMessageType("error");
        } else {
            setCheckPwMessage("");
            setCheckPwMessageType("success");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

        if (e.target.name === "password") {
            handlePwCheck(e.target.value);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await passwordcorrection(loginmodel.id);

            console.log(response);
            if (response.status === 200) {
                alert("변경되었습니다.");
            }
        } catch (error) {
            alert("변경 실패");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <p>비밀번호 변경하기</p>
                <input
                    name="nowpassword"
                    placeholder="현재 비밀번호"
                    type="password"
                    required
                />

                {(form.password.length > 0 && checkPwMessage) && (
                    <div className={styles.check_message} style={{ color: checkPwMessageType === "error" ? "red" : "green" }}>
                        {checkPwMessage}
                    </div>
                )}
                <input
                    name="password"
                    placeholder="새 비밀번호"
                    type="password"
                    required
                    value={form.password}
                    onChange={handleInputChange}
                />
                {(form.password.length > 0 && checkPwMessage) && (
                    <div className={styles.check_message} style={{ color: checkPwMessageType === "error" ? "red" : "green" }}>
                        {checkPwMessage}
                    </div>
                )}

                <br /> <br />
                <input
                    className={styles.pw}
                    value={form.checkpassword}
                    placeholder="비밀번호를 다시 입력해 주세요."
                    type="password"
                    required
                    name="checkpassword"
                    onChange={handleInputChange}
                />

                {(form.checkpassword.length > 0 && form.password !== form.checkpassword) && (
                    <div className={styles.check_message} style={{ color: "red" }}>
                        비밀번호가 일치하지 않습니다.
                    </div>
                )}
                <br />
                <br />
                <button type="submit">변경하기</button>
            </form>
        </div>
    );
};

export default PasswordForm;
