import React, {useState} from "react";
import {checkUserId, checkUserName, join} from "../../api/JoinBoard";
import {emailPattern, isValidPassword} from "../../utils/Join/validation";
import {mergeAddress} from "../../utils/Join/address";
import JoinForm from "../../components/Join/joinForm";
import {useNavigate} from "react-router-dom";
import styles from "../../styles/join.module.css"
import {AxiosError} from "axios";

const Join: React.FC = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
        userNickname: "",
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
            if (name === "password") {
                handlePwCheck(updatedForm.password);
            } return updatedForm;
        });

        if(name === "email") {
            if(!emailPattern(form.email)) {
                setCheckMailMessage("이메일 형식이 올바르지 않습니다.")
                setCheckMailMessageType("error") ;
            } else {
                setCheckMailMessage("")
                setCheckMailMessageType("success") ;
            }
        }

    };

    const handleIdCheck = async (field: "email") => {
        try {
        const checkFn = checkUserId
        const response = await checkFn(form[field]);

            if (response.status === 200) {
                setCheckIdMessage(response.data.message);
                setCheckIdMessageType("success");
        }
      } catch (error : any) {
                setCheckIdMessage(error.response.data.body.message);
                setCheckIdMessageType("error");

            }
        }


    const handleNameCheck = async (field : "userNickname") => {
        try {
        const checkNameFn = checkUserName
        const response = await checkNameFn(form[field]);
        if (response.status === 200) {
            setCheckNameMessage(response.data.message);
            setCheckNameMessageType("success");
        }
    } catch (error : any) {
            setCheckNameMessage(error.response.data.body.message);
            setCheckNameMessageType("error");
        }
    };

const handlePwCheck = (password : string) => {
    if (password.length < 8 || password.length > 16) {
        setCheckPwMessage('비밀번호는 8자 이상 16자 이하로 입력해주세요.');
        setCheckPwMessageType("error");
        return;
    }

    // 정규식 검사
    if (!isValidPassword(password)) {
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
            const response =  await join({ ...form, address });

                    if(response.status === 200) {
                    alert(response.data.message)
                    navigate("/");
                }
            } catch (error:any) {
            const errorMessage = error.response?.data?.body?.message;
            const errorDetails = error.response?.data ;

            alert(errorMessage ? errorMessage : errorDetails);
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
