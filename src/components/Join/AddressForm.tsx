import React, {useCallback, useState} from "react";
import DaumPostcode from "react-daum-postcode";
import styles from "../../styles/correction.module.css"

interface AddressFormProps {
    firstaddress: string;
    code: string;
    detail: string;
    onChange: (field: string, value: string) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ firstaddress, code, detail, onChange }) => {
    const [isOpenPost, setIsOpenPost] = useState<boolean>(false);

    const onChangeOpenPost = () => {
        setIsOpenPost((prev) => !prev);
    };

    const handleComplete = (data: any) => {
        onChange("firstaddress", data.address); // 주소 업데이트
        onChange("code", data.zonecode); // 우편번호 업데이트
        setIsOpenPost(false); // 완료 후 닫기
    };

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        onChange("detail", e.target.value) ;
    }, []);

    return (
        <div className={styles.address_form}>
            <input placeholder="주소" value={firstaddress} readOnly />
            <br />
            <input placeholder="우편번호" value={code} readOnly />
            <br />
            <input
                placeholder="상세주소"
                value={detail}
                onChange={handleInputChange}
            />
            <br />
            <button type="button" className={styles.address_btn} onClick={onChangeOpenPost}>
                주소 찾기
            </button>
            {isOpenPost && (
                <DaumPostcode autoClose onComplete={handleComplete} onClose={onChangeOpenPost} />

            )}

        </div>
    );
};

export default AddressForm;
