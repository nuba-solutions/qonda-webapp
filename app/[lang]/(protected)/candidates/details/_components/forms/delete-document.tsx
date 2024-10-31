'use client'

import { deleteCandidateDocument } from '@/actions/pages/candidates/candidates'
import ToastNotification from '@/components/core/toasts/toast-notification'
import { Button, buttonVariants } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/hooks/use-toast'
import { useDictionaryStore } from '@/stores/core/dictionary-store'
import { TDocument } from '@/types/core/document'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SetStateAction } from 'react'

const DeleteCandidateDocumentForm = ({
    candidateDocument,
    setIsOpen,
}: {
    candidateDocument: TDocument
    setIsOpen: React.Dispatch<SetStateAction<boolean>>
}) => {
    const { dictionary, language } = useDictionaryStore()

    if (!candidateDocument) {
        return null
    }

    const queryClient = useQueryClient()

    const documentToDelete = {
        documentId: candidateDocument.id,
        candidateId: candidateDocument.candidate_id,
    }

    const { mutate: deleteDocumentMutation } = useMutation({
        mutationFn: deleteCandidateDocument,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['candidate', candidateDocument.candidate_id],
            })
            toast({
                action: (
                    <ToastNotification
                        title={dictionary?.core?.messages['success']}
                        message={
                            dictionary?.pages?.candidates?.forms?.messages[
                                'delete_candidate_success'
                            ]
                        }
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
                        message={
                            dictionary?.pages?.candidates?.forms?.messages[
                                'delete_candidate_error'
                            ]
                        }
                        type="error"
                    />
                ),
            })
        },
    })

    return (
        <>
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
                        variant="destructive"
                        onClick={() => deleteDocumentMutation(documentToDelete)}
                    >
                        {dictionary?.core?.buttons['confirm_delete']}
                    </Button>
                </DialogClose>
            </div>
        </>
    )
}

export default DeleteCandidateDocumentForm
