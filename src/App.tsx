import React from 'react';
import './App.css';
import Login from "./views/LoginBoard";
import BoardMain from "./components/BoardMain.";
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Join from "./views/JoinBoard";
import FindIdPw from "./components/FindIdPw";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Login />}/>
              <Route path="/board" element={<BoardMain />}/>
              <Route path="/join" element={<Join />}/>
              <Route path="/findIdPw" element={<FindIdPw />}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
