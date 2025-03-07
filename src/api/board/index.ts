import customApi, { authInstance } from "utils/interceptor";
import { BoardListType, BoardWriteType, BoardType } from "types/interface";
import { DetailBoardType } from "types/interface/board-list.interface";
import { GetCommentListResponse, PostCommentListResponse } from "types/interface/comment-list.interface";
import { ResType } from "types/interface/common";

// export async function getBoardListApi(page: number): Promise<BoardListType> {
//   const res = await authInstance.get(`/board/board-list`, {
//     params: {page}
//   });
//   return res.data;
// }

export async function getBoardListApi(page:number): Promise<BoardListType> {
  console.log("page : ", page)
  const res = await customApi<BoardListType>(
    `/board/board-list`,
    `GET`,
    {params: {page}}
  )
  return res.data;
}

// export async function getSearchBoardListApi(category: number, searchWord: string, page: number) {
//   const res = await authInstance.get(`/board/search-list/${category}/${searchWord}`, {
//     params: {page}
//   });
//   return res;
// }

export async function getSearchBoardListApi(category: number, searchWord: string, page: number): Promise<BoardListType> {
  const res = await customApi<BoardListType>(
    `/board/search-list/${category}/${searchWord}`,
    'GET',
    {params: {page}}
  )
  return res.data;
}

// export async function postWriteBoardApi(board: BoardWriteType) {
//   const res = await authInstance.post(`/board/write`, board)
//   return res;
// }

export async function postWriteBoardApi(board: BoardWriteType): Promise<ResType> {
  const res = await customApi<any>(
    `/board/write`,
    'POST',
    {data: board}
  )
  return res.data;
}

// export async function patchViewCountApi(boardNum: number | string) {
//   const res = await authInstance.patch(`/board/${boardNum}/view`)
//   return res;
// }

export async function patchViewCountApi(boardNum: number | string): Promise<ResType> {
  const res = await customApi<any>(
    `/board/${boardNum}/view`,
    `PATCH`
  )
  return res.data;
}

// export async function putUpdateBoardApi(board: BoardWriteType) {
//   const res = await authInstance.put(`/board/update`, board)
//   return res;
// }

export async function putUpdateBoardApi(board: BoardWriteType):Promise<ResType> {
  const res = await customApi<any>(
    `/board/update`,
    `PUT`,
    {data: board}
  )
  return res.data
}

// export async function getDetailBoardApi(boardNum: number | string) {
//   const res = await authInstance.get(`/board/detailBoard`, {
//     params: {boardNum}
//   });
//   return res;
// }

export async function getDetailBoardApi(boardNum: number | string): Promise<DetailBoardType> {
  const res = await customApi<DetailBoardType>(
    `/board/detailBoard`,
    `GET`,
    {params: {boardNum}}
  )
  return res.data
}
export const getBoardApi = async (boardNum: number | string): Promise<BoardType> => {
  const response = await authInstance.get(`/board/${boardNum}`);
  return response.data;
};

export const getCommentsApi = async (boardNum: number | string): Promise<GetCommentListResponse> => {
  const response = await authInstance.get<GetCommentListResponse>(`/board/${boardNum}/comment`);
  return response.data;
};


export const deleteBoardApi = async (boardNum: number | string): Promise<ResType> => {
  const response = await authInstance.delete(`/board/${boardNum}`);
  return response.data;
};

export const deleteCommentApi = async (boardNum: number | string, commentNum: number): Promise<ResType> => {
  const response = await authInstance.delete(`/board/${boardNum}/comment/${commentNum}`);
  return response.data;
};

export const modifyCommentApi = async (boardNum: number | string, commentNum: number, content: string): Promise<ResType> => {
  const response = await authInstance.patch(`/board/${boardNum}/comment/${commentNum}`, { content });
  return response.data;
};

export const addCommentApi = async (boardNum: number | string, parentNum: number | null, content: string): Promise<PostCommentListResponse> => {
  console.log("content : " , content)
  const response = await authInstance.post(`/board/${boardNum}/comment`, { parentNum, content });
  return response.data;
};
