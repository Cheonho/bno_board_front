export default interface CommentList {
    commentNum: number;
    boardNum: number;
    parentNum: number | null;
    content: string;
    writerEmail: string;
    createAt: Date;
    updateAt: Date | null;
    status: boolean;
}

export interface GetCommentListResponse {
    code: string;
    message: string;
    commentList: CommentList[];
}