import { authInstance } from "api/interceptor";
import { BoardListType, CommentListType, BoardWriteType } from "types/interface";
import { GetCommentListResponse } from "types/interface/comment-list.interface";

export async function getBoardListApi(page: number) {
  const res = await authInstance.get(`/board/board-list`, {
    params: {page}
  });
  return res;
}

export async function getSearchBoardListApi(category: number, searchWord: string, page: number) {
  const res = await authInstance.get(`/board/search-list/${category}/${searchWord}`, {
    params: {page}
  });
  return res;
}

export async function postWriteBoardApi(board: BoardWriteType) {
  const res = await authInstance.post(`/board/write`, board)
  return res;
}

export const getBoardApi = async (boardNum:number | string): Promise<BoardListType> => {
  console.log('요청 URL:', `/board/${boardNum}`);
  const response = await authInstance.get(`/board/${boardNum}`);
  return response.data;
};

export const getCommentsApi = async (boardNum:number | string): Promise<GetCommentListResponse> => {
  const response = await authInstance.get<GetCommentListResponse>(`/board/${boardNum}/comment`);
  return response.data;
};


export const deleteBoardApi = async (boardNum: number | string): Promise<void> => {
  await authInstance.delete(`/board/${boardNum}`);
};

export const deleteCommentApi = async (boardNum: number, commentNum: number): Promise<void> => {
  await authInstance.delete(`/board/${boardNum}/comment/${commentNum}`);
};

 export const modifyCommentApi = async (boardNum:number | string, commentNum: number, content: string): Promise<void> => {
     await authInstance.patch(`/board/${boardNum}/comment/${commentNum}`, { content });
 };
