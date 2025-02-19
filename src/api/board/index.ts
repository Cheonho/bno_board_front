import { authInstance } from "api/auth";

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