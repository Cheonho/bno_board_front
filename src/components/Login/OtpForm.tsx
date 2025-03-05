import React from "react";

interface Props {
    encodedKey: string,
    qrUrl : string,
    code : string

}

const OtpForm: React.FC<Props> = ({encodedKey,qrUrl,code}) => {
    return (
         <form>
            <p>키 인증번호</p>
            <input
            value={encodedKey}
            name="encodedKey"
            type="text"
            />
            <p>바코드 주소</p>
            <input
                value={qrUrl}
                name="qrUrl"
                type="text"
            />
            <p>코드 입력창</p>
            <input
                value={code}
                name="code"
                type="text"
            />

            <button type="submit">
                전송
            </button>
        </form>

    )
}

export default OtpForm ;