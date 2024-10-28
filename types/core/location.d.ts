export type TLocation = {
    id: number
    name: string
    address: string
    city: string
    state: string
    zip: string
    phone: string
    job_positions: TJobPosition[]
    created_date: Date
    updated_date: Date
}
