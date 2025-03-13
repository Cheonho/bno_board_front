import { ResType } from "./common";
import { FileInfoType } from "./file";

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
    files?: FileInfoType[] | [];
};

export interface BoardListType extends ResType {
    boardList: BoardType[],
    pageData: {
        pageNumber: number,
        totalPages: number,
        currentSection: number,
        firstPageNumber: number,
        lastPageNumber: number,
        totalElements: number
    }
}

export interface DetailBoardType extends ResType {
    detailBoard: BoardType,
}

export interface BoardWriteType {
    title: string;
    content: string;
    writerEmail: string;
};