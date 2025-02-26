export default interface CommentList {
    commentNum: number; // commentIdx
    content: string;
    commentLevel: number;
    parentNum: number | null;
    writer: string;
    boardNum: number;
    createAt: Date;
    updateAt: Date | null;
    status: boolean | true;
}