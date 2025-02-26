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
    createAtFormat: string | "";
    updateAtFormat: string | "";
    status: boolean | true;
};

export interface BoardWriteType {
    title: string;
    content: string;
    writerId: string;
};