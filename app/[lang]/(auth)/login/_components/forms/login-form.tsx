'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
import { HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2'
import usePersistStore from '@/hooks/usePersistStore'
import {
    TLoginFormSchema,
    getLoginFormSchema,
} from '@/schemas/auth/login/validation-schema'
import { useDictionaryStore } from '@/stores/core/dictionary-store'
import { Locale } from '@/i18n.config'
import { TDictionary } from '@/types/core/dictionary'
import { login } from '@/actions/auth/login'
import { useUserStore } from '@/stores/core/user-store'
import { Separator } from '@/components/ui/separator'

export function LoginForm({
    dictionary,
    lang,
}: {
    dictionary: TDictionary
    lang: Locale
}) {
    const userStore = usePersistStore(useUserStore, (state) => state)
    const dictionaryStore = usePersistStore(
        useDictionaryStore,
        (state) => state
    )

    const router = useRouter()

    const [formError, setFormError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const loginForm = useForm<TLoginFormSchema>({
        resolver: zodResolver(getLoginFormSchema(dictionary)),
        defaultValues: {
            username: '',
            password: '',
        },
    })

    const onSubmit = async (values: TLoginFormSchema) => {
        setIsLoading(true)
        dictionaryStore?.updateDictionary(dictionary)
        dictionaryStore?.updateLanguage(lang)

        const response = await login(values)

        if (!response || response.status !== 200) {
            setFormError(dictionary.pages.login.form.validations['credentials'])
            setIsLoading(false)
            return
        }

        // if (!response.is_active) {
        //     setFormError(
        //         "Your user is inactive. Contact your company's admin for more details."
        //     )
        //     setIsLoading(false)
        //     return
        // }

        userStore?.updateUser({ first_name: 'Yohans', last_name: 'Mendoza' })

        setFormError('')
        setIsLoading(false)

        router.push('/dashboard')
    }

    return (
        <Form {...loginForm}>
            <form
                onSubmit={loginForm.handleSubmit(onSubmit)}
                className="space-y-4"
            >
                <div className="flex flex-col gap-4">
                    <FormField
                        control={loginForm.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem className="relative">
                                <FormLabel>
                                    {
                                        dictionary.pages.login.form.labels[
                                            'username'
                                        ]
                                    }
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={
                                            dictionary.pages.login.form
                                                .placeholders['email']
                                        }
                                        {...field}
                                        disabled={isLoading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="relative">
                                <FormLabel>
                                    {
                                        dictionary.pages.login.form.labels[
                                            'password'
                                        ]
                                    }
                                </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type={
                                                isPasswordVisible
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            placeholder={
                                                dictionary.pages.login.form
                                                    .placeholders['password']
                                            }
                                            {...field}
                                            disabled={isLoading}
                                        />
                                        <Button
                                            tabIndex={-1}
                                            variant="ghost"
                                            size="icon"
                                            type="button"
                                            className="absolute bottom-1/2 right-1 top-1/2 -translate-y-1/2 hover:bg-transparent"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                setIsPasswordVisible(
                                                    !isPasswordVisible
                                                )
                                            }}
                                        >
                                            {isPasswordVisible ? (
                                                <HiOutlineEyeSlash className="text-lg" />
                                            ) : (
                                                <HiOutlineEye className="text-lg" />
                                            )}
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading ? (
                        <AiOutlineLoading className="animate-spin text-lg" />
                    ) : (
                        `${dictionary.pages.login.form.buttons['login']}`
                    )}
                </Button>
                {formError ? (
                    <FormDescription className="w-full rounded-md border border-red-500 bg-red-500/10 px-5 py-3 text-center font-medium text-red-500">
                        {formError}
                    </FormDescription>
                ) : null}
            </form>
        </Form>
    )
}
