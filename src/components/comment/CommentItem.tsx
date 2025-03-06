import {CommentListType} from "types/interface";
import styles from "styles/boardDetail.module.css";
import {useState} from "react";
import CommentForm from "./CommentForm";
import { getComments, deleteComment, modifyComment } from "api/board";

interface CommentListProps {
    comment: CommentListType;
    openFormId: number | null;
    setOpenFormId: (boardNum: number | null) => void;
    setComments: React.Dispatch<React.SetStateAction<CommentListType[]>>;
}

export default function CommentItem({ comment, openFormId, setOpenFormId, setComments }: CommentListProps) {

    const isOpen = openFormId === comment.commentNum;

    const ReplyFormOpen = () => {
        setOpenFormId(isOpen ? null : Number(comment.commentNum));
    };

    const onDeleteComment = async (boardNum: number, commentNum: number) => {
        const isConfirmed = window.confirm("정말로 삭제하시겠습니까?");
        if (!isConfirmed) return;

        try {
            await deleteComment(boardNum, commentNum);
            setComments(prevComments =>
                prevComments.filter(comment => comment.commentNum !== commentNum)
            );

            alert("댓글이 성공적으로 삭제되었습니다!");
        } catch (error) {
            console.error("댓글 삭제 중 오류 발생:", error);
            alert("댓글 삭제에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const [isEditing, setIsEditing] = useState(false);
    const handleEdit = () => setIsEditing(true);
    const cancleEdit = () => setIsEditing(false);


    return (
        <>
            <div style={{ marginLeft: comment.parentNum == null ? "0px" : "80px" }}
                className={styles.comment}>

                {isEditing ? (
                    <div className={styles.CommentEditContainer}>
                        <CommentForm
                            boardNum={Number(comment.boardNum)}
                            commentNum={Number(comment.commentNum)}
                            isEdit={true}
                            initialContent={comment.content}
                            onSubmitSuccess={() => setIsEditing(false)}
                            onCancel={cancleEdit}
                        />
                    </div>
                ) : (
                    <>
                        <div className={styles.comment1}>
                            {comment.parentNum == null ? "" : <span>↳ &ensp;</span>}
                            {comment.content}
                            <div className={styles.comment2}>
                                <button className={styles.btn} onClick={handleEdit}>✏️</button>
                                <button className={styles.btn} onClick={() => onDeleteComment(Number(comment.boardNum), Number(comment.commentNum))}>❌</button>
                            </div>
                        </div>

                        <div className={styles.comment3}>
                            [{comment.writerEmail}]
                            <div className={styles.comment4}>{new Date(comment.createAt).toLocaleString()}</div>
                            <div className={styles.comment4}>
                            <button className={styles.btn} onClick={ReplyFormOpen}>{isOpen ? "닫기" : "답글달기"}</button>
                        </div>
                        </div>
                    </>
                )}
            </div>

            {isOpen && (
                <CommentForm
                    boardNum={Number(comment.boardNum)}
                    commentNum={Number(comment.commentNum)}
                    onSubmitSuccess={() => setOpenFormId(null)}
                />
            )}
        </>
    );
   


}
