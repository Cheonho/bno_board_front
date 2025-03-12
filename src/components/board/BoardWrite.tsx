import Input from "components/common/Input";
import Button from "components/common/Button";
import Modal from 'components/common/Modal'
import { useNavigate } from "react-router-dom";
import 'styles/board-style.css';
import { Dispatch, SetStateAction, useState } from "react";
import { BOARD_WRITE_AND_UPDATE } from "constant";
import { FileType } from "types/interface";

interface Props {
  comType : 'w' | 'u'
  title: string;
  content: string;
  writer: string;
  files?: FileType[]
  onChangeTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeContent: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (event: React.FormEvent) => void;
  setFiles?: Dispatch<SetStateAction<FileType[]>>
}

export default function BoardWriteCom({
  comType, 
  title, 
  content, 
  writer,
  files,
  onChangeTitle, 
  onChangeContent, 
  handleSubmit,
  setFiles
}: Props) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false)

  const modalClose = () => {
    setIsModalOpen(false);
  };

  const formCheck = () => {
    if (!title || !content) {
      setIsModalOpen(true)
    }
  }

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

  return (
    <div className="write-container">
      {isModalOpen && (<Modal modalClose={modalClose} message={BOARD_WRITE_AND_UPDATE} color={`rgba(255,0,0,1)`} />)}
      <h1 className="write-title">{comType === 'u' ? '수정' : '글쓰기'}</h1>
      <form onSubmit={handleSubmit} className="write-form">
        <div className="form-group">
          <label>작성자</label>
          <Input 
            type="text"
            value={writer}
            classNames="input-field" 
            disabled={true}
          />
        </div>
        <div className="form-group">
          <label>제목</label>
          <Input 
            type="text"
            value={title}
            onChange={(e) => onChangeTitle(e)}
            classNames="input-field"
            placeholder="제목을 입력하세요"
          />
        </div>
        <div className="form-group">
          <label>파일</label>
          {files?.map((file) => (
            <div key={file.id} className="file-input-group">
              <input
                type="file"
                onChange={(e) => handleFile(e, file.id)}
                className="input-field"
                placeholder="내용을 입력하세요"
                multiple={false}
              />
              <button type="button" className="delete-file-button" onClick={() => removeFile(file.id)}>
                ❌
              </button>
            </div>
          ))}
          <Button type="button" onClick={addFileList} classNames="add-file-button" text="파일 추가" />
        </div>
        <div className="form-group">
          <label>내용</label>
          <textarea
            value={content}
            onChange={(e) => onChangeContent(e)}
            className="textarea-field"
            placeholder="내용을 입력하세요"
          />
        </div>
        <div className="button-group">
          <Button onClick={() => navigate("/")} classNames="cancel-button" text="취소" />
          <Button type="submit" classNames="submit-button" onClick={(formCheck)} text={comType === 'u' ? '수정' : '등록'} />
        </div>
      </form>
    </div>
  );
}
