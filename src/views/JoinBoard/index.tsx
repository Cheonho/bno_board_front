import React, { useState } from "react";
import { join, checkUserId, checkUserName } from "../../api/JoinBoard";
import { isValidPassword } from "../../utils/Join/validation";
import { mergeAddress } from "../../utils/Join/address";
import JoinForm from "../../components/Join/joinForm";
import { useNavigate } from "react-router-dom";
import styles from "../../assets/Join.module.css"
import {emailPattern} from "../../utils/Join/validation";

const Join: React.FC = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        userId: "",
        userPw: "",
        userName: "",
        address: "",
        detail: "",
        code: "",
        userCheckPw: "",
        firstaddress: ""
    });

    const [checkIdMessage, setCheckIdMessage] = useState("");  // 중복 확인 메시지 상태
    const [checkIdMessageType, setCheckIdMessageType] = useState<"success" | "error" | "">("");  // 메시지 타입 상태

    const [checkMailMessage, setCheckMailMessage] = useState("");  // 중복 확인 메시지 상태
    const [checkMailMessageType, setCheckMailMessageType] = useState<"success" | "error" | "">("");  // 메시지 타입 상태

    const [checkNameMessage, setCheckNameMessage] = useState("");  // 중복 확인 메시지 상태
    const [checkNameMessageType, setCheckNameMessageType] = useState<"success" | "error" | "">("");  // 메시지 타입 상태

    const [checkPwMessage, setCheckPwMessage] = useState("");
    const [checkPwMessageType, setCheckPwMessageType] = useState<"success" | "error" | "">("");


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => {
            const updatedForm = { ...prev, [name]: value };

            // 비밀번호가 변경될 때마다 유효성 검사
            if (name === "userPw") {
                handlePwCheck(updatedForm.userPw);
            } return updatedForm;
        });

        if(name === "userId") {
            if(!emailPattern(form.userId)) {
                setCheckMailMessage("이메일 형식이 올바르지 않습니다.")
                setCheckMailMessageType("error") ;
            } else {
                setCheckMailMessage("")
                setCheckMailMessageType("success") ;
            }
        }

    };

    const handleIdCheck = async (field: "userId" ) => {
        const checkFn = checkUserId
        const isAvailable = await checkFn(form[field]);

        if (isAvailable) {
            setCheckIdMessage("사용 가능합니다.");
            setCheckIdMessageType("success");
        } else {
            setCheckIdMessage("이미 사용 중입니다.");
            setCheckIdMessageType("error");
        }
    };

    const handleNameCheck = async (field : "userName") => {
        const checkNameFn = checkUserName
        const isAvailable = await checkNameFn(form[field]);
        if (isAvailable) {
            setCheckNameMessage("사용 가능합니다.");
            setCheckNameMessageType("success");
        } else {
            setCheckNameMessage("이미 사용 중입니다.");
            setCheckNameMessageType("error");
        }
    };

const handlePwCheck = (userPw : string) => {
    if (userPw.length < 8 || userPw.length > 16) {
        setCheckPwMessage('비밀번호는 8자 이상 16자 이하로 입력해주세요.');
        setCheckPwMessageType("error");
        return;
    }
    // 정규식 검사
    if (!isValidPassword(userPw)) {
        setCheckPwMessage ('최소 하나의 문자, 숫자, 특수문자가 포함되어야 합니다.');
        setCheckPwMessageType("error");
    } else {
        setCheckPwMessage('');
        setCheckPwMessageType("success")
    }
} ;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const address = mergeAddress(form.firstaddress, form.detail, form.code);
            // 🔹 상태값을 이용한 유효성 검사
            if ((form.userId).length < 1 ) {
                alert("아이디를 입력해 주세요.") ;
            } else if(checkIdMessageType !== "success") {
                alert("아이디를 체크해 주세요") ;
                } else if((form.userPw).length < 1) {
                    alert("비밀번호를 입력해 주세요") ;
                    } else if(checkPwMessageType !== "success") {
                        alert("비밀번호를 체크해 주세요") ;
                        } else  if((form.userName).length < 1 ) {
                            alert("닉네임을 입력해 주세요")
                             } else if(checkNameMessageType !== "success") {
                                alert("닉네임을 체크해 주세요")
                                } else {
                await join({ ...form, address });
                alert("회원가입 완료");
                navigate("/");

            }  } catch (error) {
            alert("회원가입 실패");
        }
    };

    const handleAddressChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };


    return (
        <div className={styles.join_page}>
            <div className={styles.join_form}>
                <h2>회원가입</h2>
                <JoinForm
                    form={form}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    onIdCheck={handleIdCheck}
                    onNameCheck={handleNameCheck}
                    onAddressChange={handleAddressChange}
                    checkIdMessage={checkIdMessage}
                    checkIdMessageType={checkIdMessageType}
                    checkMailMessage={checkMailMessage}
                    checkMailMessageType={checkMailMessageType}
                    checkPwMessage={checkPwMessage}
                    checkPwMessageType={checkPwMessageType}
                    checkNameMessage={checkNameMessage}
                    checkNameMessageType={checkNameMessageType}
                />

            </div>
        </div>
    );
};

export default Join;
