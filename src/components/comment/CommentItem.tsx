import {CommentListType} from "types/interface";
import styles from "styles/boardDetail.module.css";
import {useState} from "react";
import CommentForm from "./CommentForm";


interface CommentListProps {
    comment: CommentListType;
    id?: number;
}

export default function CommentItem({ comment }: CommentListProps) {


    const [openform, setOpenform] = useState(false);

    const onClick = () => 
        setOpenform((prev) => !prev);
 


    return (<>
        <div
            style={{ marginLeft: comment.commentLevel > 0 ? "80px" : "0px" }}
            className={styles.comment}
        >
            <div className={styles.comment1}>
            {comment.commentLevel > 0 ? <span>↳ &ensp;</span>: ""}
                {comment.content}
                <div className={styles.comment2}>
                    <button className={styles.btn}>✏️</button>
                    <button className={styles.btn}>❌</button>
                </div>
            </div>
            <div className={styles.comment3}>
                [{comment.writer}]
                <div className={styles.comment4}>
                    {new Date(comment.createAt).toLocaleString()}
                </div>
                <div className={styles.comment4}>
                    <button className={styles.btn} onClick={onClick}>{openform ? "닫기" : "답글달기"}</button>
                </div>
            </div>
        </div>
        {openform? <CommentForm />: null}

    </>
    );

}