import React, {useState} from "react";
import MypageForm from "../../components/Mypage/MypageForm";

const MyPage = () => {
    const [email, setEmail]  = useState("");
    const [password, setPassword] = useState("");
    const [address, setaddress] = useState("") ;
    const [userNickname,setUserNickname] = useState("") ;


    return (
        <div style={{width: '100%'}}>
            <MypageForm
                />
            <div>

            </div>


        </div>



    )
}
export default MyPage ;