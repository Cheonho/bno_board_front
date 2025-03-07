import Input from "components/common/Input";
import Button from "components/common/Button";
import { useNavigate } from "react-router-dom";
import 'styles/board-style.css';

interface Props {
  comType : 'w' | 'u'
  title: string;
  content: string;
  writer: string;
  onChangeTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeContent: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (event: React.FormEvent) => void;
}

export default function BoardWriteCom({comType, title, content, writer, onChangeTitle, onChangeContent, handleSubmit}: Props) {
  const navigate = useNavigate();

  return (
    <div className="write-container">
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
          <label>내용</label>
          <textarea
            value={content}
            onChange={(e) => onChangeContent(e)}
            className="textarea-field"
            placeholder="내용을 입력하세요"
            required
          />
        </div>
        <div className="button-group">
          <Button onClick={() => navigate("/")} classNames="cancel-button" text="취소" />
          <Button type="submit" onClick={() => navigate("/")} classNames="submit-button" text={comType === 'u' ? '수정' : '등록'} />
        </div>
      </form>
    </div>
  );
}
