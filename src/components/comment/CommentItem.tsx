
import { CommentListType } from "types/interface";
import styles from "styles/boardDetail.module.css";
import { useState } from "react";
import CommentForm from "./CommentForm";
import { getCommentsApi, deleteCommentApi, modifyCommentApi } from "api/board";

interface CommentListProps {
    comment: CommentListType;
    openFormId: number | null;
    setOpenFormId: (boardNum: number | null) => void;
    setComments: React.Dispatch<React.SetStateAction<CommentListType[]>>;
    onSubmitSuccess: () => void;
    openEditFormId: number | null;
    setOpenEditFormId: (boardNum: number | null) => void;
}

export default function CommentItem({ comment, openFormId, setOpenFormId, setComments, onSubmitSuccess, openEditFormId, setOpenEditFormId }: CommentListProps) {

    const isOpen = openFormId === comment.commentNum;

    const ReplyFormOpen = () => {
        setOpenFormId(isOpen ? null : comment.commentNum);
        setOpenEditFormId(null);
    };

    const onDeleteComment = async (boardNum: number, commentNum: number) => {
        const isConfirmed = window.confirm("정말로 삭제하시겠습니까?");
        if (!isConfirmed) return;

        try {
            await deleteCommentApi(boardNum, commentNum);
            setComments(prevComments =>
                prevComments
                    .map(comment =>
                        comment.commentNum === commentNum || comment.parentNum === commentNum
                            ? { ...comment, status: false }
                            : comment
                    )
                    .filter(comment => comment.status)
            );
            alert("댓글이 성공적으로 삭제되었습니다!");
        } catch (error) {
            console.error("댓글 삭제 중 오류 발생:", error);
            alert("댓글 삭제에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const isEditing = openEditFormId === comment.commentNum;
    const handleEdit = () => {
        setOpenEditFormId(comment.commentNum);
        setOpenFormId(null);
    }
    const cancleEdit = () => setOpenEditFormId(null);



    return (
        <>
            <div style={{ marginLeft: comment.parentNum == null ? "0px" : "80px" }}
                className={styles.comment}>

                {isEditing ? (
                    <div className={styles.CommentEditContainer}>
                        <CommentForm
                            boardNum={comment.boardNum}
                            commentNum={comment.commentNum}
                            isEdit={true}
                            defaultContent={comment.content}
                            onSubmitSuccess={onSubmitSuccess}
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
                                <button className={styles.btn} onClick={() => onDeleteComment(comment.boardNum, comment.commentNum)}>❌</button>
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
                    boardNum={comment.boardNum}
                    commentNum={comment.commentNum}
                    onSubmitSuccess={() => {
                        setOpenFormId(null);
                        onSubmitSuccess();
                    }}
                    onCancel={cancleEdit}
                    parentNum={comment.commentNum}
                />
            )}


            {comment.replies && Array.isArray(comment.replies) && comment.replies.length > 0 && (
                <div className={styles.repliesContainer}>
                    {comment.replies.map((reply) => {
                        console.log("Reply: ", reply);
                        return (
                            <CommentItem
                                key={reply.commentNum}
                                comment={reply}
                                openFormId={openFormId}
                                setOpenFormId={setOpenFormId}
                                setComments={setComments}
                                onSubmitSuccess={onSubmitSuccess}
                                openEditFormId={openEditFormId}
                                setOpenEditFormId={setOpenEditFormId}
                            />
                        );
                    })}
                </div>
            )}


        </>
    );



}