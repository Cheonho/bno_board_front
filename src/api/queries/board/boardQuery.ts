import { getBoardListApi, getSearchBoardListApi, postWriteBoardApi } from "api/board";
import { useMutation, useQuery, useQueryClient, UseQueryResult } from "react-query";
import { BoardListType, BoardWriteType } from "types/interface";

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

export const usePostWriteBoardListApiQuery = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (board: BoardWriteType) => postWriteBoardApi(board),
    onSuccess: () => {
      queryClient.invalidateQueries(["BoardList"]);
    },
    onError: (error) => {
      console.log(`[queryError] : `, error)
    }
  })
}