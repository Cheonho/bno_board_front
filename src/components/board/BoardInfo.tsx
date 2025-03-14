import {useEffect, useState} from "react";
import { BOARD_PATH, BOARD_UPDATE_PATH } from "constant";
import { useNavigate } from "react-router-dom";
import styles from "styles/boardDetail.module.css";
import {BoardType, FileInfoType} from "types/interface";
import useUserStore from "stores/useUserStore";
import Button from "components/common/Button";
import { getRefreshFileDownloadUrl } from "api/board";
import axios from "axios";
import Modal from 'components/common/Modal'

interface BoardInfoProps {
    boardNum: string | number;
    board: BoardType;
    id?: number;
    deleteBoard: () => void;
    goBoardList: () => void;
}

export default function BoardInfo({ boardNum, board, deleteBoard, goBoardList }: BoardInfoProps) {
    const navigate = useNavigate();

    const {user} = useUserStore();
    const [writerEmail, setWriterEmail] = useState("");
    const [files, setFiles] = useState(board.files ? board.files : [])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalMessage, setModalMessage] = useState("")

    const handleBlobData = (blobData: Blob, fileName: string) => {
        const url = URL.createObjectURL(blobData);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const fileDownload = async (file: FileInfoType) => {
        if (!file.minioDataUrl) {
            setIsModalOpen(true)
            setModalMessage("파일 URL이 존재하지 않습니다.")
            return;
        }
        try {
            const res = await axios.get(`${file.minioDataUrl}`, { responseType: "blob" })
            if (res.status === 200) {
                handleBlobData(res.data, file.fileName)
            }
        } catch (error: any) {
            if (error?.status !== 200) {
                const url = await refreshFileUrl(file)
                const resRe = await axios.get(`${url}`, { responseType: "blob" })
                if (resRe.status === 200) {
                    handleBlobData(resRe.data, file.fileName)
                }
            }
        }
    }

    const refreshFileUrl = async (file: FileInfoType) => {
        const refreshRes = await getRefreshFileDownloadUrl(file.id)
        console.log(refreshRes)
        setFiles((prev) => {
            prev.map((item) => {
                if (file.id === item.id) return {...item, minioDataUrl: refreshRes.refreshUrl}
                return {...item}
            })
            return prev
        })
        return refreshRes.refreshUrl
    }

    const modalClose = () => {
        setIsModalOpen(false);
    };

     useEffect(() => {
            if (user) {
                setWriterEmail(user.email);
            }
          }, [user])
    
    return (
        <>
            {isModalOpen && (<Modal modalClose={modalClose} message={modalMessage} />)}
            <h2 className={styles.title}>{board.title}</h2>
            <div className={styles.infoContainer}>
                <p className={styles.info}>
                    <span className={styles.label}>작성자:</span>
                    <span className={styles.value}>{board.writerNickname}</span>
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
                {files && files.length > 0 && (
                    <div className={styles.filesContainer}>
                        <h3>첨부파일</h3>
                        <ul className={styles.fileWrap}>
                            {files.map((file, index) => (
                                <li key={index} className={styles.fileItem}>
                                    <Button text={file.fileName} classNames="non-btn" onClick={() => fileDownload(file)} />
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div className={styles.content}>
                <p>{board.content}</p>
            </div>
            <div className={styles.btn_box}>

                <button className={styles.boardlistBtn} onClick={goBoardList}>목록으로</button>
                {writerEmail && writerEmail===board.writerEmail && (
                    <div className={styles.toboardlist}>
                        <button className={styles.btn} onClick={() => navigate(`${BOARD_PATH()}/${BOARD_UPDATE_PATH(boardNum)}`, {state : {'detailBoard' : board}})}>수정</button> |
                        <button className={styles.btn} onClick={deleteBoard}>삭제</button>
                    </div>
                )}
            </div>
        </>
    );
}
