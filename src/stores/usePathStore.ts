import {create} from 'zustand'
import {persist} from 'zustand/middleware'

export interface PathState {
  pathList: {path: string, component: string}[]| null
  setPath: (pathList: {path: string, component: string}[]) => void;
  clearPath: () => void;
}

const usePathStore = create<PathState>()(
  persist(
    (set) => ({
      pathList: [],
      setPath: (pathList) => set({pathList}),
      clearPath: () => set({pathList: []}),
    }), {
      name: 'pathStore'
    }
  )
)

export default usePathStore