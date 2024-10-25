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
    location_id: TLocation.id
    status_id: TStatus.id
    focus_percentage: number
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
