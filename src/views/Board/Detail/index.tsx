import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../../../styles/boardDetail.module.css";
import { BoardListType, CommentListType } from "types/interface";
import BoardInfo from "components/board/BoardInfo";
import { getBoard, getComments, deleteBoard, deleteComment } from "api/board";
import CommentItem from "components/comment/CommentItem";
import CommentForm from "components/comment/CommentForm";

export default function BoardDetail() {
    let navigate = useNavigate();
    const { boardNum } = useParams();

    const [board, setBoard] = useState<BoardListType | null>(null);
    const [comments, setComments] = useState<CommentListType[]>([]);
    const [openFormId, setOpenFormId] = useState<number | null>(null);

    useEffect(() => {
        if (!boardNum) return;
        getBoard(boardNum)
            .then(data => {
                setBoard(data);
            })
            .catch(error => {
                console.error("게시글 데이터를 불러오는 중 오류 발생:", error);
            });
    }, [boardNum]);

    const goBoardList = () => {
        navigate("/");
    };

    useEffect(() => {
        if (!boardNum) return;
        getComments(boardNum)
            .then((data) => {
                setComments(Array.isArray(data.commentList) ? data.commentList : []);
            })
            .catch(error => {
                console.error("댓글 데이터를 불러오는 중 오류 발생:", error);
            });
    }, [boardNum]);

    const handleDeleteBoard = async () => {
        if (!boardNum) return;
        await deleteBoard(boardNum)
            .then(() => {
                navigate("/");
            })
            .catch(error => {
                console.error("게시글 삭제 중 오류 발생:", error);
            });
    };

    return (
        <div className={styles.container}>
            {board ? (
                <div className={styles.card}>
                    <BoardInfo 
                        board={board} 
                        deleteBoard={handleDeleteBoard} 
                        goBoardList={goBoardList} 
                    />
                    <div className={styles.container_comment}>
                        <h2>댓글목록</h2>
                        <h3>총 댓글 수 : {comments.length}개</h3>

                        {comments.map((comment, index) => (
                            <CommentItem 
                                key={index} 
                                setComments={setComments} 
                                comment={comment} 
                                openFormId={openFormId} 
                                setOpenFormId={setOpenFormId} 
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <p>존재하지 않는 게시글입니다.</p>
            )}
        </div>
    );
}