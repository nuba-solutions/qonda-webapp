import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import {
    getTranslatedCandidateStatus,
    renderCandidateStatus,
} from '@/helpers/table'
import { useDictionaryStore } from '@/stores/core/dictionary-store'
import { TCandidate } from '@/types/pages/candidates/candidate'
import DeleteCandidateForm from '../forms/delete-form'

const DeleteCandidateDialog = ({ candidate }: { candidate: TCandidate }) => {
    const { dictionary } = useDictionaryStore()

    return (
        <DialogContent>
            <DialogHeader className="text-left">
                <DialogTitle>
                    {dictionary?.pages?.candidates?.dialogs?.delete['title']}
                </DialogTitle>
                <DialogDescription>
                    {dictionary?.core?.dialogs?.delete['subtitle']}
                </DialogDescription>
            </DialogHeader>
            <Separator />
            <div className="flex items-center justify-between">
                <p className="text-muted-foreground">
                    {dictionary?.pages?.candidates?.forms?.labels['first_name']}
                </p>
                <p>{candidate.first_name}</p>
            </div>
            <div className="flex items-center justify-between">
                <p className="text-muted-foreground">
                    {dictionary?.pages?.candidates?.forms?.labels['last_name']}
                </p>
                <p>{candidate.last_name}</p>
            </div>
            <div className="flex items-center justify-between">
                <p className="text-muted-foreground">
                    {dictionary?.pages?.candidates?.forms?.labels['email']}
                </p>
                <p>{candidate.email}</p>
            </div>
            <div className="flex items-center justify-between">
                <p className="text-muted-foreground">
                    {dictionary?.pages?.candidates?.forms?.labels['status']}
                </p>
                {renderCandidateStatus(
                    candidate.status_id,
                    getTranslatedCandidateStatus(
                        candidate.status_id,
                        dictionary
                    )
                )}
            </div>

            <Separator />
            <DeleteCandidateForm candidateId={candidate.id} />
        </DialogContent>
    )
}

export default DeleteCandidateDialog
