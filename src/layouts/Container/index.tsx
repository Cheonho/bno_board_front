import React, { useCallback, useEffect, useState } from 'react'
import Header from 'layouts/Header'
import Footer from 'layouts/Footer'
import {Outlet, useLocation} from 'react-router-dom'
import {AUTH_PATH, BOARD_LIST_PATH, BOARD_PATH, BOARD_WRITE_PATH, MY_PAGE_PATH} from 'constant';
import './style.css'

export default function Container() {
  const { pathname } = useLocation();
  const [isClass, setIsClass] = useState(false);
  
  const checkFun = useCallback(() => {
    const checkUrl = [
      `${BOARD_PATH()}/${BOARD_LIST_PATH()}`, 
      `${BOARD_PATH()}/${BOARD_WRITE_PATH()}`, 
      `${BOARD_PATH()}/update`, 
      `${MY_PAGE_PATH()}`,
    ]
    const check = checkUrl.some(path => pathname.startsWith(path));
    setIsClass(check)
  }, [pathname])

  useEffect(() => {
    checkFun();
  }, [checkFun, pathname])

  return (
    <div className={isClass ? 'container' : ''}>
      <Header />
      <Outlet />
      {pathname !== AUTH_PATH() && <Footer />}
    </div>
  )
}
