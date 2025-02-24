import React, { useState } from 'react'
import './style.css'
import BoardWriteCom from 'components/board/BoardWrite'
import { BoardWriteType } from 'types/interface';
import { postWriteBoardApi } from 'api/board';
import { useNavigate } from 'react-router-dom';

export default function BoardWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState("testId");
  const navigate = useNavigate();

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
          writerId: writer,
        }

        const res = await postWriteBoardApi(payload)
      } catch (err) {
        console.log(err)
      }
      navigate("/");
    };

  return (
    <div>
      <BoardWriteCom 
        title={title}
        content={content}
        onChangeTitle={onChangeTitle} 
        onChangeContent={onChangeContent}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}
