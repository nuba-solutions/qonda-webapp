import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type State = {
    user: any
}

type Actions = {
    updateUser: (user: any) => void
}

export const useUserStore = create(
    persist<State & Actions>(
        (set) => ({
            user: {},
            updateUser: (user) => set(() => ({ user: user })),
        }),
        {
            name: 'user',
            storage: createJSONStorage(() => localStorage),
        }
    )
)
