import { TCompany } from '@/types/core/company'
import { TLocation } from '@/types/core/location'
import { TStatus } from '@/types/core/status'

export type TUser = {
    id: number
    first_name: string
    last_name: string
    email: string
    password: string
    phone: string
    address: string
    city: string
    state: string
    zip: string
    company_id: TCompany.id
    user_type_id: TUserType.id
    location_id: TLocation.id[]
    status_id: TStatus.id
    created_date: Date
    updated_date: Date
    start_date: Date
    end_date: Date
    profile_img_url?: string
}

export type TUserType = {
    id: number
    name: string
}

// Focus percentage
// The percentage is related to teh current standings of the collaborator
// Happy, soso, about to leave

// Collaborators are candidates that changed status from applicants to hired

// Former employees are candidates that are no longer hired
