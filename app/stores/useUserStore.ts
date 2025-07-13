import { User } from 'app/models/UserModel'
import { create } from 'zustand'

interface UserStore {
  user: User | null
  setUser: (newUser: User) => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: new User(),
  setUser: (newUser ) => set({ user: newUser })
}))
