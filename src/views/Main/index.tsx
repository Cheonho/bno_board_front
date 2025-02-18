import React, { useEffect, useState } from 'react'
import './style.css'
// import { BOARD_API_URL } from 'constant';
// import axios from 'axios';
import BoardItem from 'components/BoardItem';
import Pagination from 'components/Pagination';
import { usePagination } from 'hooks';
import { BoardListType } from 'types/interface';
import { getBoardListApi, getSearchBoardListApi} from 'api/board';

export default function Main() {
  const {currentPage, currentSection, viewList, viewPageList, totalSection,
    setCurrentPage, setCurrentSection, setTotalList} 
    = usePagination<BoardListType>(3);
  const category = [
    {value:1, name:"전체"},
    {value:2, name:"작성자"},
    {value:3, name:"제목"},
    {value:4, name:"내용"},
  ]
  const [selected, setSelected] = useState(1);
  const [searchWord, setSearchWord] = useState("");
  const [boardList, setBoardList] = useState([]);

  const handleSelect = (event: any) => {
    setSelected(event?.target.value)
  }

  const handleSearchWord = (event: any) => {
    setSearchWord(event?.target.value)
  }

  const getBoardList = async () => {
    try {
      const res = await getBoardListApi()
      setBoardList(res.data.boardList)
      setTotalList(res.data.boardList)
    } catch (err) {
      console.log(err)
    }
  }

  const getSearchBoardList = async () => {
    try{
      const res = await getSearchBoardListApi(selected, searchWord)
      const resData = res.data.boardSearchList
      setBoardList(resData)
      setTotalList(resData)
    } catch (err) {
      console.log(err)
    }
    
  }
  useEffect(() => { 
    getBoardList();
  },[])

  useEffect(() => {
    if(searchWord && selected) {
      getSearchBoardList();
    } else if (searchWord === "" && selected) {
      getBoardList();
    }
  },[searchWord, selected])

  return (
    <div>
      <div>
        <select onChange={handleSelect} value={selected}>
          {category.map((item, index) => {
            return (
              <option value={item.value} key={index}>
                {item.name}
              </option>
            )
          })}
        </select>
        <input type="text" value={searchWord} onChange={handleSearchWord} />
      </div>

      {/* {boardList.map((item) => {
        return (
          <div>
            <BoardItem boardListType={item} />
          </div>
        )
      })} */}

      {viewList.map((item) => {
        return (
          <div>
            <BoardItem boardListType={item} />
          </div>
        )
      })}

      <Pagination
        currentPage={currentPage}
        currentSection={currentSection}
        setCurrentPage={setCurrentPage}
        setCurrentSection={setCurrentSection}
        viewPageList={viewPageList}
        totalSection={totalSection}
      />

    </div>
  )
}
