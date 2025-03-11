import React, { useState, useEffect } from "react";
import { checkUserName } from "../../api/JoinBoard";
import { useLocation, useNavigate } from "react-router-dom";
import { apitokendata, nicknamechange } from "../../api/Mypage/nicknameindex";
import styles from "../../styles/correction.module.css";

const NicknameForm: React.FC = () => {
    const [form, setForm] = useState({ userNickname: "" });
    const [checkNameMessage, setCheckNameMessage] = useState<string>("");
    const [checkNameMessageType, setCheckNameMessageType] = useState<"success" | "error" | "">("");
    const navigate = useNavigate();


    const [id, setId] = useState("");
    const [userNickname, setUserNickname] = useState("");


    useEffect(() => {
        const ApiTokenData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("재로그인 바랍니다.");
                navigate("/login");
                return;
            }
            try {
                const response = await apitokendata(token);
                if (response.status === 200) {
                    setId(response.data.apitokendataDto.id);
                    setUserNickname(response.data.apitokendataDto.userNickname);
                }
            } catch (error: any) {
                console.log(error.response);
                navigate("/login");
            }
        };

        ApiTokenData();
    }, []);
    const handleNameCheck = async () => {
        try {
            const response = await checkUserName(form.userNickname);
            if (response.status === 200) {
                setCheckNameMessage(response.data.message);
                setCheckNameMessageType("success");
            }
        } catch (error: any) {
            setCheckNameMessage(error.response.data.body.message);
            setCheckNameMessageType("error");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, userNickname: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        window.location.reload();

        try {
            const response = await nicknamechange(form.userNickname, id);
            if (response.status === 200) {
                console.log(response);
                alert(response.data.message);
                navigate("/mypage");
            }
        } catch (error: any) {
            console.log(error);
            alert(error.response.data.body.message);
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <p className={styles.title}>닉네임 수정하기</p>
                <p className={styles.current_nickname}>현재 닉네임: {userNickname}</p>
                <input
                    type="text"
                    placeholder="새 닉네임을 작성하시오."
                    value={form.userNickname}
                    onChange={handleInputChange}
                    name="userNickname"
                    className={styles.input_field}
                />
                <button type="button" onClick={handleNameCheck} className={styles.btn}>
                    중복 확인
                </button>

                {checkNameMessage && (
                    <p className={`${styles.check_message} ${styles[checkNameMessageType]}`}>
                        {checkNameMessage}
                    </p>
                )}
                <button type="submit" className={styles.btn}>
                    변경하기
                </button>
            </form>
        </div>
    );
};

export default NicknameForm;
