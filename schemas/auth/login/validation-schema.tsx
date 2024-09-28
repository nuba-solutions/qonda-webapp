import { TDictionary } from '@/types/core/dictionary'
import { z } from 'zod'

export let loginFormSchema: any

export const getLoginFormSchema = (dictionary: TDictionary) => {
    const { validations: validations_dictionary } = dictionary.pages.login.form
    const loginFormSchema = z.object({
        username: z
            .string()
            .email({ message: validations_dictionary['username'] }),
        password: z.string().min(1, {
            message: validations_dictionary['password'],
        }),
    })

    return loginFormSchema
}

export type TLoginFormSchema = z.infer<typeof loginFormSchema>
