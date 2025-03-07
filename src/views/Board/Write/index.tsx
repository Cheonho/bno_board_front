import React, { useCallback, useEffect, useState } from 'react'
import './style.css'
import BoardWriteCom from 'components/board/BoardWrite'
import { BoardWriteType } from 'types/interface';
import useUserStore from 'stores/useUserStore';
import { usePostWriteBoardListApiQuery } from 'api/queries/board/boardQuery';

export default function BoardWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState("");
  const [writerEmail, setWriterEmail] = useState("");
  const [isWrite, setIsWrite] = useState(false);
  const userInfo = useUserStore((state) => state.user)

  const {mutateAsync: postWriteBoard} = usePostWriteBoardListApiQuery();

  const onChangeTitle = (e: any) => {
    setTitle(e.target.value)
  }

  const onChangeContent = (e: any) => {
    setContent(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      setIsWrite(false)
      return
    }
    setIsWrite(true)
  };

  const boardWriteRequst = useCallback(() => {
    const payload: BoardWriteType = {
      title: title,
      content: content,
      writerEmail: writerEmail,
    }

    postWriteBoard(payload)
  }, [content, title, postWriteBoard, writerEmail])

  useEffect(() => {
    if (userInfo) {
      setWriter(userInfo.nickname)
      setWriterEmail(userInfo.email)
    }
  }, [userInfo])

  useEffect(() => {
    if (isWrite) {
      boardWriteRequst()
    }
  }, [isWrite, boardWriteRequst])

  return (
    <div>
      {userInfo ? 
        <BoardWriteCom 
          comType='w'
          title={title}
          content={content}
          writer={writerEmail}
          onChangeTitle={onChangeTitle} 
          onChangeContent={onChangeContent}
          handleSubmit={handleSubmit}
        /> : ""
      }
    </div>
  )
}
