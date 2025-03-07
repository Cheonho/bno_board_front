import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Join from "./views/JoinBoard";
import Main from 'views/Main';
import Authentication from 'views/Authentication';
import User from 'views/User';
import BoardDetail from 'views/Board/Detail';
import BoardWrite from 'views/Board/Write';
import BoardUpdate from 'views/Board/Update';
import Container from 'layouts/Container';
import Nicknamecorrection from './components/Mypage/nicknamecorrection' ;
import Passwordcorrection from './components/Mypage/passwordcorrection';
import Addresscorrection from "./components/Mypage/addresscorrection";

import {
  AUTH_PATH,
  BOARD_DETAIL_PATH,
  BOARD_PATH,
  BOARD_UPDATE_PATH,
  BOARD_WRITE_PATH,
  FIND_ID_PW_PATH,
  JOIN_PATH,
  LOGIN_PATH,
  MAIN_PATH,
  MY_PAGE_PATH,
  USER_PATH,
  NICKNAME_CORRECTION,
  PASSWORD_CORRECTION,
  ADDRESS_CORRECTION
} from 'constant';

import Login from "./views/LoginBoard";
import FindIdPw from "./components/FindIdPw";
import MyPage from "./views/MyPage/MyPageindex";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Container />}>
          <Route path={LOGIN_PATH()} element={<Login />}/>
          <Route path={JOIN_PATH()} element={<Join />}/>
          <Route path={FIND_ID_PW_PATH()} element={<FindIdPw />}/>
          <Route path={MY_PAGE_PATH()} element={<MyPage />}/>
          <Route path={NICKNAME_CORRECTION()} element={<Nicknamecorrection />} />
          <Route path={PASSWORD_CORRECTION()} element={<Passwordcorrection />} />
          <Route path={ADDRESS_CORRECTION()} element={<Addresscorrection />} />
          <Route path={MAIN_PATH()} element={<Main />} />
          <Route path={AUTH_PATH()} element={<Authentication />} />
          <Route path={USER_PATH(`:userId`)} element={<User />} />
          <Route path={BOARD_PATH()}>
            <Route path={BOARD_DETAIL_PATH(`:boardNum`)} element={<BoardDetail />} />
            <Route path={BOARD_UPDATE_PATH(`:boardNum`)} element={<BoardUpdate />} />
            <Route path={BOARD_WRITE_PATH()} element={<BoardWrite />} />
          </Route>
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
