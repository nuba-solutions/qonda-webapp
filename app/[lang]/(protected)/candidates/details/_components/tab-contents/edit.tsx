import { TabsContent } from '@/components/ui/tabs'
import React from 'react'
import ManageCandidateForm from '../../../_components/forms/manage-form'
import { TCandidate } from '@/types/pages/candidates/candidate'

const TabContentEdit = ({ candidate }: { candidate: TCandidate }) => {
    return (
        <TabsContent value="edit" className="mt-4 lg:px-4">
            <ManageCandidateForm
                candidate={candidate}
                isEdit={true}
                candidateId={candidate.id}
            />
        </TabsContent>
    )
}

export default TabContentEdit
