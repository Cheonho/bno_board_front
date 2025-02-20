import React, { useEffect, useState } from 'react'
import { format } from 'date-fns';
import './style.css'
import BoardItem from 'components/BoardItem';
import { getBoardListApi, getSearchBoardListApi} from 'api/board';
import Pagination from 'components/Pagination';
import { BoardListType } from 'types/interface';

export default function Main() {
  const category = [
    {value:1, name:"전체"},
    {value:2, name:"작성자"},
    {value:3, name:"제목"},
    {value:4, name:"내용"},
  ]
  const [page, setPage] = useState(1); // 페이지 번호
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수
  const [totalElements, setTotalElements] = useState(0); // 전체 데이터 수
  const [currentSection, setCurrentSection] = useState(1);
  // const [pageSize] = useState(5);

  const [selected, setSelected] = useState(1);
  const [searchWord, setSearchWord] = useState("");
  const [boardList, setBoardList] = useState<BoardListType[]>([]);

  const handleSelect = (event: any) => {
    setSelected(event?.target.value)
    setPage(1)
    setCurrentSection(1)
  }

  const handleSearchWord = (event: any) => {
    setSearchWord(event?.target.value)
    setPage(1)
    setCurrentSection(1)
  }

  const getPageData = (resData: any) => {
    setPage(resData.pageNumber + 1)
    setTotalPages(resData.totalPages)
    setTotalElements(resData.totalElements)
  }

  const dateFormmat = (date: Date) => {
    return format(date, 'yyyy. MM. dd')
  }

  const getBoardList = async () => {
    try {
      const res = await getBoardListApi(page-1)
      
      console.log(res)
      if (res.data) {
        const resData = res.data
        const newBoardList = resData.boardList.map((item: BoardListType) => {
          const createAtFormat = dateFormmat(item.createAt);
          if (item.updateAt) {
            const updateAtFormat = dateFormmat(item.updateAt);
            return {...item, createAtFormat: createAtFormat, updateAtFormat: updateAtFormat}
          }
          return {...item, createAtFormat: createAtFormat}
        })
        setBoardList(newBoardList)
        getPageData(resData);
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getSearchBoardList = async () => {
    try{
      const res = await getSearchBoardListApi(selected, searchWord, page-1)
      const resData = res.data
      const newBoardList = resData.boardSearchList.map((item: BoardListType) => {
        const createAtFormat = dateFormmat(item.createAt);
        if (item.updateAt) {
          const updateAtFormat = dateFormmat(item.updateAt);
          return {...item, createAtFormat: createAtFormat, updateAtFormat: updateAtFormat}
        }
        return {...item, createAtFormat: createAtFormat}
      })
      setBoardList(newBoardList)

      if (resData) getPageData(resData);
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => { 
    if (searchWord && selected) {
      getSearchBoardList();
    } else {
      getBoardList();
    }
  },[page,searchWord, selected])

  return (
    <div>
      <div className="board-container">
        <h2>게시판</h2>
        <div className="search-box">
          <select id="category" onChange={handleSelect} value={selected}>
            {category.map((item, index) => {
              return (
                <option value={item.value} key={index}>
                  {item.name}
                </option>
              )
            })}
          </select>
          <input type="text" id="search-input" value={searchWord} onChange={handleSearchWord} />
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
                    <td>{item.title}</td>
                    <td>{item.writerNickname}</td>
                    <td>{item.createAtFormat}</td>
                    <td>{item.viewCount}</td>
                </tr>
              )
            })}
            </tbody>
        </table>
    </div>    
      <Pagination
        currentPage={page}
        currentSection={currentSection}
        setCurrentPage={setPage}
        setCurrentSection={setCurrentSection}
        totalPages={totalPages}
      />

    </div>
  )
}
