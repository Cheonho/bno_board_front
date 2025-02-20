import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'styles/board-style.css';
import { BoardListType } from 'types/interface';
import { BOARD_DETAIL_PATH, BOARD_PATH, BOARD_WRITE_PATH } from 'constant';

interface Props {
  boardList: BoardListType[];
  category: {value: number, name: string}[];
  onChangeSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selected: number;
  searchWord: string;
  handleSearchWord: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function BoardTable({ boardList, category, onChangeSelect, selected, searchWord, handleSearchWord }: Props) {

  const navigate = useNavigate();

  return (
    <div className="board-container">
        <h2>게시판</h2>
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
            <input type="text" id="search-input" value={searchWord} onChange={handleSearchWord} />
            <button onClick={() => navigate(`${BOARD_PATH()}/${BOARD_WRITE_PATH()}`)}>글쓰기</button>
          </div>
        </div>

        <table className="board-table">
            <thead>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                    <th>조회수</th>
                </tr>
            </thead>
            <tbody>
            {boardList?.map((item) => {
              return (
                <tr>
                  {/* <BoardItem boardListType={item} /> */}
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