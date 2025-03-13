import React, { useCallback, useEffect, useState } from 'react'
import './style.css'
import BoardWriteCom from 'components/board/BoardWrite'
import { BoardType, FileDeleteIdList, FileInfoType, FileType } from 'types/interface';
import { useLocation, useNavigate } from 'react-router-dom';
import useUserStore from 'stores/useUserStore';
import Modal from 'components/common/Modal'
import { LOGIN_PATH, MAIN_PATH } from 'constant';
import { usePutUpdateBoardApiQuery } from 'api/queries/board/boardQuery';

export default function BoardUpdate() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [write, setWriter] = useState("");
  const [writerEmail, setWriterEmail] = useState("");
  const [files, setFiles] = useState<FileType[]>([])
  const [deleteFileList, setDeleteFileList] = useState<FileDeleteIdList>()
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
  const {user: userInfo} = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState("")
  const { state } = useLocation();

  const {mutateAsync: updateApi} = usePutUpdateBoardApiQuery();
  
  const modalClose = () => {
    setIsModalOpen(false);
    navigate(LOGIN_PATH())
  };

  const getBoardData = useCallback( async () => {
    if (!state) {
      navigate('/')
      return
    }
    const detailBoard = state.detailBoard
    
    if (detailBoard) {
      setBoard(detailBoard)
      setTitle(detailBoard.title)
      setContent(detailBoard.content)
      setWriter(detailBoard.writerNickname)
      setWriterEmail(detailBoard.writerEmail)

      detailBoard.files?.forEach((item: FileInfoType) => {
        setFiles((prev) => [
          ...prev,
          {id: item.id, file: new File([], ''), fileInfo: item}
        ])
      })
    }
  }, [state, navigate])

  const onChangeTitle = (e: any) => {
    setTitle(e.target.value)
  }

  const onChangeContent = (e: any) => {
    setContent(e.target.value)
  }

  const handleDeleteFileList = (item: FileType) => {
    setDeleteFileList((prev) => ({
      fileIds: [
        ...(prev?.fileIds ?? []), 
        item.fileInfo?.id
      ].filter((id): id is string => id !== undefined)
    }));
  }

  const handleFile = (e: any, id: string) => {
    if (!setFiles) return
    if(e.target.files && e.target.files.length !== 0) {
      const newFiles = e.target.files[0];
      setFiles((prev:FileType[]) => {
        return prev.map((item) => {
          let newItem: FileType;
          if (item.id === id && item.fileInfo) {
            handleDeleteFileList(item)
            newItem = {id: crypto.randomUUID(), file: newFiles}
          } else {
            newItem = item.id === id ? {...item, file: newFiles} : item
          }
          return newItem
        })
      })
    }
  }

  const removeFile = (id: string) => {
    if (!setFiles) return; 
    setFiles((prev) => {
      // return (prev.filter((item) => (
      //   item.id !== id
      // )))
      return (prev.filter((item) => {
        if (item.id === id && item.fileInfo) {
          handleDeleteFileList(item)
        } 
        return item.id !== id
      }))
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      return
    }

    try {
      const payload: BoardType = {
        ...board,
        title: title,
        content: content
      }

      const fileList: File[] = files.map((item) => {
        return item.file
      })

      const res = await updateApi({board: payload, files: fileList, deleteFileList: deleteFileList})
      if (res.code === "SU") {
        navigate("/");
      }
    } catch (err: any) {
      if (err?.status === 403) {
        setIsModalOpen(true)
        setModalMessage("인증이 만료되었습니다.")
        navigate(MAIN_PATH())
      }
      console.log(err)
    }
  };

  useEffect(() => {
    if (userInfo) {
      getBoardData()
    } else {
      setIsModalOpen(true)
      setModalMessage("로그인 해주세요")
    }
  }, [getBoardData, userInfo, state, navigate])

  return (
    <div>
      {isModalOpen && (<Modal modalClose={modalClose} message={modalMessage} />)}
      {userInfo ? 
        (<BoardWriteCom 
          comType="u"
          title={title}
          content={content}
          writer={write}
          files={files}
          onChangeTitle={onChangeTitle} 
          onChangeContent={onChangeContent}
          handleSubmit={handleSubmit}
          handleFile={handleFile}
          removeFile={removeFile}
          addFileList={addFileList}
        />) : (
          ""
        )
      }
    </div>
  )
}
