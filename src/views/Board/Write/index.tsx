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

  const handleFile = (e: any, id: string) => {
    if (!setFiles) return
    if(e.target.files) {
      const newFiles = e.target.files[0];
      setFiles((prev:FileType[]) => {
        return prev.map((item) => {
          return item.id === id ? {...item, file: newFiles} : item
        })
      })
    }
  }

  const removeFile = (id: string) => {
    if (!setFiles) return; 
    setFiles((prev) => {
      return (prev.filter((item) => (
        item.id !== id
      )))
    })
  }

  const addFileList = () => {
    if (setFiles) {
      setFiles((prev) => [
        ...prev,
        {id: crypto.randomUUID(), file: new File([], '')}
      ])
    }
  }

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
          handleFile={handleFile}
          onChangeTitle={onChangeTitle} 
          onChangeContent={onChangeContent}
          handleSubmit={handleSubmit}
          removeFile={removeFile}
          addFileList={addFileList}
        /> : ""
      }
    </div>
  )
}
