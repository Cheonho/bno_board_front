import React, { useEffect, useState } from 'react'
import './style.css'
import BoardItem from 'components/BoardItem';
import { getBoardListApi, getSearchBoardListApi} from 'api/board';
import Pagination from 'components/Pagination';

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
  const [boardList, setBoardList] = useState([]);

  const handleSelect = (event: any) => {
    setSelected(event?.target.value)
    getSearchBoardList()
  }

  const handleSearchWord = (event: any) => {
    setSearchWord(event?.target.value)
    getSearchBoardList()
  }

  const getPageData = (resData: any) => {
    setPage(resData.pageNumber + 1)
    setTotalPages(resData.totalPages)
    setTotalElements(resData.totalElements)
  }

  const getBoardList = async () => {
    try {
      const res = await getBoardListApi(page-1)
      
      if (res.data) {
        const resData = res.data
        setBoardList(resData.boardList)
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
      setBoardList(resData.boardSearchList)

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
  },[page])

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

      {boardList?.map((item) => {
        return (
          <div>
            <BoardItem boardListType={item} />
          </div>
        )
      })}

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
