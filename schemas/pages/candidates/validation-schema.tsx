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
        age: z.coerce.number().nonnegative().min(1, { message: 'Invalid age' }),
        phone: z.string().min(10, { message: 'Invalid phone number' }),
        email: z.string().email({ message: 'Invalid email' }),
        address: z.string().min(1, { message: 'Invalid address' }),
        city: z.string().min(1, { message: 'Invalid city' }),
        state: z.string().min(1, { message: 'Invalid state' }),
        zip: z.coerce.number().min(1, { message: 'Invalid zip' }),
        location_id: z.coerce
            .number()
            .nonnegative()
            .min(1, { message: 'please select an option' }),
        status_id: z.coerce
            .number()
            .nonnegative()
            .min(1, { message: 'please select an option' }),
        interview_date: z.preprocess(
            (value) => (value === '' || value == null ? undefined : value),
            z.string().datetime().optional()
        ),
        enrollment_start: z.preprocess(
            (value) => (value === '' || value == null ? undefined : value),
            z.string().datetime().optional()
        ),
        enrollment_end: z.preprocess(
            (value) => (value === '' || value == null ? undefined : value),
            z.string().datetime().optional()
        ),
    })

    return manageCandidateFormSchema
}

export type TManageCandidateFormSchema = z.infer<
    typeof manageCandidateFormSchema
>
