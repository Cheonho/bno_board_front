import React, {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import styles from "../../styles/mypage.module.css";
import { apitokendata } from "../../api/Mypage/nicknameindex";

import Passwordchangeindex from "../../views/MyPage/passwordchangeindex";
import Addresschangeindex from "../../views/MyPage/addresschangeindex";
import Lodingldx from "../../views/MyPage/lodingldx";
import NicknameForm from "./nicknamecorrection";
import LodingIdx from "../../views/MyPage/lodingldx";

const MypageForm = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [nicknamemodalOpen, setNicknameModalOpen] = useState(false);
    const modalBackground = useRef<HTMLDivElement | null>(null);
    const [userNickname, setUserNickname] = useState(""); // 닉네임 상태 추가
    const [Loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true) ;

        const ApiTokenData = async () => {
            const token =  localStorage.getItem("token") ;
            if(!token) {
                alert("재로그인 바랍니다.")
                navigate("/login") ;
                return ;
            }
            setLoading(true) ;
            try {
                const response = await apitokendata(token);  // 토큰을 전달
                if (response.status === 200) {
                    setEmail(response.data.apitokendataDto.email) ;
                    setUserNickname(response.data.apitokendataDto.userNickname);
                }
            } catch (error: any) {
                console.log(error.response);
                navigate("/login") ;
            } finally {
                setLoading(false) ;
            }
        };

        ApiTokenData(); // 함수 호출

    },[]);


    if (Loading) {
        return (
            <LodingIdx />
        )
    }

    return (
        <div className={styles.container}>
            <h2>기본 정보</h2>
            <div className={styles.info_box}>
                <span className={styles.info_title}>닉네임</span>
                <span className={styles.info_content}>{userNickname}</span>
                <button className={styles.btn} onClick={() => setNicknameModalOpen(true)}>
                    수정
                </button>

                {nicknamemodalOpen && (
                    <div
                        className={styles.modal_container}
                        ref={modalBackground}
                        onClick={(e) => {
                            if (modalBackground.current && e.target === modalBackground.current) {
                                setNicknameModalOpen(false);
                            }
                        }}
                    >
                        <div className={styles.modal_content}>
                            <NicknameForm />
                            <button className={styles.modal_close_btn} onClick={() => setNicknameModalOpen(false)}>
                                닫기
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.info_box}>
                <span className={styles.info_title}>이메일</span>
                <span className={styles.info_content}>{email}</span>
            </div>
            <Passwordchangeindex />
            <Addresschangeindex />
        </div>
    );
};

export default MypageForm;
