import React, { useRef, useState} from "react";
import AddressCorrectionForm from "../../components/Mypage/addresscorrection";
import styles from "styles/modal.module.css"

const Addresschangeindex = () => {
    const [addressmodalOpen, setAddressModalOpen] = useState(false) ;
    const modalBackground = useRef<HTMLDivElement | null>(null);

    return (
        <div className={styles.address_box}>
            <br />
            <button className={styles.btn} onClick={() => setAddressModalOpen(true)}>수정</button>

        {addressmodalOpen && (
    <div className={styles.modal_container} ref={modalBackground} onClick={e => {
        if(e.target === modalBackground.current) {
            setAddressModalOpen(false);
        }
    }} >
        <div className={styles.modal_content}>
            <AddressCorrectionForm />
            <button className={styles.modal_close_btn} onClick={() => setAddressModalOpen(false)}>
                닫기
            </button>
        </div>
    </div>
        )}
        </div>
    )
}

export default Addresschangeindex ;