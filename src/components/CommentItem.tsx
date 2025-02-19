import { CommentListType } from "types/interface";
import styles from "styles/boardDetail.module.css";


interface CommentListProps {
    comment: CommentListType;
    id?: number;
}

export default function CommentItem({ comment, id }: CommentListProps) {

    return (<>

        

        <div className={styles.comment}>
            <div className={styles.comment1}>
                {comment.content}
                <div className={styles.comment2}>✏️  🔧  ​🗑️  👍</div>
            </div>
            <div className={styles.comment3}>
                [{comment.writer}]
                <div className={styles.comment4}>
                    {new Date(comment.createAt).toLocaleString()}
                </div>
            </div>
        </div>

    </>
    );

}