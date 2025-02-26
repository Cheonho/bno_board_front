export default interface CommentList {
    commentIdx: number;
    commentNum: number | string;
    content: string;
    commentLevel: number;
    parentNum: number | null;
    writer: string;
    boardNum: string | number;
    createAt: Date;
    updateAt: Date | null;
    status: boolean | true;
}