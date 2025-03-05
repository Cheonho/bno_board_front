import {MESSAGE} from "./userResponseDto" ;

export const Error = ()=> {
    console.log("💨 ERROR 함수 호출됨") ;
        return {
            data: null,
            status: 500,
            message: MESSAGE.LOGIN.NETWORK_ERROR,
        }
    } ;
