import { TFile } from '@/types/core/file'
import { TLocation } from '@/types/core/location'
import { TJobPosition } from '@/types/core/position'
import { TStatus } from '@/types/core/status'
import { string } from 'zod'

export type TCandidate = {
    id: number
    first_name: string
    last_name: string
    age: number
    email: string
    address: string
    city: string
    state: string
    zip: string
    phone: string
    location_id: TLocation.id
    location: TLocation
    job_position_id: TJobPosition.id
    job_position: TJobPosition
    status_id: TStatus.id
    interview_date: Date
    enrollment_start?: Date
    enrollment_end?: Date
    created_date: Date
    updated_date: Date
    profile_img_url?: string
    documents: TDocument[]
    conversation: string
}
