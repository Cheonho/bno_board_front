import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import styles from "styles/boardDetail.module.css";
import { BoardType, CommentListType } from "types/interface";
import BoardInfo from "components/board/BoardInfo";
import { getBoardApi, getCommentsApi, deleteBoardApi, deleteCommentApi } from "api/board";
import CommentItem from "components/comment/CommentItem";
import CommentForm from "components/comment/CommentForm";
import CommentList from "components/comment/CommentList";

export default function BoardDetail() {
    let navigate = useNavigate();
    const { boardNum } = useParams();

    const [board, setBoard] = useState<BoardType | null>(null);
    const [comments, setComments] = useState<CommentListType[]>([]);
    const [openFormId, setOpenFormId] = useState<number | null>(null);
    const [openEditFormId, setOpenEditFormId] = useState<number | null>(null)


    useEffect(() => {
        if (!boardNum) return;
        getBoardApi(boardNum)
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
        getCommentsApi(boardNum)
            .then((data) => {
                console.log("getCommentsApi : ", data, data.message);
                setComments(Array.isArray(data.commentList) ? data.commentList : []);
            })
            .catch(error => {
                console.error("댓글 데이터를 불러오는 중 오류 발생:", error);
            });
    }, [boardNum]);


    const handleDeleteBoard = async () => {
        if (!boardNum) return;
        const isConfirmed = window.confirm("정말로 삭제하시겠습니까?");
        if (!isConfirmed) return;

        try {
            await deleteBoardApi(boardNum);
            alert("게시글이 성공적으로 삭제되었습니다!");
            navigate("/");
        } catch (error) {
            console.error("게시글 삭제 중 오류 발생:", error);
            alert("게시글 삭제에 실패했습니다. 다시 시도해주세요.");
        }
    };


    const refreshComments = () => {
        if (!boardNum) return;
        getCommentsApi(boardNum)
            .then((data) => {
                setComments(Array.isArray(data.commentList) ? data.commentList : []);
            })
            .catch(error => {
                console.error("댓글 데이터를 불러오는 중 오류 발생:", error);
            });
    };


    return (
        <div className={styles.container}>
            {board && boardNum ? (
                <div className={styles.card}>
                    <BoardInfo
                        boardNum={boardNum}
                        board={board}
                        deleteBoard={handleDeleteBoard}
                        goBoardList={goBoardList}
                    />
                    <div className={styles.container_comment}>
                        <h2>댓글목록</h2>
                        <h3>총 댓글 수 : {comments.length}개</h3>

                        <CommentForm
                            boardNum={board.boardNum}
                            onSubmitSuccess={refreshComments} onCancel={function (): void {
                                throw new Error("Function not implemented.");
                            } }                        />
                        <CommentList
                            comments={comments}
                            openFormId={openFormId}
                            setOpenFormId={setOpenFormId}
                            setComments={setComments}
                            onSubmitSuccess={refreshComments}
                            openEditFormId={openEditFormId}
                            setOpenEditFormId={setOpenEditFormId}
                        />
                    </div>
                </div>
            ) : (
                <p>존재하지 않는 게시글입니다.</p>
            )}
        </div>
    );
}
