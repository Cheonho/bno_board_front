import React from 'react';
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Main from 'views/Main';
import Authentication from 'views/Authentication';
import Search from 'views/Search';
import User from 'views/User';
import BoardDetail from 'views/Board/Detail';
import BoardWrite from 'views/Board/Write';
import BoardUpdate from 'views/Board/Update';
import Container from 'layouts/Container';
import { BOARD_DETAIL_PATH, BOARD_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH } from 'constant';
import { AUTH_PATH } from 'constant';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Container />}>
          <Route path={MAIN_PATH()} element={<Main />} />
          <Route path={AUTH_PATH()} element={<Authentication />} />
          <Route path={SEARCH_PATH(`:searchWord`)} element={<Search />} />
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
