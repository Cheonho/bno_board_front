import React from 'react';
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Main from 'views/Main';
import Authentication from 'views/Authentication';
import User from 'views/User';
import BoardDetail from 'views/Board/Detail';
import BoardWrite from 'views/Board/Write';
import BoardUpdate from 'views/Board/Update';
import Container from 'layouts/Container';
import { BOARD_DETAIL_PATH, BOARD_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, FIND_ID_PW_PATH, JOIN_PATH, LOGIN_PATH, MAIN_PATH, USER_PATH } from 'constant';
import { AUTH_PATH } from 'constant';

import Login from "./views/LoginBoard";
import Join from "./components/Join";
import FindIdPw from "./components/FindIdPw";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Container />}>
          <Route path={LOGIN_PATH()} element={<Login />}/>
          <Route path={JOIN_PATH()} element={<Join />}/>
          <Route path={FIND_ID_PW_PATH()} element={<FindIdPw />}/>

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
