import CommentList from "../../types/interface/comment-list.interface"

// 댓글 데이터를 부모-자식 관계로 변환
export const buildCommentTree = (comments: CommentList[]): CommentList[] => {
    const commentMap = new Map<number, CommentList>();

    comments.forEach(comment => {
        commentMap.set(comment.commentNum, { ...comment, replies: [] });

    });

    const rootComments: CommentList[] = [];

    commentMap.forEach(comment => {
        if (comment.parentNum === null) {
            rootComments.push(comment);
        } else {
            const parent = commentMap.get(comment.parentNum);
            if (parent) {
                parent.replies?.push(comment);
            }
        }
    });
    return rootComments;
};
