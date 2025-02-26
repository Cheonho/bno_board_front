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
}

export default function BoardTable({ title, tableHeader, boardList, category, onChangeSelect, selected, searchWord, onChange }: Props) {

  const navigate = useNavigate();

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
              <Button text={"글쓰기"} onClick={() => navigate(`${BOARD_PATH()}/${BOARD_WRITE_PATH()}`)} />
              <Button text={"로그인"} onClick={() => navigate(`${LOGIN_PATH()}`)} />
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
                    <td>{item.boardNum}</td>
                    <td>
                      <Link to={`${BOARD_PATH()}/${BOARD_DETAIL_PATH(item.boardNum)}`}>{ item.title }</Link>
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