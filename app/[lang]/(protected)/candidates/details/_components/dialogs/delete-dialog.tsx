import {
    getTranslatedDocumentStatus,
    renderDocumentStatus,
} from '@/helpers/table'
import { useDictionaryStore } from '@/stores/core/dictionary-store'
import { TDocument } from '@/types/core/document'
import DynamicDialog from '@/components/core/dialogs/dynamic-dialog'
import DeleteCandidateDocumentForm from '../forms/delete-document'

const DeleteCandidateDocumentDialog = ({
    candidateDocument,
    isOpen,
    setIsOpen,
}: {
    candidateDocument: TDocument
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const { dictionary } = useDictionaryStore()

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
                        {/* {dictionary?.pages?.candidates?.forms?.labels['first_name']} */}
                        Document
                    </p>
                    <p>{candidateDocument.name}</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-muted-foreground">
                        {dictionary?.pages?.candidates?.forms?.labels['status']}
                    </p>
                    {renderDocumentStatus(
                        candidateDocument.status_id,
                        getTranslatedDocumentStatus(
                            candidateDocument.status_id,
                            dictionary
                        )
                    )}
                </div>
            </div>

            <DeleteCandidateDocumentForm
                candidateDocument={candidateDocument}
                setIsOpen={setIsOpen}
            />
        </DynamicDialog>
    )
}

export default DeleteCandidateDocumentDialog
