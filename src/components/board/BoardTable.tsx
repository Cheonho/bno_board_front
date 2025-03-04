import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'styles/board-style.css';
import { BoardType } from 'types/interface';
import { BOARD_DETAIL_PATH, BOARD_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH } from 'constant';
import Input from 'components/common/Input';
import Button from 'components/common/Button';
import useUserStore from 'stores/useUserStore';

interface Props {
  title: string;
  tableHeader: string[];
  boardList: BoardType[];
  category: {value: number, name: string}[];
  onChangeSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selected: number;
  searchWord: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleViewCount?: (boardNum: number | string, event: React.MouseEvent<HTMLButtonElement>) => void;
  pathList?: {name: string, value: any}[];
}

export default function BoardTable({ title, tableHeader, boardList, category, onChangeSelect, selected, searchWord, handleSearch, pathList, handleViewCount }: Props) {

  const navigate = useNavigate();
  const writePath = pathList?.find((item) => {return item.name === "write"})?.value 
                    ?? `${BOARD_PATH()}/${BOARD_WRITE_PATH()}`

  const detailPath = (boardNum: number | string) => {
    const pathFunc = pathList?.find((item) => {return item.name === "detail"})?.value
    const path = typeof(pathFunc) === 'function' ? pathFunc(boardNum) : `${BOARD_PATH()}/${BOARD_DETAIL_PATH(boardNum)}`
    
    return path
  }

  const updatePath = (boardNum: number | string) => {
    const pathFunc = pathList?.find((item) => {return item.name === "update"})?.value
    const path = typeof(pathFunc) === 'function' ? pathFunc(boardNum) : `${BOARD_PATH()}/${BOARD_UPDATE_PATH(boardNum)}`
    
    return path
  }
  const userState = useUserStore((state) => state.user)

  const handleDetailPath = (event: any, boardNum: number | string) => {
    if (typeof(handleViewCount) == 'function') {
      handleViewCount(boardNum, event)
    }
    navigate(detailPath(boardNum))
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
            <Input type="text" id="search-input" value={searchWord} onChange={handleSearch} />
            <div className='btn-box'>
              {userState ? <Button text={"글쓰기"} onClick={() => navigate(writePath)} /> : ""}
            </div>
          </div>
        </div>

        <table className="board-table">
            <thead>
                <tr>
                  {tableHeader?.map((header, index) => {
                    return (
                      <th key={index}>{header}</th>
                    )
                  })}
                </tr>
            </thead>
            <tbody>
            {boardList?.map((item, index) => {
              return (
                <tr key={index}>
                    <td>{item.boardIdx}</td>
                    <td>
                      <Button text={item.title} classNames='non-btn' onClick={(event) => handleDetailPath(event, item.boardNum)} />
                    </td>
                    <td>{item.writerNickname}</td>
                    <td>{item.createAtFormat}</td>
                    <td>{item.viewCount}</td>
                    <td>
                      <Button text={"수정"} onClick={() => navigate(updatePath(item.boardNum))} />
                    </td>
                </tr>
              )
            })}
            </tbody>
        </table>
      </div>    
  )
}