import React from 'react';
import './App.css';
import { Routes, BrowserRouter } from 'react-router-dom';
import RouterSetting from 'routes';

function App() {
  return (
    <BrowserRouter>
      <RouterSetting />
    </BrowserRouter>
  );
}

export default App;
