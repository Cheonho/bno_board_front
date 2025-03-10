import React, {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
// @ts-ignore
import Session from "react-session-api";
import styles from "../../styles/mypage.module.css" ;
import {apitokendata} from "../../api/Mypage/nicknameindex";

const MypageForm = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [userNickname, setUserNickname] = useState("") ;

    const nicknamecorrection = () => navigate("/nicknamecorrection");
    const passwordcorrection = () => navigate("/passwordcorrection");
    const addresscorrection = () => navigate("/addresscorrection") ;


    useEffect(() => {
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
                    setEmail(response.data.apitokendataDto.email) ;
                    setUserNickname(response.data.apitokendataDto.userNickname) ;
                }
            } catch (error: any) {
                console.log(error.response);
                navigate("/login") ;
            }
        };

        ApiTokenData(); // 함수 호출

    }, [useLocation().pathname]); // 경로가 변경될 때마다 실행


    return (
        <div className={styles.container}>
            <h2>기본 정보</h2>

            <div className={styles.info_box}>
                <span className={styles.info_title}>닉네임</span>
                <span className={styles.info_content}>
                    {userNickname}
                </span>
                <button className={styles.btn} onClick={nicknamecorrection}>수정</button>
            </div>

            <div className={styles.info_box}>
                <span className={styles.info_title}>이메일</span>
                <span className={styles.info_content}>
                    {email}
                </span>
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
