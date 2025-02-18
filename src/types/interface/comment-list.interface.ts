export default interface CommentList {
    commentNum: number;
    content: string;
    commentLevel: number;
    parentNum: number | null;
    writer: string;
    boardNum: number;
    createAt: Date;
    updateAt: Date | null;
}