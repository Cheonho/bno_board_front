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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/search" element={<Search />} />
        <Route path="/user" element={<User />} />
        <Route path="/board">
          <Route path="detail/:boardNum" element={<BoardDetail />} />
          <Route path="update/:boardNum" element={<BoardUpdate />} />
          <Route path="write" element={<BoardWrite />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
