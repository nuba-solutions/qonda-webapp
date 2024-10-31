import { TDictionary } from '@/types/core/dictionary'
import { z } from 'zod'
import { getAllowedDocumentFileExtensions } from '../file/validation-schema'

export let manageDocumentFormSchema: any

export const getManageDocumentFormSchema = (
    isEdit: boolean,
    dictionary?: TDictionary
) => {
    const manageDocumentFormSchema = z
        .object({
            id: isEdit ? z.number() : z.any().optional(),
            name: z.string().min(1, { message: 'Invalid document name' }),
            files: z
                .array(
                    z.custom<File>((file) => {
                        return getAllowedDocumentFileExtensions(file)
                    }, 'Invalid file extension')
                )
                .optional(),
        })
        .superRefine((data, ctx) => {
            const { files } = data
            if (!isEdit && (!files || files.length === 0)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Please select at least one file',
                    path: ['files'],
                })
            }
        })

    return manageDocumentFormSchema
}

export type TManageDocumentFormSchema = z.infer<typeof manageDocumentFormSchema>
