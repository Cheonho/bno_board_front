import React, { useEffect, useState } from 'react'
import './style.css'
import BoardWriteCom from 'components/board/BoardWrite'
import { BoardListType } from 'types/interface';
import { putUpdateBoardApi, getDetailBoardApi } from 'api/board';
import { useNavigate, useParams } from 'react-router-dom';
import useUserStore from 'stores/useUserStore';
import Modal from 'components/common/Modal'
import { LOGIN_PATH } from 'constant';

export default function BoardUpdate() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState("");
  const [writerEmail, setWriterEmail] = useState("");
  const [board, setBoard] = useState<BoardListType>({
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
  const userInfo = useUserStore((state) => state.user)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const modalClose = () => {
    setIsModalOpen(false);
    navigate(LOGIN_PATH())
  };

  const getBoardData = async () => {
    if (params.boardNum) {
      const res = await getDetailBoardApi(params.boardNum)
      const boardData = res.data.boardListView
      setBoard(boardData)
      setTitle(boardData.title)
      setContent(boardData.content)
      setWriter(boardData.writerNickname)
      setWriterEmail(boardData.writerEmail)
    }
  }

  const onChangeTitle = (e: any) => {
    setTitle(e.target.value)
  }

  const onChangeContent = (e: any) => {
    setContent(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: BoardListType = {
        ...board,
        title: title,
        content: content
      }

      const res = await putUpdateBoardApi(payload)
      console.log(res.status)
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
  }, [])

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
