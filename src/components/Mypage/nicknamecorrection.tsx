import React, { useState, useEffect } from "react";
import { checkUserName } from "../../api/JoinBoard";
import {useLocation, useNavigate} from "react-router-dom";
import {nicknamecorrection} from "../../api/Mypage/nicknameindex";


const NicknameForm: React.FC = () => {
    const [form, setForm] = useState({ userNickname: "" });
    const [checkNameMessage, setCheckNameMessage] = useState<string>(""); // 메시지 상태
    const [checkNameMessageType, setCheckNameMessageType] = useState<"success" | "error" | "">(""); // 메시지 타입 상태
    const navigate = useNavigate();

    const id = Number(sessionStorage.getItem("id")); // 숫자로 변환
    const userNickname = sessionStorage.getItem("userNickname")


    const handleNameCheck = async () => {
        const isAvailable = await checkUserName(form.userNickname);
        if (isAvailable) {
            setCheckNameMessage("사용 가능합니다.");
            setCheckNameMessageType("success");
        } else {
            setCheckNameMessage("이미 사용 중입니다.");
            setCheckNameMessageType("error");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, userNickname: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const respronse = await nicknamecorrection(form.userNickname, id);

            if(respronse.status === 200) {
                sessionStorage.setItem("userNickname",form.userNickname);
            alert("변경되었습니다.")
                navigate("/mypage") ;
            }
        } catch (error) {
            alert("변경 실패")
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
