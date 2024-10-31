import { TDocument } from '@/types/core/document'
import { useDictionaryStore } from '@/stores/core/dictionary-store'
import ValidateCandidateDocumentForm from '../forms/validate-document'
import DynamicDialog from '@/components/core/dialogs/dynamic-dialog'
import React from 'react'

const ValidateCandidateDocumentDialog = ({
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
            title={'Validate Document'}
            description={'Validate candidate document'}
        >
            <ValidateCandidateDocumentForm
                candidateDocument={candidateDocument}
                setIsOpen={setIsOpen}
            />
        </DynamicDialog>
    )
}

export default ValidateCandidateDocumentDialog
