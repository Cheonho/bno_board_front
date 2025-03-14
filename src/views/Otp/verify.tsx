import { verifyOtp } from "api/JoinBoard";
import styles from "styles/otp.module.css";
import OtpInput from "components/Login/OtpInput";
import useUserStore from 'stores/useUserStore'
import { useNavigate, useLocation } from 'react-router-dom'
import { LoginModel } from "common/UserModel";
import Swal from "sweetalert2";

interface User {
    id: string;
    email: string;
}

const VerifyOtpPage = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { setUser } = useUserStore();

    const email = location.state?.email || "";


    const handleOtpSubmit = async (otpCode: string) => {
        try {
            const response = await verifyOtp(email, otpCode);
            if (response.status === 200) {

                const loginmodel: LoginModel = response.data.loginResponseDto;
                setUser({
                    email: loginmodel.email,
                    role: loginmodel.role,
                    nickname: loginmodel.userNickname
                });
                const token = response.data.token;
                localStorage.setItem("token", token);

                Swal.fire({
                    icon: "success",
                    text: "인증 성공"
                }).then(() => {
                    navigate("/");
                });

            }
        } catch (error: any) {
            Swal.fire({
                icon: "error",
                text: "인증 실패"
            });
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