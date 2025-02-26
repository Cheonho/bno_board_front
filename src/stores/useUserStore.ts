import {create} from 'zustand';
import {persist} from 'zustand/middleware'

export interface UserState {
  user: {
    email: string;
    role: string;
    nickname: string;
  } | null
  setUser: (user: {email: string, role: string, nickname: string}) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({user}),
      clearUser: () => set({user: null}),
    }),
    {
      name: 'userStore'
    }
  )
)

export default useUserStore;