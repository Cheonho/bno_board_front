import { BOARD_PATH, BOARD_UPDATE_PATH } from "constant";
import { useNavigate } from "react-router-dom";
import styles from "styles/boardDetail.module.css";
import {BoardType} from "types/interface";

interface BoardInfoProps {
    boardNum: string | number;
    board: BoardType;
    id?: number;
    deleteBoard: () => void;
    goBoardList: () => void;
}

export default function BoardInfo({ boardNum, board, deleteBoard, goBoardList }: BoardInfoProps) {
    const navigate = useNavigate();
    
    return (
        <>
            <h2 className={styles.title}>{board.title}</h2>
            <div className={styles.infoContainer}>
                <p className={styles.info}>
                    <span className={styles.label}>게시글 ID:</span>
                    <span className={styles.value}>{board.boardNum}</span>
                </p>
                <p className={styles.info}>
                    <span className={styles.label}>작성자:</span>
                    <span className={styles.value}>{board.writerEmail}</span>
                </p>
                <p className={styles.info}>
                    <span className={styles.label}>작성일:</span>
                    <span className={styles.value}>
                        {new Date(board.createAt).toLocaleString()}
                    </span>
                </p>
                <p className={styles.info}>
                    <span className={styles.label}>조회수:</span>
                    <span className={styles.value}>{board.viewCount}</span>
                </p>
            </div>
            <div className={styles.content}>
                <p>{board.content}</p>
            </div>
            <div className={styles.btn_box}>

                <button className={styles.boardlistBtn} onClick={goBoardList}>목록으로</button>
                <div className={styles.toboardlist}>
                    <button className={styles.btn} onClick={() => navigate(`${BOARD_PATH()}/${BOARD_UPDATE_PATH(boardNum)}`)}>수정</button> |
                    <button className={styles.btn} onClick={deleteBoard}>삭제</button></div>
            </div>
        </>
    );
}
