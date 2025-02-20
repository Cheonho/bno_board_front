import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "styles/boardDetail.module.css";
import { BoardListType, CommentListType } from "types/interface";
import BoardInfo from "components/board/BoardInfo";
import { getBoard, getComments, deleteBoard } from "api/board";
import CommentItem from "components/comment/CommentItem";
import CommentForm from "components/comment/CommentForm";

export default function BoardDetail() {
    let navigate = useNavigate();
    const { id } = useParams();
    const numericId = id ? parseInt(id, 10) : undefined; // 문자열 → 숫자로 변환

    const [board, setBoard] = useState<BoardListType | null>(null);
    const [comments, setComments] = useState<CommentListType[]>([]);

    useEffect(() => {
        if (!numericId) return;
        getBoard(numericId).then(setBoard).catch(error => {
            console.error("게시글 데이터를 불러오는 중 오류 발생:", error);
        });
    }, [numericId]);

    useEffect(() => {
        if (!numericId) return;
        getComments(numericId).then(setComments).catch(error => {
            console.error("댓글 데이터를 불러오는 중 오류 발생:", error);
        });
    }, [numericId]);

    const handleDeleteBoard = async () => {
        if (!numericId) return;
        await deleteBoard(numericId);
        navigate("/board/1");
    };

    return (
        <div className={styles.container}>
            {board ? (
                <div className={styles.card}>
                
                    <BoardInfo board={board} id={numericId} deleteBoard={handleDeleteBoard} />
                    <div className={styles.container_comment}>
                        <h2>댓글목록</h2>
                        <h3>총 댓글 수 : {comments.length}개</h3>
                        <CommentForm />

                        {comments.map((comment, index) => (
                            <CommentItem key={index} comment={comment} />
                        ))}
                    </div>
                </div>
            ) : (
                <p>로딩 중...</p>
            )}
        </div>
    );
}
