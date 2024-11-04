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
import { useState } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
import { useRouter } from 'next/navigation'
import { useDictionaryStore } from '@/stores/core/dictionary-store'
import { Separator } from '@/components/ui/separator'
import ToastNotification from '@/components/core/toasts/toast-notification'

import { useQueryClient } from '@tanstack/react-query'
import { TCandidate } from '@/types/pages/candidates/candidate'

import { toast } from '@/hooks/use-toast'
import DatePicker from '@/components/core/date-pickers/date-picker'
import {
    getScheduleInterviewFormSchema,
    TScheduleInterviewFormSchema,
} from '@/schemas/pages/candidates/validation-schema'

const ScheduleInterviewForm = ({ candidate }: { candidate?: TCandidate }) => {
    const { dictionary, language } = useDictionaryStore()
    const queryClient = useQueryClient()

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const scheduleInterviewForm = useForm<TScheduleInterviewFormSchema>({
        resolver: zodResolver(getScheduleInterviewFormSchema()),
        defaultValues: {
            id: candidate?.id,
            interview_date: candidate?.interview_date,
        },
    })

    const onSubmit = async (values: TScheduleInterviewFormSchema) => {
        setIsLoading(true)

        console.log(values)

        const response = null //!TODO: change status

        if (!response) {
            setIsLoading(false)
            toast({
                action: (
                    <ToastNotification
                        title={dictionary?.core?.messages['error']}
                        message={'Could not schedule interview'}
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
                    message={'Interview scheduled successfully!'}
                    type="success"
                />
            ),
        })

        // console.log(response.data)

        queryClient.invalidateQueries({
            queryKey: ['candidates'],
        })

        // router.push(`/${language}/candidates`)
        setIsLoading(false)
    }

    return (
        <>
            <Form {...scheduleInterviewForm}>
                <form
                    onSubmit={scheduleInterviewForm.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <div className="grid grid-cols-1">
                        <FormField
                            control={scheduleInterviewForm.control}
                            name="interview_date"
                            render={({ field }) => (
                                <FormItem className="relative w-full">
                                    <FormLabel>
                                        {
                                            dictionary?.pages?.candidates?.forms
                                                ?.labels['interview_date']
                                        }
                                    </FormLabel>
                                    <FormControl>
                                        <DatePicker
                                            isLoading={isLoading}
                                            field={field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Separator />
                    <div className="flex flex-col-reverse gap-2 lg:flex-row lg:items-center lg:justify-end">
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <AiOutlineLoading className="animate-spin text-lg" />
                            ) : (
                                // dictionary?.pages?.personnel?.modules?.documents
                                //     ?.buttons['create_document']
                                'Confirm interview'
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    )
}

export default ScheduleInterviewForm
