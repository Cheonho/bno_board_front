import React, { useState, useEffect, useCallback, use, useRef } from "react";
import styles from "../../styles/modal.module.css";
import QRCode from "react-qr-code";
import { activateOtp, setOtp } from "api/JoinBoard";
import { getCurrentUser } from "utils/Auth";
import OtpInput from "components/Login/OtpInput";
import useUserStore from 'stores/useUserStore'
import { clearSession } from 'utils/Login/LoginSession'
import { useNavigate, useLocation } from 'react-router-dom'
import { MAIN_PATH } from 'constant';

interface User {
    id: string;
    email: string;
}

const Otpidx = () => {
    const [otpmodalOpen, setOtpmodalOpen] = useState(false);
    const modalBackground = useRef<HTMLDivElement | null>(null);


    const [otpAuthUrl, setOtpAuthUrl] = useState("");
    const [user, setUser] = useState<User | null>(null);
    const [step, setStep] = useState(1);

    const navigate = useNavigate();
    const { clearUser, user: userState } = useUserStore();

    const logoutBtn = () => {
        clearUser()
        clearSession()
        navigate(MAIN_PATH())
    }

    useEffect(() => {
        const fetchUserAndSetupOtp = async () => {
            try {
                const userData = await getCurrentUser();
                if (userData) {
                    setUser(userData);
                    const data = await setOtp();
                    setOtpAuthUrl(data.otpAuthUrl);
                    setStep(2);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserAndSetupOtp();
    }, []);

    const handleOtpSubmit = async (otpCode: string) => {
        try {
            await activateOtp(otpCode);
            alert("OTP가 활성화되었습니다!");
            setStep(3);
        } catch (error) {
            alert("OTP 인증 실패! 다시 입력해주세요.");
        }
    };


    return (
        <div className={styles.info_box}>
            <span className={styles.info_title}>otp 설정</span>
            <br />
            <button className={styles.btn} onClick={() => setOtpmodalOpen(true)}>수정</button>

            {otpmodalOpen && (
                <div
                    className={styles.modal_container}
                    ref={modalBackground}
                    onClick={(e) => {
                        if (modalBackground.current && e.target === modalBackground.current) {
                            setOtpmodalOpen(false);
                        }
                    }}
                >
                    <div className={styles.otp_modal_content}>
                        <div className={styles.otpContainer}>
                            <h2>OTP 설정 페이지</h2>

                            {step === 1 && <p>QR 코드를 불러오는 중...</p>}

                            {step === 2 && otpAuthUrl && (
                                <div className={styles.container}>
                                    <QRCode value={otpAuthUrl} />
                                    <p>Google Authenticator 앱에서 QR 코드를 스캔하세요.</p>

                                    <OtpInput onSubmit={handleOtpSubmit} />
                                    <button className={styles.modal_close_btn} onClick={() => setOtpmodalOpen(false)}>
                                        닫기
                                    </button>


                                </div>
                            )}
                            {step === 3 &&
                                <>
                                    <h3>OTP가 활성화되었습니다! 이제 로그인 시 OTP가 필요합니다.</h3>
                                    <button onClick={logoutBtn} className={styles.otpButton}>로그아웃</button>
                                </>
                            }


                        </div>


                    </div>
                </div>
            )}
        </div>
    )
}

export default Otpidx;