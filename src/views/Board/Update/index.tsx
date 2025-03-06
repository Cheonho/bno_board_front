import React, { useCallback, useEffect, useState } from 'react'
import './style.css'
import BoardWriteCom from 'components/board/BoardWrite'
import { BoardType } from 'types/interface';
import { useNavigate, useParams } from 'react-router-dom';
import useUserStore from 'stores/useUserStore';
import Modal from 'components/common/Modal'
import { LOGIN_PATH } from 'constant';
import { useGetDetailBoardApiQuery, usePutUpdateBoardApiQuery } from 'api/queries/board/boardQuery';

export default function BoardUpdate() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState("");
  const [writerEmail, setWriterEmail] = useState("");
  const [board, setBoard] = useState<BoardType>({
    boardNum: "",
    title: "",
    content: "",
    writerEmail: "",
    createAt: new Date(),
    updateAt: null,
    viewCount: 0,
    writerNickname: "",
    createAtFormat: "", 
    updateAtFormat: "", 
    status: true
  })
  const navigate = useNavigate();
  const params = useParams();
  const {user: userInfo} = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {mutate: updateApi} = usePutUpdateBoardApiQuery();
  const {data: detailBoard, isLoading} = useGetDetailBoardApiQuery(params.boardNum || 0);

  const modalClose = () => {
    setIsModalOpen(false);
    navigate(LOGIN_PATH())
  };

  const getBoardData = useCallback( async () => {
    if (detailBoard) {
      const newBoard = detailBoard.detailBoard
      setBoard(newBoard)
      setTitle(newBoard.title)
      setContent(newBoard.content)
      setWriter(newBoard.writerNickname)
      setWriterEmail(newBoard.writerEmail)
    }
  }, [detailBoard])

  const onChangeTitle = (e: any) => {
    setTitle(e.target.value)
  }

  const onChangeContent = (e: any) => {
    setContent(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: BoardType = {
        ...board,
        title: title,
        content: content
      }

      updateApi(payload)
    } catch (err) {
      console.log(err)
    }
    navigate("/");
  };

  useEffect(() => {
    if (userInfo) {
      getBoardData()
    } else {
      setIsModalOpen(true)
    }
  }, [getBoardData, userInfo])

  return (
    <div>
      {userInfo ? 
        (<BoardWriteCom 
          comType="u"
          title={title}
          content={content}
          writer={writer}
          onChangeTitle={onChangeTitle} 
          onChangeContent={onChangeContent}
          handleSubmit={handleSubmit}
        />) : (
          isModalOpen && (<Modal modalClose={modalClose} message="로그인 해주세요" />)
        )
      }
    </div>
  )
}
