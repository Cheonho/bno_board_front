import React, { useEffect, useLayoutEffect, useState } from "react";
import AddressForm from "../Join/AddressForm";
import { mergeAddress } from "../../utils/Join/address";
import { addresschange, apitokendata } from "../../api/Mypage/nicknameindex";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../../styles/correction.module.css";
import Swal from "sweetalert2";

const AddressCorrectionForm: React.FC = () => {
    const [form, setForm] = useState({
        firstaddress: "",
        code: "",
        detail: "",
        address: ""
    });

    const navigate = useNavigate();

    const [id, setId] = useState("");

    const handleAddressChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const address = mergeAddress(form.firstaddress, form.detail, form.code);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await addresschange(address, String(id));
            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    text: response.data.message
                }).then(() => {
                    window.location.reload();
                    navigate("/mypage");
                });
            }
        } catch (error: any) {
            Swal.fire({
                icon: "error",
                text: error.response.data.body.message
            });

        }
    };


        const ApiTokenData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                Swal.fire({
                    icon: "error",
                    text: "다시 로그인해 주세요."
                }).then(() => {
                    navigate("/login");
                });
                return;
            }
            try {
                const response = await apitokendata(token);
                if (response.status === 200) {
                    setId(response.data.apitokendataDto.id);
                }
            } catch (error: any) {
                    navigate("/login");
            }
        };

    useEffect(() => {
        ApiTokenData(); // 함수 호출
    }, [useLocation().pathname]); // 경로가 변경될 때마다 실행

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <AddressForm
                    firstaddress={form.firstaddress}
                    code={form.code}
                    detail={form.detail}
                    onChange={handleAddressChange}
                />
                <button type="submit" className={styles.address_btn}>변경하기</button>
            </form>
        </div>
    );
};

export default AddressCorrectionForm;
