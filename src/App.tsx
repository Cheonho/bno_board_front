import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import BoardDetail from './views/BoardDetail';

function App() {
  return (
    <div><Router>
      <Routes>
        <Route path="board/:id" element={<BoardDetail />} />
      </Routes>
    </Router >

    </div>
  );
}

export default App;
