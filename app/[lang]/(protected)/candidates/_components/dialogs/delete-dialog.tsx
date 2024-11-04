import {
    getTranslatedCandidateStatus,
    renderCandidateStatus,
} from '@/helpers/table'
import { useDictionaryStore } from '@/stores/core/dictionary-store'
import { TCandidate } from '@/types/pages/candidates/candidate'
import DeleteCandidateForm from '../forms/delete-form'
import DynamicDialog from '@/components/core/dialogs/dynamic-dialog'
import { Locale } from '@/i18n.config'

const DeleteCandidateDialog = ({
    candidate,
    isOpen,
    setIsOpen,
}: {
    candidate: TCandidate
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const { dictionary, language } = useDictionaryStore()

    return (
        <DynamicDialog
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title={dictionary?.pages?.candidates?.dialogs?.delete['title']}
            description={dictionary?.core?.dialogs?.delete['subtitle']}
        >
            <div className="mb-4 space-y-2 lg:mb-0">
                <div className="flex items-center justify-between">
                    <p className="text-muted-foreground">
                        {
                            dictionary?.pages?.candidates?.forms?.labels[
                                'first_name'
                            ]
                        }
                    </p>
                    <p>{candidate.first_name}</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-muted-foreground">
                        {
                            dictionary?.pages?.candidates?.forms?.labels[
                                'last_name'
                            ]
                        }
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
                            language as Locale
                        )
                    )}
                </div>
            </div>

            <DeleteCandidateForm
                candidateId={candidate.id}
                setIsOpen={setIsOpen}
            />
        </DynamicDialog>
    )
}

export default DeleteCandidateDialog
