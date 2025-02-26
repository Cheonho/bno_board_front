import React from 'react'
import './style.css'
import Button from "components/common/Button"
import useUserStore from 'stores/useUserStore'
import { clearSession } from 'utils/Login/LoginSession'
import { useNavigate } from 'react-router-dom'
import { LOGIN_PATH } from 'constant'

export default function Header() {
  const navigate = useNavigate();
  const clearUser = useUserStore((state) => state.clearUser)
  const userState = useUserStore((state) => state.user)

  const loginPath = `${LOGIN_PATH()}`

  const logoutBtn = () => {
    clearUser()
    clearSession()
  }

  return (
    <div className='header-box'>
      {userState ? <Button text={"로그아웃"} classNames='btn-pr' onClick={logoutBtn}></Button> : <Button text={"로그인"} classNames='btn-pr' onClick={() => navigate(loginPath)} />}
    </div>
  )
}
