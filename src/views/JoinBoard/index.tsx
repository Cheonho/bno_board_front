import React, { useState } from "react";
import { join, checkUserId, checkUserName } from "../../api/JoinBoard";
import { isValidPassword } from "../../utils/Join/validation";
import { mergeAddress } from "../../utils/Join/address";
import JoinForm from "../../components/Join/joinForm";
import AddressForm from "../../components/Join/AddressForm";
import { useNavigate } from "react-router-dom";

const Join: React.FC = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        userId: "",
        userPw: "",
        userName: "",
        address: "",
        detail: "",
        code: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheck = async (field: "userId" | "userName") => {
        const checkFn = field === "userId" ? checkUserId : checkUserName;
        const isAvailable = await checkFn(form[field]);
        alert(isAvailable ? "사용 가능" : "이미 사용 중");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValidPassword(form.userPw)) {
            alert("비밀번호는 문자, 숫자, 특수문자 포함 8~16자입니다.");
            return;
        }

        try {
            const address = mergeAddress(form.address, form.detail, form.code);
            await join({ ...form, address });
            alert("회원가입 완료");
            navigate("/");
        } catch (error) {
            alert("회원가입 실패");
        }
    };

    return (
        <>
            <JoinForm form={form} onChange={handleChange} onSubmit={handleSubmit} onCheck={handleCheck} />
            <AddressForm
                address={form.address}
                code={form.code}
                detail={form.detail}
                onChange={(field, value) => setForm((prev) => ({ ...prev, [field]: value }))}
            />
        </>
    );
};

export default Join;
