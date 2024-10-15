'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
import { useRouter } from 'next/navigation'
import { useDictionaryStore } from '@/stores/dictionary-store'
import { Separator } from '@/components/ui/separator'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { HiOutlineFolder, HiXMark } from 'react-icons/hi2'
import ToastNotification from '@/components/core/toasts/toast-notification'

import { useQueryClient } from '@tanstack/react-query'
import { TCandidate } from '@/types/pages/candidates/candidate'
import {
    getManageCandidateFormSchema,
    TManageCandidateFormSchema,
} from '@/schemas/pages/candidates/validation-schema'
import {
    createCandidate,
    updateCandidate,
} from '@/actions/pages/candidates/candidates'
import { toast } from '@/hooks/use-toast'

const ManageCandidateForm = ({
    isEdit,
    candidate,
    candidateId,
}: {
    isEdit: boolean
    candidate?: TCandidate
    candidateId?: number
}) => {
    const { dictionary, language } = useDictionaryStore()
    const queryClient = useQueryClient()

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const manageCandidateForm = useForm<TManageCandidateFormSchema>({
        resolver: zodResolver(getManageCandidateFormSchema(isEdit)),
        defaultValues: {
            id: isEdit ? candidate?.id : null,
            first_name: isEdit ? candidate?.first_name : '',
            last_name: isEdit ? candidate?.last_name : '',
            age: isEdit ? String(candidate?.age) : '',
            phone: isEdit ? candidate?.phone : '',
            email: isEdit ? candidate?.email : '',
            unit: isEdit ? candidate?.unit : '',
            status: isEdit ? String(candidate?.status) : '',
            interview_date: isEdit ? candidate?.interview_date : '',
            enrollment_date: isEdit ? candidate?.enrollment_date : '',
        },
    })

    const onSubmit = async (values: TManageCandidateFormSchema) => {
        setIsLoading(true)

        const response = isEdit
            ? await updateCandidate(values, candidateId as number)
            : await createCandidate(values)

        if (!response) {
            setIsLoading(false)
            toast({
                action: (
                    <ToastNotification
                        title={dictionary?.core?.messages['error']}
                        message={
                            isEdit
                                ? dictionary?.pages?.candidates?.forms
                                      ?.messages['update_candidate_error']
                                : dictionary?.pages?.candidates?.forms
                                      ?.messages['create_candidate_error']
                        }
                        type="error"
                    />
                ),
            })
            return
        }

        toast({
            action: (
                <ToastNotification
                    title={dictionary?.core?.messages['success']}
                    message={
                        isEdit
                            ? dictionary?.pages?.candidates?.forms?.messages[
                                  'update_candidate_success'
                              ]
                            : dictionary?.pages?.candidates?.forms?.messages[
                                  'create_candidate_success'
                              ]
                    }
                    type="success"
                />
            ),
        })

        queryClient.invalidateQueries({
            queryKey: ['candidates'],
        })

        router.push(`/${language}/candidates`)
        setIsLoading(false)
    }

    return (
        <Form {...manageCandidateForm}>
            <form
                onSubmit={manageCandidateForm.handleSubmit(onSubmit)}
                className="space-y-4"
            >
                <div className="mb-8 grid grid-cols-1 gap-4 gap-x-8 md:grid-cols-2 lg:grid-cols-1 lg:flex-row lg:items-start xl:grid-cols-2">
                    <FormField
                        control={manageCandidateForm.control}
                        name="first_name"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>
                                    {
                                        dictionary?.pages?.candidates?.forms
                                            ?.labels['first_name']
                                    }
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={
                                            dictionary?.pages?.candidates?.forms
                                                ?.placeholders['first_name']
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
                        control={manageCandidateForm.control}
                        name="last_name"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>
                                    {
                                        dictionary?.pages?.candidates?.forms
                                            ?.labels['last_name']
                                    }
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={
                                            dictionary?.pages?.candidates?.forms
                                                ?.placeholders['last_name']
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
                        control={manageCandidateForm.control}
                        name="age"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>
                                    {
                                        dictionary?.pages?.candidates?.forms
                                            ?.labels['age']
                                    }
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder={
                                            dictionary?.pages?.candidates?.forms
                                                ?.placeholders['age']
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
                        control={manageCandidateForm.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>
                                    {
                                        dictionary?.pages?.candidates?.forms
                                            ?.labels['phone']
                                    }
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={
                                            dictionary?.pages?.candidates?.forms
                                                ?.placeholders['phone']
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
                        control={manageCandidateForm.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>
                                    {
                                        dictionary?.pages?.candidates?.forms
                                            ?.labels['email']
                                    }
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={
                                            dictionary?.pages?.candidates?.forms
                                                ?.placeholders['email']
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
                        control={manageCandidateForm.control}
                        name="unit"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>
                                    {
                                        dictionary?.pages?.candidates?.forms
                                            ?.labels['unit']
                                    }
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={
                                            dictionary?.pages?.candidates?.forms
                                                ?.placeholders['unit']
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
                        control={manageCandidateForm.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>
                                    {
                                        dictionary?.pages?.candidates?.forms
                                            ?.labels['status']
                                    }
                                </FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    disabled={isLoading}
                                    defaultValue={
                                        isEdit ? String(candidate?.status) : ''
                                    }
                                >
                                    <FormControl>
                                        <SelectTrigger
                                            className={cn(
                                                field.value === ''
                                                    ? 'text-muted-foreground'
                                                    : ''
                                            )}
                                            {...field}
                                            aria-label={'Select facility'}
                                        >
                                            <SelectValue
                                                placeholder={
                                                    dictionary?.core?.inputs
                                                        ?.placeholders[
                                                        'select_option'
                                                    ]
                                                }
                                                defaultChecked={true}
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value={String(0)} key={0}>
                                            {
                                                dictionary?.core?.statuses
                                                    ?.candidates['in_process']
                                            }
                                        </SelectItem>
                                        <SelectItem value={String(1)} key={1}>
                                            {
                                                dictionary?.core?.statuses
                                                    ?.candidates['interview']
                                            }
                                        </SelectItem>
                                        <SelectItem value={String(2)} key={2}>
                                            {
                                                dictionary?.core?.statuses
                                                    ?.candidates['hired']
                                            }
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={manageCandidateForm.control}
                        name="interview_date"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>
                                    {
                                        dictionary?.pages?.candidates?.forms
                                            ?.labels['interview_date']
                                    }
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="date"
                                        placeholder={
                                            dictionary?.pages?.candidates?.forms
                                                ?.placeholders['interview_date']
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
                        control={manageCandidateForm.control}
                        name="enrollment_date"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>
                                    {
                                        dictionary?.pages?.candidates?.forms
                                            ?.labels['enrollment_date']
                                    }
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="date"
                                        placeholder={
                                            dictionary?.pages?.candidates?.forms
                                                ?.placeholders[
                                                'enrollment_date'
                                            ]
                                        }
                                        {...field}
                                        disabled={isLoading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Separator />

                <div className="flex">
                    <Button
                        className="ml-auto"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <AiOutlineLoading className="animate-spin text-lg" />
                        ) : isEdit ? (
                            // dictionary?.pages?.personnel?.modules?.documents
                            //     ?.buttons['update_document']
                            'Update candidate'
                        ) : (
                            // dictionary?.pages?.personnel?.modules?.documents
                            //     ?.buttons['create_document']
                            'Create candidate'
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default ManageCandidateForm
