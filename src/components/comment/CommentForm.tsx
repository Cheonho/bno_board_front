import {useEffect, useState} from "react";
import styles from "styles/boardDetail.module.css";
import { modifyCommentApi, addCommentApi } from "api/board";
import useUserStore from "stores/useUserStore";
import { useNavigate } from "react-router-dom";
import { LOGIN_PATH } from "constant";

interface CommentFormProps {
    boardNum: number | string;
    commentNum?: number;
    parentNum?: number | null;
    isEdit?: boolean;
    defaultContent?: string;
    onSubmitSuccess: () => void;
    onCancel: () => void;
}

export default function CommentForm({ boardNum, commentNum, parentNum, isEdit = false, defaultContent = "", onSubmitSuccess, onCancel }: CommentFormProps) {
    const navigate = useNavigate();
    const [content, setContent] = useState(defaultContent);

    const userInfo = useUserStore((state) => state.user);
    const [writerEmail, setWriterEmail] = useState("");

     useEffect(() => {
            if (userInfo) {
              setWriterEmail(userInfo.email)
            }
          }, [userInfo])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContent(event.target.value);
    };

    const handleSubmit = async () => {

        if (!userInfo) {
            alert("로그인을 해주세요.");
            navigate(`${LOGIN_PATH()}`);
          }

        if (content.trim() === "") {
            alert("내용을 입력해주세요.");
            return;
        }

        if (content.trim() === defaultContent) {
            alert("수정사항이 존재하지 않습니다.");
            return;
        }

        try {
            if (isEdit && commentNum) {
                if (commentNum === undefined) {
                    alert("수정할 댓글이 존재하지 않습니다.");
                    return;
                }
                await modifyCommentApi(boardNum, writerEmail, commentNum, content);
                alert("댓글이 수정되었습니다!");
                onCancel();
            } else {
                await addCommentApi(boardNum, writerEmail, parentNum ?? null, content);
                alert(parentNum ? "대댓글이 등록되었습니다!" : "댓글이 등록되었습니다!");
            }

            setContent("");
            onSubmitSuccess();
        } catch (error) {
            console.error("댓글 처리 중 오류 발생:", error);
            if (userInfo) {
            alert("댓글 처리에 실패했습니다. 다시 시도해주세요.");
        }
        }
    };

    return (
        <>
            {isEdit ? (<>
                <input
                    className={styles.CommentEditInput}
                    value={content}
                    onChange={handleChange}
                    placeholder="댓글을 입력하세요."
                />
                <div className={styles.CommentButtonBox}>
                    <div className={styles.CommentEditBox}>
                        <button className={styles.CommentEditBtn} onClick={handleSubmit}>댓글 수정</button>
                        <button className={styles.CommentEditBtn} onClick={onCancel}>취소</button>
                    </div>
                </div></>
            ) : (

                <div className={styles.CommentFormContainer}>
                    <input
                        className={styles.CommentEditInput}
                        value={content}
                        onChange={handleChange}
                        placeholder="댓글을 입력하세요."
                    />
                    <button className={styles.CommentSubmitBtn} onClick={handleSubmit}>댓글 등록</button></div>
            )}
        </>
    );
}