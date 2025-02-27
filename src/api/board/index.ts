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

export const getBoard = async (boardNum:number | string): Promise<BoardListType> => {
  console.log('요청 URL:', `/board/${boardNum}`);
  const response = await authInstance.get(`/board/${boardNum}`);
  return response.data;
};

export const getComments = async (boardNum:number | string): Promise<GetCommentListResponse> => {
  const response = await authInstance.get<GetCommentListResponse>(`/board/${boardNum}/comment`);
  return response.data;
};


export const deleteBoard = async (boardNum: number | string): Promise<void> => {
  const isConfirmed = window.confirm("정말로 삭제하시겠습니까?");
  if (!isConfirmed) return;
  await authInstance.delete(`/board/${boardNum}`);
  alert("게시글이 성공적으로 삭제되었습니다!");
};

export const deleteComment = async (boardNum: number, commentNum: number): Promise<void> => {
  await authInstance.delete(`/board/${boardNum}/comment/${commentNum}`);
};

 export const modifyComment = async (boardNum: number, commentNum: number, content: string): Promise<void> => {
     await authInstance.patch(`/board/${boardNum}/comment/${commentNum}`, content);
 };