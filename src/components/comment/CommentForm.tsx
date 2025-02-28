import { useState } from "react";
import styles from "styles/boardDetail.module.css";
import { modifyCommentApi } from "api/board";

interface CommentFormProps {
    boardNum: number|string;
    commentNum: number;
    isEdit?: boolean;
    defaultContent?: string;
    onSubmitSuccess: () => void;
    onCancel?: () => void;
}

export default function CommentForm({ boardNum, commentNum, isEdit = false, defaultContent = "", onSubmitSuccess, onCancel }: CommentFormProps) {
    const [content, setContent] = useState(defaultContent);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContent(event.target.value);
    };

    const handleSubmit = async () => {
        if (content.trim() === "") {
            alert("내용을 입력해주세요.");
            return;
        }

        try {
            if (isEdit) {
                await modifyCommentApi(boardNum, commentNum, content);
                alert("댓글이 수정되었습니다!");
            } else {
                //parentNum이 null이면 댓글, 아니면 대댓글, 그냥 어차피 같은 댃글..
                //await addComment(boardNum, parentNum, content);
                //alert("댓글이 등록되었습니다!");
            }
            setContent("");
            onSubmitSuccess();
        } catch (error) {
            console.error("댓글 처리 중 오류 발생:", error);
            alert("댓글 처리에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <>
            <input
                className={styles.CommentEditInput}
                value={content}
                onChange={handleChange}
                placeholder="댓글을 입력하세요."
            />
            <div className={styles.CommentButtonBox}>
                {isEdit ? (
                    <div className={styles.CommentEditBox}>
                        <button className={styles.CommentEditBtn} onClick={handleSubmit}>댓글 수정</button>
                        <button className={styles.CommentEditBtn} onClick={onCancel}>취소</button>
                    </div>
                ) : (
                        <button className={styles.CommentSubmitBtn} onClick={handleSubmit}>댓글 등록</button>
                )}
            </div>
        </>
    );
}