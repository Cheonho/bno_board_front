import {MESSAGE} from "./userResponseDto" ;

export const Login = (response:any) => {
        console.log("📌 Login 함수 호출됨:", response);

        if(response.status === 200 || response.data.success) {
        return {
            data : response.data ,
            status : 200,
            message : MESSAGE.LOGIN.SUCCESS,

        } ;
    }
        return {

        status: 400,
        message : MESSAGE.LOGIN.FAILURE.DEFAULT
    } ;
}