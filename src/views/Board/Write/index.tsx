import React, { useEffect, useState } from 'react'
import './style.css'
import BoardWriteCom from 'components/board/BoardWrite'
import { BoardWriteType, FileType } from 'types/interface';
import useUserStore from 'stores/useUserStore';
import { usePostWriteBoardListApiQuery } from 'api/queries/board/boardQuery';
import { useNavigate } from 'react-router-dom';

// 검색기록 저장
export default function BoardWrite() {
  const navigate = useNavigate()
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState("");
  const [writerEmail, setWriterEmail] = useState("");
  const [files, setFiles] = useState<FileType[]>([]);
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
      return
    }
    boardWriteRequst();
  };

  const boardWriteRequst = async () => {
    const payload: BoardWriteType = {
      title: title,
      content: content,
      writerEmail: writerEmail,
    }

    const fileList: File[] = files.map((item) => {
      return item.file
    })

    const res = await postWriteBoard({board: payload, files: fileList})
    if (res.code === "SU") {
      navigate('/')
    }
  }

  useEffect(() => {
    if(!userInfo) navigate('/')
    if (userInfo) {
      setWriter(userInfo.nickname)
      setWriterEmail(userInfo.email)
    }
  }, [userInfo, navigate])

  return (
    <div>
      {userInfo ? 
        <BoardWriteCom 
          comType='w'
          title={title}
          content={content}
          writer={writer}
          files={files}
          setFiles={setFiles}
          onChangeTitle={onChangeTitle} 
          onChangeContent={onChangeContent}
          handleSubmit={handleSubmit}
        /> : ""
      }
    </div>
  )
}
