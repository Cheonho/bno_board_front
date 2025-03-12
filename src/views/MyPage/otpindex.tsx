import React, {useState, useEffect, useCallback, use, useRef} from "react";
import styles from "../../styles/modal.module.css";

const Otpidx = () => {
    const [otpmodalOpen, setOtpmodalOpen] = useState(false);
    const modalBackground = useRef<HTMLDivElement | null>(null);

    return (
        <div className={styles.info_box}>
            <span className={styles.info_title}>otp 설정</span>
            <br/>
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
                    <div className={styles.modal_content}>
                        여기서 뭐 수정하고 하면 돼!!!
                        <br/>
                        여기에다가 뭐 넣으면 될 듯 ㅎㅎ

                        <button className={styles.modal_close_btn} onClick={() => setOtpmodalOpen(false)}>
                            닫기
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Otpidx;