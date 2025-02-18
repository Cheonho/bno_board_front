import React from 'react';
import './App.css';
import BoardItem from 'components/BoardItem';
import { boardListMock } from 'mocks';

function App() {
  return (
    <>
      {boardListMock.map(boardList => <BoardItem boardListType={boardList} />)}
    </>
  );
}

export default App;
