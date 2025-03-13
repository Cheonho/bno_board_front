import {
  ADDRESS_CORRECTION,
  AUTH_PATH,
  FIND_ID_PW_PATH,
  JOIN_PATH,
  LOGIN_PATH,
  MY_PAGE_PATH,
  NICKNAME_CORRECTION,
  PASSWORD_CORRECTION,
  USER_PATH,
  OTP_ACTIVATE_PATH,
  OTP_VERIFY_PATH
} from "constant";
import Login from "views/LoginBoard";
import Join from "views/JoinBoard";
import MyPage from "views/MyPage/MyPageindex";
import Nicknamecorrection from 'components/Mypage/nicknamecorrection' ;
import Passwordcorrection from 'components/Mypage/passwordcorrection';
import FindIdPw from "components/FindIdPw";
import Authentication from 'views/Authentication';
import User from 'views/User';
import AddressCorrectionForm from "../components/Mypage/addresscorrection";
import VerifyOtpPage from "views/Otp/verify";


export const userRoutes: MenuRouter[] = [
  {
    path: `${LOGIN_PATH()}`,
    element: <Login />
  },
  {
    path: `${JOIN_PATH()}`,
    element: <Join />
  },
  {
    path: `${FIND_ID_PW_PATH()}`,
    element: <FindIdPw />
  },
  {
    path: `${AUTH_PATH()}`,
    element: <Authentication />
  },
  {
    path: `${USER_PATH(`:userId`)}`,
    element: <User />
  },
  {
    path: `${MY_PAGE_PATH()}`,
    element: <MyPage />
  },
  {
    path: `${NICKNAME_CORRECTION()}`,
    element: <Nicknamecorrection />
  },
  {
    path: `${PASSWORD_CORRECTION()}`,
    element: <Passwordcorrection />
  },
  {
    path: `${ADDRESS_CORRECTION()}`,
    element: <AddressCorrectionForm />
  },
  {
    path: `${OTP_VERIFY_PATH()}`,
    element: <VerifyOtpPage />
  }
]