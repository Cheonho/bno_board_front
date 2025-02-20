import { useNavigate } from "react-router-dom";
import 'styles/board-style.css';

interface Props {
  title: string;
  content: string;
  onChangeTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeContent: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (event: React.FormEvent) => void;
}

export default function BoardWriteCom({title, content, onChangeTitle, onChangeContent, handleSubmit}: Props) {
  const navigate = useNavigate();

  return (
    <div className="write-container">
      <h1 className="write-title">글쓰기</h1>
      <form onSubmit={handleSubmit} className="write-form">
        <div className="form-group">
          <label>제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => onChangeTitle(e)}
            className="input-field"
            placeholder="제목을 입력하세요"
            required
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
          <button type="button" onClick={() => navigate("/")} className="cancel-button">
            취소
          </button>
          <button type="submit" className="submit-button">
            등록
          </button>
        </div>
      </form>
    </div>
  );
}
