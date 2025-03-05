import React, {useCallback, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import styles from "styles/join.module.css"
import DaumPostcode from 'react-daum-postcode';

function Join() {

    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [userPw, setUserPw] = useState("");
    const [userCheckPw, setUserCheckPw] = useState("");
    const navigagte = useNavigate();

    const [IsNamewConfirm, setIsNamewConfirm] = useState<boolean>(false)
    const [IsPwErrorcofirm, setIsPwErrorcofirm] = useState<boolean>(false)
    const [IsPwConfirm, setIsPwConfirm] = useState<boolean>(false)
    const [IsIdConfirm, setIsIdConfirm] = useState<boolean>(false)


    const [IdConfirmMsg, setIdConfirmMsg] = useState("")
    const [PwConfirmMsg, setPwConfirmMsg] = useState("")
    const [PwErrorMsg, setPwErrorMsg] = useState("")
    const [NameConfirmMsg, setNameConfirmMsg] = useState("")

    // 최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자 :
    const PwError = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,16}$/;
    // util = 날짜나 정규식


    const onClickLJoin =
        async (event: React.FormEvent) => {
            event.preventDefault();
            try {
                const response =
                    await axios.post("http://localhost:8080/join", {
                            userId,
                            userPw,
                            userName,
                            address,
                        }, { headers: { 'Content-Type': 'application/json' } }
                    ) ;

                console.log('회원가입 성공')
                alert('회원가입이 완료되었습니다.')
                navigagte("/")
            } catch (error) {
                alert('회원가입 실패')
            }

        };

    const onEmailHandler
        = (event: React.ChangeEvent<HTMLInputElement>) =>
        setUserId(event.target.value);

    const onClickButton
        = async (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/idcheck?userId=${userId}`,
            );
            if (response.data.isAvailable === true) {
                setIdConfirmMsg("사용 가능한 아이디입니다.")
                setIsIdConfirm(true)
            } else {
                setIdConfirmMsg("이미 사용 중인 아이디입니다.")
                setIsIdConfirm(false)
            }
        } catch (error) {

        }
    }
    const onPwHandler
        = (event: React.ChangeEvent<HTMLInputElement>) => {
        const userpw = event.target.value
        setUserPw(userpw);

        if (userpw.length < 8 || userpw.length > 16) {
            setPwErrorMsg('비밀번호는 8자 이상 16자 이하로 입력해주세요.');
            setIsPwErrorcofirm(false);
            return;
        }

        // 정규식 검사
        if (!PwError.test(userpw)) {
            setPwErrorMsg('최소 하나의 문자, 숫자, 특수문자가 포함되어야 합니다.');
            setIsPwErrorcofirm(false);
        } else {
            setPwErrorMsg('');
            setIsPwErrorcofirm(true);
        }
    }


    const onPwCheckHandler =
        useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
                const checkpw = event.target.value
                setUserCheckPw(checkpw);

                if (userPw === checkpw) {
                    setPwConfirmMsg('비밀번호가 일치합니다.')
                    setIsPwConfirm(true)
                } else {
                    setPwConfirmMsg("비밀번호가 일치하지 않습니다.")
                    setIsPwConfirm(false)
                }
            }, [userPw]
        )

    const onNameHandler
        = (event: React.ChangeEvent<HTMLInputElement>) =>
        setUserName(event.target.value);


    const onNameClickButton
        = async (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/namecheck?userName=${userName}`,
            );

            if (response.data.isAvailable === true) {
                setIsNamewConfirm(true)
                setNameConfirmMsg("사용 가능한 닉네임입니다.")
            } else {
                setIsNamewConfirm(false)
                setNameConfirmMsg("이미 존재하는 닉네임입니다.")
            }
        } catch (error) {

        }
    }

    const [isOpenPost, setIsOpenPost] = useState<boolean>(false);
    const [addressCode, setAddressCode] = useState<string>('');
    const [nomaladdress, setnomalAddress] = useState("");
    const [detailedAddress, setDetailedAddress] = useState("")

    const onChangeOpenPost = () => {
        setIsOpenPost(!isOpenPost);
    };

    const onCompletePost = (data:any) => {
        let fullAddr = data.address;
        let extraAddr = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddr += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddr += extraAddr !== '' ? ` (${extraAddr})` : '';
        }

        setAddressCode(data.zonecode); // 우편번호 설정
        setnomalAddress(fullAddr); //검색한 주소
        setIsOpenPost(false);
    };

    const onDetailAdsHandler
        = (event : React.ChangeEvent<HTMLInputElement>) => {
        setDetailedAddress(event.target.value) ;
    }

    const address  = nomaladdress + " " + detailedAddress + " " +  addressCode

    return(
        <div className={styles.join_page}>
            <form className="join-form" onSubmit={onClickLJoin}>
                <h2 className={styles.title}>회원가입</h2>
                <div>이메일 주소</div>
                <div>
                    <div className={styles.input_container} >
                        <input
                            className={styles.email}
                            value={userId}
                            placeholder="이메일을 입력해 주세요."
                            type="email"
                            name="이메일"
                            onChange={onEmailHandler}
                        />
                        <button className={styles.btn} type="button"
                                onClick={onClickButton}>
                            중복 확인
                        </button>
                        {userId.length > 0 && (
                            <span className={`message ${IsIdConfirm ? 'success' : 'error'}`}>{IdConfirmMsg}</span>
                        )}

                    </div>
                    <div>비밀번호</div>
                    <input
                        className={styles.pw}
                        value={userPw}
                        placeholder="비밀번호를 입력해 주세요."
                        type="password"
                        name="비밀번호"
                        onChange={onPwHandler} />
                    {userPw.length > 0 && (
                        <span className={`message ${IsPwErrorcofirm ? 'success' : 'error'}`}>{PwErrorMsg}</span>
                    )}

                    <div>
                        <input
                            className={styles.pw}
                            value={userCheckPw}
                            placeholder="비밀번호를 다시 입력해 주세요."
                            type="password"
                            name="비밀번호 체크"
                            onChange={onPwCheckHandler}/>
                        {userCheckPw.length > 0 && (
                            <span className={`message ${IsPwConfirm ? 'success' : 'error'}`}>{PwConfirmMsg}</span>
                        )}
                    </div>
                    <div>이름</div>
                    <div className={styles.input_container} >
                        <input
                            className={styles.name}
                            value={userName}
                            placeholder="닉네임을 입력해 주세요."
                            type="text"
                            name="닉네임"
                            onChange={onNameHandler}/>
                        <button className={styles.check_button} type="button"
                                onClick={onNameClickButton}>
                            중복 확인
                        </button>
                        {userName.length > 0 && (
                            <span className={`message ${IsNamewConfirm ? 'success' : 'error'}`}>{NameConfirmMsg}</span>
                        )}
                    </div>
                    <div>주소</div>
                    <div className={styles.ads} >
                        <input
                            value={nomaladdress}
                            placeholder="주소"
                            type="text"
                            name="주소"
                        />
                        <input
                            value={addressCode}
                            placeholder="우편번호"
                            type="text"
                            name="우편번호"
                        />
                        <input
                            value={detailedAddress}
                            placeholder="상세주소"
                            type="text"
                            name="상세주소"
                            onChange={onDetailAdsHandler}
                        />
                        <button type="button" className="Name" onClick={onChangeOpenPost}>주소 찾기</button>
                        {isOpenPost ? (
                            <DaumPostcode className="PostCodeStyle" autoClose onComplete={onCompletePost} />
                        ) : null}
                    </div>
                    <br />
                    <button type = "submit">회원가입</button>
                <div>이름</div>
                <div className={styles.input_container} >
                    <input
                    className={styles.name}
                    value={userName}
                    placeholder="닉네임을 입력해 주세요."
                    type="text"
                    name="닉네임"
                    onChange={onNameHandler}/>
                    <button className={styles.btn} type="button"
                            onClick={onNameClickButton}>
                        중복 확인
                    </button>
                    {userName.length > 0 && (
                        <span className={`message ${IsNamewConfirm ? 'success' : 'error'}`}>{NameConfirmMsg}</span>
                    )}
                </div>
                <div>주소</div>
                <div className={styles.ads} >
                    <input
                    value={nomaladdress}
                    placeholder="주소"
                    type="text"
                    name="주소"
                    />
                    <input
                      value={addressCode}
                      placeholder="우편번호"
                      type="text"
                      name="우편번호"
                      />
                    <input
                        value={detailedAddress}
                        placeholder="상세주소"
                        type="text"
                        name="상세주소"
                        onChange={onDetailAdsHandler}
                    />
                    <button type="button" className={`Name ${styles.btn}`} onClick={onChangeOpenPost}>주소 찾기</button>
                    {isOpenPost ? (
                        <DaumPostcode className="PostCodeStyle" autoClose onComplete={onCompletePost} />
                    ) : null}
                </div>
<br />
                <button type = "submit" className={styles.btn}>회원가입</button>

                </div>
            </form>
        </div>
    )

}

export default Join ;

