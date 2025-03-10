import React, {useEffect, useState} from "react";
import AddressForm from "../Join/AddressForm";
import {mergeAddress} from "../../utils/Join/address";
import {addresschange} from "../../api/Mypage/nicknameindex";

const AddressCorrectionForm: React.FC = () => {
    const [form, setForm] = useState({
        firstaddress: "",
        code:"",
        detail: "",
        address: ""
    });

    const id = Number(sessionStorage.getItem("id")) ;

    const handleAddressChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const address = mergeAddress(form.firstaddress, form.detail, form.code);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

    try {
        const response = await addresschange(address, id) ;
        if(response.status === 200) {
           alert(response.data.message) ;
        }
    } catch (error : any) {
        alert(error.response.data.body.message) ;
    }


    }

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