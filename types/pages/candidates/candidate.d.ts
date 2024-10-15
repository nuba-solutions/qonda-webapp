import { TFile } from '@/types/core/file'

export type TCandidate = {
    id: number
    first_name: string
    last_name: string
    age: number
    email: string
    phone: string
    unit: string
    status: TCandidateStatus
    interview_date: Date
    enrollment_date: Date
    created_date: Date
    profile_img_url: string
    files: TFile[]
    conversation_id: string
}

export type TCandidateStatus = 0 | 1 | 2
