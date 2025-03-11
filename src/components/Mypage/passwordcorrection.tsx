import React, {useEffect, useLayoutEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {apitokendata, passwordcorrection} from "../../api/Mypage/nicknameindex";
import styles from "../../styles/correction.module.css";
import { isValidPassword } from "../../utils/Join/validation";

const PasswordForm: React.FC = () => {
    const [form, setForm] = useState({
        password: "",
        checkpassword: ""
    });

    const [nowpassword, setNowpassword] = useState("") ;
    const [checkPwMessage, setCheckPwMessage] = useState("");
    const [checkPwMessageType, setCheckPwMessageType] = useState<"success" | "error" | "">("");


    const navigate = useNavigate();

    const [id, setId] = useState("") ;


    useEffect(() => {

        const ApiTokenData = async () => {
            const token =  localStorage.getItem("token") ;
            if(!token) {
                alert("재로그인 바랍니다.")
                navigate("/login") ;
                return ;
            }
            try {
                const response = await apitokendata(token);  // 토큰을 전달
                if (response.status === 200) {
                    setId(response.data.apitokendataDto.id) ;

                }
            } catch (error: any) {
                console.log(error.response);
                navigate("/login") ;
            }
        };

        ApiTokenData(); // 함수 호출

    }, [useLocation().pathname]); // 경로가 변경될 때마다 실행

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
        window.location.reload();

        try {
            const response = await passwordcorrection(String(id), form.password, nowpassword);

            if (response.status === 200) {
                alert(response.data.message);
                navigate("/mypage");
            }
        } catch (error : any) {
            alert(error.response.data.body.message);
        }
    };

    return (
        <div  className={styles.container}>
            <form onSubmit={handleSubmit}>
                <p className={styles.title}>비밀번호 변경하기</p>
                <br />
                <input
                    className={styles.input_field}
                    name="nowpassword"
                    placeholder="현재 비밀번호"
                    type="password"
                    value={nowpassword}
                    required
                    onChange={(e) => setNowpassword(e.target.value)}
                />

                <br /> <br />
                <input
                    className={styles.input_field}
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
                    className={styles.input_field}
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
                <button type="submit" className={styles.pw_btn}>변경하기</button>
            </form>
        </div>
    );
};

export default PasswordForm;
