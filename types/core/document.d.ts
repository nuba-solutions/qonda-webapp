import { TFile } from './file'

export type TDocument = {
    id: number
    name: string
    created_date: Date
    updated_date: Date
    status_id: number
    validated_by_id: TUser.id
    validated_date: Date
    file: TFile
    candidate_id: number
}
