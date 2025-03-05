import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import './style.css'

interface Props {
  currentPage: number;
  currentSection: number;
  totalPages: number;
  firstPageNumber: number;
  lastPageNumber: number;
  pageNumberSize: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

export default function Pagination(props: Props) {

  const {currentPage, currentSection, totalPages, firstPageNumber, lastPageNumber, pageNumberSize} = props;
  const {setCurrentPage} = props;
  const [viewPageList, setViewPageList] = useState<number[]>([]);

  const onPageClickHandler = (page: number) => {
    setCurrentPage(page);
  }

  const onPerClickHandler = () => {
    if (currentSection === 1) return;
    setCurrentPage((currentSection-1) * pageNumberSize)
  }

  const onNextClickHandler = () => {
    if (currentSection === Math.ceil(totalPages / pageNumberSize)) return;
    setCurrentPage(currentSection * pageNumberSize + 1)
  }

  const getViewPageList = useCallback(() => {
    const newViewPageList = Array.from(
      { length: lastPageNumber - firstPageNumber + 1 },
      (_, i) => i + firstPageNumber
    );

    setViewPageList(newViewPageList);
  }, [firstPageNumber, lastPageNumber])

  useEffect(() => {
    getViewPageList()
  }, [currentSection, totalPages, getViewPageList])

  return (
    <div>
      <div id="pagination-wrapper">
        <div className='pagination-change-link-box'>
          <div className='icon-box-small'>
            <div></div>
          </div>
          <div className='pagination-change-link-text' onClick={onPerClickHandler}>{`이전`}</div>
        </div>
        <div className='pagination-divider'>{`|`}</div>

        {viewPageList.map(page => page === currentPage ? 
          <div className='pagination-text-active'>{page}</div> :
          <div className='pagination-text' onClick={() => onPageClickHandler(page)}>{page}</div>
        )}

        <div className='pagination-divider'>{`|`}</div>
        <div className='pagination-change-link-box'>
          <div className='pagination-change-link-text' onClick={onNextClickHandler}>{`다음`}</div>
          <div className='icon-box-small'>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  )
}
