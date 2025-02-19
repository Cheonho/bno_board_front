export default interface BoardList {
    boardIdx: number;
    title: string;
    content: string;
    writer: string;
    createAt: Date;
    updateAt: Date | null;
    viewCount: number | 0;
}