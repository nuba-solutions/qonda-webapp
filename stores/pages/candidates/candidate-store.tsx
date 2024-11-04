import { create } from 'zustand'

export type TCandidateOriginStatus =
    | 'new-applicants'
    | 'employees'
    | 'former-employees'

type State = {
    current_tab: string
    updateSelectedTab: (current_tab: string) => void
    origin_status: TCandidateOriginStatus
    updateOriginStatus: (origin_status: TCandidateOriginStatus) => void
}

export const useCandidateStore = create<State>((set) => ({
    current_tab: '',
    updateSelectedTab: (current_tab: string) =>
        set(() => ({ current_tab: current_tab })),
    origin_status: 'new-applicants',
    updateOriginStatus: (origin_status: TCandidateOriginStatus) =>
        set(() => ({ origin_status: origin_status })),
}))
