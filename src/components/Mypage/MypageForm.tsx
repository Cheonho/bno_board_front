import React, {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import styles from "../../styles/mypage.module.css";
import {apitokendata, refreshToken} from "../../api/Mypage/nicknameindex";
import Swal from "sweetalert2";

import Passwordchangeindex from "../../views/MyPage/passwordchangeindex";
import Addresschangeindex from "../../views/MyPage/addresschangeindex";
import NicknameForm from "./nicknamecorrection";
import LoadingIdx from "../../views/MyPage/lodingldx";
import Otpidx from "../../views/MyPage/otpindex";
import {Cookies} from 'react-cookie';

const MypageForm = () => {

    const [email, setEmail] = useState("");
    const [nicknamemodalOpen, setNicknameModalOpen] = useState(false);
    const modalBackground = useRef<HTMLDivElement | null>(null);
    const [userNickname, setUserNickname] = useState("");
    const [address, setAddress] = useState("") ;
    const [Loading, setLoading] = useState<boolean>(true);

    const cookies = new Cookies() ;
    const refreshtoken = cookies.get("refreshToken")
    const token = localStorage.getItem("token");

    useEffect(() => {
        const checkToken = () => {


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
            Swal.fire({
                title: "로그인을 계속 유지하시겠습니까?",
                icon: "warning",
                text: "30분 연장됩니다.",

                showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
                confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
                cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
                confirmButtonText: '승인', // confirm 버튼 텍스트 지정
                cancelButtonText: '취소', // cancel 버튼 텍스트 지정

                reverseButtons: true,

            }).then(result => {
                if (result.isConfirmed) { // 확인을 눌렀을 때
                    RefreshToken(refreshtoken) ;
                } else {

                }
            }) ;

        } finally {
            setLoading(false);
        }
    };

    const RefreshToken = async (refreshtoken : string) => {
        try {
            const response = await refreshToken(refreshtoken) ;
            console.log(response);
            if (response.status === 200) {
                if (typeof token === "string") {
                    ApiTokenData(token);
                }
            }

        } catch (error : any) {
            console.log(error)

        }
    }


    if (Loading) {
        return (
            <LoadingIdx />
        )
    }

    return (
        <div className={styles.mypage_container}>
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
