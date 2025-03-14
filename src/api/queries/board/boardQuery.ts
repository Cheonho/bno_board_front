import { getBoardListApi, getDetailBoardApi, getSearchBoardListApi, patchViewCountApi, postWriteBoardApi, putUpdateBoardApi } from "api/board";
import { useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { BoardListType, BoardWriteType, FileDeleteIdList } from "types/interface";
import { DetailBoardType } from "types/interface/board-list.interface";
import useSearchHistoryStore from "stores/useSearchHistoryStore";

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
    enabled: !!searchWord,
    
  })
}

export const usePostWriteBoardListApiQuery = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate();
  const {clearSearchHistory} = useSearchHistoryStore();

  return useMutation({
    mutationFn: ({ board, files }: { board: BoardWriteType; files: File[] }) => postWriteBoardApi(board, files),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["BoardList"], refetchType: "all"});
      clearSearchHistory();
      navigate('/');
    },
    onError: (error) => {
      console.log(`[WriteBoardApi - queryError] : `, error)
    }
  })
}

export const usePatchViewCountApiQuery = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (boardNum: string | number) => patchViewCountApi(boardNum),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["BoardList"], refetchType: "all"});
    },
    onError: (error) => {
      console.log(`[ViewCountApi - queryError] : `, error)
    }
  })
}

export const usePutUpdateBoardApiQuery = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({board, files, deleteFileList} : {board:BoardWriteType, files: File[], deleteFileList?: FileDeleteIdList}) => putUpdateBoardApi(board, files, deleteFileList),
    onSuccess: () => {
      console.log("update 성공")
      queryClient.invalidateQueries({queryKey: ["BoardList"], refetchType: "all"})
    },
    onError: (error) => {
      console.log(`[UpdateApi - queryError] : `, error)
    }
  })
}

export const useGetDetailBoardApiQuery = (
  param:number | string
): UseQueryResult<DetailBoardType> => {
  return useQuery<DetailBoardType>({
    queryKey: ['DetailBoard', param],
    queryFn: () => getDetailBoardApi(param),
    enabled: !!param
  })
}