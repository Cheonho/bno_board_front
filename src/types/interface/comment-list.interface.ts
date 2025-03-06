export default interface CommentList {
    commentIdx: number;
    commentNum: number | string;
    content: string;
    commentLevel: number;
    parentNum: number | null;
    writer: string;
    boardNum: string | number;
    writerEmail: string;
    createAt: Date;
    updateAt: Date | null;
    status: boolean;
    replies?: CommentList[];
}

export interface GetCommentListResponse {
    code: string;
    message: string;
    commentList: CommentList[];
}