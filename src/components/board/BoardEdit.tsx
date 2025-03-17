import React, { useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill/dist/quill.snow.css';
import Input from 'components/common/Input';
import Button from 'components/common/Button';
import Modal from 'components/common/Modal';
import { useNavigate } from 'react-router-dom';
import { BOARD_WRITE_AND_UPDATE, MAIN_PATH, NON_PERMIT_EXTENSION } from 'constant';
import { FileType } from 'types/interface';
import BoardEditModule from '../edit/BoardEditModule';

interface Props {
  comType: 'w' | 'u';
  title: string;
  content: string;
  writer: string;
  files?: FileType[];
  onChangeTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeContent: (value: string) => void;
  handleSubmit: (event: React.FormEvent) => void;
  handleFile?: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  removeFile?: (id: string) => void;
  addFileList?: () => void;
}

export default function BoardEdit({
  comType,
  title,
  content,
  writer,
  files,
  onChangeTitle,
  onChangeContent,
  handleSubmit,
  handleFile,
  removeFile,
  addFileList
}: Props) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [editFileId, setEditFileId] = useState<String[]>([]);
  const fileInput = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const quillRef = useRef<ReactQuill | null>(null);
  const permitExtension = ['txt', 'xlsx', 'png', 'jpg', 'jpeg', 'gif'];

  const formats:string[] = [
    "header", "size", "font",
    "bold", "italic", "underline", "strike", "blockquote",
    "list", "indent", "link", "image",
    "color", "background", "align",
    "script", "code-block"
  ];

  const modalClose = () => {
    setIsModalOpen(false);
  };

  const formCheck = () => {
    if (!title || !content) {
      setIsModalOpen(true);
      setModalMessage(BOARD_WRITE_AND_UPDATE);
    }
  };

  const handleInputFile = (fileId: string) => {
    fileInput.current[fileId]?.click();
  };

  const handleFileExtensionCheck = (e: any, fileId: string) => {
    if (!e.target?.files[0]) return;
    const fileName = e.target.files[0].name;
    const extension = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
    if (!permitExtension.includes(extension)) {
      setIsModalOpen(true);
      setModalMessage(NON_PERMIT_EXTENSION);
      return;
    }
    if (handleFile) handleFile(e, fileId);
  };

  const editHandleInputFile = () => {
    if (!quillRef.current) return; 

    // const input = document.createElement("input")
    // input.setAttribute("type", "file")
    // input.setAttribute("accept", "image/*")
    // input.click()
    // input.addEventListener("change", async () => {
    //   const file = input.files?.[0]

    //   console.log(file)

    //   //에디터의 현재 커서 위치에 이미지 삽입
    //   const editor = quillRef.current?.getEditor();
    //   const range = editor?.getSelection();

    //   // editor.insertEmbed(range.index, "image", IMG_URL);
    // })
  }

  const modules:{} = useMemo(() => ({
    toolbar: {
      container: "#toolBar",
      handlers: {
        image:editHandleInputFile
      }
    },
  }), []);

  return (
    <div className="write-container">
      {isModalOpen && (
        <Modal modalClose={modalClose} message={modalMessage} color={`rgba(255,0,0,1)`} />
      )}
      <h1 className="write-title">{comType === 'u' ? '수정' : '글쓰기'}</h1>
      <form onSubmit={handleSubmit} className="write-form">
        <div className="form-group">
          <label>작성자</label>
          <Input type="text" value={writer} classNames="input-field" disabled={true} />
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
          {handleFile &&
            files?.map((file) => (
              <div key={file.id} className="file-input-group">
                <span>{file.fileInfo?.fileName || file.file.name || `파일없음`}</span>
                <input
                  type="file"
                  ref={(el) => {
                    fileInput.current[file.id] = el;
                  }}
                  onChange={(e) => handleFileExtensionCheck(e, file.id)}
                  className="input-field"
                  accept="txt,xlsx,png,jpg,gif,jpeg"
                  placeholder="내용을 입력하세요"
                  multiple={false}
                  style={{ display: 'none' }}
                />
                <Button
                  text="+"
                  type="button"
                  classNames="modify-file-button"
                  onClick={() => handleInputFile(file.id)}
                />
                {removeFile && (
                  <Button
                    text="❌"
                    type="button"
                    classNames="delete-file-button"
                    onClick={() => removeFile(file.id)}
                  />
                )}
              </div>
            ))}
          {addFileList && (
            <Button type="button" onClick={addFileList} classNames="add-file-button" text="파일 추가" />
          )}
        </div>
        <div className="form-group">
          <label>내용</label>
          <div>
            <div id="toolBar">
              <BoardEditModule />
            </div>
            <ReactQuill ref={quillRef} theme="snow" modules={modules} value={content} formats={formats} onChange={onChangeContent} 
             		style={{height: "300px", width: "100%"}}/>
          </div>
        </div>
        <div className="button-group">
          <Button onClick={() => navigate(MAIN_PATH())} classNames="cancel-button" text="취소" />
          <Button type="submit" classNames="submit-button" onClick={formCheck} text={comType === 'u' ? '수정' : '등록'} />
        </div>
      </form>
    </div>
  );
}
