import { TDocument } from '@/types/core/document'
import { useDictionaryStore } from '@/stores/core/dictionary-store'
import ManageCandidateDocumentForm from '../forms/manage-document'
import DynamicDialog from '@/components/core/dialogs/dynamic-dialog'
import React from 'react'

const ManageCandidateDocumentDialog = ({
    isEdit,
    candidateDocument,
    isOpen,
    setIsOpen,
}: {
    isEdit: boolean
    candidateDocument?: TDocument
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const { dictionary } = useDictionaryStore()

    return (
        <DynamicDialog
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title={isEdit ? 'Edit document' : 'Create document'}
            description={
                isEdit
                    ? 'Update document name'
                    : 'Add new document to candidate'
            }
        >
            <ManageCandidateDocumentForm
                candidateDocument={candidateDocument}
                isEdit={isEdit}
                setIsOpen={setIsOpen}
            />
        </DynamicDialog>
    )
}

export default ManageCandidateDocumentDialog
