'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button, buttonVariants } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
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

import { useQuery, useQueryClient } from '@tanstack/react-query'
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
import DatePicker from '@/components/core/date-pickers/date-picker'
import { TLocation } from '@/types/core/location'
import { DrawerClose } from '@/components/ui/drawer'
import { TJobPosition } from '@/types/core/position'

const ManageCandidateForm = ({
    isEdit,
    candidate,
    candidateId,
    jobPositionsList,
    locationsList,
}: {
    isEdit: boolean
    candidate?: TCandidate
    candidateId?: number
    jobPositionsList: TJobPosition[]
    locationsList: TLocation[]
}) => {
    const { dictionary, language } = useDictionaryStore()
    const queryClient = useQueryClient()

    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)

    const [filteredJobPositionsList, setFilteredJobPositionsList] = useState<
        TJobPosition[]
    >([])

    const [selectedJobPosition, setSelectedJobPosition] = useState<string>(
        isEdit
            ? String(candidate?.job_position_id) || ''
            : (candidate?.job_position_id as string) || ''
    )

    const manageCandidateForm = useForm<TManageCandidateFormSchema>({
        resolver: zodResolver(getManageCandidateFormSchema(isEdit)),
        defaultValues: {
            id: isEdit ? candidate?.id : null,
            first_name: isEdit ? candidate?.first_name : '',
            last_name: isEdit ? candidate?.last_name : '',
            age: isEdit ? String(candidate?.age) : '',
            phone: isEdit ? candidate?.phone : '',
            email: isEdit ? candidate?.email : '',
            address: isEdit ? candidate?.address : '',
            city: isEdit ? candidate?.city : '',
            state: isEdit ? candidate?.state : '',
            zip: isEdit ? candidate?.zip : '',
            location_id: isEdit ? candidate?.location_id : '',
            job_position_id: '',
        },
    })

    const { setValue } = manageCandidateForm

    const handleFilterJobPositionsByLocation = (locationId: number) => {
        const filteredPositions = jobPositionsList?.filter(
            (jp) => jp.location_id === locationId
        )
        setFilteredJobPositionsList(filteredPositions as TJobPosition[])
        setSelectedJobPosition('')
    }

    useEffect(() => {
        setFilteredJobPositionsList(
            jobPositionsList?.filter(
                (jp) => jp.location_id === candidate?.location_id
            ) as TJobPosition[]
        )
    }, [])

    useEffect(() => {
        setValue('job_position_id', Number(selectedJobPosition))
    }, [selectedJobPosition])

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

        console.log(response.data)

        queryClient.invalidateQueries({
            queryKey: ['candidates'],
        })

        // router.push(`/${language}/candidates`)
        setIsLoading(false)
    }

    return (
        <Form {...manageCandidateForm}>
            <form
                onSubmit={manageCandidateForm.handleSubmit(onSubmit)}
                className="space-y-4"
            >
                <div>
                    <div className="lg:pl-1">
                        <h2 className="text-md font-semibold">
                            Personal information
                        </h2>
                        <p className="text-xs text-muted-foreground">
                            Personal related fields
                        </p>
                    </div>
                    <Separator className="my-4" />
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
                        <FormField
                            control={manageCandidateForm.control}
                            name="first_name"
                            render={({ field }) => (
                                <FormItem className="relative w-full">
                                    <FormLabel>
                                        {
                                            dictionary?.pages?.candidates?.forms
                                                ?.labels['first_name']
                                        }
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={
                                                dictionary?.pages?.candidates
                                                    ?.forms?.placeholders[
                                                    'first_name'
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
                        <FormField
                            control={manageCandidateForm.control}
                            name="last_name"
                            render={({ field }) => (
                                <FormItem className="relative w-full">
                                    <FormLabel>
                                        {
                                            dictionary?.pages?.candidates?.forms
                                                ?.labels['last_name']
                                        }
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={
                                                dictionary?.pages?.candidates
                                                    ?.forms?.placeholders[
                                                    'last_name'
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
                        <FormField
                            control={manageCandidateForm.control}
                            name="age"
                            render={({ field }) => (
                                <FormItem className="relative w-full">
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
                                                dictionary?.pages?.candidates
                                                    ?.forms?.placeholders['age']
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
                </div>
                <div>
                    <div className="lg:pl-1">
                        <h2 className="text-md font-semibold">
                            Contact information
                        </h2>
                        <p className="text-xs text-muted-foreground">
                            Contact & address related fields
                        </p>
                    </div>
                    <Separator className="my-4" />
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1 lg:flex-row lg:items-start xl:grid-cols-2">
                        <FormField
                            control={manageCandidateForm.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="relative w-full">
                                    <FormLabel>
                                        {
                                            dictionary?.pages?.candidates?.forms
                                                ?.labels['email']
                                        }
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={
                                                dictionary?.pages?.candidates
                                                    ?.forms?.placeholders[
                                                    'email'
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
                        <FormField
                            control={manageCandidateForm.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem className="relative w-full">
                                    <FormLabel>
                                        {
                                            dictionary?.pages?.candidates?.forms
                                                ?.labels['phone']
                                        }
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={
                                                dictionary?.pages?.candidates
                                                    ?.forms?.placeholders[
                                                    'phone'
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
                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1 lg:flex-row lg:items-start xl:grid-cols-3">
                        <FormField
                            control={manageCandidateForm.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem className="relative w-full">
                                    <FormLabel>
                                        {/* {
                                            dictionary?.pages?.candidates?.forms
                                                ?.labels['phone']
                                        } */}
                                        Address
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            // placeholder={
                                            //     dictionary?.pages?.candidates
                                            //         ?.forms?.placeholders[
                                            //         'phone'
                                            //     ]
                                            // }
                                            placeholder="1234 Main st"
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
                            name="city"
                            render={({ field }) => (
                                <FormItem className="relative w-full">
                                    <FormLabel>
                                        {/* {
                                            dictionary?.pages?.candidates?.forms
                                                ?.labels['phone']
                                        } */}
                                        City
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            // placeholder={
                                            //     dictionary?.pages?.candidates
                                            //         ?.forms?.placeholders[
                                            //         'phone'
                                            //     ]
                                            // }
                                            placeholder="El Paso"
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
                            name="state"
                            render={({ field }) => (
                                <FormItem className="relative w-full">
                                    <FormLabel>
                                        {/* {
                                            dictionary?.pages?.candidates?.forms
                                                ?.labels['phone']
                                        } */}
                                        State
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            // placeholder={
                                            //     dictionary?.pages?.candidates
                                            //         ?.forms?.placeholders[
                                            //         'phone'
                                            //     ]
                                            // }
                                            placeholder="Texas"
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
                            name="zip"
                            render={({ field }) => (
                                <FormItem className="relative w-full">
                                    <FormLabel>
                                        {/* {
                                            dictionary?.pages?.candidates?.forms
                                                ?.labels['phone']
                                        } */}
                                        Zip
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            // placeholder={
                                            //     dictionary?.pages?.candidates
                                            //         ?.forms?.placeholders[
                                            //         'phone'
                                            //     ]
                                            // }
                                            placeholder="79912"
                                            {...field}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div>
                    <div className="lg:pl-1">
                        <h2 className="text-md font-semibold">
                            Application information
                        </h2>
                        <p className="text-xs text-muted-foreground">
                            Job application and employment related fields
                        </p>
                    </div>
                    <Separator className="my-4" />
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1 lg:flex-row lg:items-start xl:grid-cols-2">
                        <FormField
                            control={manageCandidateForm.control}
                            name="location_id"
                            render={({ field }) => (
                                <FormItem className="relative w-full">
                                    <FormLabel>
                                        {/* {
                                            dictionary?.pages?.candidates?.forms
                                                ?.labels['status']
                                        } */}
                                        Location
                                    </FormLabel>
                                    <Select
                                        onValueChange={(value) => {
                                            field.onChange(value)
                                            handleFilterJobPositionsByLocation(
                                                Number(value)
                                            )
                                        }}
                                        disabled={
                                            isLoading || !locationsList?.length
                                        }
                                        defaultValue={
                                            isEdit
                                                ? String(candidate?.location_id)
                                                : ''
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
                                            {locationsList &&
                                                locationsList.map(
                                                    (location) => (
                                                        <SelectItem
                                                            key={location.id}
                                                            value={String(
                                                                location.id
                                                            )}
                                                        >
                                                            {location.name}
                                                        </SelectItem>
                                                    )
                                                )}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={manageCandidateForm.control}
                            name="job_position_id"
                            render={({ field }) => (
                                <FormItem className="relative w-full">
                                    <FormLabel>
                                        {/* {
                                            dictionary?.pages?.candidates?.forms
                                                ?.labels['status']
                                        } */}
                                        Job Position
                                    </FormLabel>
                                    <Select
                                        onValueChange={(value) =>
                                            setSelectedJobPosition(value)
                                        }
                                        disabled={
                                            isLoading ||
                                            !filteredJobPositionsList.length
                                        }
                                        value={selectedJobPosition}
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
                                            {filteredJobPositionsList &&
                                                filteredJobPositionsList.map(
                                                    (position) => (
                                                        <SelectItem
                                                            key={position.id}
                                                            value={String(
                                                                position.id
                                                            )}
                                                        >
                                                            {position.name}
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
                    {/* <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1 lg:flex-row lg:items-start xl:grid-cols-3">
                        <FormField
                            control={manageCandidateForm.control}
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
                        <FormField
                            control={manageCandidateForm.control}
                            name="enrollment_start"
                            render={({ field }) => (
                                <FormItem className="relative w-full">
                                    <FormLabel>
                                        Enrollment start
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
                        <FormField
                            control={manageCandidateForm.control}
                            name="enrollment_end"
                            render={({ field }) => (
                                <FormItem className="relative w-full">
                                    <FormLabel>
                                        Enrollment end
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
                    </div> */}
                </div>

                <Separator />

                <div className="flex flex-col-reverse gap-2 lg:flex-row lg:items-center lg:justify-end">
                    {!isEdit ? (
                        <DrawerClose
                            tabIndex={-1}
                            className={buttonVariants({ variant: 'outline' })}
                        >
                            {dictionary?.core?.buttons['cancel']}
                        </DrawerClose>
                    ) : null}
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="ml-auto w-full md:w-fit"
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
