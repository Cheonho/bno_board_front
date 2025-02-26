import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import RouterSetting from 'routes';
import GlobalStyles from 'styles/global';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <RouterSetting />
    </BrowserRouter>
  );
}

export default App;
