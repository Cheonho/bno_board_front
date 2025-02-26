import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'styles/board-style.css';
import { BoardListType } from 'types/interface';
import { BOARD_DETAIL_PATH, BOARD_PATH, BOARD_WRITE_PATH, LOGIN_PATH } from 'constant';
import Input from 'components/common/Input';
import Button from 'components/common/Button';

interface Props {
  title: string;
  tableHeader: string[];
  boardList: BoardListType[];
  category: {value: number, name: string}[];
  onChangeSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selected: number;
  searchWord: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  pathList?: {name: string, value: any}[];
}

export default function BoardTable({ title, tableHeader, boardList, category, onChangeSelect, selected, searchWord, onChange, pathList }: Props) {

  const navigate = useNavigate();
  const writePath = pathList?.find((item) => {return item.name === "write"})?.value 
                    ?? `${BOARD_PATH()}/${BOARD_WRITE_PATH()}`

  const loginPath = pathList?.find((item) => {return item.name === "login"})?.value 
                    ?? `${LOGIN_PATH()}`

  const detailPath = (boardNum: number) => {
    const pathFunc = pathList?.find((item) => {return item.name === "detail"})?.value
    const path = typeof(pathFunc) === 'function' ? pathFunc(boardNum) : `${BOARD_PATH()}/${BOARD_DETAIL_PATH(boardNum)}`
    
    return path
  }

  return (
    <div className="board-container">
        <h2>{title}</h2>
        <div className="search-box">
          <select id="category" onChange={onChangeSelect} value={selected}>
            {category?.map((item, index) => {
              return (
                <option value={item.value} key={index}>
                  {item.name}
                </option>
              )
            })}
          </select>
          <div className='board-top'>
            <Input type="text" id="search-input" value={searchWord} onChange={onChange} />
            <div className='btn-box'>
              <Button text={"글쓰기"} onClick={() => navigate(writePath)} />
              <Button text={"로그인"} onClick={() => navigate(loginPath)} />
            </div>
          </div>
        </div>

        <table className="board-table">
            <thead>
                <tr>
                  {tableHeader?.map((header) => {
                    return (
                      <th>{header}</th>
                    )
                  })}
                </tr>
            </thead>
            <tbody>
            {boardList?.map((item) => {
              return (
                <tr>
                    <td>{item.boardIdx}</td>
                    <td>
                      {/* <Button to={detailPath(item.boardNum)}>{ item.title }</Button> */}
                      <Button text={item.title} classNames='non-btn' onClick={() => navigate(detailPath(item.boardNum))} />
                    </td>
                    <td>{item.writerNickname}</td>
                    <td>{item.createAtFormat}</td>
                    <td>{item.viewCount}</td>
                </tr>
              )
            })}
            </tbody>
        </table>
      </div>    
  )
}