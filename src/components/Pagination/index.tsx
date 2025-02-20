import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import './style.css'

interface Props {
  currentPage: number;
  currentSection: number;
  totalPages: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setCurrentSection: Dispatch<SetStateAction<number>>;
}

export default function Pagination(props: Props) {

  const {currentPage, currentSection, totalPages} = props;
  const {setCurrentPage, setCurrentSection} = props;
  const maxViewPageList = 5
  const [viewPageList, setViewPageList] = useState<number[]>([]);

  const onPageClickHandler = (page: number) => {
    setCurrentPage(page);
  }

  const onPerClickHandler = () => {
    if (currentSection === 1) return;
    setCurrentPage((currentSection - 1) * maxViewPageList);
    setCurrentSection(currentSection - 1);
  }

  const onNextClickHandler = () => {
    if (currentSection === Math.ceil(totalPages / maxViewPageList)) return;
    setCurrentPage((currentSection * maxViewPageList) + 1);
    setCurrentSection(currentSection + 1);
  }

  const getViewPageList = () => {
    const FIRST_INDEX = maxViewPageList * (currentSection - 1);
    const LAST_INDEX = Math.min(totalPages, maxViewPageList * currentSection);

    const newViewPageList = Array.from(
      { length: LAST_INDEX - FIRST_INDEX },
      (_, i) => i + FIRST_INDEX + 1
    );

    setViewPageList(newViewPageList);
  }

  useEffect(() => {
    getViewPageList()
  }, [currentSection, totalPages])

  return (
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
  )
}
