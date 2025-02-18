import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

export async function getBoardListApi() {
  const res = await axios.get(`/api/v1/board/board-list`);
  return res;
}

export async function getSearchBoardListApi(category: number, searchWord: string) {
  const res = await axios.get(`/api/v1/board/search-list/${category}/${searchWord}`);
  return res;
}