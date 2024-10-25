import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query'
import { getCandidateByID } from '@/actions/pages/candidates/candidates'
import { redirect } from 'next/navigation'
import CandidateDetailsSection from './_components/sections/details-section'
import { getLocationsList } from '@/actions/core/locations'

const CandidateDetailsPage = async ({
    searchParams,
}: {
    searchParams: any
}) => {
    const candidateId = searchParams.candidateId
        ? JSON.parse(searchParams.candidateId)
        : null

    if (!candidateId) redirect('/candidates')

    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['candidate', candidateId],
        queryFn: () => getCandidateByID(candidateId),
    })

    const locationsList = await getLocationsList()

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <CandidateDetailsSection
                candidateId={candidateId}
                locationsList={locationsList}
            />
        </HydrationBoundary>
    )
}

export default CandidateDetailsPage
