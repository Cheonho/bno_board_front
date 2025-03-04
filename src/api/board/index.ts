import { authInstance, useApi } from "utils/interceptor";
import { BoardListType, CommentListType, BoardWriteType, BoardType } from "types/interface";

export async function getBoardListApi(page: number): Promise<BoardListType> {
  const res = await authInstance.get(`/board/board-list`, {
    params: {page}
  });
  return res.data;
}

export async function useGetBoardListApi(page:number) {
  const res = await useApi<BoardListType>(
    `/board/board-list`,
    {
      method: `GET`,
      params: {page}
    }
  )
  return res;
}

// function getSearchBoardListApi<T> 이런식으로 명시해 줘야함
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

export async function patchViewCountApi(boardNum: number | string) {
  const res = await authInstance.patch(`/board/${boardNum}/view`)
  return res;
}

export async function putUpdateBoardApi(board: BoardWriteType) {
  const res = await authInstance.put(`/board/update`, board)
  return res;
}

export async function getDetailBoardApi(boardNum: number | string) {
  const res = await authInstance.get(`/board/detailBoard`, {
    params: {boardNum}
  });
  return res;
}

export const getBoard = async (id: number): Promise<BoardType> => {
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