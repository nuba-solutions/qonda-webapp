import { Separator } from '@/components/ui/separator'
import { TabsContent } from '@/components/ui/tabs'
import { TCandidate } from '@/types/pages/candidates/candidate'
import React, { useState } from 'react'
import CandidatesDocumentsTableSection from '../sections/table-section'
import TableLoader from '@/components/core/loaders/table-loader'
import { Button } from '@/components/ui/button'
import ManageCandidateDocumentDialog from '../dialogs/manage-dialog'

const TabContentDocuments = ({ candidate }: { candidate: TCandidate }) => {
    const [isManageDialogOpen, setIsManageDialogOpen] = useState(false)
    if (!candidate) {
        return <TableLoader />
    }

    return (
        <TabsContent
            value="documents"
            className="mt-0 p-4 lg:w-[calc(100vw-360px)]"
        >
            <div className="flex items-center justify-between">
                <div className="lg:pl-1">
                    <h2 className="text-md font-semibold">Documents</h2>
                    <p className="text-xs text-muted-foreground">
                        Documents and files
                    </p>
                </div>
                <>
                    <ManageCandidateDocumentDialog
                        isEdit={false}
                        isOpen={isManageDialogOpen}
                        setIsOpen={setIsManageDialogOpen}
                    />
                    <Button onClick={() => setIsManageDialogOpen(true)}>
                        Add document
                    </Button>
                </>
            </div>
            <Separator className="my-4" />
            <CandidatesDocumentsTableSection documents={candidate.documents} />
        </TabsContent>
    )
}

export default TabContentDocuments
