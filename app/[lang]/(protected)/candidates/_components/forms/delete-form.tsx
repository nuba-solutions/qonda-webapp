'use client'

import { deleteCandidate } from '@/actions/pages/candidates/candidates'
import ToastNotification from '@/components/core/toasts/toast-notification'
import { Button, buttonVariants } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { toast } from '@/hooks/use-toast'
import { useDictionaryStore } from '@/stores/dictionary-store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

const DeleteCandidateForm = ({
    candidateId,
}: {
    candidateId: number | undefined
}) => {
    if (!candidateId) return null
    const { dictionary, language } = useDictionaryStore()
    const router = useRouter()

    const queryClient = useQueryClient()

    const { mutate: deleteCandidateMutation } = useMutation({
        mutationFn: deleteCandidate,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['candidates'] })
            router.push(`/${language}/candidates`)
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
        <div className="flex items-center justify-between">
            <DialogClose
                tabIndex={-1}
                className={buttonVariants({ variant: 'outline' })}
            >
                {dictionary?.core?.buttons['cancel']}
            </DialogClose>
            <DialogClose asChild>
                <Button
                    variant="destructive"
                    onClick={() => deleteCandidateMutation(candidateId)}
                >
                    {dictionary?.core?.buttons['confirm_delete']}
                </Button>
            </DialogClose>
        </div>
    )
}

export default DeleteCandidateForm
