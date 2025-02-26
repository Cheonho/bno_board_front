import React, { useEffect, useState } from 'react'
import './style.css'
import { getBoardListApi, getSearchBoardListApi, patchViewCountApi} from 'api/board';
import Pagination from 'components/Pagination';
import { BoardListType } from 'types/interface';
import { customFormatDate } from 'utils/dateUtil';
import BoardTable from 'components/board/BoardTable';
import { BOARD_DETAIL_PATH, BOARD_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, LOGIN_PATH } from 'constant';

export default function Main() {
  const category = [
    {value:1, name:"전체"},
    {value:2, name:"작성자"},
    {value:3, name:"제목"},
    {value:4, name:"내용"},
  ]
  const tableHeader = ['번호', '제목', '작성자', '작성일', '조회수', '임시 수정 btn']
  const [page, setPage] = useState(1); // 페이지 번호
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수
  const [totalElements, setTotalElements] = useState(0); // 전체 데이터 수
  const [currentSection, setCurrentSection] = useState(1);
  const [firstPageNumber, setFirstPageNumber] = useState(1);
  const [lastPageNumber, setLastPageNumber] = useState(1);
  const [pageNumberSize, setPageNumberSize] = useState(5);

  const [selected, setSelected] = useState(1);
  const [searchWord, setSearchWord] = useState("");
  const [boardList, setBoardList] = useState<BoardListType[]>([]);

  const pathList = [
    {name: 'write', value: `${BOARD_PATH()}/${BOARD_WRITE_PATH()}`},
    {name: 'detail', value: (boardNum: number) => `${BOARD_PATH()}/${BOARD_DETAIL_PATH(boardNum)}`},
    {name: 'update', value: (boardNum: number) => `${BOARD_PATH()}/${BOARD_UPDATE_PATH(boardNum)}`}
  ]

  const handleSelect = (event: any) => {
    setSelected(event?.target.value)
    setPage(1)
  }

  const handleSearchWord = (event: any) => {
    setSearchWord(event?.target.value)
    setPage(1)
  }

  const handleViewCount = async (boardNum: number | string) => {
    const res = await patchViewCountApi(boardNum)
  }

  const getPageData = (resData: any) => {
    setPage(resData.pageNumber + 1)
    setTotalPages(resData.totalPage)
    setTotalElements(resData.totalElements)
    setCurrentSection(resData.currentSection)
    setFirstPageNumber(resData.firstPageNumber)
    setLastPageNumber(resData.lastPageNumber)
    setPageNumberSize(resData.pageNumberSize ? resData.pageNumberSize : 5)
  }

  const getBoardList = async () => {
    try {
      const res = await getBoardListApi(page-1)
      
      if (res.data) {
        const resData = res.data
        const newBoardList = resData.boardList.map((item: BoardListType, index: number) => {
          const createAtFormat = customFormatDate(item.createAt);
          const boardIdx = index + 1
          if (item.updateAt) {
            const updateAtFormat = customFormatDate(item.updateAt);
            return {...item, boardIdx: boardIdx, createAtFormat: createAtFormat, updateAtFormat: updateAtFormat}
          }
          return {...item, boardIdx: boardIdx, createAtFormat: createAtFormat}
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
      const newBoardList = resData.boardSearchList.map((item: BoardListType, index: number) => {
        const createAtFormat = customFormatDate(item.createAt);
        const boardIdx = index + 1
        if (item.updateAt) {
          const updateAtFormat = customFormatDate(item.updateAt);
          return {...item, boardIdx: boardIdx, createAtFormat: createAtFormat, updateAtFormat: updateAtFormat}
        }
        return {...item, boardIdx: boardIdx, createAtFormat: createAtFormat}
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
  },[page, searchWord, selected])

  return (
    <div>
      <BoardTable 
        title={"게시판"}
        tableHeader={tableHeader}
        boardList={boardList} 
        category={category} 
        onChangeSelect={handleSelect} 
        selected={selected}
        pathList={pathList}
        
        searchWord={searchWord}
        handleSearch={handleSearchWord}
        handleViewCount={handleViewCount}
      />
      {totalPages ? 
        <Pagination
          currentPage={page}
          currentSection={currentSection}
          totalPages={totalPages}
          firstPageNumber={firstPageNumber}
          lastPageNumber={lastPageNumber}
          pageNumberSize={pageNumberSize}
          setCurrentPage={setPage}
        />: ""}
    </div>
  )
}
