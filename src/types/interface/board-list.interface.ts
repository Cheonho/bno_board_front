export interface BoardListType {
    boardNum: number; // boardIdx
    title: string;
    content: string;
    writerEmail: string;
    createAt: Date;
    updateAt: Date | null;
    viewCount: number | 0;
    commentCount: number | 0;
    favoriteCount: number | 0;
    createAtFormat: string | "";
    updateAtFormat: string | "";
    status: boolean;
};


export interface BoardWriteType {
    title: string;
    content: string;
    writerId: string;
};