import { z } from 'zod'

export const TFileSchema = z.object({
    id: z.number(),
    name: z.string(),
    type: z.string(),
    uri: z.string(),
    updated_at: z.string(),
    created_at: z.string(),
})

export const getAllowedDocumentFileExtensions = (file: File) => {
    const allowedExtensions = ['png', 'jpg', 'jpeg', 'pdf', 'docx']
    const fileExtension = file.name.split('.').pop()
    return allowedExtensions.includes(fileExtension || '')
}
