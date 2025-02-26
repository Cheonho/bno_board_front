export interface BoardListType {
    boardIdx: number;
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
};

export interface BoardWriteType {
    title: string;
    content: string;
    writerId: string;
};