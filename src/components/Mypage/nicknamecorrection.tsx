import React, { useState, useEffect } from "react";
import { checkUserName } from "../../api/JoinBoard";
import {useLocation, useNavigate} from "react-router-dom";
import {nicknamechange} from "../../api/Mypage/nicknameindex";


const NicknameForm: React.FC = () => {
    const [form, setForm] = useState({userNickname: ""});
    const [checkNameMessage, setCheckNameMessage] = useState<string>(""); // 메시지 상태
    const [checkNameMessageType, setCheckNameMessageType] = useState<"success" | "error" | "">(""); // 메시지 타입 상태
    const navigate = useNavigate();

    const id = Number(sessionStorage.getItem("id")); // 숫자로 변환
    const userNickname = sessionStorage.getItem("userNickname")


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
        setForm({...form, userNickname: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await nicknamechange(form.userNickname, id);

            if (response.status === 200) {
                sessionStorage.setItem("userNickname", form.userNickname);
                console.log(response)
                alert(response.data.message);
                navigate("/mypage");
            }
        } catch (error: any) {
            console.log(error)
            alert(error.response.data.body.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <p>닉네임 수정하기</p>
                <p>현재 닉네임 : {userNickname}</p>
                <input
                    type="text"
                    placeholder="새 닉네임을 작성하시오."
                    value={form.userNickname}
                    onChange={handleInputChange}
                    name="userNickname"
                />
                <button type="button" onClick={handleNameCheck}>중복 확인</button>

            {checkNameMessage && (
                <p className={checkNameMessageType === "success" ? "success" : "error"}>
                    {checkNameMessage}
                </p>
            )}
            <br />
            <button type="submit" >변경하기</button>
            </form>
        </div>
    );
};

export default NicknameForm;