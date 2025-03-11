import React, {useEffect, useLayoutEffect, useState} from "react";
import AddressForm from "../Join/AddressForm";
import {mergeAddress} from "../../utils/Join/address";
import {addresschange, apitokendata} from "../../api/Mypage/nicknameindex";
import {useLocation, useNavigate} from "react-router-dom";

const AddressCorrectionForm: React.FC = () => {
    const [form, setForm] = useState({
        firstaddress: "",
        code:"",
        detail: "",
        address: ""
    });

    const navigate = useNavigate();

    const [id, setId] = useState("") ;
    const setAddress = useState("") ;


    const handleAddressChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const address = mergeAddress(form.firstaddress, form.detail, form.code);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

    try {
        const response = await addresschange(address, String(id)) ;
        if(response.status === 200) {
           alert(response.data.message) ;
           navigate("/mypage");
        }
    } catch (error : any) {
        alert(error.response.data.body.message) ;
    }
    } ;

    useLayoutEffect(() => {

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


    return(
<div>
    <form onSubmit={handleSubmit}>
    <AddressForm
        firstaddress={form.firstaddress}
        code={form.code}
        detail={form.detail}
        onChange={handleAddressChange} />
        <br />
    <button type = "submit">변경하기</button>
    </form>
    </div>

    )

};

export default AddressCorrectionForm ;