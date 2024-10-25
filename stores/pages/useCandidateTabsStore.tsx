import { create } from 'zustand'

type State = {
    current_tab: string
    updateSelectedTab: (current_tab: string) => void
}

export const useCandidatesTabStore = create<State>((set) => ({
    current_tab: '',
    updateSelectedTab: (current_tab: string) =>
        set(() => ({ current_tab: current_tab })),
}))
