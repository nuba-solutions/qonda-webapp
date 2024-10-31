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
import React, { SetStateAction, useEffect, useState } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { Separator } from '@/components/ui/separator'
import ToastNotification from '@/components/core/toasts/toast-notification'
import { DialogClose } from '@/components/ui/dialog'
import { useDictionaryStore } from '@/stores/core/dictionary-store'
import { TDocument } from '@/types/core/document'
import {
    getManageDocumentFormSchema,
    TManageDocumentFormSchema,
} from '@/schemas/core/documents/validation-schema'
import { toast } from '@/hooks/use-toast'
import { HiOutlineFolder, HiXMark } from 'react-icons/hi2'
import {
    createCandidateDocument,
    updateCandidateDocument,
} from '@/actions/pages/candidates/candidates'

const ManageCandidateDocumentForm = ({
    candidateDocument,
    isEdit,
    setIsOpen,
}: {
    candidateDocument?: TDocument
    isEdit: boolean
    setIsOpen: React.Dispatch<SetStateAction<boolean>>
}) => {
    const { dictionary, language } = useDictionaryStore()
    const queryClient = useQueryClient()

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [filesArray, setFilesArray] = useState<File[]>([])

    const handleAddFileToArray = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0]
        setFilesArray([...filesArray, file as File])
    }

    const handleRemoveFileFromArray = (file: File) => {
        const updatedFilesArray = filesArray.filter((item) => item !== file)
        setFilesArray(updatedFilesArray)
    }

    const manageCandidateDocumentForm = useForm<TManageDocumentFormSchema>({
        resolver: zodResolver(getManageDocumentFormSchema(isEdit)),
        defaultValues: {
            id: isEdit ? candidateDocument?.id : null,
            name: isEdit ? candidateDocument?.name || '' : '',
            files: [],
        },
    })

    const { setValue } = manageCandidateDocumentForm

    useEffect(() => {
        setValue('files', filesArray)
        manageCandidateDocumentForm.clearErrors('files')
    }, [filesArray])

    const onSubmit = async (values: TManageDocumentFormSchema) => {
        setIsLoading(true)

        const { files, ...rest } = values
        const formData = new FormData()

        formData.append('values', JSON.stringify(rest))
        files.forEach((file: File) => {
            formData.append('file[]', file)
        })

        const response = isEdit
            ? await updateCandidateDocument(
                  formData,
                  candidateDocument?.id as number
              )
            : await createCandidateDocument(formData)

        if (!response) {
            setIsLoading(false)
            toast({
                action: (
                    <ToastNotification
                        title={dictionary?.core?.messages['error']}
                        message={
                            isEdit
                                ? 'Could not update document!'
                                : 'Could not create document!'
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
                            ? 'Document updated successfully!'
                            : 'Document created successfully!'
                    }
                    type="success"
                />
            ),
        })
        await queryClient.invalidateQueries({
            queryKey: ['candidate', candidateDocument?.candidate_id],
        })
        setIsLoading(false)
        setIsOpen(false)
    }

    return (
        <Form {...manageCandidateDocumentForm}>
            <form
                onSubmit={manageCandidateDocumentForm.handleSubmit(onSubmit)}
                className="space-y-4"
            >
                <div className="mb-4 flex flex-col gap-3">
                    <FormField
                        control={manageCandidateDocumentForm.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="relative w-full">
                                <FormLabel>
                                    {/* {
                                        dictionary?.pages?.measuring_units
                                            ?.forms?.labels[
                                            'measuring_unit_name'
                                        ]
                                    } */}
                                    Document name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={
                                            // dictionary?.pages?.measuring_units
                                            //     ?.forms?.placeholders[
                                            //     'measuring_unit_name'
                                            // ]
                                            'Type in document name'
                                        }
                                        {...field}
                                        disabled={isLoading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {!isEdit ? (
                        <FormField
                            control={manageCandidateDocumentForm.control}
                            name="files"
                            render={({ field }) => (
                                <div className="flex w-full flex-col space-y-2">
                                    <FormItem className="flex w-full items-center justify-between">
                                        <div>
                                            <p className="text-sm font-semibold">
                                                Select file
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Add a file to this document
                                            </p>
                                        </div>
                                        <FormControl>
                                            <>
                                                <Button
                                                    className="mt-0 w-fit gap-2"
                                                    variant="outline"
                                                    disabled={
                                                        isLoading ||
                                                        filesArray.length >= 1
                                                    }
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        document
                                                            ?.getElementById(
                                                                'candidate_document_input'
                                                            )
                                                            ?.click()
                                                    }}
                                                >
                                                    <HiOutlineFolder />
                                                    {/* {
                                                dictionary?.pages?.personnel
                                                    ?.modules?.documents?.forms
                                                    ?.placeholders[
                                                    'select_files'
                                                ]
                                            } */}
                                                    Browse files
                                                </Button>
                                                <Input
                                                    id="candidate_document_input"
                                                    placeholder="File"
                                                    type="file"
                                                    accept=".png,.jpg,.jpeg,.pdf,.docx"
                                                    onChange={(event) => {
                                                        handleAddFileToArray(
                                                            event
                                                        )
                                                    }}
                                                    className="hidden"
                                                />
                                            </>
                                        </FormControl>
                                    </FormItem>
                                    <FormMessage />
                                </div>
                            )}
                        />
                    ) : null}
                    {filesArray.length > 0 ? (
                        <>
                            <Separator className="my-2" />
                            <ul className="flex flex-wrap items-center gap-3">
                                {filesArray.map((file) => (
                                    <li
                                        key={file?.name}
                                        className="flex items-center gap-4 rounded-sm border bg-secondary py-2 pl-4 pr-2 leading-none"
                                    >
                                        <p>{file?.name}</p>
                                        <span
                                            className="group flex h-5 w-5 cursor-pointer items-center justify-center rounded-sm bg-muted-foreground/30 hover:bg-red-500"
                                            onClick={() =>
                                                handleRemoveFileFromArray(file)
                                            }
                                        >
                                            <HiXMark className="text-md group-hover:text-white" />
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : null}
                </div>

                <>
                    <Separator />
                    <div className="flex flex-col-reverse gap-2 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
                        <DialogClose
                            tabIndex={-1}
                            className={buttonVariants({ variant: 'outline' })}
                            onClick={() => setIsOpen(false)}
                        >
                            {dictionary?.core?.buttons['cancel']}
                        </DialogClose>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <AiOutlineLoading className="animate-spin text-lg" />
                            ) : isEdit ? (
                                'Update'
                            ) : (
                                'Create'
                            )}
                        </Button>
                    </div>
                </>
            </form>
        </Form>
    )
}

export default ManageCandidateDocumentForm
