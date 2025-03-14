import React, {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import styles from "../../styles/mypage.module.css";
import { apitokendata } from "../../api/Mypage/nicknameindex";
import Swal from "sweetalert2";

import Passwordchangeindex from "../../views/MyPage/passwordchangeindex";
import Addresschangeindex from "../../views/MyPage/addresschangeindex";
import NicknameForm from "./nicknamecorrection";
import LoadingIdx from "../../views/MyPage/lodingldx";
import Otpidx from "../../views/MyPage/otpindex";

const MypageForm = () => {

    const [email, setEmail] = useState("");
    const [nicknamemodalOpen, setNicknameModalOpen] = useState(false);
    const modalBackground = useRef<HTMLDivElement | null>(null);
    const [userNickname, setUserNickname] = useState("");
    const [address, setAddress] = useState("") ;
    const [Loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkToken = () => {
            const token = localStorage.getItem("token");

            if (!token) {
                return;
            }

            // .. 토큰이 존재할 때만 api 호출
            ApiTokenData(token);
        };

        checkToken();
        const interval = setInterval(checkToken, 10 * 60 * 1000); // 10초마다 체크

        return () => clearInterval(interval);

    }, []);

    const ApiTokenData = async (token: string) => {
        try {
            const response = await apitokendata(token);
            console.log("API 응답:", response);
            if (response.status === 200) {
                setEmail(response.data.apitokendataDto.email);
                setUserNickname(response.data.apitokendataDto.userNickname);
                setAddress(response.data.apitokendataDto.address);
            }
        } catch (error: any) {
            console.log("error : ", error);
            Swal.fire({
                icon: "error",
                text: "다시 로그인해 주세요."
            }).then(() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
            });
        } finally {
            setLoading(false);
        }
    };


    if (Loading) {
        return (
            <LoadingIdx />
        )
    }

    return (
        <div className={styles.container}>
            <h2>기본 정보</h2>
            <div className={styles.info_box}>
                <span className={styles.info_title}>닉네임</span>
                <span className={styles.info_content}>{userNickname}</span>
                <br />
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
            <div className={styles.info_box}>
                <span className={styles.info_title}>주소</span>
                <span className={styles.info_content}>{address}</span>
                <Addresschangeindex />
            </div>
            <div className={styles.info_box}>
            <Otpidx />
            </div>
        </div>
    );
};

export default MypageForm;
