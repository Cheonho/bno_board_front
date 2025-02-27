import React, { useEffect, useState } from 'react'
import './style.css'
import BoardWriteCom from 'components/board/BoardWrite'
import { BoardWriteType } from 'types/interface';
import { postWriteBoardApi } from 'api/board';
import { useNavigate } from 'react-router-dom';
import useUserStore from 'stores/useUserStore';

export default function BoardWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState("");
  const [writerEmail, setWriterEmail] = useState("");
  const navigate = useNavigate();
  const userInfo = useUserStore((state) => state.user)

  const onChangeTitle = (e: any) => {
    setTitle(e.target.value)
  }

  const onChangeContent = (e: any) => {
    setContent(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const payload: BoardWriteType = {
          title: title,
          content: content,
          writerEmail: writerEmail,
        }

        const res = await postWriteBoardApi(payload)
      } catch (err) {
        console.log(err)
      }
      navigate("/");
    };

  useEffect(() => {
    if (userInfo) {
      setWriter(userInfo.nickname)
      setWriterEmail(userInfo.email)
    }
  }, [userInfo])

  return (
    <div>
      {userInfo ? 
        <BoardWriteCom 
          comType='w'
          title={title}
          content={content}
          writer={writer}
          onChangeTitle={onChangeTitle} 
          onChangeContent={onChangeContent}
          handleSubmit={handleSubmit}
        /> : ""
      }
    </div>
  )
}
