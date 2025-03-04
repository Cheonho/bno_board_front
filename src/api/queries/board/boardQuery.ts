import { getBoardListApi, useGetBoardListApi } from "api/board";
import { useQuery, UseQueryResult } from "react-query";
import { BoardListType } from "types/interface";

export const useGetBoardListApiQuery = (
  param: number
): UseQueryResult<BoardListType> => {
  return useQuery<BoardListType>({
    queryKey: ['BoardList', param],
    queryFn: () => getBoardListApi(param),
  });
};