import { getBoardListApi, getSearchBoardListApi } from "api/board";
import { useQuery, UseQueryResult } from "react-query";
import { BoardListType } from "types/interface";

export const useGetBoardListApiQuery = (
  param: number,
  searchWord: string
): UseQueryResult<BoardListType> => {
  return useQuery<BoardListType>({
    queryKey: ['BoardList', param],
    queryFn: () => getBoardListApi(param),
    enabled: !searchWord
  });
};

export const useGetSearchBoardListApiQuery = (
  category: number, 
  searchWord: string,
  param:number
): UseQueryResult<BoardListType> => {
  return useQuery<BoardListType>({
    queryKey: ['SearchList', category, searchWord, param],
    queryFn: () => getSearchBoardListApi(category, searchWord, param),
    enabled: !!searchWord
  })
}