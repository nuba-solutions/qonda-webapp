'use client'

import { validateCandidateDocument } from '@/actions/pages/candidates/candidates'
import ToastNotification from '@/components/core/toasts/toast-notification'
import { Button, buttonVariants } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DialogClose } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/hooks/use-toast'
import { useDictionaryStore } from '@/stores/core/dictionary-store'
import { TDocument } from '@/types/core/document'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SetStateAction, useState } from 'react'

const ValidateCandidateDocumentForm = ({
    candidateDocument,
    setIsOpen,
}: {
    candidateDocument: TDocument
    setIsOpen: React.Dispatch<SetStateAction<boolean>>
}) => {
    const { dictionary, language } = useDictionaryStore()
    const [isAgreementChecked, setIsAgreementChecked] = useState(false)

    if (!candidateDocument) {
        return null
    }

    const queryClient = useQueryClient()

    const documentToValidate = {
        documentId: candidateDocument.id,
        candidateId: candidateDocument.candidate_id,
    }

    const { mutate: validateDocumentMutation } = useMutation({
        mutationFn: validateCandidateDocument,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['candidate', candidateDocument.candidate_id],
            })
            toast({
                action: (
                    <ToastNotification
                        title={dictionary?.core?.messages['success']}
                        message={'Document validate successfully!'}
                        type="success"
                    />
                ),
            })
            setIsOpen(false)
        },
        onError: () => {
            toast({
                action: (
                    <ToastNotification
                        title={dictionary?.core?.messages['error']}
                        message={'Could not validate document!'}
                        type="error"
                    />
                ),
            })
        },
    })

    return (
        <>
            <div className="items-top mb-4 flex space-x-2 lg:mb-0">
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
                        I confirm verifying the document
                    </label>
                    <p className="text-xs text-muted-foreground">
                        You agree to validating document policies and
                        responsibilities.
                    </p>
                </div>
            </div>
            <Separator className="mb-4 lg:mb-0" />
            <div className="flex flex-col-reverse gap-2 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
                <DialogClose
                    tabIndex={-1}
                    className={buttonVariants({ variant: 'outline' })}
                    onClick={() => setIsOpen(false)}
                >
                    {dictionary?.core?.buttons['cancel']}
                </DialogClose>
                <DialogClose asChild>
                    <Button
                        disabled={!isAgreementChecked}
                        onClick={() =>
                            validateDocumentMutation(documentToValidate)
                        }
                    >
                        Confirm validate
                    </Button>
                </DialogClose>
            </div>
        </>
    )
}

export default ValidateCandidateDocumentForm
