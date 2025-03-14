import React from 'react';
import 'styles/board-style.css';
import { BoardType } from 'types/interface';
import { format } from 'date-fns'

interface Props {
  BoardType: BoardType
}

// component: Board List 컴포넌트
export default function BoardItem({ BoardType }: Props) {

  const formatDate = (date: Date) => {
    return format(date, "yyyy.MM.dd");
  }

  // properties
  const { boardNum, title, content, writerNickname } = BoardType;
  const { viewCount } = BoardType;
  const { createAt, updateAt } = BoardType;

  const createAtForm = formatDate(createAt);
  const updateAtForm = updateAt ? formatDate(updateAt) : null;

  // const navigator = useNavigate();
  // event handler: 게시물 아이템 클릭 이벤트 처리
  const onClickHandler = () => {
    // navigator(boardNum);
  }

  return (
    <div className='board-list' onClick={onClickHandler}>
      <div className='board-list-box'>
        <div className='board-list-top'>
          <div className='board-list-profile-box'>
            <div className='board-list-profile-image' style={{backgroundColor: `rgba(255, 255, 255, 5)`}}></div>
          </div>
          <div className='board-list-write-box'>
            <div className='board-list-nickname'>{writerNickname}</div>
            <div className='board-list-write-date'>{createAtForm}</div>
          </div>
        </div>
        <div className='board-list-middle'>
          <div className='board-list-title'>{title}</div>
          <div className='board-list-content'>{content}</div>
        </div>
        <div className='board-list-bottom'>
          <div className='board-list-counts'>{`조회수 ${viewCount}`}</div>
        </div>
      </div>
      {/* <div className='board-list-image-box'>
        <div className='board-list-image'></div>
      </div> */}
    </div>
  )
}