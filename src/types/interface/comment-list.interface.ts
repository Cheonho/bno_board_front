import { ResType } from "./common";

export default interface CommentType {
    commentIdx: number;
    commentNum: number;
    content: string;
    commentLevel: number;
    parentNum: number | null;
    writer: string;
    boardNum: number;
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