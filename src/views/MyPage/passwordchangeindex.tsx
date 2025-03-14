import { useRef, useState } from "react";
import PasswordForm from "../../components/Mypage/passwordcorrection";
import styles from "styles/mypage.module.css";

const Passwordchangeindex = () => {
    const [passwordmodalOpen, setPasswordModalOpen] = useState(false);
    const modalBackground = useRef<HTMLDivElement | null>(null);

    return (
        <div className={styles.info_box}>
            <span className={styles.info_title}>비밀번호</span>
            <br />
            <button className={styles.btn} onClick={() => setPasswordModalOpen(true)}>수정</button>

            {passwordmodalOpen && (
                <div
                    className={styles.modal_container}
                    ref={modalBackground}
                    onClick={(e) => {
                        if (modalBackground.current && e.target === modalBackground.current) {
                            setPasswordModalOpen(false);
                        }
                    }}
                >
                    <div className={styles.modal_content}>
                        <PasswordForm />
                        <button className={styles.modal_close_btn} onClick={() => setPasswordModalOpen(false)}>
                            닫기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Passwordchangeindex;
