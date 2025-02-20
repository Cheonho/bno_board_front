export default interface BoardList {
    boardNum: number;
    title: string;
    content: string;
    writerId: string;
    writerNickname: string;
    createAt: Date;
    updateAt: Date | null;
    viewCount: number | 0;
    commentCount: number | 0;
    favoriteCount: number | 0;
    createAtFormat: string | "";
    updateAtFormat: string | "";
}