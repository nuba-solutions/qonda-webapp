import { TFile } from './file'

export type TDocument = {
    id: number
    name: string
    created_date: Date
    updated_date: Date
    status_id: number
    validated_by_id: TUser.id
    file: TFile.id
}
