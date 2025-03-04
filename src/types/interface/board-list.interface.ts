export interface BoardType {
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

export interface BoardListType {
    boardList: BoardType[],
    pageData: {
        page: number,
        totalPages: number,
        currentSection: number,
        firstPageNumber: number,
        lastPageNumber: number,
        totalElements: number
    }
}

export interface BoardWriteType {
    title: string;
    content: string;
    writerEmail: string;
};