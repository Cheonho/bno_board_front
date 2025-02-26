import { CommentListType } from "types/interface";
import styles from "styles/boardDetail.module.css";
import { useState } from "react";
import CommentForm from "./CommentForm";
import { getComments, deleteComment, modifyComment} from "api/board";

interface CommentListProps {
    comment: CommentListType;
    openFormId: number | null;
    setOpenFormId: (boardNum: number | null) => void;
    setComments: React.Dispatch<React.SetStateAction<CommentListType[]>>;
}

export default function CommentItem({ comment, openFormId, setOpenFormId, setComments}: CommentListProps) {
 
    const isOpen = openFormId === comment.commentNum;

    const onClick = () => {
        setOpenFormId(isOpen ? null : comment.commentNum);
    };

    const onDeleteComment = async (boardNum:number, commentNum: number) => {
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


    // const [IsEditing, setIsEditing] = useState(false);

    // const handleEdit = () => {
    //     setIsEditing(true);
    //   };

    //   const handleSubmit = (values: { edited: string }) => {
    //     setIsEditing(false);
    //     const updatedComment = { ...comment, content: values.edited };
    //     onEditComment(comment.commentNum, updatedComment);
    //   };


    //   const onEditComment = async (commentId: string, updatedComment: CommentListType) => {
    //     try {
    //       await modifyComment(commentId, updatedComment);
    //       setComments((prevComments) =>
    //         prevComments.map((comment) => (comment.id === commentId ? updatedComment : comment)),
    //       );
    //       queryClient.invalidateQueries(['comments']);
    //     } catch (error) {
    //       console.error('댓글 수정 중 에러 발생:', error);
    //     }
    //   };






    return (
        <>
            <div style={{ marginLeft: comment.parentNum == null ? "0px" : "80px" }}
                className={styles.comment}>
                <div className={styles.comment1}>
                    {comment.parentNum == null ? "" : <span>↳ &ensp;</span>}
                    {comment.content}
                    <div className={styles.comment2}>
                        <button className={styles.btn}>✏️</button>
                        <button className={styles.btn} onClick={() => onDeleteComment(comment.boardNum, comment.commentNum)}>❌</button>
                    </div>
                </div>
                <div className={styles.comment3}>
                    [{comment.writerEmail}]
                    <div className={styles.comment4}>
                        {new Date(comment.createAt).toLocaleString()}
                    </div>
                    <div className={styles.comment4}>
                        <button className={styles.btn} onClick={onClick}>{isOpen ? "닫기" : "답글달기"}</button>
                    </div>
                </div>
            </div>
            {isOpen && <CommentForm />}
        </>
    );
}
