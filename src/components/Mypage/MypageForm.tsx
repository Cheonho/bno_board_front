import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
// @ts-ignore
import Session from "react-session-api";
import styles from "../../styles/mypage.module.css" ;
import {apitokendata} from "../../api/Mypage/nicknameindex";

interface Props {
    email: string,
    password:string,
    userNickname: string,
    address : string
}

const MypageForm: React.FC<Props> = ({email, userNickname, password, address}) => {
    const navigate = useNavigate();
    const nicknamecorrection = () => navigate("/nicknamecorrection");
    const passwordcorrection = () => navigate("/passwordcorrection");
    const addresscorrection = () => navigate("/addresscorrection") ;

    const location = useLocation();
    const [loginmodel, setLoginModel] = useState<any>()

    useEffect(() => {setLoginModel({
        userNickname: sessionStorage.getItem("userNickname"),
        role: sessionStorage.getItem("role"),
        email: sessionStorage.getItem("email"),
    })},[])


    const ApiTokenData = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("다시 로그인 바랍니다.");
            navigate("/login");
            return;
        }

        try {
            const response = await apitokendata(token);  // 토큰을 전달
            if (response.status === 200) {
                console.log(response);
            }
        } catch (error: any) {
            console.log(error.response);
            alert(error.response.data.body.message)
        }
    };



    return (
        <div className={styles.container}>
            <h2>기본 정보</h2>

            <div className={styles.info_box}>
                <span className={styles.info_title}>닉네임</span>
                <span className={styles.info_content}>{loginmodel?.userNickname || userNickname}</span>
                <button className={styles.btn} onClick={nicknamecorrection}>수정</button>
            </div>

            <div className={styles.info_box}>
                <span className={styles.info_title}>이메일</span>
                <span className={styles.info_content}>{loginmodel?.email || email}</span>
            </div>


            <div className={styles.info_box}>
                <span className={styles.info_title}>비밀번호</span>
                <button className={styles.btn} onClick={passwordcorrection}>수정</button>
            </div>

            <div className={styles.info_box}>
                <span className={styles.info_title}>주소</span>
                <button className={styles.btn} onClick={addresscorrection}>확인</button>
            </div>
        </div>
    );
};

export default MypageForm;
