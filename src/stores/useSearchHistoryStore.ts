import {create} from 'zustand';
import {persist} from 'zustand/middleware'

export interface SearchHistoryState {
  lastSearchHistory: {
    pageInfo: {
      page: number;
      totalPage: number;
      totalElement: number;
      currentSection: number;
      firstPageNumber: number;
      lastPageNumber: number;
      pageNumberSize: number;
    };
    keyword: string;
    category: number;
  } | null
  setSearchHistory: (
    lastSearchHistory: {
      pageInfo: {
        page: number;
        totalPage: number;
        totalElement: number;
        currentSection: number;
        firstPageNumber: number;
        lastPageNumber: number;
        pageNumberSize: number;
      };
      keyword: string;
      category: number;
    }
  ) => void;
  clearSearchHistory: () => void;
}

const useSearchHistoryStore = create<SearchHistoryState>()(
  persist(
    (set) => ({
      lastSearchHistory: null,
      setSearchHistory: (lastSearchHistory) => set({lastSearchHistory}),
      clearSearchHistory: () => set({
        lastSearchHistory: null
      }),
    }),
    {
      name: 'useSearchHistoryStore'
    }
  )
)

export default useSearchHistoryStore;