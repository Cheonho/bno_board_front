import { useState } from "react";
import styles from "styles/otp.module.css";

interface OtpInputProps {
  onSubmit: (otpCode: string) => void; 
}

const OtpInput = ({ onSubmit }: OtpInputProps) => {
  const [otpCode, setOtpCode] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    setOtpCode(numericValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && otpCode.length === 6) {
      onSubmit(otpCode);
    }
  };

  return (
    <>
      <input 
        type="text"
        value={otpCode}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        placeholder="OTP 6자리 입력"
        maxLength={6}
        pattern="[0-9]*"
        inputMode="numeric"
        className={styles.otpInput}
      />
      <button onClick={() => onSubmit(otpCode)} disabled={otpCode.length !== 6} className={styles.otpButton}>
        OTP 인증하기
      </button>
    </>
  );
};

export default OtpInput;
