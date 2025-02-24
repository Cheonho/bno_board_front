import styles from "styles/boardDetail.module.css";

export default function CommentForm() {

    return (<div className={styles.commentForm}>

        <input className={styles.input_comment} />
        <button className={styles.formBtn}>댓글 등록</button>



    </div>);
}