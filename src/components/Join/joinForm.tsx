import React, {useState} from "react";
import styles from "../../assets/Join.module.css" ;
import AddressForm from "../../components/Join/AddressForm";


interface JoinFormProps {
    form: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    onIdCheck: (field: "userId") => void;
    onNameCheck: (field: "userName") => void;

    checkIdMessage: string;
    checkIdMessageType: "success" | "error" | "";
    checkMailMessage: string
    checkMailMessageType: "success" | "error" | "";
    checkPwMessage: string;
    checkPwMessageType: "success" | "error" | "";
    checkNameMessage: string;
    checkNameMessageType: "success" | "error" | "";
    onAddressChange: (field: string, value: string) => void;
}

const JoinForm: React.FC<JoinFormProps> = ({ form, onChange, onSubmit, checkIdMessage, checkNameMessage,onNameCheck,
                                               checkNameMessageType, checkIdMessageType, onIdCheck, onAddressChange,
                                               checkPwMessage, checkPwMessageType, checkMailMessage, checkMailMessageType}) => {

    return (
        <form onSubmit={onSubmit}>
            <input
    type="email"
    name="userId"
    placeholder="이메일"
    value={form.userId}
    required // 필수입력
    onChange={onChange}
    />
    <button className={styles.check_button} type="button" onClick={() => onIdCheck("userId")}>
    중복 확인
    </button>
            {(form.userId).length > 0 && checkMailMessage && (
                <div className={styles.check_message} style={{ color: checkMailMessageType === "error" ? "red" : "green" }}>
                    {checkMailMessage}
                </div>
            )}
            {(form.userId).length > 0 && checkIdMessage && (
                <div className={styles.check_message} style={{ color: checkIdMessageType === "error" ? "red" : "green" }}>
                    {checkIdMessage}
                </div>
            )}
        <br />
            <input
                name="userPw"
                placeholder="비밀번호"
                type="password"
                required
                value={form.userPw}
                onChange={onChange}
            />
            {(form.userPw).length > 0 && checkPwMessage && (
                <div className={styles.check_message} style={{ color: checkPwMessageType === "error" ? "red" : "green" }}>
                    {checkPwMessage}
                </div>
            )}

            <br />

            <input
                className={styles.pw}
                value={form.userCheckPw}
                placeholder="비밀번호를 다시 입력해 주세요."
                type="password"
                required
                name="userCheckPw"
                onChange={onChange}
            />

            {(form.userCheckPw).length > 0 && form.userPw !== form.userCheckPw && (
                <div className={styles.check_message} style={{ color: "red" }}>
                    비밀번호가 일치하지 않습니다.
                </div>
            )}

            <br />
    <input
    name="userName"
    placeholder="닉네임"
    required
    value={form.userName}
    onChange={onChange}
    />
    <button className={styles.check_button } type="button" onClick={() => onNameCheck("userName")}>
    중복 확인
    </button>
            {(form.userName).length>0 && checkNameMessage && (
                <div className={styles.check_message} style={{ color: checkNameMessageType === "error" ? "red" : "green" }}>
                    {checkNameMessage}
                </div>
            )}
            <AddressForm
                firstaddress={form.firstaddress}
                code={form.code}
                detail={form.detail}
                onChange={onAddressChange} />

    <button className={styles.submit_button} type="submit">회원가입</button>
        </form>
);
};

export default JoinForm;
