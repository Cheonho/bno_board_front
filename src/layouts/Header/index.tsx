import React from 'react'
import './style.css'
import Button from "components/common/Button"
import useUserStore from 'stores/useUserStore'
import { clearSession } from 'utils/Login/LoginSession'
import { useNavigate, useLocation } from 'react-router-dom'
import { LOGIN_PATH, MAIN_PATH, FIND_ID_PW_PATH, JOIN_PATH, MY_PAGE_PATH } from 'constant';

export default function Header() {
  const navigate = useNavigate();
  const {clearUser, user: userState} = useUserStore();
  const token = localStorage.getItem('token')
  // const userState = useUserStore((state) => state.user);
  const location = useLocation().pathname;
  const exceptionPath = [LOGIN_PATH(), FIND_ID_PW_PATH(), JOIN_PATH(), '/board/update', '/board/detail']
  const buttonCheck = exceptionPath.some(path => location.startsWith(path));

  const loginPath = `${LOGIN_PATH()}`
  const myPagePath = `${MY_PAGE_PATH()}`
  const boardPath = `${MAIN_PATH()}`

  const logoutBtn = () => {
    clearUser()
    clearSession()
    navigate(MAIN_PATH())
  }

  return (
    <div className={!buttonCheck ? 'header-box' : ""}>
      {!buttonCheck && (
        <>
          <Button text={"게시판"} classNames='btn-pr btn-login' onClick={() => navigate(boardPath)} />
          {
            (userState && token) ? (
              <>
                <Button text={"마이 페이지"} classNames='btn-pr btn-login' onClick={() => navigate(myPagePath)} />
                <Button text={"로그아웃"} classNames='btn-pr btn-login' onClick={logoutBtn} />
              </>
            ) : (
              <Button text={"로그인"} classNames='btn-pr btn-login' onClick={() => navigate(loginPath)} />
            )
          }
        </>
      )}
    </div>
  )
}
