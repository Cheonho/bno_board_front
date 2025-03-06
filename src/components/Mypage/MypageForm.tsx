import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
// @ts-ignore
import Session from "react-session-api";
import styles from "../../styles/mypage.module.css" ;

interface Props {
    email: string,
    password:string,
    userNickname: string,
    address : string
}

const MypageForm: React.FC<Props> = ({email, userNickname, password, address}) => {
    const navigate = useNavigate();
    const nicknamecorrection = () => navigate("/nicknamecorrection",{ state: { loginmodel } });
    const passwordcorrection = () => navigate("/passwordcorrection", { state: { loginmodel } });
    const addresscorrection = () => navigate("/addresscorrection", { state: { loginmodel } })

    const location = useLocation();
    const [loginmodel, setLoginModel] = useState<any>()

    useEffect(() => {setLoginModel({
        userNickname: sessionStorage.getItem("userNickname"),
        role: sessionStorage.getItem("role"),
        email: sessionStorage.getItem("email"),
    })},[])

    return (
        <div className={styles.container}>
            <h2>기본 정보</h2>

            <div className={styles.info_box}>
                <span className={styles.info_title}>닉네임</span>
                <span className={styles.info_content}>{loginmodel?.userNickname || userNickname}</span>
                <button onClick={nicknamecorrection}>수정</button>
            </div>

            <div className={styles.info_box}>
                <span className={styles.info_title}>이메일</span>
                <span className={styles.info_content}>{loginmodel?.email || email}</span>
            </div>


            <div className={styles.info_box}>
                <span className={styles.info_title}>비밀번호</span>
                <button onClick={passwordcorrection}>수정</button>
            </div>

            <div className={styles.info_box}>
                <span className={styles.info_title}>주소</span>
                <button onClick={addresscorrection}>확인</button>
            </div>
        </div>
    );
};

export default MypageForm;
