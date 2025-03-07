import { ResType } from "./common";

export default interface CommentType {
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
    replies?: CommentType[];
}

export interface GetCommentListResponse extends ResType{
    commentList: CommentType[];
}

export interface PostCommentListResponse extends ResType{
}