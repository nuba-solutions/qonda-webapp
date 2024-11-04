import { TabsContent } from '@/components/ui/tabs'
import React from 'react'
import ManageCandidateForm from '../../../_components/forms/manage-form'
import { TCandidate } from '@/types/pages/candidates/candidate'
import { useQuery } from '@tanstack/react-query'
import { getLocationsList } from '@/actions/core/locations'
import { getJobPositionsList } from '@/actions/core/job_positions'
import { TLocation } from '@/types/core/location'
import { TJobPosition } from '@/types/core/position'

const TabContentEdit = ({ candidate }: { candidate: TCandidate }) => {
    const { data: locationsList } = useQuery<TLocation[]>({
        queryKey: ['locations'],
        queryFn: () => getLocationsList(),
        refetchOnWindowFocus: false,
    })
    const { data: jobPositionsList } = useQuery<TJobPosition[]>({
        queryKey: ['job_positions'],
        queryFn: () => getJobPositionsList(),
        refetchOnWindowFocus: false,
    })

    if (!locationsList || !jobPositionsList) return null

    return (
        <TabsContent value="edit" className="mt-0 p-4">
            <ManageCandidateForm
                candidate={candidate}
                candidateId={candidate.id}
                isEdit={true}
                jobPositionsList={jobPositionsList}
                locationsList={locationsList}
            />
        </TabsContent>
    )
}

export default TabContentEdit
