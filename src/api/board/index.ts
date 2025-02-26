import { authInstance } from "utils/interceptor";
import { BoardListType, CommentListType, BoardWriteType } from "types/interface";

export async function getBoardListApi(page: number) {
  const res = await authInstance.get(`/api/v1/board/board-list`, {
    params: {page}
  });
  return res;
}

export async function getSearchBoardListApi(category: number, searchWord: string, page: number) {
  const res = await authInstance.get(`/api/v1/board/search-list/${category}/${searchWord}`, {
    params: {page}
  });
  return res;
}

export async function postWriteBoardApi(board: BoardWriteType) {
  const res = await authInstance.post(`/api/v1/board/write`, board)
  return res;
}

export const getBoard = async (id: number): Promise<BoardListType> => {
  const response = await authInstance.get(`/${id}`);
  return response.data;
};

export const getComments = async (id: number): Promise<CommentListType[]> => {
  const response = await authInstance.get(`/${id}/comment`);
  return response.data;
};

export const deleteBoard = async (id: number): Promise<void> => {
  const isConfirmed = window.confirm("정말로 삭제하시겠습니까?");
  if (!isConfirmed) return;
  await authInstance.delete(`/${id}`);
  alert("게시글이 성공적으로 삭제되었습니다!");
};