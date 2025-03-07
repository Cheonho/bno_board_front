import React, { useCallback, useEffect, useState } from 'react'
import './style.css'
import 'styles/board-style.css'
import Pagination from 'components/Pagination';
import { BoardListType, BoardType } from 'types/interface';
import { customFormatDate } from 'utils/dateUtil';
import BoardTable from 'components/board/BoardTable';
import { BOARD_DETAIL_PATH, BOARD_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH } from 'constant';
import { useGetBoardListApiQuery, useGetSearchBoardListApiQuery, usePatchViewCountApiQuery } from 'api/queries/board/boardQuery';
import useInput from 'hooks/useInput';

export default function Main() {
  const category = [
    {value:1, name:"전체"},
    {value:2, name:"작성자"},
    {value:3, name:"제목"},
    {value:4, name:"내용"},
  ]
  const tableHeader = ['번호', '제목', '작성자', '작성일', '조회수']
  const [isPage, setIsPage] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [currentSection, setCurrentSection] = useState<number>(1);
  const [firstPageNumber, setFirstPageNumber] = useState<number>(1);
  const [lastPageNumber, setLastPageNumber] = useState<number>(1);
  const [pageNumberSize, setPageNumberSize] = useState<number>(5);

  const [selected, setSelected] = useState(1);
  // const [searchWord, setSearchWord] = useState("");
  const [searchWord, handleSearchWord] = useInput<string>("");
  const [viewBoardList, setViewBoardList] = useState<BoardType[]>([]);

  const pathList = [
    {name: 'write', value: `${BOARD_PATH()}/${BOARD_WRITE_PATH()}`},
    {name: 'detail', value: (boardNum: number) => `${BOARD_PATH()}/${BOARD_DETAIL_PATH(boardNum)}`},
    {name: 'update', value: (boardNum: number) => `${BOARD_PATH()}/${BOARD_UPDATE_PATH(boardNum)}`}
  ]

  const {data : totalBoardList, isLoading: boardLoading, error} = useGetBoardListApiQuery(page, searchWord)
  const {data : searchBoardList} = useGetSearchBoardListApiQuery(selected, searchWord, page)
  const viewCountApi = usePatchViewCountApiQuery()

  const loading = boardLoading || error

  const handleSelect = (event: any) => {
    setSelected(event?.target.value)
    setPage(1)
  }

  const handleSearchWordWithPageReset = (event: any) => {
    handleSearchWord(event)
    setPage(1)
  }

  const handleViewCount = async (boardNum: number | string) => {
    try{
      viewCountApi.mutate(boardNum)
    } catch (err) {
      console.log(err)
    }
  }

  const setPageData = (resData: any) => {
    if (!resData || Object.keys(resData).length === 0) {
      setIsPage(false)
      return 
    }
    setIsPage(true)
    setPage(Number(resData.pageNumber))
    setTotalPages(Number(resData.totalPage))
    setTotalElements(Number(resData.totalElements))
    setCurrentSection(Number(resData.currentSection))
    setFirstPageNumber(Number(resData.firstPageNumber))
    setLastPageNumber(Number(resData.lastPageNumber))
    setPageNumberSize(resData.pageNumberSize ? Number(resData.pageNumberSize) : 5)
  }

  const dataProcessing = useCallback((listData: BoardListType) => {
    if (!listData || !listData.boardList || listData.boardList?.length === 0) return

    const boardList = listData.boardList
    const pageData = listData.pageData

    const newBoardList = boardList.map((item, index: number) => {
      const createAtFormat = customFormatDate(item.createAt);
      const boardIdx = pageData.pageNumber ? index + 1 + ((pageData.pageNumber - 1) * pageNumberSize) : 0
      if (item.updateAt) {
        const updateAtFormat = customFormatDate(item.updateAt);
        return {...item, boardIdx: boardIdx, createAtFormat: createAtFormat, updateAtFormat: updateAtFormat};
      }
      return {...item, boardIdx: boardIdx, createAtFormat: createAtFormat}
    })

    return newBoardList;
  }, [pageNumberSize])

  const getBoardList = useCallback(() => {
    if (!totalBoardList) return 
    const newBoardList = dataProcessing(totalBoardList)
    setViewBoardList((prev) => newBoardList || prev)
    setPageData(totalBoardList.pageData)
  }, [dataProcessing, totalBoardList])

  const getSearchBoardList = useCallback(() => {
    if (!searchBoardList) return 
    const newBoardList = dataProcessing(searchBoardList)
    setViewBoardList(newBoardList || [])
    setPageData(searchBoardList.pageData)
  }, [dataProcessing, searchBoardList])

  useEffect(() => { 
    if (loading) {
      setViewBoardList((prev) => prev)
    } else if (searchWord && selected) {
      getSearchBoardList();
    } else {
      getBoardList();
    }
  },[loading, page, searchWord, selected, getSearchBoardList, getBoardList])

  return (
    <div className='board-list-page-con'>
      <BoardTable 
        title={"게시판"}
        tableHeader={tableHeader}
        boardList={viewBoardList} 
        category={category} 
        onChangeSelect={handleSelect} 
        selected={selected}
        pathList={pathList}
        
        searchWord={searchWord}
        handleSearch={handleSearchWordWithPageReset}
        handleViewCount={handleViewCount}
      />
      {isPage ? 
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
