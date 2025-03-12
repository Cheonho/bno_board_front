import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { activateOtp, setOtp } from "api/JoinBoard";
import { getCurrentUser } from "utils/Auth";
import styles from "styles/otp.module.css";
import OtpInput from "components/Login/OtpInput";
import useUserStore from 'stores/useUserStore'
import { clearSession } from 'utils/Login/LoginSession'
import { useNavigate, useLocation } from 'react-router-dom'
import { MAIN_PATH } from 'constant';

interface User {
    id: string;
    email: string;
}

const VerifyOtpPage = () => {
    const [user, setUser] = useState<User | null>(null);

    const navigate = useNavigate();
    const { clearUser, user: userState } = useUserStore();


    const handleOtpSubmit = async (otpCode: string) => {
        try {
            await activateOtp(otpCode);
            alert("OTP 인증 성공");
        } catch (error) {
            alert("OTP 인증 실패!");
        }
    };

    return (
        <div className={styles.container}>
            <h2>OTP 인증 페이지</h2>
            <OtpInput onSubmit={handleOtpSubmit} />
        </div>
    )


};

export default VerifyOtpPage;