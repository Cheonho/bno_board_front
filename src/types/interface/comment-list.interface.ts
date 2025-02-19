export default interface CommentList {
    commentIdx: number;
    content: string;
    commentLevel: number;
    parentNum: number | null;
    writer: string;
    boardNum: number;
    createAt: Date;
    updateAt: Date | null;
}