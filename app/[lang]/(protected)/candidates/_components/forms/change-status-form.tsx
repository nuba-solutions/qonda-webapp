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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import ToastNotification from '@/components/core/toasts/toast-notification'

import { useQueryClient } from '@tanstack/react-query'
import { TCandidate } from '@/types/pages/candidates/candidate'
import {
    getChangeCandidateStatusFormSchema,
    TChangeCandidateStatusFormSchema,
} from '@/schemas/pages/candidates/validation-schema'
import { toast } from '@/hooks/use-toast'
import { company } from '@/qonda.config'
import { Checkbox } from '@/components/ui/checkbox'

const ChangeCandidateStatusForm = ({
    candidate,
}: {
    candidate?: TCandidate
}) => {
    const CANDIDATE_STATUSES = Object.values(
        company.company_settings.candidates_rules.statuses
    ).flat()

    const [isAgreementChecked, setIsAgreementChecked] = useState(false)
    const { dictionary, language } = useDictionaryStore()
    const queryClient = useQueryClient()

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const manageCandidateForm = useForm<TChangeCandidateStatusFormSchema>({
        resolver: zodResolver(getChangeCandidateStatusFormSchema()),
        defaultValues: {
            id: candidate?.id,
            status_id: candidate?.status_id,
        },
    })

    const onSubmit = async (values: TChangeCandidateStatusFormSchema) => {
        setIsLoading(true)

        const response = null //!TODO: change status

        if (!response) {
            setIsLoading(false)
            toast({
                action: (
                    <ToastNotification
                        title={dictionary?.core?.messages['error']}
                        message={'Could not change status'}
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
                    message={'Status changed successfully!'}
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
            <div className="items-top mb-8 flex space-x-2 lg:mb-0">
                <Checkbox
                    id="validate-document-agreement"
                    onCheckedChange={() =>
                        setIsAgreementChecked((curr) => !curr)
                    }
                />
                <div className="grid gap-1.5 leading-none">
                    <label
                        htmlFor="validate-document-agreement"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        I confirm reading the rules
                    </label>
                    <p className="text-xs text-muted-foreground">
                        You agree to reading the rules and are aware of all
                        consequences and responsibilities.
                    </p>
                </div>
            </div>
            <Separator className="my-4" />
            <Form {...manageCandidateForm}>
                <form
                    onSubmit={manageCandidateForm.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <div className="grid grid-cols-1">
                        <FormField
                            control={manageCandidateForm.control}
                            name="status_id"
                            render={({ field }) => (
                                <FormItem className="relative w-full">
                                    <FormLabel>
                                        {
                                            dictionary?.pages?.candidates?.forms
                                                ?.labels['status']
                                        }
                                    </FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        disabled={
                                            isLoading || !isAgreementChecked
                                        }
                                        defaultValue={String(field.value)}
                                    >
                                        <FormControl>
                                            <SelectTrigger
                                                className={cn(
                                                    field.value === ''
                                                        ? 'text-muted-foreground'
                                                        : ''
                                                )}
                                                {...field}
                                                aria-label={'Select status'}
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
                                            {CANDIDATE_STATUSES.map(
                                                (status) => (
                                                    <SelectItem
                                                        value={String(
                                                            status.id
                                                        )}
                                                        key={status.id}
                                                    >
                                                        {/* {
                                                    dictionary?.core?.statuses
                                                        ?.candidates[
                                                        'in_process'
                                                    ]
                                                } */}
                                                        {language === 'es' ||
                                                        language === 'es-ES'
                                                            ? status.es
                                                            : status.en}
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Separator />
                    <div className="flex flex-col-reverse gap-2 lg:flex-row lg:items-center lg:justify-end">
                        <Button
                            type="submit"
                            disabled={isLoading || !isAgreementChecked}
                        >
                            {isLoading ? (
                                <AiOutlineLoading className="animate-spin text-lg" />
                            ) : (
                                // dictionary?.pages?.personnel?.modules?.documents
                                //     ?.buttons['create_document']
                                'Confirm status change'
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    )
}

export default ChangeCandidateStatusForm
