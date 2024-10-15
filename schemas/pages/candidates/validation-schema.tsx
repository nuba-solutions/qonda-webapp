import { z } from 'zod'

export let manageCandidateFormSchema: any

export const getManageCandidateFormSchema = (
    isEdit: boolean,
    dictionary?: any
) => {
    const manageCandidateFormSchema = z.object({
        id: isEdit ? z.number() : z.any().optional(),
        first_name: z.string().min(1, { message: 'Invalid first name' }),
        last_name: z.string().min(1, { message: 'Invalid last name' }),
    })

    return manageCandidateFormSchema
}

export type TManageCandidateFormSchema = z.infer<
    typeof manageCandidateFormSchema
>
