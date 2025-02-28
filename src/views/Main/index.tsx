import React, { useEffect } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom'
import { BOARD_LIST_PATH, BOARD_PATH } from 'constant';

export default function Main() {
  
  const navigate = useNavigate();
  const boardUrl = `${BOARD_PATH()}/${BOARD_LIST_PATH()}`

  useEffect(() => {
    navigate(boardUrl)
  })
  
  return (
    <div></div>
  )
}
