export interface BoardListType {
    boardIdx?: number;
    boardNum: string | number;
    title: string;
    content: string;
    writerEmail: string;
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
    writerEmail: string;
};