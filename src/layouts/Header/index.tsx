import React from 'react'
import './style.css'
import Button from "components/common/Button"
import useUserStore from 'stores/useUserStore'
import { clearSession } from 'utils/Login/LoginSession'
import { useNavigate, useLocation } from 'react-router-dom'
import { LOGIN_PATH, MAIN_PATH, FIND_ID_PW_PATH } from 'constant';

export default function Header() {
  const navigate = useNavigate();
  const clearUser = useUserStore((state) => state.clearUser);
  const userState = useUserStore((state) => state.user);
  const location = useLocation().pathname;
  const exceptionPath = [LOGIN_PATH(), FIND_ID_PW_PATH()]
  const buttonCheck = exceptionPath.includes(location);

  const loginPath = `${LOGIN_PATH()}`

  const logoutBtn = () => {
    clearUser()
    clearSession()
    navigate(MAIN_PATH())
  }

  return (
    <div className='header-box'>
      {!buttonCheck && (
        userState ? <Button text={"로그아웃"} classNames='btn-pr btn-login' onClick={logoutBtn}></Button> : <Button text={"로그인"} classNames='btn-pr btn-login' onClick={() => navigate(loginPath)} />
      )}
    </div>
  )
}
